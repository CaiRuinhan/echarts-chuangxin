import { commontotalBar, COLOR, commonMap, commonLine, yAxis, commonBar, commonPie, geoCoordMap } from '@/utils/unisk-options'
import { thousands } from '@/utils/index.js'
import echarts from 'echarts'
import { backgroundImage } from '@/utils/LifeImage.js'
import getExperienceApi from '@/api/experience/experience-api.js'
export default {
  // 获取体验的数据
  async getExperienceData (data) {
    let res = await getExperienceApi.getExperienceList(data)

    let options = {
      getHeighestOption: this.getHeighest(res.data.complaints),
      getPositiveTopOption: this.getPositiveTop(res.data.positives),
      getNegativeTopOption: this.getNegativeTop(res.data.negatives),
      getComplaintsMapOption: this.getComplaintsMap(res.data.mapDatas),
      getComplaintsBarOption: this.getComplaintsBar(res.data.mapDatas),

      getComplaintsOption: this.getComplaints(res.data.complaintsList),
      getTimeOption: this.getTime(res.data.plusminusList),
      getClassifyOption: this.getClassify(res.data.complaintsKinds),
      getPositiveSourceOption: this.getPositiveSource(res.data.positivesSources),
      getNegativeSourceOption: this.getNegativeSource(res.data.negativesSources)

    }

    return options
  },

  getHeighest (data) {
    let option = JSON.parse(JSON.stringify(commontotalBar))
    // for (let i = 0; i < 5 - data.length; i++) {
    //   data.push({ name: '暂无', sort: data.length + 1 + i, value: '0' })
    // }
    data = data.filter((item) =>
      item.value !== '0'
    )
    option.series[0].data = data.map((item, index) => {
      const color = COLOR[index % COLOR.length]
      const colors = '#FFF'
      return {
        value: 0,
        label: {
          formatter () {
            return ['{t|' + (item.sort) + ' }', '{c|' + '}', '{c|' + item.name + ' }']
          },
          rich: {
            t: {
              color: index > 2 ? colors : color,
              align: 'left',
              fontSize: 16,
              fontWeight: index < 3 ? 700 : 500,
              postion: 'top'

            },
            c: {
              color: index > 2 ? colors : color,
              align: 'left',
              fontSize: 16,

              padding: 10
            }
          },
          confine: true
        }
      }
    })
    option.series[0].label.offset = [10, -30]
    option.series[1].data = data.map(({ value }, index) => {
      // 设置两个颜色一个颜色是这个根据变化的颜色
      const color = COLOR[index % COLOR.length]
      // 设置一个统一的颜色
      const colors = '#FFF'
      return {
        value,
        label: {
          align: 'right',
          // 右侧文字如果变化，超过第三个就是固定颜色
          color: index > 2 ? colors : color,
          fontSize: 17,
          fontWeight: index < 3 ? 700 : 500
        },
        // 柱状图的颜色
        itemStyle: {
          normal: {

            color:
             new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
               offset: 0,
               color: '#A83279'

             }, {
               offset: 1,
               color: '#D38312'
             }])
          }
        }

      }
    })
    // 右侧文字
    option.series[1].label.show = true
    // option.series[1].label.position = [330, -20]
    // option.series[1].label.fontSize = 18
    option.series[1].label.formatter = function (value) {
      return `${value.value}`
    }
    return option
  },
  getPositiveTop (data) {
    let option = JSON.parse(JSON.stringify(commontotalBar))
    data = data.filter((item) =>
      item.value !== '0'
    )
    option.series[0].data = data.map((item, index) => {
      // const color = COLOR[index % COLOR.length]
      // const colors = '#FFF'
      return {
        value: 0,
        label: {
          formatter () {
            return ['{t|' + (item.sort) + ' }', '{c| }', '{c|' + item.name + ' }']
          },
          rich: {
            t: {
              color: '#FFF',
              align: 'left',
              fontSize: 16,
              fontWeight: index < 3 ? 700 : 500,
              postion: 'top'

            },
            c: {
              color: '#FFF',
              align: 'left',
              fontSize: 16,

              padding: 10
            }
          },
          confine: true
        }
      }
    })
    option.series[0].label.offset = [10, -30]
    option.series[1].data = data.map(({ value }, index) => {
      // 设置两个颜色一个颜色是这个根据变化的颜色
      // const color = COLOR[index % COLOR.length]
      // 设置一个统一的颜色
      const colors = '#FFF'
      const color = '#00E2FC'
      // if (value === '0') {
      //   value = '无'
      // }
      return {
        value,
        label: {
          align: 'right',
          // 右侧文字如果变化，超过第三个就是固定颜色
          color: colors,
          fontSize: 17,
          fontWeight: index < 3 ? 700 : 500

        },
        // 柱状图的颜色
        itemStyle: {
          color: color
        }
      }
    })
    option.series[1].barCategoryGap = '60%'
    // 右侧文字
    option.series[1].label.show = true
    option.series[1].backgroundStyle.borderColor = '#00E2FC'
    option.series[1].backgroundStyle.borderWidth = 1
    option.series[1].label.formatter = function (value) {
      return `${value.value}`
    }
    return option
  },
  getNegativeTop (data) {
    let option = JSON.parse(JSON.stringify(commontotalBar))
    data = data.filter((item) =>
      item.value !== '0'
    )
    option.series[0].data = data.map((item, index) => {
      // const color = COLOR[index % COLOR.length]
      // const colors = '#FFF'
      return {
        value: 0,
        label: {
          formatter () {
            return ['{t|' + (index + 1) + ' }', '{c| }', '{c|' + item.name + ' }']
          },
          rich: {
            t: {
              color: '#FFF',
              align: 'left',
              fontSize: 16,
              fontWeight: index < 3 ? 700 : 500,
              postion: 'top'

            },
            c: {
              color: '#FFF',
              align: 'left',
              fontSize: 16,

              padding: 10
            }
          },
          confine: true
        }
      }
    })
    option.series[0].label.offset = [10, -30]
    option.series[1].data = data.map(({ value }, index) => {
      // 设置两个颜色一个颜色是这个根据变化的颜色
      // const color = COLOR[index % COLOR.length]
      // 设置一个统一的颜色
      const colors = '#FFF'
      const color = '#389CFF'
      return {
        value: value,
        label: {
          align: 'right',
          // 右侧文字如果变化，超过第三个就是固定颜色
          color: colors,
          fontSize: 17,
          fontWeight: index < 3 ? 700 : 500

        },
        // 柱状图的颜色
        itemStyle: {
          color: color
        }
      }
    })
    option.series[1].barCategoryGap = '60%'
    // 右侧文字
    option.series[1].label.show = true
    option.series[1].backgroundStyle.borderColor = '#00E2FC'
    option.series[1].backgroundStyle.borderWidth = 1
    option.series[1].label.formatter = function (value) {
      return `${value.value}`
    }

    return option
  },
  getComplaintsMap (data) {
    let option = JSON.parse(JSON.stringify(commonMap))

    // option.color = '#187FFF'
    let seriesMapData = []
    let defaultMapData = []
    data.forEach(element => {
      let geoCoord = geoCoordMap[element.name]
      if (geoCoord) {
        seriesMapData.push({
          name: element.name,
          value: element.value,
          realValue: element.value,
          sort: element.sort
        })
        // 添加地图默认颜色
        if (element.name === '广东') {
          defaultMapData.push({
            name: element.name,
            value: element.value,
            realValue: element.value,
            sort: element.sort
          })
        }
      }
    })
    seriesMapData.push({
      name: '台湾',
      value: 0,
      provinceCode: '台湾',
      realValue: 0,
      sort: 0
    })
    seriesMapData.push({
      name: '南海诸岛',
      value: 0,
      provinceCode: '南海诸岛',
      realValue: 0,
      sort: 0
    })

    option.series[0].data = this.convertData(defaultMapData)
    option.series[0].symbolSize = 5
    // option.tooltip.trigger = 'item'
    // option.tooltip.formatter = function (params) {
    //   let result = '<div style="color:#FFF;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
    //   result += '<li>' + '投诉量' + '：' + params.data.value.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) + '</li>'
    //   result += '<li>' + '排名' + '：' + params.data.sort + '</li>'
    //   result += '<ul/></div>'
    //   return result
    // }
    option.tooltip.show = false
    option.series[0].label = {
      normal: {
        show: true,
        formatter (params) {
          return ['{t|' + params.data.name + '}', '{c|' + '排名' + '：' + params.data.sort + '}',
            '{c|' + '投诉量' + '：' + thousands(params.data.realValue) + '件}'].join('\n')
        },
        padding: 10,

        offset: [180, -37],
        backgroundColor: {
          image: backgroundImage
        },

        // opacity: 0.7,
        // borderColor: '#0064FE',

        distance: 80,
        borderWidth: 3,
        textStyle: {
          color: '#FFF',
          fontSize: 16
        },
        rich: {
          t: {
            color: '#FFF',
            align: 'left',
            fontSize: 16,
            fontWeight: 700,
            padding: 10

          },

          c: {
            color: '#FFF',
            align: 'left',
            fontSize: 16,
            lineHeight: 20,
            padding: 10

          }
        },
        confine: true

      },
      emphasis: {
        show: true
      }
    }
    // 给第一个添加地图
    option.series[1].data = seriesMapData
    option.grid = { bottom: '15%', left: '20%' }

    seriesMapData = seriesMapData.sort(function (a, b) {
      return a.value - b.value
    })

    option.visualMap.left = '5%'
    option.visualMap.bottom = '10%'
    option.visualMap.min = seriesMapData[0].value
    option.visualMap.max = seriesMapData[seriesMapData.length - 1].value
    console.log('体验页地图', option)
    return option
  },
  getComplaintsBar (data) {
    let option = JSON.parse(JSON.stringify(commonBar))

    let provinceData = []
    let unicomData = []

    data.forEach((item, index) => {
      unicomData.push({
        value: item.value,
        name: item.name,
        sort: item.sort,
        itemStyle: {
          color: '#187FFF'
        }
      })
      if (unicomData[index].name === '广东') {
        unicomData[index].itemStyle.color = '#00ffff'
      }
      provinceData.push(item.name)
    })
    option.tooltip.show = false
    option.tooltip.trigger = 'axis'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + '排名' + '：' + params[0].data.sort + '</li>'
      result += '<li>' + '投诉量' + '：' + thousands(params[0].data.value) + '件</li>'
      result += '<ul/></div>'
      return result
    }
    // option.color = COLOR[4]
    option.grid.top = '0'
    option.grid.bottom = '0'
    option.xAxis.data = provinceData

    option.grid.right = '0'
    option.grid.left = '-6%'
    option.yAxis.show = false

    option.xAxis.axisLabel.margin = 0

    option.xAxis.axisLabel.rotate = 0
    option.xAxis.axisLabel.formatter = function (value) {
      value = value.substr(0, 3)
      // console.log(11111111, value)
      value = value.substring(0, 1) + '\n' + value.substring(1, 2) + '\n' + value.substring(2, 3)
      // console.log(2222222, value)
      return value
    }
    option.xAxis.axisLabel.margin = 20
    option.series[0].data = unicomData

    // option.series[0].label.show = true
    option.series[0].label.color = '#fff'
    option.series[0].label.position = 'top'

    option.series[0].label.formatter = function (v, i) {
      let value = v.data.value
      if (value >= 10000) value = Math.floor(v.data.value / 10000) + '万'
      return value
    }
    return option
  },

  getComplaints (data) {
    let option = JSON.parse(JSON.stringify(commonLine))

    let dataName = []
    let dataCount = []

    data.forEach(item => {
      dataName.push(item.x)
      dataCount.push(item.y)
    })
    option.grid.bottom = '0'
    option.grid.left = '2%'
    option.color = '#21A9FF'
    option.series[0].data = dataCount
    option.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
      offset: 0,
      color: '#00D2FF'
    }, {
      offset: 1,
      color: '#00A2FF'
    }])
    option.series[0].areaStyle.opacity = 0.1
    option.series[0].name = ['投诉量']
    option.series[0].smooth = false
    option.legend.data = ['投诉量']
    option.xAxis.axisLabel.rotate = 0
    option.xAxis.data = dataName
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.fontSize = 12
    option.yAxis.axisLabel.interval = '2'
    option.tooltip.trigger = 'axis'

    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + '投诉量' + '：' + thousands(params[0].data) + '件</li>'
      result += '<ul/></div>'
      return result
    }
    return option
  },
  getTime (data) {
    let option = JSON.parse(JSON.stringify(commonLine))

    let dataName = []
    let dataPegatives = []
    let dataNegatives = []
    data.forEach(item => {
      dataName.push(item.x)
      dataPegatives.push(item.positives)
      dataNegatives.push(item.negatives)
    })
    option.color = ['#00FFFF', '#389CFF']

    option.grid.bottom = '0'
    option.grid.left = '2%'
    let seriesItem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesItem)), JSON.parse(JSON.stringify(seriesItem))]
    option.series[0].data = dataPegatives
    option.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
      offset: 0,
      color: '#00D2FF'
    }, {
      offset: 1,
      color: '#00A2FF'
    }])
    option.series[0].areaStyle.opacity = 0.3
    option.series[0].name = ['正声量']
    option.series[0].smooth = false
    option.tooltip.trigger = 'axis'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + '正声量' + '：' + thousands(params[0].data) + '次</li>'
      result += '<li>' + '负声量' + '：' + thousands(params[1].data) + '次</li>'
      result += '<ul/></div>'
      return result
    }
    option.series[1].smooth = false
    option.series[1].data = dataNegatives
    option.series[1].areaStyle.color = COLOR[4]
    option.series[1].areaStyle.opacity = 0.6
    option.series[1].name = ['负声量']
    option.legend.data = ['正声量', '负声量']
    // let yAxis = option.yAxis
    // 两条线也是连个y轴隐藏一个
    option.yAxis = [JSON.parse(JSON.stringify(yAxis)), JSON.parse(JSON.stringify(yAxis))]
    option.xAxis.axisLabel.rotate = 0
    option.xAxis.data = dataName

    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[0].axisLabel.interval = '2'
    option.yAxis[0].axisLabel.fontSize = 12
    option.yAxis[0].axisLabel.margin = 10
    option.yAxis[0].data = dataPegatives
    option.yAxis[1].axisLabel.show = false
    option.series[1].yAxisIndex = 1

    return option
  },
  getClassify (data) {
    let option = JSON.parse(JSON.stringify(commonPie))
    let placeHolderStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        color: 'rgba(0,0,0,0)',
        borderWidth: 0
      },
      emphasis: {
        color: 'rgba(0,0,0,0)',
        borderWidth: 0
      }
    }
    // 圆环中间文字样式
    let dataStyle = {
      normal: {
        formatter: '{c}%',
        position: 'center',
        show: true,
        textStyle: {
          fontSize: '15',
          fontWeight: 'normal',
          color: '#FFF'
        }
      }
    }

    let titleData = []
    let seriesData = []
    // let data = [
    //   { name: '服务质量', value: '5' },
    //   { name: '资费争议', value: '2' },
    //   { name: '通信质量', value: '1' },
    //   { name: '通信工程', value: '1' },
    //   { name: '通信工程', value: '1' },
    //   { name: '通信工程', value: '1' }
    // ]
    data.forEach(item => {
      // if (item.value.indexOf('%')) {
      //   item.value = item.value.slice(0, item.value.length - 1)
      // }
      titleData.push({
        text: item.name,
        left: '20%',
        top: '30%',
        textAlign: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: '15',
          color: '#fff',
          textAlign: 'center'
        }
      })
      seriesData.push(
        // 第一个图表
        {
          type: 'pie',
          hoverAnimation: false, // 鼠标经过的特效
          radius: ['25%', '35%'],
          center: ['20%', '20%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 100,
            itemStyle: {
              normal: {
                color: ['rgba(176, 212, 251, 0.3)']
              }
            }
          }, {
            value: 35,
            itemStyle: placeHolderStyle
          }]
        },
        // 上层环形配置
        {
          type: 'pie',
          hoverAnimation: false, // 鼠标经过的特效
          radius: ['25%', '35%'],
          center: ['20%', '20%'],
          startAngle: 225,
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: item.value,
            'itemStyle': {
              'normal': {
                'color': new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  'offset': 0,
                  'color': '#D38312'
                }, {
                  'offset': 1,
                  'color': '#A83279'
                }])
              }
            },
            label: dataStyle
          }, {
            value: 35,
            itemStyle: placeHolderStyle
          }

          ]

        }
      )
    })

    option = {
      title: titleData,
      series: seriesData
    }
    // 标题左右方向
    let postionLeft = ['20%', '50%', '80%', '20%', '50%', '80%']
    if (data.length > 2) {
      data.forEach((item, index) => {
        option.title[index].left = postionLeft[index]
      })
    } else if (data.length === 2) {
      option.title[0].left = '30%'
      option.title[1].left = '60%'
    } else if (data.length === 1) {
      option.title[0].left = '50%'
    }
    // 标题上下方向
    let postionTop = ['65%', '30%', '85%']
    if (data.length < 4) {
      data.forEach((item, index) => {
        option.title[index].top = postionTop[0]
      })
    } else if (data.length === 4) {
      option.title[0].top = postionTop[1]
      option.title[1].top = postionTop[1]
      option.title[2].top = postionTop[1]
      option.title[3].top = postionTop[2]
    } else if (data.length === 5) {
      option.title[0].top = postionTop[1]
      option.title[1].top = postionTop[1]
      option.title[2].top = postionTop[1]
      option.title[4].top = postionTop[2]
      option.title[3].top = postionTop[2]
    } else if (data.length === 6) {
      option.title[0].top = postionTop[1]
      option.title[1].top = postionTop[1]
      option.title[2].top = postionTop[1]
      option.title[4].top = postionTop[2]
      option.title[3].top = postionTop[2]
      option.title[5].top = postionTop[2]
    }

    // 图形上下方向
    if (data.length === 1) {
      // option.title[0].top = '65%'
      option.series[0].center = ['50%', '50%']
      option.series[1].center = ['50%', '50%']
    } else if (data.length === 2) {
      // option.title[0].top = '65%'
      // option.title[1].top = '65%'
      option.series[0].center = ['30%', '50%']
      option.series[1].center = ['30%', '50%']
      option.series[2].center = ['60%', '50%']
      option.series[3].center = ['60%', '50%']
    } else if (data.length === 3) {
      // option.title[0].top = '65%'
      // option.title[1].top = '65%'
      // option.title[2].top = '65%'
      // option.title[3].top = '90%'
      option.series[0].center = ['20%', '50%']
      option.series[1].center = ['20%', '50%']
      option.series[2].center = ['50%', '50%']
      option.series[3].center = ['50%', '50%']
      option.series[4].center = ['80%', '50%']
      option.series[5].center = ['80%', '50%']
    } else if (data.length === 4) {
      // option.title[0].top = '35%'
      // option.title[1].top = '35%'
      // option.title[2].top = '35%'
      // option.title[3].top = '85%'
      // option.title[3].top = '90%'
      option.series[0].center = ['20%', '20%']
      option.series[1].center = ['20%', '20%']
      option.series[2].center = ['50%', '20%']
      option.series[3].center = ['50%', '20%']
      option.series[4].center = ['80%', '20%']
      option.series[5].center = ['80%', '20%']
      option.series[6].center = ['20%', '70%']
      option.series[7].center = ['20%', '70%']
    } else if (data.length === 5) {
      // option.title[0].top = '35%'
      // option.title[1].top = '35%'
      // option.title[2].top = '35%'
      // option.title[3].top = '85%'
      // option.title[4].top = '85%'
      // option.title[3].top = '90%'
      option.series[0].center = ['20%', '20%']
      option.series[1].center = ['20%', '20%']
      option.series[2].center = ['50%', '20%']
      option.series[3].center = ['50%', '20%']
      option.series[4].center = ['80%', '20%']
      option.series[5].center = ['80%', '20%']
      option.series[6].center = ['20%', '70%']
      option.series[7].center = ['20%', '70%']
      option.series[8].center = ['50%', '70%']
      option.series[9].center = ['50%', '70%']
    } else if (data.length === 6) {
      // option.title[0].top = '35%'
      // option.title[1].top = '35%'
      // option.title[2].top = '35%'
      // option.title[3].top = '85%'
      // option.title[4].top = '85%'
      // option.title[5].top = '85%'
      option.series[0].center = ['20%', '20%']
      option.series[1].center = ['20%', '20%']
      option.series[2].center = ['50%', '20%']
      option.series[3].center = ['50%', '20%']
      option.series[4].center = ['80%', '20%']
      option.series[5].center = ['80%', '20%']
      option.series[6].center = ['20%', '70%']
      option.series[7].center = ['20%', '70%']
      option.series[8].center = ['50%', '70%']
      option.series[9].center = ['50%', '70%']
      option.series[10].center = ['80%', '70%']
      option.series[11].center = ['80%', '70%']
    }

    return option
  },
  getPositiveSource (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    let dataName = []
    let dataCount = []
    data = data.filter(
      (item) => item.y !== '0'
    )
    data.forEach(item => {
      dataName.push(item.x)
      dataCount.push({
        value: item.y,
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0]
        }
      })
    })

    option.color = '#11EAF0'
    // option.itemStyle.barBorderRadius = [5, 5, 0, 0]
    option.grid.bottom = '5%'
    option.grid.top = '7%'

    option.series[0].data = dataCount

    option.xAxis.data = dataName
    option.xAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.rotate = 0
    option.xAxis.axisLabel.formatter = function (value) {
      value = value.substr(0, 4)
      value = value.substring(0, 2) + '\n' + value.substring(2)
      return value
    }
    option.series[0].label.show = true
    option.series[0].label.color = '#fff'
    option.series[0].label.position = 'top'
    option.series[0].label.formatter = function (v, i) {
      let value = v.data.value
      if (value >= 10000) value = Math.floor(v.data.value / 10000) + '万'
      return value
    }
    option.tooltip.trigger = 'axis'

    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + '正声量来源' + '：' + thousands(params[0].data.value) + '个</li>'
      result += '<ul/></div>'
      return result
    }
    return option
  },
  getNegativeSource (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    let dataName = []
    let dataCount = []

    data.forEach(item => {
      dataName.push(item.x)
      dataCount.push({
        value: item.y,
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0]
        }
      })
    })

    option.color = '#21A7FF'

    option.grid.bottom = '5%'
    option.grid.top = '5%'
    option.series[0].data = dataCount
    // option.itemStyle.barBorderRadius = [5, 5, 0, 0]
    // option.itemStyle.color = '#21A7FF'

    option.xAxis.data = dataName
    option.xAxis.axisLabel.rotate = 0
    option.yAxis.axisLabel.rotate = 0
    option.xAxis.axisLabel.formatter = function (value) {
      value = value.substr(0, 4)
      value = value.substring(0, 2) + '\n' + value.substring(2)
      return value
    }

    option.series[0].label.show = true
    option.series[0].label.color = '#fff'
    option.series[0].label.position = 'top'
    option.series[0].label.formatter = function (v, i) {
      let value = v.data.value
      if (value >= 10000) value = Math.floor(v.data.value / 10000) + '万'
      return value
    }
    option.tooltip.trigger = 'axis'

    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + '负声量来源' + '：' + thousands(params[0].data.value) + '个</li>'
      result += '<ul/></div>'
      return result
    }

    return option
  },
  convertData (data) {
    var res = []
    data.forEach(element => {
      // 因为其他省份没有数据所以会报错
      let geoCoord = geoCoordMap[element.name]
      if (geoCoord) {
        let item = JSON.parse(JSON.stringify(element))
        item.value = geoCoord.concat(item.value)
        res.push(item)
      }
    })
    return res
  }
}
