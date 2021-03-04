/**
 * Created by jiangx36
 */

import axios from 'axios'
// import { Toast } from 'vant'
// import { Message } from 'element-ui'
let Base64 = require('js-base64').Base64
/**
 * 用于处理取消重复请求
 */

let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) { // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

/**
 * axios 配置
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // 是否跨域请求中发送cookies
  timeout: 10000 // 设置超时时长
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求前对于请求进行处理，如设置token或设置请求头信息设置请求头的信息
    // do something ...
    config.headers['Content-type'] = 'application/json'
    // 取消冲突请求
    removePending(config) // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new CancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method, f: c })
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
// 响应拦截器也可以处理全局loading  在响应拦截器对BASE64加密和解密
service.interceptors.response.use(
  response => {
    let res = response.data
    // 如果响应数据加密，那么先进行解密，在获取目标数据
    if (process.env.VUE_APP_BASE64_FLAG === 'true') {
      // console.log(66, response.data)
      let decodeRes = Base64.decode(response.data)
      // console.log('11', decodeRes)
      // 去掉返回数据多给的数据
      const index = decodeRes.indexOf(process.env.VUE_APP_BASE64_KEY)
      decodeRes = decodeRes.substring(0, index)
      // console.log('2222', decodeRes)
      res = JSON.parse(decodeRes)
      // console.log('333', decodeRes)
    }
    // 通过与服务端约定的返回状态码进行请求处理，例如如下状态码不为200时判断为请求失败弹出报错信息
    // 状态码具体情况以实际为准
    if (parseInt(res.code) !== 200) {
      // Toast.fail(res.message || '系统错误请稍后再试')
      // Message(res.message || '系统错误请稍后再试')
      return Promise.reject(res.message || 'error')
    } else {
      // do something
      // ...

      removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除

      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error) // for debug

    // Toast.fail(error.message || '未知错误请稍后再试')
    // Message(error.message || '系统错误请稍后再试')
    return Promise.reject(error)
  }
)

export default service
