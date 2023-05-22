# 07-移动 Web-3-rem 适配布局

## 一 rem 适配布局概念

在不同的设备上，如果一个图形大小一样，页面就会出现拉伸效果，比例也会出现问题，解决办法其实是在大设备上等比放大、在小设备上等比缩小，PX 由于是绝对单位，即是一个实际的像素大小，要实现这种等比变化，就需要使用 JS 控制，比较麻烦。而 rem（root em）、em 都是相对大小，就可以实现这个要求：

- em：相对于当前元素的字体大小，没有则相对于父级。比如父元素的字体为 5px，子元素为 2em，则子元素的字体为 10px。
- rem：相对于 html 根元素字体大小（默认为 16px）。比如 html 设置了 `font-size=10px`，若某个非根元素设置 `width:2rem;` 换算为 px 就是 20px。

当使用 rem 作为单位时，只要 html 元素中的字体大小发生改变，那么整体的布局就会相应发生改变，其适配的核心方案是随着屏幕的变化，字体发生相应变化，界面进行等比例缩放。

rem 可以用来解决布局中一些大小问题，如：

- 传统布局、flex 布局中，文字都不能随着屏幕大小变化而变化
- 流式布局和 flex 布局主要针对宽度进行布局，高度不能很好的定义
- 在屏幕发生变化时，元素的宽高不能很好的进行等比例缩放

这里就涉及 html 标签的 font-size 大小动态设置问题：

```txt
通常会将屏幕划分为 15 等份，根据需求也可以设置为 10 等份，20 等份，用页面元素大小除以不同的 html 字体大小，会发现其比例相同：

在设计稿为 750px 时，其 html 字体的大小为：750/15=50px
在设备中为 320px 时，其 html 字体的大小为：320/15=21.33px

现在假设有一个 100*100px 的页面元素：
在 750 屏幕下，html 字体大小为 50.00px，转换为 rem：100/50.00，即：2rem*2rem，宽高比例是 1 比 1
在 320 屏幕下，rem 值上面已经写好是 2*2，但是其字体是：21.33px，实际像素 2rem 即：42.66px * 42.66px，宽高比例没变！
```

由上得出：**`rem 值` = `页面元素 px` / `html 的 font-size`**。

贴士：如果不设置字体大小，1rem=16px

## 二 rem 布局的方案

### 2.1 rem 实现方式一：js 控制

现在的核心问题就是根据屏幕自动计算 rem 的值，下面的脚本可以实现自动改变字体大小。有了该脚本，只需要将设计稿（750px）量出的像素值除以 100 即可得到 rem 的值。这里要注意，html 根元素的字体大小改变会引起一个 bug：图片与文件间距会出现变化，可以为 body 设置固定大小即可：

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  .header {
    background: #ff5555;
    height: 0.82rem;
    width: 100%;
  }
</style>

<body>
  <div class="header"></div>

  <script>
    ;(function (doc, win) {
      let docElement = doc.documentElement
      let resizeEvent =
        'orientationchange' in window ? 'orientationchange' : 'resize'

      let recalc = function () {
        let clientWidth = docElement.clientWidth
        if (!clientWidth) return

        // 设计稿基准为 750px
        if (clientWidth >= 750) {
          docElement.style.fontSize = '100px'
        } else {
          docElement.style.fontSize = 100 * (clientWidth / 750) + 'px'
        }
      }

      if (!doc.addEventListener) return
      win.addEventListener(resizeEvent, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)
  </script>
</body>
```

### 2.2 rem 适配方式二：媒体查询动态计算 font-size

不同屏幕设备上，手动动态设置 html 标签 font-size 大小步骤：

```txt
1）假设设计稿是 750px
2）假设屏幕被划分为 15 等份（也可以是 10，20）
3）每一份作为 html 字体大小，就是 50px
4）在 320px 设备上，字体大小就是 320/15=21.33px
5）以此类推，480px 设备，字体大小就是 480/15=32px

6）用页面元素大小除以不同的 html 字体大小，其比例相同，比如 750px 设计稿下：
  100*100 像素的页面，在 750px 屏幕下，就是 100/50，专为为 rem 是 2rem * 2rem 比例是 1 比 1
  320px 屏幕下，html 字体大小为 21.33，则 2rem=42.66px，此时宽高都是 42.66，比例仍然是 1 比 1

最后页面元素的 rem 值 = 页面元素的 px 值 / html 的 font-size 大小
```

常见需要配置的：

```css
html {
  font-size: 50px;
}

@media screen and (min-width: 320px) {
  html {
    font-size: 21.3333px;
  }
}

@media screen and (min-width: 360px) {
  html {
    font-size: 24px;
  }
}

/* iphone678 */
@media screen and (min-width: 375px) {
  html {
    font-size: 25px;
  }
}

/* 其他需要设置的常见屏幕：384 400 414 424 480 540 720 750 */
```

当样式繁多时，使用媒体查询引入资源可以更好的实现移动端布局：

```html
/* 针对不同的屏幕尺寸，引入不同的 css 资源 */
<link
  rel="stylesheet"
  href="./small.css"
  media="screen and (min-width:320px)"
/>
<link rel="stylesheet" href="./big.css" media="screen and (min-width:640px)" />
```

### 2.3 rem 实现方式三：vw 动态计算 font-size

vw 方式 js 控制的方式更加简单，性能更高，无需对字体大小进行控制，但是只兼容 iOS8、Android4.4 以上系统。

vw 布局是将屏幕划分为 100 份，即屏幕是： `100vw * 100vh`（也即 vw 是 1% 的屏幕宽度）：

```css
.box {
  width: 50vw;
  height: 50vh;
  background-color: yellowgreen;
}
```

换算到 750px 宽度的设计稿中就是 `750px=100vw`，即 1px 就是 `0.2666666667vw`。为了方便计算，font-size 取 100px：

```html
<style>
  html {
    font-size: 26.66666667vw; /* iPhone6是375px宽，此时在iPhone6下换算得到100px */
  }

  /* 1rem就是一个font-size大小，此时在IP6下就是100px的宽高 */
  .box {
    width: 1rem;
    height: 1rem;
    background-color: yellowgreen;
  }
</style>
```

由于 vw 布局是自己将屏幕等份划分，所以也就不再依赖与 JS 脚本、媒体查询来控制字体大小，开发更方便。但是由于 html 设置了文本大小，实际开发我们需要重设：

```css
html {
  font-size: 26.66666667vw; /* iPhone6是375px宽，此时在iPhone6下换算得到100px */
}
body {
  font-size: 1rem; /*也即在iPhone6下是 16px*/
}
.box {
  width: 1rem;
  height: 1rem;
  background-color: yellowgreen;
}
```
