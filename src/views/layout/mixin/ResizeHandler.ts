import { Component, Vue, Watch } from 'vue-property-decorator'
import { DeviceType, AppModule } from '@/store/modules/app'
import { identity } from 'lodash'

const WIDTH = 992 // refer to Bootstrap's responsive design

/**
 * 画面大小重置的mixin
 * 作为mixin，必须要加上方法的访问限制
 * @Mixin ResizeHandlerMixin
 */
@Component
export default class ResizeHandlerMixin extends Vue {
  /**
   * @computed device
   * @store app
   * @state device
   */
  get device() {
    return AppModule.device
  }

  /**
   * @computed sidebar
   * @store app
   * @state sidebar
   */
  get sidebar() {
    return AppModule.sidebar
  }

  /**
   * 路由监听，移动版关闭侧边栏
   * @watch $route
   */
  @Watch(identity<keyof ResizeHandlerMixin>('$route'))
  private OnRouteChange() {
    if (this.device === 'Mobile' && this.sidebar.opened) {
      AppModule.closeSideBar(false)
    }
  }

  /**
   * 画面加载前处理，加上resize的监听
   * @lifecyle beforeMount
   */
  protected beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  /**
   * 画面加载完后的处理
   * @lifecycle mounted
   */
  protected mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      AppModule.toggleDevice('Mobile')
      AppModule.closeSideBar(true)
    }
  }

  /**
   * 移动版的判断
   *
   * 规则 宽度<992
   */
  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  /**
   * 画面resize的事件处理
   */
  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      AppModule.toggleDevice(isMobile ? 'Mobile' : 'Desktop')
      if (isMobile) {
        AppModule.closeSideBar(true)
      }
    }
  }
}
