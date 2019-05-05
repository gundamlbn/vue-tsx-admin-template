import { VNode } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { RouteRecord } from 'vue-router'
import pathToRegexp from 'path-to-regexp'
import { identity } from 'lodash'

import style from './index.module.scss'

/**
 * @ignore
 */
const m = tsx.modifiers

/**
 * 面包屑组件
 * @Component Breadcrumb
 */
@Component
export default class Breadcrumb extends tsx.Component<{}> {
  /**
   * 面包屑列表
   * @data breadcrumbs
   */
  breadcrumbs: RouteRecord[] = []

  /**
   * 路由监听器
   *
   * 路由改变的时候重新管理面包屑
   * @watch $route
   */
  @Watch(identity<keyof Breadcrumb>('$route'))
  onRouteChange() {
    this.getBreadcrumb()
  }

  /**
   * Link 点击事件
   * @method handleLink
   * @param item
   */
  handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect)
      return
    }
    this.$router.push(this.pathCompile(path))
  }

  /**
   * 组件创建完成
   * @lifecycle created
   */
  created() {
    this.getBreadcrumb()
  }

  /**
   * 渲染函数
   * @lifecycle render
   */
  protected render(): VNode {
    return (
      <el-breadcrumb class={style.appBreadcrumb} separator="/">
        <transition-group name="breadcrumb">
          {this.breadcrumbs.map((item, index) => (
            <el-breadcrumb-item key={item.path}>
              {item.redirect === 'noredirect' || index === this.breadcrumbs.length - 1 ? (
                <span class={style.noRedirect}>{item.meta.title}</span>
              ) : (
                <a onClick={m.prevent(() => this.handleLink(item))}>{item.meta.title}</a>
              )}
            </el-breadcrumb-item>
          ))}
        </transition-group>
      </el-breadcrumb>
    )
  }

  /**
   * 根据路由重整面包屑组件
   */
  private getBreadcrumb() {
    let matched = this.$route.matched.filter(item => item.name)
    const first = matched[0]
    if (first && first.name !== 'dashboard') {
      matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } } as RouteRecord].concat(
        matched
      )
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  /**
   * 用来支持':id/details'形式的路由
   * @param path
   */
  private pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
  }
}
