import { VNode } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { RouterOptions } from 'vue-router'
import * as tsx from 'vue-tsx-support'

import './index.scss'

import { AppModule } from '@/store/modules/app'

import style from './index.module.scss'
import SidebarItem from './sidebar-item'

type Props = {
  collapse?: boolean
}

@Component
export default class Sidebar extends tsx.Component<Props> {
  /**
   * 侧边栏是否展开
   */
  @Prop({
    type: Boolean,
    default: false
  })
  collapse: Props['collapse']

  /**
   * 侧边栏的设置信息，系统级
   * @computed sidebar
   * @store app
   * @state sidebar
   */
  get sidebar() {
    return AppModule.sidebar
  }

  /**
   * 获取路由设置
   * @computed routes
   */
  get routes() {
    return ((this.$router as any).options as RouterOptions).routes
  }

  /**
   * 展开判断
   * @computed isCollapse
   */
  get isCollapse() {
    return !this.sidebar.opened
  }

  render(): VNode {
    return (
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          class={style.elMenu}
          show-timeout={200}
          default-active={this.$route.path}
          collapse={this.isCollapse}
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          mode="vertical"
        >
          {this.routes!.map(route => (
            <SidebarItem
              key={route.path}
              item={route}
              basePath={route.path}
              collapse={this.collapse}
            />
          ))}
        </el-menu>
      </el-scrollbar>
    )
  }
}
