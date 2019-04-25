export type ApiResult<T = any> = {
  code: string
  message?: string
  data?: T
  items?: T[]
  token?: string
}
