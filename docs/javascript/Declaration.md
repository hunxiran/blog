---
id: Declaration
title: var, let, const, hoisting
sidebar_label: 声明
--- 

## 概括




### var

`var` 声明的定义：[13.3.2Variable Statement (ES12, 2021)]

1. var 语句声明的变量作用域是正在运行的执行上下文的 VariableEnvironment。
  > A var statement declares variables that are scoped to the running execution context's VariableEnvironment. 

2. Var 变量在其包含的环境记录被**实例化时**创建，并在创建时被初始化为 **undefined**。
  > Var variables are created when their containing Environment Record is **instantiated** and are **initialized** to **undefined** when created. 

3. 在任何 VariableEnvironment 作用域中，相同的标识符(绑定) BindingIdentifier 可能出现在多个变量声明中，但是这些声明总体上只定义一个变量。
  > Within the scope of any VariableEnvironment a common BindingIdentifier may appear in more than one VariableDeclaration but those declarations collectively define **only one** variable. 

4. 变量声明 (VariableDeclaration) 和初始化器 (Initializer) 定义的变量在变量声明被**执行时**被赋值为初始化器的赋值表达式 (AssignmentExpression)，而不是在变量被**创建时**。
  > A variable defined by a VariableDeclaration with an Initializer is assigned the value of its Initializer's AssignmentExpression **when the VariableDeclaration is executed, not when the variable is created.**


从定义中可以发现，`var` 声明具有以下特点：

  - `var` 声明的变量被保存在执行上下文的 `VariableEnvironment` 插槽中。
  - `var` 声明的变量是在作用域 (Environment Record) **实例化时**创建，并初始化为 **undefined**。

    **注意：**作用域实例化是**编译阶段**完成的，除了 `var` `function` 声明外，其它声明并不会进行初始化。编译阶段与执行阶段的定义请看 [作用域](./Scope.md) 章节。

    ```js
    console.log(a);  // undefined (var 声明在执行前就已经被初始化)
    console.log(b);  // ReferenceError: Cannot access 'b' before initialization
    var a;
    let b;
    ```

  - `var` 可以多次声明同名的标识符，但实际上该标识符只会被声明一次。

    ```js
    var a;
    var a;

    let b;  
    let b;  // SyntaxError: Identifier 'b' has already been declared
    ```

  - `var` 声明的变量虽然会被提前初始化为 **undefined**，但不会提前对其进行赋值。

    ```js
    console.log(a);  // undefined
    var a = 1;
    console.log(a);  // 1
    ```

#### 巩固练习 📝

```js
var a = 1;

var a;           // 重复声明
console.log(a);  // ？

var a = 2;       // 重复声明且赋值
console.log(a);  // ？

a = 3            // 简单的赋值
console.log(a);  // ? 
```

<details>
  <summary>答案</summary>

  - 1 (因为变量只会被声明一次，所以第二次声明不起作用，a 的值自然不会被初始化为 undefined)
  - 2
  - 3

</details>


:::tips Initializer
初始化器 (Initializer) 就是等号和赋值表达式是：**= AssignmentExpression**，主要用于初始化变量的初始值。

赋值表达式包括以下几种：
  - `ConditionalExpression` 条件表达式
  - `YieldExpression`
  - `ArrowFunction`
  - `AsyncArrowFunction`
  - `LeftHandSideExpression`
:::


#### var 与全局变量

```js
(function() {						
   		var myVar = myVarCopy = 42;		
})();
	
console.log(myVar);					// ??
console.log(myVarCopy);			// ??
```




### function

与 `var` 声明类似，函数声明也具有类似变量提升 (hoisting) 的行为。

  > At the top level of a function or script, inner function declarations are treated like var declarations. 
  > 
  > [13.2.9 Static Semantics: TopLevelVarDeclaredNames]

  > **undefined** is passed for environment to indicate that a PutValue operation should be used to assign the initialization value. 
  >
  > This is the case for **var statements** and **formal parameter lists** of some non-strict functions (See 9.2.10). 
  >
  > In those cases a lexical binding is **hoisted and preinitialized** prior to evaluation of its initializer. 
  >
  > [12.1.5 Runtime Semantics: BindingInitialization]


**当函数声明与 `var` 变量声明产生命名冲突时，该如何处理呢？**

```js
console.log(k, typeof k)  // ?

var k;                    // 变量声明
console.log(k, typeof k)  // ?

function k() {}            // 函数声明
console.log(k, typeof k)   // ?

var k = 'foo';             // 变量赋值
console.log(k, typeof k)   // ?
```

对此，ECMAScript 规定，当 `var` 变量声明与函数声明或参数声明产生冲突时，后者具有更高的优先级。

  > Semantically, this step must follow the creation of the **Formal Parameter List** and **Function Declaration** properties. 
  >
  > In particular, if a declared variable has the same name as a declared function or formal parameter, the variable declaration does not disturb(影响) the existing property.
  >
  > 10.1.3 Variable Instantiation (ES3, 1999).



#### 巩固练习 📝

```js
// 参数与变量声明
function duplicateParam(a) {
	let a;  // Uncaught SyntaxError: Identifier 'a' has already been declared
}

// 赋值参数与变量声明
function variableValue(a = 1, b = a) {
	var a, b;
	console.log(a, b);  // 1 or undefined ?

	a = 2;
	console.log(a, b);  // ?
}
```



除了提前进行声明与初始化外，函数声明与 `var` 声明的另一个共同点是：**不会受块级作用域的限制**。

这么做主要是为了兼容性，因为在 ES6 之前，是没有块级作用域的。

**注意：**虽然 `var` 声明与函数声明的引用不会受到块级作用域的限制， 但是其声明与初始化依赖于作用域的实例化，只有执行上下文执行到块级语句时才会创建块级作用域，所以在这之前， 是不可以使用块级作用域中声明的变量的。

```js
console.log(a);       // undefined
console.log(foo);     // undefined

{
  b();  // 1

  var a = 1;
  let b = 2;

  function foo() {
    console.log(a);
  }
}

console.log(a);      // 1
console.log(foo);    // f foo() { console.log(a); }
console.log(b);      // ReferenceError: b is not defined
```

块级作用域中函数声明的更多解释请查看以下链接：

  > [What are the precise semantics of block-level functions in ES6? -- stackoverflow](https://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)
  >
  > [Why does block assigned value change global variable? -- stackoverflow](https://stackoverflow.com/questions/61191014/why-does-block-assigned-value-change-global-variable)
  >
  > [Does this Safari behavior break the ECMAScript specification? -- stackoverflow](https://stackoverflow.com/questions/60416842/does-this-safari-behavior-break-the-ecmascript-specification)
  >
  > [B.3.3 Block-Level Function Declarations Web Legacy Compatibility Semantics (ES12, 2021)]



#### 巩固练习

```js
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi();  // ?
```

来源：[Function in if](https://javascript.info/task/function-in-if)



### let and const

`let` 和 `const` 声明的定义：[13.3.1 Let and Const Declarations (ES12, 2021)]

1. `let` 和 `const` 声明定义的变量的作用域是运行时执行上下文的 **LexicalEnvironment** 。
  > **let** and **const** declarations define variables that are scoped to the running execution context's LexicalEnvironment. 

2. 这些变量是在包含它们的作用域 (Environment Record) 被实例化时创建的，但是在变量的 LexicalBinding 被求值之前**不能以任何方式访问它们**。
  > The variables are created when their containing Environment Record is instantiated but may not be accessed in any way until the variable's LexicalBinding is evaluated. 

3. 由 LexicalBinding 和初始化器定义的变量在对 LexicalBinding 求值时，而不是在创建变量时，被赋予初始化器的 AssignmentExpression 值。
  > A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer's AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. 
  
4. 如果 **let** 声明的 LexicalBinding 没有初始化器 (Initializer)，当解析 LexicalBinding 时，变量将被赋予 **undefined** 值。
  > If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.



#### 值传递 vs 引用传递

```js
const person = {
  name: 'Lydia',
  age: 21,
};

let city = person.city;
city = 'Amsterdam';

console.log(person);


/**
A: { name: "Lydia", age: 21 }
B: { name: "Lydia", age: 21, city: "Amsterdam" }
C: { name: "Lydia", age: 21, city: undefined }
D: "Amsterdam"
*/
```




## 总结

## 参考

> [Variable scope, closure -- javascript.info](https://javascript.info/closure#garbage-collection)
>
> [Variables and scoping --explore.js](https://exploringjs.com/es6/ch_variables.html) 
>
> [What does “use strict” do in JavaScript, and what is the reasoning behind it?](https://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it)
>
> [What is the purpose of the var keyword and when should I use it (or omit it)?](https://stackoverflow.com/questions/1470488/what-is-the-purpose-of-the-var-keyword-and-when-should-i-use-it-or-omit-it)



