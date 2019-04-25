import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import Cookies from 'js-cookie'

import store, { StoreModules } from '@/store'

import { AppMutationTypes as MutationTypes } from '../mutation-types'

/** 设备类型 */
export type DeviceType = 'Mobile' | 'Desktop'

/**
 * App store State
 */
export type AppState = {
  /** 设备类型 */
  device: DeviceType
  /** 侧边栏设置 */
  sidebar: {
    /** 是否打开 */
    opened: boolean
    /** 是否没有动画 */
    withoutAnimation: boolean
  }
}

/** App模块名 */
export const AppModuleName: StoreModules = 'app'

/**
 * App store 模块
 * @store app
 */
@Module({ dynamic: true, store, name: AppModuleName })
class App extends VuexModule implements AppState {
  /**
   * 侧边栏设置
   * @state sidebar
   */
  sidebar: AppState['sidebar'] = {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false
  }

  /**
   * 设备类型
   * @state device
   */
  device: AppState['device'] = 'Desktop'

  /**
   * 侧边栏Toogle
   * @param withoutAnimation 不带动画
   * @
   */
  @Action({ commit: MutationTypes.TOGGLE_SIDEBAR })
  toggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation
  }

  /**
   * 关闭侧边栏
   * @param withoutAnimation 不带动画
   * @action CloseSideBar
   */
  @Action({ commit: MutationTypes.CLOSE_SIDEBAR })
  closeSideBar(withoutAnimation: boolean) {
    return withoutAnimation
  }

  /**
   * 侧边栏toggle
   * @param device 设备类型
   * @action toggleDevice
   */
  @Action({ commit: MutationTypes.TOGGLE_DEVICE })
  toggleDevice(device: DeviceType) {
    return device
  }

  /**
   * 侧边栏toggle
   * @param withoutAnimation 不带动画
   * @mutation TOGGLE_SIDEBAR
   */
  @Mutation
  private [MutationTypes.TOGGLE_SIDEBAR](withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed')
    } else {
      Cookies.set('sidebarStatus', 'opened')
    }
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
  }

  /**
   * 关闭侧边栏
   * @param withoutAnimation
   * @mutation CLOSE_SIDEBAR
   */
  @Mutation
  private [MutationTypes.CLOSE_SIDEBAR](withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed')
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
  }

  /**
   * 设备类型toggle
   * @param device 设备类型
   * @mutation TOGGLE_DEVICE
   */
  @Mutation
  private [MutationTypes.TOGGLE_DEVICE](device: DeviceType) {
    this.device = device
  }
}

export const AppModule = getModule(App)
