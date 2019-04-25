import { FunctionalComponentOptions, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'

const Menu13 = (): VNode => (
  <div style="padding:30px;">
    <el-alert closable={false} title="menu 1-3" type="success" />
  </div>
)

export default tsx.ofType().convert(Menu13 as FunctionalComponentOptions)
