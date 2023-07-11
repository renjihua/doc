# vue项目总结

## 鼠标框选效果

[代码参考了网友\[小豪看世界\]的文章](https://www.jianshu.com/p/a551b157826f)

[查看这个演示](https://codepen.io/renjihua/pen/NWXzMRz)

![鼠标框选效果](/guide/vue-sum-up/select-area.gif)

### HTML 和 CSS 布局

┌────box────────┐\
│┌───mask──────┐│\
││ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;checkbox&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;││\
│└────────────┘│\
└──────────────┘

### :tada:继续优化
1. mask(蓝色的框) 使用`translate`替换`position`, 用`scale`替换`width`和`height`。
2. 在移动鼠标时, 为了避免卡顿, 减少重复计算, 使用 `window.cancelAnimationFrame`和`window.requestAnimationFrame`更新mask的位置和尺寸属性。


## 局部打印

- [JS实现页面打印（整体、局部）](https://www.cnblogs.com/hazzZ/p/14713075.html)
- 插件[Print.js](https://github.com/crabbly/print.js)
- 插件[jQuery PrintArea](https://github.com/RitsC/PrintArea/blob/master/js/jquery.printarea.js)
- [我封装的简易版](/guide/vue-sum-up/printArea.js)



## 方便查看项目发布时间

在`build/webpack.prod.conf.js`:

```js
var moment = require('moment')

// 当前时间作为更新版本号
const VERSION = moment().format('YYYY-MM-DD HH:mm:ss')
```

```js{4}
plugins: [
    new webpack.DefinePlugin({
        'process.env': env,
        'VERSION': '"' + VERSION + '"'
    })
]
```

在登录页显示:

```html
<div class="version">更新时间:<span id="updateTime"></span></div>
```

```js
mounted() {
    if (VERSION) {
        document.getElementById('updateTime').innerText = VERSION
    }
}
```

在`src/main.js`:

```js
console.log('项目更新时间:' + VERSION)
```


## Element UI默认配置

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 默认开启悬浮提示样式
ElementUI.TableColumn.props.showOverflowTooltip = { type: Boolean, default: true }
// 全局修改默认配置，点击空白处不能关闭弹窗
ElementUI.Dialog.props.closeOnClickModal.default = false
// 全局修改默认配置，输入框可清空
ElementUI.Input.props.clearable.default = true

Vue.use(ElementUI, { size: 'small' })
```

在`src/styles/element-ui.scss`:

```sass
/* 有些地方不显示清空按钮 */
.el-input--suffix {
  &.hide-clearable .el-input__suffix {
    display: none;
  }
  .el-input__inner {
    padding-right: 15px;
  }
  input[type=password],
  input[type=number] {
    & + .el-input__suffix {
      display: none;
    }
  }
}
```

## 避免重复点击

在`main.js`:

```js
import { throttle } from 'lodash'

// 防止按钮连续点击, 0.5s内只能点一次
ElementUI.Button.methods.handleClick = throttle(
    function(evt) {
        this.$emit('click', evt);
    },
    500,
    {
        trailing: false
    }
)
```

在`api.js`:

```js
import { throttle } from 'lodash'
export const match = throttle(
    function(data) {
        return request({
            url: '/create',
            method: 'post',
            data
        })
    },
    500,
    {
        trailing: false
    }
)
```


## el-table自动调整列宽

在宁夏六期项目`src/main.js`:
```js
import FitTable from './components/FitTable'
Vue.use(FitTable)
```

在`el-table`中添加`auto-fit-column`属性即可使用
