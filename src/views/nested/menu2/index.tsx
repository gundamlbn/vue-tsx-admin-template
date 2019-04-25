import { FunctionalComponentOptions, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'

/**
 * 纯函数组件 用来显示简单的内容
 * @Functional Menu2
 */
const Menu2 = (): VNode => (
  <div style="padding:30px;">
    <el-alert closable={false} title="menu 2" />
  </div>
)

export default tsx.ofType().convert(Menu2 as FunctionalComponentOptions)
