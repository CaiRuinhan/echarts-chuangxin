import request from '@/utils/request'
export default {
  // 产品评价数据接口
  getProductEvaluationList (data) {
    return request({
      url: '/screen-admin/screen/api/evaluate',
      method: 'post',
      data
    })
  }
}
