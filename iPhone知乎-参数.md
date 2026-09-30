# 吉姆的知乎 · iPhone Safari：参数说明

适用：iPhone 16 Pro 的 Safari，知乎开启「请求桌面网站」。当前版本：`1.21`。上游基线：知乎修改器网页端 5.21.4；旧移动端 2.9.4 仅参考隐藏 App 引导等显示方式。来源及许可见 [第三方说明](THIRD_PARTY_NOTICES.md)。

加载优化：主题、字号和隐藏规则在读取扩展存储前生效；推荐卡片先过滤、排版再显示，介绍区随首批回答出现。`saveHistory: false` 时不读取历史存储。已删除设置面板的闲置菜单、表单和专用样式，参数仍只在本文件调整。

## 文件与修改方式

- 安装文件：`吉姆的知乎-iPhone.user.js`。
- 只启用本版，停用原网页端、旧移动端及其他旧副本，避免重复拦截。第三方原文件只保留在维护者本地。
- **修改下方 JSON，保存后告诉 Codex「按参数文件同步脚本」**。Codex 更新并运行 `node 发布更新.cjs` 后，由手机 Tampermonkey 自动更新；首次接入见 [README.md](README.md)。
- Markdown 不会被手机自动读取。个人参数在 JS 顶部 `IPHONE_PRESET`；未列出的原版参数沿用同一 JS 中的 `CONFIG_DEFAULT`，需要时可追加到 `script` 对象。
- 设置面板、齿轮、设置菜单、设置快捷键均不创建。黑名单标签选择弹窗固定关闭。
- 每次加载以代码预设为准，旧的浏览器设置不能覆盖它。代码中导入的黑名单、不感兴趣记录与手机手动新增记录合并去重。手动操作仍会保存；已经写入浏览器存储的记录不会仅因从 JSON 删除而清除。
- 本仓库安装包仅使用本 GitHub 仓库作为更新源，不连接原作者的更新地址；第三方更新仍需人工合并。`.meta.js` 由发布命令从 JS 头部生成，不要单独修改。

## 本版采用的电脑预设

来源：`知乎编辑器配置-20260928-132254-1790572974116.txt`，原导出文件未修改。除下列手机适配外，导出配置全部写入下方 JSON；时间戳 `t` 不是偏好，不导入。

- 隐藏页头、Logo 及多余侧栏；页头中的搜索和导航也随之隐藏。需要恢复时将 `hiddenHeader` 改为 `false`。
- 过滤视频、文章、想法、提问卡片、广告、盐选、电子书及低于 100 赞的列表内容；问题详情中的低赞回答过滤保持关闭。
- 导入 5 个标题关键词和 43 条“不感兴趣”记录；这些导入记录只用于本地过滤，不会自动向知乎补发反馈。保留额外“不感兴趣”按钮，手动点击才会提交反馈。
- 自动跟随设备浅色／深色模式（`theme: "2"`），设备切换后页面直接更新，无需刷新；不增加调节图标、开关或设置入口。原作主题配色参数保留。
- 推荐每轮最多显示 10 条有效内容，满额后停止向下加载；底部没有刷新手势或操作按钮，继续上划只保留浏览器自然回弹，露出相同的页面底色。顶部增加 240px 背景区，显示「↑ 上拉刷新」、大字项目标题「吉姆的知乎」与「安静地阅读」；10 条满额后最后一张卡片下增加 120px 背景结束区，显示「已到底部了」。首尾为静态文字，不创建刷新按钮或自定义手势。回到页面顶部使用 Safari 原生下拉刷新，可能出现重复推荐。只作用于首页推荐，关注、热榜、问题详情不分页。
- 推荐分批模式下暂停原作删除前 50 条的逻辑，避免本批内容被删；其他页面保持原有高性能参数。

本次改版：重新关闭列表缩略图（`hiddenListImg: true`），推荐／关注中的回答使用独立圆角卡片，18px 圆角、12px 卡片间隔与外侧留白，灰度底板上的顶部单点透视、底部平铺的方格纸、分层阴影和细边缘随设备主题切换；中间为 20 列等宽等高的小方格，向下平铺到底，不保留底部透视面；竖线与顶部 96px 高的单点透视面一一对齐，横线按透视投影越远越密，全部为直线；顶部横线最小间距为 1.5px，继续延伸至尖端，不再停止绘制或使用灰色填块；底板高度按完整方格向下取整，不足一格的尾端向上裁掉，最下端以 1px 横线收口，消失点贴住视口上边缘，浅色与暗色分别配色，使用内嵌 SVG，无外部图片；固定在卡片下方，滚动时与卡片形成轻微错位；42px 灰色「吉姆的知乎」和 18px「安静地阅读」固定印在顶部透视面下方 144px 方格留白的正中，刷新提示按箭头在上、「上拉刷新」在下分两行居中，固定在透视面中下部，卡片从文字上方经过，开启系统减少动态效果后改为跟随页面滚动；卡片内侧各 15px，文字距屏幕边缘仍为 27px，普通页面各 21px。收起时纵向显示完整标题、最多两行摘要，下方一行显示“24px 头像＋作者姓名＋xxxx 人赞同”，信息文字为 14px，列表标题为 20px；标题与摘要间距 8px，摘要与作者行间距 10px；赞同人数不加千位逗号，列表不显示评论数；点击整条在原位置展开，展开后标题下直接显示 19px 正文，浅色文字恢复为 #202124，暗色保留 #d0d2d6，顶部作者资料与赞同提示隐藏；正文里的链接与划线评论显示为普通文字，不再跳转或弹窗；正文图片按两行正文高度缩小（目前上限 62px），点击时优先加载 data-original 原图，大图按实际显示尺寸排版，不再放大 62px 的缩略图图层；支持浏览器双指缩放，轻点或按 Escape 关闭；底部操作改为一条实色圆角长矩形栏，高 60px、圆角 18px，包含四个等宽区域，依次为“作者头像、点赞、评论、收起”。作者只显示 34px 头像，头像外侧保留 2px 白色留隙与 1px 黑色细圆环，完整姓名保留在可访问标签和链接说明中；点赞和评论显示线框图标及数量，收起显示上箭头与文字。点赞、评论保留原生按钮、事件与数据更新，不复制原生节点；操作栏内部不再逐格加框。一次只展开一篇可收起的回答，打开下一篇时自动收起上一篇及其评论；手动收起同样关闭该回答的评论与回复弹窗。展开时其他回答淡化至 55% 不透明度；上方卡片整体上移 12px，下方整体下移 12px，让展开回答两侧的视觉间距从 12px 增至 24px。位移与当前卡片阴影使用 520ms、cubic-bezier(.4, 0, .2, 1) 缓入缓出过渡；阴影通过固定阴影层的 opacity 从 0 到 1 逐渐加深，收起时淡出并归位；不插值长回答高度或外边距，不新增逐帧 JavaScript，系统减少动态效果开启时立即切换。整条栏通过 CSS sticky 在当前正文范围内悬浮，上界留出两行正文高度（当前 62px），距视口底部至少 12px 并避开安全区；正文末尾保留 64px 高、20px 圆角的归位区域；视觉槽面不向外延伸，保留柔和内阴影；操作栏归位后几乎覆盖整个槽，只露出 2px 窄边。边线弱化，悬浮时使用水平与垂直偏移均为 0 的柔和投影，四周均匀、上下对称；内部点击区高 48px。兼容知乎带 Sticky 包装和直接显示操作栏两种结构，不添加跟随滚动的位置计算。悬浮栏完整进入阅读范围后，向下沉出正常悬浮位约 6px、或向上越过屏幕约 180px 的背景标题下沿时，自动收起当前回答；使用浏览器 IntersectionObserver，保住当前卡片或下一卡片的阅读位置。打开／浏览评论时暂停，关闭评论后回到正文阅读范围再启用，避免刚展开、点击评论和旋转屏幕时误收起。点评论时先立即滚到文末槽位，使操作栏位于屏幕上方，再调用当前原生按钮展开下方评论；滚入评论后操作栏随正文离开屏幕，评论自己的收起按钮保留。少量评论没有原生底部关闭按钮时，收起回答仍会通过原生评论开关关闭。标题后“不感兴趣”改为灰色下划线文字，无边框，较文字基线上移 3px，仍需手动点击才提交反馈。头像优先复用知乎返回的数据或原生头像；缺失时，条目接近屏幕才向知乎补取作者资料，失败不循环重试。可收起回答关闭后整条栏和槽位隐藏；问题详情中本来就完整显示且无原生收起操作的短回答使用静态三格整体栏，不增加无效的收起按钮。

评论区与“查看全部回复”弹窗统一使用页面背景、低对比细边线和 14px 圆角；正文 17px／1.65 倍行高、作者 16px、评论标题 17px；时间与点赞数 15px、排序文字 14px、查看／展开回复与收起评论 15px。排序组件增高至 36px，展开回复按钮最小 40px，评论上下留白 16px；子元素显式继承，避免原生字号覆盖。默认隐藏自己的评论／回复输入模块、发布工具和逐条回复按钮；评论阅读、排序、加载更多与回复弹窗保留；评论点赞后红心和数字使用柔和玫瑰红（浅色 #b95763、暗色 #e79aa4），取消后恢复灰色；默认／最新、查看全部／展开其他回复及收起按钮的文字与图标均垂直居中。打开页内评论后，“收起评论”作为 120×44px、14px 圆角胶囊（浅色深灰边／暗色白边）悬浮在当前评论区右下角；离开当前评论区时随之滚走，关闭后消失。评论或全部回复以弹窗打开时，原生关闭按钮也改为右下角“收起评论”；滚动内容时保持不动，末尾留出按钮空间。

手机例外：页面顶部新增 12px 实色固定取色层，引导 Safari 状态栏采用页面底色（最终系统栏效果需 iPhone 实机确认）；推荐页复用金字塔尖端纹理，不占布局、不拦截触摸，减少动态效果时只保留纯底色。页面底色、页头背景及 Safari 页面主题色随设备切换：推荐底板浅色为 `#f2f3f5`、暗色为 `#101113`，卡片及普通页面浅色为白色、暗色为深灰色 `#191919`；电脑配置中留空的 6 项字号和行高继续使用本版的手机数值；电脑的 600 像素版心在手机上由自适应宽度覆盖。设置快捷键 `hotKey`、屏蔽后的标签弹窗 `openTagChooseAfterBlockedUser` 固定关闭，`hiddenOpenButton` 固定开启；设置面板不会恢复。悬浮切换维持关闭。本版额外的 `cancelCommentAutoFocus: false` 和 `saveHistory: false` 继续保留。

## 常用参数

`true` 开启，`false` 关闭；有引号的数字保留引号。下方 JSON 是唯一需要编辑的参数区。

| 参数 | 含义 |
| --- | --- |
| `mobile.enabled` | 手机上启用布局适配；兼容请求桌面网站后的桌面 User-Agent |
| `mobile.listImageMaxLines` | 列表小图备用高度，当前缩略图关闭，此项不生效 |
| `mobile.answerImageMaxLines` | 展开回答的图片高度上限，以正文行高为单位；当前 2 × 31 = 62px，保持比例，点图看大图 |
| `mobile.compactFeed` | 推荐／关注中的回答使用紧凑预览，当前 true；false 恢复原版列表结构 |
| `mobile.feedBatchSize` | 推荐页每批最多显示的有效条数，当前 10；0 关闭，建议 10～30。底部停止加载，顶部保留 Safari 原生刷新 |
| `mobile.feedSummaryLines` | 紧凑列表摘要最多显示行数，当前 2，建议 1～2 |
| `mobile.readOnlyComments` | 当前 true，隐藏页内及弹窗的评论输入、发布工具与回复按钮；保留阅读、排序和查看全部回复。改为 false 可恢复发言入口 |
| `mobile.floatingCollapse` | 展开回答内的整体悬浮操作栏，默认开启；到文末阴影槽归位，使用知乎原生点赞、评论与收起行为 |
| `script.hiddenListImg` | 是否完全隐藏列表图片，当前 true；头像保留 |
| `mobile.pagePadding` | 普通页面左右留白，当前 21 CSS 像素；紧凑推荐／关注列表使用 12px 卡片外边距＋15px 内边距，文字距屏幕边缘仍为 27px |
| `mobile.openInternalLinksInSameTab` | 普通点击知乎站内链接在本标签页打开；外链、下载、带修饰键点击不改 |
| `mobile.hideSidebars` | 隐藏首页、问题、搜索、用户主页和收藏夹的侧栏 |
| `mobile.hideOpenApp` | 隐藏已知 App 引导；不保证覆盖未来新增样式 |
| `script.fontSizeForList` | 列表摘要字号，当前 17；摘要行高为字号的 1.5 倍，即 25.5px |
| `script.fontSizeForAnswer` / `fontSizeForArticle` | 回答／文章正文字号，当前分别为 19／18 |
| `script.fontSizeForListTitle` / `fontSizeForAnswerTitle` / `fontSizeForArticleTitle` | 列表／问题／文章标题字号，当前分别为 20／22／26 |
| `script.contentLineHeight` | 正文段落行高，当前 31 像素；加大字号时相应加大 |
| `script.theme` | 当前 `"2"` 自动跟随系统；`"0"` 固定浅色，`"1"` 固定深色。仅代码配置，不提供调节图标 |
| `script.themeLight` / `themeDark` | 原作主题色编号；当前浅色 4（浅灰）、深色 1 |
| `script.answerOpen` | `"default"` 保持知乎行为，`"on"` 自动展开回答，`"off"` 收起长回答 |
| `script.homeContentOpen` | 用户主页内容：`"0"` 默认，`"1"` 自动展开 |
| `script.hiddenAD` / `hiddenQuestionAD` / `removeTopAD` | 原作广告隐藏与顶部广告关闭 |
| `script.hiddenHomeWriteArea` | 隐藏首页顶部发想法／创作区，当前开启；设为 false 恢复 |
| `script.hiddenReadMoreText` | 原版列表隐藏「阅读全文」文字；紧凑列表直接点击整条展开 |
| `script.removeFromYanxuan` / `removeFromEBook` | 过滤带盐选／电子书标记的内容，当前沿用原作开启 |
| `script.removeUnrealAnswer` / `removeItemAboutVideo` / `removeItemAboutArticle` | 虚构过滤关闭；视频、文章过滤开启 |
| `script.removeLessVote` | 当前开启，`lessVoteNumber: "100"`；详情页由 `removeLessVoteDetail` 单独控制，当前关闭 |
| `script.filterKeywords` / `blockWordsAnswer` | 标题／内容过滤词，例 `["关键词一", "关键词二"]`。沿用原作正则匹配；空数组不过滤，非法正则会被忽略 |
| `script.linkShopping` | `"0"` 原样，`"1"` 仅文字，`"2"` 隐藏购物链接 |
| `script.replaceZhidaToSearch` | 当前 `"removeLink"` 将知乎直达保留为文字；`"default"` 恢复原样。展开回答的其他正文链接也不可跳转 |
| `script.videoInAnswerArticle` | `"0"` 原样，`"1"` 改成链接，`"2"` 隐藏视频／过滤视频回答 |
| `script.copyAnswerLink` | 显示复制回答链接按钮 |
| `script.listItemCreatedAndModifiedTime` | 列表摘要是否额外显示时间；当前关闭节省空间 |
| `script.answerItemCreatedAndModifiedTime` / `questionCreatedAndModifiedTime` / `articleCreateTimeToTop` | 回答／问题／文章顶部时间 |
| `script.questionTitleTag` / `listTitleTag*` | 保留原作类型标签设置，列表分别控制问答、文章、视频、想法 |
| `script.fetchInterceptStatus` | 原作接口处理；黑名单等部分功能依赖它。页面加载异常时可改为 false 排查 |
| `script.showBlockUser` / `userHomeTopBlockUser` | 原作快捷屏蔽用户按钮；当前关闭，避免额外按钮占位 |
| `script.listOutPutNotInterested` | 额外「不感兴趣」按钮；当前开启，紧凑列表展开后才显示，手动点击会提交知乎反馈 |
| `script.highPerformanceRecommend` / `highPerformanceAnswer` | 当前开启；推荐分批时暂停推荐旧节点清理，其他场景约保留最近 50 条推荐／30 条回答 |
| `script.suspensionPickUp` | 原作悬浮收起按钮；原版悬浮收起关闭；手机整体操作栏由 `mobile.floatingCollapse` 控制 |
| `script.cancelCommentAutoFocus` | 原作会重复移除编辑框焦点；当前关闭；纯观看模式由 `mobile.readOnlyComments` 隐藏输入模块 |
| `script.saveHistory` | 原作本地历史／列表缓存；当前关闭。设置面板已移除，没有历史查看界面 |
| `script.topExportContent` | 回答／文章顶部 PDF 导出按钮；当前关闭 |
| `script.customizeCss` | 补充 CSS 字符串；默认空。手机适配规则有较高优先级 |

## 可编辑参数

```json
{
  "mobile": {
    "enabled": true,
    "pagePadding": 21,
    "openInternalLinksInSameTab": true,
    "hideSidebars": true,
    "hideOpenApp": true,
    "listImageMaxLines": 2,
    "answerImageMaxLines": 2,
    "floatingCollapse": true,
    "readOnlyComments": true,
    "compactFeed": true,
    "feedBatchSize": 10,
    "feedSummaryLines": 2
  },
  "script": {
    "fetchInterceptStatus": true,
    "theme": "2",
    "themeLight": "4",
    "themeDark": "1",
    "fontSizeForList": "17",
    "fontSizeForAnswer": "19",
    "fontSizeForArticle": "18",
    "fontSizeForListTitle": "20",
    "fontSizeForAnswerTitle": "22",
    "fontSizeForArticleTitle": "26",
    "contentLineHeight": "31",
    "answerOpen": "default",
    "homeContentOpen": "0",
    "linkShopping": "2",
    "replaceZhidaToSearch": "removeLink",
    "videoInAnswerArticle": "0",
    "hiddenAD": true,
    "hiddenQuestionAD": true,
    "removeTopAD": true,
    "hidden618HongBao": true,
    "hiddenReward": true,
    "hiddenHomeWriteArea": true,
    "hiddenReadMoreText": true,
    "hiddenSearchBoxTopSearch": true,
    "hiddenSearchPageTopSearch": true,
    "hiddenSelectedTextPopup": false,
    "removeFromYanxuan": true,
    "removeFromEBook": true,
    "removeUnrealAnswer": false,
    "removeItemAboutVideo": true,
    "removeItemAboutArticle": true,
    "removeLessVote": true,
    "filterKeywords": [
      "618",
      "华为",
      "精华",
      "nas",
      "新款"
    ],
    "blockWordsAnswer": [],
    "questionTitleTag": false,
    "listTitleTagQuestion": false,
    "listTitleTagArticle": false,
    "listTitleTagVideo": false,
    "listTitleTagPin": false,
    "listItemCreatedAndModifiedTime": false,
    "answerItemCreatedAndModifiedTime": false,
    "questionCreatedAndModifiedTime": false,
    "articleCreateTimeToTop": true,
    "copyAnswerLink": false,
    "topExportContent": false,
    "showBlockUser": false,
    "userHomeTopBlockUser": false,
    "listOutPutNotInterested": true,
    "highPerformanceRecommend": true,
    "highPerformanceAnswer": true,
    "suspensionPickUp": false,
    "zoomImageType": "0",
    "showGIFinDialog": false,
    "cancelCommentAutoFocus": false,
    "clickMarkCloseCommentDialog": true,
    "saveHistory": false,
    "customizeCss": "",
    "hiddenAnswerRightFooter": true,
    "hiddenDetailFollow": true,
    "removeFollowVoteAnswer": true,
    "removeFollowVoteArticle": true,
    "removeFollowFQuestion": true,
    "removeItemAboutAD": true,
    "removeItemAboutPin": true,
    "removeItemQuestionAsk": true,
    "lessVoteNumber": "100",
    "removeLessVoteDetail": false,
    "lessVoteNumberDetail": "10",
    "removeAnonymousAnswer": false,
    "removeMyOperateAtFollow": true,
    "suspensionPickupRight": "-50",
    "suspensionSwitch": false,
    "suspensionSwitchPo": "left: 1160px; top: 129px;",
    "suspensionSwitchFollow": true,
    "suspensionSwitchDefault": true,
    "suspensionSwitchHot": false,
    "suspensionSwitchColumnSquare": false,
    "suspensionSwitchRingFeeds": false,
    "versionHome": "600",
    "versionAnswer": "600",
    "versionArticle": "600",
    "versionHomeIsPercent": false,
    "versionHomePercent": "70",
    "versionAnswerIsPercent": false,
    "versionAnswerPercent": "70",
    "versionArticleIsPercent": false,
    "versionArticlePercent": "70",
    "versionUserHome": "600",
    "versionUserHomeIsPercent": false,
    "versionUserHomePercent": "70",
    "versionCollection": "600",
    "versionCollectionIsPercent": false,
    "versionCollectionPercent": "70",
    "zoomImageSize": "600",
    "globalTitle": "知乎",
    "titleIco": "",
    "fixedListItemMore": false,
    "highlightOriginal": false,
    "highlightListItem": false,
    "zoomListVideoType": "0",
    "zoomListVideoSize": "500",
    "hotKey": false,
    "colorText1": "",
    "commitModalSizeSameVersion": true,
    "listOutputToQuestion": false,
    "userHomeContentTimeTop": false,
    "zoomImageHeight": "1",
    "zoomImageHeightSize": "541",
    "suspensionOpen": "1",
    "showBlockUserCommentTag": true,
    "showBlockUserTag": true,
    "keyEscCloseCommentDialog": true,
    "openTagChooseAfterBlockedUser": false,
    "removeBlockUserContent": true,
    "replaceBlockUserContentWithStar": false,
    "blockedUsers": [],
    "localBlockedUsers": [],
    "notInterestedList": [
      "如何看待西门子最新广告【让慢热女滚】？",
      "跑步机哪个牌子的好？",
      "怎么预防春季花粉过敏呢？",
      "怎么提亮肤色，让气色变好？",
      "甲流和乙流哪个更严重？",
      "断崖式衰老常发生在 3 个年龄段，普通人如何抗衰老？",
      "为什么我美白那么久却还是白不了？",
      "NBA摇钱树是库里，肖华却为何不捧他成为联盟第一人？",
      "晒黑后如何美白？",
      "2025 年了，你觉得好长焦还算是 4K+ 旗舰手机的刚需吗？",
      "女性应该如何在不焦虑的前提下，优雅且科学地面对衰老？",
      "为什么争议不断的 OLED 电视能持续受到市场和用户的欢迎？我们对家用电视的屏幕选购思路应该是什么？",
      "有什么节能省钱又健康安全的大容量热水器推荐？格力润之恋空气能热水器值得买吗？",
      "如何评价 iQOO 15 将搭载自研「手机显卡」和「机圈大力水手」？",
      "Vidda C5无界 Master敢称 “20 万以内最强”，是真有料还是噱头？",
      "电视机什么牌子的好？",
      "“升起是电影院，降下是歌剧院”，海信卷曲屏激光电视在实际家用场景表现有多震撼？",
      "如何看待马伊琍接受采访说女生嫁不出去是因为中国男生太不独立，思想上跟不上女性进步的脚步？",
      "为什么这么多人推荐科大讯飞的智能助听器？性价比高吗？",
      "40℃ 以上高温热浪频发，什么样的空调不会「热到罢工」? 格力新出的云佳 Pro 值得入手吗?",
      "将军在互联网对风评如何？为什么有人说将军在中文互联网上的风评逐渐好转?",
      "哪个牌子的护肤品好呀？想给妈妈买一套抗衰老的护肤品?",
      "充电五分钟，续航200km？超充「超」在哪里？",
      "成都，有啥消息吗，为啥突然这么多人卖房?",
      "国外的女生为什么屁股都大？",
      "如何看待喜力啤酒加盟赞助苏超？",
      "如何看待38岁男子阿红假扮女性约会一千多名男性事件?",
      "《北京欢迎你》当时基本去了整个华语乐坛，但为什么最顶尖的刘德华、张学友、周杰伦等没有去？",
      "怎样评价波士顿圆脸?",
      "如何评价 b站up主 峰哥亡命天涯?",
      "如何评价说唱歌手揽佬SKAI ISYOURGOD？",
      "如何评价up主“红警hbk08”？",
      "苏超这么火，为什么豫超火不起来？",
      "如何看待徕芬发布高速直线往复式剃须刀？产品有什么亮点？",
      "为什么16-28岁女性对labubu欲罢不能？",
      "为什么六大助听器公司不做骨传导助听器？",
      "普通人如何才能参观中南海？",
      "明明很想学习却总是拖到最后一刻才行动怎么办？",
      "法国的数学水平那么强，为什么在 IMO 上的成绩却很一般？",
      "如何评价蔡徐坤的新歌《Deadman》?",
      "蜂鸟音乐指控邓紫棋侵权，要求 48 小时内下架重录歌曲，邓紫棋回应「不会下架」，这一指控合理吗？",
      "你坚持使用美团外卖的理由是什么 ？",
      "如何看待亮亮丽君夫妇中的女主又怀孕？"
    ],
    "commentImageFullPage": true,
    "suspensionHomeTab": false,
    "suspensionHomeTabPo": "left: 20px; top: 100px;",
    "suspensionHomeTabFixed": true,
    "suspensionFind": false,
    "suspensionFindPo": "left: 10px; top: 380px;",
    "suspensionFindFixed": true,
    "suspensionSearch": false,
    "suspensionSearchPo": "left: 10px; top: 400px;",
    "suspensionSearchFixed": true,
    "suspensionUser": false,
    "suspensionUserPo": "right: 60px; top: 100px;",
    "suspensionUserFixed": true,
    "suspensionOpenUseTop": false,
    "suspensionOpenUseLeft": false,
    "suspensionOpenLeft": "",
    "suspensionOpenRight": "0px",
    "suspensionOpenTop": "",
    "suspensionOpenBottom": "0",
    "globalTitleRemoveMessage": true,
    "hiddenHeaderScroll": true,
    "hiddenAppHeaderTabHome": true,
    "hiddenAppHeaderTabFind": true,
    "hiddenAppHeaderTabZhi": true,
    "hiddenAppHeaderTabWaitingForYou": true,
    "hiddenHomeCreatorEntrance": true,
    "hiddenHomeQuanzi": true,
    "hiddenYanXuanWriter": true,
    "hiddenHomeRecommendFollow": true,
    "hiddenHomeCategory": true,
    "hiddenHomeCategoryMore": true,
    "hiddenHomeFooter": true,
    "hiddenHomeListTabVideo": false,
    "hiddenListVideoContent": true,
    "hiddenListImg": true,
    "hiddenZhuanlanAuthorCard": true,
    "hiddenUserHomeOtherCard": true,
    "hiddenUserHomePublications": true,
    "hiddenUserHomeCreateEntrance": true,
    "hiddenUserHomeFollow": true,
    "hiddenUserHomeLightList": true,
    "hiddenUserHomeFooterOperate": true,
    "hiddenUserHomeFooter": true,
    "hiddenQuestionActions": false,
    "hiddenQuestionTag": true,
    "hiddenQuestionInvite": true,
    "hiddenQuestionAnswer": false,
    "hiddenAnswerItemTime": false,
    "hiddenAnswerRightFooterAnswerAuthor": false,
    "hiddenHeader": true,
    "hiddenLogo": true,
    "hiddenZhihuZhiShop": true,
    "hiddenItemActions": false,
    "justNumberInAction": true,
    "topVote": true,
    "hiddenCommitVote": false,
    "hiddenCommitBottom": false,
    "hiddenListAnswerInPerson": true,
    "hiddenHotItemLabel": true,
    "hiddenHotItemIndex": true,
    "hiddenHotItemMetrics": true,
    "hiddenHotTopNews": true,
    "hiddenSearchPageFooter": true,
    "hiddenSearchResultZhida": true,
    "hiddenQuestionGoodQuestion": true,
    "hiddenQuestionMore": true,
    "hiddenAnswerRightFooterFavorites": false,
    "hiddenAnswerRightFooterRelatedQuestions": false,
    "hiddenAnswerRightFooterContentList": false,
    "hiddenAnswerRightFooterFooter": false,
    "hiddenQuestionComment": true,
    "hiddenQuestionSpecial": true,
    "hiddenQuestionFollowing": false,
    "hiddenQuestionShare": true,
    "hiddenQuestionViewAll": false,
    "hiddenDetailVoters": true,
    "hiddenTopicRightNumberBoard": false,
    "hiddenTopicRightParentChild": false,
    "hiddenAnswerBelongZhuanlan": true,
    "hiddenAnswerKeepAsking": true,
    "hiddenAnswerItemTimeButHaveIP": false,
    "hiddenThanksInvite": true,
    "hiddenAnswerDownTags": true,
    "hiddenDetailBadge": false,
    "hiddenDetailName": false,
    "hiddenDetailAvatar": false,
    "hiddenQuestionSide": true,
    "hiddenAnswers": false,
    "hiddenHeaderFollow": false,
    "hiddenHeaderRecommend": false,
    "hiddenHeaderHot": false,
    "hiddenItemActionsIsFixed": false,
    "hiddenItemActionsIsFixedSearch": false,
    "hiddenHomeListTab": false,
    "hiddenHomeListTabFollow": false,
    "hiddenHomeListTabRecommend": false,
    "hiddenHomeListTabHot": false,
    "hiddenOpenButton": true,
    "hiddenHeaderColumnSquare": true,
    "hiddenHeaderConsult": true,
    "hiddenHeaderEducationLearning": true,
    "hiddenItemActionsSearch": false,
    "hiddenZhuanlanActions": false,
    "hiddenItemActionsCollection": false,
    "hiddenHeaderZhida": true,
    "hiddenItemActionsIsFixedUser": false,
    "hiddenItemActionsUser": false,
    "hiddenZhuanlanAvatarWrapper": false,
    "hiddenHomeHotSearch": true,
    "hiddenHeaderColumnRingFeeds": true,
    "hiddenZhuanlanHotSearchCard": true,
    "hiddenHeaderSquare": true,
    "hiddenHeaderVipWeb": true,
    "hiddenWriteArea": true,
    "hiddenHomePayAsk": true
  }
}
```

## 安装、验证与维护

安装与自动更新见 [项目介绍](README.md)，开发及版本规范见 [维护文档](docs/DEVELOPMENT.md)，公开变更见 [更新日志](CHANGELOG.md)。

修改 JSON 后，由发布命令将参数写入脚本；手机不会读取此文件。检查语法和行为：

```sh
node 发布更新.cjs --check
```

详细页面测试、截图和旧版备份只保留在本地；公开文档只记录功能变化与验证范围。
