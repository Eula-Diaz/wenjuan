import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10 * 1000,
})

// response 拦截
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    // throw new Error(msg)
  }

  return data as any
})

// request 拦截

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

// 对象类型
export type ResDataType = {
  [key: string]: any
}
