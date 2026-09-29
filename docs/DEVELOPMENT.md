# 开发与发布

## 仓库约定

| 项目 | 固定值 |
| --- | --- |
| 展示名／`@name` | 吉姆的知乎 · iPhone Safari |
| 仓库 | `kieran107/zhihu-plugin` |
| `@namespace` | `local.jim.zhihu.iphone` |
| 安装包 | `吉姆的知乎-iPhone.user.js` |
| 更新元数据 | `吉姆的知乎-iPhone.meta.js`，由发布命令生成 |
| 参数来源 | `iPhone知乎-参数.md` 中的 JSON |

为兼容已经安装的版本，保留上述身份、路径及脚本的 GM 存储键。`6.0.0` 是独立版本规则的起点，数字高于旧版 `5.21.4-iphone.N`，不表示上游发布了 6.0.0。

## 版本规则

采用 [语义化版本](https://semver.org/lang/zh-CN/) 的三段格式，结合本脚本的使用行为划分：

- `X`：需要用户迁移的配置／使用方式变化。
- `Y`：兼容现有使用方式的新功能。
- `Z`：修复、样式微调或默认参数调整。

在 `@version` 中使用 `6.0.0`，不要加 `v` 或 `iphone.N`。上游基线单独记在 [第三方说明](../THIRD_PARTY_NOTICES.md)。需要次版本或主版本升级时，先手动修改 `@version`；普通代码变动且版本未增加时，发布器递增修订号。只改文档不必升级安装包。

重复发布无变化的代码不会制造新版本。版本低于远端时停止；回退功能时恢复旧代码后仍使用更高的新版本，不回退远端历史。发布提交使用 `chore(release): vX.Y.Z`。

## 本地流程

需要 Node.js 18+、Git 和该仓库的推送权限。无需安装 npm 依赖。

1. 修改参数时先编辑 Markdown 的 JSON；修改功能时编辑 `.user.js`。不要编辑生成的 `.meta.js`。
2. 更新 [CHANGELOG.md](../CHANGELOG.md) 中的使用变化。
3. 同步预设和元数据供本地检查（不提交、不联网）：

   ```sh
   node - <<'JS'
   const fs = require('node:fs');
   const { execFileSync } = require('node:child_process');
   const r = require('./发布更新.cjs');
   const prepared = r.prepare(
     fs.readFileSync(r.SCRIPT, 'utf8'),
     fs.readFileSync('iPhone知乎-参数.md', 'utf8'),
     execFileSync('git', ['show', `origin/main:${r.SCRIPT}`], { encoding: 'utf8' })
   );
   fs.writeFileSync(r.SCRIPT, prepared.source);
   fs.writeFileSync(r.META, prepared.meta);
   fs.writeFileSync('iPhone知乎-参数.md', prepared.markdown);
   JS
   ```

4. 运行检查，并按改动检查知乎真实页面：

   ```sh
   node 发布更新.cjs --check
   ```

5. 发布（macOS 也可双击 `一键发布.command`）：

   ```sh
   node 发布更新.cjs
   ```

发布器校验 main 分支和 origin，获取远端状态，同步参数，必要时递增修订号，生成元数据，运行检查，按文件白名单提交并推送，最后核对远端提交及固定 Raw 地址的内容。

远端领先、有冲突或已存在暂存内容时会停止，先保留并处理双方修改。只有工作区干净且可以快进时才使用 `git pull --ff-only`；不强推，不 `reset --hard`。认证或推送失败会保留本地提交，修复后重跑同一命令。Raw 尚未同步时也可稍后重跑，不要仅因缓存延迟再升版本。

手机端由 Tampermonkey 负责检查并安装更新；现有页面需重新加载。发布命令不能证明 iPhone 已安装新版本。

## 验证范围

零依赖检查覆盖语法、参数同步、发布版本、更新地址、主题选择、预设优先级、存储、收起与评论联动、头像补取、推荐上限、请求终止和原图选择等行为。两份上游原文件存在时还会核对哈希。

页面检查应覆盖改动涉及的推荐／回答／评论场景；布局改动补查亮暗主题及竖横屏。Chrome 手机模拟、GM 替身、DOM 状态模拟和 iPhone Safari 实机结果应分别记录，不把前者报告为后者。不要为了测试而在真实账户自动发评论或点赞。

`output/`、`.playwright-cli/`、`design-qa.md` 和两个第三方原文件留在本地；不提交截图、浏览器状态、令牌、配置导出文件或测试备份。发布文件白名单定义在 `发布更新.cjs`，新增公共文档时同步加入。

## GitHub 与 Greasy Fork

GitHub 是当前源码与分发入口；`main` 中的 `.user.js` 和 `.meta.js` 在同一次提交中发布。Greasy Fork 上架准备见 [发布准备](GREASYFORK.md)，目前没有自动上传到 Greasy Fork 的步骤。

未来若启用 Greasy Fork 的同步功能，仍维护同一个源码文件；须在平台上实际配置并核验成功后，才能对外宣称两个渠道同步。不要在运行于知乎的脚本内自行轮询版本或下载执行远程主代码。
