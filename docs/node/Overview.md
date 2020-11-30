---
id: Overview
titile: Nodejs 一瞥
sidebar_label: Nodejs 概览
---

### Nodejs 特性

- 单线程。
- 异步非阻塞。
- 对熟悉 JavaScript 开发的人员友好。
- 可以提前体验新的 ECMAScipt 标准。


### Javascript 的执行

Javascript 起初是解释型（interpreted）语言，但到 2009 年，即时编译器（just in time compiler, JIT）被添加到 Firefox 3.5 中，其它浏览器引擎很快也加入了该功能以便加快 JavaScript 代码的执行速度。


#### Nodejs 退出

- ctrl + c.
- process.exit(exitCode), exitCode default to 0;
- process.exitCode.
- process.on('SIGTERM', callback)
    - `SIGKill` immediately terminate.
    - `SIGTERM` gracefully terminate.
- process.kill(process.Pid, 'SIGTERM').


#### 环境变量的访问

进程启动时会将所有环境变量保存在 process 模块的 env 属性中，可以通过 process.env.variableName 访问环境变量。


#### REPL

- 自动完成 `.tab` 。
- 输出最后一次执行的结果 `_` 。
- 常见命令：
    - `.help` 查看帮助。
    - `.editor` 编辑器模式，使命令行中的多行输入更方便。
    - `.break` 当输入多行表达式时，可以使用该命令中断后续输入，等同于 `ctrl + c` 。
    - `.load` 加载 JavaScript 文件，相对于当前工作目录。
    - `.save` 将在REPL会话中输入的所有内容保存到一个文件中(指定文件名)。
    - `.exit` 推出 REPL 模式。


#### 命令行输出

**标准输出（standard output, stdout）：**

- `console.log()`
    - `%s` 将变量格式化为字符串。
    - `%d` 将变量格式化为数字。
    - `%i` 将变量格式化为其整数部分。
    - `%o` 将变量格式化为对象。
    - `console.log('%o', Number)`
    - `console.log('My %s has %d years', 'cat', 2)`
- `console.clear()`
- `console.count`
- `console.trace()`
- `console.time()` and `console.timeEnd()`
- 使用转义序列或者工具库如 chalk 改变输出文本了的颜色。

