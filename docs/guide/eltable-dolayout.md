### el-table doLayout

修复table动态布局以及使用fixed定位, 在来回切换路由时table会出现错行。

相关 issue:  
[https://github.com/ElemeFE/element/issues/18923](https://github.com/ElemeFE/element/issues/18923)  
[https://github.com/ElemeFE/element/issues/16359](https://github.com/ElemeFE/element/issues/16359) 

在天津区熔项目中, 访问操作记录/反切切断记录, 然后访问检验记录, 再返回反切切断记录时, "操作" 这一列出现错行的情况。这个bug会偶然出现, 并且整个项目都会出现。

目前只发现在切换页面时会出现这种bug, issue中提到table更新数据后错行的情况在项目中并没有发现。

![来回切换路由时table会出现错行](/guide/eltable-dolayout/bug-wrongline.png)

### 解决方式

使用el-table的doLayout方法。下面是element-ui官方文档描述:

| TableMethods        | 说明           |
| ------------- |:-------------:|
| doLayout      | 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法。  |

```html
<el-table ref="el-table"></el-table>
```
```js
// 生命周期钩子, 在切换路由时触发
activated() {
    this.$refs['el-table'].doLayout()
}
```

### 项目中的解决方案

项目已经有很多个页面了, 手动给每个页面加上并不现实, 简直就是地狱体验, 所以需要动点脑筋, 我联想到vue中array的响应式数据原理(在Array.prototype上覆盖了原生方法), 我决定自定义一个el-table组件, 覆盖原来的el-table组件。

#### 新定义一个组件

`src/components/MyEltable/MyEltable.vue`

```html
<!--
为什么要用这个组件来覆盖el-table?
是为了修复table动态布局以及使用fixed定位, 在来回切换路由时table会出现错行,
解决办法是, 使用el-table的doLayout方法, 重新计算table的布局

相关 issue:
https://github.com/ElemeFE/element/issues/18923
https://github.com/ElemeFE/element/issues/16359

网友建议在数据请求后重新计算布局, 但是在项目里暂时没发现请求后的布局有问题, 所以只是在路由切换时重新计算布局
-->
<template>
  <!-- 把参数和事件传递下去 -->
  <Table ref="ref-table" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template slot="append"><slot name="append"></slot></template>
  </Table>
</template>

<script>
import { Table } from 'element-ui'
export default {
  name: 'MyElTable',
  components: {
    Table
  },
  activated() {
    const data = this.$attrs.data
    if (Array.isArray(data) && data.length) {
      this.$refs['ref-table'].doLayout()
    }
  },
  methods: {
    // 把方法传递下去
    clearSelection() {
      this.$refs['ref-table'].clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs['ref-table'].toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs['ref-table'].toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs['ref-table'].toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs['ref-table'].setCurrentRow(row)
    },
    clearSort() {
      this.$refs['ref-table'].clearSort()
    },
    clearFilter(columnKey) {
      this.$refs['ref-table'].clearFilter(columnKey)
    },
    doLayout() {
      this.$refs['ref-table'].doLayout()
    },
    sort(prop, order) {
      this.$refs['ref-table'].sort(prop, order)
    }
  }
}
</script>
```

在 `src/main.js` 中引入, 放在 `Vue.use(ElementUI)` 后面。

```js
import MyElTable from '@/components/MyElTable/MyElTable'
Vue.component('el-table', MyElTable)
```

至此, 这个bug就解决了。




