# 第三方代码与参考来源

本项目是基于已有开源脚本的衍生版本，不主张对原作者代码的原创权。核对日期：2026-09-29。

## 直接代码来源：知乎修改器

- 上游：[liuyubing233/zhihu-custom](https://github.com/liuyubing233/zhihu-custom)
- 脚本页：[Greasy Fork #423404](https://greasyfork.org/zh-CN/scripts/423404)
- 本地采用的基线：**5.21.4**，元数据署名 **lyb233**、许可 **MIT**。
- 本项目在此基线上修改，保留并复用了页面处理、配置、内容过滤、接口拦截、主题和预览等基础功能；未自动追踪上游最新版本。

## 参考项目：知乎修改器移动版

- 上游：[liuyubing233/zhihu-custom-mobile](https://github.com/liuyubing233/zhihu-custom-mobile)
- 脚本页：[Greasy Fork #488508](https://greasyfork.org/zh-CN/scripts/488508)
- 本地参考版本：**2.9.4**，元数据署名 **liuyubing**、许可 **MIT**。
- 参考移动端显示方式与隐藏 App 引导等思路；当前安装包基于上面的桌面脚本改造，不是把两份脚本同时运行。

上述版本号描述的是本项目实际采用的本地源文件，不代表上游当前最新版本。作者名按对应脚本头部保留，仓库归属可通过上方链接核对。

## 本项目的改动

维护者：**Jim / [kieran107](https://github.com/kieran107)**。

主要新增或重做：iPhone Safari 桌面网站布局、无面板代码预设、定量推荐、两行摘要、单篇展开与其他回答淡化、四胶囊操作栏、跟随主题的评论界面、原图预览处理，以及本地检查和 GitHub 更新流程。许可正文见 [LICENSE](LICENSE)，安装脚本也内附许可说明，方便单文件分发时保留署名。

两份第三方原始脚本只在维护者本地保留，不额外上传；检查程序在文件存在时验证 SHA-256，干净克隆不要求携带原文件。截图、账户浏览器状态及测试备份也不作为公开发布内容。

## 平台和内容

[Tampermonkey](https://www.tampermonkey.net/) 是运行脚本的扩展，GitHub 与 Greasy Fork 是分发平台，均不代表对本项目的背书。本项目没有加入远程 `@require` 依赖。

知乎平台、商标及用户发表的文章、图片和评论不属于本项目的代码许可范围。本项目与知乎及原作者均无官方合作或代理关系。
