import { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import classNames from 'classnames/bind'

import style from './index.module.scss'

/**
 * @ignore
 */
const cx = classNames.bind({
  hamburgerContainer: style.hamburgerContainer,
  isActive: style.isActive
})

/**
 * @type 汉堡菜单参数定义
 */
type Props = {
  /**
   * 菜单是否激活
   * @default false
   */
  isActive?: boolean
  /**
   * 点击事件
   * @default null
   */
  toggleClick?: () => void
}

/**
 * 汉堡菜单
 * @Component Hamburger
 */
@Component
export default class Hamburger extends tsx.Component<Props> {
  /**
   * 菜单是否激活
   * @see [[Props]]
   */
  @Prop({ default: false })
  isActive!: Props['isActive']

  /**
   * 点击事件
   * @see [[Props]]
   */
  @Prop({ default: null })
  toggleClick: Props['toggleClick']

  /**
   * 渲染函数
   * @lifecycle render
   */
  render(): VNode {
    return (
      <div
        class={cx('hamburgerContainer', {
          isActive: this.isActive
        })}
        onClick={this.toggleClick}
      >
        <svg-icon name="hamburger" width="20" height="20" />
      </div>
    )
  }
}
