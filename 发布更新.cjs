// 零依赖发布：node 发布更新.cjs；只检查：node 发布更新.cjs --check
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const SCRIPT = '吉姆的知乎-iPhone.user.js';
const META = '吉姆的知乎-iPhone.meta.js';
const PARAMS = 'iPhone知乎-参数.md';
const REPO = 'https://github.com/kieran107/zhihu-plugin';
const RAW = 'https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/';
const FILES = [SCRIPT, META, PARAMS, '检查脚本.cjs', '发布更新.cjs', '一键发布.command', 'README.md', 'AGENTS.md', '.gitignore'];
const header = source => source.match(/^\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/)[0] + '\n';
const version = source => source.match(/^\/\/ @version\s+(\S+)/m)[1];

function prepare(source, markdown, remoteSource) {
  const preset = JSON.parse(markdown.match(/```json\n([\s\S]*?)\n```/)[1]);
  if (!preset.mobile || !preset.script) throw new Error('参数必须包含 mobile 和 script。');
  source = source.replace(/const IPHONE_PRESET = [\s\S]*?;\n  \/\/ END IPHONE_PRESET/,
    `const IPHONE_PRESET = ${JSON.stringify(preset, null, 2).replace(/\n/g, '\n  ')};\n  // END IPHONE_PRESET`);
  let next = version(source);
  if (source !== remoteSource) {
    const local = next.match(/^(\d+\.\d+\.\d+-iphone\.)(\d+)$/);
    const remote = version(remoteSource).match(/^(\d+\.\d+\.\d+-iphone\.)(\d+)$/);
    if (!local || !remote || local[1] !== remote[1]) throw new Error('上游基础版本发生变化，请先核对版本规则再发布。');
    next = local[1] + Math.max(Number(local[2]), Number(remote[2]) + 1);
    source = source.replace(/^(\/\/ @version\s+)\S+/m, `$1${next}`);
  }
  markdown = markdown.replace(/个人版版本：`[^`]+`/, `个人版版本：\`${next}\``)
    .replace(/当前版本为 `iphone\.\d+`/, `当前版本为 \`iphone.${next.split('.').at(-1)}\``);
  return { source, markdown, meta: header(source), version: next };
}

async function publish() {
  process.chdir(__dirname);
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--check')) throw new Error('用法：node 发布更新.cjs [--check]');
  const check = () => execFileSync(process.execPath, ['检查脚本.cjs'], { stdio: 'inherit' });
  if (args.includes('--check')) { check(); return; }
  const git = (...args) => execFileSync('git', args, { encoding: 'utf8', env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } }).trim();
  if (git('branch', '--show-current') !== 'main') throw new Error('请在 main 分支发布。');
  if (![REPO + '.git', 'git@github.com:kieran107/zhihu-plugin.git'].includes(git('remote', 'get-url', '--push', 'origin'))) {
    throw new Error('origin 推送地址不是指定的 zhihu-plugin 仓库。');
  }
  if (git('diff', '--cached', '--name-only') || git('ls-files', '-u')) throw new Error('已有暂存内容或冲突，请先处理；本次未提交。');
  git('fetch', 'origin', 'main');
  if (spawnSync('git', ['merge-base', '--is-ancestor', 'origin/main', 'HEAD']).status !== 0) {
    throw new Error('GitHub 有本地尚未合入的提交。请先保留本地改动并合入远端，再重新发布；不会强推覆盖。');
  }
  const remoteSource = execFileSync('git', ['show', `origin/main:${SCRIPT}`], { encoding: 'utf8' });
  const prepared = prepare(fs.readFileSync(SCRIPT, 'utf8'), fs.readFileSync(PARAMS, 'utf8'), remoteSource);
  for (const [file, contents] of [[SCRIPT, prepared.source], [PARAMS, prepared.markdown], [META, prepared.meta]]) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== contents) fs.writeFileSync(file, contents);
  }
  check();
  git('add', '--', ...FILES);
  git('diff', '--cached', '--check');
  if (git('diff', '--cached', '--name-only')) {
    execFileSync('git', ['commit', '-m', `Publish ${prepared.version} and sync workflow`], { stdio: 'inherit' });
  }
  execFileSync('git', ['push', 'origin', 'HEAD:main'], { stdio: 'inherit', env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
  const sha = git('rev-parse', 'HEAD');
  if (git('ls-remote', 'origin', 'refs/heads/main').split(/\s/)[0] !== sha) throw new Error('推送后远端又发生变化，请核对 main。');
  console.log(`GitHub 已同步：${prepared.version} · ${sha.slice(0, 7)}`);
  const url = RAW + encodeURIComponent(SCRIPT);
  try {
    for (const [file, expected] of [[SCRIPT, prepared.source], [META, prepared.meta]]) {
      const response = await fetch(RAW + encodeURIComponent(file), { signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' } });
      if (!response.ok || await response.text() !== expected) throw new Error(`${file} 的 Raw 内容尚未同步`);
    }
    console.log('安装文件和更新元数据均已在固定 Raw 地址核对通过。');
  } catch (error) {
    console.warn(`提交已推送；Raw 链接暂未验证通过：${error.message}。稍后可重新运行同一命令，不必再次改版本。`);
  }
  console.log(`手机首次安装链接：${url}\n之后由 Tampermonkey 按设置的间隔自动更新；现有网页在下次加载时使用新版。`);
}

module.exports = { prepare, header, version, SCRIPT, META, REPO, RAW };
if (require.main === module) publish().catch(error => { console.error(`发布停止：${error.message}`); process.exitCode = 1; });
