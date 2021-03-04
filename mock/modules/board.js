
let Base64 = require('js-base64').Base64 // 引入Base64使用Base64进行解码
const departmentInfosData = {

  code: 200,
  message: 'sucess',
  data: {
    total: 7,
    year: '2019',
    dataItems: [
      {
        departmentName: '增值业务事业群',
        projectCount: 80,
        departments: [
          {
            departmentName: '云邮事业部',
            projectCount: 28
          },
          {
            departmentName: '云信事业部',
            projectCount: 28
          },
          {
            departmentName: '畅视事业部',
            projectCount: 28
          }, {
            departmentName: '卡事业部',
            projectCount: 28
          }
        ]
      },
      {
        departmentName: '权益运营事业群',
        projectCount: 24,
        departments: [
          {
            departmentName: '云邮事业部',
            projectCount: 28
          },
          {
            departmentName: '云信事业部',
            projectCount: 28
          },
          {
            departmentName: '畅视事业部',
            projectCount: 28
          }, {
            departmentName: '卡事业部',
            projectCount: 28
          }
        ]
      }
    ]
  }
}

const lifecycleDatas = {
  code: 200,
  message: 'sucess',
  data: {
    total: 110,
    year: '2019',
    dataItems: [
      {
        x: 1,
        y: 10,
        id: '100101',
        projectName: '5G云消息',
        income: 100.00,
        profit: 20.00,
        lifecycle: '孵化期',
        poston: '问题',
        infos: [
          {
            key: '产品详情',
            value: '5G云消息是一款孵化期产品，波士顿矩阵看属于问题产品'
          }
        ],
        versionInfo: {
          version: 'V1.0.0.1',
          versionDetail: '优化页面显示效果；优化柱状图；'
        }
      },
      {
        x: 2,
        y: 11,
        id: '100102',
        projectName: '智能助理',
        income: 110.00,
        profit: 25.00,
        lifecycle: '孵化期',
        poston: '问题',
        infos: [
          {
            key: '产品详情',
            value: '智能助理是一款孵化期产品，波士顿矩阵看属于问题产品'
          },
          {
            key: '产品问题',
            value: '问题是成长快，但是收入低'
          }
        ],
        versionInfo: {
          version: 'V1.0.0.1',
          versionDetail: '优化页面显示效果；优化柱状图；'
        }
      },
      {
        x: 3,
        y: 13,
        id: '100103',
        projectName: '隐私对话',
        income: 110.00,
        profit: 25.00,
        lifecycle: '成长期',
        poston: '问题',
        infos: [
          {
            key: '产品详情',
            value: '智能助理是一款孵化期产品，波士顿矩阵看属于问题产品'
          },
          {
            key: '产品问题',
            value: '问题是成长快，但是收入低'
          }
        ],
        versionInfo: {
          version: 'V1.0.0.1',
          versionDetail: '优化页面显示效果；优化柱状图；'
        }
      },
      {
        x: 4,
        y: 14,
        id: '100104',
        projectName: '话费购',
        income: 110.00,
        profit: 25.00,
        lifecycle: '成长期',
        poston: '明星',
        infos: [
          {
            key: '产品详情',
            value: '话费购是一款孵化期产品，波士顿矩阵看属于问题产品'
          },
          {
            key: '产品问题',
            value: '问题是成长快，但是收入低'
          }
        ],
        versionInfo: {
          version: 'V1.0.0.1',
          versionDetail: '优化页面显示效果；优化柱状图；'
        }
      }
    ]
  }
}

const classifyDatas = {
  code: 200,
  message: 'sucess',
  data: {
    total: 5,
    year: '2019',
    dataItems: [
      {
        key: 'department',
        value: [
          {
            x: '增值业务事业群',
            yItems: [
              {
                lifecycle: '孵化期',
                count: 19
              }, {
                lifecycle: '成长期',
                count: 19
              }, {
                lifecycle: '成熟期',
                count: 19
              }, {
                lifecycle: '衰退期',
                count: 19
              }
            ]
          }, {
            x: '权益业务事业群',
            yItems: [
              {
                lifecycle: '孵化期',
                count: 19
              }, {
                lifecycle: '成长期',
                count: 19
              }, {
                lifecycle: '成熟期',
                count: 19
              }, {
                lifecycle: '衰退期',
                count: 19
              }
            ]
          }
        ]
      }, {
        key: 'market',
        value: [
          {
            x: '2B',
            yItems: [
              {
                lifecycle: '孵化期',
                count: 19
              }, {
                lifecycle: '成长期',
                count: 19
              }, {
                lifecycle: '成熟期',
                count: 19
              }, {
                lifecycle: '衰退期',
                count: 19
              }
            ]
          }, {
            x: '2C',
            yItems: [
              {
                lifecycle: '孵化期',
                count: 19
              }, {
                lifecycle: '成长期',
                count: 19
              }, {
                lifecycle: '成熟期',
                count: 19
              }, {
                lifecycle: '衰退期',
                count: 19
              }
            ]
          }
        ]
      }
    ]
  }
}

const postonDatas = {
  code: 200,
  message: 'sucess',
  data: {
    total: 5,
    year: '2019',
    dataItems: [
      {
        x: 1,
        y: 10,
        productName: '5G云消息',
        poston: '问题',
        infos: [
          {
            key: '收入',
            value: '100万'
          },
          {
            key: '利润',
            value: '10万'
          }
        ]
      },
      {
        x: 2,
        y: 20,
        productName: '通讯助理',
        poston: '问题',
        infos: [
          {
            key: '收入',
            value: '100万'
          },
          {
            key: '利润',
            value: '10万'
          }
        ]
      }
    ]
  }
}

const productMarketDatas = {
  code: 200,
  message: 'sucess',
  data: {
    total: 5,
    year: '2019',
    dataItems: [
      {
        x: 1,
        y: 10,
        productName: '5G云消息',
        poston: '市场拓展',
        infos: [
          {
            key: '收入',
            value: '100万'
          },
          {
            key: '利润',
            value: '10万'
          }
        ]
      },
      {
        x: 2,
        y: 20,
        productName: '通讯助理',
        poston: '产品创新',
        infos: [
          {
            key: '收入',
            value: '100万'
          },
          {
            key: '利润',
            value: '10万'
          }
        ]
      }
    ]
  }
}
// 导出请求地址
export default [
  {
    // 请求路径请求方式
    url: '/board/departmentInfos',
    type: 'post',
    // 响应的格式
    response: _ => {
      // 返回数据  返回数据在对象末尾要加process.env.VUE_APP_BASE64_KEY这个是一个固定的
      return Base64.encode(JSON.stringify(departmentInfosData) + process.env.VUE_APP_BASE64_KEY)
    }
  },
  {
    url: '/board/lifecycleDatas',
    type: 'post',
    response: _ => {
      return Base64.encode(JSON.stringify(lifecycleDatas) + process.env.VUE_APP_BASE64_KEY)
    }
  },
  {
    url: '/board/classifyDatas',
    type: 'post',
    response: _ => {
      return Base64.encode(JSON.stringify(classifyDatas) + process.env.VUE_APP_BASE64_KEY)
    }
  },
  {
    url: '/board/postonDatas',
    type: 'post',
    response: _ => {
      return Base64.encode(JSON.stringify(postonDatas) + process.env.VUE_APP_BASE64_KEY)
    }
  },
  {
    url: '/board/productMarketDatas',
    type: 'post',
    response: _ => {
      return Base64.encode(JSON.stringify(productMarketDatas) + process.env.VUE_APP_BASE64_KEY)
    }
  }
]
