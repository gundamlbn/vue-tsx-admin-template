import { VNode } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { RouteRecord } from 'vue-router'
import pathToRegexp from 'path-to-regexp'
import { identity } from 'lodash'

const m = tsx.modifiers

@Component
export default class Breadcrumb extends tsx.Component<{}> {
  /**
   * @data breadcrumbs
   */
  breadcrumbs: RouteRecord[] = []

  /**
   * @watch $route
   */
  @Watch(identity<keyof Breadcrumb>('$route'))
  onRouteChange() {
    this._getBreadcrumb()
  }

  /**
   * @method handleLink
   * @param item
   */
  handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect)
      return
    }
    this.$router.push(this._pathCompile(path))
  }

  /**
   * @lifecycle created
   */
  created() {
    this._getBreadcrumb()
  }

  /**
   * @lifecycle render
   */
  render(): VNode {
    return (
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          {this.breadcrumbs.map((item) => (
            <el-breadcrumb-item key={item.path}>
              <span
                v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
                class="no-redirect"
              >
                {item.meta.title}
              </span>
              <a v-else onClick={m.prevent(() => this.handleLink(item))}>
                {item.meta.title}
              </a>
            </el-breadcrumb-item>
          ))}
        </transition-group>
      </el-breadcrumb>
    )
  }

  _getBreadcrumb() {
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

  _pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
  }
}
