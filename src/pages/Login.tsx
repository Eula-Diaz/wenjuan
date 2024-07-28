import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const nav = useNavigate()
  return (
    <>
      <h2>Login</h2>
      <div>
        <button onClick={() => nav(-1)}>返回</button>
      </div>
    </>
  )
}

export default Login
