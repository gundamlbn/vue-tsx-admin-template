import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import style from './index.module.scss'

@Component
export default class AppMain extends tsx.Component<{}> {
  render(): VNode {
    return (
      <section class={style.appMain}>
        <transition name="fade-transform" mode="out-in">
          {/* <!-- or name="fade" --> */}
          {/* <!-- <router-view :key="key"></router-view> --> */}
          <router-view />
        </transition>
      </section>
    )
  }
}
