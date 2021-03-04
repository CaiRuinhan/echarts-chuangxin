import request from '@/utils/request'
export default {
  // 体验
  getExperienceList (data) {
    return request({
      url: '/screen-admin/screen/api/experience',
      method: 'post',
      data
    })
  }
}
