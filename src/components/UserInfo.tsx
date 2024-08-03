import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { Button, message, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const { username, nickname } = useGetUserInfo()

  const nav = useNavigate()
  const dispatch = useDispatch()

  function logout() {
    dispatch(logoutReducer()) // 清空了 redux user数据
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const userInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <Space>
          <UserOutlined />
          {nickname}
        </Space>
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? userInfo : Login}</div>
}

export default UserInfo
