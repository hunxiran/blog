---
id: fundamentals
title: React Fundamentals
sidebar_label: Fundamentals
---

### Fetch Data

<li class="custom-light">如何利用 render prop component 请求数据</li>

## Basic

### `this`


### super()
- ES2015规定子类必须调用 `super()`；
- 使用 `this` 之前必须调用 `super()`；
- 将 `props` 传递给 `super()` 使构造函数能够访问 `this.props`；


### setState
#### 为什么建议传递函数而不是对象给 `setState` 
- 因为 `Props` 和 `state` 的更新可能是异步的，函数可以确保获取到最新的值；


### React 和 HTML 事件处理的区别
- HTML 的事件名称采用小写表示，而 React 采用驼峰命名；
- HTML 可以在事件中返回 `false` 阻止默认行为，而 React 要调用 `preventDefault()` ；
- 


### Comments

<details>
    <summary>click to expand</summary>

```jsx
{
  /* Comment */
}
```

</details>

### What is key

### Pass a parameter

`allow function`
`function.prototype.bind`

<details>
  <summary>Click to expand!</summary>

```jsx
<button onClick={() => this.handleClick(id)} />
<button onClick={this.handleClick.bind(this, id)} />
```

</details>

### Portal Scenarios

### Life Cycle and Phases

### when should use refs

- **作用：** 访问在 render 方法中创建的 DOM 节点或 React 元素的方法。
- **场景：**
  - 管理焦点、文本选择和媒体回放等。
  - 编程式触发动画。
  - 集成第三方 `DOM` 框架。

### Callback refs and finDOMNode()

### Performances

### Time Slice

### `Mixin` `HOC` `Hooks` `Render Props`










## Components
### Component vs Element
- **组件**可以是类或函数，以 `props` 作为输入，以 `Element Tree` 作为输出。
  - 当然组件也可以不返回元素，例如容器组件(Comtainer)或高阶组件(HOC)。
- **元素**是不可变（[immutable](https://www.yuque.com/hunxiran/kb/dsym46#jxMHd)）的简单的对象[（相对于DOM）](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree)，用于描述要呈现的**DOM节点**或**组件**。

  <details>
    <summary>示例</summary>

    ```jsx
  const Component = () => "Hello"
  const componentElement = <Component />
  const domNodeElement = <div />
    ```

  </details>

### presentational vs Container
- **presentational(即纯展示)** 组件关注的是组件的外观，一般仅通过 `Props` 接受数据，就算包括内部状态(locale state)也是关于如何展示组件外观的；
- [**容器组件**](https://www.yuque.com/hunxiran/kb/qm67st#rXqA1) 关注的是组件是如何运作的，这些组件为 **presentatinal** 组件或其它容器组件提供数据和行为，因为常用来充当数据源所以一般是 `stateful` 组件 [@react-interview](https://github.com/Pau1fitz/react-interview#what-is-the-difference-between-a-presentational-component-and-a-container-component)；


### Stateless vs Stateful

- `stateful` 和 `stateless` 组件都可以使用**类**或**函数**定义；

- `stateful` 组件依赖**内部状态**(local state)，需要 [constructor](https://reactjs.org/docs/react-component.html#constructor) 或 [useState()](https://reactjs.org/docs/hooks-state.html) 初始化状态；

- `stateful` 组件使用类声明时常用到 `this` 关键字和 [生命周期钩子](https://reactjs.org/docs/react-component.html#the-component-lifecycle)；`stateless` 由仅包含 `render()` 方法的类或使用纯函数(也叫 pretationanl 组件)声明，可以彻底避免 `this` 关键字；


### Function vs Class
- 不能直接在函数组件上使用 `ref` 属性引用组件实例，因为函数组件没有实例；


### Communication






## Redux

### How Redux Works

### Redux Asychronous

### Redux Middleware

#### redux-thunk

#### redux-saga

#### redux-observable

### Redux and Mox
