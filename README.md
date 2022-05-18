# Yank Note Extension Registry

这里是 Yank Note 扩展的注册中心，如果你想要将自己的扩展注册添加到 Yank Note 扩展集中，请参考下面的步骤：

1. 将扩展发布到 NPM 仓库中，需要注意：
  1. 包名需要以`yank-note-extension-` 开头
  2. `README.md` 中不要嵌入本地图片，需要使用网络图片，否则不能正确展示。
2. Fork 本项目
3. 编辑 `extension.json`，将自己的扩展添加到 `$.registry` 中
4. 创建一个新的 Pull Request, 并将相关说明附带上

等到 Pull Request 合并后，用户就可以在 Yank Note 中看到你的扩展了。

如果要更新扩展，需要重复上述步骤。
