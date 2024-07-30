import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: 'Hello World',
  }
})
