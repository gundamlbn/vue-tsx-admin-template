import {
  Action,
  getModule,
  Module,
  Mutation,
  MutationAction,
  VuexModule
} from 'vuex-module-decorators'

import { getUserInfo, login, logout } from '@/api/login'
import store, { StoreModules } from '@/store'
import { getToken, removeToken, setToken } from '@/utils/auth'

import { UserMutationTypes as MutationTypes } from '../mutation-types'

/**
 * User store State
 */
export type UserState = {
  /** 用户token */
  token: string
  /** 用户名 */
  name: string
  /** 用户头像 */
  avatar: string
  /** 用户角色 */
  roles: string[]
}

/** User模块名 */
export const UserModuleName: StoreModules = 'user'

/**
 * 用户store模块
 * @store user
 */
@Module({ dynamic: true, store, name: UserModuleName })
class User extends VuexModule implements UserState {
  token: UserState['token'] = ''
  name: UserState['name'] = ''
  avatar: UserState['avatar'] = ''
  roles: UserState['roles'] = []

  /**
   * 登陆
   * @action Login
   * @param userInfo
   */
  @Action({ commit: MutationTypes.SET_TOKEN })
  async login(userInfo: { username: string; password: string }) {
    const username = userInfo.username.trim()
    const { data } = await login(username, userInfo.password)
    setToken(data.token || '')
    return data.token
  }

  /**
   * 登出
   * @action FedLogOut
   */
  @Action({ commit: MutationTypes.SET_TOKEN })
  async fedLogOut() {
    removeToken()
    return ''
  }

  /**
   * 获取用户信息
   * @MutationAction GetUserInfo
   * @mutate roles name avatar
   */
  @MutationAction({ mutate: ['roles', 'name', 'avatar'] })
  async getUserInfo() {
    const token = getToken()
    if (token === undefined) {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo(token)
    if (data.roles && data.roles.length > 0) {
      return {
        roles: data.roles,
        name: data.name,
        avatar: data.avatar
      }
    } else {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
  }

  /**
   * 登出
   * @MutationAction LogOut
   * @mutate token roles
   */
  @MutationAction({ mutate: ['token', 'roles'] })
  async logOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    return {
      token: '',
      roles: []
    }
  }

  /**
   * 设置用户token
   * @Mutation SET_TOKEN
   * @param token
   */
  @Mutation
  private [MutationTypes.SET_TOKEN](token: string) {
    this.token = token
  }
}

export const UserModule = getModule(User)
