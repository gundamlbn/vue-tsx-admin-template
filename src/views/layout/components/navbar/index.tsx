import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'

import style from './index.module.scss'

@Component
export default class Navbar extends tsx.Component<{}> {
  /**
   * @computed sidebar
   * @store app
   * @state sidebar
   */
  get sidebar() {
    return AppModule.sidebar
  }

  /**
   * @computed avatar
   * @store user
   * @state avatar
   */
  get avatar() {
    return UserModule.avatar
  }

  /**
   * @method toggleSideBar
   * @store app
   * @action ToggleSideBar
   */
  toggleSideBar() {
    AppModule.toggleSideBar(false)
  }

  /**
   * @method logout
   * @store user
   * @action LogOut
   */
  logout() {
    UserModule.logOut().then(() => {
      location.reload() // 为了重新实例化vue-router对象 避免bug
    })
  }

  render(): VNode {
    return (
      <div class={style.navbar}>
        <Hamburger
          toggleClick={this.toggleSideBar}
          isActive={this.sidebar.opened}
          class={style.hamburgerContainer}
        />
        <Breadcrumb />
        <el-dropdown class={style.avatarContainer} trigger="click">
          <div class={style.avatarWrapper}>
            <img src={this.avatar + '?imageView2/1/w/80/h/80'} class={style.userAvatar} />
            <i class={style.elIconCaretBottom} />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" onClick={this.logout}>
                LogOut
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    )
  }
}
