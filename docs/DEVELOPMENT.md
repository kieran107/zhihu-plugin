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

保留上述身份、路径及脚本的 GM 存储键。当前版本从 `1.0` 起，与上游版本分开；原来的 `6.0.0` 与 `5.21.4-iphone.N` 保留为历史记录。

## 版本规则

只使用 **`1.N`**：`1.0 → 1.1 → 1.2 → … → 1.9 → 1.10`。`N` 是逐次递增的整数，不补零，也不按小数理解；不再细分主版本、功能版本与补丁版本。

脚本有变化且未手动递增版本时，发布器将 `N` 加一；已指定更高的 `1.N` 则保留。只改文档不升级安装包，重复发布不制造新版本。提交名为 `chore(release): v1.N`，发布标签使用 `v1.N`。

本次明确允许唯一的编号重置 **`6.0.0 → 1.0`**，其余降级仍被发布器拒绝。旧安装不能自动降到 1.0，用户须从原链接手动覆盖同名脚本一次，之后恢复正常自动更新。不要删除原脚本或改写旧标签来掩盖这次重置。

版本判断依据见 [Tampermonkey 的 @version 说明](https://www.tampermonkey.net/documentation.php?locale=en&q=version)。上游基线单独记录在 [第三方说明](../THIRD_PARTY_NOTICES.md)。

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

发布器校验 main 分支和 origin，获取远端状态，同步参数，必要时递增点后的编号，生成元数据，运行检查，按文件白名单提交并推送，最后核对远端提交及固定 Raw 地址的内容。

远端领先、有冲突或已存在暂存内容时会停止，先保留并处理双方修改。只有工作区干净且可以快进时才使用 `git pull --ff-only`；不强推，不 `reset --hard`。认证或推送失败会保留本地提交，修复后重跑同一命令。Raw 尚未同步时也可稍后重跑，不要仅因缓存延迟再升版本。

手机端由 Tampermonkey 负责检查并安装更新；现有页面需重新加载。发布命令不能证明 iPhone 已安装新版本。

## 验证范围

零依赖检查覆盖语法、参数同步、发布版本、更新地址、主题选择、预设优先级、存储、收起与评论联动、动画取消与连续操作清理、减少动态效果回退、头像补取、推荐上限、请求终止、原图选择、新标签页跳转保护与回答 IP 属地整理等行为。两份上游原文件存在时还会核对哈希。

页面检查应覆盖改动涉及的推荐／回答／评论场景；布局改动补查亮暗主题及竖横屏。Chrome 手机模拟、GM 替身、DOM 状态模拟和 iPhone Safari 实机结果应分别记录，不把前者报告为后者。不要为了测试而在真实账户自动发评论或点赞。

`output/`、`.playwright-cli/`、`design-qa.md` 和两个第三方原文件留在本地；不提交截图、浏览器状态、令牌、配置导出文件或测试备份。发布文件白名单定义在 `发布更新.cjs`，新增公共文档时同步加入。

## GitHub 与 Greasy Fork

GitHub 是当前源码与分发入口；`main` 中的 `.user.js` 和 `.meta.js` 在同一次提交中发布。Greasy Fork 上架准备见 [发布准备](GREASYFORK.md)，目前没有自动上传到 Greasy Fork 的步骤。

未来若启用 Greasy Fork 的同步功能，仍维护同一个源码文件；须在平台上实际配置并核验成功后，才能对外宣称两个渠道同步。不要在运行于知乎的脚本内自行轮询版本或下载执行远程主代码。
