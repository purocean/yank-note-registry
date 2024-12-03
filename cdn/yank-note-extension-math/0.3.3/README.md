# Yank Note 数学扩展

![示例 1](https://pic.superbed.cc/item/66d6af7bfcada11d374ab587.png)

![示例 2](https://pic.superbed.cc/item/66d6af7bfcada11d374ab58b.png)

![示例 3](https://pic.superbed.cc/item/66d6af7bfcada11d374ab590.png)

## 语法增强

### 定理环境

添加下列仿 LaTeX 命令

`\newtheorem{name}[shared]{text}[level]`, 新增定理环境.

- `name`, 环境名, 要求不存在且满足正则表达式 `[a-zA-Z@]+`.
- `shared`, 要共享计数器的环境, 要求存在或为空. 默认为空, 代表不共享. 若非空, 则优先于 `level`.
- `text`, 显示文本.
- `level`, 编号层级, 要求为 0-6 的整数. 默认为 0, 代表不编号.

`\begin{name}[info]`, 开始环境.

- `name`, 环境名, 要求存在. 末尾加 `*` 跳过编号.
- `info`, 附加信息.

`\end{name}`, 结束环境.

- `name`, 环境名, 要求与最近的 `\begin` 一致, 包括 `*`.

`\setcounter{name}{number}`, 设置计数器.

- `name`, 环境名, 要求存在.
- `number`, 要设置的数值, 要求是整数.

`\settheorem{name}{data}`, 设置环境属性.

- `name`, 环境名, 要求存在.
- `data`, 要设置的属性, 要求是合法的 JSON 表达式, 省略外层大括号.

若参数跨行, 则需按以下格式指定限定符, 限定符可以为空.

```latex
\command{...}{{<限定符>
...
<限定符>}}{...}
```

### ~~引用~~

~~添加引用语法~~

### ~~目录增强~~

~~支持在目录中渲染 Markdown 行内语法~~

### KaTeX 增强

渲染设置中添加 `math: 默认以行间模式渲染公式` 选项.

命令面板中添加 `math: 打开 KaTeX 配置文件` 和 ~~`math: 嵌入/移除嵌入的 KaTeX 配置`~~ 选项.

支持来自 Markdown 语法的加粗.

## 实用功能

### 标点替换

编辑器设置中添加 `标点替换` 选项卡.

命令面板中添加 `math: 替换标点符号 (Shift+Alt+F)` 选项.

## 主题样式

### 香蕉空间 [预览](https://pic.imgdb.cn/item/66d42d89d9c307b7e94bf505.png)

仿[香蕉空间](https://www.bananaspace.org/)主题, 支持暗色模式, 定理环境.

添加下列样式

| **选择器** | **效果** |
| :--: | -- |
| `.skip-number` | 跳过编号 |
| `.auto-invert` | 暗色模式下反色 |
| `h1 + p` | 署名等附加信息 |
| `table.notation` | 记号表格 |
| `ol.implies` | 蕴含列表 |

### 多彩笔记 [预览](https://pic.imgdb.cn/item/66d42d89d9c307b7e94bf400.png)

支持暗色主题, 定理环境.

添加下列样式

| **选择器** | **效果** |
| :--: | -- |
| `.skip-number` | 跳过编号 |
| `.auto-invert` | 暗色模式下反色 |
| `h1 + p` | 署名等附加信息 |
| `h2.reference + ol` | 参考文献列表 |
| `table.notation` | 记号表格 |
| `ol.implies` | 蕴含列表 |
