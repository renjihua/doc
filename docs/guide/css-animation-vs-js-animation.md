### 当JS引擎执行时GUI线程会被挂起, 为什么css动画还在执行?

[查看这个演示](https://codepen.io/renjihua/pen/wvegeEM), 在js执行期间, 更改transform属性的css动画一直在执行, 而更改width属性的css动画和js动画停止, 答案在下面的链接中。

简单解释就是, 更改transform属性来实现动画时会避免布局和绘制，只需要合成更改。

![](/guide/css-animation-vs-js-animation/frame-no-layout-paint.jpg)

### 查看下面文章
1. [css3动画与js动画的区别](https://www.cnblogs.com/shuaishuaidejun/p/7444711.html)
2. [stick-to-compositor-only-properties-and-manage-layer-count(需翻墙)](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

