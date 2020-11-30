---
id: Classic-Question
title: 经典问题
sidebar_label: 经典问题汇总
---

## Concepts

### What is CSS BEM?

> [30 seconds of interview](https://github.com/30-seconds/30-seconds-of-interviews/blob/2e78a30b53e8d6c96919c2d6b26f02c146bec776/questions/bem.md#L1)

## Layouts

### 三列布局

- `Flexbox`

```html
<div class="row">
  <div class="col-2"></div>
  <div class="col-7"></div>
  <div class="col-3"></div>
</div>
```

<details>
  <summary>Click to expand!</summary>

```css
.row {
  display: flex;
}
.col-2 {
  flex: 2;
}
.col-2 {
  flex: 7;
}
.col-2 {
  flex: 3;
}
```

</details>

## Box Sizing Module

### 固定宽高比

- `intrinsic`
- `aspect-radio`
- `padding-(bottom | top)`

## Align

### 单行居中、多行居左

- `::first-line` `text-align-last`

```css
p::first-line {
  text-align-last: center;
}
```

- `text-align` `display`

```html
<div class="content">
  <span class="text"
    >当文本的长度或包裹容器的宽度变化时实现单行居中，多行居左的显示效果</span
  >
</div>

<style>
  .content {
    text-align: center;
  }
  .text {
    display: inline-block;
    text-align: left;
  }
</style>
```

```jsx live


function AlignText(){
  const contentStyle = {textAlign: 'center'};
  const textStyle = {
    display: 'inline-block',
    textAlign: 'left'
  };
  
  return(
    <div style={contentStyle}>
      <span style={textStyle} >
        当文本的长度或包裹容器的宽度变化时实现单行居中，多行居左的显示效果(编辑文本长度查看效果)
      </span>
    </div>
  )
}
```
