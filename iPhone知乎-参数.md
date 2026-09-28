# iPhone 知乎：参数与安装

适用：iPhone 16 Pro 的 Safari，知乎开启「请求桌面网站」。个人版版本：`5.21.4-iphone.13`。基础版本：网页端 5.21.4；旧移动端 2.9.4 仅参考隐藏 App 引导等显示方式。

## 文件与修改方式

- 安装文件：`吉姆的知乎-iPhone.user.js`。
- 两个第三方原文件完整保留；只启用个人版，停用原网页端、旧移动端及其他旧个人版，避免重复拦截。
- **修改下方 JSON，保存后告诉 Codex「按参数文件同步脚本」**。Codex 更新并运行 `node 发布更新.cjs` 后，由手机 Tampermonkey 自动更新；首次接入见 [README.md](README.md)。
- Markdown 不会被手机自动读取。个人参数在 JS 顶部 `IPHONE_PRESET`；未列出的原版参数沿用同一 JS 中的 `CONFIG_DEFAULT`，需要时可追加到 `script` 对象。
- 设置面板、齿轮、设置菜单、设置快捷键均不创建。黑名单标签选择弹窗固定关闭。
- 每次加载以代码预设为准，旧的浏览器设置不能覆盖它。代码中导入的黑名单、不感兴趣记录与手机手动新增记录合并去重。手动操作仍会保存；已经写入浏览器存储的记录不会仅因从 JSON 删除而清除。
- 个人版仅使用自己的 GitHub 仓库作为更新源，不连接原作者的更新地址；第三方更新仍需人工合并。`.meta.js` 由发布命令从 JS 头部生成，不要单独修改。

## 本版采用的电脑预设

来源：`知乎编辑器配置-20260928-132254-1790572974116.txt`，原导出文件未修改。除下列手机适配外，导出配置全部写入下方 JSON；时间戳 `t` 不是偏好，不导入。

- 隐藏页头、Logo 及多余侧栏；页头中的搜索和导航也随之隐藏。需要恢复时将 `hiddenHeader` 改为 `false`。
- 过滤视频、文章、想法、提问卡片、广告、盐选、电子书及低于 100 赞的列表内容；问题详情中的低赞回答过滤保持关闭。
- 导入 5 个标题关键词和 43 条“不感兴趣”记录；这些导入记录只用于本地过滤，不会自动向知乎补发反馈。保留额外“不感兴趣”按钮，手动点击才会提交反馈。
- 自动跟随设备浅色／深色模式（`theme: "2"`），设备切换后页面直接更新，无需刷新；不增加调节图标、开关或设置入口。原作主题配色参数保留。
- 推荐每轮最多显示 10 条有效内容，满额后停止向下加载；底部没有刷新手势、提示或按钮，继续上划只保留浏览器自然回弹，背景与回答一致。回到页面顶部使用 Safari 原生下拉刷新，可能出现重复推荐。只作用于首页推荐，关注、热榜、问题详情不分页。
- 推荐分批模式下暂停原作删除前 50 条的逻辑，避免本批内容被删；其他页面保持原有高性能参数。

本次改版：重新关闭列表缩略图（`hiddenListImg: true`），推荐／关注中的回答使用随主题变化的细分隔线列表。收起时纵向显示完整标题、最多两行摘要，下方一行显示“24px 头像＋作者姓名＋xxxx 人赞同”，信息文字为 14px；标题与摘要间距 8px，摘要与作者行间距 10px；赞同人数不加千位逗号，列表不显示评论数；点击整条在原位置展开，展开后标题下直接显示正文，顶部作者资料与赞同提示隐藏；正文里的链接与划线评论显示为普通文字，不再跳转或弹窗；正文图片按两行正文高度缩小（目前上限 62px），点击图片仍可查看大图；底部操作栏依次为“24px 头像＋作者名、评论、赞同”，保留知乎原生评论与赞同操作。标题后“不感兴趣”改为灰色下划线文字，无边框，仍需手动点击才提交反馈。头像优先复用知乎返回的数据或原生头像；缺失时，条目接近屏幕才向知乎补取作者资料，失败不循环重试。每条可收起的回答展开时，右下角出现「收起 ↑」，滚动时仅停留在该回答内部，收起后隐藏。

手机例外：页面底色、页头背景及 Safari 页面主题色随设备切换：浅色为白色，暗色为深灰色 `#191919`，与紧凑列表回答背景一致；电脑配置中留空的 6 项字号和行高继续使用本版的手机数值；电脑的 600 像素版心在手机上由自适应宽度覆盖。设置快捷键 `hotKey`、屏蔽后的标签弹窗 `openTagChooseAfterBlockedUser` 固定关闭，`hiddenOpenButton` 固定开启；设置面板不会恢复。悬浮切换维持关闭。本版额外的 `cancelCommentAutoFocus: false` 和 `saveHistory: false` 继续保留。

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
| `mobile.floatingCollapse` | 展开回答内部的悬浮收起按钮，默认开启；使用知乎原生收起行为 |
| `script.hiddenListImg` | 是否完全隐藏列表图片，当前 true；头像保留 |
| `mobile.pagePadding` | 正文左右留白，单位 CSS 像素；建议 10～22 |
| `mobile.openInternalLinksInSameTab` | 普通点击知乎站内链接在本标签页打开；外链、下载、带修饰键点击不改 |
| `mobile.hideSidebars` | 隐藏首页、问题、搜索、用户主页和收藏夹的侧栏 |
| `mobile.hideOpenApp` | 隐藏已知 App 引导；不保证覆盖未来新增样式 |
| `script.fontSizeForList` | 列表摘要字号，当前 16 |
| `script.fontSizeForAnswer` / `fontSizeForArticle` | 回答／文章正文字号，当前 18 |
| `script.fontSizeForListTitle` / `fontSizeForAnswerTitle` / `fontSizeForArticleTitle` | 列表／问题／文章标题字号 |
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
| `script.suspensionPickUp` | 原作悬浮收起按钮；原版悬浮收起关闭；手机独立按钮由 `mobile.floatingCollapse` 控制 |
| `script.cancelCommentAutoFocus` | 原作会重复移除编辑框焦点；当前关闭，保留正常输入 |
| `script.saveHistory` | 原作本地历史／列表缓存；当前关闭。设置面板已移除，没有历史查看界面 |
| `script.topExportContent` | 回答／文章顶部 PDF 导出按钮；当前关闭 |
| `script.customizeCss` | 补充 CSS 字符串；默认空。手机适配规则有较高优先级 |

## 可编辑参数

```json
{
  "mobile": {
    "enabled": true,
    "pagePadding": 14,
    "openInternalLinksInSameTab": true,
    "hideSidebars": true,
    "hideOpenApp": true,
    "listImageMaxLines": 2,
    "answerImageMaxLines": 2,
    "floatingCollapse": true,
    "compactFeed": true,
    "feedBatchSize": 10,
    "feedSummaryLines": 2
  },
  "script": {
    "fetchInterceptStatus": true,
    "theme": "2",
    "themeLight": "4",
    "themeDark": "1",
    "fontSizeForList": "16",
    "fontSizeForAnswer": "18",
    "fontSizeForArticle": "18",
    "fontSizeForListTitle": "18",
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

## iPhone 安装

1. 首次通过 [固定安装链接](https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/%E5%90%89%E5%A7%86%E7%9A%84%E7%9F%A5%E4%B9%8E-iPhone.user.js) 在 Safari 的 Tampermonkey 中安装／更新个人版，并按 [README.md](README.md) 开启自动检查与自动安装。以后不再手动复制代码。允许脚本访问 `www.zhihu.com` 和 `zhuanlan.zhihu.com`。
2. 在 Safari 中打开知乎，从页面菜单进入网站设置，将知乎设为「请求桌面网站」。专栏 `zhuanlan.zhihu.com` 也检查一次。系统版本不同，菜单名称和入口可能略有差异；这项是 Safari 的设置，JS 无法替你保存浏览器的长期请求模式。[Apple Safari 设置说明](https://support.apple.com/en-gb/guide/iphone/iphb3100d149/ios)
3. 停用另外两个原版脚本，启用这个个人版，刷新知乎。网页缩放先使用 100%。
4. 检查首页、问题、文章：正文宽度贴合手机，左右不需拖动；设置齿轮和弹窗消失。再试展开／收起、评论输入、点赞、返回及横屏。推荐页显示 10 条后到底，继续上划不刷新；回到顶部可使用 Safari 原生下拉刷新。切换设备浅色／深色模式，确认页顶、列表、正文及底部背景自动变色；不出现调节图标。

脚本只改变已取得的桌面页面，不能保证知乎一定返回桌面内容，也不处理登录权限。系统浏览历史和书签仍可正常使用。

## 验证记录

以下按版本保留验证记录；当前版本为 `iphone.13`，最新复查在本节末尾。

验证日期：2026-09-28。

- `node --check 吉姆的知乎-iPhone.user.js` 与 `node 检查脚本.cjs` 通过：完整语法、Markdown/JS 参数一致、原文件校验、设置入口移除、桌面 UA 手机识别、代码预设优先级、手动不感兴趣列表保存。
- 在用户已登录的独立 Chrome 窗口访问真实知乎页面，以桌面 User-Agent、触摸输入和 402×874 视口模拟手机。使用 `document-start` 注入与 GM 存储接口替身，未在 Chrome 永久安装脚本。
- 推荐、热榜、问题和专栏的页面宽度为 402，与视口一致；问题横屏为 874，与视口一致。回答／文章正文计算字号为 18px。
- 评论打开后输入焦点持续保留，发布按钮为 62×44px，工具栏换行后页面不横向溢出；没有发布评论、点赞、收藏或提交不感兴趣反馈。
- 系统深色切换后，页面切到 `data-theme="dark"`；这些受测页面未捕获到脚本未处理异常。普通点击热榜问题在当前标签页打开；推荐列表「阅读全文」按钮完整可见，点击后展开成功。
- **未做 iPhone Safari + Tampermonkey 真机验证**，包括扩展实际沙箱、软键盘、安全区和长时间使用。搜索、用户主页、收藏夹未做完整页面回归。
- 截图保存在 `output/playwright/`。页面内容会实时变化，截图仅证明本次受测页面。

`iphone.2` 本次复查（2026-09-28）：

- 与导出文件逐项比对：231 个设置项已写入，只有前述 10 个字号／行高／设置入口参数不同；5 个关键词和 43 条“不感兴趣”记录完全一致。回归检查覆盖记录合并、去重、旧缓存不能覆盖代码预设；两个原 JS 的校验值未变。
- 在同一已登录 Chrome 测试窗口复查推荐和问题页：竖屏页面宽度 402，问题页横屏宽度 874，均与视口一致；没有设置面板或齿轮，也未捕获脚本未处理异常。
- 页头高度为 0，列表图片宽度为 0，浅色主题生效；回答正文 18px。推荐展开箭头为 44×44px，点击后首条回答正文高度从约 129px 增至 803px，展开／收起正常。
- 本次未在真实 iPhone 上验证，也未重测全部页面或全部过滤选项；没有提交评论、点赞、收藏、不感兴趣等操作。截图文件以 `电脑预设-` 开头。
- 上一版个人脚本、参数文档和检查脚本备份在 `output/backups/5.21.4-iphone.1/`。

`iphone.3` 本次复查（2026-09-28）：

- 推荐列表 7 张受测预览图、热榜 29 张图片高度均为约 56.8px；列表正文行高 28.39px，满足两行上限。问题页展开后的正文图片仍可正常大于 60px。
- 推荐页、问题页的展开回答显示独立收起按钮；按钮约 68×46px，位于本条回答内。向下滚过本条回答后，按钮一并移出屏幕；点击会调用原生收起，随后隐藏。反复展开／收起没有重复按钮，未展开的列表及热榜不出现收起按钮。
- 402px 竖屏与 874px 横屏页面无横向溢出；受测页面无脚本未处理异常，设置面板仍不存在。测试使用原有 Chrome 手机模拟和 GM 接口替身，未做 iPhone Safari 真机验证。
- 零依赖检查新增收起按钮的去重、原生按钮被替换后的点击转发，以及桌面端不注入检查。`node --check` 与 `node 检查脚本.cjs` 均通过。
- 截图在 `output/playwright/两行小图-*.png`、`output/playwright/回答内悬浮收起-*.png`；前一版备份在 `output/backups/5.21.4-iphone.2/`。

`iphone.4` 本次复查（2026-09-28）：

- 参考用户截图重新排版推荐／关注中的可展开回答：18px 完整标题、16px 单行摘要、24px 真实头像与 13px 作者／赞评信息，白底和内缩分隔线。列表缩略图关闭；展开后仍显示原生正文、作者信息和操作栏，正文 18px。热榜、搜索、个人主页没有伪造作者或赞评资料。
- 点击标题、摘要和整条预览，均在当前位置展开；键盘 Enter 可展开。悬浮收起后恢复紧凑条目并将焦点放回预览。反复展开不重复创建按钮，当前标签页地址不变。
- 真实推荐页连续加载后，预览从 24 条增加到 29 条，未出现重复节点，29 条均获得知乎已返回的头像地址；头像资料只留最近 200 条，缺失／加载失败时省略头像。未增加资料 API 请求。
- 402px 与 874px 视口均无页面横向溢出；推荐页受测时 24 个原始条目中 15 个可见，既有过滤仍运行；设置面板未恢复，未捕获脚本未处理异常。没有点赞、收藏、发布评论或提交反馈。
- 完整语法及零依赖检查通过；检查补充了赞评数字格式、缺失值和头像缓存上限。视觉对照记录见 `design-qa.md`，最终截图为 `output/playwright/紧凑列表-402.png`，并排对照为 `output/playwright/列表样式对照-最终.png`。
- 使用已登录 Chrome 手机模拟和 GM 替身，未做 iPhone Safari 真机验证；未完整回归关注、搜索和个人主页。上一版备份在 `output/backups/5.21.4-iphone.3/`。

`iphone.5` 本次复查（2026-09-28）：

- 修正头像只有推荐拦截成功才有数据的问题：Safari 也从页面窗口拦截 fetch，同时复用首屏数据和原生头像。缺失时通过 IntersectionObserver 在条目接近屏幕时向知乎补取作者，保留最近 200 条资料；同一卡片失败不循环重试，离开 DOM 的观察目标会清理。窗口区别参考 [Tampermonkey unsafeWindow 文档](https://www.tampermonkey.net/documentation.php?ext=hin&q=unsafeWindow)。
- 在真实推荐页主动清空头像缓存，模拟漏过接口拦截，当前屏幕的头像均成功补齐；24px 圆形显示正常。浏览器正常首载时 24 条预览均取得头像。
- 新增 `mobile.answerImageMaxLines: 2`，按正文 31px 行高将展开回答的图片限高为 62px。受测回答 8 张横图／竖图均为 62px 高，宽度按比例变化；点击后的大图约 408px 高，没有被缩略图规则限制。
- 展开回答的底栏仅显示原生赞同和评论，反对、收藏、喜欢、分享、更多及原生收起均隐藏；原生收起仍留在 DOM 中供悬浮按钮调用。评论可正常展开／收起，输入区域正常显示，未发布任何内容。悬浮收起后可见按钮数为 0，焦点回到预览。
- 402px 竖屏、874px 横屏均无页面横向溢出；无设置面板、无捕获到的脚本异常。语法、Markdown 同步、原文件校验，以及头像补取的去重／失败处理、Safari 沙箱与页面窗口分离等零依赖检查通过。
- 证据：`output/playwright/v5-头像补取完成-402.png`、`v5-展开小图-402.png`、`v5-精简操作栏-402.png`、`v5-评论-402.png`、`v5-图片放大-402.png`。备份在 `output/backups/5.21.4-iphone.4/`。
- 验证环境为已登录 Chrome 手机模拟与 GM 替身；尚未在 iPhone Safari 的真实 Tampermonkey 环境验证本次修复。历史版本记录中的“大图原尺寸”“不补取头像”等仅描述当时行为，以本版说明为准。

`iphone.6` 本次复查（2026-09-28）：

- 新增 `mobile.feedBatchSize: 20`：首页推荐每批最多 20 条有效内容，按过滤后的实际可见条目计数；知乎仍分段返回数据，不足 20 条时继续补齐，满额后隐藏多余条目和加载占位，并截住后续推荐分页请求。不会截住评论、正文或作者资料请求。
- 到底后显示“本批 20 条已到底”。手指重新上划至少 72px 并松手，或点击底部按钮，触发一次知乎原生页面刷新；刷新前和加载完成后回顶，并恢复浏览器原有滚动恢复设置。正常滑到底的同一次手势、横划、短滑、取消和多指手势不触发换批；输入框内不触发。
- 修复连续换批时原作 `loaded` 标记早于 React 条目出现而被消耗的时序问题：分批模式直接复用原过滤函数处理新 DOM，等待过滤完成才计数，不再依赖该标记。推荐旧节点清理在分批期间暂停，避免本批前面的条目被删。
- 换批使用知乎正常推荐刷新，不承诺不同批次完全无重复。只影响首页推荐；关注、热榜及问题详情维持原行为。用户当前其他参数原样保留。
- 语法与零依赖检查覆盖过滤计数、重复同步、20 条上限、分页接口范围、原生 `Response` 返回、阈值、同次手势不刷新、取消手势及单次刷新。保留两个第三方原文件校验与既有回归。
- 最终真实页面连续换批验证：两个受测批次均停在 20 条；满额后额外推荐网络请求为 0。触摸模拟从列表条目上重新上划后仅刷新一次，回顶 `scrollY = 0`，滚动恢复模式回到 `auto`。点击底部按钮也回顶；第 20 条展开／收起后仍计 20 条，底栏仍只有两个操作。402px／874px 无横向溢出，无设置面板或捕获到的脚本错误。截图：`output/playwright/v6-20条到底-402.png`、`v6-手势换批回顶-402.png`。
- 上一版备份：`output/backups/5.21.4-iphone.5/`。本次仍使用已登录 Chrome 手机模拟与 GM 替身，真实 iPhone Safari／Tampermonkey 的触摸和橡皮筋回弹需要安装后确认。

`iphone.7` 本次复查（2026-09-28）：

- 底部改为纯上拉手势，删除点击刷新入口。静止时提示区高度为 0，不占列表空间；最后一个回答停在屏幕底部。需要到底后重新起手上拉，正常读到底的那次滑动松手不刷新。
- 新增 `mobile.feedPullScreenRatio: 0.33`：以手势开始时可见视口高度的约三分之一为阈值；不足时显示“继续上拉 ↑”，达到后显示“松开刷新 ↑”。松手不足、拉过后退回阈值内、手势取消均回弹；只在达到阈值后松手才换批并回顶。
- 保留每批最多 20 条和满额后的分页拦截。实测可见 20 条，满额后额外推荐网络请求为 0；100px 上拉后松手回弹，874px 视口约 290px 时出现“松开刷新”，最终合格松手仅导航一次，刷新后 `scrollY = 0`，滚动恢复模式还原为 `auto`。
- 清除隐藏侧栏外层遗留的底部空隙；874px 视口中最后一条底边为约 874.24px。页顶、页面外层和列表外层计算背景均为白色，页面 `theme-color` 同步为 `#ffffff`。
- 语法和零依赖回归通过，新增三分之一阈值、短拉回弹、反向撤销、取消手势、列表外手势排除、无点击入口检查。原文件和其他预设保持不变；上一版备份在 `output/backups/5.21.4-iphone.6/`。
- 截图：`output/playwright/v7-底部静止-402.png`、`v7-未达阈值-402.png`、`v7-松开刷新-402.png`、`v7-白色顶部与回顶-402.png`。验证环境仍为已登录 Chrome 手机模拟与 GM 替身，尚未做 iPhone Safari／Tampermonkey 真机验证。

`iphone.8` 本次复查（2026-09-28）：

- 每批改为 15 条；新增 `mobile.feedPullDamping: 0.6`，手指移动 100px，页面仅跟随 60px。刷新阈值仍为页面拉开三分之一屏，手指实际需移动约 55% 屏高，减少轻划误刷新。874px 高视口阈值约为 481px；100px、300px 上拉松手均回弹，达标后松手只刷新一次并回顶，反向退回仍可取消。
- 收起列表改为 3:1 左右分栏：左侧完整标题与一行摘要；右侧白底浅描边圆角小框，“18px 头像＋姓名、赞同、评论”三行均用 12px 小字。长姓名省略，点击左侧或右侧均调用原生展开；悬浮收起后恢复两栏并回到预览焦点。
- 真实页面显示 15 条，额外分页请求为 0；402px 竖屏两列分别为 265.5px／88.5px，中间间距 12px。402px、874px 均无横向溢出，评论输入可聚焦，无脚本异常。保留白色页顶、展开图片限高与赞同／评论操作栏。
- 语法、参数同步、原文件校验与零依赖检查通过。截图见 `output/playwright/v8-左右分栏-402.png`、`v8-左右分栏-874.png`、`v8-松开刷新-402.png`。上一版备份在 `output/backups/5.21.4-iphone.7/`；本次仍是 Chrome 触摸模拟与 GM 替身，未做 iPhone Safari 真机验证。

`iphone.9` 本次复查（2026-09-28）：

- 恢复纵向列表：完整标题、最多两行摘要，下方一行显示 24px 头像、作者姓名和“xxxx 人赞同”。赞同人数不加千位逗号，移除列表评论数与右侧小框；展开后的原生评论按钮保留。每批 15 条与 0.6 刷新阻尼不变。
- Chrome 手机模拟中，402px 竖屏摘要实测两行约 44.8px，“14418 人赞同”“40273 人赞同”无逗号，列表无评论数；874px 横屏无溢出，原生展开／悬浮收起正常。未捕获脚本异常。
- 语法及零依赖回归通过，Markdown 参数已同步；截图为 `output/playwright/v9-两行摘要-402.png`、`v9-两行摘要-874.png`，上一版备份在 `output/backups/5.21.4-iphone.8/`。本次仍未做 iPhone Safari 真机验证。

`iphone.10` 本次复查（2026-09-28）：

- 将 `script.theme` 改为 `"2"`，复用原作的设备主题监听，自动跟随亮色／暗色且无需刷新；不创建设置面板、调节图标或手动切换开关。
- 页顶、页面外层、紧凑列表及底部刷新提示共用主题色：亮色白底，暗色 `#191919`。同步 `color-scheme` 和 `theme-color`；修正原作暗色样式覆盖列表背景、悬浮收起按钮暗色规则优先级不足的问题。
- Chrome 402px 手机模拟中，从暗色启动，再切亮色、暗色，页面导航次数为 0；背景和主题色均同步。暗色标题为 `#ededed`，摘要／作者为 `#a0a4aa`，展开正文、赞评操作栏、收起按钮及评论输入正常，未捕获脚本异常或横向溢出。未发布评论。
- 语法、Markdown 参数同步、原文件校验及零依赖回归通过，新增设备主题选择检查。截图：`output/playwright/v10-自动暗色-402.png`、`v10-自动亮色-402.png`、`v10-暗色展开-402.png`、`v10-暗色评论-402.png`。上一版备份在 `output/backups/5.21.4-iphone.9/`；尚未验证 iPhone Safari 真机及其工具栏实际配色。

`iphone.11` 发布流程（2026-09-28）：

- 接入个人 GitHub 仓库 `kieran107/zhihu-plugin`，固定 `@updateURL` 与 `@downloadURL`；名称和 namespace 不变。新增轻量 `.meta.js`，供手机检查版本。
- `发布更新.cjs` 自动同步参数、递增未提升的版本号、生成元数据、检查、提交和推送，并核对固定 Raw 地址。`一键发布.command` 可双击运行。初始接入和手机自动安装设置详见 `README.md`。
- 检查补充发布幂等性、版本递增、参数写回及元数据一致性；所有既有回归保留。两个第三方原脚本仍不修改，仅在本地存在时核对哈希；截图、备份和浏览器资料不进入仓库。
- 手机自动更新需要首次安装带更新地址的版本并开启自动检查和自动安装。由扩展调度，不能保证推送后立即生效；未做 iPhone 真机自动更新验证。

`iphone.12` 本次复查（2026-09-28）：

- 推荐每轮改为 10 条有效回答；满额后停止加载。删除底部刷新提示、触摸监听、阻尼参数、位移动画和自动回顶逻辑；底部不再触发刷新，顶部保留 Safari 原生下拉刷新。
- 标题与摘要间距从 4px 增至 8px，摘要与作者行间距从 6px 增至 10px；作者及“xxxx 人赞同”文字从 13px 增至 14px。两行摘要、24px 头像、无千位逗号与无评论数保持不变。
- 推荐列表外层也统一使用回答背景：浅色白色，暗色 `#191919`。Chrome 手机模拟中，10 条可见回答后额外推荐请求为 0；亮暗色下在底部各上划 650px 均未刷新，无底部提示或列表位移，最后条目底边约 873.8px，对应 874px 视口。
- 402px 竖屏和 874px 横屏均无横向溢出；字号、间距、两行摘要及原生展开／悬浮收起检查通过，未捕获脚本异常。语法、参数同步、原文件哈希及零依赖检查通过；检查覆盖 10 条上限和旧刷新代码已删除。
- 截图保存在本地 `output/playwright/v12-*.png`，上一版备份在 `output/backups/5.21.4-iphone.11/`。验证使用已登录 Chrome 手机模拟和 GM 替身；iPhone Safari 的原生回弹、顶部刷新和 Tampermonkey 自动更新未做真机验证。

`iphone.13` 本次复查（2026-09-28）：

- 展开回答后隐藏顶部作者资料和赞同提示，标题下直接接正文；将头像及作者名放到底部操作栏，视觉顺序为“作者、评论、赞同”。评论和赞同继续使用原生按钮，保持计数、状态及事件；悬浮收起放在底栏之前，底栏为回答最后一行。
- 正文链接、知乎直达和划线评论恢复普通文字颜色，删除下划线、标记背景与提示图形；取消链接地址和键盘焦点，并在捕获阶段拦住文字点击，保留原正文节点、文字选择、图片与视频操作。预设 `replaceZhidaToSearch` 改为 `removeLink`。修正原外链转换器向无 href 的文字补回空 href 的问题。
- 标题后的“不感兴趣”改成 13px 次要文字色、下划线、无边框、无底色，保持原有手动反馈逻辑；没有在测试中提交反馈或点赞。
- Chrome 手机模拟中检查了推荐页 10 条回答，共 4 个正文链接、11 处划线标记：均无跳转地址，颜色与正文相同，无下划线，点击被拦截。问题详情页同样隐藏顶部作者，底栏顺序正确，正文链接点击无导航、新标签或对话框；未捕获脚本错误。
- 评论输入框可正常聚焦；3 张正文图片均为 62px 高，点击后的原生大图约 671px 高；展开／收起正常。402px 竖屏、874px 横屏底栏只有一份作者信息，没有横向溢出。亮暗色均检查；语法、原文件哈希、参数同步和零依赖回归通过。
- 截图：本地 `output/playwright/v13-*.png`；备份：`output/backups/5.21.4-iphone.12/`。仍为已登录 Chrome 手机模拟和 GM 替身，未做 iPhone Safari／Tampermonkey 真机验证。

检查命令：

```sh
node --check 吉姆的知乎-iPhone.user.js
node 检查脚本.cjs
```

## 给后续 Codex 的维护说明

用户修改此文件的参数区后：保持原文件不变；检查参数类型和范围；涉及布局则补查竖屏／横屏及评论输入。运行 `node 发布更新.cjs` 自动同步 `IPHONE_PRESET`、递增版本、生成更新元数据、检查、提交和推送。完整维护流程见 `AGENTS.md` 和 `README.md`。

两个原文件的 SHA-256：

- 网页端：`ca13bccd9f08b9d0f1b5b64238b5dd95fd98280ac0713d8b606fdf219263c31f`
- 旧移动端：`59a8150e46b3834c54e5effba33e6988dbc98b7956620ab5f3e64abdb277a170`
