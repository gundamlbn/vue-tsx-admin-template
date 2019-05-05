/**
 * App组件模块
 * @module app
 */

/** import */
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { VNode } from 'vue'

/**
 * 主入口
 * @Component App
 */
@Component
export default class App extends tsx.Component<{}> {
  /**
   * 渲染函数
   * @lifecycle
   */
  render(): VNode {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
