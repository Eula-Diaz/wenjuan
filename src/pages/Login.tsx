import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUser() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUser() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm() // 第三方 hook

  useEffect(() => {
    const { username, password } = getUser()
    form.setFieldsValue({ username, password })
  }, [])

  const { run: login } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService({ username, password })
      return data
    },
    {
      manual: true,
      onSuccess: res => {
        const { token = '' } = res
        setToken(token)
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (values: any) => {
    console.log('Success:', values)
    const { username, password, remember } = values
    login(username, password)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUser()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>

      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
