// 零依赖检查：node 检查脚本.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const source = read('吉姆的知乎-iPhone.user.js');
new vm.Script(source); // parse the complete installable file
const preset = JSON.parse(source.match(/const IPHONE_PRESET = ([\s\S]*?);\n  \/\/ END IPHONE_PRESET/)[1]);
assert.deepEqual(preset, JSON.parse(read('iPhone知乎-参数.md').match(/```json\n([\s\S]*?)\n```/)[1]));
assert.equal(source.match(/const IPHONE_PRESET/g).length, 1);
assert.doesNotMatch(source, /GM_registerMenuCommand|var openChange/);
const release = require('./发布更新.cjs');
assert.equal(read(release.META), release.header(source), 'Update metadata must match the installable script');
for (const [key, file] of [['updateURL', release.META], ['downloadURL', release.SCRIPT]]) {
  assert.equal(source.match(new RegExp(`^// @${key}\\s+(\\S+)`, 'm'))[1], release.RAW + encodeURIComponent(file));
}
// Re-running a successful release must not invent another version; real edits must advance it.
const currentVersion = release.version(source);
const nextVersion = currentVersion.replace(/\d+$/, number => Number(number) + 1);
const unchanged = release.prepare(source, read('iPhone知乎-参数.md'), source);
assert.equal(unchanged.source, source);
assert.equal(unchanged.version, currentVersion);
const edited = release.prepare(source + '\n// change\n', read('iPhone知乎-参数.md'), source);
assert.equal(edited.version, nextVersion);
assert.equal(release.version(edited.meta), nextVersion);
const changedPreset = JSON.parse(JSON.stringify(preset));
changedPreset.mobile.pagePadding = Number(preset.mobile.pagePadding) + 1;
const presetEdit = read('iPhone知乎-参数.md').replace(/```json\n[\s\S]*?\n```/, '```json\n' + JSON.stringify(changedPreset, null, 2) + '\n```');
const synced = release.prepare(source, presetEdit, source);
assert.equal(JSON.parse(synced.source.match(/const IPHONE_PRESET = ([\s\S]*?);\n  \/\/ END IPHONE_PRESET/)[1]).mobile.pagePadding, changedPreset.mobile.pagePadding);
const html = source.match(/var INNER_HTML = `([^`]+)`;/)[1];
assert.doesNotMatch(html, /id="(?:JIMI_DIALOG|JIMI_OPEN_CLOSE)"/);
assert.match(html, /JIMI_PREVIEW_IMAGE/);
assert.equal((source.match(/doFetchNotInterested\(\{/g) || []).length, 1, 'Only explicit user feedback may send a request');
for (const [file, hash] of [
  ['知乎修改器-网页端.js', 'ca13bccd9f08b9d0f1b5b64238b5dd95fd98280ac0713d8b606fdf219263c31f'],
  ['知乎修改器-老的移动端.js', '59a8150e46b3834c54e5effba33e6988dbc98b7956620ab5f3e64abdb277a170']
]) if (fs.existsSync(path.join(__dirname, file))) {
  assert.equal(crypto.createHash('sha256').update(read(file)).digest('hex'), hash);
}
const boot = source.indexOf('  (function() {\n    if (needRedirect()) return;');
assert.ok(boot > 0);
const library = source.slice(0, boot) + '\n globalThis.testAPI = { myStorage, applyCodePreset, isDark, onUseThemeDark, isIPhoneLayout, addNotInterestedItem, syncIPhoneCollapseButtons, cacheIPhoneFeedAuthors, iPhoneFeedAuthors, formatIPhoneFeedVotes, loadIPhoneFeedAvatar, iPhoneFeedBatch, syncIPhoneFeedBatch, shouldStopIPhoneFeedRequest, isIPhoneBatchSwipe, initIPhoneFeedBatch };\n})();';
function load(userAgent, maxTouchPoints, screenWidth, screenHeight, documentMock = {}, globals = {}) {
  const local = new Map();
  const gm = new Map();
  const key = 'jimIPhoneZhihuConfig';
  // Old settings must never override a new code preset, but action data must survive.
  local.set(key, JSON.stringify({ t: 5, fontSizeForAnswer: '80', hotKey: true, hiddenHeader: false, notInterestedList: ['saved', preset.script.notInterestedList[0]] }));
  const context = {
    navigator: { userAgent, maxTouchPoints }, screen: { width: screenWidth, height: screenHeight },
    window: { addEventListener() {} }, MutationObserver: class { observe() {} },
    document: { querySelector() { return null; }, querySelectorAll() { return []; }, ...documentMock },
    localStorage: { getItem: key => local.get(key), setItem: (key, value) => local.set(key, value), removeItem: key => local.delete(key) },
    GM: { getValue: async key => gm.get(key), setValue: async (key, value) => gm.set(key, value), deleteValue: async key => gm.delete(key) },
    ...globals
  };
  vm.runInNewContext(library, context);
  return context.testAPI;
}
(async () => {
  const api = load('Macintosh Safari', 5, 402, 874); // desktop UA on a touch phone
  assert.equal(api.isIPhoneLayout, true);
  assert.equal(load('Macintosh Safari', 0, 1440, 900).isIPhoneLayout, false);
  assert.equal(load('iPhone Safari', 5, 874, 402).isIPhoneLayout, true); // landscape
  for (const force of [false, true]) {
    const config = await api.myStorage.getConfig(force);
    assert.equal(config.fontSizeForAnswer, preset.script.fontSizeForAnswer);
    assert.equal(config.hotKey, false);
    assert.equal(config.hiddenHeader, preset.script.hiddenHeader);
    assert.equal(config.notInterestedList[0], 'saved');
    assert.equal(config.notInterestedList.length, preset.script.notInterestedList.length + 1);
    assert.ok(preset.script.notInterestedList.every(title => config.notInterestedList.includes(title)));
  }
  await api.addNotInterestedItem('manual'); // works without any settings DOM
  await api.addNotInterestedItem('manual');
  const manualList = (await api.myStorage.getConfig()).notInterestedList;
  assert.equal(manualList[0], 'manual');
  assert.equal(manualList.length, preset.script.notInterestedList.length + 2);
  assert.equal(new Set(manualList).size, manualList.length);
  await api.myStorage.updateConfigItem('theme', '1');
  assert.equal((await api.myStorage.getConfig(true)).theme, preset.script.theme);
  assert.equal(api.applyCodePreset({ notInterestedList: 'bad' }).notInterestedList.length, preset.script.notInterestedList.length);
  assert.equal(api.applyCodePreset({ blockedUsers: [{ id: 'same', tags: ['a'] }, { id: 'same', tags: ['b'] }] }).blockedUsers[0].tags.join(','), 'a,b');
  // Auto theme follows the device preference without changing stored settings.
  assert.equal(preset.script.theme, '2');
  let systemDark = true;
  const themeRoot = { setAttribute(name, value) { this[name] = value; } };
  const themeAPI = load('iPhone Safari', 5, 402, 874, { querySelector: () => themeRoot }, {
    window: { addEventListener() {}, matchMedia: query => { assert.equal(query, '(prefers-color-scheme: dark)'); return { matches: systemDark }; } }
  });
  assert.equal(await themeAPI.isDark(), true);
  await themeAPI.onUseThemeDark();
  assert.equal(themeRoot['data-theme'], 'dark');
  systemDark = false;
  await themeAPI.onUseThemeDark();
  assert.equal(await themeAPI.isDark(), false);
  assert.equal(themeRoot['data-theme'], 'light');
  // New button must be unique, use the current native handler after a rerender,
  // and never appear on content without a native collapse operation.
  let clicks = 0, added = [];
  let nativeButton = { click: () => { throw new Error('Stale native button'); } };
  const content = {
    closest: () => null,
    querySelector: selector => selector === '.jimi-iphone-collapse' ? added[0] : nativeButton,
    appendChild: button => added.push(button)
  };
  const documentMock = {
    querySelectorAll: () => [content, { querySelector: () => null }],
    createElement: () => ({ setAttribute() {} })
  };
  const phone = load('iPhone Safari', 5, 402, 874, documentMock);
  phone.syncIPhoneCollapseButtons();
  phone.syncIPhoneCollapseButtons();
  assert.equal(added.length, 1);
  assert.equal(added[0].type, 'button');
  nativeButton = { click: () => clicks++ };
  added[0].onclick();
  assert.equal(clicks, 1);
  added = [];
  load('Macintosh Safari', 0, 1440, 900, documentMock).syncIPhoneCollapseButtons();
  assert.equal(added.length, 0);
  assert.equal(api.formatIPhoneFeedVotes(3035), '3035 人赞同');
  assert.equal(api.formatIPhoneFeedVotes(123456), '123456 人赞同');
  assert.equal(api.formatIPhoneFeedVotes(0), '0 人赞同');
  assert.equal(api.formatIPhoneFeedVotes(undefined), '');
  assert.equal(api.formatIPhoneFeedVotes('bad'), '');
  api.cacheIPhoneFeedAuthors([{ target: { type: 'answer', id: 'large-id-as-string', author: { name: '作者', avatar_url: 'https://example.org/avatar.jpg' } } }]);
  assert.equal(api.iPhoneFeedAuthors.get('large-id-as-string').name, '作者');
  api.cacheIPhoneFeedAuthors(Array.from({ length: 205 }, (_, id) => ({ target: { type: 'answer', id: String(id), author: { name: String(id) } } })));
  assert.equal(api.iPhoneFeedAuthors.size, 200);
  assert.equal(api.iPhoneFeedAuthors.has('large-id-as-string'), false);
  // A missed feed response still gets a real avatar; duplicate work and failures never loop.
  let requests = 0;
  const author = { avatar_url: 'https://pic1.zhimg.com/avatar.jpg', name: '作者' };
  const avatarAPI = load('iPhone Safari', 5, 402, 874, {}, {
    fetch: async (url, options) => {
      requests++;
      assert.equal(url, '/api/v4/members/abc123?include=avatar_url');
      assert.equal(options.credentials, 'same-origin');
      return { ok: true, json: async () => author };
    }
  });
  const card = (id, member = 'abc123') => ({ isConnected: true, dataset: {}, getAttribute: key => JSON.stringify(key === 'data-zop' ? { itemId: id } : { card: { content: { author_member_hash_id: member } } }) });
  const missing = card('9007199254740993123');
  await Promise.all([avatarAPI.loadIPhoneFeedAvatar(missing), avatarAPI.loadIPhoneFeedAvatar(missing)]);
  assert.equal(requests, 1);
  assert.equal(avatarAPI.iPhoneFeedAuthors.get('9007199254740993123').avatar_url, author.avatar_url);
  await avatarAPI.loadIPhoneFeedAvatar(card('9007199254740993123'));
  await avatarAPI.loadIPhoneFeedAvatar(card('invalid-member', '../other'));
  await avatarAPI.loadIPhoneFeedAvatar({ ...card('detached'), isConnected: false });
  assert.equal(requests, 1);
  const failedAPI = load('iPhone Safari', 5, 402, 874, {}, { fetch: async () => { requests++; throw new Error('offline'); } });
  const failed = card('failed');
  await failedAPI.loadIPhoneFeedAvatar(failed);
  await failedAPI.loadIPhoneFeedAvatar(failed);
  assert.equal(requests, 2);
  assert.equal(failedAPI.iPhoneFeedAuthors.size, 0);
  // Count filtered, visible rows rather than raw API rows; overflow never replaces the first 15.
  const makeClasses = (names = []) => {
    const values = new Set(names);
    return { contains: name => values.has(name), remove: name => values.delete(name), toggle: (name, yes) => yes ? values.add(name) : values.delete(name) };
  };
  const rows = Array.from({ length: 25 }, (_, i) => ({ classList: makeClasses(i < 3 ? ['jimi-hidden-item'] : []), querySelector: () => ({}) }));
  let footerCount = 0, reloaded = 0, top = null;
  const makeStyle = () => ({ setProperty(name, value) { this[name] = value; } });
  const root = { isConnected: true, contains: target => !target.outside, style: makeStyle(), classList: makeClasses(), querySelectorAll: () => rows };
  const location = { hostname: 'www.zhihu.com', pathname: '/', origin: 'https://www.zhihu.com', href: 'https://www.zhihu.com/', reload: () => reloaded++ };
  const handlers = {};
  const session = new Map();
  const batchWindow = { innerHeight: 400, scrollY: 600, scrollTo: (x, y) => { top = y; }, addEventListener() {} };
  const batchAPI = load('iPhone Safari', 5, 402, 874, {
    querySelector: () => root,
    documentElement: { scrollHeight: 1000 },
    body: { appendChild: () => footerCount++ },
    createElement: tag => ({ tagName: tag.toUpperCase(), style: makeStyle(), classList: makeClasses(), setAttribute() {}, remove() {} }),
    addEventListener: (name, fn) => { handlers[name] = fn; }
  }, { location, URL, getComputedStyle: () => ({ display: 'block' }), window: batchWindow, history: { scrollRestoration: 'auto' }, sessionStorage: { getItem: key => session.get(key), setItem: (key, value) => session.set(key, value), removeItem: key => session.delete(key) } });
  batchAPI.syncIPhoneFeedBatch();
  batchAPI.syncIPhoneFeedBatch();
  assert.equal(batchAPI.iPhoneFeedBatch.count, 15);
  assert.equal(batchAPI.iPhoneFeedBatch.full, true);
  assert.equal(rows.filter(row => row.classList.contains('jimi-batch-extra')).length, 7);
  assert.equal(footerCount, 1);
  assert.equal(batchAPI.iPhoneFeedBatch.footer.tagName, 'DIV');
  assert.equal(batchAPI.iPhoneFeedBatch.footer.onclick, undefined, 'No click-to-refresh control');
  const nextFeed = 'https://www.zhihu.com/api/v3/feed/topstory/recommend?action=down';
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed), true);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(new Request(nextFeed)), true);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed, { method: 'POST' }), false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed.replace('down', 'pull')), false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest('/api/v4/comment_v5/answers/1'), false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed.replace('www.zhihu.com', 'example.com')), false);
  assert.equal(batchAPI.isIPhoneBatchSwipe({ x: 0, y: 600, threshold: 874 * .33, damping: .6 }, { clientX: 0, clientY: 120 }), false);
  assert.equal(batchAPI.isIPhoneBatchSwipe({ x: 0, y: 600, threshold: 874 * .33, damping: .6 }, { clientX: 0, clientY: 119 }), true);
  assert.equal(batchAPI.isIPhoneBatchSwipe({ x: 0, y: 300, threshold: 402 * .33, damping: .6 }, { clientX: 0, clientY: 78 }), true);
  assert.equal(batchAPI.isIPhoneBatchSwipe({ x: 0, y: 300, threshold: 132, damping: .6 }, { clientX: 200, clientY: 100 }), false);
  // Reaching the bottom in the current swipe is not a refresh; a fresh gesture is required.
  batchAPI.initIPhoneFeedBatch();
  const touch = y => ({ touches: [{ clientX: 50, clientY: y }], target: { closest: () => null }, cancelable: true, preventDefault() {} });
  batchWindow.scrollY = 300;
  handlers.touchstart(touch(200));
  batchWindow.scrollY = 600;
  handlers.touchmove(touch(100));
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 0);
  const outside = touch(300);
  outside.target.outside = true; // Lightboxes and dialogs outside the list must not refresh it.
  handlers.touchstart(outside);
  handlers.touchmove(touch(100));
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 0);
  // A short pull follows at 60% of finger travel, then returns to the last answer without refreshing.
  handlers.touchstart(touch(300));
  handlers.touchmove(touch(200));
  assert.equal(batchAPI.iPhoneFeedBatch.pull, 60);
  assert.equal(batchAPI.iPhoneFeedBatch.footer.textContent, '继续上拉 ↑');
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 0);
  assert.equal(batchAPI.iPhoneFeedBatch.pull, 0);
  assert.equal(root.style['--jimi-batch-transform'], 'none');
  assert.equal(batchAPI.iPhoneFeedBatch.footer.style.opacity, '0');
  // A gesture that passed the old 132px threshold must now fall short after damping.
  handlers.touchstart(touch(300));
  handlers.touchmove(touch(100));
  assert.equal(batchAPI.iPhoneFeedBatch.pull, 120);
  assert.equal(batchAPI.iPhoneFeedBatch.footer.textContent, '继续上拉 ↑');
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 0);
  // Reversing below the threshold and cancelling an armed pull both cancel refresh.
  handlers.touchstart(touch(300));
  handlers.touchmove(touch(70));
  assert.equal(batchAPI.iPhoneFeedBatch.footer.textContent, '松开刷新 ↑');
  handlers.touchmove(touch(220));
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 0);
  handlers.touchstart(touch(300));
  handlers.touchmove(touch(70));
  handlers.touchcancel();
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 0);
  assert.equal(batchAPI.iPhoneFeedBatch.pull, 0);
  handlers.touchstart(touch(300));
  handlers.touchmove(touch(70));
  handlers.touchend({ touches: [] });
  handlers.touchend({ touches: [] });
  assert.equal(reloaded, 1);
  assert.equal(top, 0);
  assert.equal(JSON.parse(session.get('jimIPhoneBatchRefresh')).restoration, 'auto');
  // A consumed upstream "loaded" flag must not skip filtering newly rendered batch rows.
  const fastTask = source.slice(source.indexOf('  async function runFastTasks()'), source.indexOf('  async function runHeavyTasks()'));
  const order = [], pendingRows = [{}];
  await vm.runInNewContext(fastTask + '\nrunFastTasks();', {
    HTML_HOOTS: ['www.zhihu.com'], location, CLASS_LISTENED: 'jimi-listened',
    isIPhoneBatchPage: () => true, domById: () => ({}), domA: () => pendingRows,
    processingData2: async rows => { assert.equal(rows, pendingRows); order.push('filtered'); },
    myListenList: { loaded: false, init: () => assert.fail('Batch filtering depended on loaded flag') },
    myListenSearchListItem: { init() {} }, myListenAnswer: { init() {} }, myListenUserHomeList: { init() {} },
    syncIPhoneFeedBatch: () => order.push('counted'), syncIPhoneFeed() {}, syncIPhoneCollapseButtons() {}
  });
  assert.deepEqual(order, ['filtered', 'counted']);
  // Safari's isolated script window is not the window the site calls fetch on.
  const response = { url: 'https://www.zhihu.com/api/v3/feed/topstory/recommend' };
  const options = { headers: { Accept: 'application/json' } };
  const pageWindow = { Response, fetch: async function(url, opt) { assert.equal(this, pageWindow); assert.equal(url, '/feed'); assert.equal(opt, options); return response; } };
  const sandboxFetch = () => { throw new Error('Wrong fetch realm'); };
  let intercepted = 0;
  const hook = source.slice(source.indexOf('        const myWindow = typeof unsafeWindow'), source.indexOf('\n      }\n      onBodyLoad();'));
  vm.runInNewContext(hook, { window: { fetch: sandboxFetch }, fetch: sandboxFetch, unsafeWindow: pageWindow, prevHeaders: {}, fetchInterceptStatus: true, shouldStopIPhoneFeedRequest: batchAPI.shouldStopIPhoneFeedRequest, setFetchHeaders() {}, interceptionResponse: res => { assert.equal(res, response); intercepted++; }, interceptResponseForBlocked() {} });
  assert.equal(await pageWindow.fetch('/feed', options), response);
  assert.ok(intercepted > 0);
  const stopped = await pageWindow.fetch(nextFeed);
  assert.equal(stopped.status, 200);
  assert.deepEqual(await stopped.json(), { data: [], paging: { is_end: true, is_start: false, next: '', previous: '', totals: 0 }, fresh_text: '' });
  location.pathname = '/follow';
  batchAPI.syncIPhoneFeedBatch();
  assert.equal(batchAPI.iPhoneFeedBatch.full, false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed), false);
  console.log('PASS: syntax, Markdown sync, local original hashes when present, release metadata and versioning, no settings UI, automatic light/dark theme, phone detection, preset priority, persistence, collapse, avatars, Safari fetch, filtered batches, damped half-screen gesture, spring return, cancellation and no click refresh');
})().catch(error => { console.error(error); process.exitCode = 1; });
