### el-table-column v-if不加key时造成的奇怪问题

当有条件控制表格列的显示隐藏, 你用了 `v-if` 但是没有加 `key` 会造成显示混乱和顺序混乱的结果, 建议必须加 `key` 。

#### 举例

![v-if不加key时造成的奇怪问题](/guide/vif-key/bug-vif-key.jpg)
