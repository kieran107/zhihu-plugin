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
const withVersion = value => source.replace(/^(\/\/ @version\s+)\S+/m, `$1${value}`);
assert.equal(release.prepare(withVersion('1.0'), read('iPhone知乎-参数.md'), withVersion('6.0.0')).version, '1.0');
assert.equal(release.prepare(withVersion('1.2'), read('iPhone知乎-参数.md'), withVersion('1.1')).version, '1.2');
assert.equal(release.prepare(withVersion('1.9') + '\n// edit\n', read('iPhone知乎-参数.md'), withVersion('1.9')).version, '1.10');
assert.throws(() => release.prepare(withVersion('1.0'), read('iPhone知乎-参数.md'), withVersion('1.1')), /不能降低/);
assert.throws(() => release.prepare(withVersion('1.1'), read('iPhone知乎-参数.md'), withVersion('6.0.0')), /重置仅允许/);
assert.throws(() => release.prepare(withVersion('1.01'), read('iPhone知乎-参数.md'), source), /1.N/);
assert.equal(source.match(/^\/\/ @name\s+(.+)$/m)[1], '吉姆的知乎 · iPhone Safari');
assert.equal(source.match(/^\/\/ @namespace\s+(.+)$/m)[1], 'local.jim.zhihu.iphone');
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
const library = source.slice(0, boot) + '\n globalThis.testAPI = { initHTML, myStorage, applyCodePreset, processingData2, fnAppendStyle, mySize, myBackground, appendHiddenStyle, isDark, onUseThemeDark, isIPhoneLayout, addNotInterestedItem, syncIPhoneCollapseButtons, syncIPhoneExpandedAnswers, syncIPhoneAnswerFocus, syncIPhoneAutoCollapse, collapseIPhoneAnswer, trackIPhoneCommentAnswer, blockIPhoneAnswerTextClick, getPreviewImageSrc, myPreview, cacheIPhoneFeedAuthors, iPhoneFeedAuthors, formatIPhoneFeedVotes, loadIPhoneFeedAvatar, iPhoneFeedBatch, syncIPhoneFeedBatch, shouldStopIPhoneFeedRequest };\n})();';
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
  for (const phone of [false, true]) {
    const nodes = [];
    const layout = load('Macintosh Safari', phone ? 5 : 0, phone ? 402 : 1440, 874, {
      createElement: () => ({}), body: { appendChild: node => nodes.push(node) }
    });
    layout.initHTML();
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].innerHTML.includes('id="JIMI_SAFARI_TINT" aria-hidden="true"'), phone, 'Safari tint is decorative and phone-only');
    assert.ok(nodes[0].innerHTML.includes('JIMI_PREVIEW_IMAGE'));
  }
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
  let themeWrites = 0;
  const themeRoot = { getAttribute(name) { return this[name]; }, setAttribute(name, value) { themeWrites++; this[name] = value; }, removeAttribute(name) { delete this[name]; } };
  const themeAPI = load('iPhone Safari', 5, 402, 874, { documentElement: themeRoot, querySelector: () => themeRoot }, {
    GM: { getValue: () => assert.fail('Visual presets must not wait for GM storage') },
    window: { addEventListener() {}, matchMedia: query => { assert.equal(query, '(prefers-color-scheme: dark)'); return { matches: systemDark }; } }
  });
  assert.equal(themeAPI.isDark(), true); // Synchronous even when storage is unavailable.
  await themeAPI.onUseThemeDark();
  assert.equal(themeRoot['data-theme'], 'dark');
  themeAPI.onUseThemeDark();
  assert.equal(themeWrites, 1, 'An unchanged theme must not trigger another mutation');
  systemDark = false;
  await themeAPI.onUseThemeDark();
  assert.equal(await themeAPI.isDark(), false);
  assert.equal(themeRoot['data-theme'], 'light');
  // Fixed visual presets render synchronously and unchanged CSS never rewrites a style node.
  const styles = new Map(); let styleWrites = 0;
  const styleAPI = load('iPhone Safari', 5, 402, 874, {
    documentElement: themeRoot, querySelector: () => themeRoot,
    getElementById: id => styles.get(id),
    head: { appendChild(node) { styles.set(node.id, node); } },
    createElement: () => ({ get textContent() { return this.text; }, set textContent(value) { styleWrites++; this.text = value; } })
  }, { location: { hostname: 'www.zhihu.com', pathname: '/', href: 'https://www.zhihu.com/', origin: 'https://www.zhihu.com' }, GM: { getValue: () => assert.fail('Styles must not wait for storage') }, window: { addEventListener() {}, matchMedia: () => ({ matches: true }) } });
  styleAPI.mySize.init(); styleAPI.myBackground.init(); styleAPI.appendHiddenStyle();
  assert.equal(styles.size, 3);
  assert.ok([...styles.values()].every(node => node.textContent.length > 0));
  const writes = styleWrites;
  styleAPI.mySize.init(); styleAPI.myBackground.init(); styleAPI.appendHiddenStyle();
  assert.equal(styleWrites, writes);
  styleAPI.fnAppendStyle('JIMI_STYLE_VERSION', 'changed');
  assert.equal(styleWrites, writes + 1);
  // Incomplete React rows stay eligible for the next pass; disabled history never delays a feed.
  let markedIncomplete = false;
  const feedAPI = load('iPhone Safari', 5, 402, 874, {}, {
    location: { hostname: 'www.zhihu.com', pathname: '/' },
    window: { addEventListener() {}, matchMedia: () => ({ matches: true }) }
  });
  feedAPI.myStorage.getHistory = () => assert.fail('Disabled history must not read GM storage');
  await feedAPI.processingData2([{ scrollHeight: 0, querySelector: () => null, classList: { contains: () => false, add: () => { markedIncomplete = true; } } }]);
  assert.equal(markedIncomplete, false);
  // Keep native actions in their wrapper; recreate only our dock/collapse after a native rerender.
  let clicks = 0, button, dock, placements = 0;
  let nativeButton = { click: () => { throw new Error('Stale native button'); } };
  let actions, host;
  const content = {
    closest: () => null,
    querySelector: selector => selector === '.jimi-iphone-collapse' ? button : selector.includes('action-dock') ? dock : selector.includes('retract') ? nativeButton : selector === '.ContentItem-actions' ? actions : null
  };
  const newActions = () => {
    host = { parentElement: content, classList: { add() {} }, before(node) { dock = node; this.previousElementSibling = node; placements++; } };
    actions = { parentElement: host, append(node) { button = node; node.parentElement = actions; } };
  };
  newActions();
  const documentMock = {
    querySelectorAll: () => [content, { querySelector: () => null }],
    createElement: () => ({ dataset: {}, setAttribute() {} })
  };
  const phone = load('iPhone Safari', 5, 402, 874, documentMock);
  phone.syncIPhoneCollapseButtons();phone.syncIPhoneCollapseButtons();
  assert.equal(placements, 1);assert.equal(button.type, 'button');
  const originalButton = button, originalDock = dock;
  newActions();phone.syncIPhoneCollapseButtons();
  assert.equal(button, originalButton);assert.equal(dock, originalDock);
  assert.equal(placements, 2);assert.equal(button.parentElement, actions);
  actions.parentElement = content;actions.classList = { add() {} };actions.before = node => { dock = node;actions.previousElementSibling = node; };
  phone.syncIPhoneCollapseButtons();assert.equal(actions.previousElementSibling, originalDock);
  nativeButton = { click: () => clicks++ };button.onclick();assert.equal(clicks, 1);
  button = dock = undefined;
  load('Macintosh Safari', 0, 1440, 900, documentMock).syncIPhoneCollapseButtons();
  assert.equal(button, undefined);assert.equal(dock, undefined);
  // Real comment taps dock before opening; resolve the current handler after a native rerender.
  const commentEvents = [], frames = [];
  let commentsCollapsed = false, currentComment = { click() { throw Error('Stale comment handler'); } };
  const commentDock = { scrollIntoView(options) { assert.equal(options.block, 'start');commentEvents.push('dock'); } };
  const commentRich = { isConnected: true, classList: { contains: () => commentsCollapsed }, querySelector: selector => selector.includes('action-dock') ? commentDock : currentComment };
  const tappedComment = { textContent: '12 条评论', closest: selector => selector === '.AnswerItem' ? { querySelector: () => commentRich } : selector === '.ContentItem-actions' ? {} : null };
  const commentAPI = load('iPhone Safari', 5, 402, 874, {}, { requestAnimationFrame: f => frames.push(f) });
  const tap = trusted => ({ isTrusted: trusted, target: { closest: () => tappedComment }, preventDefault() { commentEvents.push('prevent'); }, stopImmediatePropagation() { commentEvents.push('stop'); } });
  commentAPI.trackIPhoneCommentAnswer(tap(true));
  assert.deepEqual(commentEvents, ['prevent', 'stop', 'dock']);
  currentComment = { click() { commentEvents.push('open'); } };frames.shift()();
  assert.equal(commentEvents.at(-1), 'open');
  commentAPI.trackIPhoneCommentAnswer(tap(false));assert.equal(frames.length, 0);
  commentAPI.trackIPhoneCommentAnswer(tap(true));commentsCollapsed = true;frames.shift()();
  assert.equal(commentEvents.filter(e => e === 'open').length, 1, 'Do not open comments after switching answers');
  // Switching answers closes native content and its comments, keeps the new reading position,
  // and also closes comments that arrive after the answer was already collapsed.
  const accordion = [], scrolls = [];
  let modalOpen = false, modalCloses = 0;
  const makeAnswer = (canCollapse = true) => {
    const classes = new Set(), states = new Set(['is-collapsed']);
    const item = { isConnected: true, classList: { add: s => classes.add(s), remove: s => classes.delete(s) },
      querySelector: selector => selector === ':scope > .RichContent' ? node : node.commentsOpen ? { click() { node.commentsOpen = false; node.commentCloses++; } } : null,
      getBoundingClientRect: () => ({ top: accordion.indexOf(node) * (accordion[0].open ? 900 : 200) }) };
    const node = { isConnected: true, open: false, commentsOpen: false, commentCloses: 0, closes: 0, classes,
      classList: { contains: c => states.has(c) }, getClientRects: () => [1], closest: () => item,
      querySelector: selector => selector.includes('retract') && canCollapse ? { click() { node.closes++; node.setOpen(false); } } : null,
      setOpen(value) { node.open = value; value ? states.delete('is-collapsed') : states.add('is-collapsed'); }
    };
    accordion.push(node);return node;
  };
  const focusAPI = load('iPhone Safari', 5, 402, 874, {
    querySelectorAll: () => accordion.filter(n => n.isConnected && n.open),
    querySelector: () => modalOpen ? { click() { modalOpen = false; modalCloses++; } } : null
  }, { window: { addEventListener() {}, scrollBy: (x,y) => scrolls.push(y) }, requestAnimationFrame: f => f() });
  const ownComments = node => focusAPI.trackIPhoneCommentAnswer({ target: { closest: () => ({ closest: selector => selector === '.AnswerItem' ? node?.closest() : null }) } });
  const firstAnswer = makeAnswer(), secondAnswer = makeAnswer(), fullShortAnswer = makeAnswer(false);
  fullShortAnswer.setOpen(true);firstAnswer.setOpen(true);focusAPI.syncIPhoneAnswerFocus();
  assert.ok(firstAnswer.classes.has('jimi-reading-answer'));
  assert.equal(fullShortAnswer.closes, 0);
  firstAnswer.commentsOpen = modalOpen = true;ownComments(firstAnswer);
  secondAnswer.setOpen(true);focusAPI.syncIPhoneAnswerFocus();focusAPI.syncIPhoneAnswerFocus();
  assert.equal(firstAnswer.open, false);assert.equal(firstAnswer.closes, 1);
  assert.equal(firstAnswer.commentsOpen, false);assert.equal(firstAnswer.commentCloses, 1);
  assert.equal(modalCloses, 1);assert.equal(modalOpen, false);
  assert.equal(firstAnswer.classes.has('jimi-reading-answer'), false);
  assert.ok(secondAnswer.classes.has('jimi-reading-answer'));
  assert.deepEqual(scrolls, [-700]);
  ownComments(secondAnswer);secondAnswer.commentsOpen = true;
  secondAnswer.setOpen(false);focusAPI.syncIPhoneAnswerFocus();
  assert.equal(secondAnswer.commentsOpen, false);assert.equal(secondAnswer.classes.has('jimi-reading-answer'), false);
  secondAnswer.commentsOpen = modalOpen = true;focusAPI.syncIPhoneAnswerFocus();
  assert.equal(secondAnswer.commentsOpen, false);assert.equal(modalOpen, false);
  ownComments(fullShortAnswer);modalOpen = true;focusAPI.collapseIPhoneAnswer(secondAnswer);
  assert.equal(modalOpen, true, "Do not close a different answer's reply dialog");
  ownComments(null);focusAPI.syncIPhoneAnswerFocus();
  assert.equal(modalOpen, true, 'An article comment dialog must clear the old answer owner');
  firstAnswer.setOpen(true);secondAnswer.setOpen(true);
  const initialFocus = load('iPhone Safari', 5, 402, 874, { querySelectorAll: () => accordion.filter(n => n.open) },
    { window: { addEventListener() {}, scrollBy() {} }, requestAnimationFrame: f => f() });
  initialFocus.syncIPhoneAnswerFocus();
  assert.equal(firstAnswer.open, true);assert.equal(secondAnswer.open, false, 'Keep the first answer when a page initially renders several open');
  let smallCommentsOpen = true;
  const smallCommentToggle = { textContent: '收起评论', click() { smallCommentsOpen = false; } };
  const smallRich = { closest: () => ({ querySelector: () => null }), querySelector: selector => selector.includes('ChatBubble') ? smallCommentToggle : null };
  focusAPI.collapseIPhoneAnswer(smallRich);
  assert.equal(smallCommentsOpen, false, 'Short comments close without a native bottom close button');
  // Auto-collapse arms only inside the reading band; comments and stale observers cannot close it.
  let autoOpen = true, autoComments = false, autoCloses = 0, rowTop = 500, nextTop = 900;
  const autoFrames = [], autoScrolls = [], autoObservers = [];
  const nextRow = { isConnected: true, getClientRects: () => [1], getBoundingClientRect: () => ({ top: nextTop }) };
  const autoRow = { isConnected: true, nextElementSibling: nextRow, classList: { add() {}, remove() {} },
    querySelector: selector => selector === ':scope > .RichContent' ? autoRich : null,
    getBoundingClientRect: () => ({ top: rowTop }) };
  const autoComment = { get textContent() { return autoComments ? '收起评论' : '12 条评论'; },
    closest: selector => selector === '.AnswerItem' ? autoRow : selector === '.ContentItem-actions' ? autoActions : null,
    click() { autoComments = !autoComments; autoAPI.syncIPhoneAutoCollapse(); } };
  let autoActions = { querySelector: () => autoComment };
  const autoHost = {}, autoDock = { scrollIntoView() { autoObservers.at(-1).emit(12, 72); } };
  const autoRich = { isConnected: true, getClientRects: () => autoOpen ? [1] : [],
    classList: { contains: () => !autoOpen }, closest: () => autoRow,
    querySelector: selector => selector.includes('retract') ? { click() { autoCloses++; autoOpen = false; rowTop += 100; nextTop -= 900; } }
      : selector.includes('action-host') ? autoHost : selector.includes('action-dock') ? autoDock
      : selector.includes('ChatBubble') ? autoComment : selector === '.ContentItem-actions' ? autoActions : null };
  const autoAPI = load('iPhone Safari', 5, 402, 874, { querySelectorAll: () => autoOpen ? [autoRich] : [] }, {
    window: { addEventListener() {}, scrollBy: (x, y) => autoScrolls.push(y) },
    requestAnimationFrame: callback => autoFrames.push(callback),
    getComputedStyle: node => { assert.equal(node, autoHost); return { bottom: '12px' }; },
    IntersectionObserver: class {
      constructor(callback, options) { this.callback = callback; this.options = options; autoObservers.push(this); }
      observe(target) { this.target = target; }
      disconnect() { this.disconnected = true; }
      emit(top, bottom) { this.callback([{ target: this.target, rootBounds: { top: 180, bottom: 868 },
        boundingClientRect: { top, bottom }, isIntersecting: bottom > 180 && top < 868 }]); }
    }
  });
  const reopenAuto = () => {
    autoAPI.syncIPhoneAnswerFocus();autoOpen = true;autoAPI.syncIPhoneAnswerFocus();autoAPI.syncIPhoneAutoCollapse();
    return autoObservers.at(-1);
  };
  autoAPI.syncIPhoneAnswerFocus();autoAPI.syncIPhoneAutoCollapse();
  let autoObserver = autoObservers.at(-1);
  assert.equal(autoObserver.options.rootMargin, '-180px 0px -6px 0px');
  autoObserver.emit(860, 920);assert.equal(autoCloses, 0, 'Opening outside the band must stay open');
  autoObserver.emit(802, 862);autoObserver.emit(808, 868);assert.equal(autoCloses, 0, 'Allow small bottom drift');
  autoObserver.emit(809, 869);assert.equal(autoCloses, 1);assert.ok(autoObserver.disconnected);
  autoObserver.emit(850, 910);assert.equal(autoCloses, 1, 'Ignore queued callbacks after collapse');
  autoFrames.shift()();assert.equal(autoScrolls.at(-1), 100, 'Preserve the current card at the lower edge');
  autoObserver = reopenAuto();autoObserver.emit(300, 360);autoObserver.emit(180, 240);assert.equal(autoCloses, 1);
  autoObserver.emit(179, 239);assert.equal(autoCloses, 2);
  autoFrames.shift()();assert.equal(autoScrolls.at(-1), -900, 'Preserve the following card at the upper edge');
  autoObserver = reopenAuto();autoObserver.emit(802, 862);
  autoAPI.trackIPhoneCommentAnswer({ isTrusted: true, target: { closest: () => autoComment }, preventDefault() {}, stopImmediatePropagation() {} });
  assert.equal(autoCloses, 2, 'Docking before the native comment handler must not close the answer');
  autoFrames.shift()();assert.equal(autoComments, true);
  autoObserver.emit(300, 360);autoObserver.emit(12, 72);assert.equal(autoCloses, 2, 'Reading comments suspends auto-collapse');
  autoComment.click();autoObserver.emit(12, 72);assert.equal(autoCloses, 2, 'Closing comments must not immediately close the answer');
  autoObserver.emit(300, 360);autoObserver.emit(179, 239);assert.equal(autoCloses, 3);
  autoFrames.shift()();
  autoObserver = reopenAuto();autoObserver.emit(802, 862);
  autoActions = { querySelector: () => autoComment };autoAPI.syncIPhoneAutoCollapse();
  const replacementObserver = autoObservers.at(-1);assert.ok(autoObserver.disconnected);
  replacementObserver.emit(802, 862);autoObserver.emit(179, 239);assert.equal(autoCloses, 3, 'A replaced React toolbar cannot close the active answer');
  autoAPI.syncIPhoneAutoCollapse(true);assert.ok(replacementObserver.disconnected);
  autoObservers.at(-1).emit(120, 180);assert.equal(autoCloses, 3, 'Resizing outside the band must not close immediately');
  autoObservers.at(-1).emit(802, 862);autoAPI.collapseIPhoneAnswer(autoRich);
  assert.ok(autoObservers.at(-1).disconnected);assert.equal(autoCloses, 4, 'Manual collapse cleans up its observer');
  autoObserver = reopenAuto();autoRich.isConnected = false;autoObserver.emit(0, 60);
  assert.ok(autoObserver.disconnected);assert.equal(autoCloses, 4, 'Removed answers disconnect without another click');
  autoRich.isConnected = true;autoObserver = reopenAuto();autoObserver.emit(802, 862);
  autoActions = { querySelector: () => autoComment };autoAPI.syncIPhoneAutoCollapse();
  autoObservers.at(-1).emit(179, 239);assert.equal(autoCloses, 5, 'Preserve an armed boundary across native toolbar replacement');
  // Expanded footer uses current author data without replacing native actions or duplicating itself.
  let footerAuthor, authorCreates = 0, footerChanged, observedAnswers = 0;
  const profile = { textContent: '作者甲', getAttribute: () => '/people/author' };
  const avatar = { src: 'https://pic1.zhimg.com/avatar.jpg' };
  const answer = { querySelector: selector => selector.includes('name') ? profile : avatar, getAttribute: () => '{}' };
  const plainLink = { href: '/should-not-open', tabIndex: 0, hasAttribute() { return !!this.href; }, removeAttribute() { delete this.href; } };
  let voted = false;
  const voteMock = { textContent: '赞同 1,234', dataset: {}, attrs: { 'aria-label': '赞同 1,234' },
    classList: { contains: () => voted }, matches: () => true, getAttribute(key) { return this.attrs[key]; }, setAttribute(key, value) { this.attrs[key] = value; } };
  const commentMock = { textContent: '45 条评论', dataset: {} };
  const nativeActions = { querySelector: selector => selector === ':scope > .jimi-answer-author' ? footerAuthor : selector.includes('VoteButton') ? voteMock : selector.includes('ChatBubble') ? commentMock : null, prepend: element => { footerAuthor = element; authorCreates++; } };
  const rich = { querySelectorAll: () => [plainLink], querySelector: selector => selector === '.ContentItem-actions' ? nativeActions : null, closest: () => answer };
  const footerAPI = load('iPhone Safari', 5, 402, 874, {
    querySelectorAll: () => [rich],
    createElement: () => {
      const img = { getAttribute() { return this.src; } }, label = {};
      return { dataset: {}, querySelector: selector => selector === 'img' ? img : label,
        setAttribute(name, value) { this[name] = value; }, removeAttribute(name) { delete this[name]; } };
    }
  }, { MutationObserver: class {
    constructor(callback) { footerChanged = callback; }
    observe(target) { assert.equal(target, rich); observedAnswers++; }
  } });
  footerAPI.syncIPhoneExpandedAnswers();
  footerAPI.syncIPhoneExpandedAnswers();
  assert.equal(observedAnswers, 1);
  assert.equal(authorCreates, 1);
  assert.equal(footerAuthor.querySelector('span').textContent, '作者甲');
  assert.equal(footerAuthor.querySelector('img').src, avatar.src);
  assert.equal(footerAuthor.href, '/people/author');
  assert.equal(voteMock.dataset.jimiLabel, '1234');assert.equal(commentMock.dataset.jimiLabel, '45');
  voted = true;footerChanged([{ type: 'attributes', target: voteMock }]);assert.equal(voteMock.attrs['aria-pressed'], 'true');
  voteMock.textContent = '已赞同 1,235';commentMock.textContent = '收起评论';
  footerChanged([{ type: 'characterData' }]);
  assert.equal(voteMock.dataset.jimiLabel, '1235');assert.equal(commentMock.dataset.jimiLabel, '收起评论');
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
  footerAuthor = undefined; // A native action-bar replacement must restore the author without a resize.
  footerChanged();
  assert.equal(authorCreates, 2);
  assert.equal(observedAnswers, 1);
  assert.equal(footerAuthor.querySelector('span').textContent, '作者乙');
  for (const [text, media, blocked] of [[true, false, true], [true, true, false], [false, false, false]]) {
    let prevented = false, stopped = false;
    footerAPI.blockIPhoneAnswerTextClick({
      target: { closest: selector => selector.startsWith('.RichContent-inner') ? null : selector.startsWith('img') ? media : text },
      preventDefault: () => { prevented = true; }, stopImmediatePropagation: () => { stopped = true; }
    });
    assert.equal(prevented, blocked);
    assert.equal(stopped, blocked);
  }
  // Read the original URL at click time, including lazy images; never open two viewers or hijack GIF playback.
  let original = 'https://pic1.zhimg.com/image_r.jpg', gif = false, opened;
  const previewImage = {
    src: 'data:image/svg+xml,placeholder', currentSrc: 'data:image/svg+xml,placeholder', style: {},
    getAttribute: key => key === 'data-original' ? original : 'https://pic1.zhimg.com/image_720w.jpg',
    closest: () => gif
  };
  assert.equal(api.getPreviewImageSrc(previewImage), original);
  original = '';
  assert.equal(api.getPreviewImageSrc(previewImage), 'https://pic1.zhimg.com/image_720w.jpg');
  original = 'https://pic1.zhimg.com/loaded_r.jpg';
  footerAPI.myPreview.open = src => { opened = src; };
  for (const isGif of [false, true]) {
    gif = isGif; opened = undefined;
    let prevented = false, stopped = false;
    footerAPI.blockIPhoneAnswerTextClick({
      target: { closest: selector => selector.startsWith('.RichContent-inner') ? previewImage : true },
      preventDefault: () => { prevented = true; }, stopImmediatePropagation: () => { stopped = true; }
    });
    assert.equal(opened, gif ? undefined : original);
    assert.equal(prevented, !gif);
    assert.equal(stopped, !gif);
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
  assert.equal(preset.mobile.feedBatchSize, 10);
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
    syncIPhoneFeedBatch: () => order.push('counted'), syncIPhoneFeed() {}, syncIPhoneAnswerFocus() {}, syncIPhoneExpandedAnswers() {}, syncIPhoneCollapseButtons() {}
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
  console.log('PASS: syntax, Markdown sync, local original hashes when present, release metadata and version migration, no settings UI, automatic light/dark theme, phone detection, preset priority, persistence, bounded native toolbar, dock-before-comments, armed auto-collapse boundaries and comment guards, collapse, single-answer focus and linked comment dismissal, avatars, Safari fetch, filtered 10-item cap, no bottom refresh code, expanded author footer, plain-text click protection and original-image selection');
})().catch(error => { console.error(error); process.exitCode = 1; });
