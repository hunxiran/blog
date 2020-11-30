---
id: Function
title: 函数
sidebar_label: 函数
---

### 箭头函数 VS 普通函数

> An ArrowFunction does not define local bindings for arguments, super, this, or new.target. Any reference to arguments, super, this, or new.target within an Arrow Function must resolve to a binding in a lexically enclosing environment. 
>
> Typically this willbe the Function Environment of an immediately enclosing function. Even though an ArrowFunction may contain references to supersuper, the function object created in step 3 is not madeinto a method by performing MakeMethod. 
>
> An Arrow Function that references super is always contained within a non-Arrow Function and the necessary state to implement super is accessible via the scope that is captured by the function object of the Arrow Function
>
> [14.2.17  Runtime Semantics: Evaluation -- Arrow Function Definition (ES11, 2020)]