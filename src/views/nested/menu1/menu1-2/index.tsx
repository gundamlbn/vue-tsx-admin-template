import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

/**
 * 如果本画面使用outer-view，不能使用纯函数组件
 * @Component Menu12
 */
@Component
export default class Menu12 extends tsx.Component<{}> {
  render(): VNode {
    return <div style="padding:30px;">
      <el-alert closable={false} title="menu 1-2" type="success">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-alert>
    </div>
  }
}
