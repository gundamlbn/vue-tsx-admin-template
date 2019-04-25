import { AxiosPromise } from 'axios'
import { ApiResult } from '@/types/common'

import request from '@/utils/request'

type User = {
  roles: string[]
  introduction: string
  avatar: string
  name: string
  token?: string
}

/**
 * 登陆
 * @param username
 * @param password
 * @returns Promise
 */
export const login = (username: string, password: string): AxiosPromise<User> =>
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })

/**
 * 获取用户信息
 * @param token
 * @returns Promise
 */
export const getUserInfo = (token: string): AxiosPromise<User> =>
  request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })

/**
 * @returns Promise
 */
export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post'
  })
