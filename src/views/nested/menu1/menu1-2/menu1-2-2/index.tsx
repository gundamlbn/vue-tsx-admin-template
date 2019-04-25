import { FunctionalComponentOptions, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'

const Menu122 = (): VNode => (
  <div style="padding:30px;">
    <el-alert closable={false} title="menu 1-2-2" type="warning" />
  </div>
)

export default tsx.ofType().convert(Menu122 as FunctionalComponentOptions)
