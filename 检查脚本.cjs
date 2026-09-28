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
const library = source.slice(0, boot) + '\n globalThis.testAPI = { myStorage, applyCodePreset, isDark, onUseThemeDark, isIPhoneLayout, addNotInterestedItem, syncIPhoneCollapseButtons, syncIPhoneExpandedAnswers, blockIPhoneAnswerTextClick, cacheIPhoneFeedAuthors, iPhoneFeedAuthors, formatIPhoneFeedVotes, loadIPhoneFeedAvatar, iPhoneFeedBatch, syncIPhoneFeedBatch, shouldStopIPhoneFeedRequest };\n})();';
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
    querySelector: selector => selector === '.jimi-iphone-collapse' ? added[0] : selector.includes('retract') ? nativeButton : null,
    insertBefore: button => added.push(button)
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
  // Expanded footer uses current author data without replacing native actions or duplicating itself.
  let footerAuthor, authorCreates = 0;
  const profile = { textContent: '作者甲', getAttribute: () => '/people/author' };
  const avatar = { src: 'https://pic1.zhimg.com/avatar.jpg' };
  const answer = { querySelector: selector => selector.includes('name') ? profile : avatar, getAttribute: () => '{}' };
  const plainLink = { href: '/should-not-open', tabIndex: 0, hasAttribute() { return !!this.href; }, removeAttribute() { delete this.href; } };
  const nativeActions = { querySelector: () => footerAuthor, prepend: element => { footerAuthor = element; authorCreates++; } };
  const rich = { querySelectorAll: () => [plainLink], querySelector: () => nativeActions, closest: () => answer };
  const footerAPI = load('iPhone Safari', 5, 402, 874, {
    querySelectorAll: () => [rich],
    createElement: () => {
      const img = { getAttribute() { return this.src; } }, label = {};
      return { dataset: {}, querySelector: selector => selector === 'img' ? img : label,
        setAttribute(name, value) { this[name] = value; }, removeAttribute(name) { delete this[name]; } };
    }
  });
  footerAPI.syncIPhoneExpandedAnswers();
  footerAPI.syncIPhoneExpandedAnswers();
  assert.equal(authorCreates, 1);
  assert.equal(footerAuthor.querySelector('span').textContent, '作者甲');
  assert.equal(footerAuthor.querySelector('img').src, avatar.src);
  assert.equal(footerAuthor.href, '/people/author');
  assert.equal(plainLink.href, undefined);
  assert.equal(plainLink.tabIndex, -1);
  // The later external-link pass must not restore an empty href on plain text.
  const linkPass = source.slice(source.indexOf('  var initLinkChanger ='), source.indexOf('  var addAnswerCopyLink ='));
  const external = { href: 'https://link.zhihu.com/?target=https%3A%2F%2Fexample.com', hasAttribute: () => true, classList: { add() {} } };
  vm.runInNewContext(linkPass + '\ninitLinkChanger();', {
    domA: selector => selector.startsWith('a.external') ? [plainLink, external] : []
  });
  assert.equal(plainLink.href, undefined);
  assert.equal(external.href, 'https://example.com');
  profile.textContent = '作者乙';
  footerAPI.syncIPhoneExpandedAnswers();
  assert.equal(authorCreates, 1);
  assert.equal(footerAuthor.querySelector('span').textContent, '作者乙');
  for (const [text, media, blocked] of [[true, false, true], [true, true, false], [false, false, false]]) {
    let prevented = false, stopped = false;
    footerAPI.blockIPhoneAnswerTextClick({
      target: { closest: selector => selector.startsWith('img') ? media : text },
      preventDefault: () => { prevented = true; }, stopImmediatePropagation: () => { stopped = true; }
    });
    assert.equal(prevented, blocked);
    assert.equal(stopped, blocked);
  }
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
  // Count filtered, visible rows rather than raw API rows; overflow never replaces the first 10.
  const makeClasses = (names = []) => {
    const values = new Set(names);
    return { contains: name => values.has(name), remove: name => values.delete(name), toggle: (name, yes) => yes ? values.add(name) : values.delete(name) };
  };
  const rows = Array.from({ length: 25 }, (_, i) => ({ classList: makeClasses(i < 3 ? ['jimi-hidden-item'] : []), querySelector: () => ({}) }));
  const root = { classList: makeClasses(), querySelectorAll: () => rows };
  const location = { hostname: 'www.zhihu.com', pathname: '/', origin: 'https://www.zhihu.com', href: 'https://www.zhihu.com/' };
  const batchAPI = load('iPhone Safari', 5, 402, 874, {
    querySelector: () => root,
    createElement: () => assert.fail('Batch cap must not create refresh controls'),
    addEventListener: () => assert.fail('Batch cap must not register touch gestures')
  }, { location, URL, getComputedStyle: () => ({ display: 'block' }) });
  batchAPI.syncIPhoneFeedBatch();
  batchAPI.syncIPhoneFeedBatch();
  assert.equal(batchAPI.iPhoneFeedBatch.count, 10);
  assert.equal(batchAPI.iPhoneFeedBatch.full, true);
  assert.equal(rows.filter(row => row.classList.contains('jimi-batch-extra')).length, 12);
  assert.doesNotMatch(source, /feedPullScreenRatio|feedPullDamping|setIPhoneBatchPull|refreshIPhoneFeedBatch|isIPhoneBatchSwipe|initIPhoneFeedBatch|jimi-batch-footer|jimIPhoneBatchRefresh/);
  const nextFeed = 'https://www.zhihu.com/api/v3/feed/topstory/recommend?action=down';
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed), true);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(new Request(nextFeed)), true);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed, { method: 'POST' }), false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed.replace('down', 'pull')), false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest('/api/v4/comment_v5/answers/1'), false);
  assert.equal(batchAPI.shouldStopIPhoneFeedRequest(nextFeed.replace('www.zhihu.com', 'example.com')), false);
  // A consumed upstream "loaded" flag must not skip filtering newly rendered batch rows.
  const fastTask = source.slice(source.indexOf('  async function runFastTasks()'), source.indexOf('  async function runHeavyTasks()'));
  const order = [], pendingRows = [{}];
  await vm.runInNewContext(fastTask + '\nrunFastTasks();', {
    HTML_HOOTS: ['www.zhihu.com'], location, CLASS_LISTENED: 'jimi-listened',
    isIPhoneBatchPage: () => true, domById: () => ({}), domA: () => pendingRows,
    processingData2: async rows => { assert.equal(rows, pendingRows); order.push('filtered'); },
    myListenList: { loaded: false, init: () => assert.fail('Batch filtering depended on loaded flag') },
    myListenSearchListItem: { init() {} }, myListenAnswer: { init() {} }, myListenUserHomeList: { init() {} },
    syncIPhoneFeedBatch: () => order.push('counted'), syncIPhoneFeed() {}, syncIPhoneExpandedAnswers() {}, syncIPhoneCollapseButtons() {}
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
  console.log('PASS: syntax, Markdown sync, local original hashes when present, release metadata and versioning, no settings UI, automatic light/dark theme, phone detection, preset priority, persistence, collapse, avatars, Safari fetch, filtered 10-item cap, no bottom refresh code, expanded author footer and plain-text click protection');
})().catch(error => { console.error(error); process.exitCode = 1; });
