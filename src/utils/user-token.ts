/**
 * @description 存储/获取用户token
 * @author muzi
 */

const KEY = 'USER_TOKEN'

export function setToken(token: string) {
  localStorage.setItem(KEY, token)
}

export function getToken() {
  return localStorage.getItem(KEY)
}

export function removeToken() {
  localStorage.removeItem(KEY)
}
