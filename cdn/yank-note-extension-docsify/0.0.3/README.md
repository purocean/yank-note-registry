# Docsify 插件

> docsify 可以快速帮你生成文档网站。不同于 GitBook、Hexo 的地方是它不会生成静态的 .html 文件，所有转换工作都是在运行时。如果你想要开始使用它，只需要创建一个 index.html 就可以开始编写文档并直接部署在 GitHub Pages。


此插件可以一键配置 docsify, 快速将你的 markdown 文档树转换为 html 页面, 目前只支持以下功能:

- 自动生成侧边栏

其余功能可查看 [docsify 官方文档](https://docsify.js.org/#/zh-cn/)

## 使用方法

1. 安装并启用插件

2. 点击`工具`/`Docsify` 

![img_1.png](https://registry.yank-note.com/cdn/yank-note-extension-docsify/0.0.3/img_1.png)

![img_2.png](https://registry.yank-note.com/cdn/yank-note-extension-docsify/0.0.3/img_2.png)

首次点击生成会自动生成 3 个文件:
- README.md - 默认的文档首页
- index.html - docsify 入口, docsify 配置也在这里
- _sidebar.md - 如果勾选了 "生成侧边栏", 则会生成此文件, 此文件定义了侧边栏的内容. 插件会扫描当前仓库下的所有文件夹和 md 文件, 生成对应的侧边栏内容

后续点击生成只会覆盖 `_sidebar.md`

3. 开启一个 http 服务预览 docsify
```bash
# python2
python2 -m SimpleHTTPServer 8080
# python3
python3 -m http.server 8080

# 或者使用 docsify-cli
npm i docsify-cli -g
docsify serve .
```
