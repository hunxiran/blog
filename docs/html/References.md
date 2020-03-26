---
id: references
title: HTML Element Checklist
sidebar_label: Refenrence
---

import useBaseUrl from '@docusaurus/useBaseUrl';



---
## Attributs

### Globe


### accesskey



### data-*
<details>
  <summary>Get Data-*</summary>

```js 
// jQuery
$el.data('foo');

// Native (use `getAttribute`)
el.getAttribute('data-foo');

// Native (use `dataset` if only need to support IE 11+)
el.dataset['foo'];
```

</details>


### defer | async



### disabled | readonly



### enctype



### Favicon/icon


### href="javascript:void(0) | #"



### href | src


### noopenner
- 作用及原因？



### title | alt

> [What is the purpose of the alt attribute on images](https://github.com/30-seconds/30-seconds-of-interviews/blob/3436b42781fef7427dfb6678e76e6ab5c79d4842/questions/alt-attribute.md "30 seconds of interview")


### white character | entity


---
## Elements

### `<a>`
<li class="custom-light">什么是锚点，如何实现</li>



<li class="custom-light">链接相关的伪类的触发顺序</li>




### `<checkbox>`
<li class="custom-light">可切换几种状态</li>



### `<code>` / `<pre>`



### `<!DOCTYPE html>` 
<li class="custom-light">作用是什么</li>



### `<link>`/`@import`
<li class="custom-light">简要描述它们的作用及区别 </li>


### `<link>`/`<head>`
<li class="custom-light">为什么最好将 link 放在 head 内</li>


### `<header>`/`<footer>`
- 一个页面是否可以包含多个header或footer标签？


### `sticky <footer>`
- 如何实现绝对底部？


### `<iframe>`/`<frame>`



### `<textarea>`
- 高度如何自适应？



### `<wbr>` / `<br>`


### `semantics`
> [HTML Semantics——W3CSchool](https://www.w3schools.com/html/html5_semantic_elements.asp)  
>[Section Elements in HTML5——MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Section_Elements_in_HTML5)   

 `<section>` 文档片段；表示一个相关的语义分组。 使整体更有**语义**。

 `<article>` **自包含**的内容；除了用于主要内容，还可以用于**评论**和**小部件**。  

 `<aside>` 与 **main** 元素相关，但不属于主流；例如**说明框**或**广告**。它有自己的轮廓，但不属于主体。  




### `replace element`



### `inline` `block` `void`



---
## Forms

### autocomplete 
- 如何阻止表单自动填充？



### refresh
- 为什么提交表单会刷新页面？



### onChange | onblur