import request from '@/utils/request'
export default {
  // 用户页接口
  getUserList (data) {
    return request({
      // url: '/board/departmentInfos',
      url: '/screen-admin/screen/api/user',
      method: 'post',
      data
    })
  }
}
