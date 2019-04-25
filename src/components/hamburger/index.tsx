import { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import classNames from 'classnames/bind'

import style from './index.module.scss'

const cx = classNames.bind({
  hamburgerContainer: style.hamburgerContainer,
  isActive: style.isActive
})

type Props = {
  isActive?: boolean;
  toggleClick?: () => void;
}

@Component
export default class Hamburger extends tsx.Component<Props> {
  @Prop({ default: false })
  isActive!: Props['isActive']

  @Prop({ default: null })
  toggleClick: Props['toggleClick']

  render(): VNode {
    return <div
      class={cx('hamburgerContainer', {
        isActive: this.isActive
      })}
      onClick={this.toggleClick}
    >
      <svg-icon
        name="hamburger"
        width="20"
        height="20"
      />
    </div>
  }
}
