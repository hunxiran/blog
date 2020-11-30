---
id: Closure
title: 闭包
sidebar_label: 闭包
---

### 概括
本文主要阐述了以下问题：
  - 闭包的作用
  - **实践：**闭包的实现方法。


### 闭包的定义

**闭包** 这个术语给人的感觉很抽象，不同的人常常会给出不同的定义，但实际上它是一个非常具体的概念。首先我们给它一个定义，然后一步步分析为什么这么定义：
  > **闭包** 是一个函数引用。



### 闭包的作用

想要理解闭包，首先要理解闭包的作用，让我们先看一道经典的题：

```js

var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () { dir(i) };
}

data[0]();  // 3
data[1]();  // 3
data[2]();  // 3

```

这段代码实际上等同于以下代码：

```js

var data = [];
var i;

for (i = 0; i < 3; i++) {}

data[i] = function () { dir(i) };

data[0]();  // 3
data[1]();  // 3
data[2]();  // 3

```

如果熟悉 **[作用域的概念](./Scope.md)**，那么这段代码就很容易理解了。调用 `data[0]()` 时，首先在 **函数作用域** 中查找变量 `i` 的值，很显然，函数作用域中没有相关的变量，所以，它会根据 **作用域链** 查找相应的变量，最终在 **全局作用域** 中找到，此时变量 `i` 的值为 3；


想要得到预期的值，我们需要将变量 `i` 的中间值保存下来，**那么该如何保存变量的值呢？**
- 如果你熟悉 **[作用域的分类](./Scope.md)**，大概会想到以下两种作用域：
- **块级作用域**

    ```js
    var data = [];

    for (let i = 0; i < 3; i++) {
        data[i] = function() { dir(i) }; 
    }

    data[0];  // 0
    data[1];  // 1
    data[2];  // 2

    ```

- 该代码的实际效果等同于以下代码：

    ```js
    {
    var data = [];

    {
        let i = 0;
        data[i] = function () { dir(i) };
    }

    {
        let i = 1;
        data[i] = function () { dir(i) };
    }

    {
        let i = 2;
        data[i] = function () { dir(i) };
    }

    data[0]();  // 0
    data[1]();  // 1
    data[2]();  // 2

    }
    ```

- **函数作用域**

    ```js
    var data = [];
    
    for(var i = 0; i < 3; i++) {

        (function(i) {
        data[i] = function(){ dir(i) };
        })(i)

    }

    data[0]();  // 0
    data[1]();  // 1
    data[2]();  // 2
    ```


从上述例子我们可以归纳出 **闭包** 的几个特征：
- 想要保存 **‘变量’** 的某种状态（中间值）；
- 想要避免 **‘变量’** 的重复声明，如**高阶函数**；
- 想要在以后的某个时间点使用，即在**变量定义的作用域**之外的作用域中使用；

而这正是 **作用域** 赋予我们的能力：
- 外部作用域不能访问内部作用域，不用担心作用域中的值被意外修改。
- 作用域的确定与**代码调用的位置**无关。

    ```js
    var data = [];
    
    for(var i = 0; i < 3; i++) {
        data[i] = function() { dir(i) };
    }

    {
        let i = 0;
        data[0]();  // 3，作用域的范围与声明的位置有关，而与代码的调用位置无关
    }
    ```
- 函数声明时会使用内部插槽 (internal slot) `[[Environment]]` 保存当前作用域(链)。
 > [9.2.3 OrdinaryFunctionCreate (functionPrototype, ParameterList, Body, thisMode, Scope)](https://tc39.es/ecma262/#sec-ordinaryfunctioncreate)
- 唯一的例外是当使用 `new Function` 语法创建函数时，其 `[[Environment]]` 指向全局作用域。


**为什么要使用函数作用域来保存以后使用到的变量呢？**
- 因为函数方便引用和传递，而**块级作用域**等是无法传递的；

看到这里，应该明白为什么将 **闭包定义为一个函数引用** 了吧。
- 正是因为在未被释放的作用域 (如全局作用域) 中保存了 **‘函数声明’** 的引用，才延迟了垃圾收集器对该 **作用域中变量** 的回收。
- 但这也会增加一定的内存消耗，所以 **闭包** 不应过大。




### 闭包的更多解释

**最后，让我们看一下规范中与闭包相关的内容：**
-  常规函数的声明

    > Let **closure** be [OrdinaryFunctionCreate(%Function.prototype%, FormalParameters, FunctionBody, non-lexical-this, scope)](https://tc39.es/ecma262/#sec-ordinaryfunctioncreate)
    > - `%Function.prototype%` 函数原型。
    > - `FormalParameters` 形参。
    > - `FunctionBody` 函数体。
    > - `non-lexical-this` this 值。
    > - `scope` 作用域。
    > 
    > - [14.1.25 Runtime Semantics: Evaluation -- Fucntion Definition (ES11, 2020)](https://tc39.es/ecma262/#sec-function-definitions-runtime-semantics-evaluation)

- 箭头函数的声明

    > Let **closure** be OrdinaryFunctionCreate(%Function.prototype%, parameters, ConciseBody, lexical-this, scope).
    >
    > — [14.2.17  Runtime Semantics: Evaluation -- Arrow Function Definition (ES11, 2020)](https://tc39.es/ecma262/#sec-arrow-function-definitions-runtime-semantics-evaluation)


- 观察视角：闭包是一个**记住外部变量的函数实例**，且作为函数在**其它作用域中**传递和调用。

    > Observational: closure is a function instance remembering its outer variables even as that function is passed to and invoked in other scopes.
    — [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#you-dont-know-js-yet-scope--closures---2nd-edition)

- 实现视角：闭包是一个**保留声明时的作用域的函数实例**，并且在其它作用域中传递或调用。

    > Implementational: closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes. 
    >
    > — [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#you-dont-know-js-yet-scope--closures---2nd-edition)

- 在 Javascript 中，所有函数天生都是闭包。

    > A closure is a function that remembers its outer variables and can access them. in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax). — [javascript.info](https://javascript.info/closure).

- 在计算机科学文献中，函数对象和作用域（一组变量绑定）这种组合**被引用时**称为闭包。

    > This combination of a function object and a scope (a set of variable bindings) in which the function’s variables are resolved is called a closure in the computer science literature.  —  JavaScript: The Definitive Guide

- 闭包是函数和其词法环境(Lexical Environment)的组合，即可以访问 **作用域链** 上的其它变量。

    > A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time. — [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)





### 闭包的常见用例

#### 回调函数

```js
function lookupStudentRecord(studentID) {
    ajax(
        `https://some.api/student/${ studentID }`,
        function onRecord(record) {  // 嵌套在 ajax 函数中
            console.log(
                `${ record.name } (${ studentID })`
            );
        }
    );
}

lookupStudentRecord(114);
```


#### 事件
```js
function listenForClicks(btn,label) {
    btn.addEventListener("click",function onClick(){}) 
}

var submitBtn = document.getElementById("submit-btn");

listenForClicks(submitBtn,"Checkout"); // 保存 click 函数的引用
```


#### 高阶函数

<details>
    <summary>点击展开</summary>

```js
function makeSizer(size) {
    return function() {
        document.body.style.fontSize = size + 'px';
    };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);
```
</details>




#### 使用立即调用函数表达式 (IIFE) 模拟私有方法

<details>
    <summary>点击展开</summary>

```js
var counter = (function() {
    var privateCounter = 0;

    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment: function() { changeBy(1) },
        decrement: function() { changeBy(-1) },
        value: function() { return privateCounter }
    };
})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.
```
</details>


#### 部分函数

```js
// sum(a)(b) = a+b

sum(1)(2) = 3
sum(5)(-1) = 4
```

来源：[Sum with closures](https://javascript.info/task/closure-sum)


#### Independent Scope

```js
function makeCounter() {
  let count = 0;

  return function() {
    count++;
    console.log(count);
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

counter1();  // 0
counter1();  // 1

counter2();  // ?
counter2();  // ?
```

来源：[Are counters independent?](https://javascript.info/task/counter-independent)



### 闭包的由来

你可能会对 **闭包** 的称呼该兴趣，其含义主要是指查询(标识符)值的过程。
- [开始查找 -> 搜索**作用域链** -> 结束 (找到或报错)]

    > Finally, you might be wondering why closures are called that way. The reason is mostly historical. A person familiar with the computer science jargon might say that an expression like user => user.startsWith(query) has an “open binding”. In other words, it is clear from it what the user is (a parameter), but it is not clear what query is in isolation. When we say “actually, query refers to the variable declared outside”, we are “closing” that open binding. In other words, we get a closure. 
    >
    > — [a closure -- whatthefuck.is (Dan Abramov, React)](https://whatthefuck.is/closure)



### 参考

> [Closures -- MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
> 
> [Closure (computer programming) -- Wiki](https://en.wikipedia.org/wiki/Closure_(computer_programming)#Implementation_and_theory)
>
> [a closure -- whatthefuck.is (Dan Abramov, React)](https://whatthefuck.is/closure)
>
> [Chapter 7: Using Closures -- You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)


:::note
虽然 **闭包** 可以避免重复声明，但不要滥用 **闭包**，因为这会降低性能和增加内存消耗。如果不需要相互独立的函数实例，可以将重复使用的工具方法添加到 **原型上** 👇。
:::