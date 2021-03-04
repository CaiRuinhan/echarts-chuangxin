import request from '@/utils/request'
export default {
  // 产品页数据接口
  getProductList (data) {
    return request({
      url: '/screen-admin/screen/api/product',
      method: 'post',
      data
    })
  },
  getProducts (data) {
    return request({
      url: '/screen-admin/screen/api/product1',
      method: 'post',
      data
    })
  }
}
