import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import { UserModule } from '@/store/modules/user'

import * as style from './index.module.scss'

/**
 * 主画面
 * @Component Dashboard
 */
@Component
export default class Dashboard extends tsx.Component<{}> {
  /**
   * 用户名，从 user store 获取
   * @computed name
   * @store user
   */
  get name() {
    return UserModule.name
  }

  /**
   * 权限，从 user store 获取
   * @computed roles
   * @store user
   */
  get roles() {
    return UserModule.roles
  }

  /**
   * 渲染函数
   * @lifecycle render
   */
  render(): VNode {
    return (
      <div class={style.dashboardContainer}>
        <div class={style.dashboardText}>name:{this.name}</div>
        <div class={style.dashboardText}>
          roles:
          {this.roles.map(role => (
            <span key={role}>{role}</span>
          ))}
        </div>
      </div>
    )
  }
}
