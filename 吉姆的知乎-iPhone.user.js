// ==UserScript==
// @name         吉姆的知乎 · iPhone Safari
// @namespace    local.jim.zhihu.iphone
// @version      5.21.4-iphone.11
// @homepageURL  https://github.com/kieran107/zhihu-plugin
// @updateURL    https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/%E5%90%89%E5%A7%86%E7%9A%84%E7%9F%A5%E4%B9%8E-iPhone.meta.js
// @downloadURL  https://raw.githubusercontent.com/kieran107/zhihu-plugin/main/%E5%90%89%E5%A7%86%E7%9A%84%E7%9F%A5%E4%B9%8E-iPhone.user.js
// @description  基于知乎修改器 5.21.4，适配 iPhone Safari 请求桌面网站。单栏阅读、代码预设、无设置面板。参数见同目录「iPhone知乎-参数.md」。
// @compatible   edge Violentmonkey
// @compatible   edge Tampermonkey
// @compatible   chrome Violentmonkey
// @compatible   chrome Tampermonkey
// @compatible   firefox Violentmonkey
// @compatible   firefox Tampermonkey
// @compatible   safari Violentmonkey
// @compatible   safari Tampermonkey
// @author       lyb233（原作）；Jim（个人适配）
// @license      MIT
// @match        *://*.zhihu.com/*
// @grant        unsafeWindow
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @noframes
// @run-at       document-start
// ==/UserScript==

"use strict";
(() => {
  // 唯一的个人参数入口。修改 Markdown 后，由 Codex 同步到此处。
  // BEGIN IPHONE_PRESET
  const IPHONE_PRESET = {
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
      "feedBatchSize": 15,
      "feedPullScreenRatio": 0.33,
      "feedPullDamping": 0.6,
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
      "replaceZhidaToSearch": "google",
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
  };
  // END IPHONE_PRESET

  const isIPhoneLayout = IPHONE_PRESET.mobile.enabled && (
    /iPhone|iPod/.test(navigator.userAgent) ||
    navigator.maxTouchPoints > 0 && Math.min(screen.width, screen.height) <= 600
  );
  var initIPhoneLayout = () => {
    if (!isIPhoneLayout) return;
    initIPhoneFeedBatch();
    document.documentElement.classList.add("jim-iphone");
    document.documentElement.classList.toggle("jimi-compact-feed", IPHONE_PRESET.mobile.compactFeed);
    const viewportContent = "width=device-width, initial-scale=1, viewport-fit=cover";
    const setViewport = () => {
      const metas = [...document.head.querySelectorAll('meta[name="viewport"]')];
      if (!metas.length) {
        const meta = document.createElement("meta");
        meta.name = "viewport";
        document.head.appendChild(meta);
        metas.push(meta);
      }
      for (const meta of metas) {
        if (meta.content !== viewportContent) meta.content = viewportContent;
      }
      const colors = [...document.head.querySelectorAll('meta[name="theme-color"]')];
      if (!colors.length) {
        const meta = document.createElement("meta");
        meta.name = "theme-color";
        document.head.appendChild(meta);
        colors.push(meta);
      }
      const themeColor = document.documentElement.getAttribute("data-theme") === "dark" ? "#191919" : "#ffffff";
      for (const meta of colors) if (meta.content !== themeColor) meta.content = themeColor;
    };
    setViewport();
    // 知乎可能在脚本启动后插入或改写 viewport；保留手势缩放能力。
    new MutationObserver(setViewport).observe(document.head, {
      childList: true, subtree: true, attributes: true, attributeFilter: ["name", "content"]
    });
    // 复用原作的系统主题监听，浏览器工具栏颜色跟随页面实际主题。
    new MutationObserver(setViewport).observe(document.documentElement, {
      attributes: true, attributeFilter: ["data-theme"]
    });
    const { pagePadding, hideSidebars, hideOpenApp, openInternalLinksInSameTab } = IPHONE_PRESET.mobile;
    const listImageHeight = (Number(IPHONE_PRESET.script.fontSizeForList) || 17) * 1.67 * IPHONE_PRESET.mobile.listImageMaxLines;
    const answerImageHeight = (Number(IPHONE_PRESET.script.contentLineHeight) || 31) * IPHONE_PRESET.mobile.answerImageMaxLines;
    fnAppendStyle("JIMI_IPHONE_STYLE", `
      html.jim-iphone { min-width: 0 !important; -webkit-text-size-adjust: 100%; }
      html.jim-iphone body { min-width: 0 !important; margin: 0; width: 100%; }
      html.jim-iphone #root { min-width: 0; max-width: 100%; }
      html.jim-iphone, html.jim-iphone :is(body, #root, .App-main, .AppHeader, .Topstory,
        .Topstory-container, .Topstory-mainColumn, #TopstoryContent, .ListShortcut) { background: var(--jimi-feed-bg) !important; }
      html.jim-iphone :is(.Topstory, .Topstory-container, .Topstory-mainColumn,
        .Search-container, .SearchMain, .QuestionPage, .Question-main, .Question-mainColumn,
        .QuestionHeader, .QuestionHeader-content, .QuestionHeader-main, .QuestionHeader-footer-inner,
        .Post-Main, .Post-Row-Content, .Post-Row-Content-left, .Post-NormalMain,
        .Post-NormalSub, .Post-NormalSub > div, .Post-content, .Post-RichTextContainer,
        .Post-Header, .Post-Title, .Post-Author, .css-pi1fiy,
        .Profile-main, .Profile-mainColumn, #ProfileHeader,
        .CollectionsDetailPage, .CollectionsDetailPage-mainColumn) {
        box-sizing: border-box !important; min-width: 0 !important;
        width: 100% !important; max-width: 100% !important;
        margin-left: 0 !important; margin-right: 0 !important;
      }
      html.jim-iphone :is(.Topstory-container, .Question-main, .Post-Row-Content,
        .Profile-main, .CollectionsDetailPage) { display: block !important; padding: 0 !important; }
      html.jim-iphone :is(.List-item, .TopstoryItem, .QuestionHeader-content,
        .QuestionHeader-footer-inner, .Post-RichTextContainer, .Post-Header, .Post-Title, .Post-Author) {
        padding-left: max(${pagePadding}px, env(safe-area-inset-left)) !important;
        padding-right: max(${pagePadding}px, env(safe-area-inset-right)) !important;
        box-sizing: border-box;
      }
      html.jim-iphone :is(.ContentItem, .RichContent, .RichContent-inner,
        .RichText, .ztext, .AuthorInfo-content, .QuestionHeader-main) { min-width: 0; overflow-wrap: anywhere; }
      html.jim-iphone .QuestionHeader-content { display: block !important; }
      html.jim-iphone .QuestionHeader-tags { display: flex; flex-wrap: wrap; gap: 6px; }
      html.jim-iphone .QuestionHeader-side { display: none !important; }
      html.jim-iphone :is(.QuestionHeader-main, .QuestionHeader-footer-main) { padding: 0 !important; }
      html.jim-iphone :is(.QuestionHeader-footer-main, .QuestionHeader-actions) { flex-wrap: wrap; gap: 8px; }
      html.jim-iphone :is(.RichText, .ztext) :is(img, video, iframe, svg, figure) {
        max-width: 100% !important; box-sizing: border-box;
      }
      html.jim-iphone :is(.RichText, .ztext) img { height: auto; }
      html.jim-iphone :is(.RichText, .ztext) :is(pre, table) {
        display: block; max-width: 100%; overflow-x: auto; overscroll-behavior-x: contain;
      }
      html.jim-iphone .TitleImage { max-width: 100% !important; height: auto !important; }
      /* 列表图与展开正文分别按行高限高；查看大图的浮层不受影响。 */
      html.jim-iphone .RichContent-cover { width: 90px; max-width: 30%; margin-left: 10px; }
      html.jim-iphone :is(.RichContent-cover, .HotItem-img) {
        height: ${listImageHeight}px !important; max-height: ${listImageHeight}px !important;
        min-height: 0 !important; overflow: hidden;
      }
      html.jim-iphone .RichContent-cover-inner { height: 100% !important; padding-top: 0 !important; }
      html.jim-iphone :is(.RichContent-cover, .HotItem-img) img {
        width: 100% !important; height: 100% !important; max-height: 100% !important; object-fit: contain !important;
      }
      html.jim-iphone .RichContent.is-collapsed .RichContent-inner :is(figure, .Image-Wrapper-Preview, img:not(.Avatar)) {
        height: auto !important; max-height: ${listImageHeight}px !important;
        min-height: 0 !important; width: auto !important; object-fit: contain;
      }
      html.jim-iphone .AnswerItem > .RichContent:not(.is-collapsed) .RichText :is(img:not(.Avatar), .Image-Wrapper-Preview, .RichText-ConditionalImagePortal, .GifPlayer) {
        height: auto !important; max-height: ${answerImageHeight}px !important;
        min-height: 0 !important; width: auto !important; max-width: 100% !important;
        padding-top: 0 !important; padding-bottom: 0 !important; aspect-ratio: auto !important; object-fit: contain;
      }
      html.jim-iphone .HotItem { padding: 14px ${pagePadding}px !important; min-height: 0; height: auto; align-items: flex-start; gap: 8px; }
      html.jim-iphone .HotItem-index { position: static; flex: 0 0 22px; width: 22px; }
      html.jim-iphone .HotItem-title { line-height: 1.45; max-height: none; -webkit-line-clamp: 3; }
      html.jim-iphone .HotItem-excerpt { display: none; }
      html.jim-iphone .HotItem-metrics { position: static; margin-top: 8px; line-height: 1.5; }
      html.jim-iphone .HotItem-img { flex: 0 0 86px; }
      html.jim-iphone .HotItem-img img { width: 100%; height: 100%; object-fit: cover; }
      html.jim-iphone .HotItem-img::after { width: 100% !important; height: 100% !important; }
      html.jim-iphone .HotList-list { width: 100%; padding: 0; }
      html.jim-iphone .HotItem { margin-left: 0; margin-right: 0; }
      html.jim-iphone div:has(> .AppHeader) { position: static !important; height: auto !important; }
      html.jim-iphone .App-main { padding-top: 0 !important; margin-top: 0 !important; }
      html.jim-iphone .HotItem-content { min-width: 0; }
      html.jim-iphone .HotItem-img { width: 86px; height: 70px; margin-left: 10px; }
      html.jim-iphone .AppHeader { position: relative !important; height: auto !important; min-width: 0; }
      /* 当前桌面页头使用 CSS-in-JS 包装；保留搜索和账户，导航横向滚动。 */
      html.jim-iphone .AppHeader > div {
        display: grid !important; grid-template-columns: auto minmax(0, 1fr) auto;
        width: 100% !important; min-width: 0 !important; height: auto !important;
        box-sizing: border-box; padding: 8px ${pagePadding}px 0 !important; gap: 6px 10px;
      }
      html.jim-iphone .AppHeader :is(.css-51utkw, .css-x84wzl) { display: contents !important; }
      html.jim-iphone .AppHeader nav {
        grid-column: 1 / -1; grid-row: 2; width: 100%; min-width: 0;
        overflow-x: auto; white-space: nowrap; padding: 0 !important;
      }
      html.jim-iphone .AppHeader nav > a { flex-shrink: 0; min-height: 44px; }
      html.jim-iphone .AppHeader .SearchBar { grid-row: 1; grid-column: 2; width: 100% !important; }
      html.jim-iphone .AppHeader :is(.css-1vbrp2j, .SearchBar-askContainer, a[href="https://zhida.zhihu.com/"]) { display: none !important; }
      html.jim-iphone .AppHeader-inner {
        width: 100% !important; min-width: 0 !important; height: auto !important;
        padding: 6px ${pagePadding}px !important; box-sizing: border-box;
        flex-wrap: wrap !important; gap: 4px 8px;
      }
      html.jim-iphone .AppHeader .AppHeader-Tabs {
        flex: 1 1 100%; order: 3; min-width: 0; margin: 0;
        overflow-x: auto; white-space: nowrap; display: flex;
      }
      html.jim-iphone .AppHeader-Tabs .Tabs-item { flex-shrink: 0; padding: 0 12px; }
      html.jim-iphone .AppHeader .SearchBar { flex: 1 1 130px; min-width: 0; }
      html.jim-iphone .AppHeader :is(.SearchBar-tool, .SearchBar-input) { width: 100% !important; min-width: 0 !important; }
      html.jim-iphone .AppHeader .SearchBar-askButton { display: none !important; }
      html.jim-iphone .AppHeader .AppHeader-userInfo { flex: 0 1 auto; margin-left: 0; }
      html.jim-iphone :is(.TopstoryTabs, .ProfileMain-tabs, .SearchTabs, .Tabs) {
        max-width: 100%; overflow-x: auto; white-space: nowrap;
      }
      html.jim-iphone .TopstoryTabs-link { flex-shrink: 0; margin: 0 14px !important; }
      html.jim-iphone .TopstoryItem .RichContent.is-collapsed .RichContent-inner { max-height: none !important; }
      html.jim-iphone .ContentItem-more { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; }
      /* 紧凑列表只改变预览；展开后仍使用知乎原生回答与操作。 */
      html.jim-iphone {
        color-scheme: light;
        --jimi-feed-bg: #fff; --jimi-feed-text: #202124; --jimi-feed-muted: #70757d; --jimi-feed-line: #e8eaed;
      }
      html.jim-iphone[data-theme="dark"] {
        color-scheme: dark;
        --jimi-feed-bg: #191919; --jimi-feed-text: #ededed; --jimi-feed-muted: #a0a4aa; --jimi-feed-line: #333;
      }
      html.jimi-compact-feed .Topstory-container { margin-top: 0 !important; }
      html.jim-iphone.jimi-compact-feed .TopstoryItem.jimi-feed-item {
        margin: 0 !important; padding: 12px max(18px, env(safe-area-inset-left)) 0 max(18px, env(safe-area-inset-right)) !important;
        border: 0 !important;
        border-radius: 0 !important; box-shadow: none !important; background: var(--jimi-feed-bg) !important;
      }
      html.jimi-compact-feed .jimi-feed-answer { padding-bottom: 12px; border-bottom: 1px solid var(--jimi-feed-line); }
      html.jimi-compact-feed .jimi-feed-item :is(.FeedSource, .TopstoryItem-topic) { display: none !important; }
      html.jimi-compact-feed .jimi-feed-answer:has(> .RichContent.is-collapsed) > :is(.ContentItem-title, .AnswerItem-authorInfo, .RichContent) { display: none !important; }
      html.jimi-compact-feed .jimi-feed-preview { display: none; }
      html.jimi-compact-feed .jimi-feed-answer:has(> .RichContent.is-collapsed) > .jimi-feed-preview {
        display: block; width: 100%; min-height: 44px; border: 0; padding: 0; margin: 0;
        background: transparent !important; color: var(--jimi-feed-text); text-align: left;
        font: inherit; cursor: pointer; touch-action: manipulation; -webkit-appearance: none;
      }
      html.jimi-compact-feed .jimi-feed-preview:focus-visible { outline: 2px solid #06f; outline-offset: 5px; border-radius: 4px; }
      html.jimi-compact-feed .jimi-feed-preview:active { opacity: .65; }
      html.jimi-compact-feed .jimi-feed-title {
        display: block; font-size: ${IPHONE_PRESET.script.fontSizeForListTitle}px; font-weight: 600;
        line-height: 1.4; overflow-wrap: anywhere; color: var(--jimi-feed-text) !important;
      }
      html.jimi-compact-feed .jimi-feed-excerpt {
        display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${IPHONE_PRESET.mobile.feedSummaryLines};
        margin-top: 4px; font-size: ${IPHONE_PRESET.script.fontSizeForList}px; font-weight: 400;
        line-height: 1.4; color: var(--jimi-feed-muted) !important; overflow: hidden; overflow-wrap: anywhere;
      }
      html.jimi-compact-feed .jimi-feed-excerpt:empty { display: none; }
      html.jimi-compact-feed .jimi-feed-meta {
        display: flex; align-items: center; gap: 7px; margin-top: 6px; min-width: 0;
        font-size: 13px; font-weight: 400; line-height: 24px; color: var(--jimi-feed-muted) !important;
      }
      html.jimi-compact-feed .jimi-feed-avatar { width: 24px !important; height: 24px !important; flex: 0 0 24px; border-radius: 50%; object-fit: cover; }
      html.jimi-compact-feed .jimi-feed-avatar[hidden] { display: none !important; }
      html.jimi-compact-feed .jimi-feed-author { min-width: 0; max-width: 60%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      html.jimi-compact-feed .jimi-feed-votes { flex: 0 0 auto; white-space: nowrap; }
      html.jimi-compact-feed .jimi-feed-votes:empty { display: none; }
      html.jimi-compact-feed .jimi-feed-item .ContentItem-title { margin: 0 0 14px; line-height: 1.45; font-weight: 600; }
      html.jimi-compact-feed .jimi-feed-answer > .RichContent:not(.is-collapsed) .RichContent-inner { font-size: ${IPHONE_PRESET.script.fontSizeForAnswer}px !important; }
      html.jimi-compact-feed .jimi-feed-item .ContentItem-actions { background: var(--jimi-feed-bg) !important; }
      html.jim-iphone .jimi-batch-extra,
      html.jim-iphone .Topstory-recommend.jimi-batch-full > :not(.TopstoryItem) { display: none !important; }
      html.jim-iphone .Topstory-container:has(.jimi-batch-full) { margin-bottom: 0 !important; }
      html.jim-iphone .jimi-batch-full {
        transform: var(--jimi-batch-transform, none); transition: transform 220ms ease-out;
      }
      html.jim-iphone .jimi-batch-footer {
        position: fixed; left: 0; right: 0; bottom: 0; z-index: 5;
        display: flex; align-items: center; justify-content: center;
        height: var(--jimi-batch-pull, 0px); padding: 0 18px; overflow: hidden;
        box-sizing: border-box; background: var(--jimi-feed-bg); color: var(--jimi-feed-muted); opacity: 0; pointer-events: none;
        font: inherit; font-size: 14px; line-height: 1.8; text-align: center;
        transition: height 220ms ease-out, opacity 160ms ease-out;
      }
      html.jim-iphone .jimi-batch-dragging { transition: none; }
      html.jim-iphone .jimi-batch-footer[hidden] { display: none !important; }
      @media (prefers-reduced-motion: reduce) {
        html.jim-iphone :is(.jimi-batch-full, .jimi-batch-footer) { transition: none; }
      }
      html.jim-iphone .jimi-iphone-collapse {
        display: none; border: 1px solid #c9cdd4; background: #fffffff2; color: #175199;
      }
      html.jim-iphone .RichContent:not(.is-collapsed):has(button[data-zop-retract-question="true"]) > .jimi-iphone-collapse {
        display: block; position: sticky; bottom: max(12px, env(safe-area-inset-bottom)); z-index: 3;
        width: 68px; min-height: 44px; margin: 0 0 0 auto; padding: 0 10px;
        border-radius: 22px;
        box-shadow: 0 2px 8px #0002; font-size: 14px; line-height: 44px; cursor: pointer; touch-action: manipulation;
      }
      html.jim-iphone[data-theme="dark"] .jimi-iphone-collapse { background: #242424f2; color: #adc9ed; border-color: #555; }
      html.jim-iphone .jimi-iphone-collapse:focus-visible { outline: 2px solid #0066ff; outline-offset: 2px; }
      html.jim-iphone :is(.ContentItem-actions, .RichContent-actions) {
        box-sizing: border-box; max-width: 100%; width: auto !important;
        padding-left: 0 !important; padding-right: 0 !important;
        margin-left: 0 !important; margin-right: 0 !important;
        overflow-x: auto; white-space: nowrap; gap: 4px;
      }
      html.jim-iphone .ContentItem-actions.is-fixed {
        position: static !important; transform: none !important; box-shadow: none !important;
      }
      /* 保留原生赞同、评论；原生收起只隐藏，供回答内的悬浮按钮调用。 */
      html.jim-iphone .AnswerItem > .RichContent:not(.is-collapsed) .ContentItem-actions > :not(:has(.VoteButton)):not(:has(.Zi--Comment, .ZDI--ChatBubbleFill24)),
      html.jim-iphone .AnswerItem > .RichContent:not(.is-collapsed) .ContentItem-actions .VoteButton--down { display: none !important; }
      html.jim-iphone :is(.ContentItem-actions button, .TopstoryTabs a, .AppHeader button,
        .Modal-closeButton, .jimi-button) { min-height: 44px; touch-action: manipulation; }
      html.jim-iphone :is(input, textarea, [contenteditable="true"]) { font-size: 16px !important; }
      html.jim-iphone .Modal-wrapper { padding: 8px; box-sizing: border-box; }
      html.jim-iphone :is(.Modal-wrapper .Modal, .css-1aq8hf9, #JIMI_EXTRA_OUTPUT_DIALOG) {
        width: calc(100vw - 16px) !important; min-width: 0 !important;
        max-width: calc(100vw - 16px) !important; max-height: 90vh; max-height: 90dvh;
        box-sizing: border-box;
      }
      html.jim-iphone :is(.Modal-content, .Comments-container, .CommentsV2,
        .css-16zdamy, .css-18ld3w0) { min-width: 0 !important; max-width: 100% !important; }
      html.jim-iphone .Modal-closeButton { right: 8px !important; top: 8px !important; z-index: 2; }
      html.jim-iphone .jimi-message { max-width: calc(100vw - 24px); height: auto; min-height: 44px; padding: 8px; box-sizing: border-box; }
      html.jim-iphone .jimi-preview img { max-width: 100%; max-height: 90vh; object-fit: contain; }
      html.jim-iphone .jimi-preview video { max-width: 100%; max-height: 90vh; }
      html.jim-iphone .Post-content :is(.css-kjzwqj, .css-c0fani, .css-yq5nsh) {
        width: 100% !important; max-width: 100%; min-width: 0; display: block !important;
        margin: 0 !important; padding: 0 !important; box-sizing: border-box;
      }
      html.jim-iphone .Post-content .css-1ni4jcm { display: none !important; }
      html.jim-iphone .Post-Header :is(.Post-Title, .Post-Author) { padding-left: 0 !important; padding-right: 0 !important; }
      html.jim-iphone .css-14zbeoe { min-width: 0; flex: 1; }
      html.jim-iphone .css-16xeo9u { flex-wrap: wrap; gap: 8px; }
      html.jim-iphone .css-dza3t2 { flex: 1 1 100%; min-width: 0; }
      html.jim-iphone .css-pcc2vs { overflow-x: auto; min-width: 0; }
      html.jim-iphone .css-zkfaav { flex: 1 1 100%; justify-content: flex-end; white-space: nowrap; }
      html.jim-iphone .css-16xeo9u button { min-height: 44px; flex-shrink: 0; white-space: nowrap; }
      html.jim-iphone .css-kt4t4n { width: 100%; max-width: 100%; margin-left: 0 !important; margin-right: 0 !important; box-sizing: border-box; }
      html.jim-iphone .Post-SideActions { display: none !important; }
      ${hideSidebars ? `html.jim-iphone :is(.GlobalSideBar, .Topstory-sideBar, .Topstory-container > [data-za-detail-view-path-module="RightSideBar"], .Question-sideColumn,
        .SearchSideBar, .Profile-sideColumn, .CollectionsDetailPage-sideColumn, .Post-Row-Content-right) { display: none !important; }` : ""}
      ${hideOpenApp ? `html.jim-iphone :is(.OpenInAppButton, .OpenInAppBanner, .DownloadGuide,
        .MobileAppHeader-downloadLink, .AppBanner, .css-rg1dmv, .css-1gapyfo, .css-183aq3r, .css-wfkf2m) { display: none !important; }` : ""}
    `);
    if (openInternalLinksInSameTab) {
      document.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest?.("a[href]");
        if (!link || link.hasAttribute("download")) return;
        const url = new URL(link.href, location.href);
        if (/^https?:$/.test(url.protocol) && /(^|\.)zhihu\.com$/.test(url.hostname)) link.target = "_self";
      }, true);
    }
  };

  // 每批只展示过滤后的前 N 条；换批走知乎正常刷新，保留原生展开和评论状态管理。
  var iPhoneFeedBatch = { root: null, count: 0, full: false, refreshing: false, footer: null, pull: 0 };
  var setIPhoneBatchPull = (distance, dragging = false) => {
    const { root, footer } = iPhoneFeedBatch;
    iPhoneFeedBatch.pull = distance;
    root?.style.setProperty("--jimi-batch-transform", distance ? `translate3d(0, -${distance}px, 0)` : "none");
    root?.classList.toggle("jimi-batch-dragging", dragging);
    if (!footer) return;
    footer.style.setProperty("--jimi-batch-pull", `${distance}px`);
    footer.style.opacity = distance ? "1" : "0";
    footer.setAttribute("aria-hidden", distance ? "false" : "true");
    footer.classList.toggle("jimi-batch-dragging", dragging);
  };
  var isIPhoneBatchPage = () => isIPhoneLayout && Number(IPHONE_PRESET.mobile.feedBatchSize) > 0 &&
    location.hostname === "www.zhihu.com" && location.pathname === "/";
  var syncIPhoneFeedBatch = () => {
    const root = isIPhoneBatchPage() && document.querySelector('.Topstory-recommend');
    if (!root) {
      setIPhoneBatchPull(0);
      iPhoneFeedBatch.root?.classList.remove("jimi-batch-full");
      iPhoneFeedBatch.footer?.remove();
      Object.assign(iPhoneFeedBatch, { root: null, full: false, count: 0, footer: null });
      return;
    }
    const limit = Math.max(1, Math.min(100, Math.floor(Number(IPHONE_PRESET.mobile.feedBatchSize))));
    let count = 0;
    for (const item of root.querySelectorAll('.TopstoryItem.jimi-listened')) {
      item.classList.remove("jimi-batch-extra");
      if (item.classList.contains("jimi-hidden-item") || !item.querySelector('.ContentItem') || getComputedStyle(item).display === "none") continue;
      item.classList.toggle("jimi-batch-extra", count++ >= limit);
    }
    iPhoneFeedBatch.root = root;
    iPhoneFeedBatch.count = Math.min(count, limit);
    iPhoneFeedBatch.full = count >= limit;
    root.classList.toggle("jimi-batch-full", iPhoneFeedBatch.full);
    let footer = iPhoneFeedBatch.footer;
    if (!footer) {
      footer = document.createElement("div");
      footer.className = "jimi-batch-footer";
      footer.setAttribute("role", "status");
      footer.setAttribute("aria-live", "polite");
      footer.setAttribute("aria-hidden", "true");
      document.body.appendChild(footer);
      iPhoneFeedBatch.footer = footer;
    }
    footer.hidden = !iPhoneFeedBatch.full;
    if (!iPhoneFeedBatch.full) setIPhoneBatchPull(0);
  };
  var shouldStopIPhoneFeedRequest = (input, options) => {
    if (!isIPhoneBatchPage() || !iPhoneFeedBatch.full) return false;
    try {
      const url = new URL(typeof input === "string" ? input : input.url || input.href, location.href);
      return (options?.method || input.method || "GET").toUpperCase() === "GET" &&
        url.origin === location.origin && url.pathname === "/api/v3/feed/topstory/recommend" && url.searchParams.get("action") === "down";
    } catch { return false; }
  };
  var refreshIPhoneFeedBatch = () => {
    if (!isIPhoneBatchPage() || !iPhoneFeedBatch.full || iPhoneFeedBatch.refreshing) return;
    if (navigator.onLine === false) {
      iPhoneFeedBatch.footer.textContent = "当前离线，请联网后再上拉";
      return;
    }
    iPhoneFeedBatch.refreshing = true;
    iPhoneFeedBatch.footer.textContent = "正在刷新下一批…";
    try {
      sessionStorage.setItem("jimIPhoneBatchRefresh", JSON.stringify({ path: location.pathname, restoration: history.scrollRestoration }));
      history.scrollRestoration = "manual";
    } catch { /* 禁用存储时仍可正常刷新。 */ }
    window.scrollTo(0, 0);
    location.reload();
  };
  var isIPhoneBatchSwipe = (start, touch) => (start.y - touch.clientY) * start.damping >= start.threshold && Math.abs(start.x - touch.clientX) < (start.y - touch.clientY) * .6;
  var initIPhoneFeedBatch = () => {
    if (!(Number(IPHONE_PRESET.mobile.feedBatchSize) > 0)) return;
    try {
      const saved = JSON.parse(sessionStorage.getItem("jimIPhoneBatchRefresh") || "null");
      sessionStorage.removeItem("jimIPhoneBatchRefresh");
      if (saved?.path === location.pathname) {
        history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        window.addEventListener("load", () => requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          history.scrollRestoration = saved.restoration === "manual" ? "manual" : "auto";
        }), { once: true });
      }
    } catch { /* 存储不可用时使用刷新前已回到顶部的位置。 */ }
    let start = null, armed = false, moved = false;
    const atBottom = () => iPhoneFeedBatch.root?.isConnected &&
      document.documentElement.scrollHeight - window.scrollY - window.innerHeight <= 8;
    const reset = () => {
      start = null;
      armed = false;
      moved = false;
      if (!iPhoneFeedBatch.refreshing) setIPhoneBatchPull(0);
    };
    document.addEventListener("touchstart", (event) => {
      reset();
      if (!isIPhoneBatchPage() || !iPhoneFeedBatch.full || iPhoneFeedBatch.refreshing || event.touches.length !== 1 || !atBottom()) return;
      if (!iPhoneFeedBatch.root.contains(event.target)) return;
      if (event.target.closest('a, input, textarea, select, [contenteditable="true"], [role="dialog"], .Modal-wrapper, button:not(.jimi-feed-preview)')) return;
      if (document.activeElement?.matches('input, textarea, [contenteditable="true"]')) return;
      const height = window.visualViewport?.height || window.innerHeight;
      const ratio = Math.max(.2, Math.min(.5, Number(IPHONE_PRESET.mobile.feedPullScreenRatio) || .33));
      const damping = Math.max(.5, Math.min(1, Number(IPHONE_PRESET.mobile.feedPullDamping) || .6));
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY, threshold: height * ratio, damping };
    }, { passive: true });
    document.addEventListener("touchmove", (event) => {
      if (!start) return;
      if (event.touches.length !== 1 || !isIPhoneBatchPage() || !iPhoneFeedBatch.full) { reset(); return; }
      const touch = event.touches[0];
      const distance = start.y - touch.clientY;
      if (distance < 0 || Math.abs(start.x - touch.clientX) > Math.max(24, distance)) { reset(); return; }
      armed = isIPhoneBatchSwipe(start, touch);
      moved ||= distance > 8;
      if (distance > 0 && event.cancelable) event.preventDefault();
      const resisted = distance * start.damping;
      const pull = Math.min(resisted, start.threshold) + Math.min(Math.max(0, resisted - start.threshold) * .2, start.threshold * .25);
      setIPhoneBatchPull(pull, true);
      const text = armed ? "松开刷新 ↑" : "继续上拉 ↑";
      if (iPhoneFeedBatch.footer.textContent !== text) iPhoneFeedBatch.footer.textContent = text;
    }, { passive: false });
    document.addEventListener("touchend", (event) => {
      const refresh = armed && event.touches.length === 0;
      if (moved && event.cancelable) event.preventDefault();
      if (refresh) refreshIPhoneFeedBatch();
      reset();
    }, { passive: false });
    document.addEventListener("touchcancel", reset, { passive: true });
  };

  var iPhoneFeedAuthors = new Map();
  var cacheIPhoneFeedAuthors = (items) => {
    if (!isIPhoneLayout || !IPHONE_PRESET.mobile.compactFeed || !Array.isArray(items)) return;
    for (const item of items) {
      const target = item?.target;
      if (target?.type !== "answer" || !target.id || !target.author) continue;
      iPhoneFeedAuthors.set(String(target.id), target.author);
    }
    // 只保留近期头像资料，与原作长列表模式一起控制内存，不保存回答正文。
    while (iPhoneFeedAuthors.size > 200) iPhoneFeedAuthors.delete(iPhoneFeedAuthors.keys().next().value);
  };
  var formatIPhoneFeedVotes = (value) => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)) && Number(value) >= 0
    ? `${Number(value)} 人赞同` : "";
  var iPhoneAvatarObserver;
  var iPhoneAvatarTargets = new Set();
  var loadIPhoneFeedAvatar = async (content) => {
    if (!content.isConnected || content.dataset.avatarRequested) return;
    const id = String(parseJSONAttr(content.getAttribute("data-zop"))?.itemId || "");
    const member = parseJSONAttr(content.getAttribute("data-za-extra-module"))?.card?.content?.author_member_hash_id;
    if (!id || typeof member !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(member)) return;
    content.dataset.avatarRequested = "true";
    const cached = iPhoneFeedAuthors.get(id);
    if (cached?.avatar_url || cached?.avatarUrl) return;
    try {
      // 首屏数据或 Safari 沙箱可能漏过 fetch 拦截；只在条目接近可见区域时补取作者。
      const response = await fetch(`/api/v4/members/${encodeURIComponent(member)}?include=avatar_url`, { credentials: "same-origin" });
      if (!response.ok) return;
      const author = await response.json();
      cacheIPhoneFeedAuthors([{ target: { type: "answer", id, author } }]);
      syncIPhoneFeed();
    } catch {
      // 网络失败时保留作者文字；同一卡片不循环重试。
    }
  };
  var observeIPhoneFeedAvatar = (content) => {
    if (content.dataset.avatarRequested) return;
    if (!iPhoneAvatarObserver) iPhoneAvatarObserver = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        iPhoneAvatarObserver.unobserve(target);
        iPhoneAvatarTargets.delete(target);
        loadIPhoneFeedAvatar(target);
      }
    }, { rootMargin: "300px" });
    iPhoneAvatarObserver.observe(content);
    iPhoneAvatarTargets.add(content);
  };
  var syncIPhoneFeed = () => {
    if (!isIPhoneLayout || !IPHONE_PRESET.mobile.compactFeed) return;
    for (const target of iPhoneAvatarTargets) {
      if (target.isConnected) continue;
      iPhoneAvatarObserver.unobserve(target);
      iPhoneAvatarTargets.delete(target);
    }
    for (const content of document.querySelectorAll('.TopstoryItem .AnswerItem')) {
      const rich = content.querySelector(':scope > .RichContent');
      if (!rich?.classList.contains("is-collapsed") || !rich.querySelector('.ContentItem-more')) continue;
      const zop = parseJSONAttr(content.getAttribute("data-zop")) || {};
      const card = parseJSONAttr(content.getAttribute("data-za-extra-module"))?.card?.content || {};
      const title = content.querySelector('.ContentItem-title a')?.textContent.trim();
      if (!title) continue;
      const author = iPhoneFeedAuthors.get(String(zop.itemId)) || {};
      const authorName = zop.authorName || author.name || "";
      let excerpt = content.querySelector('.RichContent-inner .RichText')?.textContent.replace(/\s+/g, " ").trim() || "";
      if (authorName && (excerpt.startsWith(authorName + "：") || excerpt.startsWith(authorName + ":"))) excerpt = excerpt.slice(authorName.length + 1).trim();
      const votes = formatIPhoneFeedVotes(card.upvote_num);
      const avatar = author.avatar_url || author.avatarUrl || content.querySelector('.AuthorInfo-avatar')?.src || "";
      let preview = content.querySelector(':scope > .jimi-feed-preview');
      if (!preview) {
        preview = document.createElement("button");
        preview.type = "button";
        preview.className = "jimi-feed-preview";
        preview.setAttribute("aria-expanded", "false");
        preview.innerHTML = '<span class="jimi-feed-title"></span><span class="jimi-feed-excerpt"></span><span class="jimi-feed-meta"><img class="jimi-feed-avatar" alt="" hidden><span class="jimi-feed-author"></span><span class="jimi-feed-votes"></span></span>';
        preview.onclick = () => content.querySelector('.RichContent.is-collapsed .ContentItem-more')?.click();
        content.prepend(preview);
      }
      const signature = JSON.stringify([title, excerpt, authorName, votes, avatar]);
      if (preview.dataset.signature !== signature) {
        preview.dataset.signature = signature;
        preview.setAttribute("aria-label", `展开回答：${title}`);
        preview.querySelector('.jimi-feed-title').textContent = title;
        preview.querySelector('.jimi-feed-excerpt').textContent = excerpt;
        preview.querySelector('.jimi-feed-author').textContent = authorName;
        preview.querySelector('.jimi-feed-author').title = authorName;
        preview.querySelector('.jimi-feed-votes').textContent = votes;
        const image = preview.querySelector('img');
        image.hidden = !/^https:\/\//.test(avatar);
        image.onerror = () => {
          image.hidden = true;
          iPhoneFeedAuthors.delete(String(zop.itemId));
          observeIPhoneFeedAvatar(content);
        };
        if (!image.hidden && image.getAttribute("src") !== avatar) image.src = avatar;
      }
      content.classList.add("jimi-feed-answer");
      content.closest('.TopstoryItem').classList.add("jimi-feed-item");
      if (!avatar) observeIPhoneFeedAvatar(content);
    }
  };

  var syncIPhoneCollapseButtons = () => {
    if (!isIPhoneLayout || !IPHONE_PRESET.mobile.floatingCollapse) return;
    for (const content of document.querySelectorAll('.AnswerItem .RichContent:not(.is-collapsed)')) {
      if (content.querySelector('.jimi-iphone-collapse') || !content.querySelector('button[data-zop-retract-question="true"]')) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "jimi-iphone-collapse";
      button.textContent = "收起 ↑";
      button.setAttribute("aria-label", "收起当前回答");
      // 始终找当前原生按钮，兼容知乎展开后替换 DOM；不手动改 React 的折叠状态。
      button.onclick = () => {
        const preview = content.closest('.jimi-feed-answer')?.querySelector('.jimi-feed-preview');
        content.querySelector('button[data-zop-retract-question="true"]')?.click();
        if (preview) requestAnimationFrame(() => { if (preview.getClientRects().length) preview.focus({ preventScroll: true }); });
      };
      content.appendChild(button);
    }
  };

  var judgeBrowserType = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Edg")) return "Edge";
    if (userAgent.includes("Chrome")) return "Chrome";
    return "Safari";
  };
  var isSafari = judgeBrowserType() === "Safari";
  var windowResize = () => {
    window.dispatchEvent(new Event("resize"));
  };
  var dom = (n, find = document) => find ? find.querySelector(n) : void 0;
  var domById = (id) => document.getElementById(id);
  var domA = (n, find = document) => find.querySelectorAll(n);
  var domC = (name, attrObjs) => {
    const node = document.createElement(name);
    for (let key in attrObjs) {
      node[key] = attrObjs[key];
    }
    return node;
  };
  var domP = (node, attrName, attrValue) => {
    const nodeP = node.parentElement;
    if (!nodeP) return void 0;
    if (!attrName || !attrValue) return nodeP;
    if (nodeP === document.body) return void 0;
    const attrValueList = (nodeP.getAttribute(attrName) || "").split(" ");
    return attrValueList.includes(attrValue) ? nodeP : domP(nodeP, attrName, attrValue);
  };
  var insertAfter = (newElement, targetElement) => {
    const parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  };
  var fnReturnStr = (str, isHave = false, strFalse = "") => isHave ? str : strFalse;
  var fnLog = (...str) => console.log("%c「吉姆的知乎 · iPhone」", "color: green;font-weight: bold;", ...str);
  var fnAppendStyle = (id, innerHTML) => {
    const element = domById(id);
    element ? element.innerHTML = innerHTML : document.head.appendChild(domC("style", { id, type: "text/css", innerHTML }));
  };
  var fnDomReplace = (node, attrObjs) => {
    if (!node) return;
    for (let key in attrObjs) {
      node[key] = attrObjs[key];
    }
  };
  var createButtonFontSize12 = (innerHTML, extraCLass = "", extra = {}) => domC("button", {
    innerHTML,
    className: `jimi-button ${extraCLass}`,
    style: "margin-left: 8px;font-size: 12px;",
    ...extra
  });
  var OPTIONS_MAP = {
    replaceZhidaToSearch: [
      { label: "不替换", value: "default" /* 不替换 */ },
      { label: "去除知乎直达跳转", value: "removeLink" /* 去除知乎直达跳转 */ },
      { label: "知乎", value: "zhihu" /* 知乎 */ },
      { label: "必应", value: "bing" /* 必应 */ },
      { label: "百度", value: "baidu" /* 百度 */ },
      { label: "谷歌", value: "google" /* 谷歌 */ }
    ],
    linkShopping: [
      { label: "默认", value: "0" /* 默认 */ },
      { label: "仅文字", value: "1" /* 仅文字 */ },
      { label: "隐藏", value: "2" /* 隐藏 */ }
    ],
    answerOpen: [
      { label: "默认", value: "default" /* 默认 */ },
      { label: "收起长回答", value: "off" /* 收起长回答 */ },
      { label: "自动展开所有回答", value: "on" /* 自动展开所有回答 */ }
    ],
    suspensionOpen: [
      { label: "左右", value: "0" /* 左右 */ },
      { label: "上下", value: "1" /* 上下 */ }
    ],
    zoomImageType: [
      { label: "默认尺寸", value: "0" /* 默认尺寸 */ },
      { label: "自定义尺寸", value: "2" /* 自定义尺寸 */ },
      { label: "原图尺寸", value: "1" /* 原图尺寸 */ }
    ],
    zoomImageHeight: [
      { label: "关闭", value: "0" /* 关闭 */ },
      { label: "开启", value: "1" /* 开启 */ }
    ],
    zoomListVideoType: [
      { label: "默认尺寸", value: "0" /* 默认尺寸 */ },
      { label: "自定义尺寸", value: "2" /* 自定义尺寸 */ }
    ],
    videoInAnswerArticle: [
      { label: "默认", value: "0" /* 默认 */ },
      { label: "修改为链接", value: "1" /* 修改为链接 */ },
      { label: "隐藏视频/过滤视频回答", value: "2" /* 隐藏视频 */ }
    ],
    homeContentOpen: [
      { label: "默认", value: "0" /* 默认 */ },
      { label: "自动展开内容", value: "1" /* 自动展开内容 */ }
    ]
  };
  var SELECT_BASIS_SHOW = [
    { label: "购物链接显示方式", value: "linkShopping" },
    { label: '替换<span class="jimi-zhida">知乎直达<span>✦</span></span>为搜索', value: "replaceZhidaToSearch" },
    { label: "回答和文章中的视频显示方式", value: "videoInAnswerArticle" },
    { label: "问题页面 - 回答收起/展开状态", value: "answerOpen" },
    { label: "用户主页 - 内容收起/展开状态", value: "homeContentOpen" }
  ];
  var createHTMLTooltip = (value) => `<span class="jimi-tooltip"><span>?</span><span>${value}</span></span>`;
  var createHTMLRange = (v, min, max, unit = "") => `<div class="jimi-flex-wrap jimi-range-${v}">${`<span style="font-size: 12px;margin-right: 8px;">当前：<span id="${v}">0</span>${unit}</span><span style="margin-right: 2px;color: #757575;font-size: 12px;">${min}${unit}</span><input class="jimi-i" type="range" min="${min}" max="${max}" name="${v}" style="width: 200px" /><span style="margin-left: 2px;color: #757575;font-size: 12px;">${max}${unit}</span>`}</div>`;
  var createHTMLFormBoxSwitch = (con) => con.map(
    (item) => `<div class="jimi-form-box">${item.map(
      ({ label, value, needFetch, tooltip }) => createHTMLFormItem({ label, value: `<input class="jimi-i jimi-switch" name="${value}" type="checkbox" value="on" />`, needFetch, tooltip })
    ).join("")}</div>`
  ).join("");
  var createHTMLFormItem = ({ label, value, needFetch, tooltip, extraClass }) => `<div class="jimi-form-box-item${needFetch ? " jimi-fetch-intercept" : ""}${extraClass ? ` ${extraClass}` : ""}">${`<div>${label + (needFetch ? '<span class="jimi-need-fetch">（接口拦截已关闭，此功能无法使用）</span>' : "") + (tooltip ? createHTMLTooltip(tooltip) : "")}</div><div>${value}</div>`}</div>`;
  var myPreview = {
    open: function(src, even, isVideo) {
      const nameDom = isVideo ? this.evenPathVideo : this.evenPathImg;
      const idDom = isVideo ? this.idVideo : this.idImg;
      const nodeName = dom(nameDom);
      const nodeId = domById(idDom);
      nodeName && (nodeName.src = src);
      nodeId && (nodeId.style.display = "block");
      even && (this.even = even);
      myScroll.stop();
    },
    hide: function(pEvent) {
      if (this.even) {
        this.even.click();
        this.even = null;
      }
      pEvent.style.display = "none";
      const nodeImg = dom(this.evenPathImg);
      const nodeVideo = dom(this.evenPathVideo);
      nodeImg && (nodeImg.src = "");
      nodeVideo && (nodeVideo.src = "");
      myScroll.on();
    },
    even: null,
    evenPathImg: "#JIMI_PREVIEW_IMAGE img",
    evenPathVideo: "#JIMI_PREVIEW_VIDEO video",
    idImg: "JIMI_PREVIEW_IMAGE",
    idVideo: "JIMI_PREVIEW_VIDEO"
  };
  var initImagePreview = async () => {
    const { zoomImageType } = await myStorage.getConfig();
    const images = [domA(".TitleImage:not(.jimi-processed)"), domA(".ArticleItem-image:not(.jimi-processed)"), domA(".ztext figure .content_image:not(.jimi-processed)")];
    for (let i = 0, imageLen = images.length; i < imageLen; i++) {
      const ev = images[i];
      for (let index2 = 0, len = ev.length; index2 < len; index2++) {
        const nodeItem = ev[index2];
        nodeItem.classList.add("jimi-processed");
        const src = nodeItem.src || nodeItem.style.backgroundImage && nodeItem.style.backgroundImage.split('("')[1].split('")')[0];
        nodeItem.onclick = () => myPreview.open(src);
      }
    }
    if (zoomImageType === "2" /* 自定义尺寸 */) {
      const originImages = domA(".origin_image:not(.jimi-processed)");
      for (let i = 0, len = originImages.length; i < len; i++) {
        const nodeItem = originImages[i];
        nodeItem.src = nodeItem.getAttribute("data-original") || nodeItem.src;
        nodeItem.classList.add("jimi-processed");
        nodeItem.style.cssText = "max-width: 100%;";
      }
    }
  };
  var SELECTOR_RIGHT_ANCHOR = "#JIMI_DIALOG_RIGHT_ANCHOR";
  var CLASS_RIGHT_ANCHOR_ITEM = "jimi-right-anchor-item";
  var CLASS_RIGHT_ANCHOR_TARGET = "target";
  var initMenu = (domMain) => {
    const { hash } = location;
    const arrayHash = [...domA("#JIMI_DIALOG_MENU>div", domMain)].map((i) => i.dataset.href || "");
    const chooseId = arrayHash.find((i) => i === hash || hash.replace(i, "") !== hash);
    fnChangeMenu(dom(`#JIMI_DIALOG_MENU>div[data-href="${chooseId || arrayHash[0]}"]`, domMain), domMain);
  };
  var onChangeMenu = (event) => {
    const target = event.target;
    const dataHref = target.dataset.href || "";
    if (dataHref) {
      location.hash = dataHref;
      fnChangeMenu(target, document.body);
      return;
    }
  };
  var fnChangeMenu = (target, domMain) => {
    const currentHref = target.dataset.href || "";
    const chooseId = currentHref.replace(/#/, "");
    if (!chooseId) return;
    domA("#JIMI_DIALOG_MENU>div", domMain).forEach((item) => item.classList.remove("target"));
    domA("#JIMI_DIALOG_MAIN>div", domMain).forEach((item) => item.style.display = chooseId === item.id ? "block" : "none");
    domA(".jimi-right-title-content>div", domMain).forEach((item) => item.style.display = currentHref === item.dataset.id ? "block" : "none");
    const nodeMain = dom("#JIMI_DIALOG_MAIN", domMain);
    nodeMain && (nodeMain.scrollTop = 0);
    target.classList.add("target");
    updateRightTitleAnchor(domMain);
  };
  var createHTMLRightTitle = (domMain = document.body) => {
    const { hash } = location;
    const arr = [...dom("#JIMI_DIALOG_MENU", domMain).childNodes].map((item) => {
      const itemDom = item;
      return {
        name: itemDom.textContent,
        commit: itemDom.dataset.commit || "",
        href: itemDom.dataset.href || ""
      };
    });
    dom(".jimi-right-title-content", domMain).innerHTML = arr.map(
      ({ name, commit, href }, index2) => `<div data-id="${href}" style="display: ${!hash && index2 === 0 || hash === href ? "block" : "none"}">${name}<span>${commit}</span></div>`
    ).join("");
    updateRightTitleAnchor(domMain);
  };
  var onChangeRightTitleAnchor = (event) => {
    const target = event.target;
    const nodeAnchor = target.closest(`.${CLASS_RIGHT_ANCHOR_ITEM}`);
    const anchorId = nodeAnchor?.dataset.anchorId || "";
    if (!anchorId) return;
    event.preventDefault();
    event.stopPropagation();
    const nodeMain = dom("#JIMI_DIALOG_MAIN");
    const nodeTitle = getCurrentTitleList().find((item) => item.dataset.anchorId === anchorId);
    if (!nodeMain || !nodeTitle) return;
    setRightTitleAnchorTarget(anchorId);
    nodeMain.scrollTo({ top: getTitleOffsetTop(nodeTitle, nodeMain), behavior: "smooth" });
  };
  var onScrollRightTitleAnchor = () => updateRightTitleAnchorTarget();
  var updateRightTitleAnchor = (domMain = document.body) => {
    const nodeAnchor = dom(SELECTOR_RIGHT_ANCHOR, domMain);
    if (!nodeAnchor) return;
    const currentTitleList = getCurrentTitleList(domMain);
    nodeAnchor.innerHTML = "";
    if (currentTitleList.length <= 1) {
      nodeAnchor.style.display = "none";
      return;
    }
    currentTitleList.forEach((item, index2) => {
      const anchorId = `${getCurrentContentId(domMain)}-${index2}`;
      item.dataset.anchorId = anchorId;
      const button = domC("button", {
        type: "button",
        className: CLASS_RIGHT_ANCHOR_ITEM,
        innerText: getTitleText(item)
      });
      button.dataset.anchorId = anchorId;
      nodeAnchor.appendChild(button);
    });
    nodeAnchor.style.display = "flex";
    updateRightTitleAnchorTarget(domMain);
  };
  var updateRightTitleAnchorTarget = (domMain = document.body) => {
    const nodeAnchor = dom(SELECTOR_RIGHT_ANCHOR, domMain);
    const nodeMain = dom("#JIMI_DIALOG_MAIN", domMain);
    const currentTitleList = getCurrentTitleList(domMain);
    if (!nodeAnchor || !nodeMain || currentTitleList.length <= 1) return;
    let anchorId = currentTitleList[0].dataset.anchorId || "";
    if (!nodeMain.clientHeight) {
      setRightTitleAnchorTarget(anchorId, domMain);
      return;
    }
    const currentTop = nodeMain.scrollTop + 4;
    currentTitleList.forEach((item) => {
      if (getTitleOffsetTop(item, nodeMain) <= currentTop) {
        anchorId = item.dataset.anchorId || anchorId;
      }
    });
    if (nodeMain.scrollHeight > nodeMain.clientHeight + 4 && nodeMain.scrollTop + nodeMain.clientHeight >= nodeMain.scrollHeight - 4) {
      anchorId = currentTitleList[currentTitleList.length - 1].dataset.anchorId || anchorId;
    }
    setRightTitleAnchorTarget(anchorId, domMain);
  };
  var setRightTitleAnchorTarget = (anchorId, domMain = document.body) => {
    domA(`.${CLASS_RIGHT_ANCHOR_ITEM}`, domMain).forEach((item) => {
      item.classList.toggle(CLASS_RIGHT_ANCHOR_TARGET, item.dataset.anchorId === anchorId);
    });
  };
  var getCurrentContentId = (domMain = document.body) => {
    const nodeTarget = dom("#JIMI_DIALOG_MENU>div.target", domMain);
    return (nodeTarget?.dataset.href || "").replace(/#/, "");
  };
  var getCurrentTitleList = (domMain = document.body) => {
    const currentContentId = getCurrentContentId(domMain);
    const nodeCurrentContent = currentContentId ? dom(`#${currentContentId}`, domMain) : void 0;
    return nodeCurrentContent ? [...domA(".jimi-title", nodeCurrentContent)] : [];
  };
  var getTitleText = (nodeTitle) => {
    const text = [...nodeTitle.childNodes].filter((item) => item.nodeType === Node.TEXT_NODE).map((item) => item.textContent || "").join("").trim();
    return (text || nodeTitle.textContent || "").replace(/\s+/g, " ");
  };
  var getTitleOffsetTop = (nodeTitle, nodeMain) => nodeTitle.getBoundingClientRect().top - nodeMain.getBoundingClientRect().top + nodeMain.scrollTop;
  var HTML_HOOTS = ["www.zhihu.com", "zhuanlan.zhihu.com"];
  var CLASS_INPUT_CLICK = "jimi-i";
  var CLASS_INPUT_CHANGE = "jimi-i-change";
  var CLASS_NOT_INTERESTED = "jimi-not-interested";
  var CLASS_TO_QUESTION = "jimi-to-question";
  var CLASS_TIME_ITEM = "jimi-list-item-time";
  var CLASS_LISTENED = "jimi-listened";
  var ID_EXTRA_DIALOG = "JIMI_EXTRA_OUTPUT_DIALOG";
  var CLASS_ZHIHU_COMMENT_DIALOG = "css-1aq8hf9";
  var EXTRA_CLASS_HTML = {
    "zhuanlan.zhihu.com": "zhuanlan",
    "www.zhihu.com": "zhihu"
  };
  var BLOCKED_USER_LIST_TYPE = {
    zhihu: "zhihu",
    local: "local"
  };
  var BLOCKED_USER_LIST_CONFIG_KEY = {
    zhihu: "blockedUsers",
    local: "localBlockedUsers"
  };
  var mergeTags = (a, b) => [.../* @__PURE__ */ new Set([...a || [], ...b || []])];
  var mergeBlockedUser = (prev, next) => ({
    ...prev,
    ...next,
    tags: mergeTags(prev?.tags, next.tags)
  });
  var mergeBlockedUsers = (users) => {
    const map = /* @__PURE__ */ new Map();
    users.forEach((user) => {
      if (!user.id) return;
      map.set(user.id, mergeBlockedUser(map.get(user.id), user));
    });
    return [...map.values()];
  };
  var getBlockedUsersByType = (config, listType) => config[BLOCKED_USER_LIST_CONFIG_KEY[listType]] || [];
  var getAllBlockedUsers = (config) => mergeBlockedUsers([...config.blockedUsers || [], ...config.localBlockedUsers || []]);
  var findBlockedUserWithType = (config, id) => {
    const zhihuUser = (config.blockedUsers || []).find((item) => item.id === id);
    if (zhihuUser) return { user: zhihuUser, listType: BLOCKED_USER_LIST_TYPE.zhihu };
    const localUser = (config.localBlockedUsers || []).find((item) => item.id === id);
    if (localUser) return { user: localUser, listType: BLOCKED_USER_LIST_TYPE.local };
  };
  var isZhihuBlockListFullText = (text) => /(黑名单|屏蔽).*(上限|数量|已满|最多)|limit|maximum|too many/i.test(text);
  var isZhihuBlockListFullResponse = async (res) => {
    if (res.ok) return false;
    try {
      return isZhihuBlockListFullText(await res.clone().text());
    } catch {
      return false;
    }
  };
  var BLOCKED_USER_COMMON = [
    [
      { label: "列表和回答 - 「屏蔽用户」按钮", value: "showBlockUser" },
      { label: "用户主页 - 置顶「屏蔽用户」按钮", value: "userHomeTopBlockUser" },
      { label: "评论区 - 「屏蔽用户」按钮", value: "showBlockUserComment" },
      { label: "屏蔽黑名单用户发布的内容（问题、回答、文章）", value: "removeBlockUserContent" },
      { label: "屏蔽黑名单用户发布的评论", value: "removeBlockUserComment" },
      { label: "将黑名单用户发布的内容使用 * 代替", value: "replaceBlockUserContentWithStar" },
      { label: '列表和回答 - 黑名单用户标识<div class="jimi-black-tag">黑名单</div>', value: "showBlockUserTag" },
      { label: '评论区 - 黑名单用户标识<div class="jimi-black-tag">黑名单</div>', value: "showBlockUserCommentTag" },
      { label: '黑名单用户标识显示标签分类<div class="jimi-black-tag">黑名单：xx</div>', value: "showBlockUserTagType" }
    ]
  ];
  var BLACK_LIST_CONFIG_NAMES = [
    "showBlockUser",
    "userHomeTopBlockUser",
    "showBlockUserComment",
    "removeBlockUserComment",
    "replaceBlockUserContentWithStar",
    "showBlockUserCommentTag",
    "showBlockUserTag",
    "showBlockUserTagType",
    "openTagChooseAfterBlockedUser",
    "removeBlockUserContent",
    "blockedUsers",
    "localBlockedUsers",
    "blockedUsersTags"
  ];
  var updateItemAfterBlock = async (userInfo, listType = BLOCKED_USER_LIST_TYPE.zhihu, options = {}) => {
    const config = await myStorage.getConfig();
    const { openTagChooseAfterBlockedUser } = config;
    const listKey = BLOCKED_USER_LIST_CONFIG_KEY[listType];
    const otherListKey = listType === BLOCKED_USER_LIST_TYPE.zhihu ? BLOCKED_USER_LIST_CONFIG_KEY.local : BLOCKED_USER_LIST_CONFIG_KEY.zhihu;
    const prevList = config[listKey] || [];
    const prevUser = prevList.find((item) => item.id === userInfo.id);
    const nextUser = mergeBlockedUser(prevUser, userInfo);
    await myStorage.updateConfig({
      ...config,
      [listKey]: [nextUser, ...prevList.filter((item) => item.id !== userInfo.id)],
      [otherListKey]: (config[otherListKey] || []).filter((item) => item.id !== userInfo.id)
    });
    await initHTMLBlockedUsers(document.body);
    if (options.openTagChoose !== false && openTagChooseAfterBlockedUser) {
      const nodeUserItem = dom(`#${listType === BLOCKED_USER_LIST_TYPE.zhihu ? ID_BLOCK_LIST : ID_LOCAL_BLOCK_LIST} .jimi-black-id-${userInfo.id}`);
      nodeUserItem && chooseBlockedUserTags(nodeUserItem, false);
    }
  };
  var removeItemAfterBlock = async (userInfo, listType = BLOCKED_USER_LIST_TYPE.zhihu) => {
    const config = await myStorage.getConfig();
    const listKey = BLOCKED_USER_LIST_CONFIG_KEY[listType];
    const blockedUsers = config[listKey] || [];
    const itemIndex = blockedUsers.findIndex((i) => i.id === userInfo.id);
    if (itemIndex >= 0) {
      blockedUsers.splice(itemIndex, 1);
      await myStorage.updateConfigItem(listKey, blockedUsers);
    }
    initHTMLBlockedUsers(document.body);
  };
  var getXSRFToken = () => document.cookie.match(/(?<=_xsrf=)[\w-]+(?=;)/)?.[0] || "";
  var addBlockUser = (userInfo, options = {}) => {
    const { name, urlToken } = userInfo;
    return new Promise((resolve) => {
      const headers = store.getFetchHeaders();
      fetch(`https://www.zhihu.com/api/v4/members/${urlToken}/actions/block`, {
        method: "POST",
        headers: new Headers({
          ...headers,
          "x-xsrftoken": getXSRFToken()
        }),
        credentials: "include"
      }).then(async (res) => {
        if (res.ok) {
          await updateItemAfterBlock(userInfo, BLOCKED_USER_LIST_TYPE.zhihu, options);
          resolve(BLOCKED_USER_LIST_TYPE.zhihu);
          return;
        }
        if (await isZhihuBlockListFullResponse(res)) {
          await updateItemAfterBlock(userInfo, BLOCKED_USER_LIST_TYPE.local, options);
          message("知乎黑名单已满，已添加至本地黑名单");
          resolve(BLOCKED_USER_LIST_TYPE.local);
          return;
        }
        message(`屏蔽用户失败：${name}`);
        resolve(void 0);
      }).catch(() => {
        message(`屏蔽用户失败：${name}`);
        resolve(void 0);
      });
    });
  };
  var removeBlockUser = (info, needConfirm = true) => {
    return new Promise((resolve) => {
      const { urlToken } = info;
      const headers = store.getFetchHeaders();
      fetch(`https://www.zhihu.com/api/v4/members/${urlToken}/actions/block`, {
        method: "DELETE",
        headers: new Headers({
          ...headers,
          "x-xsrftoken": getXSRFToken()
        }),
        credentials: "include"
      }).then(async () => {
        await removeItemAfterBlock(info, BLOCKED_USER_LIST_TYPE.zhihu);
        resolve();
      });
    });
  };
  var interceptResponseForBlocked = async (res, opt) => {
    if (/\/api\/v4\/members\/[^/]+\/actions\/block/.test(res.url)) {
      if (dom(".ProfileHeader-contentFooter .MemberButtonGroup")) {
        const jsInitData = store.getJsInitialData();
        let userInfo = void 0;
        try {
          const currentUserInfo = jsInitData.initialState.entities.users;
          Object.entries(currentUserInfo).forEach(([key, value]) => {
            if (value.name && location.pathname.includes(key)) {
              const { id, name, urlToken } = value;
              userInfo = { id, name, urlToken };
            }
          });
        } catch {
        }
        if (opt && userInfo) {
          if (opt.method === "POST") {
            if (res.ok) {
              updateItemAfterBlock(userInfo, BLOCKED_USER_LIST_TYPE.zhihu);
            } else if (await isZhihuBlockListFullResponse(res)) {
              updateItemAfterBlock(userInfo, BLOCKED_USER_LIST_TYPE.local);
              message("知乎黑名单已满，已添加至本地黑名单");
            }
          }
          opt.method === "DELETE" && res.ok && removeItemAfterBlock(userInfo, BLOCKED_USER_LIST_TYPE.zhihu);
        }
      }
    }
  };
  var onExportBlack = async () => {
    const config = await myStorage.getConfig();
    const configBlackList = {};
    BLACK_LIST_CONFIG_NAMES.forEach((name) => {
      if (typeof config[name] !== "undefined") {
        configBlackList[name] = config[name];
      }
    });
    const dateNumber = +/* @__PURE__ */ new Date();
    const link = domC("a", {
      href: "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(JSON.stringify(configBlackList)),
      download: `黑名单配置-${formatTime(dateNumber, "YYYYMMDD-HHmmss")}-${dateNumber}.txt`
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  var onImportBlack = async (oFREvent) => {
    let configBlackJson = oFREvent.target ? oFREvent.target.result : "";
    if (typeof configBlackJson !== "string") return;
    const configBlack = JSON.parse(configBlackJson);
    const { blockedUsers = [], localBlockedUsers = [], blockedUsersTags = [] } = configBlack;
    const prevConfig = await myStorage.getConfig();
    const { blockedUsers: prevBlockUsers = [], localBlockedUsers: prevLocalBlockedUsers = [], blockedUsersTags: prevBlockedUsersTags = [] } = prevConfig;
    const nTags = [.../* @__PURE__ */ new Set([...prevBlockedUsersTags, ...blockedUsersTags])];
    const nBlackList = mergeBlockedUsers([...prevBlockUsers, ...blockedUsers]);
    const blockedUserIds = new Set(nBlackList.map((item) => item.id));
    const nLocalBlackList = mergeBlockedUsers([...prevLocalBlockedUsers, ...localBlockedUsers]).filter((item) => !blockedUserIds.has(item.id));
    await myStorage.updateConfig({
      ...prevConfig,
      ...configBlack,
      blockedUsers: nBlackList,
      localBlockedUsers: nLocalBlackList,
      blockedUsersTags: nTags
    });
    message("导入完成，请等待知乎黑名单同步...");
    onSyncBlackList(0);
  };
  var onSyncRemoveBlockedUsers = async () => {
    if (!confirm("您确定要取消所有知乎黑名单用户吗？")) return;
    if (!confirm("确定清空所有知乎黑名单用户？")) return;
    const { blockedUsers = [] } = await myStorage.getConfig();
    if (!blockedUsers.length) return;
    const buttonSync = dom('button[name="syncBlackRemove"]');
    if (!buttonSync.querySelector("jimi-loading")) {
      fnDomReplace(buttonSync, { innerHTML: '<i class="jimi-loading">↻</i>', disabled: true });
    }
    const len = blockedUsers.length;
    let finishNumber = 0;
    for (let i = 0; i < len; i++) {
      const info = blockedUsers[i];
      if (info.id) {
        removeBlockUser(info, false).then(async () => {
          finishNumber++;
          if (finishNumber === len) {
            fnDomReplace(buttonSync, { innerHTML: "清空知乎黑名单", disabled: false });
            await myStorage.updateConfigItem("blockedUsers", []);
            initHTMLBlockedUsers(document.body);
          }
        });
      }
    }
  };
  function onSyncBlackList(offset = 0, l = []) {
    const nodeList = domById(ID_BLOCK_LIST);
    if (!l.length && nodeList) {
      nodeList.innerHTML = "知乎黑名单加载中...";
    }
    const buttonSync = dom('button[name="syncBlack"]');
    if (!buttonSync.querySelector("jimi-loading")) {
      fnDomReplace(buttonSync, { innerHTML: '<i class="jimi-loading">↻</i>', disabled: true });
    }
    const limit = 20;
    const headers = store.getFetchHeaders();
    fetch(`https://www.zhihu.com/api/v3/settings/blocked_users?offset=${offset}&limit=${limit}`, {
      method: "GET",
      headers: new Headers(headers),
      credentials: "include"
    }).then((response) => response.json()).then(async ({ data, paging }) => {
      const prevConfig = await myStorage.getConfig();
      const { blockedUsers = [], localBlockedUsers = [] } = prevConfig;
      const prevBlockedUsers = [...blockedUsers, ...localBlockedUsers];
      data.forEach(({ id, name, url_token }) => {
        const findItem = prevBlockedUsers.find((i) => i.id === id);
        l.push({ id, name, urlToken: url_token, tags: findItem && findItem.tags || [] });
      });
      if (!paging.is_end) {
        onSyncBlackList(offset + limit, l);
        if (nodeList) {
          nodeList.innerHTML = `知乎黑名单加载中（${l.length} / ${paging.totals}）...`;
        }
      } else {
        const syncedIds = new Set(l.map((item) => item.id));
        await myStorage.updateConfig({
          ...prevConfig,
          blockedUsers: l,
          localBlockedUsers: localBlockedUsers.filter((item) => !syncedIds.has(item.id))
        });
        initHTMLBlockedUsers(document.body);
        fnDomReplace(buttonSync, { innerHTML: "同步知乎黑名单", disabled: false });
        message("知乎黑名单同步完成");
      }
    });
  }
  var CLASS_TOP_BLOCK = "jimi-top-block-in-user-home";
  var blockObserver;
  var index = 0;
  var topBlockUser = async () => {
    const { userHomeTopBlockUser } = await myStorage.getConfig();
    const nodeUserHeaderOperate = dom(".ProfileHeader-contentFooter .MemberButtonGroup");
    const nodeFooterOperations = dom(".Profile-footerOperations");
    if (!nodeUserHeaderOperate || !userHomeTopBlockUser || !nodeFooterOperations) return;
    const isMe = nodeUserHeaderOperate.innerText.includes("编辑个人资料");
    if (isMe) return;
    const domProfileHeader = domById("ProfileHeader");
    if (!domProfileHeader || !domProfileHeader.dataset.zaExtraModule) {
      setTimeout(topBlockUser, 500);
      return;
    }
    const isBlocked = nodeUserHeaderOperate.innerText.includes("已屏蔽");
    const domFind = dom(`.${CLASS_TOP_BLOCK}`);
    domFind && domFind.remove();
    const nDomButton = domC("button", {
      className: `Button Button--primary Button--red ${CLASS_TOP_BLOCK}`,
      innerText: isBlocked ? "解除屏蔽" : "屏蔽用户"
    });
    const domUnblock = nodeUserHeaderOperate.firstChild;
    const domBlock = nodeFooterOperations.firstChild;
    nDomButton.onclick = function() {
      if (isBlocked) {
        domUnblock.click();
      } else {
        domBlock.click();
      }
    };
    nodeUserHeaderOperate.insertBefore(nDomButton, domUnblock);
    blockObserver && blockObserver.disconnect();
    blockObserver = new MutationObserver(() => {
      topBlockUser();
    });
    blockObserver.observe(nodeFooterOperations, {
      attributes: false,
      childList: true,
      characterData: false,
      characterDataOldValue: false,
      subtree: true
    });
    if (index === 0) {
      index++;
      setTimeout(topBlockUser, 1e3);
    }
  };
  var createHTMLSizeSetting = (domMain) => {
    dom("#JIMI_VERSION_RANGE_ZHIHU", domMain).innerHTML = VERSION_RANGE_HAVE_PERCENT.map(
      (item) => `<div class="jimi-form-box-item">${`<div>${item.label}${createHTMLTooltip("最小显示宽度为600像素，设置低于此值将按照600像素显示")}</div><div>${createHTMLRange(item.value, VERSION_MIN_WIDTH, 1500) + createHTMLRange(`${item.value}Percent`, 20, 100, "%")}</div>`}</div><div class="jimi-form-box-item">${`<div>${item.label}使用百分比设置</div><div><input class="jimi-i jimi-switch" name="${item.value}IsPercent" type="checkbox" value="on" /></div>`}</div>`
    ).join("");
    dom("#JIMI_IMAGE_SIZE_CUSTOM", domMain).innerHTML = `<div>回答和文章图片宽度</div>` + createHTMLRange("zoomImageSize", 0, 1e3);
    dom("#JIMI_IMAGE_HEIGHT_CUSTOM", domMain).innerHTML = `<div>图片最大高度</div>` + createHTMLRange("zoomImageHeightSize", 0, 1e3);
    dom("#JIMI_LIST_VIDEO_SIZE_CUSTOM", domMain).innerHTML = `<div>列表视频回答宽度</div>` + createHTMLRange("zoomListVideoSize", 0, 1e3);
    dom("#JIMI_FONT_SIZE_IN_ZHIHU", domMain).innerHTML = FONT_SIZE_INPUT.map(
      (item) => `<div class="jimi-form-box-item">${`<div>${item.label}</div><div>${`<input type="number" name="${item.value}" class="jimi-i-change" style="width: 100px;margin-right: 8px;" placeholder="例：18" /><button class="jimi-button jimi-reset-font-size" name="reset-${item.value}">↺</button>`}</div>`}</div>`
    ).join("");
  };
  var FONT_SIZE_INPUT = [
    { value: "fontSizeForListTitle", label: "列表标题文字大小" },
    { value: "fontSizeForList", label: "列表内容文字大小" },
    { value: "fontSizeForAnswerTitle", label: "回答标题文字大小" },
    { value: "fontSizeForAnswer", label: "回答内容文字大小" },
    { value: "fontSizeForArticleTitle", label: "文章标题文字大小" },
    { value: "fontSizeForArticle", label: "文章内容文字大小" },
    { value: "contentLineHeight", label: "内容行高" }
  ];
  var VERSION_MIN_WIDTH = isIPhoneLayout ? 0 : 600;
  var VERSION_RANGE_HAVE_PERCENT = [
    { label: "列表宽度", value: "versionHome" },
    { label: "回答宽度", value: "versionAnswer" },
    { label: "文章宽度", value: "versionArticle" },
    { label: "用户主页宽度", value: "versionUserHome" },
    { label: "收藏夹宽度", value: "versionCollection" }
  ];
  var mySize = {
    init: async function() {
      fnAppendStyle("JIMI_STYLE_VERSION", await this.content());
    },
    change: function() {
      this.initAfterLoad();
      this.init();
    },
    initAfterLoad: async function() {
      const pfConfig = await myStorage.getConfig();
      domById("JIMI_IMAGE_SIZE_CUSTOM").style.display = pfConfig.zoomImageType === "2" /* 自定义尺寸 */ ? "flex" : "none";
      domById("JIMI_IMAGE_HEIGHT_CUSTOM").style.display = pfConfig.zoomImageHeight === "1" /* 开启 */ ? "flex" : "none";
      domById("JIMI_LIST_VIDEO_SIZE_CUSTOM").style.display = pfConfig.zoomListVideoType === "2" /* 自定义尺寸 */ ? "flex" : "none";
    },
    content: async function() {
      const config = await myStorage.getConfig();
      const {
        commitModalSizeSameVersion,
        versionArticle,
        versionArticleIsPercent,
        versionArticlePercent,
        zoomImageType,
        zoomImageHeight,
        zoomImageHeightSize,
        zoomImageSize,
        zoomListVideoSize,
        zoomListVideoType,
        fixedListItemMore,
        listTitleTagQuestion,
        listTitleTagArticle,
        listTitleTagVideo,
        listTitleTagPin,
        themeDark = 1 /* 深色一 */,
        themeLight = 0 /* 默认 */,
        suspensionHomeTabPo,
        suspensionHomeTab,
        suspensionFindPo,
        suspensionUserPo,
        suspensionSearchPo,
        highlightListItem,
        linkShopping,
        fontSizeForList,
        fontSizeForAnswer,
        fontSizeForArticle,
        fontSizeForListTitle,
        fontSizeForAnswerTitle,
        fontSizeForArticleTitle,
        contentLineHeight
      } = config;
      const dark = await isDark();
      const formatVersionPercentSize = (name) => isIPhoneLayout ? "100%" : !config[`${name}IsPercent`] ? `${config[name] || "1000"}px` : `${config[`${name}Percent`] || "70"}vw`;
      const versionSizeHome = formatVersionPercentSize("versionHome");
      const versionSizeAnswer = formatVersionPercentSize("versionAnswer");
      const versionSizeArticle = formatVersionPercentSize("versionArticle");
      const versionSizeUserHome = formatVersionPercentSize("versionUserHome");
      const versionSizeCollection = formatVersionPercentSize("versionCollection");
      const NAME_HOME = ".Topstory-mainColumn,.SearchMain";
      const NAME_ANSWER = ".QuestionPage,.QuestionHeader-footer-inner,.QuestionHeader .QuestionHeader-content,.QuestionPage>div";
      const NAME_ARTICLE = ".Post-NormalSub>div,.zhuanlan .Post-Row-Content,.zhuanlan .css-pi1fiy";
      const NAME_USER_HOME = '#ProfileHeader,[itemprop="people"] .Profile-main';
      const NAME_COLLECTION = ".CollectionsDetailPage";
      const xxxWidth = `${NAME_HOME}{width: ${versionSizeHome}!important;}${NAME_ANSWER}{width: ${versionSizeAnswer}!important;margin: 0 auto; padding: 0;}${NAME_ARTICLE}{width: ${versionSizeArticle}!important;}.zhuanlan .Post-SideActions{right: ${!versionArticleIsPercent ? `calc(50vw - ${+(versionArticle || "1000") / 2 + 150}px)` : `calc(50vw - ${+(versionArticlePercent || "70") / 2}vw + 150px)`}}${NAME_USER_HOME}{width: ${versionSizeUserHome}!important;}${NAME_COLLECTION}{width: ${versionSizeCollection}!important}${NAME_HOME},${NAME_ANSWER},${NAME_ARTICLE},${NAME_USER_HOME},${NAME_COLLECTION},.${CLASS_ZHIHU_COMMENT_DIALOG},.Topstory-body .${CLASS_ZHIHU_COMMENT_DIALOG},.PostIndex-body .${CLASS_ZHIHU_COMMENT_DIALOG}{min-width: ${VERSION_MIN_WIDTH}px!important;}` + fnReturnStr(
        `.Topstory-body .${CLASS_ZHIHU_COMMENT_DIALOG}{width: ${versionSizeHome}!important;max-width:100vw;}.PostIndex-body .${CLASS_ZHIHU_COMMENT_DIALOG}{width: ${versionSizeArticle}!important;max-width:100vw;}` + fnReturnStr(`.${CLASS_ZHIHU_COMMENT_DIALOG}{width: ${versionSizeAnswer}!important;max-width:100vw;}`, location.pathname.includes("question")) + fnReturnStr(`.${CLASS_ZHIHU_COMMENT_DIALOG}{width: ${versionSizeCollection}!important;max-width:100vw;}`, location.pathname.includes("collection")) + fnReturnStr(`.${CLASS_ZHIHU_COMMENT_DIALOG}{width: ${versionSizeUserHome}!important;max-width:100vw;}`, location.pathname.includes("people")),
        commitModalSizeSameVersion
      );
      const xxxHiddenListArticleTopImg = zoomImageHeight === "1" /* 开启 */ || zoomImageType === "2" /* 自定义尺寸 */ ? ".ContentItem .css-75aco3{display: none;}" : "";
      const xxxImage = `img.lazy,img.origin_image,.GifPlayer img,.ArticleItem-image,.ztext figure .content_image,.ztext figure .origin_image,.TitleImage{${(zoomImageHeight === "1" /* 开启 */ ? `max-height: ${zoomImageHeightSize}px!important;width: auto!important;` : "") || (zoomImageType === "2" /* 自定义尺寸 */ ? `width: ${zoomImageSize}px!important;cursor: zoom-in!important;max-width: 100%!important;` : "")}}` + xxxHiddenListArticleTopImg;
      const xxxVideo = `.ZVideoItem>div:first-of-type{${fnReturnStr(`width: ${zoomListVideoSize}px!important;`, zoomListVideoType === "2" /* 自定义尺寸 */)}}`;
      const xxxListMore = fnReturnStr(
        `.Topstory-container .ContentItem-actions .ShareMenu ~ div.ContentItem-action{visibility: visible!important;position: absolute;top: 20px;right: 10px;}`,
        fixedListItemMore
      );
      const xxxTitleTag = fnReturnStr(
        `.AnswerItem .ContentItem-title::before{content:'「问答」';color:#ec7259;font-size:14px;}.TopstoryQuestionAskItem .ContentItem-title::before{content:'「提问」';font-size:14px;color:#533b77}`,
        listTitleTagQuestion
      ) + fnReturnStr(`.ArticleItem .ContentItem-title::before{content:'「文章」';font-size:14px;color:#00965e}`, listTitleTagArticle) + fnReturnStr(
        `.ZvideoItem .ContentItem-title::before{content:'「视频」';font-size:14px;color:#12c2e9}.ZVideoItem .ContentItem-title::before{content:'「视频」';font-size:14px;color:#12c2e9}`,
        listTitleTagVideo
      ) + fnReturnStr(
        `.TopstoryItem .PinItem::before{content:'「想法」';font-size:14px;color:#9c27b0;margin-right:6px;font-weight:normal;display:inline;}.PinItem>.ContentItem-title{margin-top:4px;}`,
        listTitleTagPin
      );
      const xxxSusHomeTab = fnReturnStr(
        `.Topstory-container .TopstoryTabs{${suspensionHomeTabPo}position:fixed;z-index:100;display:flex;flex-direction:column;height:initial!important;}.Topstory-container .TopstoryTabs>a{font-size:0 !important;border-radius:50%}.Topstory-container .TopstoryTabs>a::after{font-size:16px !important;display:inline-block;padding:6px 8px;margin-bottom:4px;border:1px solid #999999;color:#999999;background: ${dark ? THEME_CONFIG_DARK[themeDark].background : THEME_CONFIG_LIGHT[themeLight].background || "transparent"};}.Topstory-container .TopstoryTabs>a.TopstoryTabs-link {margin:0!important}.Topstory-container .TopstoryTabs>a.TopstoryTabs-link.is-active::after{color:#0066ff!important;border-color:#0066ff!important;}.Topstory [aria-controls='Topstory-recommend']::after{content:'推';}.Topstory [aria-controls='Topstory-follow']::after{content:'关';border-top-left-radius:4px;border-top-right-radius:4px;}.Topstory [aria-controls='Topstory-hot']::after{content:'热';}.Topstory [aria-controls="Topstory-zvideo"]::after{content:'视';border-bottom-left-radius:4px;border-bottom-right-radius:4px}.Topstory-tabs{border-color: transparent!important;}`,
        suspensionHomeTab
      );
      const xxxSusHeader = `.position-suspensionFind{${suspensionFindPo}}.position-suspensionUser{${suspensionUserPo}}.position-suspensionSearch{${suspensionSearchPo}}.position-suspensionFind .Tabs-link{border:1px solid #999999;color:#999999;background: ${dark ? THEME_CONFIG_DARK[themeDark].background : THEME_CONFIG_LIGHT[themeLight].background || "transparent"};}.position-suspensionFind .Tabs-link.is-active{color:#0066ff!important;border-color:#0066ff!important;}.position-suspensionUser .css-1m60na {display: none;}.position-suspensionUser .css-1n0eufo{margin-right: 0;}`;
      const xxxHighlight = highlightListItem ? `.List-item:focus,.TopstoryItem:focus,.HotItem:focus{box-shadow:0 0 0 2px #fff,0 0 0 5px rgba(0, 102, 255, 0.3)!important;outline:none!important;transition:box-shadow 0.3s!important;}` : `.List-item:focus,.Card:focus::before{box-shadow: none!important;}`;
      const cssShoppingLinkObj = {
        ["0" /* 默认 */]: "",
        ["1" /* 仅文字 */]: '.MCNLinkCard-imageContainer,.MCNLinkCard-button,.MCNLinkCard-source,.ecommerce-ad-commodity-img,.ecommerce-ad-commodity-box-icon,.RichText-MCNLinkCardContainer .BottomInfo,.CPSCommonCard-imageBox,.RedPacketCard-imageBox,.CPSCommonCard-tool,.CPSCommonCard-subtitle,.RedPacketCard-subtitle,.RedPacketCard-tool{display: none!important;}.MCNLinkCard,.MCNLinkCard-card,.ecommerce-ad-commodity,.RichText-MCNLinkCardContainer .GoodsRecommendCard,.CPSCommonCard,.RedPacketCard-info,.RedPacketCard{min-height: 0!important;background: transparent!important;width:100%!important;max-width:100%!important;}.MCNLinkCard-cardContainer,.ecommerce-ad-commodity,.ecommerce-ad-commodity-main,.RedPacketCard,.CPSCommonCard{padding: 0!important;}.MCNLinkCard,.MCNLinkCard-info{margin: 0!important;}.MCNLinkCard-info,.ecommerce-ad-commodity-main{flex-direction: row!important;}.MCNLinkCard-price{padding-left: 12px;}.ecommerce-ad-commodity-box .ecommerce-ad-commodity{height: auto!important;}.ecommerce-ad-commodity-box-main-second{width: auto!important;}.MCNLinkCard-titleContainer,.ecommerce-ad-commodity-main-content-des span,.CPSCommonCard-title,.RedPacketCard-title{color: #fd8d55!important;justify-content: start!important;}.MCNLinkCard-titleContainer::before,.ecommerce-ad-commodity-main-content-des span::before,.CPSCommonCard-title::before,.RedPacketCard-title::before{content: "购物链接："}.MCNLinkCard-title{color: #fd8d55!important;}',
        ["2" /* 隐藏 */]: "a.MCNLinkCard,.RichText-ADLinkCardContainer,.ecommerce-ad-commodity-box,.ecommerce-ad-box,.RichText-MCNLinkCardContainer{display: none!important;}"
      };
      const xxxShoppingLink = cssShoppingLinkObj[linkShopping || "0" /* 默认 */];
      const xxxFontSize = fnReturnStr(
        `.Topstory-body .RichContent-inner,.Topstory-body .jimi-list-item-time,.Topstory-body .CommentContent,.SearchResult-Card .RichContent-inner,.SearchResult-Card .CommentContent,.HotItem-excerpt--multiLine{font-size: ${fontSizeForList}px!important;}`,
        !!fontSizeForList
      ) + fnReturnStr(`.QuestionPage .RichContent-inner,.QuestionPage .jimi-list-item-time,.QuestionPage .CommentContent{font-size: ${fontSizeForAnswer}px}`, !!fontSizeForAnswer) + fnReturnStr(`.zhuanlan .Post-RichTextContainer,.zhuanlan .jimi-article-create-time,.zhuanlan .CommentContent{font-size: ${fontSizeForArticle}px}`, !!fontSizeForArticle) + fnReturnStr(`.zhuanlan .Post-Main .Post-Title{font-size: ${fontSizeForArticleTitle}px;}`, !!fontSizeForArticleTitle) + fnReturnStr(`.ContentItem-title,.HotItem-title{font-size: ${fontSizeForListTitle}px!important;}`, !!fontSizeForListTitle) + fnReturnStr(`.QuestionHeader-title{font-size: ${fontSizeForAnswerTitle}px!important;}`, !!fontSizeForAnswerTitle) + fnReturnStr(`p {line-height: ${contentLineHeight}px;}`, !!contentLineHeight);
      return xxxFontSize + xxxHighlight + xxxImage + xxxListMore + xxxShoppingLink + xxxShoppingLink + xxxSusHeader + xxxSusHomeTab + xxxTitleTag + xxxVideo + xxxWidth;
    }
  };
  var changeSizeBeforeResize = async () => {
    const { suspensionPickupRight, suspensionPickUp } = await myStorage.getConfig();
    const prevContentBox = domById("TopstoryContent") || dom(".Question-mainColumn") || domById("SearchMain") || dom(".Profile-mainColumn") || dom(".CollectionsDetailPage-mainColumn") || document.body;
    const nodeContentBox = prevContentBox.offsetWidth > document.body.offsetWidth ? document.body : prevContentBox;
    let suspensionRight = +(suspensionPickupRight || 0);
    if (nodeContentBox) {
      suspensionRight = window.innerWidth - nodeContentBox.getBoundingClientRect().width - nodeContentBox.getBoundingClientRect().left + +(suspensionPickupRight || 0);
    }
    fnAppendStyle(
      "JIMI_STYLE_CHANGE_AFTER_RESIZE",
      fnReturnStr(`.ContentItem-actions.Sticky.is-fixed button[data-zop-retract-question="true"]{right: ${suspensionRight}px;}`, suspensionPickUp)
    );
  };
  var echoData = async () => {
    const config = await myStorage.getConfig(true);
    const textSameName = {
      globalTitle: (e) => e.value = config.globalTitle || document.title,
      customizeCss: (e) => e.value = config.customizeCss || ""
    };
    const echoText = (even) => textSameName[even.name] ? textSameName[even.name](even) : even.value = config[even.name] || "";
    const echo = {
      radio: (even) => config.hasOwnProperty(even.name) && String(even.value) === String(config[even.name]) && (even.checked = true),
      checkbox: (even) => even.checked = config[even.name] || false,
      text: echoText,
      number: echoText,
      range: (even) => {
        const nValue = config[even.name];
        const nodeRange = dom(`[name="${even.name}"]`);
        const min = nodeRange && nodeRange.min;
        const rangeNum = isNaN(+nValue) || !(+nValue > 0) ? min : nValue;
        even.value = rangeNum;
        const nodeNewOne = domById(even.name);
        nodeNewOne && (nodeNewOne.innerText = rangeNum);
      }
    };
    const doEcho = (item) => {
      echo[item.type] && echo[item.type](item);
    };
    const nodeArrInputClick = domA(`.${CLASS_INPUT_CLICK}`);
    for (let i = 0, len = nodeArrInputClick.length; i < len; i++) {
      doEcho(nodeArrInputClick[i]);
    }
    const nodeArrInputChange = domA(`.${CLASS_INPUT_CHANGE}`);
    for (let i = 0, len = nodeArrInputChange.length; i < len; i++) {
      doEcho(nodeArrInputChange[i]);
    }
    echo.text(dom('[name="globalTitle"]'));
    VERSION_RANGE_HAVE_PERCENT.forEach((item) => {
      const isPercent = config[`${item.value}IsPercent`];
      const domRange = dom(`.jimi-range-${item.value}`);
      const domRangePercent = dom(`.jimi-range-${item.value}Percent`);
      if (domRange && domRangePercent) {
        domRange.style.display = isPercent ? "none" : "flex";
        domRangePercent.style.display = !isPercent ? "none" : "flex";
      }
    });
    echoMySelect();
    changeReplaceBlockUserSwitchDisabled(config.replaceBlockUserContentWithStar);
    echoBlockedContent(document.body);
  };
  var echoHistory = async () => {
    const history = await myStorage.getHistory();
    const { list, view } = history;
    const nodeList = dom("#JIMI_HISTORY_LIST .jimi-set-content");
    const nodeView = dom("#JIMI_HISTORY_VIEW .jimi-set-content");
    nodeList && (nodeList.innerHTML = list.join(""));
    nodeView && (nodeView.innerHTML = view.join(""));
  };
  var openExtra = (type, needCover = true) => {
    const extra = domById(ID_EXTRA_DIALOG);
    const extraCover = domById("JIMI_EXTRA_OUTPUT_COVER");
    const elementsTypes = extra.children;
    for (let i = 0, len = elementsTypes.length; i < len; i++) {
      const item = elementsTypes[i];
      item.style.display = item.dataset.type === type ? "block" : "none";
    }
    extra.style.display = "block";
    needCover && (extraCover.style.display = "block");
    extra.dataset.status = "open";
  };
  var closeExtra = () => {
    const extra = domById(ID_EXTRA_DIALOG);
    extra.dataset.status = "close";
    extra.style.display = "none";
    domById("JIMI_EXTRA_OUTPUT_COVER").style.display = "none";
  };
  var ID_BLOCKED_USERS_TAGS = "JIMI_BLOCKED_USERS_TAGS";
  var CLASS_REMOVE_BLOCKED_TAG = "jimi-remove-blocked-tag";
  var CLASS_BLACK_ITEM_MORE = "jimi-black-item-more";
  var CLASS_BLACK_ITEM_ACTION = "jimi-black-item-action";
  var ID_BLOCKED_USER_MENU = "JIMI_BLOCKED_USER_MENU";
  var CLASS_EDIT_TAG = "jimi-edit-blocked-tag";
  var ID_BLOCK_LIST = "JIMI_BLOCKED_USERS";
  var ID_LOCAL_BLOCK_LIST = "JIMI_LOCAL_BLOCKED_USERS";
  var CLASS_BLACK_TAG = "jimi-black-tag";
  var REPLACE_DISABLED_SWITCH_NAMES = ["removeBlockUserContent", "removeBlockUserComment"];
  var BLOCKED_USER_LIST_ID = {
    zhihu: ID_BLOCK_LIST,
    local: ID_LOCAL_BLOCK_LIST
  };
  var changeReplaceBlockUserSwitchDisabled = (disabled) => {
    REPLACE_DISABLED_SWITCH_NAMES.forEach((name) => {
      const input = dom(`[name="${name}"]`);
      input && (input.disabled = !!disabled);
    });
  };
  var escapeHTML = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  var encodeBlockedUserInfo = (info) => encodeURIComponent(JSON.stringify(info));
  var getBlockedUserInfoFromItem = (item) => {
    try {
      return item.dataset.info ? JSON.parse(decodeURIComponent(item.dataset.info)) : { id: "", name: "", urlToken: "" };
    } catch {
      return { id: "", name: "", urlToken: "" };
    }
  };
  var getBlockedUserListTypeFromItem = (item) => item.dataset.listType === BLOCKED_USER_LIST_TYPE.local ? BLOCKED_USER_LIST_TYPE.local : BLOCKED_USER_LIST_TYPE.zhihu;
  var blackItemContent = ({ id, name, urlToken, tags = [] }, listType = BLOCKED_USER_LIST_TYPE.zhihu) => {
    return `<a href="https://www.zhihu.com/people/${escapeHTML(urlToken || id)}" target="_blank">${escapeHTML(name)}</a>` + tags.map((tag) => `<span class="jimi-in-blocked-user-tag">${escapeHTML(tag)}</span>`).join("") + `<i class="${CLASS_BLACK_ITEM_MORE}">···</i>`;
  };
  var tagContext = (i) => escapeHTML(i) + `<span class="${CLASS_EDIT_TAG}">✎</span><i class="${CLASS_REMOVE_BLOCKED_TAG}" style="margin-left:4px;cursor:pointer;font-style: normal;font-size:12px;">✕</i>`;
  var tagInputCallback = async (e) => {
    const { blockedUsersTags = [] } = await myStorage.getConfig();
    const target = e.target;
    const value = target.value.toLowerCase();
    if (blockedUsersTags.includes(value)) {
      message("该标签已经存在");
      return;
    }
    blockedUsersTags.push(value);
    await myStorage.updateConfigItem("blockedUsersTags", blockedUsersTags);
    const domItem = domC("span", {
      innerHTML: tagContext(value),
      className: "jimi-blocked-users-tag"
    });
    domItem.dataset.info = value;
    domById(ID_BLOCKED_USERS_TAGS).appendChild(domItem);
    target.value = "";
  };
  var initHTMLBlockedUserTags = async (domMain) => {
    const prevConfig = await myStorage.getConfig();
    const nodeBlockedUsersTags = dom(`#${ID_BLOCKED_USERS_TAGS}`, domMain);
    nodeBlockedUsersTags.innerHTML = (prevConfig.blockedUsersTags || []).map((i) => `<span class="jimi-blocked-users-tag" data-info="${escapeHTML(i)}">${tagContext(i)}</span>`).join("");
    nodeBlockedUsersTags.onclick = async (event) => {
      const nConfig = await myStorage.getConfig();
      const { blockedUsers = [], localBlockedUsers = [], blockedUsersTags = [] } = nConfig;
      const target = event.target;
      if (target.classList.contains(CLASS_REMOVE_BLOCKED_TAG)) {
        const item = target.parentElement;
        const info = item.dataset.info || "";
        const isUsed = [...blockedUsers, ...localBlockedUsers].some((item2) => {
          if (item2.tags && item2.tags.length) {
            return item2.tags.some((i) => i === info);
          }
          return false;
        });
        if (isUsed) {
          message("此标签有黑名单用户正在使用");
          return;
        }
        item.remove();
        const index2 = blockedUsersTags.findIndex((i) => i === info);
        blockedUsersTags.splice(index2, 1);
        myStorage.updateConfigItem("blockedUsersTags", blockedUsersTags);
      }
      if (target.classList.contains(CLASS_EDIT_TAG)) {
        const { blockedUsers: blockedUsers2 = [], localBlockedUsers: localBlockedUsers2 = [], blockedUsersTags: blockedUsersTags2 = [] } = await myStorage.getConfig();
        const item = target.parentElement;
        const prevName = item.dataset.info || "";
        openExtra("changeBlockedUserTagName");
        dom('[data-type="changeBlockedUserTagName"] .jimi-title').innerHTML = `修改标签名（原名称： ${prevName}）`;
        dom('[name="blocked-user-tag-name"]').value = prevName;
        dom('[name="confirm-change-blocked-user-tag-name"]').onclick = async function() {
          const nInfo = dom('[name="blocked-user-tag-name"]').value;
          const indexTag = blockedUsersTags2.findIndex((i) => i === prevName);
          blockedUsersTags2.splice(indexTag, 1, nInfo);
          [...blockedUsers2, ...localBlockedUsers2].forEach((item2) => {
            if (!item2.tags) return;
            const nIndex = (item2.tags || []).findIndex((i) => i === prevName);
            if (nIndex >= 0) {
              item2.tags.splice(nIndex, 1, nInfo);
            }
          });
          await myStorage.updateConfig({
            ...nConfig,
            blockedUsersTags: blockedUsersTags2,
            blockedUsers: blockedUsers2,
            localBlockedUsers: localBlockedUsers2
          });
          initHTMLBlockedUserTags(domMain);
          initHTMLBlockedUsers(domMain);
          closeExtra();
        };
        dom('[name="cancel-change-blocked-user-tag-name"]').onclick = function() {
          closeExtra();
        };
      }
    };
    dom('input[name="inputBlockedUsersTag"]', domMain).onchange = tagInputCallback;
    dom('input[name="inputCreateNewTag"]').onchange = async (e) => {
      const target = e.target;
      const value = target.value.toLowerCase();
      await tagInputCallback(e);
      const boxTags = dom(".jimi-choose-blocked-user-tags");
      const nTag = domC("span", {
        innerHTML: escapeHTML(value)
      });
      nTag.dataset.choose = "false";
      nTag.dataset.type = "blockedUserTag";
      nTag.dataset.name = value;
      boxTags.appendChild(nTag);
    };
  };
  var initHTMLBlockedUsers = async (domMain) => {
    if (!dom("#JIMI_BLOCKED_NUMBER", domMain)) return;
    removeBlockedUserMenu();
    const { blockedUsers = [], localBlockedUsers = [] } = await myStorage.getConfig();
    dom("#JIMI_BLOCKED_NUMBER", domMain).innerText = blockedUsers.length ? `知乎黑名单数量：${blockedUsers.length}` : "";
    dom("#JIMI_LOCAL_BLOCKED_NUMBER", domMain).innerText = localBlockedUsers.length ? `本地黑名单数量：${localBlockedUsers.length}` : "";
    renderBlockedUserList(domMain, blockedUsers, BLOCKED_USER_LIST_TYPE.zhihu);
    renderBlockedUserList(domMain, localBlockedUsers, BLOCKED_USER_LIST_TYPE.local);
  };
  var renderBlockedUserList = (domMain, list, listType) => {
    const nodeBlockedUsers = dom(`#${BLOCKED_USER_LIST_ID[listType]}`, domMain);
    nodeBlockedUsers.innerHTML = list.map((info) => createBlockedUserItemHTML(info, listType)).join("");
    nodeBlockedUsers.onclick = (event) => onBlockedUserListClick(event, listType);
  };
  var createBlockedUserItemHTML = (info, listType) => `<div class="jimi-black-item jimi-black-id-${escapeHTML(info.id)}" data-list-type="${listType}" data-info="${encodeBlockedUserInfo(info)}">${blackItemContent(
    info,
    listType
  )}</div>`;
  var onBlockedUserListClick = async (event, defaultListType) => {
    const target = event.target;
    const item = target.closest(".jimi-black-item");
    if (!item) return;
    if (target.classList.contains(CLASS_BLACK_ITEM_MORE)) {
      const listType = item.dataset.listType ? getBlockedUserListTypeFromItem(item) : defaultListType;
      openBlockedUserMenu(target, item, listType);
      return;
    }
  };
  var onBlockedUserAction = async (action, item, listType) => {
    const info = getBlockedUserInfoFromItem(item);
    if (!info.id) return;
    if (action === "tags") {
      chooseBlockedUserTags(item);
      return;
    }
    if (action === "move") {
      if (listType === BLOCKED_USER_LIST_TYPE.zhihu) {
        await moveBlockedUserToLocal(info);
      } else {
        const movedType = await addBlockUser(info, { openTagChoose: false });
        movedType === BLOCKED_USER_LIST_TYPE.zhihu && message("已移动至知乎黑名单");
      }
      return;
    }
    if (action === "remove") {
      if (listType === BLOCKED_USER_LIST_TYPE.zhihu) {
        removeBlockUser(info);
      } else {
        await removeLocalBlockedUser(info);
      }
    }
  };
  var removeBlockedUserMenu = () => {
    domById(ID_BLOCKED_USER_MENU)?.remove();
  };
  var openBlockedUserMenu = (button, item, listType) => {
    removeBlockedUserMenu();
    const moveText = listType === BLOCKED_USER_LIST_TYPE.zhihu ? "移动至本地黑名单" : "移动至知乎黑名单";
    const nodeMenu = domC("div", {
      id: ID_BLOCKED_USER_MENU,
      className: "jimi-black-item-menu",
      innerHTML: `<span class="${CLASS_BLACK_ITEM_ACTION}" data-action="tags">设置标签</span><span class="${CLASS_BLACK_ITEM_ACTION}" data-action="move">${moveText}</span><span class="${CLASS_BLACK_ITEM_ACTION}" data-action="remove">从黑名单移除</span>`
    });
    nodeMenu.onclick = async (event) => {
      const actionNode = event.target.closest(`.${CLASS_BLACK_ITEM_ACTION}`);
      if (!actionNode || !actionNode.dataset.action) return;
      removeBlockedUserMenu();
      await onBlockedUserAction(actionNode.dataset.action, item, listType);
    };
    document.body.appendChild(nodeMenu);
    const rect = button.getBoundingClientRect();
    const menuRect = nodeMenu.getBoundingClientRect();
    let left = Math.min(Math.max(rect.left, 8), window.innerWidth - menuRect.width - 8);
    let top = rect.bottom + 6;
    if (top + menuRect.height > window.innerHeight - 8) {
      top = rect.top - menuRect.height - 6;
    }
    nodeMenu.style.left = `${left}px`;
    nodeMenu.style.top = `${Math.max(top, 8)}px`;
    setTimeout(() => {
      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (!target.closest(`#${ID_BLOCKED_USER_MENU}`) && !target.classList.contains(CLASS_BLACK_ITEM_MORE)) {
            removeBlockedUserMenu();
          }
        },
        { once: true }
      );
    });
  };
  var removeLocalBlockedUser = async (info) => {
    const config = await myStorage.getConfig();
    await myStorage.updateConfig({
      ...config,
      localBlockedUsers: (config.localBlockedUsers || []).filter((item) => item.id !== info.id)
    });
    initHTMLBlockedUsers(document.body);
  };
  var moveBlockedUserToLocal = async (info) => {
    await removeBlockUser(info, false);
    const config = await myStorage.getConfig();
    const localBlockedUsers = config.localBlockedUsers || [];
    const localUser = localBlockedUsers.find((item) => item.id === info.id);
    await myStorage.updateConfig({
      ...config,
      localBlockedUsers: [mergeBlockedUser(localUser, info), ...localBlockedUsers.filter((item) => item.id !== info.id)]
    });
    initHTMLBlockedUsers(document.body);
    message("已移动至本地黑名单");
  };
  var chooseBlockedUserTags = async (item, needCover = true) => {
    const info = getBlockedUserInfoFromItem(item);
    const listType = getBlockedUserListTypeFromItem(item);
    openExtra("chooseBlockedUserTags", needCover);
    const config = await myStorage.getConfig();
    const { blockedUsersTags = [] } = config;
    const blockedUsers = getBlockedUsersByType(config, listType);
    const currentTags = info.tags || [];
    dom('[data-type="chooseBlockedUserTags"] .jimi-title').innerText = `选择用户标签：${info.name}`;
    const boxTags = dom(".jimi-choose-blocked-user-tags");
    boxTags.innerHTML = blockedUsersTags.map((i) => `<span data-type="blockedUserTag" data-name="${escapeHTML(i)}" data-choose="${currentTags.includes(i)}">${escapeHTML(i)}</span>`).join("");
    boxTags.onclick = (event) => {
      const target = event.target;
      if (target.dataset.type === "blockedUserTag") {
        target.dataset.choose = target.dataset.choose === "true" ? "false" : "true";
      }
    };
    dom('[name="choose-blocked-user-tags-finish"]').onclick = async () => {
      const chooseTags = [...dom(".jimi-choose-blocked-user-tags").children].filter((i) => i.dataset.choose === "true").map((i) => i.dataset.name);
      info.tags = chooseTags;
      blockedUsers.forEach((i) => {
        if (i.id === info.id) {
          i.tags = chooseTags;
          info.name = i.name;
        }
      });
      item.innerHTML = blackItemContent(info, listType);
      item.dataset.info = encodeBlockedUserInfo(info);
      await myStorage.updateConfigItem(BLOCKED_USER_LIST_CONFIG_KEY[listType], blockedUsers);
      closeExtra();
    };
  };
  var echoBlockedContent = (domMain) => {
    initHTMLBlockedUserTags(domMain);
    initHTMLBlockedUsers(domMain);
  };
  var CLASS_BLOCK_USER_BOX = "jimi-block-user-box";
  var CLASS_BTN_ADD_BLOCKED = "jimi-block-add-blocked";
  var CLASS_BTN_REMOVE_BLOCKED = "jimi-block-remove-blocked";
  var createBlockedUserTagHTML = (showBlockTagType, userInfo) => `<span class="${CLASS_BLACK_TAG}">黑名单${showBlockTagType && userInfo && userInfo.tags && userInfo.tags.length ? "：" + userInfo.tags.join("、") : ""}</span>`;
  var answerAddBlockButton = async (contentItem) => {
    const nodeUser = contentItem.querySelector(".AnswerItem-authorInfo>.AuthorInfo");
    if (!nodeUser || !nodeUser.offsetHeight) return;
    if (nodeUser.querySelector(`.${CLASS_BLOCK_USER_BOX}`)) return;
    const userUrl = nodeUser.querySelector('meta[itemprop="url"]').content;
    const userName = nodeUser.querySelector('meta[itemprop="name"]').content;
    const mo = contentItem.getAttribute("data-za-extra-module") || "{}";
    if (!JSON.parse(mo).card) return;
    const aContent = JSON.parse(mo).card.content;
    const userId = aContent.author_member_hash_id || "";
    if (!userUrl.replace(/https:\/\/www.zhihu.com\/people\//, "")) return;
    const config = await myStorage.getConfig();
    const { showBlockUserTag, showBlockUser, showBlockUserTagType } = config;
    const blockedUserInfo = findBlockedUserWithType(config, userId);
    let currentBlockedSource = blockedUserInfo?.listType;
    let currentBlockedUser = blockedUserInfo?.user;
    const nBlackBox = domC("div", {
      className: CLASS_BLOCK_USER_BOX,
      innerHTML: changeBlockedUsersBox(!!blockedUserInfo, showBlockUser, showBlockUserTag, showBlockUserTagType, currentBlockedUser)
    });
    nBlackBox.onclick = async function(ev) {
      const target = ev.target;
      const matched = userUrl.match(/(?<=people\/)[\w\W]+/);
      const urlToken = matched ? matched[0] : "";
      const nextUserInfo = { id: userId, name: userName, urlToken };
      const me = this;
      if (target.classList.contains(CLASS_BTN_ADD_BLOCKED)) {
        const listType = await addBlockUser(nextUserInfo);
        if (!listType) return;
        currentBlockedSource = listType;
        currentBlockedUser = nextUserInfo;
        me.innerHTML = changeBlockedUsersBox(true, showBlockUser, showBlockUserTag, showBlockUserTagType, currentBlockedUser);
        return;
      }
      if (target.classList.contains(CLASS_BTN_REMOVE_BLOCKED)) {
        if (currentBlockedSource === BLOCKED_USER_LIST_TYPE.local) {
          await removeItemAfterBlock(nextUserInfo, BLOCKED_USER_LIST_TYPE.local);
        } else {
          await removeBlockUser(nextUserInfo);
        }
        currentBlockedSource = void 0;
        currentBlockedUser = void 0;
        me.innerHTML = changeBlockedUsersBox(false, showBlockUser, showBlockUserTag, showBlockUserTagType);
        return;
      }
    };
    nodeUser.appendChild(nBlackBox);
  };
  var changeBlockedUsersBox = (isBlocked, showBlock, showBlockTag, showBlockTagType, userInfo) => {
    if (isBlocked) {
      return fnReturnStr(createBlockedUserTagHTML(showBlockTagType, userInfo), showBlockTag) + fnReturnStr(`<button class="${CLASS_BTN_REMOVE_BLOCKED} jimi-button">解除屏蔽</button>`, showBlock);
    } else {
      return fnReturnStr(`<button class="${CLASS_BTN_ADD_BLOCKED} jimi-button">屏蔽用户</button>`, showBlock);
    }
  };
  var CLASS_CAN_COPY = "jimi-can-copy";
  var canCopy = () => {
    domA(`.RichContent-inner:not(.${CLASS_CAN_COPY})`).forEach((item) => {
      item.classList.add(CLASS_CAN_COPY);
      item.oncopy = (event) => {
        eventCopy(event);
        message("已复制内容，若有禁止转载提示可无视");
        return true;
      };
    });
  };
  var eventCopy = (event) => {
    let clipboardData = event.clipboardData;
    if (!clipboardData) return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    const html = container.innerHTML;
    let text = selection ? selection.toString() : "";
    if (text) {
      event.preventDefault();
      clipboardData.setData("text/html", html);
      clipboardData.setData("text/plain", text);
    }
  };
  var copy = async (value) => {
    if (navigator.clipboard && navigator.permissions) {
      await navigator.clipboard.writeText(value);
    } else {
      const domTextarea = domC("textArea", {
        value,
        style: "width: 0px;position: fixed;left: -999px;top: 10px;"
      });
      domTextarea.setAttribute("readonly", "readonly");
      document.body.appendChild(domTextarea);
      domTextarea.select();
      document.execCommand("copy");
      document.body.removeChild(domTextarea);
    }
  };
  var initLinkChanger = () => {
    const esName = ["a.external", "a.LinkCard"];
    for (let i = 0, len = esName.length; i < len; i++) {
      const name = esName[i];
      const links = domA(`${name}:not(.jimi-link-changed)`);
      for (let index2 = 0, linkLen = links.length; index2 < linkLen; index2++) {
        const item = links[index2];
        const hrefFormat = item.href.replace(/^(https|http):\/\/link\.zhihu\.com\/\?target\=/, "") || "";
        let href = "";
        try {
          href = decodeURIComponent(hrefFormat);
        } catch {
          href = hrefFormat;
        }
        item.href = href;
        item.classList.add("jimi-link-changed");
      }
    }
  };
  var addAnswerCopyLink = async (contentItem) => {
    const { copyAnswerLink } = await myStorage.getConfig();
    if (!copyAnswerLink) return;
    const prevButton = contentItem.querySelector(`.jimi-copy-answer-link`);
    prevButton && prevButton.remove();
    const nodeUser = contentItem.querySelector(".AnswerItem-authorInfo>.AuthorInfo");
    if (!nodeUser) return;
    const nDomButton = createButtonFontSize12("获取回答链接", "jimi-copy-answer-link");
    nDomButton.onclick = function() {
      const metaUrl = contentItem.querySelector(':scope>[itemprop="url"]');
      if (!metaUrl) return;
      const link = metaUrl.getAttribute("content") || "";
      if (link) {
        copy(link);
        message("链接复制成功");
        return;
      }
    };
    nodeUser.appendChild(nDomButton);
  };
  var ID_LIST = "JIMI_NOT_INTERESTED_LIST";
  var CLASS_REMOVE = "jimi-remove-not-interested-item";
  var createHTMLNotInterestedList = async () => {
    let { notInterestedList = [] } = await myStorage.getConfig();
    const boxList = domById(ID_LIST);
    if (!boxList) return;
    boxList.innerHTML = notInterestedList.map((i) => `<div class="jimi-form-box-item"><span>${i}</span><span class="${CLASS_REMOVE}">✕</span></div>`).join("");
    boxList.onclick = async (event) => {
      const target = event.target;
      if (target.classList.contains(CLASS_REMOVE)) {
        const content = target.previousElementSibling.textContent;
        notInterestedList = notInterestedList.filter((i) => i !== content);
        await myStorage.updateConfigItem("notInterestedList", notInterestedList);
        target.parentElement.remove();
      }
    };
  };
  var addNotInterestedItem = async (name) => {
    const { notInterestedList = [] } = await myStorage.getConfig();
    if (!notInterestedList.includes(name)) {
      await myStorage.updateConfigItem("notInterestedList", [name, ...notInterestedList]);
    }
  };
  var INNER_HTML = `<div style="display: none" class="jimi-preview" id="JIMI_PREVIEW_IMAGE"><div><img src=""></div></div><div style="display: none" class="jimi-preview" id="JIMI_PREVIEW_VIDEO"><div><video src="" autoplay loop></video></div></div><iframe class="jimi-pdf-box-content" style="display: none"></iframe><div id="JIMI_MESSAGE_BOX"></div><div id="JIMI_EXTRA_OUTPUT_COVER" style="display: none"></div><div id="JIMI_EXTRA_OUTPUT_DIALOG" style="display: none" data-status="close"><div data-type="chooseBlockedUserTags"><div class="jimi-title">选择标签</div><div class="jimi-choose-blocked-user-tags"></div><div style="padding: 0 14px 6px"><input name="inputCreateNewTag" type="text" placeholder="添加新的标签，输入后回车添加（不区分大小写）" style="width: 300px"></div><div class="jimi-extra-footer"><button class="jimi-button" name="choose-blocked-user-tags-finish">完成</button></div></div><div data-type="changeBlockedUserTagName"><div class="jimi-title">修改标签名</div><div class="jimi-change-blocked-user-tag-name"><input type="text" name="blocked-user-tag-name"></div><div class="jimi-extra-footer"><button class="jimi-button" name="confirm-change-blocked-user-tag-name">修改</button> <button class="jimi-button" name="cancel-change-blocked-user-tag-name">取消</button></div></div></div>`;
  var INNER_CSS = `.marginTB8{margin:8px 0}.PositionCenter{position:fixed;left:50%;top:50%;transform:translate(-50%, -50%)}.CommonTransition{transition-property:transform;transition-duration:500ms;transition-timing-function:cubic-bezier(.2, 0, 0, 1)}[theme-light='1'] #JIMI_DIALOG_MENU>div.target,[theme-light='1'] .jimi-switch:checked{background:#ff3b30}[theme-light='1'] #JIMI_DEFAULT_SELF a,[theme-light='1'] .jimi-zhihu-key a,[theme-light='1'] #JIMI_HISTORY_LIST a:hover,[theme-light='1'] #JIMI_HISTORY_VIEW a:hover,[theme-light='1'] .jimi-black-item a:hover,[theme-light='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='1'] .jimi-black-item-action:hover,[theme-light='1'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#ff3b30 !important}[theme-light='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(255,59,48,0.1)}[theme-light='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#ff3b30}[theme-light='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#ff3b30}[theme-light='1'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='1'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#ff3b30}[theme-light='1'] .jimi-in-blocked-user-tag,[theme-light='1'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#ff3b30;color:#ff3b30;background:rgba(255,59,48,0.1)}[theme-light='2'] #JIMI_DIALOG_MENU>div.target,[theme-light='2'] .jimi-switch:checked{background:#a05a00}[theme-light='2'] #JIMI_DEFAULT_SELF a,[theme-light='2'] .jimi-zhihu-key a,[theme-light='2'] #JIMI_HISTORY_LIST a:hover,[theme-light='2'] #JIMI_HISTORY_VIEW a:hover,[theme-light='2'] .jimi-black-item a:hover,[theme-light='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='2'] .jimi-black-item-action:hover,[theme-light='2'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#a05a00 !important}[theme-light='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(160,90,0,0.1)}[theme-light='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#a05a00}[theme-light='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#a05a00}[theme-light='2'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='2'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#a05a00}[theme-light='2'] .jimi-in-blocked-user-tag,[theme-light='2'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#a05a00;color:#a05a00;background:rgba(160,90,0,0.1)}[theme-light='3'] #JIMI_DIALOG_MENU>div.target,[theme-light='3'] .jimi-switch:checked{background:#007d1b}[theme-light='3'] #JIMI_DEFAULT_SELF a,[theme-light='3'] .jimi-zhihu-key a,[theme-light='3'] #JIMI_HISTORY_LIST a:hover,[theme-light='3'] #JIMI_HISTORY_VIEW a:hover,[theme-light='3'] .jimi-black-item a:hover,[theme-light='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='3'] .jimi-black-item-action:hover,[theme-light='3'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#007d1b !important}[theme-light='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(0,125,27,0.1)}[theme-light='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#007d1b}[theme-light='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#007d1b}[theme-light='3'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='3'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#007d1b}[theme-light='3'] .jimi-in-blocked-user-tag,[theme-light='3'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#007d1b;color:#007d1b;background:rgba(0,125,27,0.1)}[theme-light='4'] #JIMI_DIALOG_MENU>div.target,[theme-light='4'] .jimi-switch:checked{background:#8e8e93}[theme-light='4'] #JIMI_DEFAULT_SELF a,[theme-light='4'] .jimi-zhihu-key a,[theme-light='4'] #JIMI_HISTORY_LIST a:hover,[theme-light='4'] #JIMI_HISTORY_VIEW a:hover,[theme-light='4'] .jimi-black-item a:hover,[theme-light='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='4'] .jimi-black-item-action:hover,[theme-light='4'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#8e8e93 !important}[theme-light='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(142,142,147,0.1)}[theme-light='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#8e8e93}[theme-light='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#8e8e93}[theme-light='4'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='4'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#8e8e93}[theme-light='4'] .jimi-in-blocked-user-tag,[theme-light='4'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#8e8e93;color:#8e8e93;background:rgba(142,142,147,0.1)}[theme-light='5'] #JIMI_DIALOG_MENU>div.target,[theme-light='5'] .jimi-switch:checked{background:#af52de}[theme-light='5'] #JIMI_DEFAULT_SELF a,[theme-light='5'] .jimi-zhihu-key a,[theme-light='5'] #JIMI_HISTORY_LIST a:hover,[theme-light='5'] #JIMI_HISTORY_VIEW a:hover,[theme-light='5'] .jimi-black-item a:hover,[theme-light='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='5'] .jimi-black-item-action:hover,[theme-light='5'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#af52de !important}[theme-light='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(175,82,222,0.1)}[theme-light='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#af52de}[theme-light='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#af52de}[theme-light='5'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='5'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#af52de}[theme-light='5'] .jimi-in-blocked-user-tag,[theme-light='5'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#af52de;color:#af52de;background:rgba(175,82,222,0.1)}[theme-light='6'] #JIMI_DIALOG_MENU>div.target,[theme-light='6'] .jimi-switch:checked{background:#ff9500}[theme-light='6'] #JIMI_DEFAULT_SELF a,[theme-light='6'] .jimi-zhihu-key a,[theme-light='6'] #JIMI_HISTORY_LIST a:hover,[theme-light='6'] #JIMI_HISTORY_VIEW a:hover,[theme-light='6'] .jimi-black-item a:hover,[theme-light='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='6'] .jimi-black-item-action:hover,[theme-light='6'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#ff9500 !important}[theme-light='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(255,179,64,0.1)}[theme-light='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#ff9500}[theme-light='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#ff9500}[theme-light='6'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='6'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#ff9500}[theme-light='6'] .jimi-in-blocked-user-tag,[theme-light='6'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#ff9500;color:#ff9500;background:rgba(255,179,64,0.1)}[theme-light='7'] #JIMI_DIALOG_MENU>div.target,[theme-light='7'] .jimi-switch:checked{background:#ff9500}[theme-light='7'] #JIMI_DEFAULT_SELF a,[theme-light='7'] .jimi-zhihu-key a,[theme-light='7'] #JIMI_HISTORY_LIST a:hover,[theme-light='7'] #JIMI_HISTORY_VIEW a:hover,[theme-light='7'] .jimi-black-item a:hover,[theme-light='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-light='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-light='7'] .jimi-black-item-action:hover,[theme-light='7'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover{color:#ff9500 !important}[theme-light='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(255,179,64,0.1)}[theme-light='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#ff9500}[theme-light='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#ff9500}[theme-light='7'] #JIMI_TITLE_ICO label input:checked+img,[theme-light='7'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div{border-color:#ff9500}[theme-light='7'] .jimi-in-blocked-user-tag,[theme-light='7'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#ff9500;color:#ff9500;background:rgba(255,179,64,0.1)}[theme-dark='0'] #JIMI_DIALOG,[theme-dark='1'] #JIMI_DIALOG,[theme-dark='2'] #JIMI_DIALOG,[theme-dark='3'] #JIMI_DIALOG,[theme-dark='4'] #JIMI_DIALOG,[theme-dark='7'] #JIMI_DIALOG{color:#dfdfdf;box-shadow:2px 2px 4px #4a4848,-2px -2px 4px #4a4848}[theme-dark='0'] #JIMI_DIALOG,[theme-dark='1'] #JIMI_DIALOG,[theme-dark='2'] #JIMI_DIALOG,[theme-dark='3'] #JIMI_DIALOG,[theme-dark='4'] #JIMI_DIALOG,[theme-dark='7'] #JIMI_DIALOG,[theme-dark='0'] #JIMI_DIALOG_LEFT,[theme-dark='1'] #JIMI_DIALOG_LEFT,[theme-dark='2'] #JIMI_DIALOG_LEFT,[theme-dark='3'] #JIMI_DIALOG_LEFT,[theme-dark='4'] #JIMI_DIALOG_LEFT,[theme-dark='7'] #JIMI_DIALOG_LEFT,[theme-dark='0'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='1'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='2'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='3'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='4'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='7'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='0'] .jimi-black-item,[theme-dark='1'] .jimi-black-item,[theme-dark='2'] .jimi-black-item,[theme-dark='3'] .jimi-black-item,[theme-dark='4'] .jimi-black-item,[theme-dark='7'] .jimi-black-item,[theme-dark='0'] .jimi-blocked-users-tag,[theme-dark='1'] .jimi-blocked-users-tag,[theme-dark='2'] .jimi-blocked-users-tag,[theme-dark='3'] .jimi-blocked-users-tag,[theme-dark='4'] .jimi-blocked-users-tag,[theme-dark='7'] .jimi-blocked-users-tag,[theme-dark='0'] .jimi-in-blocked-user-tag,[theme-dark='1'] .jimi-in-blocked-user-tag,[theme-dark='2'] .jimi-in-blocked-user-tag,[theme-dark='3'] .jimi-in-blocked-user-tag,[theme-dark='4'] .jimi-in-blocked-user-tag,[theme-dark='7'] .jimi-in-blocked-user-tag,[theme-dark='0'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='1'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='2'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='3'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='4'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='7'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{background:#504e4e}[theme-dark='0'] #JIMI_DIALOG_RIGHT,[theme-dark='1'] #JIMI_DIALOG_RIGHT,[theme-dark='2'] #JIMI_DIALOG_RIGHT,[theme-dark='3'] #JIMI_DIALOG_RIGHT,[theme-dark='4'] #JIMI_DIALOG_RIGHT,[theme-dark='7'] #JIMI_DIALOG_RIGHT,[theme-dark='0'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='1'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='2'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='3'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='4'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='7'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='0'] #JIMI_HIDDEN .jimi-title,[theme-dark='1'] #JIMI_HIDDEN .jimi-title,[theme-dark='2'] #JIMI_HIDDEN .jimi-title,[theme-dark='3'] #JIMI_HIDDEN .jimi-title,[theme-dark='4'] #JIMI_HIDDEN .jimi-title,[theme-dark='7'] #JIMI_HIDDEN .jimi-title,[theme-dark='0'] #JIMI_FILTER .jimi-title,[theme-dark='1'] #JIMI_FILTER .jimi-title,[theme-dark='2'] #JIMI_FILTER .jimi-title,[theme-dark='3'] #JIMI_FILTER .jimi-title,[theme-dark='4'] #JIMI_FILTER .jimi-title,[theme-dark='7'] #JIMI_FILTER .jimi-title{background:#2f2c2b}[theme-dark='0'] .jimi-form-box,[theme-dark='1'] .jimi-form-box,[theme-dark='2'] .jimi-form-box,[theme-dark='3'] .jimi-form-box,[theme-dark='4'] .jimi-form-box,[theme-dark='7'] .jimi-form-box{background:#312e2e}[theme-dark='0'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div,[theme-dark='1'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div,[theme-dark='2'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div,[theme-dark='3'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div,[theme-dark='4'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div,[theme-dark='7'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div{color:#b8b7b7}[theme-dark='0'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='1'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='2'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='3'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='4'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='7'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='0'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='1'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='2'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='3'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='4'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='7'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='0'] #JIMI_BACKGROUND_DARK .jimi-background-item-name,[theme-dark='1'] #JIMI_BACKGROUND_DARK .jimi-background-item-name,[theme-dark='2'] #JIMI_BACKGROUND_DARK .jimi-background-item-name,[theme-dark='3'] #JIMI_BACKGROUND_DARK .jimi-background-item-name,[theme-dark='4'] #JIMI_BACKGROUND_DARK .jimi-background-item-name,[theme-dark='7'] #JIMI_BACKGROUND_DARK .jimi-background-item-name{color:#989796}[theme-dark='0'] .jimi-switch,[theme-dark='1'] .jimi-switch,[theme-dark='2'] .jimi-switch,[theme-dark='3'] .jimi-switch,[theme-dark='4'] .jimi-switch,[theme-dark='7'] .jimi-switch{background:#474443}[theme-dark='0'] #JIMI_DIALOG_MENU>div.target,[theme-dark='1'] #JIMI_DIALOG_MENU>div.target,[theme-dark='2'] #JIMI_DIALOG_MENU>div.target,[theme-dark='3'] #JIMI_DIALOG_MENU>div.target,[theme-dark='4'] #JIMI_DIALOG_MENU>div.target,[theme-dark='7'] #JIMI_DIALOG_MENU>div.target,[theme-dark='0'] .jimi-switch:checked,[theme-dark='1'] .jimi-switch:checked,[theme-dark='2'] .jimi-switch:checked,[theme-dark='3'] .jimi-switch:checked,[theme-dark='4'] .jimi-switch:checked,[theme-dark='7'] .jimi-switch:checked{background:#175ac0}[theme-dark='0'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='1'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='2'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='3'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='4'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='7'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='0'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='1'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='2'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='3'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='4'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='7'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='0'] .jimi-in-blocked-user-tag,[theme-dark='1'] .jimi-in-blocked-user-tag,[theme-dark='2'] .jimi-in-blocked-user-tag,[theme-dark='3'] .jimi-in-blocked-user-tag,[theme-dark='4'] .jimi-in-blocked-user-tag,[theme-dark='7'] .jimi-in-blocked-user-tag,[theme-dark='0'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='1'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='2'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='3'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='4'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='7'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#175ac0}[theme-dark='0'] #JIMI_DEFAULT_SELF a,[theme-dark='1'] #JIMI_DEFAULT_SELF a,[theme-dark='2'] #JIMI_DEFAULT_SELF a,[theme-dark='3'] #JIMI_DEFAULT_SELF a,[theme-dark='4'] #JIMI_DEFAULT_SELF a,[theme-dark='7'] #JIMI_DEFAULT_SELF a,[theme-dark='0'] .jimi-zhihu-key a,[theme-dark='1'] .jimi-zhihu-key a,[theme-dark='2'] .jimi-zhihu-key a,[theme-dark='3'] .jimi-zhihu-key a,[theme-dark='4'] .jimi-zhihu-key a,[theme-dark='7'] .jimi-zhihu-key a,[theme-dark='0'] #JIMI_HISTORY_LIST a:hover,[theme-dark='1'] #JIMI_HISTORY_LIST a:hover,[theme-dark='2'] #JIMI_HISTORY_LIST a:hover,[theme-dark='3'] #JIMI_HISTORY_LIST a:hover,[theme-dark='4'] #JIMI_HISTORY_LIST a:hover,[theme-dark='7'] #JIMI_HISTORY_LIST a:hover,[theme-dark='0'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='1'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='2'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='3'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='4'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='7'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='0'] .jimi-black-item a:hover,[theme-dark='1'] .jimi-black-item a:hover,[theme-dark='2'] .jimi-black-item a:hover,[theme-dark='3'] .jimi-black-item a:hover,[theme-dark='4'] .jimi-black-item a:hover,[theme-dark='7'] .jimi-black-item a:hover,[theme-dark='0'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='0'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='0'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='1'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='2'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='3'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='4'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='7'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='0'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='1'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='2'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='3'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='4'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='7'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='0'] .jimi-in-blocked-user-tag,[theme-dark='1'] .jimi-in-blocked-user-tag,[theme-dark='2'] .jimi-in-blocked-user-tag,[theme-dark='3'] .jimi-in-blocked-user-tag,[theme-dark='4'] .jimi-in-blocked-user-tag,[theme-dark='7'] .jimi-in-blocked-user-tag{color:#175ac0 !important}[theme-dark='0'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(255,255,255,0.08)}[theme-dark='0'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after,[theme-dark='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after,[theme-dark='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after,[theme-dark='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after,[theme-dark='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after,[theme-dark='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#175ac0}[theme-dark='0'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible,[theme-dark='1'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible,[theme-dark='2'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible,[theme-dark='3'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible,[theme-dark='4'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible,[theme-dark='7'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#175ac0}[theme-dark='0'] .jimi-form-box,[theme-dark='1'] .jimi-form-box,[theme-dark='2'] .jimi-form-box,[theme-dark='3'] .jimi-form-box,[theme-dark='4'] .jimi-form-box,[theme-dark='7'] .jimi-form-box{border-color:#514e4e}[theme-dark='0'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='1'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='2'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='3'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='4'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='7'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='0'] .key-shadow,[theme-dark='1'] .key-shadow,[theme-dark='2'] .key-shadow,[theme-dark='3'] .key-shadow,[theme-dark='4'] .key-shadow,[theme-dark='7'] .key-shadow{background:#383534}[theme-dark='0'] #JIMI_DIALOG input[type='range'],[theme-dark='1'] #JIMI_DIALOG input[type='range'],[theme-dark='2'] #JIMI_DIALOG input[type='range'],[theme-dark='3'] #JIMI_DIALOG input[type='range'],[theme-dark='4'] #JIMI_DIALOG input[type='range'],[theme-dark='7'] #JIMI_DIALOG input[type='range']{background:#474443;box-shadow:inset 1px 1px 2px #474443,inset -1px -1px 2px #474443}[theme-dark='0'] #JIMI_DIALOG input[type='range']::before,[theme-dark='1'] #JIMI_DIALOG input[type='range']::before,[theme-dark='2'] #JIMI_DIALOG input[type='range']::before,[theme-dark='3'] #JIMI_DIALOG input[type='range']::before,[theme-dark='4'] #JIMI_DIALOG input[type='range']::before,[theme-dark='7'] #JIMI_DIALOG input[type='range']::before,[theme-dark='0'] #JIMI_DIALOG input[type='range']::after,[theme-dark='1'] #JIMI_DIALOG input[type='range']::after,[theme-dark='2'] #JIMI_DIALOG input[type='range']::after,[theme-dark='3'] #JIMI_DIALOG input[type='range']::after,[theme-dark='4'] #JIMI_DIALOG input[type='range']::after,[theme-dark='7'] #JIMI_DIALOG input[type='range']::after{background:#5a5958}[theme-dark='0'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb,[theme-dark='1'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb,[theme-dark='2'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb,[theme-dark='3'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb,[theme-dark='4'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb,[theme-dark='7'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb{background:#989797;border:1px solid #b0b0af}[theme-dark='0'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active,[theme-dark='1'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active,[theme-dark='2'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active,[theme-dark='3'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active,[theme-dark='4'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active,[theme-dark='7'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active{background:#b0b0af}[theme-dark='0'] .jimi-button:hover,[theme-dark='1'] .jimi-button:hover,[theme-dark='2'] .jimi-button:hover,[theme-dark='3'] .jimi-button:hover,[theme-dark='4'] .jimi-button:hover,[theme-dark='7'] .jimi-button:hover{color:#62605e}[theme-dark='5'] #JIMI_DIALOG{color:#dfdfdf;box-shadow:2px 2px 4px #4a4848,-2px -2px 4px #4a4848}[theme-dark='5'] #JIMI_DIALOG,[theme-dark='5'] #JIMI_DIALOG_LEFT,[theme-dark='5'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='5'] .jimi-black-item,[theme-dark='5'] .jimi-blocked-users-tag,[theme-dark='5'] .jimi-in-blocked-user-tag,[theme-dark='5'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{background:#504e4e}[theme-dark='5'] #JIMI_DIALOG_RIGHT,[theme-dark='5'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='5'] #JIMI_HIDDEN .jimi-title,[theme-dark='5'] #JIMI_FILTER .jimi-title{background:#2f2c2b}[theme-dark='5'] .jimi-form-box{background:#312e2e}[theme-dark='5'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div{color:#b8b7b7}[theme-dark='5'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='5'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='5'] #JIMI_BACKGROUND_DARK .jimi-background-item-name{color:#989796}[theme-dark='5'] .jimi-switch{background:#474443}[theme-dark='5'] #JIMI_DIALOG_MENU>div.target,[theme-dark='5'] .jimi-switch:checked{background:#570d0d}[theme-dark='5'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='5'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='5'] .jimi-in-blocked-user-tag,[theme-dark='5'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#570d0d}[theme-dark='5'] #JIMI_DEFAULT_SELF a,[theme-dark='5'] .jimi-zhihu-key a,[theme-dark='5'] #JIMI_HISTORY_LIST a:hover,[theme-dark='5'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='5'] .jimi-black-item a:hover,[theme-dark='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='5'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='5'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='5'] .jimi-in-blocked-user-tag{color:#570d0d !important}[theme-dark='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(255,255,255,0.08)}[theme-dark='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#570d0d}[theme-dark='5'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#570d0d}[theme-dark='5'] .jimi-form-box{border-color:#514e4e}[theme-dark='5'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='5'] .key-shadow{background:#383534}[theme-dark='5'] #JIMI_DIALOG input[type='range']{background:#474443;box-shadow:inset 1px 1px 2px #474443,inset -1px -1px 2px #474443}[theme-dark='5'] #JIMI_DIALOG input[type='range']::before,[theme-dark='5'] #JIMI_DIALOG input[type='range']::after{background:#5a5958}[theme-dark='5'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb{background:#989797;border:1px solid #b0b0af}[theme-dark='5'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active{background:#b0b0af}[theme-dark='5'] .jimi-button:hover{color:#62605e}[theme-dark='6'] #JIMI_DIALOG{color:#dfdfdf;box-shadow:2px 2px 4px #4a4848,-2px -2px 4px #4a4848}[theme-dark='6'] #JIMI_DIALOG,[theme-dark='6'] #JIMI_DIALOG_LEFT,[theme-dark='6'] #JIMI_EXTRA_OUTPUT_DIALOG,[theme-dark='6'] .jimi-black-item,[theme-dark='6'] .jimi-blocked-users-tag,[theme-dark='6'] .jimi-in-blocked-user-tag,[theme-dark='6'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{background:#504e4e}[theme-dark='6'] #JIMI_DIALOG_RIGHT,[theme-dark='6'] #JIMI_DIALOG_RIGHT_ANCHOR,[theme-dark='6'] #JIMI_HIDDEN .jimi-title,[theme-dark='6'] #JIMI_FILTER .jimi-title{background:#2f2c2b}[theme-dark='6'] .jimi-form-box{background:#312e2e}[theme-dark='6'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div+div{color:#b8b7b7}[theme-dark='6'] #JIMI_BACKGROUND .jimi-background-item-name,[theme-dark='6'] #JIMI_BACKGROUND_LIGHT .jimi-background-item-name,[theme-dark='6'] #JIMI_BACKGROUND_DARK .jimi-background-item-name{color:#989796}[theme-dark='6'] .jimi-switch{background:#474443}[theme-dark='6'] #JIMI_DIALOG_MENU>div.target,[theme-dark='6'] .jimi-switch:checked{background:#093333}[theme-dark='6'] #JIMI_BACKGROUND .jimi-background-item input:checked+div+div,[theme-dark='6'] #JIMI_TITLE_ICO label input:checked+img,[theme-dark='6'] .jimi-in-blocked-user-tag,[theme-dark='6'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true']{border-color:#093333}[theme-dark='6'] #JIMI_DEFAULT_SELF a,[theme-dark='6'] .jimi-zhihu-key a,[theme-dark='6'] #JIMI_HISTORY_LIST a:hover,[theme-dark='6'] #JIMI_HISTORY_VIEW a:hover,[theme-dark='6'] .jimi-black-item a:hover,[theme-dark='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover,[theme-dark='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target,[theme-dark='6'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span:hover,[theme-dark='6'] [data-type='chooseBlockedUserTags'] .jimi-choose-blocked-user-tags>span[data-choose='true'],[theme-dark='6'] .jimi-in-blocked-user-tag{color:#093333 !important}[theme-dark='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{background:rgba(255,255,255,0.08)}[theme-dark='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#093333}[theme-dark='6'] #JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline-color:#093333}[theme-dark='6'] .jimi-form-box{border-color:#514e4e}[theme-dark='6'] .jimi-form-box .jimi-form-box-item::after,[theme-dark='6'] .key-shadow{background:#383534}[theme-dark='6'] #JIMI_DIALOG input[type='range']{background:#474443;box-shadow:inset 1px 1px 2px #474443,inset -1px -1px 2px #474443}[theme-dark='6'] #JIMI_DIALOG input[type='range']::before,[theme-dark='6'] #JIMI_DIALOG input[type='range']::after{background:#5a5958}[theme-dark='6'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb{background:#989797;border:1px solid #b0b0af}[theme-dark='6'] #JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active{background:#b0b0af}[theme-dark='6'] .jimi-button:hover{color:#62605e}.jimi-button{outline:none;position:relative;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;user-select:none;touch-action:manipulation;font-size:13px;height:24px;padding:0px 8px;border-radius:4px;border:1px solid transparent;background-color:#fff;border-color:rgba(150,162,170,0.4);font-weight:400;box-sizing:border-box}.jimi-button:hover{font-weight:600;background:#eeeeee}.jimi-button:active{background:#e0e0e0;font-weight:400}.jimi-button.jimi-button-primary{background:#007aff;color:#fff;border-color:transparent}.jimi-button.jimi-button-primary:hover{background:#0040dd}.jimi-button.jimi-button-primary:active{background:#007aff}.jimi-button-red{color:#ff3b30 !important;border:1px solid #ff3b30 !important}.jimi-button-red:hover{color:#ff453a !important;border:1px solid #ff453a !important}.jimi-button:disabled{border-color:#d0d0d0;background-color:rgba(0,0,0,0.08);color:#b0b0b0;cursor:not-allowed}.Profile-mainColumn,.Collections-mainColumn,.CollectionsDetailPage-mainColumn{flex:1}#root .css-1liaddi{margin-right:0}.ContentItem-title div{display:inline}.css-1acwmmj:empty{display:none !important}.css-hr0k1l::after{content:'点击键盘左、右按键切换图片';position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:#fff}.HotLanding-contentItemCount.HotLanding-contentItemCountWithoutSub{margin-top:12px}body[data-suspension-pickup='true'] .ContentItem-actions.Sticky.is-fixed button[data-zop-retract-question='true']{position:fixed;bottom:50px;background:#fff;padding:6px 12px;box-shadow:0 2px 8px #c9c9c9,0 -2px 8px #ffffff;border-radius:8px}body[data-suspension-pickup='true'] .ContentItem-actions.Sticky.is-fixed button[data-zop-retract-question='true']:hover{background:#fff;color:#007aff !important;font-weight:600}body[data-suspension-pickup='true'] .ContentItem-actions.Sticky.is-fixed button[data-zop-retract-question='true']:active{font-weight:200 !important}.Topstory-container,.css-knqde,.Search-container{width:fit-content !important}.QuestionPage .Question-mainColumn,.QuestionHeader-main{flex:1}.QuestionPage{padding:0}.QuestionPage .List-item{border-bottom:1px dashed #ddd}.QuestionPage .Question-mainColumn{width:initial}.Post-Row-Content .Post-Row-Content-right{width:auto}.QuestionHeader{min-width:auto}.QuestionHeader .QuestionHeader-content{margin:0 auto;padding:0;max-width:initial !important}.GifPlayer.isPlaying img{cursor:pointer !important}.AppHeader-inner{margin:0 auto !important;padding:0 !important;min-width:min-content !important;width:fit-content !important}.zhuanlan .Post-Row-Content-left{flex:1}.zhuanlan .Post-Row-Content-right{margin-left:10px}.zhuanlan .css-1pariuy,.zhuanlan .css-44kk6u{max-width:none}.zhuanlan .css-9w3zhd,.zhuanlan .css-12tmx22,.zhuanlan .css-1bcbfml{width:auto}.Topstory-content>div{width:auto !important}#JIMI_DIALOG{transition-property:transform;transition-duration:500ms;transition-timing-function:cubic-bezier(.2, 0, 0, 1);position:fixed;left:50%;top:50%;transform:translate(-50%, -50%);transition-property:height;width:800px;height:600px;max-width:100vw;max-height:100vh;border-radius:8px;box-shadow:2px 2px 4px #dbdbdb,-2px -2px 4px #dbdbdb;background:#e0e0e0;flex-direction:column;overflow:hidden;z-index:202;font-size:13px;border:1px solid rgba(142,142,147,0.1)}#JIMI_DIALOG input[type='text'],#JIMI_EXTRA_OUTPUT_DIALOG input[type='text'],#JIMI_DIALOG input[type='number'],#JIMI_EXTRA_OUTPUT_DIALOG input[type='number'],#JIMI_DIALOG textarea,#JIMI_EXTRA_OUTPUT_DIALOG textarea{box-sizing:border-box;margin:0;padding:1px 4px;font-size:13px;line-height:1.5;list-style:none;position:relative;display:inline-block;min-width:0;border:1px solid rgba(150,162,170,0.4);border-radius:4px;transition:all .2s;background:transparent}#JIMI_DIALOG label,#JIMI_EXTRA_OUTPUT_DIALOG label{cursor:pointer;transition:all .2s}#JIMI_DIALOG label:hover,#JIMI_EXTRA_OUTPUT_DIALOG label:hover{color:#007aff !important}#JIMI_DIALOG label .jimi-i[type='checkbox']~div,#JIMI_EXTRA_OUTPUT_DIALOG label .jimi-i[type='checkbox']~div{margin-left:8px;display:inline-block}#JIMI_DIALOG ::-webkit-scrollbar,#JIMI_EXTRA_OUTPUT_DIALOG ::-webkit-scrollbar{width:8px;height:8px;background:transparent}#JIMI_DIALOG ::-webkit-scrollbar-track,#JIMI_EXTRA_OUTPUT_DIALOG ::-webkit-scrollbar-track{border-radius:0}#JIMI_DIALOG ::-webkit-scrollbar-thumb,#JIMI_EXTRA_OUTPUT_DIALOG ::-webkit-scrollbar-thumb{background:#bbb;transition:all .2s;border-radius:8px}#JIMI_DIALOG ::-webkit-scrollbar-thumb:hover,#JIMI_EXTRA_OUTPUT_DIALOG ::-webkit-scrollbar-thumb:hover{background-color:rgba(95,95,95,0.7)}#JIMI_DIALOG a,#JIMI_EXTRA_OUTPUT_DIALOG a{transition:all .2s;text-decoration:none}#JIMI_DIALOG .jimi-button,#JIMI_EXTRA_OUTPUT_DIALOG .jimi-button{min-width:68px}#JIMI_DIALOG_LEFT{width:160px;display:flex;flex-direction:column;overflow:hidden;background:#e0e0e0}#JIMI_DIALOG_MENU{flex:1;overflow:hidden auto;padding:8px 12px 0}#JIMI_DIALOG_MENU>div{box-sizing:border-box;line-height:38px;padding-left:12px;border-radius:6px;font-size:13px;margin-bottom:2px;cursor:pointer}#JIMI_DIALOG_MENU>div:active{font-weight:200 !important}#JIMI_DIALOG_MENU>div:hover{background:rgba(77,66,86,0.08)}#JIMI_DIALOG_MENU>div.target{color:#fff !important;background:#007aff}#JIMI_DIALOG_RIGHT{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#ededec}#JIMI_DIALOG_RIGHT_TITLE{height:52px;line-height:52px;font-size:16px;font-weight:600;box-sizing:border-box;padding:0 18px;border-bottom:1px solid rgba(150,162,170,0.2);display:flex}#JIMI_DIALOG_RIGHT_TITLE .jimi-right-title-content{flex:1}#JIMI_DIALOG_RIGHT_TITLE .jimi-right-title-content div>span{font-size:12px;color:#ff3b30;padding-left:8px}#JIMI_DIALOG_RIGHT_ANCHOR{flex:0 0 auto;gap:2px;overflow-x:auto;overflow-y:hidden;box-sizing:border-box;padding:6px 18px 0;border-bottom:1px solid rgba(150,162,170,0.2);background:#ededec}#JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item{position:relative;border:0;border-radius:6px 6px 0 0;padding:0 12px;height:34px;line-height:34px;font-size:13px;font-family:inherit;white-space:nowrap;cursor:pointer;color:inherit;background:transparent;transition:all .2s;appearance:none}#JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item::after{content:'';position:absolute;right:10px;bottom:-1px;left:10px;height:2px;border-radius:2px;background:transparent;transition:all .2s}#JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:hover{color:#007aff;background:rgba(77,66,86,0.08)}#JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target{color:#007aff;font-weight:600;background:rgba(0,122,255,0.1)}#JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item.target::after{background:#007aff}#JIMI_DIALOG_RIGHT_ANCHOR .jimi-right-anchor-item:focus-visible{outline:1px solid #007aff;outline-offset:-2px}#JIMI_DIALOG_MAIN{flex:1;overflow-y:auto}#JIMI_DIALOG_MAIN>div{box-sizing:border-box;width:100%;padding:18px}#JIMI_DIALOG_CONTENT{flex:1;display:flex;overflow:hidden}.jimi-zhihu-key a{color:#007aff !important}.jimi-zhihu-key a:hover{color:#bbb !important}.jimi-default-bottom a,.jimi-config-buttons a,.jimi-default-bottom button,.jimi-config-buttons button{margin-left:8px;width:100px}#JIMI_OPEN_CLOSE{transition-property:none;transition-duration:300ms;transition-timing-function:cubic-bezier(.2, 0, 0, 1);user-select:none;width:48px;height:48px;display:flex;align-items:center;justify-content:center;text-align:center;background:rgba(150,162,170,0.4);border-radius:8px;opacity:.8;font-size:44px;cursor:pointer;z-index:201;position:fixed;bottom:0;right:0;box-sizing:border-box;border:2px solid rgba(150,162,170,0.2)}#JIMI_OPEN_CLOSE:hover{opacity:1}#JIMI_LEFT_BUTTONS{margin:8px 0 0 8px}#JIMI_LEFT_BUTTONS button{height:22px;border-radius:4px;padding:0;border:0;font-size:12px;color:#fff;width:70px}#JIMI_LEFT_BUTTONS [name='dialogClose']{background:#fe6059}#JIMI_LEFT_BUTTONS [name='dialogClose']:hover{background:#d70015;color:#fff !important;font-weight:600}#JIMI_LEFT_BUTTONS [name='dialogBig']{background:#27c93f}#JIMI_LEFT_BUTTONS [name='dialogBig']:hover{background:#007d1b;color:#fff !important;font-weight:600}.gear{width:24px;height:24px;position:relative;border-radius:50%;box-sizing:border-box;border:6px solid #8e8e93;background:transparent}.gear_line_1,.gear_line_2,.gear_line_3,.gear_line_4{position:absolute;box-sizing:border-box;width:30px;height:6px;border-radius:2px;border-left:6px solid #8e8e93;border-right:6px solid #8e8e93;left:50%;top:50%;transform:translate(-50%, -50%)}.gear_line_2{transform:translate(-50%, -50%) rotate(45deg)}.gear_line_3{transform:translate(-50%, -50%) rotate(90deg)}.gear_line_4{transform:translate(-50%, -50%) rotate(135deg)}#JIMI_EXTRA_OUTPUT_COVER{position:fixed;left:50%;top:50%;transform:translate(-50%, -50%);width:800px;height:600px;background:rgba(0,0,0,0.4);z-index:203;border-radius:8px}#JIMI_EXTRA_OUTPUT_DIALOG{position:fixed;left:50%;top:50%;transform:translate(-50%, -50%);z-index:204;background:#ededec;border-radius:8px;overflow:hidden;min-width:420px;border:1px solid rgba(142,142,147,0.1);box-shadow:2px 2px 4px #dbdbdb,-2px -2px 4px #dbdbdb}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-extra-footer{text-align:right;padding:14px;border-top:1px solid rgba(142,142,147,0.1)}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-extra-footer button{margin-left:12px}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-title{padding-left:14px;height:auto;font-size:16px}#JIMI_EXTRA_OUTPUT_DIALOG>div{padding-top:4px}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-change-blocked-user-tag-name{width:420px;padding:0 14px 14px}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-change-blocked-user-tag-name input[name='blocked-user-tag-name']{width:100%}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-choose-blocked-user-tags{width:600px;padding:6px 6px 6px 14px}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-choose-blocked-user-tags>span{cursor:pointer;display:inline-block;border-radius:6px;margin:0 8px 8px 0;border:1px solid rgba(150,162,170,0.4);padding:0 8px;background:#fff}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-choose-blocked-user-tags>span:hover{background:rgba(77,66,86,0.08);color:#007aff !important;font-weight:600}#JIMI_EXTRA_OUTPUT_DIALOG .jimi-choose-blocked-user-tags>span[data-choose='true']{color:#007aff;border-color:#007aff;background:rgba(0,122,255,0.1)}.jimi-zhida{color:#09408e;margin:0 2px}.jimi-zhida span{font-size:10px;display:inline-block;vertical-align:top;height:15px;line-height:15px}#JIMI_HIDDEN,#JIMI_VERSION,#JIMI_FILTER{padding-top:0 !important}#JIMI_HIDDEN .jimi-title,#JIMI_FILTER .jimi-title{position:sticky;top:0;margin:0 -18px;padding:0 18px 0 28px;background:#ededec;z-index:1}#JIMI_NOT_INTERESTED_LIST>div{display:block;line-height:24px}#JIMI_NOT_INTERESTED_LIST>div .jimi-remove-not-interested-item{cursor:pointer;margin-left:6px}#JIMI_NOT_INTERESTED_LIST>div .jimi-remove-not-interested-item:hover{color:#007aff}.jimi-radio-group{display:flex}.jimi-radio-group label{cursor:pointer;position:relative;margin:0 !important}.jimi-radio-group label div{box-sizing:border-box;padding:0 8px;height:24px;display:flex;align-items:center;justify-content:center;border-top:1px solid rgba(150,162,170,0.4);border-bottom:1px solid rgba(150,162,170,0.4);position:relative}.jimi-radio-group label div::after{content:'';position:absolute;height:100%;width:1px;background:rgba(150,162,170,0.4);right:0;top:0}.jimi-radio-group label:first-of-type div{border-radius:8px 0 0 8px;border-left:1px solid rgba(150,162,170,0.4)}.jimi-radio-group label:first-of-type div::before{display:none}.jimi-radio-group label:last-of-type div{border-radius:0 8px 8px 0;border-right:1px solid rgba(150,162,170,0.4)}.jimi-radio-group label:last-of-type div::after{display:none}.jimi-radio-group label:hover div{background:rgba(0,122,255,0.1)}.jimi-radio-group input{visibility:hidden;position:absolute}.jimi-radio-group input:checked+div{background:#007aff;color:#fff;border-color:#007aff;z-index:1}.jimi-radio-group input:checked+div::after{background:#007aff;z-index:1}.jimi-radio-group input:checked+div::before{content:'';position:absolute;height:100%;width:1px;background:#007aff;left:0;top:0;z-index:1}.jimi-radio{display:inline-block;padding-left:24px;line-height:24px}.jimi-radio input[type='radio']{display:none}.jimi-radio input[type='radio']+div{position:relative;cursor:pointer}.jimi-radio input[type='radio']+div::before{content:'';position:absolute;left:-20px;top:4px;border-radius:50%;border:1px solid #cecece;width:14px;height:14px;background:#fff;box-shadow:inset 5px 5px 5px #f0f0f0,inset -5px -5px 5px #ffffff}.jimi-radio input[type='radio']+div::after{content:'';position:absolute;left:-16px;top:8px;border-radius:50%;width:8px;height:8px}.jimi-radio input[type='radio']:checked+div::before{background:#007aff;border-color:#007aff;box-shadow:none}.jimi-radio input[type='radio']:checked+div::after{background:#fff}.jimi-radio input[type='radio']:focus+div::before{box-shadow:0 0 8px #007aff}.jimi-radio input[type='radio']:disabled+div::before{border:1px solid #cecece;box-shadow:0 0 4px #ddd}.jimi-i:not(.jimi-switch)[type='checkbox']{appearance:none;-webkit-appearance:none;-moz-appearance:none;-ms-appearance:none;-o-appearance:none;transition:all .2s;width:22px;height:22px;margin:0;position:relative;border-radius:4px;box-sizing:border-box;border:none;cursor:pointer}.jimi-i:not(.jimi-switch)[type='checkbox']::after{cursor:pointer;transition:all .2s;content:' ';width:22px;height:22px;border-radius:4px;border:1px solid rgba(150,162,170,0.4);box-sizing:border-box;left:0px;top:0px;z-index:1;position:absolute;font-weight:600;display:flex;align-items:center;justify-content:center}.jimi-i:not(.jimi-switch)[type='checkbox']:hover::after{border-color:#007aff}.jimi-i:not(.jimi-switch)[type='checkbox']:checked::after{content:'✓';font-size:16px;font-weight:600;color:#fff;background:#007aff;border-color:#007aff}.jimi-checkbox-group label{display:inline-flex !important;padding-right:12px}.jimi-checkbox-group label div{margin-right:12px}.jimi-checkbox-group label::after{content:'';height:12px;width:1px;background:rgba(150,162,170,0.4)}.jimi-checkbox-group label:last-of-type::after{display:none}.jimi-tooltip{position:relative;display:inline-block;margin-left:4px}.jimi-tooltip>span:first-child{display:inline-block;font-size:12px;border-radius:50%;border:1px solid #98989d;color:#98989d;width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}.jimi-tooltip>span:last-child{display:none;position:absolute;top:30px;left:-50px;background-color:#515151;color:#fff;padding:8px 12px;z-index:10;border-radius:6px;width:max-content;line-height:24px}.jimi-tooltip>span:last-child::after{content:'';width:0;height:0;position:absolute;border-bottom:6px solid #515151;border-left:8px solid transparent;border-right:8px solid transparent;top:-6px;left:50px}.jimi-tooltip:hover>span:first-child{border-color:#007aff;color:#007aff}.jimi-tooltip:hover>span:last-child{display:block}.jimi-form-box{background:#e9e9e8;border:1px solid #dfdfde;border-radius:8px;margin-bottom:14px}.jimi-form-box-item{display:flex;padding:8px 12px;min-height:24px;position:relative}.jimi-form-box-item>div:first-of-type{flex:1;line-height:24px;word-break:keep-all;padding-right:12px}.jimi-form-box-item>div:nth-child(2){display:flex;flex-wrap:wrap;align-items:center}.jimi-form-box-item::after{content:'';position:absolute;background:#e0e0df;height:1px;width:96%;bottom:0;left:50%;transform:translateX(-50%)}.jimi-form-box-item:last-of-type::after{display:none}.jimi-form-box-item-vertical{display:block}.jimi-form-box-item-vertical>div:nth-child(2){display:block;padding-top:4px;font-size:12px;color:#999}.jimi-title{font-weight:bold;font-size:13px;display:flex;align-items:center;height:42px;line-height:42px;padding-left:10px}.jimi-title>span{font-size:12px;color:#999;padding-left:8px}.jimi-title>span b{color:#ff3b30}.jimi-switch{width:40px;height:24px;position:relative;background-color:#dcdfe6;border-radius:6px;background-clip:content-box;display:inline-block;appearance:none;-webkit-appearance:none;-moz-appearance:none;user-select:none;outline:none;margin:0;cursor:pointer}.jimi-switch::before{content:'';position:absolute;width:22px;height:22px;background-color:#ffffff;border-radius:5px;left:2px;top:0;bottom:0;margin:auto;transition:.3s}.jimi-switch:checked{background-color:#007aff;transition:.6s}.jimi-switch:checked::before{left:17px;transition:.3s}.jimi-switch:hover::before{background:#f0f0f0}.jimi-switch:disabled{opacity:.45;cursor:not-allowed}.jimi-fetch-intercept .jimi-need-fetch{display:none}.jimi-fetch-intercept.jimi-fetch-intercept-close{color:#b0b0b0 !important;cursor:not-allowed !important;text-decoration:line-through}.jimi-fetch-intercept.jimi-fetch-intercept-close span.jimi-need-fetch{display:inline}.jimi-fetch-intercept.jimi-fetch-intercept-close div.jimi-need-fetch{display:block}.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-black-item-more,.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-black-item-action{cursor:not-allowed !important}.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-black-item .jimi-black-item-more:hover,.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-black-item .jimi-black-item-action:hover,.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-black-item a:hover{background:transparent !important;color:#b0b0b0 !important}.jimi-fetch-intercept.jimi-fetch-intercept-close:hover{color:#b0b0b0 !important}.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-switch{background-color:rgba(0,0,0,0.08);cursor:not-allowed !important}.jimi-fetch-intercept.jimi-fetch-intercept-close .jimi-switch::before{background:#ffffff !important}#JIMI_DIALOG input[type='range']{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:6px;border-radius:8px;background:#dddddc;position:relative;box-shadow:inset 1px 1px 2px #d4d4d3,inset -1px -1px 2px #d4d4d3}#JIMI_DIALOG input[type='range']::before,#JIMI_DIALOG input[type='range']::after{content:'';background:#c6c6c5;position:absolute;height:10px;width:3px;border-radius:4px;top:-2px}#JIMI_DIALOG input[type='range']::before{left:-2px}#JIMI_DIALOG input[type='range']::after{right:-2px}#JIMI_DIALOG input[type='range']::-webkit-slider-thumb{-webkit-appearance:none;-moz-appearance:none;appearance:none;transition:all .2s;width:10px;height:25px;border-radius:16px;background:#fff;border:1px solid #c7c7c6;z-index:5}#JIMI_DIALOG input[type='range']::-webkit-slider-thumb:active{background:#f0f0f0}.jimi-select{position:relative;width:fit-content}.jimi-select-input{background:transparent;text-align:right;height:22px;border-radius:6px;border:1px solid transparent;padding:0 8px;line-height:22px;cursor:pointer}.jimi-select-input:hover{background:#ffffff;border:1px solid #e0e0e0}.jimi-select-icon{margin-left:4px}.jimi-option-box{position:absolute;top:24px;right:0;background:#e9e9e8;z-index:10;padding:6px;border-radius:6px;border:1px solid #e0e0e0;box-shadow:2px 2px 4px #dbdbdb,-2px -2px 4px #dbdbdb}.jimi-option-item{white-space:pre;cursor:default;padding:0 6px 0 24px;border-radius:4px;height:24px;line-height:24px;position:relative}.jimi-option-item:hover{color:#fff;background:#007aff}.jimi-option-item[data-choose="true"]::before{content:'✓';position:absolute;left:6px}#JIMI_BACKGROUND{gap:12px}.jimi-background-item{position:relative}.jimi-background-item input{position:absolute;visibility:hidden}.jimi-background-item input:checked+div+div{border-color:#007aff}.jimi-background-item input:checked+div+div+div{color:#272726}.jimi-background-item .jimi-background-item-div{border-radius:8px;height:46px;width:68px;margin:4px}.jimi-background-item .jimi-background-item-border{height:46px;width:68px;border-radius:12px;position:absolute;top:0;left:0;border:4px solid transparent}.jimi-background-item-name{font-size:12px;text-align:center;padding-top:8px;color:#777776}#JIMI_BACKGROUND_LIGHT,#JIMI_BACKGROUND_DARK{gap:10px;padding:4px 4px 24px 0}#JIMI_BACKGROUND_LIGHT .jimi-background-item,#JIMI_BACKGROUND_DARK .jimi-background-item{position:relative}#JIMI_BACKGROUND_LIGHT .jimi-background-item input,#JIMI_BACKGROUND_DARK .jimi-background-item input{position:absolute;visibility:hidden}#JIMI_BACKGROUND_LIGHT .jimi-background-item input:checked+div+div,#JIMI_BACKGROUND_DARK .jimi-background-item input:checked+div+div,#JIMI_BACKGROUND_LIGHT .jimi-background-item input:checked+div+div+div,#JIMI_BACKGROUND_DARK .jimi-background-item input:checked+div+div+div{opacity:1}#JIMI_BACKGROUND_LIGHT .jimi-background-item-div,#JIMI_BACKGROUND_DARK .jimi-background-item-div{height:18px;width:18px;border-radius:50%;margin:0}#JIMI_BACKGROUND_LIGHT .jimi-background-item-border,#JIMI_BACKGROUND_DARK .jimi-background-item-border{height:calc(18px - (4px * 2));width:calc(18px - (4px * 2));border-radius:50%;position:absolute;top:0;left:0;background:#fff;opacity:0}#JIMI_BACKGROUND_LIGHT .jimi-background-item-name,#JIMI_BACKGROUND_DARK .jimi-background-item-name{font-size:12px;text-align:center;padding-top:8px;color:#777776;opacity:0;position:absolute;word-break:keep-all;left:50%;transform:translateX(-50%)}#JIMI_DEFAULT_SELF a{color:#007aff}#JIMI_DEFAULT_SELF a:hover{color:#bbb}#JIMI_BLOCK_WORDS{padding-top:0 !important}.jimi-block-words-content{display:flex;flex-wrap:wrap;cursor:default;margin-bottom:-4px}.jimi-block-words-content>span{padding:0px 6px;border-radius:4px;font-size:13px;margin:0 4px 4px 0;border:1px solid rgba(150,162,170,0.4);cursor:pointer;background:#fff}.jimi-block-words-content>span:hover{color:#ff3b30;border-color:#ff3b30}#JIMI_BLOCKED_USERS,#JIMI_LOCAL_BLOCKED_USERS,#JIMI_BLOCKED_USERS_TAGS{display:flex;flex-wrap:wrap;margin:0 -8px -8px 0}.jimi-black-item{height:24px;line-height:24px;box-sizing:content-box;padding:2px 6px;margin:0 8px 8px 0;display:flex;align-items:center;position:relative;border-radius:4px;border:1px solid #8e8e93;background:#fff;transition:all .2s}.jimi-black-item a:hover{color:#007aff}.jimi-black-item .jimi-black-item-more{width:24px;height:24px;text-align:center;border-radius:4px;cursor:pointer;font-style:normal;margin-left:4px}.jimi-black-item .jimi-black-item-more:hover{background:rgba(142,142,147,0.1)}.jimi-black-item[data-menu-open='true']{z-index:4}.jimi-black-item-menu{position:fixed;z-index:10001;min-width:128px;padding:4px 0;border:1px solid #8e8e93;border-radius:4px;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.12)}.jimi-black-item-menu span{display:block;height:28px;line-height:28px;padding:0 10px;white-space:nowrap;cursor:pointer}.jimi-black-item-menu span:hover{background:rgba(142,142,147,0.1);color:#007aff}.jimi-black-box>button,.jimi-button-black{margin-left:8px}.jimi-blocked-users-tag{height:24px;line-height:24px;box-sizing:content-box;padding:0 6px;margin:0 8px 8px 0;display:flex;align-items:center;border-radius:6px;border:1px solid #8e8e93;background:#fff}.jimi-remove-blocked-tag:hover{color:#ff3b30;font-weight:600}.jimi-remove-blocked-tag:active{font-weight:200 !important}.jimi-black-tag{padding:0 6px;background:#000;color:#fff;font-size:12px;border-radius:4px;margin-left:8px;display:inline-block;line-height:22px}.jimi-blocked-content-replacement{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.jimi-blocked-content-replacement .jimi-black-tag{vertical-align:middle}.jimi-blocked-content-replacement-text{display:inline-block;line-height:22px}.jimi-in-blocked-user-tag{margin-left:4px;border-radius:4px;font-size:12px;border:1px solid #007aff;color:#007aff;background:rgba(0,122,255,0.1);height:16px;line-height:16px;padding:0 4px}.jimi-edit-blocked-tag{display:inline-block;font-size:13px;margin-left:4px;cursor:pointer}.jimi-edit-blocked-tag:hover{font-weight:600 !important;color:#007aff}.jimi-edit-blocked-tag:active{font-weight:200 !important}.jimi-block-user-box button{font-size:12px;margin-left:8px}.jimi-set-content:not(.jimi-flex-wrap)>div,.jimi-set-content:not(.jimi-flex-wrap)>label{margin-bottom:18px}.jimi-commit{font-size:12px;color:#999}.jimi-commit b{color:#ff3b30}.jimi-flex-wrap{display:flex;flex-wrap:wrap;min-height:24px;align-items:center}.jimi-flex-wrap label{margin-right:4px;display:flex;align-items:center}.jimi-flex-wrap label input[type='radio']{margin:0 4px 0 0}.jimi-video-download{position:absolute;top:20px;left:20px;font-size:24px;color:#fff;cursor:pointer}.jimi-loading{animation:loadingAnimation 2s infinite;font-size:24px;color:#91919d;cursor:none}@keyframes loadingAnimation{from{transform:rotate(0)}to{transform:rotate(360deg)}}.jimi-preview{box-sizing:border-box;position:fixed;height:100%;width:100%;top:0;left:0;overflow-y:auto;z-index:200;background-color:rgba(18,18,18,0.4)}.jimi-preview div{display:flex;justify-content:center;align-items:center;min-height:100%;width:100%}.jimi-preview div img{cursor:zoom-out;user-select:none}#JIMI_TITLE_ICO label input{display:none}#JIMI_TITLE_ICO label input:checked+img{border-color:#007aff}#JIMI_TITLE_ICO label img{width:28px;height:28px;border:4px solid transparent;border-radius:8px}#JIMI_TITLE_ICO label:hover img{border-color:#e0e0e0}.jimi-question-time{font-size:13px !important;font-weight:normal !important;line-height:24px}.jimi-stop-scroll{height:100% !important;overflow:hidden !important}.jimi-export-collection-box{float:right;text-align:right}.jimi-export-collection-box p{font-size:13px;color:#666;margin:4px 0}.jimi-people-export-progress{display:inline-flex;align-items:center;gap:6px;margin-left:8px;color:#666;font-size:12px;vertical-align:middle}.jimi-people-export-progress-track{display:inline-block;width:90px;height:6px;overflow:hidden;border-radius:4px;background:#e5e5e5}.jimi-people-export-progress-bar{display:block;width:0;height:100%;transition:width .2s;background:#007aff}.jimi-pdf-dialog-item{padding:12px;border-bottom:1px solid #eee;margin:12px;background:#ffffff}.jimi-pdf-dialog-title{margin:0 0 1.4em;font-size:20px;font-weight:bold}.jimi-pdf-box-content{width:100%;background:#ffffff}.jimi-pdf-view{width:100%;background:#ffffff;word-break:break-all;white-space:pre-wrap;font-size:13px;overflow-x:hidden}.jimi-pdf-view a{color:#0066ff}.jimi-pdf-view img{max-width:100%}.jimi-pdf-view p{margin:1.4em 0}#JIMI_SUSPENSION_SWITCH{position:fixed;z-index:10;overflow:hidden;border-radius:6px}#JIMI_SUSPENSION_SWITCH>a{display:block;width:36px;height:36px;line-height:36px;text-align:center;background-color:rgba(255,255,255,0.8);color:#333;font-size:16px;cursor:pointer;border:1px solid #e0e0e0;border-top:none}#JIMI_SUSPENSION_SWITCH>a:first-of-type{border-top-left-radius:6px;border-top-right-radius:6px;border-top:1px solid #e0e0e0}#JIMI_SUSPENSION_SWITCH>a:last-of-type{border-bottom-left-radius:6px;border-bottom-right-radius:6px}#JIMI_SUSPENSION_SWITCH>a:hover{font-weight:bold;color:#fff;background:#005ce6}#JIMI_SUSPENSION_SWITCH:hover .lock-icon{display:block}#JIMI_SUSPENSION_SWITCH .lock-icon{font-size:18px;width:36px;height:36px;line-height:36px;text-align:center;display:none;cursor:pointer;z-index:2;position:relative;border-radius:50%}#JIMI_SUSPENSION_SWITCH .lock-icon:hover{background:rgba(0,0,0,0.4)}#JIMI_SUSPENSION_SWITCH .move-mock{position:absolute;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1;display:none;top:0;left:0;cursor:pointer}.key-shadow{border:1px solid #e0e0e0;border-radius:4px;box-shadow:rgba(0,0,0,0.06) 0 1px 1px 0;font-weight:600;min-width:26px;height:26px;padding:0px 6px;text-align:center;margin:0 4px}#JIMI_HISTORY_LIST a,#JIMI_HISTORY_VIEW a{word-break:break-all;display:block;margin-bottom:8px;padding:6px 12px;border:1px solid rgba(150,162,170,0.4);border-radius:8px;cursor:pointer}#JIMI_HISTORY_LIST a:hover,#JIMI_HISTORY_VIEW a:hover{background:rgba(77,66,86,0.08);color:#007aff !important;font-weight:600}.jimi-video-link{border:1px solid #ccc;display:inline-block;height:98px;width:fit-content;border-radius:4px;box-sizing:border-box;overflow:hidden;transition:all .3s}.jimi-video-link img{width:98px;height:98px;vertical-align:bottom}.jimi-video-link span{padding:4px 12px;display:inline-block}.jimi-video-link:hover{border-color:#005ce6;color:#005ce6}#JIMI_MESSAGE_BOX{position:fixed;left:0;top:10px;width:100%;z-index:1000}.jimi-message{margin:0 auto;width:500px;height:48px;display:flex;align-items:center;justify-content:center;font-size:13px;border-radius:8px;box-shadow:0 0 8px #d0d4d6,0 0 8px #e6eaec;margin-bottom:12px;background:#fff}#IMPORT_BY_FILE,#IMPORT_BLACK{display:inline-flex}#IMPORT_BY_FILE input,#IMPORT_BLACK input{display:none}#JIMI_FILTER_BLOCK_WORDS input,#JIMI_FILTER_BLOCK_WORDS_CONTENT input{width:100%}#JIMI_COVER{position:fixed;top:0;left:-200%;width:100%;height:100%;pointer-events:none}`;
  var CLASS_PEOPLE_EXPORT_PROGRESS = "jimi-people-export-progress";
  var PROFILE_EXPORT_LIMIT = 20;
  var parseJSONAttr = (value) => {
    if (!value) return void 0;
    try {
      return JSON.parse(value);
    } catch {
      return void 0;
    }
  };
  var normalizeContentId = (value) => {
    if (value === void 0 || value === null) return "";
    const str = String(value);
    const matched = str.match(/\d+/g);
    return matched ? matched[matched.length - 1] : str;
  };
  var getVisibleProfileItems = (contentClassName) => Array.from(domA(`.Profile-main .ListShortcut .List-item .${contentClassName}`)).filter((item) => item.offsetParent || item.getClientRects().length);
  var getProfileItemId = (contentItem, type) => {
    const dataZop = parseJSONAttr(contentItem.getAttribute("data-zop"));
    const dataZaExtra = parseJSONAttr(contentItem.getAttribute("data-za-extra-module"));
    const attrId = dataZop?.itemId || dataZaExtra?.card?.content?.token;
    if (attrId) return normalizeContentId(attrId);
    const hrefSelector = type === "answer" ? 'a[href*="/answer/"]' : 'a[href*="/p/"]';
    const link = contentItem.querySelector(hrefSelector);
    const href = link ? link.href || link.getAttribute("href") || "" : "";
    const matched = href.match(type === "answer" ? /\/answer\/(\d+)/ : /\/p\/(\d+)/);
    return matched ? matched[1] : "";
  };
  var getExportDataId = (item) => normalizeContentId(item && item.id);
  var mergeProfileExportData = (...dataList) => {
    const data = [];
    const dataMap = /* @__PURE__ */ new Map();
    dataList.forEach((list) => {
      list.forEach((item) => {
        const id = getExportDataId(item);
        if (!id) {
          data.push(item);
          return;
        }
        if (!dataMap.has(id)) {
          dataMap.set(id, item);
          data.push(item);
        }
      });
    });
    return data;
  };
  var orderProfileExportData = (data, visibleItems, type) => {
    const visibleIds = visibleItems.map((item) => getProfileItemId(item, type)).filter(Boolean);
    if (!visibleIds.length || visibleIds.length !== visibleItems.length) return data.slice(0, visibleItems.length);
    const dataMap = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const id = getExportDataId(item);
      id && dataMap.set(id, item);
    });
    const orderedData = visibleIds.map((id) => dataMap.get(id)).filter(Boolean);
    return orderedData.length === visibleIds.length ? orderedData : data.slice(0, visibleItems.length);
  };
  var createProfileExportProgress = (eventBtn) => {
    let nodeProgress = eventBtn.parentElement?.querySelector(`.${CLASS_PEOPLE_EXPORT_PROGRESS}`);
    if (!nodeProgress) {
      nodeProgress = domC("span", {
        className: CLASS_PEOPLE_EXPORT_PROGRESS,
        innerHTML: `<span class="jimi-people-export-progress-text">已加载 0/0</span><span class="jimi-people-export-progress-track"><span class="jimi-people-export-progress-bar"></span></span>`
      });
      insertAfter(nodeProgress, eventBtn);
    }
    return nodeProgress;
  };
  var updateProfileExportProgress = (nodeProgress, loaded, total) => {
    const nodeText = nodeProgress.querySelector(".jimi-people-export-progress-text");
    const nodeBar = nodeProgress.querySelector(".jimi-people-export-progress-bar");
    const countLoaded = Math.min(loaded, total);
    const percent = total ? Math.floor(countLoaded / total * 100) : 0;
    nodeText.innerText = `已加载 ${countLoaded}/${total}`;
    nodeBar.style.width = `${percent}%`;
  };
  var getProfileUrlToken = (requestUrl) => {
    const apiMatched = requestUrl.match(/\/api\/v4\/members\/([^/]+)\/(?:answers|articles)/);
    if (apiMatched) return apiMatched[1];
    const pathMatched = location.pathname.match(/\/(?:people|org)\/([^/]+)/);
    return pathMatched ? pathMatched[1] : "";
  };
  var normalizeProfileExportUrl = (urlValue) => {
    if (!urlValue) return "";
    const url = new URL(urlValue, location.origin);
    if (location.protocol === "https:" && url.protocol === "http:") {
      url.protocol = "https:";
    }
    return url.href;
  };
  var createProfileExportUrl = (apiPath, requestUrl, offset, limit) => {
    const token = getProfileUrlToken(requestUrl);
    if (!token) return "";
    const url = new URL(requestUrl || `/api/v4/members/${token}/${apiPath}`, location.origin);
    url.pathname = `/api/v4/members/${token}/${apiPath}`;
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("limit", String(limit));
    return normalizeProfileExportUrl(url.href);
  };
  var getExportFetchHeaders = () => {
    const headers = new Headers(store.getFetchHeaders());
    ["vod-authorization", "content-encoding", "Content-Type", "content-type"].forEach((name) => headers.delete(name));
    return headers;
  };
  var fetchProfileExportData = async (apiPath, requestUrl, targetCount, nodeProgress) => {
    const data = [];
    let offset = 0;
    let nextUrl = createProfileExportUrl(apiPath, requestUrl, offset, Math.min(Math.max(targetCount, 1), PROFILE_EXPORT_LIMIT));
    while (nextUrl && data.length < targetCount) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: getExportFetchHeaders()
      });
      if (!response.ok) throw new Error(`request failed: ${response.status}`);
      const res = await response.json();
      const currentData = Array.isArray(res.data) ? res.data : [];
      data.push(...currentData);
      updateProfileExportProgress(nodeProgress, data.length, targetCount);
      if (!currentData.length || res.paging?.is_end) break;
      offset += currentData.length;
      nextUrl = normalizeProfileExportUrl(res.paging?.next || createProfileExportUrl(apiPath, requestUrl, offset, PROFILE_EXPORT_LIMIT));
    }
    return data.slice(0, targetCount);
  };
  var runPeopleExport = async ({
    eventBtn,
    type,
    apiPath,
    contentClassName,
    loadingText,
    buttonText,
    emptyText,
    requestUrl,
    cacheData,
    toHTML
  }) => {
    const visibleItems = getVisibleProfileItems(contentClassName);
    const total = visibleItems.length;
    const nodeProgress = createProfileExportProgress(eventBtn);
    eventBtn.innerText = loadingText;
    eventBtn.disabled = true;
    updateProfileExportProgress(nodeProgress, 0, total);
    if (!total) {
      eventBtn.innerText = buttonText;
      eventBtn.disabled = false;
      message(emptyText);
      return;
    }
    try {
      const fetchedData = await fetchProfileExportData(apiPath, requestUrl, total, nodeProgress);
      const exportData = orderProfileExportData(mergeProfileExportData(fetchedData, cacheData), visibleItems, type);
      updateProfileExportProgress(nodeProgress, exportData.length, total);
      if (!exportData.length) throw new Error("empty export data");
      if (exportData.length < total) {
        message(`仅加载到 ${exportData.length}/${total} 条内容，已导出可加载部分`, 5e3);
      }
      loadIframePrint(eventBtn, exportData.map(toHTML), buttonText);
    } catch (error) {
      eventBtn.innerText = buttonText;
      eventBtn.disabled = false;
      message("个人主页内容导出失败，请稍后重试", 5e3);
      console.error(error);
    }
  };
  var loadIframePrint = (eventBtn, arrHTML, btnText) => {
    let max = 0;
    let finish = 0;
    let error = 0;
    const innerHTML = arrHTML.join("");
    const iframe = dom(".jimi-pdf-box-content");
    if (!iframe.contentWindow) return;
    const doc = iframe.contentWindow.document;
    doc.body.innerHTML = "";
    if (!doc.head.querySelector("style")) {
      doc.write(`<style type="text/css" id="jimi-css-own">${INNER_CSS}</style>`);
    }
    doc.write(`<div class="jimi-pdf-view"></div>`);
    const nodePDFView = doc.querySelector(".jimi-pdf-view");
    const domInner = domC("div", { innerHTML });
    max = domInner.querySelectorAll("img").length;
    domInner.querySelectorAll("img").forEach((imageItem) => {
      const dataOriginal = imageItem.getAttribute("data-original");
      if (!dataOriginal) {
        imageItem.setAttribute("data-original", imageItem.src);
      }
      imageItem.src = "";
    });
    nodePDFView.appendChild(domInner);
    const doPrint = () => {
      eventBtn.innerText = btnText;
      eventBtn.disabled = false;
      iframe.contentWindow.print();
    };
    const imageLoaded = () => {
      eventBtn.innerText = `资源加载进度 ${Math.floor(finish / max * 100)}%：${finish}/${max}${error > 0 ? `，${error}张图片资源已失效` : ""}`;
      if (finish + error === max) {
        doPrint();
      }
    };
    if (nodePDFView.querySelectorAll("img").length) {
      nodePDFView.querySelectorAll("img").forEach((imageItem, index2) => {
        setTimeout(function() {
          imageItem.src = imageItem.getAttribute("data-original");
          imageItem.onload = function() {
            finish++;
            imageLoaded();
          };
          imageItem.onerror = function() {
            error++;
            imageLoaded();
          };
        }, Math.floor(index2 / 5) * 100);
      });
    } else {
      doPrint();
    }
  };
  var myCollectionExport = {
    init: async function() {
      const { fetchInterceptStatus } = await myStorage.getConfig();
      if (!fetchInterceptStatus) return;
      const { pathname } = location;
      const elementBox = domC("div", { className: `${this.className}`, innerHTML: this.element });
      const nodeThis = dom(`.${this.className}`);
      nodeThis && nodeThis.remove();
      const elementTypeSpan = this.elementTypeSpan;
      const nodeCollection = elementBox.querySelector('[name="jimi-export-collection"]');
      nodeCollection && (nodeCollection.onclick = function() {
        const me = this;
        me.innerText = "加载中...";
        me.disabled = true;
        const matched = pathname.match(/(?<=\/collection\/)\d+/);
        const id = matched ? matched[0] : "";
        if (!id) return;
        const nodeCurrent = dom(".Pagination .PaginationButton--current");
        const offset = 20 * (nodeCurrent ? Number(nodeCurrent.innerText) - 1 : 0);
        const fetchHeaders = store.getFetchHeaders();
        fetch(`/api/v4/collections/${id}/items?offset=${offset}&limit=20`, {
          method: "GET",
          headers: new Headers(fetchHeaders)
        }).then((response) => {
          return response.json();
        }).then((res) => {
          const collectionsHTMLMap = (res.data || []).map((item) => {
            const { type, url, question, content, title } = item.content;
            switch (type) {
              case "zvideo":
                return `<div class="jimi-pdf-dialog-item"><div class="jimi-pdf-dialog-title">${elementTypeSpan(type)}${title}</div><div>视频链接：<a href="${url}" target="_blank">${url}</a></div></div>`;
              case "answer":
              case "article":
              default:
                return `<div class="jimi-pdf-dialog-item"><div class="jimi-pdf-dialog-title">${elementTypeSpan(type)}${title || question.title}</div><div>内容链接：<a href="${url}" target="_blank">${url}</a></div><div>${content}</div></div>`;
            }
          });
          loadIframePrint(me, collectionsHTMLMap, "导出此页内容");
        });
      });
      const nodePageHeaderTitle = dom(".CollectionDetailPageHeader-title");
      nodePageHeaderTitle && nodePageHeaderTitle.appendChild(elementBox);
    },
    className: "jimi-export-collection-box",
    element: `<button class="jimi-button" name="jimi-export-collection">导出此页内容</button><p>仅对此页内容进行导出</p>`,
    elementTypeSpan: (type) => {
      const typeObj = {
        answer: '<b style="color: #ec7259">「问题」</b>',
        zvideo: '<b style="color: #12c2e9">「视频」</b>',
        article: '<b style="color: #00965e">「文章」</b>'
      };
      return typeObj[type] || "";
    }
  };
  var printAnswer = (contentItem) => {
    const boxItem = contentItem.classList.contains("AnswerItem") ? contentItem.parentElement : contentItem;
    const prevButton = boxItem.querySelector(".jimi-answer-print");
    if (prevButton) return;
    const nodeUser = boxItem.querySelector(".AnswerItem-authorInfo>.AuthorInfo");
    if (!nodeUser) return;
    const nButton = createButtonFontSize12("导出回答", "jimi-answer-print");
    nButton.onclick = function() {
      const nodeUser2 = boxItem.querySelector(".AuthorInfo-name .UserLink-link");
      const nodeContent = boxItem.querySelector(".RichContent-inner");
      const innerHTML = `<h1>${JSON.parse(boxItem.querySelector(".AnswerItem").getAttribute("data-zop") || "{}").title}</h1>${nodeUser2.outerHTML + nodeContent.innerHTML}`;
      loadIframePrint(this, [innerHTML], "导出回答");
    };
    nodeUser.appendChild(nButton);
  };
  var printArticle = async (contentItem) => {
    const { topExportContent } = await myStorage.getConfig();
    const prevButton = contentItem.querySelector(".jimi-article-print");
    if (prevButton || !topExportContent) return;
    const nodeHeader = contentItem.querySelector(".ArticleItem-authorInfo") || contentItem.querySelector(".Post-Header .Post-Title");
    if (!nodeHeader) return;
    const nButton = createButtonFontSize12("导出文章", "jimi-article-print", { style: "margin: 12px 0;" });
    nButton.onclick = function() {
      const nodeTitle = contentItem.querySelector(".ContentItem-title>span") || contentItem.querySelector(".Post-Header .Post-Title");
      const nodeUser = contentItem.querySelector(".AuthorInfo-name");
      const nodeContent = contentItem.querySelector(".RichContent-inner") || contentItem.querySelector(".Post-RichTextContainer");
      const innerHTML = `<h1>${nodeTitle.innerHTML}</h1>${nodeUser.innerHTML + nodeContent.innerHTML}`;
      loadIframePrint(this, [innerHTML], "导出文章");
    };
    insertAfter(nButton, nodeHeader);
    setTimeout(() => {
      printArticle(contentItem);
    }, 500);
  };
  var printPeopleAnswer = async () => {
    const { fetchInterceptStatus } = await myStorage.getConfig();
    const nodeListHeader = dom(".Profile-main .List-headerText");
    const prevButton = dom(`.jimi-people-answer-print`);
    if (!nodeListHeader || prevButton || !fetchInterceptStatus) return;
    const nButton = createButtonFontSize12("导出此页回答", "jimi-people-answer-print");
    nButton.onclick = async function() {
      await runPeopleExport({
        eventBtn: this,
        type: "answer",
        apiPath: "answers",
        contentClassName: "AnswerItem",
        loadingText: "加载回答内容中...",
        buttonText: "导出此页回答",
        emptyText: "当前页面没有可导出的回答",
        requestUrl: store.getUserAnswerRequestUrl(),
        cacheData: store.getUserAnswer(),
        toHTML: (item) => `<h1>${item.question?.title || ""}</h1><div>${item.content || ""}</div>`
      });
    };
    nodeListHeader.appendChild(nButton);
    setTimeout(() => {
      printPeopleAnswer();
    }, 500);
  };
  var printPeopleArticles = async () => {
    const { fetchInterceptStatus } = await myStorage.getConfig();
    const nodeListHeader = dom(".Profile-main .List-headerText");
    const prevButton = dom(".jimi-people-export-articles-once");
    if (!nodeListHeader || prevButton || !fetchInterceptStatus) return;
    const nButton = createButtonFontSize12("导出此页文章", "jimi-people-export-articles-once");
    nButton.onclick = async function() {
      await runPeopleExport({
        eventBtn: this,
        type: "article",
        apiPath: "articles",
        contentClassName: "ArticleItem",
        loadingText: "加载文章内容中...",
        buttonText: "导出此页文章",
        emptyText: "当前页面没有可导出的文章",
        requestUrl: store.getUserArticleRequestUrl(),
        cacheData: store.getUserArticle(),
        toHTML: (item) => `<h1>${item.title || ""}</h1><div>${item.content || ""}</div>`
      });
    };
    nodeListHeader.appendChild(nButton);
    setTimeout(() => {
      printPeopleArticles();
    }, 500);
  };
  var updateItemTime = (contentItem) => {
    const nodeBox = contentItem.querySelector(".ContentItem-meta");
    if (!nodeBox || contentItem.querySelector(`.${CLASS_TIME_ITEM}`)) return;
    const dateCreated = contentItem.querySelector('[itemprop="dateCreated"]');
    const datePublished = contentItem.querySelector('[itemprop="datePublished"]');
    const dateModified = contentItem.querySelector('[itemprop="dateModified"]');
    let innerHTML = "";
    const create = dateCreated ? dateCreated.content || "" : "";
    const published = datePublished ? datePublished.content || "" : "";
    const modified = dateModified ? dateModified.content || "" : "";
    create && (innerHTML += `<span>创建时间：${formatTime(create, "YYYY-MM-DD HH:mm:ss", true)}</span>`);
    published && (innerHTML += `<span>发布时间：${formatTime(published, "YYYY-MM-DD HH:mm:ss", true)}</span>`);
    modified && modified !== published && modified !== create && (innerHTML += `<span>｜最后修改时间：${formatTime(modified, "YYYY-MM-DD HH:mm:ss", true)}</span>`);
    nodeBox.appendChild(
      domC("div", {
        className: CLASS_TIME_ITEM,
        innerHTML,
        style: "line-height: 24px;padding-top: 2px;font-size: 13px;color: rgb(132, 145, 165);display:inline-block;"
      })
    );
  };
  var questionTimeout;
  var questionFindIndex = 0;
  var resetQuestionTime = () => {
    if (questionFindIndex > 5 || !dom(".jimi-question-time")) {
      return;
    }
    questionFindIndex++;
    clearTimeout(questionTimeout);
    questionTimeout = setTimeout(addQuestionTime, 500);
  };
  var addQuestionTime = async () => {
    const nodeTime = dom(".jimi-question-time");
    nodeTime && nodeTime.remove();
    const { questionCreatedAndModifiedTime } = await myStorage.getConfig();
    const nodeCreated = dom('[itemprop="dateCreated"]');
    const nodeModified = dom('[itemprop="dateModified"]');
    const nodeBox = dom(".QuestionPage .QuestionHeader-title");
    if (!questionCreatedAndModifiedTime || !nodeCreated || !nodeModified || !nodeBox) {
      resetQuestionTime();
      return;
    }
    const create = nodeCreated.content || "";
    const modified = nodeModified.content || "";
    nodeBox && nodeBox.appendChild(
      domC("div", {
        className: "jimi-question-time",
        innerHTML: `<span>创建时间：${formatTime(create, "YYYY-MM-DD HH:mm:ss", true)}</span>` + (modified && modified !== create ? `<span>｜最后修改时间：${formatTime(modified, "YYYY-MM-DD HH:mm:ss", true)}</span>` : ""),
        style: "color: rgb(132, 145, 165);"
      })
    );
    resetQuestionTime();
  };
  var addArticleTime = async () => {
    const { articleCreateTimeToTop } = await myStorage.getConfig();
    const nodeT = dom(".jimi-article-time");
    if (nodeT) return;
    const nodeContentTime = dom(".ContentItem-time");
    const nodeBox = dom(".Post-Header");
    if (!articleCreateTimeToTop || !nodeContentTime || !nodeBox) return;
    nodeBox.appendChild(
      domC("span", {
        className: "jimi-article-time",
        style: "line-height: 30px;color: rgb(132, 145, 165);",
        innerHTML: nodeContentTime.innerText || ""
      })
    );
    setTimeout(() => {
      addArticleTime();
    }, 500);
  };
  var CLASS_VIDEO_ONE = ".css-1h1xzpn";
  var CLASS_VIDEO_TWO = ".VideoAnswerPlayer-video";
  var CLASS_VIDEO_TWO_BOX = ".VideoAnswerPlayer";
  var NEED_LINK_CLASS = [CLASS_VIDEO_ONE, CLASS_VIDEO_TWO];
  var initVideoDownload = async (nodeFound) => {
    if (!nodeFound) return;
    const { videoInAnswerArticle } = await myStorage.getConfig();
    const domVideos = findDoms(
      nodeFound,
      [".ZVideo-player>div", CLASS_VIDEO_ONE, CLASS_VIDEO_TWO].filter((i) => {
        return videoInAnswerArticle === "1" /* 修改为链接 */ ? !NEED_LINK_CLASS.includes(i) : true;
      })
    );
    for (let i = 0, len = domVideos.length; i < len; i++) {
      const domVideoBox = domVideos[i];
      const nDomDownload = domC("i", { className: "jimi-video-download", innerHTML: "⤓" });
      const nDomLoading = domC("i", { className: "jimi-loading", innerHTML: "↻", style: "color: #fff;position: absolute;top: 20px;left: 20px;" });
      nDomDownload.onclick = function() {
        const me = this;
        const srcVideo = domVideoBox.querySelector("video").src;
        if (srcVideo) {
          me.style.display = "none";
          domVideoBox.appendChild(nDomLoading);
          videoDownload(srcVideo, `video${+/* @__PURE__ */ new Date()}`).then(() => {
            me.style.display = "block";
            nDomLoading.remove();
          });
        }
      };
      const nodeDownload = domVideoBox.querySelector(".jimi-video-download");
      nodeDownload && nodeDownload.remove();
      domVideoBox.style.cssText += `position: relative;`;
      domVideoBox.appendChild(nDomDownload);
    }
  };
  var findDoms = (nodeFound, domNames) => {
    const doms = domNames.map((i) => nodeFound.querySelectorAll(i));
    for (let i = 0, len = doms.length; i < len; i++) {
      if (doms[i].length) {
        return doms[i];
      }
    }
    return doms[doms.length - 1];
  };
  var videoDownload = async (url, name) => {
    return fetch(url).then((res) => res.blob()).then((blob) => {
      const objectUrl = window.URL.createObjectURL(blob);
      const elementA = domC("a", {
        download: name,
        href: objectUrl
      });
      elementA.click();
      window.URL.revokeObjectURL(objectUrl);
      elementA.remove();
    });
  };
  var changeVideoStyle = async () => {
    const { videoInAnswerArticle } = await myStorage.getConfig();
    fnAppendStyle("JIMI_STYLE_VIDEO", STYLE_VIDEO[videoInAnswerArticle || "0" /* 默认 */]);
  };
  var STYLE_VIDEO = {
    ["0" /* 默认 */]: "",
    ["1" /* 修改为链接 */]: `${CLASS_VIDEO_ONE}>div,${CLASS_VIDEO_ONE}>i{display: none;}${CLASS_VIDEO_ONE}{padding: 0!important;height:24px!important;width: fit-content!important;}${CLASS_VIDEO_ONE}::before{content: '视频链接，点击跳转';cursor:pointer;color: #1677ff;font-size:12px;font-weight:600;}${CLASS_VIDEO_ONE}:hover::before{color: rgb(0, 64, 221)}${CLASS_VIDEO_TWO}::before,${CLASS_VIDEO_TWO}>i{display: none;}.VideoAnswerPlayer + div{display:none;}.VideoAnswerPlayer::before{content: '视频链接，点击跳转';cursor:pointer;color: #1677ff;font-size:12px;font-weight:600;}.VideoAnswerPlayer:hover::before{color: rgb(0, 64, 221)}`,
    ["2" /* 隐藏视频 */]: `${CLASS_VIDEO_ONE}>div,${CLASS_VIDEO_ONE}>i{display: none;}${CLASS_VIDEO_ONE}{padding: 0!important;height:24px!important;width: fit-content!important;}${CLASS_VIDEO_ONE}::before{content: '隐藏一条视频内容';cursor:pointer;color: rgb(142, 142, 147);font-size: 12px;}`
  };
  var fixVideoAutoPlay = () => {
    var originalPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function() {
      if (!this.offsetHeight) {
        return;
      }
      return originalPlay.apply(this, arguments);
    };
  };
  var updateTopVote = async (contentItem) => {
    const nodeItemMeta = contentItem.querySelector(".ContentItem-meta");
    const nodeVote = contentItem.querySelector('[itemprop="upvoteCount"]');
    const { topVote } = await myStorage.getConfig();
    if (!nodeVote || !topVote || !nodeItemMeta) return;
    const vote = nodeVote.content;
    if (+vote === 0) return;
    const className = "jimi-top-vote";
    const domVotePrev = nodeItemMeta.querySelector(`.${className}`);
    const innerHTML = `${vote} 人赞同`;
    if (domVotePrev) {
      domVotePrev.innerHTML = innerHTML;
    } else {
      const domVote = domC("div", {
        className,
        innerHTML,
        style: "font-size: 13px;padding-top: 2px;color: rgb(132, 145, 165);"
      });
      nodeItemMeta.appendChild(domVote);
      const metaObserver = new MutationObserver(() => {
        updateTopVote(contentItem);
      });
      metaObserver.observe(nodeVote, {
        attributes: true,
        childList: false,
        characterData: false,
        characterDataOldValue: false,
        subtree: false
      });
    }
  };
  var timeout;
  var CLASS_ZHIDA_REPLACED = "jimi-zhida-replaced";
  var DATASET_MODE = "jimiZhidaMode";
  var hasInitZhidaClickListener = false;
  var initZhidaClickListener = () => {
    if (hasInitZhidaClickListener) return;
    hasInitZhidaClickListener = true;
    window.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const domItem = target.closest(`a.RichContent-EntityWord.${CLASS_ZHIDA_REPLACED}`);
        if (!domItem) return;
        event.stopPropagation();
        event.stopImmediatePropagation();
        const mode = domItem.dataset[DATASET_MODE];
        if (mode === "removeLink" /* 去除知乎直达跳转 */) {
          event.preventDefault();
          return;
        }
        const { href, target: linkTarget } = domItem;
        if (!href) {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        const needOpenInNewTab = linkTarget === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey;
        if (needOpenInNewTab) {
          window.open(href, "_blank", "noopener,noreferrer");
          return;
        }
        location.href = href;
      },
      true
    );
  };
  var fnReplaceZhidaToSearch = async (domFind = document.body, index2 = 0) => {
    if (index2 === 5) return;
    const { replaceZhidaToSearch = "default" /* 不替换 */ } = await myStorage.getConfig();
    if (replaceZhidaToSearch === "default" /* 不替换 */) return;
    initZhidaClickListener();
    const domsZhida = domFind.querySelectorAll(".RichContent-EntityWord");
    if (!domsZhida.length) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        fnReplaceZhidaToSearch(domFind, ++index2);
      }, 500);
      return;
    }
    for (let i = 0, len = domsZhida.length; i < len; i++) {
      const domItem = domsZhida[i];
      if (domItem.classList.contains(CLASS_LISTENED)) continue;
      domItem.classList.add(CLASS_LISTENED);
      const domSvg = domItem.querySelector("svg");
      if (domSvg) {
        domSvg.style.display = "none";
      }
      domItem.classList.add(CLASS_ZHIDA_REPLACED);
      domItem.dataset[DATASET_MODE] = replaceZhidaToSearch;
      if (replaceZhidaToSearch === "removeLink" /* 去除知乎直达跳转 */) {
        domItem.removeAttribute("href");
        domItem.style.cssText = `color: inherit!important; cursor: text!important;background: transparent!important;`;
        continue;
      }
      const prevTextContent = domItem.textContent || "";
      domItem.innerHTML = prevTextContent + '<span style="transform: rotate(-45deg);display: inline-block;">⚲</span>';
      domItem.rel = "noopener noreferrer";
      domItem.href = SEARCH_PATH[replaceZhidaToSearch] + encodeURIComponent(prevTextContent);
    }
  };
  var SEARCH_PATH = {
    ["zhihu" /* 知乎 */]: "https://www.zhihu.com/search?type=content&q=",
    ["baidu" /* 百度 */]: "https://www.baidu.com/s?wd=",
    ["google" /* 谷歌 */]: "https://www.google.com.hk/search?q=",
    ["bing" /* 必应 */]: "https://www.bing.com/search?q="
  };
  var CLASS_VIDEO_ONE_NAME = CLASS_VIDEO_ONE.replace(".", "");
  var CLASS_VIDEO_TWO_BOX_NAME = CLASS_VIDEO_TWO_BOX.replace(".", "");
  var CONTENT_CONFIG_TTL = 1500;
  var contentConfigCache = void 0;
  var contentConfigAt = 0;
  var contentConfigPromise = void 0;
  var getContentConfig = async (force = false) => {
    const now = Date.now();
    if (!force && contentConfigCache && now - contentConfigAt < CONTENT_CONFIG_TTL) {
      return contentConfigCache;
    }
    if (contentConfigPromise) {
      return contentConfigPromise;
    }
    contentConfigPromise = myStorage.getConfig(force).then((config) => {
      contentConfigCache = config;
      contentConfigAt = Date.now();
      return config;
    }).finally(() => {
      contentConfigPromise = void 0;
    });
    return contentConfigPromise;
  };
  var initRootEvent = async () => {
    const domRoot = dom("#root");
    if (!domRoot) return;
    domRoot.addEventListener("click", async function(event) {
      const config = await getContentConfig();
      if (!config) return;
      const { fetchInterceptStatus, videoInAnswerArticle } = config;
      const target = event.target;
      if (videoInAnswerArticle === "1" /* 修改为链接 */) {
        if (target.classList.contains(CLASS_VIDEO_ONE_NAME) || target.classList.contains(CLASS_VIDEO_TWO_BOX_NAME)) {
          const domVideo = target.querySelector("video");
          const videoSrc = domVideo ? domVideo.src : "";
          if (!videoSrc) return;
          window.open(videoSrc, "_blank");
        }
      }
      if (target.classList.contains(CLASS_TO_QUESTION)) {
        const { path } = target._params;
        path && window.open(path);
      }
      if (target.classList.contains(CLASS_NOT_INTERESTED) && fetchInterceptStatus) {
        const { id, type, title } = target._params;
        doFetchNotInterested({ id, type });
        const nodeTopStoryItem = domP(target, "class", "TopstoryItem");
        nodeTopStoryItem && (nodeTopStoryItem.style.display = "none");
        addNotInterestedItem(title);
      }
      doReadMore(target);
    });
  };
  var doReadMore = (currentDom) => {
    const contentItem = currentDom.classList.contains("ContentItem") ? currentDom : currentDom.querySelector(".ContentItem") || domP(currentDom, "class", "ContentItem");
    if (!contentItem) return;
    let pageType = void 0;
    const domPByClass = (name) => domP(currentDom, "class", name);
    (domPByClass("Topstory-recommend") || domPByClass("Topstory-follow") || domPByClass("zhuanlan .css-1voxft1") || domPByClass("SearchMain")) && (pageType = "LIST");
    domPByClass("QuestionPage") && (pageType = "QUESTION");
    domPByClass("Profile-main") && (pageType = "USER_HOME");
    doContentItem(pageType, contentItem, true);
  };
  var doContentItem = async (pageType, contentItem, needTimeout = false) => {
    if (!contentItem || !pageType) return;
    const config = await getContentConfig();
    if (!config) return;
    const { topExportContent, fetchInterceptStatus, listItemCreatedAndModifiedTime, answerItemCreatedAndModifiedTime, userHomeContentTimeTop } = config;
    const doFun = () => {
      const doByPageType = {
        LIST: () => {
          listItemCreatedAndModifiedTime && updateItemTime(contentItem);
          if (fetchInterceptStatus) {
            answerAddBlockButton(contentItem);
          }
        },
        QUESTION: () => {
          answerItemCreatedAndModifiedTime && updateItemTime(contentItem);
          if (fetchInterceptStatus) {
            answerAddBlockButton(contentItem);
          }
        },
        USER_HOME: () => {
          userHomeContentTimeTop && updateItemTime(contentItem);
        }
      };
      doByPageType[pageType]();
      updateTopVote(contentItem);
      initVideoDownload(contentItem);
      addAnswerCopyLink(contentItem);
      fnReplaceZhidaToSearch(contentItem);
      if (fetchInterceptStatus) {
        if (topExportContent) {
          printAnswer(contentItem);
          printArticle(contentItem);
        }
      }
    };
    if (needTimeout) {
      setTimeout(doFun, 500);
    } else {
      doFun();
    }
  };
  var myListenAnswer = {
    initTimestamp: 0,
    loaded: true,
    retryTimer: void 0,
    init: async function() {
      if (!location.pathname.includes("/question/") || !this.loaded) return;
      const currentTime = +/* @__PURE__ */ new Date();
      if (currentTime - this.initTimestamp < 500) {
        if (!this.retryTimer) {
          this.retryTimer = setTimeout(() => {
            this.retryTimer = void 0;
            this.init();
          }, 500);
        }
        return;
      }
      if (this.initTimestamp !== 0) {
        this.loaded = false;
      }
      this.initTimestamp = currentTime;
      const questionAnswerContent = dom(".QuestionAnswer-content");
      questionAnswerContent && doContentItem("QUESTION", questionAnswerContent.querySelector(".ContentItem"));
      processingData(domA(`.AnswersNavWrapper .List-item:not(.${CLASS_LISTENED})`));
    },
    reset: function() {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
        this.retryTimer = void 0;
      }
      this.dataLoad();
      domA(`.AnswersNavWrapper .List-item.${CLASS_LISTENED}`).forEach((item) => {
        item.classList.remove(CLASS_LISTENED);
      });
    },
    restart: function() {
      this.reset();
      this.init();
    },
    dataLoad: function() {
      this.loaded = true;
    }
  };
  var OB_CLASS_FOLD = {
    on: "jimi-fold-open",
    off: "jimi-fold-close"
  };
  var CLASS_BLOCKED_CONTENT_REPLACEMENT = "jimi-blocked-content-replacement";
  var BLOCKED_CONTENT_REPLACEMENT_TEXT = `<span class="jimi-blocked-content-replacement-text">***</span>`;
  var replaceBlockedAnswerContent = (nodeItem, blockedUser, showBlockUserTagType) => {
    const nodeRichContent = nodeItem.querySelector(".RichContent");
    const nodeContent = nodeRichContent && nodeRichContent.querySelector(".RichContent-inner") || nodeRichContent;
    if (!nodeContent || nodeContent.classList.contains(CLASS_BLOCKED_CONTENT_REPLACEMENT)) return;
    nodeContent.innerHTML = BLOCKED_CONTENT_REPLACEMENT_TEXT + createBlockedUserTagHTML(showBlockUserTagType, blockedUser);
    nodeContent.classList.add(CLASS_BLOCKED_CONTENT_REPLACEMENT);
    nodeRichContent && nodeRichContent.classList.remove("is-collapsed");
    nodeItem.querySelectorAll(".ContentItem-expandButton,.RichContent-collapsedText").forEach((item) => item.style.display = "none");
    fnLog(`已将黑名单用户${blockedUser.name}的回答替换为 ***`);
  };
  var processingData = async (nodes) => {
    const removeAnswers = store.getRemoveAnswers();
    const removeAnswerMap = new Map(removeAnswers.map((item) => [String(item.id), item.message]));
    const config = await myStorage.getConfig();
    const {
      removeFromYanxuan,
      removeUnrealAnswer,
      removeFromEBook,
      removeAnonymousAnswer,
      removeLessVoteDetail,
      lessVoteNumberDetail = 0,
      answerOpen = "default" /* 默认 */,
      removeBlockUserContent,
      replaceBlockUserContentWithStar,
      showBlockUserTagType,
      blockWordsAnswer = [],
      highPerformanceAnswer
    } = config;
    const blockedUserMap = new Map(getAllBlockedUsers(config).map((item) => [item.id, item]));
    const blockWordPatterns = createWordPatterns(blockWordsAnswer);
    const codePrefix = Date.now();
    for (let i = 0, len = nodes.length; i < len; i++) {
      let message2 = "";
      const nodeItem = nodes[i];
      nodeItem.classList.add(CLASS_LISTENED);
      nodeItem.dataset.code = `${codePrefix}-${i}`;
      if (nodeItem.classList.contains(JIMI_HIDDEN_ITEM_CLASS)) continue;
      const nodeItemContent = nodeItem.querySelector(".ContentItem");
      if (!nodeItemContent) continue;
      let dataZop = {};
      let dataCardContent = {};
      try {
        dataZop = JSON.parse(nodeItemContent.getAttribute("data-zop") || "{}");
        dataCardContent = JSON.parse(nodeItemContent.getAttribute("data-za-extra-module") || "{}").card.content;
      } catch {
      }
      const blockedUser = blockedUserMap.get(String(dataCardContent.author_member_hash_id || ""));
      const blockedUserToReplace = replaceBlockUserContentWithStar ? blockedUser : void 0;
      !blockedUserToReplace && (dataCardContent["upvote_num"] || 0) < lessVoteNumberDetail && removeLessVoteDetail && (message2 = `过滤低赞回答: ${dataCardContent["upvote_num"]}赞`);
      if (!message2 && !blockedUserToReplace && removeFromYanxuan) {
        const itemId = String(dataZop.itemId || "");
        const findMessage = removeAnswerMap.get(itemId);
        findMessage && (message2 = findMessage);
      }
      if (!message2 && !blockedUserToReplace) {
        const nodeTag1 = nodeItem.querySelector(".KfeCollection-AnswerTopCard-Container");
        const nodeTag2 = nodeItem.querySelector(".LabelContainer-wrapper");
        const tagNames = (nodeTag1 ? nodeTag1.innerText : "") + (nodeTag2 ? nodeTag2.innerText : "");
        if (removeUnrealAnswer) {
          tagNames.includes("虚构创作") && (message2 = "已删除一条虚构创作的回答");
        }
        if (removeFromEBook) {
          tagNames.includes("电子书") && (message2 = "已删除一条来自电子书的回答");
        }
      }
      if (!message2 && !blockedUserToReplace && removeBlockUserContent && blockedUser) {
        message2 = `已删除黑名单用户${blockedUser.name}的回答`;
      }
      if (!message2 && !blockedUserToReplace && removeAnonymousAnswer) {
        const userNode = nodeItem.querySelector('[itemprop="name"]');
        const userName = userNode ? userNode.content : "";
        userName === "匿名用户" && (message2 = `已屏蔽一条「匿名用户」回答`);
      }
      if (!message2 && !blockedUserToReplace) {
        const domRichContent = nodeItem.querySelector(".RichContent");
        const innerText = domRichContent ? domRichContent.innerText : "";
        const matchedWord = findMatchedWord(innerText, blockWordPatterns);
        if (matchedWord) {
          message2 = `匹配到屏蔽词${matchedWord}，已屏蔽该回答内容`;
        }
      }
      if (message2) {
        fnHidden(nodeItem, message2);
      } else {
        if (blockedUserToReplace) {
          replaceBlockedAnswerContent(nodeItem, blockedUserToReplace, showBlockUserTagType);
        }
        doContentItem("QUESTION", nodeItemContent);
        if (!blockedUserToReplace && answerOpen !== "default" /* 默认 */) {
          const buttonUnfold = nodeItem.querySelector(".ContentItem-expandButton");
          const buttonFold = nodeItem.querySelector(".RichContent-collapsedText");
          if (answerOpen === "on" /* 自动展开所有回答 */ && !nodeItem.classList.contains(OB_CLASS_FOLD.on)) {
            buttonUnfold && buttonUnfold.click();
            nodeItem.classList.add(OB_CLASS_FOLD.on);
          }
          const isF = buttonFold && nodeItem.offsetHeight > 939;
          const isFC = buttonUnfold;
          if (answerOpen === "off" /* 收起长回答 */ && !nodeItem.classList.contains(OB_CLASS_FOLD.off) && (isF || isFC)) {
            nodeItem.classList.add(OB_CLASS_FOLD.off);
            isF && buttonFold && buttonFold.click();
          }
        }
      }
    }
    if (highPerformanceAnswer) {
      setTimeout(() => {
        const nodes2 = domA(".AnswersNavWrapper .List-item");
        if (nodes2.length > 30) {
          const nIndex = nodes2.length - 30;
          for (let i = 0; i < nIndex; i++) {
            const item = nodes2[i];
            item && item.remove();
          }
          fnLog(`已开启高性能模式，删除${nIndex}条回答`);
        }
      }, 500);
    }
  };
  var createWordPatterns = (words) => {
    const result = [];
    for (const word of words) {
      if (!word) continue;
      try {
        result.push({
          word,
          reg: new RegExp(word.toLowerCase())
        });
      } catch {
      }
    }
    return result;
  };
  var findMatchedWord = (innerText, patterns) => {
    if (!innerText || !patterns.length) return "";
    const lowerText = innerText.toLowerCase();
    for (const item of patterns) {
      if (item.reg.test(lowerText)) {
        return `「${item.word}」`;
      }
    }
    return "";
  };
  var CLASS_BLOCKED_CONTENT_REPLACEMENT2 = "jimi-blocked-content-replacement";
  var BLOCKED_CONTENT_REPLACEMENT_TEXT2 = `<span class="jimi-blocked-content-replacement-text">***</span>`;
  var replaceBlockedListContent = (nodeItem, blockedUser, showBlockUserTagType) => {
    const nodeContent = nodeItem.querySelector(".RichContent-inner") || nodeItem.querySelector(".RichContent") || nodeItem.querySelector(".HotItem-excerpt");
    if (!nodeContent || nodeContent.classList.contains(CLASS_BLOCKED_CONTENT_REPLACEMENT2)) return;
    nodeContent.innerHTML = BLOCKED_CONTENT_REPLACEMENT_TEXT2 + createBlockedUserTagHTML(showBlockUserTagType, blockedUser);
    nodeContent.classList.add(CLASS_BLOCKED_CONTENT_REPLACEMENT2);
  };
  var processingData2 = async (nodes) => {
    if (!nodes.length) return;
    const userInfo = store.getUserInfo();
    const removeRecommends = store.getRemoveRecommends();
    const pfConfig = await myStorage.getConfig();
    const {
      filterKeywords = [],
      blockWordsAnswer = [],
      removeItemAboutVideo,
      removeItemAboutPin,
      removeItemAboutArticle,
      removeLessVote,
      lessVoteNumber = 0,
      removeItemQuestionAsk,
      removeFollowVoteAnswer,
      removeFollowVoteArticle,
      removeFollowFQuestion,
      listOutPutNotInterested,
      highlightOriginal,
      backgroundHighlightOriginal,
      themeDark = 1 /* 深色一 */,
      themeLight = 0 /* 默认 */,
      removeMyOperateAtFollow,
      listOutputToQuestion,
      fetchInterceptStatus,
      removeBlockUserContent,
      replaceBlockUserContentWithStar,
      showBlockUserTagType,
      notInterestedList = []
    } = pfConfig;
    const removeRecommendMap = new Map(removeRecommends.map((item) => [String(item.id), item.message]));
    const blockedUserMap = new Map(getAllBlockedUsers(pfConfig).map((item) => [item.id, item]));
    const notInterestedSet = new Set(notInterestedList);
    const filterKeywordPatterns = createWordPatterns2(filterKeywords);
    const answerWordPatterns = createWordPatterns2(blockWordsAnswer);
    const pfHistory = await myStorage.getHistory();
    const historyList = pfHistory.list;
    const highlight = await doHighlightOriginal(backgroundHighlightOriginal, themeDark, themeLight);
    const codePrefix = Date.now();
    for (let i = 0, len = nodes.length; i < len; i++) {
      const nodeItem = nodes[i];
      if (nodeItem.classList.contains(JIMI_HIDDEN_ITEM_CLASS)) continue;
      nodeItem.classList.add(CLASS_LISTENED);
      nodeItem.dataset.code = `${codePrefix}-${i}`;
      const nodeContentItem = nodeItem.querySelector(".ContentItem");
      if (!nodeItem.scrollHeight || !nodeContentItem) continue;
      let message2 = "";
      let dataZop = {};
      let cardContent = {};
      const isVideo = nodeContentItem.classList.contains("ZVideoItem");
      const isArticle = nodeContentItem.classList.contains("ArticleItem");
      const isTip = nodeContentItem.classList.contains("PinItem");
      try {
        dataZop = JSON.parse(nodeContentItem.getAttribute("data-zop") || "{}");
        cardContent = JSON.parse(nodeContentItem.getAttribute("data-za-extra-module") || "{}").card.content;
      } catch {
      }
      const { title = "", itemId } = dataZop || {};
      const blockedUser = blockedUserMap.get(String(cardContent.author_member_hash_id || ""));
      const blockedUserToReplace = replaceBlockUserContentWithStar ? blockedUser : void 0;
      const domFeedSource = nodeItem.querySelector(".FeedSource");
      if (!blockedUserToReplace && domFeedSource) {
        if (removeMyOperateAtFollow && nodeItem.classList.contains("TopstoryItem-isFollow")) {
          try {
            const findUserId = nodeItem.querySelector(".UserLink .UserLink-link").href.match(/[^\/]+$/)[0];
            const myUserId = userInfo.url.match(/[^\/]+$/)[0];
            findUserId === myUserId && (message2 = "关注列表屏蔽自己的操作");
          } catch {
          }
        }
        if (nodeItem.classList.contains("TopstoryItem-isFollow")) {
          const textFeed = domFeedSource.textContent || "";
          !message2 && removeFollowVoteAnswer && textFeed.includes("赞同了回答") && (message2 = "屏蔽关注人赞同的回答操作");
          !message2 && removeFollowVoteArticle && textFeed.includes("赞同了文章") && (message2 = "屏蔽关注人赞同了文章操作");
          !message2 && removeFollowFQuestion && textFeed.includes("关注了问题") && (message2 = "屏蔽关注人关注了问题操作");
        }
      }
      if (!message2 && !blockedUserToReplace) {
        notInterestedSet.has(title) && (message2 = `屏蔽不感兴趣的内容：${title}`);
      }
      if (!message2 && !blockedUserToReplace) {
        const removeMessage = removeRecommendMap.get(String(itemId));
        removeMessage && (message2 = `推荐列表已屏蔽${removeMessage}: ${title}`);
      }
      if (!message2 && !blockedUserToReplace && removeBlockUserContent && blockedUser) {
        message2 = `已删除黑名单用户${blockedUser.name}发布的内容：${title}`;
      }
      !message2 && !blockedUserToReplace && isVideo && removeItemAboutVideo && (message2 = `列表屏蔽视频：${title}`);
      !message2 && !blockedUserToReplace && isArticle && removeItemAboutArticle && (message2 = `列表屏蔽文章：${title}`);
      !message2 && !blockedUserToReplace && isTip && removeItemAboutPin && (message2 = `列表屏蔽想法`);
      if (!message2 && !blockedUserToReplace && removeLessVote && (cardContent["upvote_num"] || 0) < lessVoteNumber) {
        message2 = `屏蔽低赞内容: ${title}, ${cardContent["upvote_num"] || 0}`;
      }
      if (!message2 && !blockedUserToReplace && removeItemQuestionAsk && nodeItem.querySelector(".TopstoryQuestionAskItem")) {
        message2 = "屏蔽邀请回答";
      }
      !message2 && !blockedUserToReplace && (message2 = replaceBlockWord(title, nodeContentItem, filterKeywordPatterns, title, "标题"));
      if (!message2 && !blockedUserToReplace) {
        const domRichContent = nodeItem.querySelector(".RichContent");
        const innerText = domRichContent ? domRichContent.innerText : "";
        message2 = replaceBlockWord(innerText, nodeContentItem, answerWordPatterns, title, "内容");
      }
      if (message2) {
        fnHidden(nodeItem, message2);
        // 本地过滤不向知乎提交反馈；只有手动点击才调用接口。
      } else {
        if (blockedUserToReplace) {
          replaceBlockedListContent(nodeItem, blockedUserToReplace, showBlockUserTagType);
        }
        if (domFeedSource) {
          const textFeed = domFeedSource.textContent || "";
          const domUserLink = nodeItem.querySelector(".FeedSource-firstline .UserLink-link");
          const userName = domUserLink ? domUserLink.innerText : "";
          if (textFeed.includes("发布了想法") || dataZop && dataZop.authorName === userName) {
            const nodeActions = nodeItem.querySelector(".ContentItem-actions");
            nodeItem.style.cssText = highlightOriginal ? `${highlight}border: 1px solid #aaa;` : "";
            nodeActions && (nodeActions.style.cssText = highlightOriginal ? highlight : "");
          }
        }
        const nodeItemTitle = nodeItem.querySelector(".ContentItem-title");
        if (nodeItemTitle) {
          if (listOutPutNotInterested && fetchInterceptStatus && !nodeItem.querySelector(`.${CLASS_NOT_INTERESTED}`)) {
            nodeItemTitle.appendChild(createButtonFontSize12("不感兴趣", CLASS_NOT_INTERESTED, { _params: { id: dataZop.itemId, type: dataZop.type, title } }));
          }
          if (listOutputToQuestion && !isVideo && !isArticle && !isTip && !nodeItem.querySelector(`.${CLASS_TO_QUESTION}`)) {
            const domUrl = nodeContentItem.querySelector('[itemprop="url"]');
            const pathAnswer = domUrl ? domUrl.getAttribute("content") || "" : "";
            nodeItemTitle.appendChild(createButtonFontSize12("直达问题", CLASS_TO_QUESTION, { _params: { path: pathAnswer.replace(/\/answer[\W\w]+/, "") } }));
          }
        }
      }
      if (pfConfig.saveHistory && domP(nodeItem, "class", "Topstory-recommend") && nodeItem.querySelector(".ContentItem-title a")) {
        const nodeA = nodeItem.querySelector(".ContentItem-title a");
        if (nodeA) {
          const typeObj = isVideo ? RECOMMEND_TYPE.zvideo : isArticle ? RECOMMEND_TYPE.article : isTip ? RECOMMEND_TYPE.pin : RECOMMEND_TYPE.answer;
          const historyItem = `<a href="${nodeA.href}" target="_blank"><b style="${typeObj.style}">「${typeObj.name}」</b>${nodeA.innerText}</a>`;
          !historyList.includes(historyItem) && historyList.unshift(historyItem);
        }
      }
      if (pfConfig.saveHistory && i === len - 1) {
        myStorage.updateHistoryItem("list", historyList);
      }
    }
    syncIPhoneFeedBatch();
  };
  var createWordPatterns2 = (words) => {
    const result = [];
    for (const word of words) {
      if (!word) continue;
      try {
        result.push({
          word,
          reg: new RegExp(word.toLowerCase())
        });
      } catch {
      }
    }
    return result;
  };
  var RECOMMEND_TYPE = {
    answer: {
      name: "问题",
      style: "color: #ec7259"
    },
    article: {
      name: "文章",
      style: "color: #00965e"
    },
    zvideo: {
      name: "视频",
      style: "color: #12c2e9"
    },
    pin: {
      name: "想法",
      style: "color: #9c27b0"
    }
  };
  var replaceBlockWord = (innerText, nodeItemContent, blockWords, title, byWhat) => {
    if (!innerText || !blockWords.length) return "";
    const lowerText = innerText.toLowerCase();
    let matchedWord = "";
    for (const item of blockWords) {
      if (item.reg.test(lowerText)) {
        matchedWord = `「${item.word}」`;
        break;
      }
    }
    if (matchedWord) {
      const elementItemProp = nodeItemContent.querySelector('[itemprop="url"]');
      const routeURL = elementItemProp && elementItemProp.getAttribute("content");
      return `${byWhat}屏蔽词匹配，匹配内容：${matchedWord}，《${title}》，链接：${routeURL}`;
    }
    return "";
  };
  var recommendHighPerformance = async () => {
    if (isIPhoneBatchPage()) return;
    const { highPerformanceRecommend } = await myStorage.getConfig();
    if (!highPerformanceRecommend) return;
    setTimeout(() => {
      const nodes = domA(`.${CLASS_LISTENED}`);
      if (nodes.length > 50) {
        const nodeLast = nodes[nodes.length - 1];
        const yLastPrev = nodeLast.offsetTop;
        const yDocument = document.documentElement.scrollTop;
        const code = nodeLast.dataset.code;
        const nIndex = nodes.length - 50;
        nodes.forEach((item, index2) => {
          index2 < nIndex && item.remove();
        });
        const nNodeLast = dom(`[data-code="${code}"]`);
        if (nNodeLast) {
          const nYLast = nNodeLast.offsetTop;
          window.scrollTo({ top: yDocument - (yLastPrev - nYLast) });
        }
        fnLog(`已开启高性能模式，删除${nIndex}条推荐内容`);
      }
    }, 100);
  };
  var myListenList = {
    initTimestamp: 0,
    loaded: true,
    retryTimer: void 0,
    init: async function() {
      if (!this.loaded) return;
      const nodeLoading = dom(".Topstory-recommend .List-item.List-item");
      const currentTime = +/* @__PURE__ */ new Date();
      if (nodeLoading || currentTime - this.initTimestamp < 500) {
        if (!this.retryTimer) {
          this.retryTimer = setTimeout(() => {
            this.retryTimer = void 0;
            this.init();
          }, 500);
        }
        return;
      }
      if (this.initTimestamp !== 0) {
        this.loaded = false;
      }
      this.initTimestamp = currentTime;
      await processingData2(domA(`.TopstoryItem:not(.${CLASS_LISTENED})`));
      setTimeout(async () => {
        await processingData2(domA(`.TopstoryItem:not(.${CLASS_LISTENED})`));
      }, 500);
      await recommendHighPerformance();
    },
    reset: function() {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
        this.retryTimer = void 0;
      }
      this.dataLoad();
      domA(`.TopstoryItem.${CLASS_LISTENED}`).forEach((item) => {
        item.classList.remove(CLASS_LISTENED);
      });
    },
    restart: function() {
      this.reset();
      this.init();
    },
    dataLoad: function() {
      this.loaded = true;
    }
  };
  var CLASS_BLOCKED_CONTENT_REPLACEMENT3 = "jimi-blocked-content-replacement";
  var BLOCKED_CONTENT_REPLACEMENT_TEXT3 = `<span class="jimi-blocked-content-replacement-text">***</span>`;
  var replaceBlockedUserHomeContent = (contentItem, blockedUser, showBlockUserTagType) => {
    const nodeRichContent = contentItem.querySelector(".RichContent");
    const nodeContent = nodeRichContent && nodeRichContent.querySelector(".RichContent-inner") || nodeRichContent;
    if (!nodeContent || nodeContent.classList.contains(CLASS_BLOCKED_CONTENT_REPLACEMENT3)) return;
    nodeContent.innerHTML = BLOCKED_CONTENT_REPLACEMENT_TEXT3 + createBlockedUserTagHTML(showBlockUserTagType, blockedUser);
    nodeContent.classList.add(CLASS_BLOCKED_CONTENT_REPLACEMENT3);
    nodeRichContent && nodeRichContent.classList.remove("is-collapsed");
    contentItem.querySelectorAll(".ContentItem-expandButton,.RichContent-collapsedText").forEach((item) => item.style.display = "none");
    fnLog(`已将用户主页中黑名单用户${blockedUser.name}的内容替换为 ***`);
  };
  var handleBlockedUserHomeContent = async (contentItem) => {
    const config = await myStorage.getConfig();
    const { removeBlockUserContent, replaceBlockUserContentWithStar, showBlockUserTagType } = config;
    if (!removeBlockUserContent && !replaceBlockUserContentWithStar) return false;
    let dataZop = {};
    let cardContent = {};
    try {
      dataZop = JSON.parse(contentItem.getAttribute("data-zop") || "{}");
      cardContent = JSON.parse(contentItem.getAttribute("data-za-extra-module") || "{}").card.content;
    } catch {
    }
    const blockedUserMap = new Map(getAllBlockedUsers(config).map((item) => [item.id, item]));
    const blockedUser = blockedUserMap.get(String(cardContent.author_member_hash_id || ""));
    if (!blockedUser) return false;
    if (replaceBlockUserContentWithStar) {
      replaceBlockedUserHomeContent(contentItem, blockedUser, showBlockUserTagType);
      return false;
    }
    if (removeBlockUserContent) {
      const nodeItem = domP(contentItem, "class", "List-item") || contentItem;
      if (nodeItem.classList.contains(JIMI_HIDDEN_ITEM_CLASS)) return true;
      fnHidden(nodeItem, `已删除用户主页中黑名单用户${blockedUser.name}发布的内容：${dataZop.title || ""}`);
      return true;
    }
    return false;
  };
  var myListenUserHomeList = {
    timestamp: 0,
    retryTimer: void 0,
    init: async function() {
      const nTimestamp = +/* @__PURE__ */ new Date();
      if (nTimestamp - this.timestamp < 500) {
        if (!this.retryTimer) {
          this.retryTimer = setTimeout(() => {
            this.retryTimer = void 0;
            this.init();
          }, 500);
        }
        return;
      }
      this.timestamp = nTimestamp;
      const { homeContentOpen } = await myStorage.getConfig();
      const nodes = domA(`.Profile-main .ListShortcut .List-item .ContentItem:not(.${CLASS_LISTENED})`);
      for (let i = 0, len = nodes.length; i < len; i++) {
        const contentItem = nodes[i];
        contentItem.classList.add(CLASS_LISTENED);
        const isAnswer = contentItem.classList.contains("AnswerItem");
        const isVideo = contentItem.classList.contains("ZVideoItem");
        const isArticle = contentItem.classList.contains("ArticleItem");
        const isPin = contentItem.classList.contains("PinItem");
        if (!isAnswer && !isVideo && !isArticle && !isPin) continue;
        if (homeContentOpen === "1" /* 自动展开内容 */) {
          const openBTN = contentItem.querySelector("button.ContentItem-more");
          openBTN && openBTN.click();
        }
        if (await handleBlockedUserHomeContent(contentItem)) continue;
        doContentItem("USER_HOME", contentItem);
      }
    },
    reset: function() {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
        this.retryTimer = void 0;
      }
      domA(`.Profile-main .ListShortcut .List-item .ContentItem.${CLASS_LISTENED}`).forEach((item) => {
        item.classList.remove(CLASS_LISTENED);
      });
    },
    restart: function() {
      this.reset();
      this.init();
    }
  };
  var createHTMLMySelect = (domMain) => {
    dom("#JIMI_BASIC_SHOW_SELECT", domMain).innerHTML = SELECT_BASIS_SHOW.map(
      ({ label, value }) => createHTMLFormItem({ label, value: `<div class="jimi-select" name="${value}"></div>` })
    ).join("");
    domA(".jimi-select", domMain).forEach((item) => {
      const name = item.getAttribute("name") || "";
      if (OPTIONS_MAP[name]) {
        item.innerHTML = `<div class="jimi-select-input">${`<span class="jimi-select-value"></span><span class="jimi-select-icon">▾</span>`}</div><div class="jimi-option-box" data-name="mySelect" style="display: none">` + OPTIONS_MAP[name].map(({ value, label }) => `<div data-value="${value}" class="jimi-option-item">${label}</div>`).join("") + `</div>`;
        const itemInput = item.querySelector(".jimi-select-input");
        const itemValue = item.querySelector(".jimi-select-value");
        const itemOptionBox = item.querySelector(".jimi-option-box");
        const open = () => {
          if (item.dataset.open === "true") {
            itemOptionBox.style.display = "none";
            item.dataset.open = "false";
          } else {
            itemOptionBox.style.display = "block";
            item.dataset.open = "true";
          }
        };
        itemInput.onclick = () => {
          closeAllSelect();
          open();
        };
        itemOptionBox.onclick = async function(ev) {
          const target = ev.target;
          if (!target.classList.contains("jimi-option-item")) return;
          const value = target.dataset.value;
          const label = target.textContent;
          itemValue.textContent = label;
          itemValue.dataset.value = value;
          optionChoose(itemOptionBox, target);
          open();
          await myStorage.updateConfigItem(name, value);
          switch (name) {
            case "zoomImageType":
              mySize.change();
              initImagePreview();
              break;
            case "videoInAnswerArticle":
              changeVideoStyle();
              myListenList.restart();
              myListenAnswer.restart();
              break;
            case "linkShopping":
            case "zoomListVideoType":
            case "zoomImageHeight":
              mySize.change();
              break;
            case "homeContentOpen":
              myListenUserHomeList.restart();
              break;
            default:
              break;
          }
        };
      }
    });
  };
  var closeAllSelect = () => {
    domA(".jimi-select").forEach((item) => {
      item.dataset.open = "false";
      item.querySelector(".jimi-option-box").style.display = "none";
    });
  };
  var optionChoose = (itemOptionBox, chooseOne) => {
    itemOptionBox.querySelectorAll(".jimi-option-item").forEach((item) => {
      item.dataset.choose = "false";
    });
    chooseOne && (chooseOne.dataset.choose = "true");
  };
  var echoMySelect = async () => {
    const config = await myStorage.getConfig();
    domA(".jimi-select").forEach((item) => {
      const name = item.getAttribute("name");
      if (!name) return;
      const domValue = item.querySelector(".jimi-select-value");
      const options = OPTIONS_MAP[name];
      if (!options) return;
      const currentOption = options.find((i) => i.value === config[name]);
      if (!currentOption) return;
      domValue.dataset.value = currentOption.value;
      domValue.textContent = currentOption.label;
      const itemOptionBox = item.querySelector(".jimi-option-box");
      const itemChoose = itemOptionBox.querySelector(`.jimi-option-item[data-value="${currentOption.value}"]`);
      optionChoose(itemOptionBox, itemChoose);
    });
  };
  var Store = class _Store {
    constructor() {
      this.userInfo = void 0;
      this.prevFetchHeaders = {};
      this.removeRecommends = [];
      this.removeRecommendMap = /* @__PURE__ */ new Map();
      this.commendAuthors = [];
      this.userAnswers = [];
      this.userAnswersRequestUrl = "";
      this.userArticle = [];
      this.userArticleRequestUrl = "";
      this.removeAnswers = [];
      this.removeAnswerMap = /* @__PURE__ */ new Map();
      this.jsInitialData = void 0;
      this.setUserInfo = this.setUserInfo.bind(this);
      this.getUserInfo = this.getUserInfo.bind(this);
      this.setFetchHeaders = this.setFetchHeaders.bind(this);
      this.getFetchHeaders = this.getFetchHeaders.bind(this);
      this.findRemoveRecommends = this.findRemoveRecommends.bind(this);
      this.getRemoveRecommends = this.getRemoveRecommends.bind(this);
      this.setUserAnswer = this.setUserAnswer.bind(this);
      this.getUserAnswer = this.getUserAnswer.bind(this);
      this.getUserAnswerRequestUrl = this.getUserAnswerRequestUrl.bind(this);
      this.setUserArticle = this.setUserArticle.bind(this);
      this.getUserArticle = this.getUserArticle.bind(this);
      this.getUserArticleRequestUrl = this.getUserArticleRequestUrl.bind(this);
      this.setCommentAuthors = this.setCommentAuthors.bind(this);
      this.getCommentAuthors = this.getCommentAuthors.bind(this);
      this.findRemoveAnswers = this.findRemoveAnswers.bind(this);
      this.getRemoveAnswers = this.getRemoveAnswers.bind(this);
      this.setJsInitialData = this.setJsInitialData.bind(this);
      this.getJsInitialData = this.getJsInitialData.bind(this);
    }
    static {
      this.MAX_REMOVE_CACHE = 2e3;
    }
    setUserInfo(inner) {
      this.userInfo = inner;
    }
    getUserInfo() {
      return this.userInfo;
    }
    setFetchHeaders(headers) {
      this.prevFetchHeaders = headers;
    }
    getFetchHeaders() {
      return this.prevFetchHeaders;
    }
    async findRemoveRecommends(recommends) {
      cacheIPhoneFeedAuthors(recommends);
      const { removeAnonymousQuestion, removeFromYanxuan, videoInAnswerArticle } = await myStorage.getConfig();
      for (const item of recommends) {
        const target = item.target;
        if (!target) continue;
        let message2 = "";
        if (removeFromYanxuan && target.paid_info) {
          message2 = "选自盐选专栏的回答";
        }
        if (removeAnonymousQuestion && target.question && target.question.author && !target.question.author.id) {
          message2 = "匿名用户的提问";
        }
        if (videoInAnswerArticle === "2" /* 隐藏视频 */ && target.attachment && target.attachment.video) {
          message2 = "已删除一条视频回答";
        }
        if (message2) {
          const id = String(item.target.id);
          this.removeRecommendMap.set(id, message2);
        }
      }
      this.syncRemoveRecommends();
    }
    getRemoveRecommends() {
      return this.removeRecommends;
    }
    setUserAnswer(data, requestUrl = "") {
      this.userAnswers = data;
      if (requestUrl) {
        this.userAnswersRequestUrl = requestUrl;
      }
    }
    getUserAnswer() {
      return this.userAnswers;
    }
    getUserAnswerRequestUrl() {
      return this.userAnswersRequestUrl;
    }
    setUserArticle(data, requestUrl = "") {
      this.userArticle = data;
      if (requestUrl) {
        this.userArticleRequestUrl = requestUrl;
      }
    }
    getUserArticle() {
      return this.userArticle;
    }
    getUserArticleRequestUrl() {
      return this.userArticleRequestUrl;
    }
    async setCommentAuthors(authors) {
      this.commendAuthors = authors;
    }
    getCommentAuthors() {
      return this.commendAuthors;
    }
    async findRemoveAnswers(answers) {
      const { removeFromYanxuan, videoInAnswerArticle } = await myStorage.getConfig();
      for (const item of answers) {
        let message2 = "";
        if (removeFromYanxuan && item.answerType === "paid" && item.labelInfo) {
          message2 = "已删除一条选自盐选专栏的回答";
        }
        if (videoInAnswerArticle === "2" /* 隐藏视频 */ && item.attachment && item.attachment.video) {
          message2 = "已删除一条视频回答";
        }
        if (message2) {
          this.removeAnswerMap.set(String(item.id), message2);
        }
      }
      this.syncRemoveAnswers();
    }
    getRemoveAnswers() {
      return this.removeAnswers;
    }
    setJsInitialData(data) {
      this.jsInitialData = data;
    }
    getJsInitialData() {
      return this.jsInitialData;
    }
    syncRemoveRecommends() {
      const overflow = this.removeRecommendMap.size - _Store.MAX_REMOVE_CACHE;
      if (overflow > 0) {
        const keys = this.removeRecommendMap.keys();
        for (let i = 0; i < overflow; i++) {
          const key = keys.next().value;
          if (key === void 0) break;
          this.removeRecommendMap.delete(key);
        }
      }
      this.removeRecommends = Array.from(this.removeRecommendMap.entries()).map(([id, message2]) => ({ id, message: message2 }));
    }
    syncRemoveAnswers() {
      const overflow = this.removeAnswerMap.size - _Store.MAX_REMOVE_CACHE;
      if (overflow > 0) {
        const keys = this.removeAnswerMap.keys();
        for (let i = 0; i < overflow; i++) {
          const key = keys.next().value;
          if (key === void 0) break;
          this.removeAnswerMap.delete(key);
        }
      }
      this.removeAnswers = Array.from(this.removeAnswerMap.entries()).map(([id, message2]) => ({ id, message: message2 }));
    }
  };
  var store = new Store();
  var doFetchNotInterested = ({ id, type }) => {
    const nHeader = store.getFetchHeaders();
    delete nHeader["vod-authorization"];
    delete nHeader["content-encoding"];
    delete nHeader["Content-Type"];
    delete nHeader["content-type"];
    const idToNum = +id;
    if (String(idToNum) === "NaN") {
      fnLog(`调用不感兴趣接口错误，id为NaN, 原ID：${id}`);
      return;
    }
    fetch("/api/v4/zrec-feedback/uninterested", {
      body: `scene_code=RECOMMEND&content_type=1&content_token=${id}&uninterested_type=less_similar&feed_deliver_type=Normal&desktop=true`,
      method: "POST",
      headers: new Headers({
        ...nHeader,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      })
    }).then((res) => res.json());
  };
  var interceptionResponse = (res, pathRegexp, fn) => {
    if (pathRegexp.test(res.url)) {
      res.clone().json().then((r) => fn(r));
    }
  };
  function formatDataToHump(data) {
    if (!data) return data;
    if (Array.isArray(data)) {
      return data.map((item) => {
        return typeof item === "object" ? formatDataToHump(item) : item;
      });
    } else if (typeof data === "object") {
      const nData = {};
      Object.keys(data).forEach((prevKey) => {
        const nKey = prevKey.replace(/\_(\w)/g, (_, $1) => $1.toUpperCase());
        nData[nKey] = formatDataToHump(data[prevKey]);
      });
      return nData;
    }
    return data;
  }
  var inputImportFile = (domInput, callBack) => {
    domInput.onchange = (e) => {
      const target = e.target;
      const configFile = (target.files || [])[0];
      if (!configFile) return;
      const reader = new FileReader();
      reader.readAsText(configFile);
      reader.onload = callBack;
      target.value = "";
    };
  };
  var JIMI_HIDDEN_ITEM_CLASS = "jimi-hidden-item";
  var fnHidden = (ev, msg) => {
    ev.style.display = "none";
    ev.classList.add(JIMI_HIDDEN_ITEM_CLASS);
    fnLog(msg);
  };
  var CLASS_MESSAGE = "jimi-message";
  var messageDoms = [];
  var message = (value, t = 3e3) => {
    const time = +/* @__PURE__ */ new Date();
    const classTime = `jimi-message-${time}`;
    const nDom = domC("div", {
      innerHTML: value,
      className: `${CLASS_MESSAGE} ${classTime}`
    });
    const domBox = domById("JIMI_MESSAGE_BOX");
    if (!domBox) return;
    domBox.appendChild(nDom);
    messageDoms.push(nDom);
    if (messageDoms.length > 3) {
      const prevDom = messageDoms.shift();
      prevDom && domBox.removeChild(prevDom);
    }
    setTimeout(() => {
      const nPrevDom = dom(`.${classTime}`);
      if (nPrevDom) {
        domById("JIMI_MESSAGE_BOX").removeChild(nPrevDom);
        messageDoms.shift();
      }
    }, t);
  };
  var mouseEventClick = (element) => {
    if (!element) return;
    const myWindow = isSafari ? window : unsafeWindow;
    const event = new MouseEvent("click", {
      view: myWindow,
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(event);
  };
  var pathnameHasFn = (obj) => {
    const { pathname } = location;
    for (let name in obj) {
      pathname.includes(name) && obj[name]();
    }
  };
  var myScroll = {
    stop: () => dom("body").classList.add("jimi-stop-scroll"),
    on: () => dom("body").classList.remove("jimi-stop-scroll")
  };
  var CONFIG_HIDDEN_DEFAULT = {
    hiddenAnswerRightFooter: true,
    hiddenReadMoreText: true,
    hiddenAD: true,
    hiddenDetailFollow: true,
    hidden618HongBao: true,
    hiddenQuestionAD: true
  };
  var CONFIG_FILTER_DEFAULT = {
    removeFromYanxuan: true,
    removeFromEBook: true,
    removeUnrealAnswer: false,
    removeFollowVoteAnswer: false,
    removeFollowVoteArticle: false,
    removeFollowFQuestion: false,
    removeItemAboutAD: false,
    removeItemAboutArticle: false,
    removeItemAboutVideo: false,
    removeItemAboutPin: false,
    removeItemQuestionAsk: false,
    removeLessVote: false,
    lessVoteNumber: 100,
    removeLessVoteDetail: false,
    lessVoteNumberDetail: 100,
    removeAnonymousAnswer: false,
    removeMyOperateAtFollow: false,
    removeTopAD: true
  };
  var CONFIG_SUSPENSION = {
    suspensionPickUp: true,
    suspensionPickupRight: 0,
    suspensionSwitch: false,
    suspensionSwitchPo: "left: 20px; top: 380px;",
    suspensionSwitchFollow: true,
    suspensionSwitchDefault: true,
    suspensionSwitchHot: true,
    suspensionSwitchColumnSquare: true,
    suspensionSwitchRingFeeds: true
  };
  var CONFIG_SIMPLE = {
    hiddenAnswerRightFooter: true,
    hiddenFixedActions: true,
    hiddenLogo: true,
    hiddenHeader: true,
    hiddenHomePayAsk: true,
    hiddenItemActions: true,
    hiddenQuestionShare: true,
    hiddenQuestionTag: true,
    hiddenQuestionActions: true,
    hiddenReward: true,
    hiddenZhuanlanTag: true,
    hiddenListImg: true,
    hiddenReadMoreText: true,
    hiddenAD: true,
    hiddenAnswers: true,
    hiddenZhuanlanActions: true,
    hiddenZhuanlanTitleImage: true,
    hiddenHotItemMetrics: true,
    hiddenHotItemIndex: true,
    hiddenHotItemLabel: true,
    hiddenDetailAvatar: true,
    hiddenDetailBadge: true,
    hiddenDetailName: true,
    hiddenDetailFollow: true,
    hiddenQuestionSide: true,
    hiddenQuestionFollowing: true,
    hiddenQuestionAnswer: true,
    hiddenQuestionInvite: true,
    hiddenSearchBoxTopSearch: true,
    hiddenSearchPageTopSearch: true,
    hiddenSearchPageFooter: true,
    hiddenListAnswerInPerson: true,
    hidden618HongBao: true,
    hiddenZhuanlanFollowButton: true,
    hiddenZhuanlanAvatarWrapper: true,
    hiddenZhuanlanAuthorInfoHead: true,
    hiddenZhuanlanAuthorInfoDetail: true,
    hiddenQuestionSpecial: true,
    hiddenListVideoContent: true,
    hiddenHomeCreatorEntrance: true,
    hiddenHomeQuanzi: true,
    hiddenHomeRecommendFollow: true,
    hiddenHomeCategory: true,
    hiddenHomeCategoryMore: true,
    hiddenHomeFooter: true,
    hiddenHomeHotSearch: true,
    removeFromYanxuan: true,
    removeUnrealAnswer: false,
    removeFollowVoteAnswer: false,
    removeFollowVoteArticle: false,
    removeFollowFQuestion: false,
    removeBlockUserContent: true,
    removeItemAboutAD: false,
    removeItemQuestionAsk: false,
    removeLessVote: false,
    lessVoteNumber: 100,
    removeLessVoteDetail: false,
    lessVoteNumberDetail: 100,
    suspensionHomeTab: false,
    suspensionHomeTabPo: "left: 20px; top: 100px;",
    suspensionHomeTabFixed: true,
    suspensionFind: false,
    suspensionFindPo: "left: 10px; top: 380px;",
    suspensionFindFixed: true,
    suspensionSearch: true,
    suspensionSearchPo: "left: 10px; top: 400px;",
    suspensionSearchFixed: true,
    suspensionUser: true,
    suspensionUserPo: "right: 60px; top: 100px;",
    suspensionUserFixed: true,
    suspensionPickUp: true,
    answerOpen: "off" /* 收起长回答 */,
    showBlockUser: false,
    zoomImageType: "2" /* 自定义尺寸 */,
    zoomImageSize: "200",
    questionTitleTag: true,
    listTitleTagQuestion: true,
    listTitleTagArticle: true,
    listTitleTagVideo: true,
    listTitleTagPin: true,
    listOutPutNotInterested: true,
    fixedListItemMore: true,
    highlightOriginal: true,
    highlightListItem: true,
    listItemCreatedAndModifiedTime: true,
    answerItemCreatedAndModifiedTime: true,
    questionCreatedAndModifiedTime: true,
    articleCreateTimeToTop: true,
    linkShopping: "1" /* 仅文字 */,
    hiddenAnswerItemActions: true,
    hiddenAnswerItemTime: true,
    commitModalSizeSameVersion: true
  };
  var CONFIG_DEFAULT = {
    ...CONFIG_HIDDEN_DEFAULT,
    ...CONFIG_FILTER_DEFAULT,
    ...CONFIG_SUSPENSION,
    fetchInterceptStatus: true,
    customizeCss: "",
    answerOpen: "default" /* 默认 */,
    filterKeywords: [],
    blockWordsAnswer: [],
    showBlockUser: true,
    versionHome: "1000",
    versionAnswer: "1000",
    versionArticle: "1000",
    versionHomeIsPercent: false,
    versionHomePercent: "70",
    versionAnswerIsPercent: false,
    versionAnswerPercent: "70",
    versionArticleIsPercent: false,
    versionArticlePercent: "70",
    versionUserHome: "1000",
    versionUserHomeIsPercent: false,
    versionUserHomePercent: "70",
    versionCollection: "1000",
    versionCollectionIsPercent: false,
    versionCollectionPercent: "70",
    zoomImageType: "0" /* 默认尺寸 */,
    zoomImageSize: "600",
    showGIFinDialog: false,
    globalTitle: "",
    titleIco: "",
    questionTitleTag: true,
    listTitleTagQuestion: true,
    listTitleTagArticle: true,
    listTitleTagVideo: true,
    listTitleTagPin: true,
    listOutPutNotInterested: true,
    fixedListItemMore: false,
    highlightOriginal: true,
    highlightListItem: false,
    listItemCreatedAndModifiedTime: true,
    answerItemCreatedAndModifiedTime: true,
    questionCreatedAndModifiedTime: true,
    articleCreateTimeToTop: true,
    linkShopping: "0" /* 默认 */,
    fontSizeForList: "",
    fontSizeForAnswer: "",
    fontSizeForArticle: "",
    fontSizeForListTitle: "",
    fontSizeForAnswerTitle: "",
    fontSizeForArticleTitle: "",
    contentLineHeight: "",
    zoomListVideoType: "0" /* 默认尺寸 */,
    zoomListVideoSize: "500",
    hotKey: true,
    theme: 2 /* 自动 */,
    themeLight: 0 /* 默认 */,
    themeDark: 1 /* 深色一 */,
    colorText1: "",
    commitModalSizeSameVersion: true,
    listOutputToQuestion: false,
    userHomeContentTimeTop: true,
    userHomeTopBlockUser: true,
    copyAnswerLink: true,
    topExportContent: true,
    zoomImageHeight: "0" /* 关闭 */,
    zoomImageHeightSize: "100",
    highPerformanceRecommend: true,
    highPerformanceAnswer: true,
    suspensionOpen: "0" /* 左右 */,
    showBlockUserCommentTag: true,
    showBlockUserTag: true,
    keyEscCloseCommentDialog: true,
    replaceZhidaToSearch: "default" /* 不替换 */,
    videoInAnswerArticle: "0" /* 默认 */,
    openTagChooseAfterBlockedUser: true,
    homeContentOpen: "0" /* 默认 */,
    removeBlockUserContent: true,
    replaceBlockUserContentWithStar: false,
    blockedUsers: [],
    localBlockedUsers: [],
    notInterestedList: []
  };
  var applyCodePreset = (saved = {}) => {
    const config = { ...CONFIG_DEFAULT, ...IPHONE_PRESET.script,
      hotKey: false, hiddenOpenButton: true, suspensionSwitch: false,
      openTagChooseAfterBlockedUser: false };
    // 代码中的导入记录与手机上手动新增的记录合并，避免旧缓存吞掉预设列表。
    for (const key of ["blockedUsers", "localBlockedUsers", "blockedUsersTags", "notInterestedList"]) {
      const items = [...(Array.isArray(saved[key]) ? saved[key] : []), ...(Array.isArray(config[key]) ? config[key] : [])];
      config[key] = key === "blockedUsers" || key === "localBlockedUsers" ? mergeBlockedUsers(items) : mergeTags(items, []);
    }
    return config;
  };
  var SAVE_HISTORY_NUMBER = 500;
  var memoryRawCache = {};
  var configCacheRaw = "";
  var configCache = void 0;
  var historyCacheRaw = "";
  var historyCache = void 0;
  var parseStorageData = (raw) => {
    if (!raw) return void 0;
    try {
      return JSON.parse(raw);
    } catch {
      return void 0;
    }
  };
  var updateRawCache = (name, raw) => {
    memoryRawCache[name] = raw;
    if (name === "jimIPhoneZhihuConfig") {
      configCacheRaw = raw;
      configCache = applyCodePreset(parseStorageData(raw) || {});
    }
    if (name === "jimIPhoneZhihuHistory") {
      historyCacheRaw = raw;
      historyCache = parseStorageData(raw) || { list: [], view: [] };
    }
  };
  var syncRawStorage = async (name, raw, gmRaw, localRaw) => {
    if (!raw) return;
    if (localRaw !== raw) {
      localStorage.setItem(name, raw);
    }
    if (gmRaw !== raw) {
      await GM.setValue(name, raw);
    }
  };
  window.addEventListener("storage", (event) => {
    if (!event.key || !["jimIPhoneZhihuConfig", "jimIPhoneZhihuHistory"].includes(event.key)) return;
    updateRawCache(event.key, event.newValue || "");
  });
  var myStorage = {
    set: async function(name, value, refreshTimestamp = true) {
      const nextValue = { ...value };
      if (refreshTimestamp || !nextValue.t) {
        nextValue.t = +/* @__PURE__ */ new Date();
      }
      const v = JSON.stringify(nextValue);
      updateRawCache(name, v);
      localStorage.setItem(name, v);
      await GM.setValue(name, v);
    },
    remove: async function(name) {
      updateRawCache(name, "");
      localStorage.removeItem(name);
      await GM.deleteValue(name);
    },
    get: async function(name, force = false) {
      const configLocal = localStorage.getItem(name) || "";
      if (!force && memoryRawCache[name] !== void 0 && memoryRawCache[name] === configLocal) return memoryRawCache[name];
      const gmValue = await GM.getValue(name);
      const config = typeof gmValue === "string" ? gmValue : gmValue ? JSON.stringify(gmValue) : "";
      const cParse = parseStorageData(config);
      const cLParse = parseStorageData(configLocal);
      if (!cParse && !cLParse) {
        updateRawCache(name, "");
        return "";
      }
      if (!cParse) {
        updateRawCache(name, configLocal);
        await syncRawStorage(name, configLocal, config, configLocal);
        return configLocal;
      }
      if (!cLParse) {
        updateRawCache(name, config);
        await syncRawStorage(name, config, config, configLocal);
        return config;
      }
      const nextRaw = cParse.t < cLParse.t ? configLocal : config;
      updateRawCache(name, nextRaw);
      await syncRawStorage(name, nextRaw, config, configLocal);
      return nextRaw;
    },
    getConfig: async function(force = false) {
      const nConfig = await this.get("jimIPhoneZhihuConfig", force);
      if (!force && configCache && nConfig === configCacheRaw) return configCache;
      configCacheRaw = nConfig || "";
      configCache = applyCodePreset(parseStorageData(configCacheRaw) || {});
      return configCache;
    },
    getHistory: async function(force = false) {
      const nHistory = await myStorage.get("jimIPhoneZhihuHistory", force);
      if (!force && historyCache && nHistory === historyCacheRaw) return historyCache;
      historyCacheRaw = nHistory || "";
      historyCache = parseStorageData(historyCacheRaw) || { list: [], view: [] };
      return historyCache;
    },
    updateConfigItem: async function(key, value) {
      const config = await this.getConfig(true);
      if (typeof key === "string") {
        config[key] = value;
      } else {
        for (let itemKey in key) {
          config[itemKey] = key[itemKey];
        }
      }
      await this.updateConfig(config);
    },
    updateConfig: async function(params, refreshTimestamp = true) {
      await this.set("jimIPhoneZhihuConfig", params, refreshTimestamp);
    },
    updateHistoryItem: async function(key, params) {
      const pfHistory = await this.getHistory();
      pfHistory[key] = params.slice(0, SAVE_HISTORY_NUMBER);
      await this.set("jimIPhoneZhihuHistory", pfHistory);
    },
    updateHistory: async function(value) {
      await this.set("jimIPhoneZhihuHistory", value);
    }
  };
  function throttle(fn, time = 300) {
    let tout = void 0;
    return function() {
      clearTimeout(tout);
      tout = setTimeout(() => {
        fn.apply(this, arguments);
      }, time);
    };
  }
  var formatTime = (t, f = "YYYY-MM-DD HH:mm:ss", showTimeFromNow = false) => {
    if (!t) return "";
    const d = new Date(t);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    const preArr = (num) => String(num).length !== 2 ? "0" + String(num) : String(num);
    const strDate = f.replace(/YYYY/g, String(year)).replace(/MM/g, preArr(month)).replace(/DD/g, preArr(day)).replace(/HH/g, preArr(hour)).replace(/mm/g, preArr(min)).replace(/ss/g, preArr(sec));
    if (showTimeFromNow) {
      return strDate + `（${timeFromNow(t)}）`;
    }
    return strDate;
  };
  var timeFromNow = (t) => {
    if (!t) return "";
    const d = new Date(t);
    const year = d.getFullYear();
    const prevTimestamp = +new Date(t);
    const now = /* @__PURE__ */ new Date();
    const nowTimestamp = +now;
    const nowYear = now.getFullYear();
    const fromNow = nowTimestamp - prevTimestamp;
    if (fromNow <= 1e3 * 60) {
      return "刚刚";
    }
    if (fromNow <= 1e3 * 60 * 60) {
      return `${Math.floor(fromNow / 1e3 / 60)}分钟前`;
    }
    if (fromNow <= 1e3 * 60 * 60 * 24) {
      return `${Math.floor(fromNow / 1e3 / 60 / 60)}小时前`;
    }
    if (fromNow <= 1e3 * 60 * 60 * 24 * 31) {
      return `${Math.floor(fromNow / 1e3 / 60 / 60 / 24)}天前`;
    }
    if (fromNow <= 1e3 * 60 * 60 * 24 * 365) {
      return `${Math.floor(fromNow / 1e3 / 60 / 60 / 24 / 30)}个月前`;
    }
    return `${nowYear - year}年前`;
  };
  var THEMES = [
    { label: "浅色", value: 0 /* 浅色 */, background: "#fff", color: "#69696e" },
    { label: "深色", value: 1 /* 深色 */, background: "#000", color: "#fff" },
    { label: "自动", value: 2 /* 自动 */, background: "linear-gradient(to right, #fff, #000)", color: "#000" }
  ];
  var THEME_CONFIG_LIGHT = {
    [0 /* 默认 */]: { name: "默认", background: "#ffffff", background2: "", primary: "rgb(0, 122, 255)" },
    [2 /* 黄 */]: { name: "黄", background: "#faf9de", background2: "#fdfdf2", primary: "rgb(160, 90, 0)" },
    [3 /* 绿 */]: { name: "绿", background: "#cce8cf", background2: "#e5f1e7", primary: "rgb(0, 125, 27)" },
    [4 /* 灰 */]: { name: "灰", background: "#eaeaef", background2: "#f3f3f5", primary: "rgb(142, 142, 147)" },
    [5 /* 紫 */]: { name: "紫", background: "#e9ebfe", background2: "#f2f3fb", primary: "rgb(175, 82, 222)" },
    [6 /* 橙 */]: { name: "橙", background: "#FFD39B", background2: "#ffe4c4", primary: "rgb(201, 52, 0)" },
    [7 /* 浅橙 */]: { name: "浅橙", background: "#ffe4c4", background2: "#fff4e7", primary: "rgb(255, 159, 10)" },
    [1 /* 红 */]: { name: "红", background: "#ffd6d4", background2: "#f8ebeb", primary: "rgb(255, 59, 48)" }
  };
  var THEME_CONFIG_DARK = {
    [0 /* 默认 */]: { name: "默认", background: "#121212", background2: "#333333", primary: "#121212" },
    [1 /* 深色一 */]: { name: "深色一", background: "#15202b", background2: "#38444d", primary: "#15202b" },
    [2 /* 深色二 */]: { name: "深色二", background: "#1f1f1f", background2: "#303030", primary: "#1f1f1f" },
    [3 /* 深色三 */]: { name: "深色三", background: "#272822", background2: "#383932", primary: "#272822" },
    [4 /* 高对比度蓝 */]: { name: "高对比度蓝", background: "#1c0c59", background2: "#191970", primary: "#1c0c59" },
    [5 /* 高对比度红 */]: { name: "高对比度红", background: "#570D0D", background2: "#8B0000", primary: "#570D0D" },
    [6 /* 高对比度绿 */]: { name: "高对比度绿", background: "#093333", background2: "#0c403f", primary: "#093333" },
    [7 /* 纯黑 */]: { name: "纯黑", background: "#202123", background2: "#000000", primary: "#121212" }
  };
  var INPUT_NAME_THEME = "theme";
  var INPUT_NAME_THEME_DARK = "themeDark";
  var INPUT_NAME_ThEME_LIGHT = "themeLight";
  var onUseThemeDark = async () => {
    dom("html").setAttribute("data-theme", await isDark() ? "dark" : "light");
  };
  var checkThemeDarkOrLight = () => {
    onUseThemeDark();
    const elementHTML = dom("html");
    const muConfig = { attributes: true, attributeFilter: ["data-theme"] };
    if (!elementHTML) return;
    const muCallback = async function() {
      const themeName = elementHTML.getAttribute("data-theme");
      const dark = await isDark();
      if (themeName === "dark" && !dark || themeName === "light" && dark) {
        onUseThemeDark();
      }
    };
    const muObserver = new MutationObserver(muCallback);
    muObserver.observe(elementHTML, muConfig);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      onUseThemeDark();
      myBackground.init();
      mySize.init();
    });
  };
  var isDark = async () => {
    const { theme = 2 /* 自动 */ } = await myStorage.getConfig();
    if (+theme === 2 /* 自动 */) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return +theme === 1 /* 深色 */;
  };
  var appendClassStart = (str) => appendPrefix(str, (i) => `[class|="${i}"]`);
  var appendPrefix = (str, mapCB) => str.split(",").map(mapCB).join(",");
  var myBackground = {
    init: async function() {
      const { themeDark = 1 /* 深色一 */, themeLight = 0 /* 默认 */, colorText1 } = await myStorage.getConfig();
      const useDark = await isDark();
      const isRegular = !useDark && themeLight === 0 /* 默认 */;
      fnAppendStyle(
        "JIMI_STYLE_BACKGROUND",
        isRegular ? "" : (useDark ? this.dark(themeDark) : this.light(themeLight)) + fnReturnStr(`.ContentItem-title, body{color: ${colorText1}!important;}`, !!colorText1)
      );
      const domHTML = dom("html");
      if (useDark) {
        domHTML.setAttribute("theme-dark", `${themeDark}`);
        domHTML.removeAttribute("theme-light");
      } else {
        domHTML.setAttribute("theme-light", `${themeLight}`);
        domHTML.removeAttribute("theme-dark");
      }
    },
    light: function(lightKey) {
      if (+lightKey === +0 /* 默认 */) return "";
      const { background, background2 } = THEME_CONFIG_LIGHT[lightKey];
      return cssBackground(background, background2) + `.MenuBar-root-rQeFm{border-color: ${background}!important;}`;
    },
    dark: function(darkKey) {
      const { background, background2 } = THEME_CONFIG_DARK[darkKey];
      return appendPrefix(
        cssBackground(background, background2) + `${DARK_NAME_COLOR_WHITE}{color: #f7f9f9!important}${DARK_NAME_COLOR_BLACK}{color: ${background2}!important}${DARK_NAME_COLOR_LIGHT_LINK}{color: deepskyblue!important;}.css-1tu59u4,.ZDI,.ZDI--PencilCircleFill24,.Zi,.Zi--ArrowDown{fill: deepskyblue!important;}.ztext pre,.ztext code{background: ${background}!important;}.jimi-button{background: ${background2};border-color: #f7f9f9;color: #f7f9f9;}`,
        (i) => `html[data-theme=dark] ${i}`
      );
    }
  };
  var cssBackground = (background1, background2) => `${NAME_BACKGROUND_1}{background-color: ${background1}!important;}${NAME_BACKGROUND_2}{background-color:${background2}!important;background:${background2}!important;}${NAME_BACKGROUND_TRANSPARENT}{background-color: transparent!important;background: transparent!important;}`;
  var NAME_BACKGROUND_1 = `body,.Input-wrapper,.toolbar-section button:hover,.PostItem,.VideoAnswerPlayer-stateBar,.skeleton,.Community-ContentLayout,.Report-list tr:nth-child(odd),.LinkCard.new,.Post-content,.Messages-newItem,.New-RightCard-Outer-Dark,.WriteIndexLayout-main,.Messages-item:hover,.Menu-item.is-active,.LiveDetailsPage-root-aLVPj,.WikiLanding,.GlobalSideBar-navLink:hover,.Popover-arrow:after,.Sticky button:hover,.Sticky button:hover div,.Sticky button:hover span,.Sticky a:hover,.Sticky a:hover button,.Sticky a:hover div,.Sticky a:hover span,.Sticky li:hover,.Popover-content button:hover,.index-videoCardItem-bzeJ1,.KfeCollection-IntroCard-newStyle-mobile,.KfeCollection-IntroCard-newStyle-pc,.FeeConsultCard,.Avatar,.TextMessage-sender,.ChatUserListItem--active,.Creator-salt-new-author-menu .Creator-salt-new-author-route .ant-menu-submenu-title:hover,.Creator-salt-new-author-menu .Creator-salt-new-author-route .ant-menu-item:hover,.index-learnPath-dfrcu .index-learnContainer-9QR37 .index-learnShow-p3yvw .index-learnCard-vuCza,.index-courseCard-ebw4r,[class^="index-goodCourseCard-"],.css-m0zh86,.css-1503iqi,.css-wqf2py:hover,.css-1kxql2v,.css-jjc8wi,.css-1gtqxw0,.css-19bjnr2:hover,.css-kwaq2d:hover,.css-1b31wiw:hover,.css-2sopzd,.css-34mzkj,.css-13ev0i:hover,${appendClassStart("Tabs-container,EpisodeList-sectionItem")}`;
  var NAME_BACKGROUND_2 = `.${CLASS_MESSAGE},.zhuanlan .Post-Row-Content .Post-Row-Content-left,.zhuanlan .Post-content .ContentItem-actions,.zhuanlan .Column-EmptyCard,.Card,.HotItem,.AppHeader,.Topstory-content>div,.PlaceHolder-inner,.PlaceHolder-bg,.ContentItem-actions,.QuestionHeader,.QuestionHeader-footer ,.QZcfWkCJoarhIYxlM_sG,.Sticky,.SearchTabs,.Modal-inner,.Modal-content,.Modal-content div,.Modal-wrapper textarea,.Select-list button:active,.Select-list button:hover,.modal-dialog,.modal-dialog-buttons,.zh-profile-card div,.QuestionAnswers-answerAdd div,.Modal-modal-wf58 div,.Creator-mainColumn .Card>div,.Creator-mainColumn section,.Topbar,.AutoInviteItem-wrapper--desktop,.ProfileHeader-wrapper,.NotificationList,.SettingsFAQ,.SelectorField-options .Select-option.is-selected,.SelectorField-options .Select-option:focus,.KfeCollection-PayModal-modal,.KfeCollection-PayModal-modal div,.Community,.Report-header th,.Report-list tr:nth-child(2n),.Report-Pagination,.CreatorIndex-BottomBox-Item,.CreatorSalt-letter-wrapper,.ColumnPageHeader,.WriteIndexLayout-main>div,.EditorHelpDoc,.EditorHelpDoc div,.EditorHelpDoc h1,.PostEditor-wrapper>div:last-of-type div,.Creator-salt-new-author-content,.Select-option:focus,.ToolsQuestion div,[role="tablist"],.Topic-bar,.List-item .ZVideoToolbar button,.Creator-salt-author-welfare .Creator-salt-author-welfare-card,.Creator-salt-author-welfare-banner,#AnswerFormPortalContainer div,.CreatorTable-tableHead,.BalanceTransactionList-Item,.utils-frostedGlassEffect-2unM,#feedLives,#feedLives div,#feedLives a,.aria-primary-color-style.aria-secondary-background,.aria-primary-color-style.aria-secondary-background div,.aria-primary-color-style.aria-secondary-background h1,.aria-primary-color-style.aria-secondary-background a,.Card-card-2K6v,.Card-card-2K6v div,.LiveDetailsPage-root-aLVPj div,.LiveFooter-root-rXuoG,.PubIndex-CategoriesHeader,.ColumnHomeColumnCard,.Home-tabs,.Home-tabs div,.Home-swiper-container,.Home-swiper-container div,.BottomBarContainer,.ResponderPage-root div,.WikiLandingItemCard,.WikiLandingEntryCard,._Invite_container_30SP,._Invite_container_30SP div,._Coupon_intro_1kIo,._Coupon_list_2uTb div,.ExploreHomePage-square div,.ExploreHomePage-ContentSection-moreButton a,.ExploreSpecialCard,.ExploreRoundtableCard,.ExploreCollectionCard,.ExploreColumnCard,.Notification-white,.QuestionAnswers-answerAdd .InputLike,.QuestionAnswers-answerAdd .InputLike div,.InputLike,.CreatorSalt-community-story-wrapper .CreatorSalt-community-story-table,.Popover-content,.Notifications-footer,.Messages-footer,.Popover-arrow:after,.ant-table-tbody>tr.ant-table-placeholder:hover>td,.SettingsMain>div div:not(.StickerItem-Border):not(.SettingsMain-sideColumn):not(.UserHeader-VipBtn):not(.UserHeader-VipTip):not(.css-60n72z div),.CreatorSalt-community-story-wrapper,.ListShortcut>div:not(.Question-mainColumn),.Chat,.ActionMenu,.Recommendations-Main,.KfeCollection-PcCollegeCard-root,.CreatorSalt-sideBar-wrapper,.ant-menu,.signQr-container,.signQr-rightContainer>div,.Login-options,.Input-wrapper>input,.SignFlowInput-errorMask,.Write-school-search-bar .CreatorSalt-management-search,.CreatorSalt-Content-Management-Index,.Topstory-container .TopstoryTabs>a::after,.ZVideo,.KfeCollection-CreateSaltCard,.CreatorSalt-personalInfo,.CreatorSalt-sideBar-item,.css-d1sc5t,.css-1gvsmgz,.css-u56wtg,.css-1hrberl,.CreatorSalt-community-story-wrapper .CreatorSalt-community-story-header,.ant-table-tbody>tr>td,.CreatorSalt-management-wrapper .CreatorSalt-management-search,.ant-table-thead .ant-table-cell,.QuestionWaiting-typesTopper,.SearchSubTabs,.ContentItem-actions.Sticky.is-fixed button[data-zop-retract-question='true'],.Post-Row-Content-left,.hot-column-container,.recommend-column,.hot-column,.more-container,.HotSearchCard,.WriteArea>div,.Creator-mainColumn .Card>div>div,.css-qd51c>div:not(.css-13gd32n),.ant-modal-content,.css-1e6hvbc,.css-17pkp3f,.css-kt4t4n,.css-u3vsx3,.css-7v0dz0,.css-1ur5o1n,.css-1503iqi,.css-i9srcr,.css-vpzinw,.css-hdz1a3,.css-1q65fkr,.css-127i0sx,.css-ej3ubf,.css-mv0sgu,.css-qbngl8,.css-1na61gt,.css-h4qwk4,.css-14wefvy>div,.css-tzviga,.css-1e31h8y,.css-13uu85k,.css-16t5hun,.css-nnul91,.css-rt4ywx,.css-ov3mmw,.css-3zr8ne,.css-lxxesj,.css-zylli3,.css-erbxwb,.css-1dja9sh,.css-7b4wc9,.css-1xvgm7g,.css-1ta275q,.css-1ta275q>div,.css-1oqbvad,.css-44kk6u,.css-1pariuy,.css-ksdfxq,.css-b0g50k,.css-3dzt4y,.css-12tmx22,[class6="index-goodCourseCardContainer"],${appendClassStart(
    "App-root,PcContent-root,TopNavBar-root,CourseConsultation-corner,CourseConsultation-cornerButton,CornerButtonToTop-cornerButton,LearningRouteCard-pathContent,index-item,index-hoverCard,ShelfTopNav-root,ProductCard-root,NewOrderedLayout-root,Tabs-tabHeader,ButtonBar-root,WebPage-root,LearningPathWayCard-pathItem,VideoCourseList-title,Article-header,PcContent-coverFix,index-module,TopNavBar-module,PcContent-module,CourseRecord-module,Learned-module,Tab-module,PcContentBought-module,Media-module"
  )}`;
  var NAME_BACKGROUND_TRANSPARENT = `,.zhuanlan .Post-content .RichContent-actions.is-fixed,.AnnotationTag,.ProfileHeader-wrapper,.css-1ggwojn,.css-3dzt4y,.css-u4sx7k,#JIMI_SUSPENSION_SWITCH>a,#JIMI_SUSPENSION_SWITCH>a:hover,.VideoPlaceholderContainer>section,.MoreAnswers .List-headerText,.ColumnHomeTop:before,.ColumnHomeBottom,.Popover button:not(.SearchBar-askDropdownButton),.ChatUserListItem .Chat-ActionMenuPopover-Button,#root .App-main footer.css-2pfapc div,#root .App-main footer.css-2pfapc a,#root .css-ov3mmw *,#root .css-g9qnka *,#root .css-74nox5 *,#root .css-s5fc8s>.card *,.WriteIndexMain>div, .Popover-content>div,.css-ysdf4p>div`;
  var DARK_NAME_COLOR_WHITE = `.${CLASS_MESSAGE},.jimi-export-collection-box p,#JIMI_SUSPENSION_SWITCH>a,.Modal-content,.Modal-content div,.Menu-item.is-active,.Select-list button:active,.Select-list button:hover,.Popover-content button,.Modal-title,.zu-main div,.modal-dialog,.zh-profile-card div,.QuestionAnswers-answerAdd div,.QuestionAnswers-answerAdd label,.Tabs-link,.toolbar-section button,.Modal-modal-wf58 div,.Creator-mainColumn .Card div,.Comments-container div,.SettingsMain div,.KfeCollection-PayModal-modal div,.KfeCollection-CouponCard-selectLabel,.KfeCollection-CouponCard-optionItem-text,.KfeCollection-PayModal-modal-icon,.NavItemClassName,.LinkCard-title,.Creator div,.Creator span,.Modal-wrapper textarea,.EditorHelpDoc,.EditorHelpDoc div,.EditorHelpDoc h1,.FeedbackModal-title,.LiveDetailsPage-root-aLVPj div,.PostEditor-wrapper>div:last-of-type div,.PostEditor-wrapper>div:last-of-type label,.ToolsQuestion a,.ToolsQuestion font,.utils-frostedGlassEffect-2unM div,.utils-frostedGlassEffect-2unM span,.aria-primary-color-style.aria-secondary-background,.aria-primary-color-style.aria-secondary-background div,.aria-primary-color-style.aria-secondary-background h1,.aria-primary-color-style.aria-secondary-background a,.aria-primary-color-style.aria-secondary-background p,.aria-primary-color-style.aria-secondary-background h2,#feedLives div,#feedLives a,.Card-card-2K6v,.Card-card-2K6v div,.Card-card-2K6v h3,._Invite_container_30SP h2,._Invite_container_30SP h1,.ChatListGroup-SectionTitle .Zi,.Qrcode-container>div,.Qrcode-guide-message>div,.signQr-leftContainer button,.signQr-leftContainer a,.ExploreHomePage-square div,.ExploreHomePage-square a,.jsNavigable a,#TopstoryContent h2,[role="contentinfo"] div,.CreatorSalt-personalInfo-name,.ant-collapse>.ant-collapse-item>.ant-collapse-header,.ant-modal-content,.ant-modal-confirm-body .ant-modal-confirm-content,.Creator-salt-new-author-menu .Creator-salt-new-author-route .ant-menu-submenu-title:hover,.Creator-salt-author-welfare .Creator-salt-author-welfare-card h1,.CommentContent,.css-1j6g1cv > span, .css-1j6g1cv > div,blockquote,[class^="css-"],[class^="index-descInfo"],[class^="TopNavBar-tab-"] a,${appendClassStart(
    "index-title,CourseConsultation-tip,index-text,index-number,CourseDescription-playCount,LecturerList-title,LearningRouteCard-title,index-tabItemLabel,VideoCourseCard-module,TextTruncation-module"
  )}`;
  var DARK_NAME_COLOR_BLACK = `css-1x3upj1,.PlaceHolder-inner,.PlaceHolder-mask path`;
  var DARK_NAME_COLOR_LIGHT_LINK = `.jimi-zhida,.css-1esjagr,.css-ruirke,.css-117anjg a.UserLink-link,.RichContent--unescapable.is-collapsed .ContentItem-rightButton,.css-1qap1n7,.ContentItem-more,.ContentItem-title a:hover,.Profile-lightItem:hover,.Profile-lightItem:hover .Profile-lightItemValue,.css-p54aph:hover,.PushNotifications-item a:hover,.PushNotifications-item a,.NotificationList-Item-content .NotificationList-Item-link:hover,.SettingsQA a,a.QuestionMainAction:hover,.SimilarQuestions-item .Button,.CreatorSalt-IdentitySelect-Button,.signQr-leftContainer button:hover,.signQr-leftContainer a:hover,.Profile-sideColumnItemLink:hover,.FollowshipCard-link,.css-zzimsj:hover,.css-vphnkw,.css-1aqu4xd,.css-6m0nd1,.NumberBoard-item.Button:hover .NumberBoard-itemName, .NumberBoard-item.Button:hover .NumberBoard-itemValue, .NumberBoard-itema:hover .NumberBoard-itemName, .NumberBoard-itema:hover .NumberBoard-itemValue,a.external,.RichContent-EntityWord,.SideBarCollectionItem-title,.Tag-content,.LabelContainer div,.LabelContainer a,.KfeCollection-OrdinaryLabel-newStyle-mobile .KfeCollection-OrdinaryLabel-content,.KfeCollection-OrdinaryLabel-newStyle-pc .KfeCollection-OrdinaryLabel-content,.KfeCollection-CreateSaltCard-button,.KfeCollection-PcCollegeCard-searchMore,.css-15m2p8i > a:hover,#JIMI_SUSPENSION_SWITCH>a:hover`;
  var createHTMLBackgroundSetting = (domMain) => {
    const radioBackground = (name, value, background, color, label, primary) => `<label class="jimi-background-item">${`<input class="${CLASS_INPUT_CLICK}" name="${name}" type="radio" value="${value}"/><div class="jimi-background-item-div" style="background: ${primary || background};color: ${color}"></div><div class="jimi-background-item-border"></div><div class="jimi-background-item-name">${label}</div>`}</label>`;
    const themeToRadio = (o, className, color) => Object.keys(o).map((key) => radioBackground(className, key, o[key].background, color, o[key].name, o[key].primary)).join("");
    dom(".jimi-set-background", domMain).innerHTML = `<div class="jimi-form-box-item">${`<div>主题</div><div id="JIMI_BACKGROUND">${THEMES.map((i) => radioBackground(INPUT_NAME_THEME, i.value, i.background, i.color, i.label, i.background)).join("")}</div>`}</div><div class="jimi-form-box-item">${`<div>浅色主题</div><div id="JIMI_BACKGROUND_LIGHT">${themeToRadio(THEME_CONFIG_LIGHT, INPUT_NAME_ThEME_LIGHT, "#000")}</div>`}</div><div class="jimi-form-box-item">${`<div>深色主题</div><div id="JIMI_BACKGROUND_DARK">${themeToRadio(THEME_CONFIG_DARK, INPUT_NAME_THEME_DARK, "#f7f9f9")}</div>`}</div>`;
  };
  var doHighlightOriginal = async (backgroundHighlightOriginal = "", themeDark, themeLight) => "background: " + (backgroundHighlightOriginal ? `${backgroundHighlightOriginal}!important;` : await isDark() ? `${THEME_CONFIG_DARK[themeDark].background2}!important;` : +themeLight === 0 /* 默认 */ ? "rgb(251,248,241)!important;" : `${THEME_CONFIG_LIGHT[themeLight].background}!important;`);
  var BLOCK_WORDS_LIST = `#JIMI_FILTER_BLOCK_WORDS .jimi-block-words-content`;
  var BLOCK_WORDS_ANSWER = `#JIMI_FILTER_BLOCK_WORDS_CONTENT .jimi-block-words-content`;
  var NAME_BY_KEY = {
    filterKeywords: BLOCK_WORDS_LIST,
    blockWordsAnswer: BLOCK_WORDS_ANSWER
  };
  var onRemove = async (e, key) => {
    const domItem = e.target;
    if (!domItem.classList.contains("jimi-filter-word-remove")) return;
    const title = domItem.innerText;
    const config = await myStorage.getConfig();
    domItem.remove();
    myStorage.updateConfigItem(
      key,
      (config[key] || []).filter((i) => i !== title)
    );
  };
  var onAddWord = async (target, key) => {
    const word = target.value;
    const configChoose = (await myStorage.getConfig())[key];
    if (!Array.isArray(configChoose)) return;
    if (configChoose.includes(word)) {
      message("屏蔽词已存在");
      return;
    }
    configChoose.push(word);
    await myStorage.updateConfigItem(key, configChoose);
    const domItem = domC("span", { innerText: word });
    domItem.classList.add("jimi-filter-word-remove");
    const nodeFilterWords = dom(NAME_BY_KEY[key]);
    nodeFilterWords && nodeFilterWords.appendChild(domItem);
    target.value = "";
  };
  var initBlockedWords = async () => {
    const config = await myStorage.getConfig();
    const arr = [
      { domFind: dom(BLOCK_WORDS_LIST), name: "filterKeywords", domInput: dom('[name="inputBlockedWord"]') },
      { domFind: dom(BLOCK_WORDS_ANSWER), name: "blockWordsAnswer", domInput: dom('[name="inputBlockedWordAnswer"]') }
    ];
    for (let i = 0, len = arr.length; i < len; i++) {
      const { domFind, name, domInput } = arr[i];
      if (domFind) {
        const children = (config[name] || []).map((i2) => `<span class="jimi-filter-word-remove">${i2}</span>`).join("");
        domFind.innerHTML = children || "";
        domFind.onclick = (e) => onRemove(e, name);
      }
      domInput && (domInput.onchange = (e) => onAddWord(e.target, name));
    }
  };
  var myCtzTypeOperation = {
    init: function() {
      const params = new URLSearchParams(location.search);
      let jimiType = params.get("jimiType");
      this[jimiType] && this[jimiType]();
    },
    "1": function() {
      const domQuestion = dom(".QuestionPage");
      if (domQuestion && domQuestion.getAttribute("data-za-extra-module")) {
        this.clickAndClose(".QuestionButtonGroup button");
      } else {
        setTimeout(() => {
          this["1"]();
        }, 500);
      }
    },
    "2": function() {
      this.clickAndClose(".TopicActions .FollowButton");
    },
    "3": function() {
      const domQuestion = dom(".CollectionsDetailPage");
      if (domQuestion && domQuestion.getAttribute("data-za-extra-module")) {
        this.clickAndClose(".CollectionDetailPageHeader-actions .FollowButton");
      } else {
        setTimeout(() => {
          this["3"]();
        }, 500);
      }
    },
    clickAndClose: function(eventname) {
      const nodeItem = dom(eventname);
      if (nodeItem) {
        nodeItem.click();
        setTimeout(() => {
          window.close();
        }, 300);
      }
    }
  };
  var myCustomStyle = {
    init: async function() {
      const { customizeCss = "" } = await myStorage.getConfig();
      this.change(customizeCss);
    },
    change: (innerCus) => fnAppendStyle("JIMI_STYLE_CUSTOM", innerCus)
  };
  var myFollowRemove = {
    init: function() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        pathnameHasFn({
          questions: () => this.addButtons(this.classOb.questions),
          collections: () => this.addButtons(this.classOb.collections)
        });
      }, 500);
    },
    addButtons: function(initTypeOb) {
      const me = this;
      const { classNameItem, classHref, jimiType } = initTypeOb;
      if (dom(`div.PlaceHolder.${classNameItem}`)) {
        this.init();
        return;
      }
      domA(`.${classNameItem}`).forEach((item) => {
        const elementButton = domC("button", {
          className: `${me.className} ${me.classNameRemove} jimi-button-black jimi-button`,
          innerText: "移除关注",
          style: "position: absolute;right: 16px;bottom: 16px;background: transparent;"
        });
        elementButton.onclick = function() {
          const nodeThis = this;
          const nItem = domP(nodeThis, "class", classNameItem);
          const nodeHref = nItem ? nItem.querySelector(classHref) : void 0;
          const qHref = nodeHref ? nodeHref.href : "";
          if (!qHref) return;
          const nHref = qHref + `?jimiType=${jimiType}`;
          window.open(nHref);
          if (nodeThis.classList.contains(me.classNameRemove)) {
            nodeThis.innerText = "添加关注";
            nodeThis.classList.remove(me.classNameRemove);
          } else {
            nodeThis.innerText = "移除关注";
            nodeThis.classList.add(me.classNameRemove);
          }
        };
        const nodeClassName = item.querySelector(`.${me.className}`);
        nodeClassName && nodeClassName.remove();
        item.appendChild(elementButton);
      });
    },
    className: "jimi-remove-follow",
    classNameRemove: "jimi-button-red",
    classOb: {
      questions: {
        classNameItem: "List-item",
        classHref: ".QuestionItem-title a",
        jimiType: 1
      },
      topics: {
        classNameItem: "List-item",
        classHref: ".ContentItem-title .TopicLink",
        jimiType: 2
      },
      collections: {
        classNameItem: "List-item",
        classHref: ".ContentItem-title a",
        jimiType: 3
      }
    },
    timer: void 0
  };
  var HIDDEN_ITEM_COMMON = {
    key: "JIMI_HIDDEN_COMMON",
    name: "通用",
    desc: "",
    content: [
      [
        {
          label: "隐藏修改器弹出图标 ⚙︎",
          value: "hiddenOpenButton",
          css: "#JIMI_OPEN_CLOSE{display:none!important;}"
        }
      ],
      [
        {
          label: "广告",
          value: "hiddenAD",
          css: ".pc-article-answer-big-img,.pc-article-answer,.TopstoryItem--advertCard,.Pc-card,.Pc-word,.RichText-ADLinkCardContainer,.Pc-Business-Card-PcTopFeedBanner,.ZhiGoodsCard,.Pc-word-new,.Business-Card-PcRightBanner-link,.pc-article-answer-text-chain{display: none!important;}"
        }
      ],
      [
        {
          label: "隐藏选中文字后的弹窗模块",
          value: "hiddenSelectedTextPopup",
          css: ".css-fg13ww,.css-fg13ww + svg{display: none!important;}"
        }
      ],
      [
        {
          label: "LOGO",
          value: "hiddenLogo",
          css: '.ZhihuLogoLink,.TopTabNavBar-logo-3d0k,[aria-label="知乎"],.TopNavBar-logoContainer-vDhU2,.zu-top-link-logo{display: none!important;}'
        },
        {
          label: "顶部悬浮模块",
          value: "hiddenHeader",
          css: ".AppHeader,.ColumnPageHeader-Wrapper,#root .css-1g41cri{display: none!important;}.PubIndex-CategoriesHeader{top: 0!important;}"
        }
      ],
      [
        {
          label: "隐藏首页分享想法模块",
          value: "hiddenHomeWriteArea",
          css: ".Topstory-mainColumn .WriteArea{display: none}"
        },
        {
          label: "顶部菜单栏 - 关注",
          value: "hiddenHeaderFollow",
          css: '.AppHeader a[href="https://www.zhihu.com/follow"]{display:none}'
        },
        {
          label: "顶部菜单栏 - 推荐",
          value: "hiddenHeaderRecommend",
          css: '.AppHeader a[href="https://www.zhihu.com/"]{display:none}'
        },
        {
          label: "顶部菜单栏 - 热榜",
          value: "hiddenHeaderHot",
          css: '.AppHeader a[href="https://www.zhihu.com/hot"]{display:none}'
        },
        {
          label: "顶部菜单栏 - 专栏",
          value: "hiddenHeaderColumnSquare",
          css: '.AppHeader a[href="https://www.zhihu.com/column-square"]{display:none}'
        },
        {
          label: "顶部菜单栏 - 圈子",
          value: "hiddenHeaderColumnRingFeeds",
          css: '.AppHeader a[href="https://www.zhihu.com/ring-feeds"]{display:none}'
        },
        {
          label: "顶部菜单栏 - AI Works",
          value: "hiddenHeaderSquare",
          css: '.AppHeader a[href="https://www.zhihu.com/project/square"]{display:none}'
        },
        {
          label: "顶部菜单栏 - 故事",
          value: "hiddenHeaderVipWeb",
          css: '.AppHeader a[href="https://www.zhihu.com/fiore/h5/vip-web"]{display:none}'
        }
      ],
      [
        {
          label: "回答和文章中的知学堂推广商品模块",
          value: "hiddenZhihuZhiShop",
          css: ".RichText-EduCardContainer{display:none;}"
        }
      ]
    ]
  };
  var HIDDEN_ITEM_ACTION = {
    key: "JIMI_HIDDEN_ACTION",
    name: "操作栏",
    desc: "",
    content: [
      [
        {
          label: "推荐、关注列表操作栏",
          value: "hiddenItemActions",
          css: "#TopstoryContent .RichContent .ContentItem-actions:not(.is-fixed) {visibility:hidden;height:0;padding:0;}"
        },
        {
          label: "推荐、关注列表操作栏 - 底部悬浮",
          value: "hiddenItemActionsIsFixed",
          css: "#TopstoryContent .RichContent .ContentItem-actions.is-fixed{bottom: -60px!important;}"
        }
      ],
      [
        {
          label: "搜索页列表操作栏",
          value: "hiddenItemActionsSearch",
          css: "#SearchMain .RichContent .ContentItem-actions:not(.is-fixed) {visibility:hidden;height:0;}"
        },
        {
          label: "搜索页列表操作栏 - 底部悬浮",
          value: "hiddenItemActionsIsFixedSearch",
          css: "#SearchMain .RichContent .ContentItem-actions.is-fixed{bottom: -60px!important;}"
        }
      ],
      [
        {
          label: "问题页面详情操作栏",
          value: "hiddenQuestionActions",
          css: ".QuestionButtonGroup,.QuestionHeaderActions{display: none!important;}"
        },
        {
          label: "问题页面回答内容操作栏",
          value: "hiddenAnswerItemActions",
          css: ".Question-mainColumn .RichContent .ContentItem-actions:not(.is-fixed) {visibility:hidden;height:0;}"
        },
        {
          label: "问题页面回答内容操作栏 - 底部悬浮",
          value: "hiddenFixedActions",
          css: ".Question-mainColumn .RichContent .ContentItem-actions.is-fixed{bottom: -60px!important;}"
        }
      ],
      [
        {
          label: "文章页面底部悬浮操作栏",
          value: "hiddenZhuanlanActions",
          css: ".zhuanlan .RichContent-actions.is-fixed>.ContentItem-actions{display: none;}"
        }
      ],
      [
        {
          label: "收藏夹列表操作栏",
          value: "hiddenItemActionsCollection",
          css: ".CollectionsDetailPage-mainColumn .RichContent .ContentItem-actions:not(.is-fixed) {visibility:hidden;height:0;}"
        },
        {
          label: "收藏夹列表操作栏 - 底部悬浮",
          value: "hiddenItemActionsIsFixedCollection",
          css: ".CollectionsDetailPage-mainColumn .RichContent .ContentItem-actions.is-fixed{bottom: -60px!important;}"
        }
      ],
      [
        {
          label: "个人主页动态、回答、文章等操作栏",
          value: "hiddenItemActionsUser",
          css: ".Profile-mainColumn .RichContent .ContentItem-actions:not(.is-fixed) {visibility:hidden;height:0;}"
        },
        {
          label: "个人主页动态、回答、文章等操作栏 - 底部悬浮",
          value: "hiddenItemActionsIsFixedUser",
          css: ".Profile-mainColumn .RichContent .ContentItem-actions.is-fixed{bottom: -60px!important;}"
        }
      ],
      [
        {
          label: "评论「回复」按钮",
          value: "hiddenCommitReply",
          css: ".Comments-container .css-140jo2 button:first-of-type{display:none;}"
        },
        {
          label: "评论「点赞」按钮",
          value: "hiddenCommitVote",
          css: ".Comments-container .css-140jo2 button:last-of-type{display:none;}"
        },
        {
          label: "评论底部信息",
          value: "hiddenCommitBottom",
          css: ".Comments-container .css-140jo2{display:none;}"
        }
      ]
    ]
  };
  var HIDDEN_ITEM_LIST = {
    key: "JIMI_HIDDEN_LIST",
    name: "列表页面",
    desc: "只在列表中隐藏相应内容",
    content: [
      [
        {
          label: "顶部分享此刻想法",
          value: "hiddenWriteArea",
          css: ".Topstory .WriteArea{display:none;}"
        }
      ],
      [
        {
          label: "创作中心",
          value: "hiddenHomeCreatorEntrance",
          css: ".Topstory .css-19idom{display: none;}"
        },
        {
          label: "圈子",
          value: "hiddenHomeQuanzi",
          css: ".Card.css-18gpi2u{display:none;}"
        },
        {
          label: "盐选作者平台",
          value: "hiddenYanXuanWriter",
          css: ".KfeCollection-CreateSaltCard{display:none!important;}"
        },
        {
          label: "推荐关注",
          value: "hiddenHomeRecommendFollow",
          css: ".Topstory .css-1iaxl4o{display: none;}"
        },
        {
          label: "分类圆桌",
          value: "hiddenHomeCategory",
          css: ".Topstory .GlobalSideBar-category{display: none;}"
        },
        {
          label: "更多分类（我的收藏、关注的问题等...）",
          value: "hiddenHomeCategoryMore",
          css: '.Topstory .Card[aria-label="更多分类入口"]{display:none;}'
        },
        {
          label: "知乎指南",
          value: "hiddenHomeFooter",
          css: ".Topstory .Footer,.Topstory footer{display: none;}"
        },
        {
          label: "大家都在搜",
          value: "hiddenHomeHotSearch",
          css: ".Topstory .HotSearchCard{display: none;}"
        },
        {
          label: "付费咨询",
          value: "hiddenHomePayAsk",
          css: ".Topstory .css-1dyj6jm{display:none;}"
        }
      ],
      [
        {
          label: "列表切换模块",
          value: "hiddenHomeListTab",
          css: ".Topstory-container .TopstoryTabs{display: none}"
        },
        {
          label: "列表切换 - 关注",
          value: "hiddenHomeListTabFollow",
          css: '.Topstory-container .TopstoryTabs [aria-controls="Topstory-follow"]{display: none}'
        },
        {
          label: "列表切换 - 推荐",
          value: "hiddenHomeListTabRecommend",
          css: '.Topstory-container .TopstoryTabs [aria-controls="Topstory-recommend"]{display: none}'
        },
        {
          label: "列表切换 - 热榜",
          value: "hiddenHomeListTabHot",
          css: '.Topstory-container .TopstoryTabs [aria-controls="Topstory-hot"]{display: none}'
        },
        {
          label: "列表切换 - 视频",
          value: "hiddenHomeListTabVideo",
          css: '.Topstory-container .TopstoryTabs [aria-controls="Topstory-zvideo"]{display: none}'
        }
      ],
      [
        {
          label: "列表内容",
          value: "hiddenAnswers",
          css: ".Topstory-container .RichContent.is-collapsed .RichContent-inner,.HotItem-excerpt--multiLine,.TopstoryQuestionAskItem .RichContent .RichContent-inner,.HotItem-content .HotItem-excerpt,.Topstory-recommend .ZVideoItem-video, .Topstory-recommend .VideoAnswerPlayer{display: none;}"
        },
        {
          label: "列表视频",
          value: "hiddenListVideoContent",
          css: ".Topstory-recommend .ZVideoItem-video,.Topstory-recommend .VideoAnswerPlayer,.Topstory-recommend .ZVideoItem .RichContent{display: none;}"
        },
        {
          label: "列表图片",
          value: "hiddenListImg",
          css: ".RichContent-cover,.HotItem-img,.TopstoryItem .RichContent.is-collapsed .Image-Wrapper-Preview{display:none!important;}.HotItem-metrics--bottom{position: initial!important;}"
        },
        {
          label: "列表阅读全文文字",
          value: "hiddenReadMoreText",
          css: ".ContentItem-more{font-size:0!important;}"
        },
        {
          label: '列表"亲自答"标签',
          value: "hiddenListAnswerInPerson",
          css: ".Topstory-mainColumn .LabelContainer{display: none;}"
        }
      ],
      [
        {
          label: "热榜排序编号",
          value: "hiddenHotItemIndex",
          css: ".HotItem-index{display: none;}.HotItem{padding: 16px!important;}"
        },
        {
          label: '热榜"新"元素',
          value: "hiddenHotItemLabel",
          css: ".HotItem-label{display: none;}"
        },
        {
          label: "热榜热度值",
          value: "hiddenHotItemMetrics",
          css: ".HotItem-content .HotItem-metrics{display: none;}"
        },
        {
          label: "热榜顶部滚动新闻",
          value: "hiddenHotTopNews",
          css: "#TopstoryContent .css-172osot{display:none;}"
        }
      ],
      [
        {
          label: "搜索栏大家都在搜",
          value: "hiddenSearchBoxTopSearch",
          css: ".Search-container .HotSearchCard{display:none;}"
        },
        {
          label: "搜索页知乎热搜",
          value: "hiddenSearchPageTopSearch",
          css: ".Search-container .TopSearch{display: none;}"
        },
        {
          label: "搜索页知乎指南",
          value: "hiddenSearchPageFooter",
          css: ".Search-container .Footer,.Search-container footer{display: none;}"
        },
        {
          label: "搜索结果知乎直达",
          value: "hiddenSearchResultZhida",
          css: ".Search-container .css-q1rdu9{display: none;}"
        }
      ]
    ]
  };
  var AnswerRightHidden = ".Question-sideColumn{display: none!important;}.Question-mainColumn{width: auto;}";
  var HIDDEN_ITEM_ANSWER = {
    key: "JIMI_HIDDEN_ANSWER",
    name: "问答页面",
    desc: "只在问答页面/回答内容中隐藏相应内容",
    content: [
      [
        {
          label: "问题话题",
          value: "hiddenQuestionTag",
          css: ".QuestionHeader-tags,.QuestionHeader .css-wmwsyx{display: none!important;}"
        },
        {
          label: "问题分享按钮",
          value: "hiddenQuestionShare",
          css: ".zhihu .QuestionHeaderActions .Popover.ShareMenu{display: none!important;}"
        },
        {
          label: '"好问题"按钮',
          value: "hiddenQuestionGoodQuestion",
          css: ".QuestionPage .QuestionHeader .GoodQuestionAction{display: none}"
        },
        {
          label: "问题添加评论按钮",
          value: "hiddenQuestionComment",
          css: ".QuestionPage .QuestionHeader .QuestionHeader-Comment{display: none}"
        },
        {
          label: '问题"..."按钮',
          value: "hiddenQuestionMore",
          css: '.QuestionPage .QuestionHeader [aria-label="更多"]{display: none;}'
        },
        {
          label: "问题专题收录标签",
          value: "hiddenQuestionSpecial",
          css: ".QuestionHeader .LabelContainer-wrapper{display: none;}"
        },
        {
          label: "问题关注按钮",
          value: "hiddenQuestionFollowing",
          css: ".QuestionHeader .FollowButton{display: none;}"
        },
        {
          label: "问题写回答按钮",
          value: "hiddenQuestionAnswer",
          css: ".QuestionHeader .FollowButton ~ button{display: none;}"
        },
        {
          label: "问题邀请回答按钮",
          value: "hiddenQuestionInvite",
          css: ".QuestionHeader .QuestionHeaderActions>button:first-child{display: none;}"
        },
        {
          label: "问题标题卡片广告和榜单",
          value: "hiddenQuestionAD",
          css: ".css-e69dqy,.Card.css-15hh8yc{display: none;}"
        },
        {
          label: "问题关注和被浏览数模块",
          value: "hiddenQuestionSide",
          css: ".QuestionHeader-side{display: none;}.QuestionHeader-main{flex: 1!important;}"
        }
      ],
      [
        {
          label: "查看全部回答按钮",
          value: "hiddenQuestionViewAll",
          css: ".Question-mainColumn .ViewAll{display:none;}"
        }
      ],
      [
        {
          label: "回答人头像",
          value: "hiddenDetailAvatar",
          css: ".AnswerItem .AuthorInfo .AuthorInfo-avatarWrapper{display: none;}.AnswerItem .AuthorInfo .AuthorInfo-content{margin-left:0!important;}"
        },
        {
          label: "回答人姓名",
          value: "hiddenDetailName",
          css: ".AnswerItem .AuthorInfo .AuthorInfo-head{display: none;}"
        },
        {
          label: "回答人简介",
          value: "hiddenDetailBadge",
          css: ".AnswerItem .AuthorInfo .AuthorInfo-detail{display: none;}"
        },
        {
          label: "回答人关注按钮",
          value: "hiddenDetailFollow",
          css: ".AnswerItem .AuthorInfo .FollowButton{display: none;}"
        },
        {
          label: "回答人下赞同数",
          value: "hiddenDetailVoters",
          css: ".AnswerItem .css-dvccr2{display: none;}"
        },
        {
          label: "回答人下方标签",
          value: "hiddenAnswerDownTags",
          css: ".css-9x8rdd{display: none;margin: 0;}"
        },
        {
          label: "回答「谢邀」标签",
          value: "hiddenThanksInvite",
          css: ".css-1l65l8l{display: none;margin: 0;}"
        }
      ],
      [
        {
          label: "回答底部发布编辑时间和IP",
          value: "hiddenAnswerItemTime",
          css: ".QuestionPage .ContentItem-time{display: none;margin: 0;}"
        },
        {
          label: "回答底部发布编辑时间（保留IP）",
          value: "hiddenAnswerItemTimeButHaveIP",
          css: ".QuestionPage .ContentItem-time>a,.RichContent .ContentItem-time>a{display: none;}.QuestionPage .ContentItem-time:empty{display: none;margin: 0;}"
        },
        {
          label: "回答底部「继续追问」模块",
          value: "hiddenAnswerKeepAsking",
          css: ".css-jghqwm{display: none!important;}"
        },
        {
          label: "回答内容「所属专栏」模块",
          value: "hiddenAnswerBelongZhuanlan",
          css: ".css-3ibr72,.css-n4rzfz{display: none!important;}"
        },
        {
          label: "回答内容赞赏按钮",
          value: "hiddenReward",
          css: ".Reward{display: none!important;}"
        },
        {
          label: "回答内容618红包链接",
          value: "hidden618HongBao",
          css: '.MCNLinkCard[data-mcn-source="淘宝"],.MCNLinkCard[data-mcn-source="京东"],.MCNLinkCard[data-mcn-source="知乎"]{display:none;}'
        },
        {
          label: "回答内容底部热评",
          value: "hiddenAnswerBottomComment",
          css: ".css-7v0dz0{display: none!important;}"
        }
      ],
      [
        {
          label: "问答页面右侧信息栏",
          value: "hiddenAnswerRightFooter",
          css: AnswerRightHidden
        },
        {
          label: "问答页面信息栏 - 关于作者",
          value: "hiddenAnswerRightFooterAnswerAuthor",
          css: ".Question-sideColumn .AnswerAuthor{display: none;}"
        },
        {
          label: "问答页面信息栏 - 被收藏次数",
          value: "hiddenAnswerRightFooterFavorites",
          css: ".Question-sideColumn .AnswerAuthor + .Card{display: none;}"
        },
        {
          label: "问答页面信息栏 - 相关问题",
          value: "hiddenAnswerRightFooterRelatedQuestions",
          css: '.Question-sideColumn [data-za-detail-view-path-module="RelatedQuestions"]{display: none;}'
        },
        {
          label: "问答页面信息栏 - 相关推荐",
          value: "hiddenAnswerRightFooterContentList",
          css: '.Question-sideColumn [data-za-detail-view-path-module="ContentList"]{display: none;}'
        },
        {
          label: "问答页面信息栏 - 知乎指南",
          value: "hiddenAnswerRightFooterFooter",
          css: ".Question-sideColumn footer{display: none;}"
        },
        {
          label: "问答页面信息栏 - 大家都在搜",
          value: "hiddenAnswerRightHotSearchCard",
          css: ".Question-sideColumn .HotSearchCard{display: none;}"
        }
      ]
    ]
  };
  var HIDDEN_ITEM_ARTICLE = {
    key: "JIMI_HIDDEN_ARTICLE",
    name: "文章专栏",
    desc: "只在文章页面/文章内容中隐藏相应内容",
    content: [
      [
        {
          label: "文章关联话题",
          value: "hiddenZhuanlanTag",
          css: ".Post-topicsAndReviewer{display: none!important;}"
        },
        {
          label: "文章标题图片",
          value: "hiddenZhuanlanTitleImage",
          css: ".zhuanlan .Post-Row-Content-left-article .css-1ac3ifk{display: none!important;}"
        },
        {
          label: "文章所属专栏",
          value: "hiddenZhuanlanContributions",
          css: ".zhuanlan .PostIndex-Contributions,.zhuanlan .css-3ibr72{display: none;}"
        },
        {
          label: "推荐阅读",
          value: "hiddenZhuanlan",
          css: ".zhuanlan .Post-NormalSub{display:none;}"
        }
      ],
      [
        {
          label: "文章作者头像",
          value: "hiddenZhuanlanAvatarWrapper",
          css: ".zhuanlan .AuthorInfo-avatarWrapper{display: none;}.zhuanlan .AuthorInfo-content{margin-left:0;}"
        },
        {
          label: "文章作者姓名",
          value: "hiddenZhuanlanAuthorInfoHead",
          css: ".zhuanlan .AuthorInfo-head{display: none;}"
        },
        {
          label: "文章作者简介",
          value: "hiddenZhuanlanAuthorInfoDetail",
          css: ".zhuanlan .AuthorInfo-detail{display: none;}"
        },
        {
          label: "文章作者关注按钮",
          value: "hiddenZhuanlanFollowButton",
          css: ".zhuanlan .FollowButton{display: none;}"
        },
        {
          label: "关于作者",
          value: "hiddenZhuanlanAuthorCard",
          css: ".zhuanlan .Card.AuthorCard{display:none}"
        },
        {
          label: "大家都在搜",
          value: "hiddenZhuanlanHotSearchCard",
          css: ".zhuanlan .HotSearchCard{display:none}"
        }
      ]
    ]
  };
  var HIDDEN_ITEM_USER_HOME = {
    key: "JIMI_HIDDEN_USER_HOME",
    name: "用户主页",
    desc: "只在用户主页隐藏相应内容",
    content: [
      [
        {
          label: "用户主页付费咨询、认证和成就",
          value: "hiddenUserHomeOtherCard",
          css: ".Profile-sideColumn .Card:not(.Publications):not(.FollowshipCard){display:none;}"
        },
        {
          label: "用户主页出版作品",
          value: "hiddenUserHomePublications",
          css: ".Profile-sideColumn .Card.Publications{display:none;}"
        },
        {
          label: "用户主页创作中心",
          value: "hiddenUserHomeCreateEntrance",
          css: ".Profile-sideColumn .CreatorEntrance{display:none;}"
        },
        {
          label: "用户主页关注和关注者卡片",
          value: "hiddenUserHomeFollow",
          css: ".Profile-sideColumn .FollowshipCard{display:none;}"
        },
        {
          label: "用户主页关注的内容和赞助",
          value: "hiddenUserHomeLightList",
          css: ".Profile-sideColumn .Profile-lightList{display:none;}"
        },
        {
          label: "用户主页右侧屏蔽·举报用户、个人主页被浏览次数",
          value: "hiddenUserHomeFooterOperate",
          css: ".Profile-sideColumn .Profile-footerOperations{display:none;}"
        },
        {
          label: "用户主页知乎指南",
          value: "hiddenUserHomeFooter",
          css: ".Profile-sideColumn footer{display:none;}"
        }
      ]
    ]
  };
  var HIDDEN_ITEM_COLLECTIONS = {
    key: "JIMI_HIDDEN_USER_COLLECTIONS",
    name: "收藏夹",
    desc: "只在我的收藏夹隐藏相应内容",
    content: [
      [
        {
          label: "收藏夹创作中心",
          value: "hiddenCollectionsCreate",
          css: ".Collections-container .Card.CreatorEntrance{display:none;}"
        },
        {
          label: "收藏夹推荐关注",
          value: "hiddenCollectionsRecommendFollow",
          css: '.Collections-container [data-za-detail-view-path-module="RightSideBar"]>div:last-of-type>.Card{display:none;}'
        },
        {
          label: "收藏夹圆桌入口",
          value: "hiddenCollectionsCategory",
          css: ".Collections-container .Card.GlobalSideBar-category{display:none;}"
        },
        {
          label: "收藏夹更多分类",
          value: "hiddenCollectionsComplementary",
          css: '.Collections-container .Card[aria-label="更多分类入口"]{display:none;}'
        },
        {
          label: "收藏夹知乎指南",
          value: "hiddenCollectionsFooter",
          css: ".Collections-container footer{display:none;}"
        }
      ]
    ]
  };
  var HIDDEN_ITEM_TOPIC = {
    key: "JIMI_HIDDEN_TOPIC",
    name: "话题",
    desc: "只在话题隐藏相应内容",
    content: [
      [
        {
          label: "话题主页右侧浏览/讨论量模块",
          value: "hiddenTopicRightNumberBoard",
          css: '[data-za-detail-view-path-module="TopicItem"] .Card .NumberBoard{display:none;}'
        },
        {
          label: "话题主页右侧父子话题模块",
          value: "hiddenTopicRightParentChild",
          css: '[data-za-detail-view-path-module="TopicItem"] .Card .Card-section{display:none;}'
        },
        {
          label: "话题主页右侧知乎指南",
          value: "hiddenTopicRightFooter",
          css: '[data-za-detail-view-path-module="TopicItem"] footer{display:none;}'
        }
      ]
    ]
  };
  var HIDDEN_ARRAY = [
    HIDDEN_ITEM_COMMON,
    HIDDEN_ITEM_ACTION,
    HIDDEN_ITEM_LIST,
    HIDDEN_ITEM_ANSWER,
    HIDDEN_ITEM_ARTICLE,
    HIDDEN_ITEM_USER_HOME,
    HIDDEN_ITEM_COLLECTIONS,
    HIDDEN_ITEM_TOPIC
  ];
  var HIDDEN_ARRAY_MORE = [
    {
      keys: [
        "hiddenUserHomeOtherCard",
        "hiddenUserHomePublications",
        "hiddenUserHomeCreateEntrance",
        "hiddenUserHomeFollow",
        "hiddenUserHomeLightList",
        "hiddenUserHomeFooterOperate",
        "hiddenUserHomeFooter"
      ],
      value: ".Profile-sideColumn{display: none}"
    },
    {
      keys: ["hiddenSearchPageTopSearch", "hiddenSearchPageFooter"],
      value: ".SearchSideBar{display: none}"
    },
    {
      keys: ["hiddenHomeCreatorEntrance", "hiddenHomeRecommendFollow", "hiddenHomeCategory", "hiddenHomeCategoryMore", "hiddenHomeFooter"],
      value: ".Topstory-mainColumn{margin: 0 auto;}"
    },
    {
      keys: ["hiddenHomeListTabFollow", "hiddenHomeListTabRecommend", "hiddenHomeListTabHot", "hiddenHomeListTabVideo"],
      value: ".Topstory-container .TopstoryTabs{display: none}"
    },
    {
      keys: ["hiddenTopicRightNumberBoard", "hiddenTopicRightParentChild", "hiddenTopicRightFooter"],
      value: '[data-za-detail-view-path-module="TopicItem"]>div:nth-child(2){display: none;}'
    },
    {
      keys: ["hiddenHeaderEducationLearning", "hiddenHeaderConsult"],
      value: ".AppHeader .css-53paqb{display: none;}"
    },
    {
      keys: [
        "hiddenAnswerRightFooterAnswerAuthor",
        "hiddenAnswerRightFooterFavorites",
        "hiddenAnswerRightFooterFavorites",
        "hiddenAnswerRightFooterRelatedQuestions",
        "hiddenAnswerRightFooterContentList",
        "hiddenAnswerRightFooterFooter",
        "hiddenAnswerRightHotSearchCard"
      ],
      value: AnswerRightHidden
    }
  ];
  var appendHiddenStyle = async () => {
    const config = await myStorage.getConfig();
    let hiddenContent = "";
    HIDDEN_ARRAY.forEach((item) => {
      item.content.forEach((content) => {
        content.forEach((hiddenItem) => {
          config[hiddenItem.value] && (hiddenContent += hiddenItem.css);
        });
      });
    });
    HIDDEN_ARRAY_MORE.forEach(({ keys, value }) => {
      let trueNumber = 0;
      keys.forEach((key) => config[key] && trueNumber++);
      trueNumber === keys.length && (hiddenContent += value);
    });
    if (config.topVote) {
      hiddenContent += `.css-dvccr2{display: none!important;}`;
    }
    fnAppendStyle("JIMI_STYLE_HIDDEN", hiddenContent);
  };
  var createHTMLHiddenConfig = (domMain) => {
    dom("#JIMI_HIDDEN", domMain).innerHTML = HIDDEN_ARRAY.map(
      (item, index2) => (item.name ? `<div class="jimi-title">${item.name}<span>${item.desc}</span></div>` : "") + createHTMLFormBoxSwitch(item.content)
    ).join("");
  };
  var callbackGIF = async (mutationsList) => {
    const target = mutationsList[0].target;
    const targetClassList = target.classList;
    const { showGIFinDialog } = await myStorage.getConfig();
    if (!(targetClassList.contains("isPlaying") && !targetClassList.contains("css-1isopsn") && showGIFinDialog)) return;
    const nodeVideo = target.querySelector("video");
    const nodeImg = target.querySelector("img");
    const srcImg = nodeImg ? nodeImg.src : "";
    nodeVideo ? myPreview.open(nodeVideo.src, target, true) : myPreview.open(srcImg, target);
  };
  var observerGIF = new MutationObserver(callbackGIF);
  async function previewGIF() {
    const { showGIFinDialog } = await myStorage.getConfig();
    if (showGIFinDialog) {
      const nodeGIFs = domA(".GifPlayer:not(.jimi-processed)");
      for (let i = 0, len = nodeGIFs.length; i < len; i++) {
        const item = nodeGIFs[i];
        item.classList.add("jimi-processed");
        observerGIF.observe(item, { attributes: true, attributeFilter: ["class"] });
      }
    } else {
      observerGIF.disconnect();
    }
  }
  var formatPreviewSize = (nodeImage) => {
    const { innerWidth, innerHeight } = window;
    const DIALOG_INNER_WIDTH = 240;
    const ralWidth = +`${nodeImage.getAttribute("data-rawwidth") || nodeImage.getAttribute("width")}`;
    const ralHeight = +`${nodeImage.getAttribute("data-rawheight") || nodeImage.getAttribute("height")}`;
    const originSrc = nodeImage.getAttribute("data-original") || nodeImage.src;
    const aspectRatioWindow = innerWidth / innerHeight;
    const aspectRatioImage = ralWidth / ralHeight;
    let scaleY = 1;
    let finallyWidth = ralWidth;
    let finallyHeight = ralHeight;
    if (ralHeight >= innerHeight && ralWidth < innerWidth) {
      finallyHeight = innerHeight;
      scaleY = ralHeight / innerHeight;
      finallyWidth = innerHeight * aspectRatioImage;
    }
    if (ralHeight >= innerHeight && ralWidth >= innerWidth) {
      if (aspectRatioImage > aspectRatioWindow) {
        finallyWidth = innerWidth;
        finallyHeight = finallyWidth / aspectRatioImage;
        scaleY = finallyHeight / ralHeight;
      } else {
        finallyHeight = innerHeight;
        scaleY = ralHeight / innerHeight;
        finallyWidth = innerHeight * aspectRatioImage;
      }
    }
    if (ralHeight < innerHeight && ralWidth >= innerWidth) {
      finallyWidth = innerWidth;
      finallyHeight = finallyWidth / aspectRatioImage;
      scaleY = finallyHeight / ralHeight;
    }
    if (ralHeight < innerHeight && ralWidth < innerWidth) {
      finallyWidth = ralWidth;
      finallyHeight = ralHeight;
      scaleY = 1;
    }
    const scaleX = finallyWidth / DIALOG_INNER_WIDTH;
    const top = document.documentElement.scrollTop + (innerHeight / 2 - finallyHeight / 2);
    const left = innerWidth / 2 - finallyWidth / 2;
    return {
      width: DIALOG_INNER_WIDTH,
      height: finallyHeight / scaleY,
      top,
      left,
      scaleX,
      scaleY
    };
  };
  var keydownNextImage = (event) => {
    const { key } = event;
    const nodeImgDialog = dom(".css-ypb3io");
    if ((key === "ArrowRight" || key === "ArrowLeft") && nodeImgDialog) {
      const src = nodeImgDialog.src;
      const nodeImage = domById("root").querySelector(`img[src="${src}"]`) || domById("root").querySelector(`img[data-original="${src}"]`);
      const nodeContentInner = domP(nodeImage, "class", "RichContent-inner") || domP(nodeImage, "class", "Post-RichTextContainer") || domP(nodeImage, "class", "QuestionRichText");
      if (nodeContentInner) {
        const images = Array.from(nodeContentInner.querySelectorAll("img"));
        const index2 = images.findIndex((i) => i.src === src || i.getAttribute("data-original") === src);
        const dialogChange = (nodeDialog, nodeImage2) => {
          const originSrc = nodeImage2.getAttribute("data-original") || nodeImage2.src;
          const { width, height, top, left, scaleX, scaleY } = formatPreviewSize(nodeImage2);
          nodeDialog.src = originSrc;
          nodeDialog.style.cssText = nodeDialog.style.cssText + `width: ${width}px;height: ${height}px;top: ${top}px;left: ${left}px;transform: translateX(0) translateY(0) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0px);will-change:unset;transform-origin: 0 0;`;
        };
        if (key === "ArrowRight" && index2 < images.length - 1) {
          dialogChange(nodeImgDialog, images[index2 + 1]);
          return;
        }
        if (key === "ArrowLeft" && index2 > 0) {
          dialogChange(nodeImgDialog, images[index2 - 1]);
          return;
        }
        if (index2 === images.length - 1) {
          message("已经是最后一张了");
          return;
        }
        if (index2 === 0) {
          message("已经是第一张了");
          return;
        }
      }
    }
  };
  var CLASS_JUST_NUMBER = "jimi-just-number";
  var timestamp = 0;
  var fnJustNumberInAction = async () => {
    const { justNumberInAction } = await myStorage.getConfig();
    if (!justNumberInAction) return;
    const nTimestamp = +/* @__PURE__ */ new Date();
    if (nTimestamp - timestamp < 500) {
      setTimeout(fnJustNumberInAction, 500);
      return;
    }
    timestamp = nTimestamp;
    const nodes = domA(`.ContentItem .ContentItem-actions:not(.${CLASS_JUST_NUMBER})`);
    nodes.forEach((item) => {
      item.classList.add(CLASS_JUST_NUMBER);
      const buttonVoteUp = item.querySelector(".VoteButton--up");
      const buttonVoteDown = item.querySelector(".VoteButton--down");
      const buttonComment = item.querySelector(".Zi--Comment") ? domP(item.querySelector(".Zi--Comment"), "class", "Button") : void 0;
      const buttonShare = item.querySelector(".Zi--Share") ? domP(item.querySelector(".Zi--Share"), "class", "Button") : void 0;
      const buttonCollection = item.querySelector(".Zi--Star") ? domP(item.querySelector(".Zi--Star"), "class", "Button") : void 0;
      const buttonLike = item.querySelector(".Zi--Heart") ? domP(item.querySelector(".Zi--Heart"), "class", "Button") : void 0;
      buttonVoteUp && (buttonVoteUp.innerHTML = (buttonVoteUp.innerHTML || "").replace(/(已)?赞同\s*/, ""));
      buttonComment && (buttonComment.innerHTML = (buttonComment.innerHTML || "").replace(/\s*(条|添加|收起)?评论/, ""));
      buttonShare && (buttonShare.innerHTML = (buttonShare.innerHTML || "").replace(/分享/, ""));
      buttonCollection && (buttonCollection.innerHTML = (buttonCollection.innerHTML || "").replace(/(取消)?收藏/, ""));
      buttonLike && (buttonLike.innerHTML = (buttonLike.innerHTML || "").replace(/喜欢/, ""));
    });
  };
  var formatCommentAuthors = (data) => {
    const { setCommentAuthors, getCommentAuthors } = store;
    const commentAuthors = [...getCommentAuthors()];
    const fnAuthor = (data2) => {
      if (!data2) return;
      data2.forEach((item) => {
        const author = item.author;
        const replyToAuthor = item.reply_to_author;
        if (author && !commentAuthors.some((i) => i.id === author.id)) {
          commentAuthors.push({
            id: author.id,
            name: author.name,
            urlToken: author.url_token
          });
        }
        if (replyToAuthor && !commentAuthors.some((i) => i.id === replyToAuthor.id)) {
          commentAuthors.push({
            id: replyToAuthor.id,
            name: replyToAuthor.name,
            urlToken: replyToAuthor.url_token
          });
        }
        if (item.child_comments) {
          fnAuthor(item.child_comments);
        }
      });
    };
    fnAuthor(data);
    setCommentAuthors(commentAuthors);
    doListenComment();
  };
  var commentMarkListen = (event) => {
    closeCommentDialog();
  };
  var doListenComment = async () => {
    const { cancelCommentAutoFocus, clickMarkCloseCommentDialog } = await myStorage.getConfig();
    if (cancelCommentAutoFocus) {
      domA(".notranslate").forEach((item) => {
        item.blur();
        const parentBox = domP(item, "class", "QuestionAnswer-content") || domP(item, "class", "List-item") || domP(item, "class", "TopstoryItem");
        parentBox && parentBox.focus();
      });
    }
    const { setCommentAuthors } = store;
    const nodeCommentInPages = domA(`.css-18ld3w0`);
    const nodeCommentDialogs = domA(`.css-16zdamy`);
    if (!nodeCommentInPages.length && !nodeCommentDialogs.length) {
      setCommentAuthors([]);
      return;
    }
    nodeCommentInPages.forEach((item) => formatComments(item));
    nodeCommentInPages.forEach((item) => formatComments(item, ".css-13445jb"));
    nodeCommentDialogs.forEach((item) => formatComments(item));
    nodeCommentDialogs.forEach((item) => formatComments(item, ".css-13445jb"));
    if (clickMarkCloseCommentDialog) {
      const nodeCommentMark = dom(".css-5ym188");
      if (nodeCommentMark) {
        nodeCommentMark.removeEventListener("click", commentMarkListen);
        nodeCommentMark.addEventListener("click", commentMarkListen);
      }
    }
  };
  var ATTR_ID = "data-id";
  var CLASS_BLOCKED_CONTENT_REPLACEMENT4 = "jimi-blocked-content-replacement";
  var BLOCKED_CONTENT_REPLACEMENT_TEXT4 = `<span class="jimi-blocked-content-replacement-text">***</span>`;
  var buttonListener = () => setTimeout(doListenComment, 500);
  var getUserIdFromPeopleLink = (href) => {
    try {
      return new URL(href, location.origin).pathname.replace(/^\/people\//, "").replace(/\/$/, "");
    } catch {
      return href.replace(/[\w\W]+\/people\//, "").replace(/[?#][\w\W]*$/, "").replace(/\/$/, "");
    }
  };
  var replaceBlockedCommentContent = (item, commentBoxClass, blockedUser, showBlockUserTagType) => {
    const commentBox = item.querySelector(commentBoxClass);
    const commentContent = commentBox && commentBox.querySelector(".CommentContent") || item.querySelector(".CommentContent");
    if (!commentContent || commentContent.classList.contains(CLASS_BLOCKED_CONTENT_REPLACEMENT4)) return;
    commentContent.innerHTML = BLOCKED_CONTENT_REPLACEMENT_TEXT4 + createBlockedUserTagHTML(showBlockUserTagType, blockedUser);
    commentContent.classList.add(CLASS_BLOCKED_CONTENT_REPLACEMENT4);
    fnLog(`已将黑名单用户的评论替换为 ***，${blockedUser.name}`);
  };
  var formatComments = async (nodeComments, commentBoxClass = ".css-jp43l4") => {
    if (!nodeComments) return;
    if (nodeComments.querySelector(".css-1t6pvna") || nodeComments.querySelector(".BounceLoading")) {
      setTimeout(() => {
        formatComments(nodeComments, commentBoxClass);
      }, 500);
      return;
    }
    const commentAuthors = store.getCommentAuthors();
    const config = await myStorage.getConfig();
    const { removeBlockUserComment, replaceBlockUserContentWithStar, showBlockUserComment, showBlockUserCommentTag, showBlockUserTagType } = config;
    const comments = nodeComments.children;
    for (let i = 0, len = comments.length; i < len; i++) {
      const item = comments[i];
      if (item.nodeName === "BUTTON") {
        item.removeEventListener("click", buttonListener);
        item.addEventListener("click", buttonListener);
        continue;
      }
      if (!item.getAttribute(ATTR_ID) || item.classList.contains(JIMI_HIDDEN_ITEM_CLASS)) continue;
      const itemUserBox = item.querySelector(`${commentBoxClass} .css-14nvvry .css-swj9d4`);
      if (!itemUserBox) continue;
      const itemCommentUsers = itemUserBox.querySelectorAll(".css-1tww9qq");
      let isHidden = false;
      let blockedUserToReplace = void 0;
      itemCommentUsers.forEach(async (userOne, index2) => {
        if (isHidden) return;
        const userLink = userOne.querySelector(".css-1gomreu a");
        if (!userLink) return;
        const userId = getUserIdFromPeopleLink(userLink.href);
        const blockedUserInfo = findBlockedUserWithType(config, userId);
        const findUser = blockedUserInfo?.user;
        const isBlocked = !!findUser;
        if (index2 === 0 && findUser) {
          if (replaceBlockUserContentWithStar) {
            blockedUserToReplace = findUser;
          } else if (removeBlockUserComment) {
            isHidden = true;
            fnLog(`已隐藏一个黑名单用户的评论，${findUser.name}`);
            return;
          }
        }
        if (userOne.querySelector(`.${CLASS_BLOCK_USER_BOX}`)) return;
        const commentUserInfo = commentAuthors.find((i2) => i2.id === userId);
        if (!commentUserInfo) return;
        const nBox = domC("div", {
          className: CLASS_BLOCK_USER_BOX,
          innerHTML: changeBlockedUsersBox(isBlocked, showBlockUserComment, showBlockUserCommentTag, showBlockUserTagType, findUser)
        });
        let currentBlockedSource = blockedUserInfo?.listType;
        let currentBlockedUser = findUser;
        nBox.onclick = async function(event) {
          const me = this;
          const target = event.target;
          if (target.classList.contains(CLASS_BTN_REMOVE_BLOCKED)) {
            if (currentBlockedSource === BLOCKED_USER_LIST_TYPE.local) {
              await removeItemAfterBlock(commentUserInfo, BLOCKED_USER_LIST_TYPE.local);
            } else {
              await removeBlockUser(commentUserInfo);
            }
            currentBlockedSource = void 0;
            currentBlockedUser = void 0;
            me.innerHTML = changeBlockedUsersBox(false, showBlockUserComment, showBlockUserCommentTag, showBlockUserTagType);
            return;
          }
          if (target.classList.contains(CLASS_BTN_ADD_BLOCKED)) {
            const listType = await addBlockUser(commentUserInfo);
            if (!listType) return;
            currentBlockedSource = listType;
            currentBlockedUser = commentUserInfo;
            me.innerHTML = changeBlockedUsersBox(true, showBlockUserComment, showBlockUserCommentTag, showBlockUserTagType, currentBlockedUser);
            return;
          }
        };
        userOne.append(nBox);
      });
      if (isHidden) {
        item.style.display = "none";
        item.classList.add(JIMI_HIDDEN_ITEM_CLASS);
        continue;
      }
      if (blockedUserToReplace) {
        replaceBlockedCommentContent(item, commentBoxClass, blockedUserToReplace, showBlockUserTagType);
      }
      formatComments(item, ".css-1kwt8l8");
    }
  };
  var closeCommentDialog = () => {
    const button = dom(`.${CLASS_ZHIHU_COMMENT_DIALOG} button[aria-label="关闭"]`);
    button && button.click();
  };
  var myListenSearchListItem = {
    initTimestamp: 0,
    retryTimer: void 0,
    init: async function() {
      const currentTime = +/* @__PURE__ */ new Date();
      if (currentTime - this.initTimestamp < 500) {
        if (!this.retryTimer) {
          this.retryTimer = setTimeout(() => {
            this.retryTimer = void 0;
            this.init();
          }, 500);
        }
        return;
      }
      this.initTimestamp = currentTime;
      const nodes = domA(`.SearchResult-Card[role="listitem"]:not(.${CLASS_LISTENED})`);
      if (!nodes.length) return;
      const { removeItemAboutVideo, removeItemAboutArticle, removeItemAboutAD, removeLessVote, lessVoteNumber = 0 } = await myStorage.getConfig();
      for (let i = 0, len = nodes.length; i < len; i++) {
        let message2 = "";
        const nodeItem = nodes[i];
        nodeItem.classList.add(CLASS_LISTENED);
        if (!nodeItem || nodeItem.classList.contains(JIMI_HIDDEN_ITEM_CLASS)) continue;
        const haveAD = removeItemAboutAD && nodeItem.querySelector(".KfeCollection-PcCollegeCard-root");
        const haveArticle = removeItemAboutArticle && nodeItem.querySelector(".ArticleItem");
        const haveVideo = removeItemAboutVideo && nodeItem.querySelector(".ZvideoItem");
        (haveAD || haveArticle || haveVideo) && (message2 = "列表种类屏蔽");
        if (removeLessVote && !message2) {
          const elementUpvote = nodeItem.querySelector(".ContentItem-actions .VoteButton--up");
          if (elementUpvote) {
            const ariaLabel = elementUpvote.getAttribute("aria-label");
            if (ariaLabel) {
              const upvoteText = ariaLabel.trim().replace(/\W+/, "");
              const upvote = upvoteText.includes("万") ? +upvoteText.replace("万", "").trim() * 1e4 : +upvoteText;
              if (upvote > -1 && upvote < lessVoteNumber) {
                message2 = `屏蔽低赞内容: ${upvote || 0}赞`;
              }
            }
          }
        }
        message2 && fnHidden(nodeItem, message2);
      }
    },
    reset: function() {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
        this.retryTimer = void 0;
      }
      domA(`.SearchResult-Card[role="listitem"].${CLASS_LISTENED}`).forEach((item) => {
        item.classList.remove(CLASS_LISTENED);
      });
    },
    restart: function() {
      this.reset();
      this.init();
    }
  };
  var initOneClickInvitation = () => {
    setTimeout(() => {
      const domInvitation = dom(".QuestionInvitation");
      if (!domInvitation || dom(".jimi-invite-once")) return;
      const nButton = domC("button", {
        className: "jimi-button jimi-invite-once",
        innerHTML: "一键邀请",
        style: "margin-left: 12px;"
      });
      nButton.onclick = () => {
        const fnToMore = () => {
          const moreAction = dom(".QuestionMainAction");
          if (moreAction) {
            moreAction.click();
            setTimeout(() => {
              fnToMore();
            }, 50);
          } else {
            fnToInviteAll();
          }
        };
        const fnToInviteAll = () => {
          const nodeInvites = domA(".QuestionInvitation .ContentItem-extra button");
          nodeInvites.forEach((item) => {
            !item.disabled && !item.classList.contains("AutoInviteItem-button--closed") && item.click();
          });
        };
        fnToMore();
      };
      const nodeTopBar = domInvitation.querySelector(".Topbar");
      nodeTopBar && nodeTopBar.appendChild(nButton);
    }, 500);
  };
  var myPageFilterSetting = {
    timeout: void 0,
    init: function() {
      clearTimeout(this.timeout);
      if (/\/settings\/filter/.test(location.pathname)) {
        this.timeout = setTimeout(() => {
          this.addHTML();
          this.init();
        }, 500);
      }
    },
    addHTML: () => {
      const nButton = domC("button", {
        className: "jimi-button",
        style: "margin-left: 12px;",
        innerHTML: "移除当前页所有屏蔽话题"
      });
      nButton.onclick = () => {
        domA(".Tag button").forEach((item) => item.click());
      };
      domA(".css-j2uawy").forEach((item) => {
        if (/已屏蔽话题/.test(item.innerText) && !item.querySelector(".jimi-button")) {
          item.appendChild(nButton);
        }
      });
    }
  };
  var myCachePageTitle = {
    value: "",
    set: function(v = "") {
      this.value = v;
    },
    get: function() {
      return this.value;
    }
  };
  var ICO_URL = {
    zhihu: "https://static.zhihu.com/heifetz/favicon.ico",
    github: "https://github.githubassets.com/pinned-octocat.svg",
    juejin: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png",
    csdn: "https://g.csdnimg.cn/static/logo/favicon32.ico",
    bilibili: "https://www.bilibili.com/favicon.ico",
    lanhu: "https://sso-cdn.lanhuapp.com/ssoweb/favicon.ico",
    yuque: "https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*vMxOQIh4KBMAAAAAAAAAAAAADvuFAQ/original",
    mailQQ: "https://mail.qq.com/zh_CN/htmledition/images/favicon/qqmail_favicon_96h.png",
    mail163: "https://mail.163.com/favicon.ico",
    weibo: "https://weibo.com/favicon.ico",
    qzone: "https://qzonestyle.gtimg.cn/aoi/img/logo/favicon.ico?max_age=31536000",
    baidu: "https://www.baidu.com/favicon.ico"
  };
  var createHTMLTitleICOChange = (nDomMain) => {
    dom("#JIMI_TITLE_ICO", nDomMain).innerHTML = Object.entries(ICO_URL).map(([key, value]) => `<label><input class="jimi-i" name="titleIco" type="radio" value="${key}" /><img src="${value}" alt="${key}"></label>`).join("");
  };
  var REGEXP_MESSAGE = /^\([^()]+\)/;
  var changeTitle = async () => {
    const { globalTitle, globalTitleRemoveMessage } = await myStorage.getConfig();
    let prevTitle = globalTitle || myCachePageTitle.get();
    if (globalTitleRemoveMessage) {
      if (REGEXP_MESSAGE.test(prevTitle)) {
        prevTitle = prevTitle.replace(REGEXP_MESSAGE, "").trim();
      }
    }
    document.title = prevTitle;
  };
  var changeICO = async () => {
    const { titleIco = "" } = await myStorage.getConfig();
    const nId = "JIMI_ICO";
    if (!ICO_URL[titleIco]) return;
    const nodeXIcon = dom('[type="image/x-icon"]');
    const nodeId = domById(nId);
    nodeXIcon && nodeXIcon.remove();
    nodeId && nodeId.remove();
    dom("head").appendChild(
      domC("link", {
        type: "image/x-icon",
        href: ICO_URL[titleIco],
        id: nId,
        rel: "icon"
      })
    );
  };
  var buttonConfirmPageTitle = async () => {
    const nodeTitle = dom('[name="globalTitle"]');
    await myStorage.updateConfigItem("globalTitle", nodeTitle ? nodeTitle.value : "");
    changeTitle();
    message("网页标题修改成功");
  };
  var buttonResetPageTitle = async () => {
    const domGlobalTitle = dom('[name="globalTitle"]');
    domGlobalTitle && (domGlobalTitle.value = myCachePageTitle.get());
    await myStorage.updateConfigItem("globalTitle", "");
    changeTitle();
    message("网页标题已还原");
  };
  var moveTimeout;
  var onMove = (name, element) => {
    element.onmousedown = async (ev) => {
      if (element.querySelector(".lock-icon").dataset.lock === "true") {
        return;
      }
      const event = window.event || ev;
      const windowW = window.innerWidth;
      const windowH = window.innerHeight;
      const eW = element.offsetWidth;
      const eH = element.offsetHeight;
      const eL = element.offsetLeft;
      const eT = element.offsetTop;
      const evX = event.clientX;
      const evY = event.clientY;
      const dx = evX - eL;
      const dy = evY - eT;
      document.onmousemove = (ev2) => {
        const eventN = window.event || ev2;
        const evNX = eventN.clientX;
        let evenLeft = 0;
        const left = evNX - dx;
        evenLeft = left <= 0 ? 0 : left >= windowW - eW ? windowW - eW : left;
        element.style.left = evenLeft + "px";
        const top = eventN.clientY - dy;
        const evenTop = top <= 0 ? 0 : top >= windowH - eH ? windowH - eH : top;
        element.style.top = evenTop + "px";
        moveTimeout && clearTimeout(moveTimeout);
        moveTimeout = setTimeout(async () => {
          clearTimeout(moveTimeout);
          await myStorage.updateConfigItem(`${name}Po`, `left: ${evenLeft}px; top: ${evenTop}px;`);
        }, 500);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      if (element.preventDefault) {
        element.preventDefault();
      } else {
        return false;
      }
    };
  };
  var suspensionPickupAttribute = async () => {
    const { suspensionPickUp } = await myStorage.getConfig();
    if (suspensionPickUp) {
      dom("body").setAttribute("data-suspension-pickup", "true");
    } else {
      dom("body").removeAttribute("data-suspension-pickup");
    }
    changeSizeBeforeResize();
  };
  var CONTENT_HREF = ["www.zhihu.com/question/", "zhuanlan.zhihu.com/p/", "www.zhihu.com/zvideo/"];
  var initHistoryView = async () => {
    const { href, origin, pathname } = location;
    let isContentHref = false;
    CONTENT_HREF.forEach((item) => href.includes(item) && (isContentHref = true));
    if (!isContentHref) return;
    setTimeout(async () => {
      let name = "";
      const isQuestion = href.includes("www.zhihu.com/question/");
      isQuestion && dom('.QuestionPage [itemprop="name"]') && (name = `<b style="color: #ec7259">「问题」</b>${dom('.QuestionPage [itemprop="name"]').content}`);
      href.includes("zhuanlan.zhihu.com/p/") && dom(".Post-Title") && (name = `<b style="color: #00965e">「文章」</b>${dom(".Post-Title").innerText}`);
      href.includes("www.zhihu.com/zvideo/") && dom(".ZVideo .ZVideo-title") && (name = `<b style="color: #12c2e9">「视频」</b>${dom(".ZVideo .ZVideo-title").innerText}`);
      if (!name) {
        initHistoryView();
        return;
      }
      let extra = "";
      const questionAnswerId = pathname.replace(/\/question\/\d+\/answer\//, "");
      if (isQuestion && questionAnswerId) {
        extra = ` ---- 回答: ${questionAnswerId}`;
      }
      const nA = `<a href="${origin + pathname}" target="_blank">${name + extra}</a>`;
      const { view } = await myStorage.getHistory();
      if (!view.includes(nA)) {
        view.unshift(nA);
        myStorage.updateHistoryItem("view", view);
      }
    }, 500);
  };
  var initFetchInterceptStatus = async (domMain) => {
    const { fetchInterceptStatus } = await myStorage.getConfig();
    dom("#JIMI_FETCH_STATUS", domMain).innerHTML = fetchInterceptStatus ? '<b style="color: #00bfa5;">已开启接口拦截</b>，若页面无法显示数据请尝试关闭' : '<b style="color: #d50000;">已关闭接口拦截</b>，部分功能不可用';
    if (!fetchInterceptStatus) {
      domA(".jimi-fetch-intercept", domMain).forEach((item) => {
        item.classList.add("jimi-fetch-intercept-close");
        item.querySelectorAll("input").forEach((it) => {
          it.disabled = true;
        });
        item.querySelectorAll("button").forEach((it) => {
          it.disabled = true;
        });
      });
    }
  };
  var BASIC_SHOW = [
    [
      { label: `列表 - 标题类别显示<b style="color: #ec7259">「问题」</b>`, value: "listTitleTagQuestion" },
      { label: `列表 - 标题类别显示<b style="color: #00965e">「文章」</b>`, value: "listTitleTagArticle" },
      { label: `列表 - 标题类别显示<b style="color: #12c2e9">「视频」</b>`, value: "listTitleTagVideo" },
      { label: `列表 - 标题类别显示<b style="color: #9c27b0">「想法」</b>`, value: "listTitleTagPin" },
      { label: "列表和回答 - 点击高亮边框", value: "highlightListItem" },
      { label: "列表 - 「···」按钮移动到最右侧", value: "fixedListItemMore" },
      { label: "列表 - 显示「直达问题」按钮", value: "listOutputToQuestion" }
    ],
    [
      { label: "操作栏仅显示数字和图标", value: "justNumberInAction" }
    ],
    [
      { label: "问题详情 - 替换回答顶部赞同数显示（实时显示点赞数量）", value: "topVote" },
      { label: "问题详情 - 一键获取回答链接", value: "copyAnswerLink" },
      { label: "回答和文章顶部显示「导出当前内容/回答按钮」", value: "topExportContent" }
    ],
    [
      { label: "用户主页 - 内容发布和修改时间", value: "userHomeContentTimeTop" },
      { label: "列表 - 发布和修改时间", value: "listItemCreatedAndModifiedTime" },
      { label: "问题详情 - 问题 - 发布和修改时间", value: "questionCreatedAndModifiedTime" },
      { label: "问题详情 - 回答 - 发布和修改时间", value: "answerItemCreatedAndModifiedTime" },
      { label: "文章 - 发布时间", value: "articleCreateTimeToTop" }
    ],
    [
      { label: "取消评论输入框自动聚焦", value: "cancelCommentAutoFocus" },
      { label: "键盘ESC键关闭评论弹窗", value: "keyEscCloseCommentDialog" },
      { label: "点击空白处关闭评论弹窗", value: "clickMarkCloseCommentDialog" }
    ]
  ];
  var DEFAULT_FUNCTION = [
    {
      title: "外部链接直接跳转",
      commit: "知乎里所有外部链接的重定向页面去除，点击将直接跳转到外部链接，不再打开知乎外部链接提示页面"
    },
    {
      title: "移除登录提示弹窗"
    },
    {
      title: "一键移除所有屏蔽话题，点击「话题黑名单」编辑按钮出现按钮",
      commit: '知乎<a href="https://www.zhihu.com/settings/filter" target="_blank">屏蔽页面</a>每次只显示部分内容，建议解除屏蔽后刷新页面查看是否仍然存在新的屏蔽标签'
    },
    {
      title: "视频下载",
      commit: "可下载视频内容左上角将会生成一个下载按钮，点击即可下载视频"
    },
    {
      title: "收藏夹内容导出为 PDF（需开启接口拦截）",
      commit: "点击收藏夹名称上方「导出当前页内容」按钮，可导出当前页码的收藏夹详细内容"
    },
    {
      title: "个人主页关注订阅快捷取消关注",
      commit: "由于知乎接口的限制，关注及移除只能在对应页面中进行操作，所以点击「移除关注」按钮将打开页面到对应页面，取消或关注后此页面自动关闭，如果脚本未加载请刷新页面<br>目前仅支持「我关注的问题」、「我关注的收藏」一键移除或添回关注"
    },
    {
      title: "预览静态图片键盘快捷切换",
      commit: "静态图片点击查看大图时，如果当前回答或者文章中存在多个图片，可以使用键盘方向键左右切换图片显示"
    },
    {
      title: "用户主页-回答-导出当前页回答的功能（需开启接口拦截）"
    },
    {
      title: "用户主页-文章-导出当前页文章的功能（需开启接口拦截）"
    },
    {
      title: "一键邀请",
      commit: "问题邀请用户添加一键邀请按钮，点击可邀请所有推荐用户"
    },
    {
      title: "解除禁止转载的限制",
      commit: "无视禁止转载提示强行复制"
    }
  ];
  var FILTER_LIST = [
    [{ label: "屏蔽顶部活动推广", value: "removeTopAD" }],
    [{ label: "屏蔽匿名用户提出的问题", value: "removeAnonymousQuestion", needFetch: true }],
    [
      { label: "关注列表屏蔽自己的操作", value: "removeMyOperateAtFollow" },
      { label: "关注列表过滤关注人赞同回答", value: "removeFollowVoteAnswer" },
      { label: "关注列表过滤关注人赞同文章", value: "removeFollowVoteArticle" },
      { label: "关注列表过滤关注人关注问题", value: "removeFollowFQuestion" }
    ],
    [
      { label: "列表过滤邀请回答", value: "removeItemQuestionAsk" },
      { label: "列表过滤商业推广", value: "removeItemAboutAD" },
      { label: "列表过滤文章", value: "removeItemAboutArticle" },
      { label: "列表过滤视频", value: "removeItemAboutVideo" },
      { label: "列表过滤想法", value: "removeItemAboutPin" }
    ]
  ];
  var HIGH_PERFORMANCE = [
    [
      { label: "推荐列表高性能模式", value: "highPerformanceRecommend", tooltip: "推荐列表内容最多保留50条，超出则删除之前内容" },
      { label: "回答页高性能模式", value: "highPerformanceAnswer", tooltip: "回答列表最多保留30条回答，超出则删除之前回答" }
    ]
  ];
  var initHTML = () => {
    document.body.appendChild(domC("div", { id: "JIMI_MAIN", innerHTML: INNER_HTML }));
  };
  var appendHomeLink = (domMain = document.body) => {
    const userInfo = store.getUserInfo();
    const boxToZhihu = dom(".jimi-to-zhihu", domMain);
    if (dom(".jimi-home-link") || !userInfo || !boxToZhihu) return;
    const hrefUser = userInfo.url ? userInfo.url.replace("/api/v4", "") : "";
    if (!hrefUser) return;
    boxToZhihu.appendChild(
      domC("a", {
        href: hrefUser,
        target: "_blank",
        innerText: "前往个人主页",
        className: "jimi-home-link jimi-button",
        style: "width: 100px;"
      })
    );
  };
  var FAST_TRIGGER_DELAY = 120;
  var HEAVY_TRIGGER_DELAY = 700;
  var HEAVY_MIN_INTERVAL = 1500;
  var FORCE_RESIZE_INTERVAL = 1500;
  var isFastRunning = false;
  var isFastPending = false;
  var isHeavyRunning = false;
  var isHeavyPending = false;
  var heavyTimer = void 0;
  var lastHeavyRunAt = 0;
  var lastForceResizeAt = 0;
  var wasTopstoryTiny = false;
  var hasSetSearchPlaceholder = false;
  var initResizeObserver = () => {
    const onResize = throttle(() => {
      scheduleFast();
      scheduleHeavy();
    }, FAST_TRIGGER_DELAY);
    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(document.body);
    scheduleFast();
    scheduleHeavy();
  };
  function scheduleFast() {
    if (isFastRunning) {
      isFastPending = true;
      return;
    }
    isFastRunning = true;
    runFastTasks().catch(() => void 0).finally(() => {
      isFastRunning = false;
      if (isFastPending) {
        isFastPending = false;
        scheduleFast();
      }
    });
  }
  function scheduleHeavy() {
    if (heavyTimer) return;
    const now = Date.now();
    const wait = Math.max(HEAVY_TRIGGER_DELAY, HEAVY_MIN_INTERVAL - (now - lastHeavyRunAt));
    heavyTimer = setTimeout(() => {
      heavyTimer = void 0;
      runHeavyTasks().catch(() => void 0);
    }, wait);
  }
  async function runFastTasks() {
    if (!HTML_HOOTS.includes(location.hostname)) return;
    const nodeTopStoryC = domById("TopstoryContent");
    if (isIPhoneBatchPage()) {
      // 分批计数必须等过滤完成；原作 loaded 标记可能先于 React 插入条目而被消耗。
      await processingData2(domA(`.Topstory-recommend .TopstoryItem:not(.${CLASS_LISTENED})`));
    } else if (nodeTopStoryC) {
      const heightTopStoryContent = nodeTopStoryC.offsetHeight;
      if (heightTopStoryContent < 200) {
        if (!wasTopstoryTiny) {
          myListenList.restart();
        }
        wasTopstoryTiny = true;
      } else {
        wasTopstoryTiny = false;
        myListenList.init();
      }
      if (heightTopStoryContent < window.innerHeight) {
        const now = Date.now();
        if (now - lastForceResizeAt > FORCE_RESIZE_INTERVAL) {
          lastForceResizeAt = now;
          windowResize();
        }
      }
    } else {
      wasTopstoryTiny = false;
    }
    myListenSearchListItem.init();
    myListenAnswer.init();
    myListenUserHomeList.init();
    syncIPhoneFeedBatch();
    syncIPhoneFeed();
    syncIPhoneCollapseButtons();
  }
  async function runHeavyTasks() {
    if (isHeavyRunning) {
      isHeavyPending = true;
      return;
    }
    if (!HTML_HOOTS.includes(location.hostname)) return;
    isHeavyRunning = true;
    try {
      const { hiddenSearchBoxTopSearch, globalTitle } = await myStorage.getConfig();
      lastHeavyRunAt = Date.now();
      initLinkChanger();
      previewGIF();
      initImagePreview();
      doListenComment();
      fnJustNumberInAction();
      canCopy();
      changeSizeBeforeResize();
      pathnameHasFn({
        collection: () => myCollectionExport.init()
      });
      globalTitle !== document.title && changeTitle();
      const nodeSearchBarInput = dom(".SearchBar-input input");
      if (hiddenSearchBoxTopSearch && nodeSearchBarInput && !hasSetSearchPlaceholder) {
        nodeSearchBarInput.placeholder = "";
        hasSetSearchPlaceholder = true;
      }
      if (!hiddenSearchBoxTopSearch) {
        hasSetSearchPlaceholder = false;
      }
    } finally {
      isHeavyRunning = false;
      if (isHeavyPending) {
        isHeavyPending = false;
        scheduleHeavy();
      }
    }
  }
  var initOperate = () => {
    domA(".jimi-preview").forEach((item) => {
      item.onclick = function() { myPreview.hide(this); };
    });
    initRootEvent();
  };
  var needRedirect = () => {
    const { pathname, origin } = location;
    const phoneQuestion = "/tardis/sogou/qus/";
    const phoneArt = "/tardis/zm/art/";
    if (pathname.includes(phoneQuestion)) {
      const questionId = pathname.replace(phoneQuestion, "");
      location.href = origin + "/question/" + questionId;
      return true;
    }
    if (pathname.includes(phoneArt)) {
      const questionId = pathname.replace(phoneArt, "");
      location.href = "https://zhuanlan.zhihu.com/p/" + questionId;
      return true;
    }
    return false;
  };
  (function() {
    if (needRedirect()) return;
    const T0 = performance.now();
    const { hostname, href, pathname, hash } = location;
    const { setFetchHeaders, getFetchHeaders, findRemoveRecommends, setUserAnswer, setUserArticle, setUserInfo, findRemoveAnswers, setJsInitialData } = store;
    async function onDocumentStart() {
      if (!HTML_HOOTS.includes(hostname) || window.frameElement) return;
      if (!document.head) {
        setTimeout(onDocumentStart, 100);
        return;
      }
      initIPhoneLayout();
      fixVideoAutoPlay();
      fnAppendStyle("JIMI_STYLE", INNER_CSS);
      const config = await myStorage.getConfig();
      if (config.saveHistory) initHistoryView();
      appendHiddenStyle();
      myBackground.init();
      mySize.init();
      checkThemeDarkOrLight();
      changeVideoStyle();
      dom("html").classList.add(/www\.zhihu\.com\/column/.test(href) ? "zhuanlan" : EXTRA_CLASS_HTML[hostname]);
      const { fetchInterceptStatus } = config;
      if (fetchInterceptStatus || isIPhoneBatchPage()) {
        fnLog("已开启接口拦截");
        const prevHeaders = getFetchHeaders();
        // Safari Tampermonkey 同样需要拦截页面窗口，而非脚本沙箱的 window。
        const myWindow = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
        const originFetch = myWindow.fetch.bind(myWindow);
        myWindow.fetch = (url, opt) => {
          if (shouldStopIPhoneFeedRequest(url, opt)) return Promise.resolve(new myWindow.Response(JSON.stringify({
            data: [], paging: { is_end: true, is_start: false, next: "", previous: "", totals: 0 }, fresh_text: ""
          }), { status: 200, headers: { "Content-Type": "application/json" } }));
          if (!fetchInterceptStatus) return originFetch(url, opt);
          if (opt && opt.headers) {
            setFetchHeaders({
              ...prevHeaders,
              ...opt.headers
            });
          }
          return originFetch(url, opt).then((res) => {
            interceptionResponse(res, /\/api\/v3\/feed\/topstory\/recommend/, (r) => {
              myListenList.dataLoad();
              findRemoveRecommends(r.data);
            });
            interceptionResponse(res, /\/api\/v3\/moments/, (r) => {
              cacheIPhoneFeedAuthors(r.data);
              myListenList.dataLoad();
            });
            interceptionResponse(res, /\api\/v4\/members\/[^/]+\/answers/, (r) => setUserAnswer(r.data, res.url));
            interceptionResponse(res, /\api\/v4\/members\/[^/]+\/articles/, (r) => setUserArticle(r.data, res.url));
            interceptionResponse(res, /\/api\/v4\/me\?/, (r) => {
              setUserInfo(r);
              appendHomeLink();
            });
            interceptionResponse(res, /\/api\/v4\/comment_v5/, (r) => formatCommentAuthors(r.data));
            interceptionResponse(res, /\/api\/v4\/questions\/[^/]+\/feeds/, (r) => {
              myListenAnswer.dataLoad();
              const answerTargets = r.data.map((i) => formatDataToHump(i.target));
              findRemoveAnswers(answerTargets);
            });
            interceptResponseForBlocked(res, opt);
            return res;
          });
        };
      }
      onBodyLoad();
    }
    onDocumentStart();
    const onBodyLoad = async () => {
      if (!document.body) {
        setTimeout(onBodyLoad, 100);
        return;
      }
      if (HTML_HOOTS.includes(hostname) && !window.frameElement) {
        try {
          const JsData = JSON.parse(domById("js-initialData") ? domById("js-initialData").innerText : "{}");
          setJsInitialData(JsData);
          try {
            const prevRecommend = JsData.initialState.topstory.recommend.serverPayloadOrigin.data;
            findRemoveRecommends(prevRecommend || []);
          } catch {
          }
          try {
            const prevAnswers = JsData.initialState.entities.answers;
            const answerTargets = Object.values(prevAnswers);
            cacheIPhoneFeedAuthors(answerTargets.map((target) => ({ target })));
            answerTargets.length && findRemoveAnswers(answerTargets);
          } catch {
          }
        } catch {
        }
        const { removeTopAD } = await myStorage.getConfig();
        initHTML();
        initOperate();
        myCachePageTitle.set(document.title);
        changeICO();
        changeTitle();
        suspensionPickupAttribute();
        myCustomStyle.init();
        initResizeObserver();
        myCtzTypeOperation.init();
        changeSizeBeforeResize();
        if (removeTopAD) {
          setTimeout(() => {
            mouseEventClick(dom("svg.css-1p094v5"));
          }, 300);
        }
      }
      historyToChangePathname();
      if (hostname === "zhuanlan.zhihu.com") {
        addArticleTime();
        const nodeArticle = dom(".Post-content");
        if (nodeArticle) {
          printArticle(nodeArticle);
          initVideoDownload(nodeArticle);
        }
      }
      fnLog(`加载完毕: ${Math.floor((performance.now() - T0) / 10) / 100}s；iPhone 代码预设版，无设置面板`);
    };
    const historyToChangePathname = () => {
      pathnameHasFn({
        question: () => {
          addQuestionTime();
          initOneClickInvitation();
        },
        filter: () => myPageFilterSetting.init(),
        collection: () => myCollectionExport.init(),
        following: () => myFollowRemove.init(),
        answers: () => {
          throttle(printPeopleAnswer)();
        },
        posts: () => {
          throttle(printPeopleArticles)();
        },
        people: topBlockUser,
        org: topBlockUser
      });
    };
    let prevHash = hash;
    let prevPathname = pathname;
    const changeHistory = () => {
      if (location.hash !== prevHash && prevPathname === location.pathname) return;
      prevHash = location.hash;
      prevPathname = location.pathname;
      historyToChangePathname();
      myListenList.reset();
      myListenSearchListItem.reset();
      myListenAnswer.reset();
      myListenUserHomeList.reset();
    };
    window.addEventListener("popstate", throttle(changeHistory));
    window.addEventListener("pushState", throttle(changeHistory));
    window.addEventListener("load", () => {
      const nodeSignModal = dom(".signFlowModal");
      const nodeSignClose = nodeSignModal && nodeSignModal.querySelector(".Modal-closeButton");
      nodeSignClose && nodeSignClose.click();
      if (hostname === "zhuanlan.zhihu.com") {
        setTimeout(() => {
          initVideoDownload(dom(".Post-content"));
          fnReplaceZhidaToSearch();
        }, 500);
      }
      pathnameHasFn({
        zvideo: () => {
          setTimeout(() => {
            initVideoDownload(dom(".ZVideo-mainColumn"));
          }, 500);
        }
      });
    });
    window.addEventListener(
      "scroll",
      throttle(() => {
        fnJustNumberInAction();
        canCopy();
      })
    );
    window.addEventListener("keydown", async (event) => {
      const config = await myStorage.getConfig();
      const { keyEscCloseCommentDialog } = config;
      if (event.key === "Escape") {
        if (domById(ID_EXTRA_DIALOG)?.dataset.status === "open") closeExtra();
        keyEscCloseCommentDialog && closeCommentDialog();
      }
      if (event.key === "o") {
        const currentDom = document.activeElement;
        currentDom && doReadMore(currentDom);
      }
      keydownNextImage(event);
    });
    window.addEventListener("copy", function(event) {
      eventCopy(event);
    });
    document.addEventListener("click", function(event) {
      const target = event.target;
      if (!target.classList.contains("jimi-select") && !domP(target, "class", "jimi-select")) {
        closeAllSelect();
      }
    });
  })();
})();
