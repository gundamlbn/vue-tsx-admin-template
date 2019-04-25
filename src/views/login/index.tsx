import { VNode } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import * as tsx from 'vue-tsx-support'

import './index.scss'

import { Form as ElForm } from 'element-ui'
import { identity } from 'lodash'

import { UserModule } from '@/store/modules/user'
import { isValidUsername } from '@/utils/validate'

import style from './index.module.scss'

const m = tsx.modifiers

const validateUsername = (rule: any, value: string, callback: any) => {
  if (!isValidUsername(value)) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error('密码不能小于5位'))
  } else {
    callback()
  }
}

/**
 * 登陆页面
 * @Component Login
 */
@Component
export default class Login extends tsx.Component<{}> {
  /**
   * form用的model
   * @data loginForm
   */
  loginForm = {
    username: 'admin',
    password: 'admin'
  }

  /**
   * form验证规则
   * @data loginRules
   */
  loginRules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePass }]
  }

  /**
   * 登陆按钮的加载中控制
   * @data loading
   */
  loading = false

  /**
   * 控制input格式来达成是否显示密码
   * @data pwdType
   */
  pwdType = 'password'

  /**
   * 登录后的转向页面
   */
  _redirect: string | undefined = undefined

  /**
   * 路由变更的监视器
   * @watch $route
   * @param route
   */
  @Watch(identity<keyof Login>('$route'), { immediate: true })
  private OnRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this._redirect = route.query && (route.query.redirect as string)
  }

  /**
   * 密码显示为文字
   * @method showPwd
   */
  showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = ''
    } else {
      this.pwdType = 'password'
    }
  }

  /**
   * 登陆按钮的点击处理
   * @method handleLogin
   */
  handleLogin() {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        UserModule.login(this.loginForm)
          .then(() => {
            this.loading = false
            this.$router.push({ path: this._redirect || '/' })
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        return false
      }
    })
  }
  /**
   * @lifecycle render
   */
  render(): VNode {
    return (
      <div id="login-container" class={style.loginContainer}>
        <el-form
          ref="loginForm"
          rules={this.loginRules}
          class={style.loginForm}
          auto-complete="on"
          label-position="left"
          {...{ props: { model: this.loginForm } }}
        >
          <h3 class={style.title}>vue-typescript-admin-template</h3>
          <el-form-item prop="username">
            <span class={style.svgContainer}>
              <svg-icon name="user" />
            </span>
            <el-input
              v-model={this.loginForm.username}
              name="username"
              type="text"
              auto-complete="on"
              placeholder="username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class={style.svgContainer}>
              <svg-icon name="password" />
            </span>
            <el-input
              v-model={this.loginForm.password}
              type={this.pwdType}
              name="password"
              auto-complete="on"
              placeholder="password"
              nativeOnKeyup={m.enter(this.handleLogin)}
            />
            <span class={style.showPwd} onClick={this.showPwd}>
              <svg-icon name={this.pwdType === 'password' ? 'eye-off' : 'eye-on'} />
            </span>
          </el-form-item>
          <el-form-item>
            <el-button
              loading={this.loading}
              type="primary"
              style="width:100%;"
              nativeOnClick={m.prevent(this.handleLogin)}
            >
              Sign in
            </el-button>
          </el-form-item>
          <div class={style.tips}>
            <span style="margin-right:20px;">username: admin</span>
            <span> password: admin</span>
          </div>
        </el-form>
      </div>
    )
  }
}
