import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '../router'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()

  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return

    // 已登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 未登录
    if (!isNoNeedUserInfo(pathname)) {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
