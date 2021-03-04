export default [
  {
    url: '/user/info',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        message: 'sucess',
        data: {
          username: 'jiangxu',
          role: 'admin'
        }
      }
    }
  }
]
