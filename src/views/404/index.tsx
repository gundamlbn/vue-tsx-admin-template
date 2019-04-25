import { FunctionalComponentOptions, VNode } from 'vue'
import * as tsx from 'vue-tsx-support'

import classNames from 'classnames'

import png404 from '@/assets/404_images/404.png'
import png404Cloud from '@/assets/404_images/404_cloud.png'

// 使用css module
import * as style from './index.module.scss'

/** message */
const message = '404 此页面不存在'

/**
 * 404页面
 * 函数组件，基本是用作纯显示
 * @Functional NotFound
 */
const NotFound = (): VNode => (
  <div class={style.wscnHttp404Container}>
    <div class={style.wscnHttp404}>
      <div class={style.pic404}>
        <img class={style.pic404Parent} src={png404} alt="404" />
        <img class={classNames(style.pic404Child, style.left)} src={png404Cloud} alt="404" />
        <img class={classNames(style.pic404Child, style.mid)} src={png404Cloud} alt="404" />
        <img class={classNames(style.pic404Child, style.right)} src={png404Cloud} alt="404" />
      </div>
      <div class={style.text404}>
        <div class={style.text404Oops}>OOPS!</div>
        <div class={style.text404Info}>
          版权所有
          <a class="link-type" href="https://wallstreetcn.com" target="_blank">
            华尔街见闻
          </a>
        </div>
        <div class={style.text404Headline}>{message}</div>
        <div class={style.text404Info}>
          请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
        </div>
        <a href="/" class={style.text404ReturnHome}>
          返回首页
        </a>
      </div>
    </div>
  </div>
)

export default tsx.ofType().convert(NotFound as FunctionalComponentOptions)
