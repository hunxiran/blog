---
id: RegExp
title: Regular Expression Guide
sidebar_label: 正则表达式
---

### 1️⃣ **Syntax**

``` js
var regexp = /ab+c/i
var regexp = new RegExp(/ab+c/, 'i') // literal notation
var regexp = new RegExp('ab+c', 'i') // constructor
```

<details>
  <summary>Differences</summary>

 - 字面量语法 `//` 不支持表达式
 - 构造函数可以构建动态的正则表达式，如**字符串模板字面量**

    ``` js
    let regexp = new RegExp(`<${tag}>`)
    ```

</details>


### 2️⃣ **Flags**

- `g`  全局匹配。
- `i` 不区分大小写。
- **`m`** 支持多行匹配。
- **`y`** 表示在文本的***`确切位置`***搜索，是 `stiky` 的缩写。

    > Flag y makes regexp.exec to look exactly at position lastIndex, not before, not after it.

    ```jsx
    let str = 'let varName = "value"';

    let regexp = /\w+/y;

    regexp.lastIndex = 3;
    alert( regexp.exec(str) ); 
    // null (there's a space at position 3, not a word)

    regexp.lastIndex = 4;
    alert( regexp.exec(str) ); // varName (word at position 4)
    ```

- **`s`** 开启 **dotall** 模式，即允许点 `.` ***匹配所有字符***，包括***换行符。***

    📍 注意兼容性 [***MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll#Browser_compatibility)，***可以使用 **`[\s\S]`** 或 **`[\d\D]`** 或 **`[^]`** 替代

- **`u`** 支持全部的 **`unicode`** 字符，如 ***汉字***  等需要双字符表示的语言。
    1. 匹配 `Unicode letter`

        ```jsx
        "A ბ ㄱ".match(/**\p{L}**/gu)  // "A,ბ,ㄱ"
        ```

    2. 匹配**十六进制**值

        ```jsx
        "number: xAF".match(/**x\p{Hex_Digit}\p{Hex_Digit}**/u)  // "xAF"
        ```

    3. 匹配**象形文字**，如汉语

        ```jsx
        "Hello Привет 你好 123_456".match(/**\p{sc=Han}**/) // "你,好"
        ```

    4. 匹配**货币**符号

        ```jsx
        "Prices: $2, €1, ¥9".match(/**\p{Sc}**\d/gu) // "$2,€1,¥9"
        ```

- **Character categories**
    - Letter `L`
    - Number `N`
    - Punctuation `P`
    - Mark `M` (accents etc):
    - Symbol `S`
    - Separator `Z`
    - Other `C`

### 3️⃣ Character Classes

- `\d` – digits.
- `\D` – non-digits.
- `\s` – space symbols, tabs, newlines.
- `\S` – all but `\s`.
- `\w` – Latin letters, digits, underscore `'_'`.
- `\W` – all but `\w`.
- `.` – any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.
- `\B` - not word boundary.
- `\b` - word boundary.
    - 有三类位置可以作为单词边界
    - 示例

        ```jsx
        console.log( "Hello, Java!".match(/\bJava\b/)); // Java
        console.log( "Hello, JavaScript!".match(/\bJava\b/)); // null
        console.log( "1 23 456 78".match(/\b\d\d\b/g)); // ["23", "78"]
        console.log( "12,34,56".match(/\b\d\d\b/g)); // ["12", "34", "56"]
        ```

### 4️⃣ `^` and `$` with flag `m`

- `^$` 匹配空字符串 `""` 。
- 在多行模式下 ，`^` 会匹配换行符 `\n` 之后的位置。
- 在多行模式下 ，`$` 会匹配换行符 `\n` 之前的位置。
- 因为多行模式下，换行符之后表示***行的开始*** ，换行符之后表示***行的结束*** 。
- 但不能使用 `\n` 代替 `^` 或 `$` ，它们差异如下：

    ```jsx
    let str = `Winnie: 1
    					 Piglet: 2
    					 Eeyore: 3`;

    console.log( str.match(/\d\n/gm) ); // 1,2

    console.log(str.match(/\d$/gm));    // 1,2,3
    ```

### 5️⃣ Escaping, Special Charactes

- 特殊字符 :  `[ \ ^ $ . | ? * + ( )` 。
- 字面量语法 `//` 匹配 `/` 需要转义 ，`new RegExp()` 不需要。
- 字符串中反斜杠 `\` 加上字符表示特殊含义，如 `\n` 表示换行符。
- 因此传递 ***字符串参数***  给 `new RegExp()` 时需要使用双反斜杠 `\\` 来转义特殊字符，如 `\\d` `\\w` `\\$` `\\^` `\\*` `\\?`等。

### 6️⃣ Sets and Ranges

- `[..]` 匹配***一个*** 包含在集合里的字符。
- `[^..]` 匹配***一个*** 不包含在集合里的字符。
- 集合中匹配特殊字符的规则

### 7️⃣ Quantifies

- `{n}` 匹配 `n` 次。
- `{n,m}` 匹配至少 `n` 次，至多 `m` 次。
- `{n,}` 匹配 `n` 或以上次数。
- `*`  等同于 `{0,}`
- `+`  等同于 `{1,}`
- `?` 等同于 `{0,1}`
- 示例

    ```jsx
    "<h1> Hi! </h1>".match(/[a-z][a-z0-9]*/gi) // ["<h1>"]
    "#12345678".match( /#[a-f0-9]{6}\b/gi ) // null
    "#123456".match( /#[a-f0-9]{6}\b/gi )  // #123456
    ```

### 8️⃣ Greedy and Lazy ⭐

> [Greedy and lazy quantifiers](https://javascript.info/regexp-greedy-and-lazy)

- Greedy

    ```jsx
    let regexp = /".+"/g;

    let str = 'a "witch" and her "broom" is one';

    console.log( str.match(regexp) ); 
    // ["**witch" and her "broom**"]
    ```

- Lazy with `?`

    ```jsx
    let regexp = /".+?"/g;

    let str = 'a "witch" and her "broom" is one';

    alert( str.match(regexp) ); // [ witch, broom]
    ```

- Lazy Question ⭐

    ```jsx
    let str = '...<a href="link1" class="wrong">...<p style="" class="doc">';
    let regexp = /<a href=".*?" class="doc">/g;

    alert( str.match(regexp) );  // Wrong match!
    // <a href="**link1" class="wrong">... <p style="**" class="doc">
    ```

- Alternative `[^]` ⭐

    ```jsx
    let str1 = '<a href="link1" class="wrong">...<p style="" class="doc">';
    let str2 = '<a href="link1" class="doc">...<a href="link2" class="doc">';
    let regexp = /<a href="[^"]*" class="doc">/g;

    alert( str1.match(regexp) ); 
    // null, no matches, that's correct

    alert( str2.match(regexp) ); 
    // <a href="link1" class="doc">, <a href="link2" class="doc">
    ```

- **Test1**

    ❓ Question :  `"123 456".match(/\d+? \d+?/g) ); // ?`

    - Answer

- **Test2**

    ❓ Question : Find all HTML comments in the text.

    ```jsx
    var str = `... <!-- My -- comment
    					 test --> ..  <!----> ..
    					`;
    ```

    - Answer

- **Test3** ⭐

    ❓ Question : `Find all HTML tags with their attributes.

    ```jsx
    var str = '<> <a href="/"> <input type="radio" checked> <b>';
    ```

    - Answer

- **Test4**

    ❓ Question : search a website domain. (includes hyphen `-`)

    ```jsx
    mail.com
    users.mail.com
    smith.users.mail.com
    ```

    - Answer

        `/([\w-]\.)+\w+/g` 

    - **Test5**

        ❓ Question : regexp for time. `23:59` 

        - Answer

            `/([01]\d|2[0-3]):[0-5]\d/g`

    - **Test6**  ⭐⭐⭐

        ❓ Question : 匹配字符串中的特殊字符且保留其含义。

        ```jsx
        let str = '.. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\""';

        console.log(str) 
        // .. "test me" .. "Say \"Hello\"!" .. "\\ \""
        ```

        - Answer
            - `/"(\\.|[^"\\])*"/g`
            - `|` 的左表达式中的 `\\` 表示匹配 `\` ，随后的 `.` 表示匹配任何字符。
            - 因为特殊字符的前一个字符是反斜杠 `\` ，所以将其按普通字符处理。
            - 如 `\"Hello\"` 这里的 `"` 作为普通字符匹配而不是字符串终结符匹配。
            - 示例的结果为
             `[""test me"", ""Say \"Hello\"!"", ""\\ \"""]`

    - **Test7**

        ❓ Question : `<body ..>` 标签后插入 `<h1>Hello</h1>`

        ```jsx
        let str = `
        <html>
          <body style="height: 200px">
          ...
          </body>
        </html>
        `;
        ```

        - Answer

            ```jsx
            str = str.replace(/?<=<body.*>/, `<h1>Hello</h1>`);
            ```

    - **Test8**

        ❓ Question: 寻找正整数。

        ```jsx
        let str = "0 12 -5 123 -18";
        console.log( str.match(regexp) ); // 0, 12, 123
        ```

        - Answer

            `let regexp = /\b(?<!-)\d+\b/g`

    ### 9️⃣ Capturing Groups

    - 非全局模式 `g` 下 `match` 方法的返回值，具体含义查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)。

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ff39052-dd37-405e-beeb-1f8e82888f24/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ff39052-dd37-405e-beeb-1f8e82888f24/Untitled.png)

    - 全局模式 `g` 下 `match()` 方法的返回值。

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6f5faf9-3c3c-498b-8b6b-aa3eb05edb3a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6f5faf9-3c3c-498b-8b6b-aa3eb05edb3a/Untitled.png)

    - 想要获得详细信息可以使用 `matchAll()` 方法，返回值为可迭代对象。
        - 返回可迭代对象的原因

            Why is the method designed like that? The reason is simple – for the optimization.

            The call to matchAll does not perform the search. Instead, it returns an iterable object, without the results initially. The search is performed each time we iterate over it, e.g. in the loop.

            So, there will be found as many results as needed, not more.

            E.g. there are potentially 100 matches in the text, but in a for..of loop we found 5 of them, then decided it’s enough and make a break. Then the engine won’t spend time finding other 95 matches.

        ```jsx
        var dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;
        var str = "fasdf 2019-04-30 2020-01-01";
        /*
        	RegExpStringIterator
        		__proto__: RegExp String Iterator
        			next: ƒ next()
        			Symbol(Symbol.toStringTag): "RegExp String Iterator"
        			__proto__: Object
        */
        ```

        - 迭代对象的运用
            - `Array.from()` 将迭代对象转换为数组。
            - `for..of` 等循环语句迭代对象。
            - 析构语法获取可迭代对象的迭代值。

                ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46cb9f8d-4df1-4c5d-a64a-bce1027475e8/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46cb9f8d-4df1-4c5d-a64a-bce1027475e8/Untitled.png)

    - 未命名捕获组 `$number`

        ```jsx
        let str = "John Bull";
        let regexp = /(\w+) (\w+)/;

        alert( str.replace(regexp, '$2, $1') ); // Bull, John
        ```

    - 命名捕获组 `(?<name>)` `$<name>`

        ```jsx
        let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

        let str = "2019-10-30, 2020-01-01";

        alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
        // 30.10.2019, 01.01.2020
        ```

    - 不出现在结果数组中的捕获组 `(?:)`

    - [**Exercise — javascriptinfo**](https://javascript.info/regexp-groups#tasks)
        - MAC
        - Color Value
        - Number with negative, fraction
        - Parse arithmetic

### Backreferences in pattern

- 单引号 `'` 双引号 `"` 的成对匹配问题 ⭐

    ```jsx
    var regexp = /['"](.*?)['"]/g;
    var str = `He said: "She's the one!".`;
    console.log(str.match(regexp)) // [""she'"]
    ```

- 使用反向引用`\number` 解决引号不匹配的问题。
    - 反向引用是指引用指定捕获组的缓存值。
    - `\1` 表示*从左到右* 第一个捕获组的值，以此类推。
    - 也可以使用 `\k<name>` 引用命名捕获组。
    - **注意**：使用 `(?:)` 的捕获组不能被引用。

    ```jsx
    const regexp = /(['"])(.*?)\1/g;
    const regexp = /(?<quote>['"])(.*?)\k<quote>/g;
    ```

### Catastrophic Backtracking

- 书写不当的正则表达式可能会由于*灾难性回溯*  而导致 CPU 挂起，如 `/^(\w+\s?)*$/` 。
- 因为 `^(\w+\s?)*$` 有几种不同的组合，如 `\w+` `\w+\s` `\w+\w+` 等。

    ```jsx
    let str = "An input string that takes a long time!";
    /* 
    (input)
    (inpu)(t)
    (inp)(u)(t)
    (in)(p)(ut)
    */
    ```

- 所以应该尽可能的减少正则表达式的组合，如 `/^(\w+\s)*\w*$/` 。
- 或者使用 `lookahead` 阻止正则表达式回溯，如 `/(?=(\w+))\1/` 。

### Lookahead and lookbehind

- `X(?=Y)` 后面是 Y 时匹配 X 。
- `X(?!Y)` 后面不是 Y 时 匹配 X。
- `(?<=Y)X` 前面是 Y 时匹配 X。
- `(?<!Y)X` 前面不是 Y 时匹配 X。

### **String Methods**

- **match**

    ```jsx
    str.**match**(regexp)
    // 返回值: <Array || null>
                         
    let matchs = str.match(regexp) || []
    // 返回值为 null 时替换为 []
    ```

    - 全局模式 （即添加标识符 `g`）该方法返回由匹配值组成的数组，不包含特殊属性。

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc446ede-3f06-4945-8a97-07ff5c61ced2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dc446ede-3f06-4945-8a97-07ff5c61ced2/Untitled.png)

    - 非全局模式仅返回包含第一个匹配值的数组，具有 `groups` `index`  `input` 等特殊属性。

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/201f0020-4cf4-4459-bdf0-c25038d0dc6f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/201f0020-4cf4-4459-bdf0-c25038d0dc6f/Untitled.png)

- **replace ([Replacement** **MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Description))**

    ```jsx
    str.**replace**(regexp, **replacement**)  
    // replacement 可以包含特殊符号以表示特定的值
    ```

    1. `$&` 表示匹配值，如以下示例 `$&` 表示 `HTML`

        ```jsx
        "I love HTML".replace(/HTML/, "$& and JS.") 
        // "I love HTML and JS".
        ```

    2. **`$``** 表示匹配值之前的字符串

        ```jsx
        "I love HTML.".replace(/HTML/, "**$`**") // "I love **I love.**"
        ```

    3. **`$'`** 表示匹配值之后的字符串

        ```jsx
        "I love HTML.".replace(/HTML/, "$'")  // "I love .."
        ```

    4. **`$n`** 表示相应**捕获组**的值

        ```jsx
        "I love HTML and Node.".replace(/(HTML) and (Node)/, "$2 and $1");

        // "I love Node and HTML."
        ```

    5. **`$<name>`** 表示相应的**命名捕获组**的值

        ```jsx
        let regexp = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

        "2020-05-01".replace(regexp, '$<day>.$<month>.$<year>');

        // "01.05.2020"
        ```

    6. **`$$`** 表示 **$** 字符

        ```jsx
        "I love HTML.".replace(/HTML/, "$$")  // "I love $."
        ```