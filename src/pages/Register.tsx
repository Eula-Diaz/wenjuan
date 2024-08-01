import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()
  const { run: register } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerService({ username, password, nickname })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功')
        nav(LOGIN_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    console.log('Success:', values)
    register(values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>

      <div>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '用户名长度在5-20个字符之间' },
              { pattern: /^\w+$/, message: '用户名只能包含字母、数字和下划线' },
            ]}
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
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']} // 依赖于 password，password变化会重新校验
            rules={[
              { required: true, message: '请输入确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  }
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入确认密码" />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号？去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
