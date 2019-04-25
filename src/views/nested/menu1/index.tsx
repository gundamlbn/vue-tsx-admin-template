import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

/**
 * 如果本画面使用outer-view，不能使用纯函数组件
 * @Component Menu1
 */
@Component
export default class Menu1 extends tsx.Component<{}> {
  render(): VNode {
    return (
      <div style="padding:30px;">
        <el-alert closable={false} title="menu 1">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-alert>
      </div>
    )
  }
}
