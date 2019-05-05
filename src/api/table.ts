import { AxiosPromise } from 'axios'

import { ApiResult } from '@/types/common'
import request from '@/utils/request'

export type TableItem = {
  id: string
  title: string
  status: string
  author: string
  /* eslint camelcase: 0 */
  display_time: string
  pageviews: string
}

export type Table = {
  items: TableItem[]
}

export const getList: (params: any) => AxiosPromise<Table> = params =>
  request({
    url: '/table/list',
    method: 'get',
    params
  })
