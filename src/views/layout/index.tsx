import { VNode } from 'vue'
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'

import classNames from 'classnames/bind'
import keyMirror from 'keymirror'

import { AppModule, DeviceType } from '@/store/modules/app'

import { AppMain, Navbar, Sidebar } from './components'
import style from './index.module.scss'
import ResizeMixin from './mixin/ResizeHandler'

const ClassObj = keyMirror({
  hideSidebar: null,
  openSidebar: null,
  withoutAnimation: null,
  mobile: null,
  appWrapper: null
})

const cx = classNames.bind({
  [ClassObj.hideSidebar]: style.hideSidebar,
  [ClassObj.openSidebar]: style.openSidebar,
  [ClassObj.withoutAnimation]: style.withoutAnimation,
  [ClassObj.mobile]: style.mobile,
  [ClassObj.appWrapper]: style.appWrapper
})
/**
 * 画面主 layout 混入了ResizeMixin
 * @Component Layout
 */
@Component
class Layout extends mixins(ResizeMixin) {
  /**
   * class控制
   * @computed classObj
   */
  get classObj() {
    return {
      [ClassObj.hideSidebar]: !this.sidebar.opened,
      [ClassObj.openSidebar]: this.sidebar.opened,
      [ClassObj.withoutAnimation]: this.sidebar.withoutAnimation,
      [ClassObj.mobile]: this.device === 'Mobile'
    }
  }

  /**
   * 关闭侧边栏
   * @method handleClickOutside
   */
  handleClickOutside() {
    AppModule.closeSideBar(false)
  }

  /**
   * 渲染方法
   * @lifecycle render
   */
  render(): VNode {
    return (
      <div class={cx(this.classObj, ClassObj.appWrapper)}>
        {this.classObj['mobile'] && this.sidebar.opened && (
          <div class={style.drawerBg} onClick={this.handleClickOutside} />
        )}
        <Sidebar class={style.sidebarContainer} collapse={this.classObj['hideSidebar']} />
        <div class={style.mainContainer}>
          <Navbar />
          <AppMain />
        </div>
      </div>
    )
  }
}

export default tsx.ofType().convert(Layout)
