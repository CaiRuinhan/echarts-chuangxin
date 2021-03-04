import request from '@/utils/request'
export default {
  // 产品页数据接口
  getMenu (data) {
    return request({
      url: '/screen-admin/screen/api/menu',
      method: 'get',
      data
    })
  },
  // 获取token
  getToken (data) {
    return request({
      url: '/screen-admin/screen/api/token',
      method: 'get',
      data
    })
  }
}
