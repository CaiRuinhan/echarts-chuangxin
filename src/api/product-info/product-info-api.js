import request from '@/utils/request'
export default {
  // 产品详情接口
  getProductInfoList (data) {
    return request({
      url: '/screen-admin/screen/api/productdetail',
      method: 'post',
      data
    })
  }
}
