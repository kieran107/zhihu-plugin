# 吉姆的知乎 · iPhone Safari

本地修改 → 一键检查与提交 → GitHub main → Tampermonkey 自动检查并安装更新。

## iPhone 首次接入（只做一次）

1. 用 iPhone Safari 打开 **[安装／更新脚本](https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/%E5%90%89%E5%A7%86%E7%9A%84%E7%9F%A5%E4%B9%8E-iPhone.user.js)**，选择 Tampermonkey 安装或更新同名脚本。若只显示源码，在 Tampermonkey 管理面板使用「从 URL 安装」并粘贴这个链接。不要使用 GitHub 的 `tree/main` 页面作为安装地址。
2. 在 Tampermonkey 设置中开启「脚本更新」的检查；检查间隔选当前版本提供的最短合适间隔，若有「每小时」可选择每小时。若选项隐藏，可将配置模式改为高级。
3. 开启「自动安装 / Automatic installation」。检查脚本自身的更新设置也为启用，更新 URL 指向本仓库的 `.meta.js`，下载 URL 指向 `.user.js`。首次刷新知乎，确认个人版为 `5.21.4-iphone.11` 或更高；停用同名旧副本和第三方原版。

之后无需重复复制代码。设置都在 Tampermonkey 管理页完成，知乎页面不增加任何按钮或调节图标。Safari 继续保持知乎「请求桌面网站」。

**这不是即时推送。** 更新按扩展检查间隔执行，还取决于联网、扩展是否运行及 GitHub Raw 缓存。已经打开的知乎页面会在下次加载时使用新版；本脚本的 15 条换批本来就会刷新。需要立即试新版时，可在扩展里执行一次「检查更新」后刷新知乎，无需复制代码。此仓库不能替你远程开启 iPhone 扩展设置，也不能保证锁屏后台实时更新。

原有 v10 及更早的手动安装版没有此更新地址，所以首次仍需按安装链接更新一次。尽量不再直接改手机里的脚本；改动统一留在本地版本库，避免扩展保护本地修改而跳过更新。

## 以后怎么修改和发布

直接告诉 Codex 需要修改的功能。仓库的 `AGENTS.md` 已记录：完成修改和验证后默认发布，除非你明确要求只改本地。

自己操作时，修改 `iPhone知乎-参数.md` 的 JSON 或脚本功能，然后双击 **`一键发布.command`**；也可在此目录运行：

```sh
node 发布更新.cjs
```

命令依次执行：

- 检查 main 分支、目标仓库和暂存区，获取远端状态；远端领先或存在冲突时停止，不覆盖。
- 从 Markdown 同步预设到 JS；代码变化而版本尚未增加时，自动递增 `iphone.N`。
- 生成 `吉姆的知乎-iPhone.meta.js`，运行零依赖检查。
- 仅提交发布文件清单中的源码、参数和维护文件，推送到 GitHub。
- 核对远端提交，以及安装文件和元数据的固定 Raw 地址内容。

命令可重复运行：已发布且没有变化时不会制造新版本。推送失败后本地提交保留，排除网络或认证问题后重新运行即可；Raw 缓存尚未同步会明确提示，不谎报已经到达手机。

只验证、不修改或上传：

```sh
node 发布更新.cjs --check
```

需要 Node.js 18+、Git 和此仓库的 Git 推送权限。这台 Mac 已有 Node.js 与 Git；双击入口兼容当前 nvm 安装。换电脑时先克隆本仓库并配置 GitHub 推送身份。仓库不保存访问令牌或密码。

## 本地与远端有不同修改时

正常流程只从本地发布到 main。若你在 GitHub 网页改了文件，发布命令会先停下，保护双方内容；让 Codex 合并后再发布。工作区干净且仅远端领先时，可运行 `git pull --ff-only`。不使用强推、不自动丢弃本地文件。

两个第三方原 JS、`output/` 截图和备份、`.playwright-cli/` 浏览器状态及 `design-qa.md` 只保留在本地，不重新上传。检查脚本在原 JS 存在时核对其哈希；干净克隆也可以运行检查。

若需回退手机版本，恢复旧版的功能代码后仍要发布更高的 `iphone.N`，不要把版本号改小，也不要回退远端历史。

## 更新地址

- [安装文件](https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/%E5%90%89%E5%A7%86%E7%9A%84%E7%9F%A5%E4%B9%8E-iPhone.user.js)
- [轻量版本元数据](https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/%E5%90%89%E5%A7%86%E7%9A%84%E7%9F%A5%E4%B9%8E-iPhone.meta.js)
- [参数说明](iPhone知乎-参数.md)

保持 `@name`、`@namespace`、存储键和固定更新路径稳定，才能更新已有脚本；元数据与安装文件在同一次 Git 提交中发布。

机制依据：[Tampermonkey 更新地址说明](https://www.tampermonkey.net/documentation.php?locale=en&q=update_url)、[版本递增规则](https://www.tampermonkey.net/documentation.php?q=version)、[Safari 自动更新说明](https://www.tampermonkey.net/index.php?browser=safari)、[自动安装选项说明](https://apps.apple.com/us/app/tampermonkey/id6738342400)。未做 iPhone 实机自动更新验证。
