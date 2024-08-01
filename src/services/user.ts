import axios, { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 注册
export async function registerService(params: {
  username: string
  password: string
  nickname?: string
}): Promise<ResDataType> {
  const url = '/api/user/register'
  params.nickname = params.nickname || params.username
  const data = (await axios.post(url, params)) as ResDataType
  return data
}

// 登录
export async function loginService(params: {
  username: string
  password: string
}): Promise<ResDataType> {
  const url = '/api/user/login'
  const data = (await axios.post(url, params)) as ResDataType
  return data
}
