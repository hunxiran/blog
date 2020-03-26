---
id: debounce_and_throttle
title: Dive into debounce and throttle function
author: hunxiran
author_url: https://github.com/hunxiran
tags: [debounce, throttle,requestAnimationFrame,RAF]
---

## Debounce

### 应用场景
- scroll events, mousemove events, keypress events(input etc).

### 简单实现
```js
const debounce = (fn, time) => {
    let timeoutId;

    return function(){
        const callFuc = fn.apply(this, arguments);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(callFuc, time);
    }
}
``` 


