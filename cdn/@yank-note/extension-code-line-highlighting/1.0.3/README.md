# Code Line Highlighting Extension

This extension allows you to highlight specific lines in code blocks within your Markdown files.

## Usage

To highlight specific lines in code blocks, you can use the following syntax in your Markdown files:

~~~md
```js {.h:1,4-6,11}
const dom = ctx.view.getViewDom()
const codeBlocks = dom?.querySelectorAll('pre > code')

const selectors = new Set<string>()

codeBlocks?.forEach((codeBlock) => {
    codeBlock.classList.forEach((className) => {
    const match = className.match(classNameReg)
    if (match) {
        const range = match[1]
        const lines = rangeParser(range)
        const styleClassName = className.replace(/([:.,])/g, '\\$1')
        lines.forEach((line) => {
            if (line > 0) {
                selectors.add(`pre > code.${styleClassName} table.hljs-ln tr:nth-child(${line}) > *`)
            }
        })
    }
})
```
~~~

This will highlight lines 1, 4 to 6, and 11 in the code block.

![](https://registry.yank-note.com/cdn/@yank-note/extension-code-line-highlighting/1.0.3/1c62ec9d-e3d8-4963-be21-dda18b26a01a.png)

You Can also use the [revealjs style](https://revealjs.com/code/#line-numbers-%26-highlights) to highlight specific lines:

~~~md
```js {data-line-numbers="1,3-5,6"}
const hello = 'Hello, World!'
const world = 'World, Hello!'
console.log(hello, world)

const greeting = `${hello} ${world}`
console.log(greeting)

console.log(greeting.toUpperCase())
```
~~~

This feature uses the [parse-numeric-range](https://github.com/euank/node-parse-numeric-range) library and you can find more syntax on their project details.
