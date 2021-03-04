// import { from } from 'core-js/fn/array'
import { commonBar, yAxis, xAxis, commonLine, commonPie, tooltip, legend } from '@/utils/unisk-options'
import getUserApi from '@/api/user/user-api.js'
import { thousands } from '@/utils/index.js'
import { backgroundImage } from '@/utils/LifeImage.js'

export default {
  async getUserData (data) {
    const res = await getUserApi.getUserList(data)
    console.log(res, 11111111)
    let options = {
      bigDatas: res.data.bigDatas,
      getProvinceOption: this.getProvinceOption(res.data.provinces),
      getPayOption: this.getPayOption(res.data.feeUsers),
      getActiveOption: this.getActiveOption(res.data.activeUsers),
      getUserOption: this.getUserOption(res.data.products),
      getMealOption: this.getMealOption(res.data.networks),
      getVolteOption: this.getVolteOption(res.data.voltes),
      getGroupOption: this.getGroupOption(res.data.userGroups),
      getTerminalOption: this.getTerminal(res.data.plateforms)
    }

    return options
  },

  // 分省用户
  getProvinceOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))

    // 设置三个颜色
    let color = ['#11EAF0', '#187FFF', '#E2E3E5']
    // 设置数组
    let [feeUsers, arpus, provinces, users] = [[], [], [], []]
    data.forEach(item => {
      // 添加name和Value
      if (item.permeability.indexOf('%')) {
        item.permeability = item.permeability.slice(0, item.permeability.length - 1)
      }
      feeUsers.push({

        name: item.name,
        value: item.feeUsers
      })
      arpus.push({
        name: item.name,
        value: item.arpu,
        permeability: item.permeability
      })
      users.push({
        name: item.name,
        value: item.users,
        permeability: item.permeability
      })
      // 添加y轴
      provinces.push(item.name)
    })

    option.grid.bottom = '1%'
    option.grid.right = '15%'
    option.grid.left = '-3%'

    // 这个是X轴
    option.xAxis = [JSON.parse(JSON.stringify(yAxis)), JSON.parse(JSON.stringify(yAxis))]

    option.xAxis[0].position = 'bottom'
    option.xAxis[0].name = '万户'
    option.xAxis[0].type = 'value'
    option.xAxis[0].axisLabel.rotate = 0
    // option.xAxis[0].axisLabel.formatter = function (v, i) {
    //   return Math.floor(v)
    // }
    option.xAxis[1].position = 'top'
    option.xAxis[1].axisLabel.show = false

    option.yAxis = [JSON.parse(JSON.stringify(xAxis)), JSON.parse(JSON.stringify(xAxis))]
    option.yAxis[0].data = provinces
    option.yAxis[0].axisLabel.interval = 0
    option.yAxis[0].axisLabel.margin = 28
    option.yAxis[0].axisLabel.rotate = 0

    option.yAxis[1].data = provinces
    option.yAxis[1].axisLabel.show = false
    option.yAxis[1].axisLine.show = false
    option.yAxis[1].axisLabel.rotate = 0

    option.legend.data = ['月度用户贡献均值', '出账用户数', '大网用户数']
    option.legend.top = '1%'
    // option.legend.bottom = '3%'

    option.padding = [5, 10]
    option.tooltip.trigger = 'axis'
    // option.tooltip.backgroundColor = '#062379'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + params[0].seriesName + '：' + thousands(params[0].data.value) + '元/户</li>'
      result += '<li>' + params[1].seriesName + '：' + thousands(params[1].data.value) + '万户</li>'
      result += '<li>' + params[2].seriesName + '：' + thousands(params[2].data.value) + '万户</li>'
      result += '<li>' + '大网渗透率：' + params[2].data.permeability + '%' + '</li>'
      result += '<ul/></div>'

      return result
    }
    option.series = [{
      name: ['月度用户贡献均值'],
      type: 'line',
      symbol: 'circle',
      symbolSize: 10,
      smooth: true,
      xAxisIndex: 1,
      data: arpus,
      color: color[0]
    },
    {
      name: ['出账用户数'],
      type: 'bar',
      barWidth: '10',
      stack: 'b',
      xAxisIndex: 0,
      yAxisIndex: 1,
      data: feeUsers,
      zlevel: 2,
      color: color[1]
    },
    {
      name: ['大网用户数'],
      type: 'bar',
      barWidth: '10',
      xAxisIndex: 0,
      yAxisIndex: 1,
      barGap: '-100%',
      data: users,
      zlevel: 1,
      color: color[2]
    }
    ]

    return option
  },
  // 付费用户
  getPayOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = ['#00E3FD', '#0368F8']
    option.series[1] = {
      type: 'line',
      name: '',
      symbol: 'circle',
      symbolSize: 4,
      data: []
    }
    let xAxisData = []
    let barData = []
    let lineData = []

    data.forEach(item => {
      xAxisData.push(item.x)
      barData.push(item.users)
      if (item.ratio.indexOf('%')) {
        item.ratio = item.ratio.slice(0, item.ratio.length - 1)
      }
      lineData.push(item.ratio)
    })

    option.legend.data = ['用户数', '增长量']
    option.legend.top = '0'
    option.xAxis.data = xAxisData
    option.xAxis.axisLabel.rotate = 0

    const yAxisItem = option.yAxis
    option.yAxis = [JSON.parse(JSON.stringify(yAxisItem)), JSON.parse(JSON.stringify(yAxisItem))]
    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[0].position = 'left'
    option.yAxis[0].name = '万户'
    option.yAxis[1].axisLabel.rotate = 0
    option.yAxis[1].position = 'right'
    option.yAxis[1].axisLabel.show = false
    option.series[0].name = option.legend.data[0]
    option.series[0].data = barData
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
      result += '<li>' + params[0].seriesName + '：' + thousands(params[0].value) + '万户</li>'
      result += '<li>' + params[1].seriesName + '：' + thousands(!params[1].value ? '无' : (params[1].value + '%')) + '</li>'
      result += '<ul/></div>'
      return result
    }
    option.series[1].name = option.legend.data[1]
    option.series[1].data = lineData
    option.series[1].yAxisIndex = 1
    option.grid.left = '3%'
    option.grid.top = '20%'
    option.grid.bottom = '10%'
    return option
  },
  // 活跃用户
  getActiveOption (data) {
    let option = JSON.parse(JSON.stringify(commonBar))
    option.color = ['#00E3FD', '#0368F8']
    option.series[1] = {
      type: 'line',
      name: '',
      symbol: 'circle',
      symbolSize: 4,
      data: []
    }
    let xAxisData = []
    let barData = []
    let lineData = []

    data.forEach((item, index) => {
      xAxisData.push(item.x)
      barData.push(item.users)
      if (item.ratio.indexOf('%')) {
        item.ratio = item.ratio.slice(0, item.ratio.length - 1)
      }
      lineData.push(item.ratio)
    })
    option.tooltip.trigger = 'axis'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + params[0].seriesName + '：' + thousands(params[0].value) + '万户</li>'
      result += '<li>' + params[1].seriesName + '：' + thousands(!params[1].value ? '无' : (params[1].value + '%')) + '</li>'
      result += '<ul/></div>'
      return result
    }
    option.legend.data = ['用户数', '增长量']
    option.legend.top = '0'
    option.xAxis.data = xAxisData
    option.xAxis.axisLabel.rotate = 0

    const yAxisItem = option.yAxis
    option.yAxis = [JSON.parse(JSON.stringify(yAxisItem)), JSON.parse(JSON.stringify(yAxisItem))]
    option.yAxis[0].axisLabel.rotate = 0
    option.yAxis[0].position = 'left'
    option.yAxis[0].name = '万户'
    option.yAxis[1].axisLabel.rotate = 0
    option.yAxis[1].position = 'right'
    option.yAxis[1].axisLabel.show = false
    option.series[0].name = option.legend.data[0]
    option.series[0].data = barData
    option.series[0].label.show = true
    option.series[0].label.color = '#fff'
    option.series[0].label.position = 'top'
    option.series[0].label.formatter = function (v, i) {
      let value = v.data.value
      if (value >= 10000) value = Math.floor(v.data.value / 10000) + '万'
      return value
    }
    option.series[1].name = option.legend.data[1]
    option.series[1].data = lineData
    option.series[1].yAxisIndex = 1

    option.grid.top = '20%'
    option.grid.left = '3%'
    option.grid.bottom = '10%'
    return option
  },
  // 用户分布
  getUserOption (data) {
    let option = JSON.parse(JSON.stringify(commonLine))

    let dataName = []
    // let dataCount = []
    data = data.filter((item) =>
      item.y > 100
    )
    let datas = []

    data.forEach(item => {
      dataName.push(item.x)

      datas.push({

        name: item.x,
        value: (item.y / 10000).toFixed(2),
        top5: item.tops
      })
    })

    option.color = '#21A9FF'
    option.tooltip.position = function (point, params, dom, rect, size) {
      // 固定在顶部
      return [point[0], '-10%']
    }
    // option.tooltip.position = [10, 10]
    option.tooltip.padding = [3, 10, 3]
    // 鼠标离开浮窗还会停留
    // option.tooltip.enterable = true
    option.tooltip.trigger = 'axis'
    option.tooltip.formatter = function (params) {
      let result = '<div  style="background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><div style="text-align:left;font-weight:600;height:10px;width:6px;margin-top:0;font-size:18px;">' + params[0].name + '个产品</div>' +
             '<div style="text-align:left;margin-top:9px;font-weight:800;font-size:18px;">' + thousands(params[0].value) + '万户' + '</div>'
      result += '<p  style="font-size:14px; margin-top:0px";margin-bottom:3px;>产品TOP5清单：<p>'
      result += '<table style="margin-top:-3px; border-spacing:0px;font-size:14px;"><tr style="font-size:14px;"><th>排名</th><th>产品名称</th><th>用户数</th></tr>'
      params[0].data.top5.forEach(function (item, index) {
        if (index > 4) return
        let users = item.users
        if (users > 0) {
          result += '<tr style="margin:0;padding:0;font-size:14px;"><td style="margin:0";padding:0;>' + (index + 1) + '</td><td style="margin:0";padding:0;>' + item.produce + '</td><td style="margin:0";padding:0;>' + thousands(((users / 10000).toFixed(2) + '万户')) + '</td></tr>'
        }
      })
      result += '</table></div>'

      return result
    }
    option.series[0].data = datas
    option.series[0].smooth = false
    option.series[0].areaStyle.color = '#21A9FF'
    option.series[0].areaStyle.opacity = 0.3
    option.series[0].name = ['用户数']
    option.legend.data = ['用户数']
    option.xAxis.axisLabel.rotate = 0
    option.xAxis.data = dataName
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.name = '万户'
    option.grid.left = '3%'
    option.grid.bottom = '3%'

    return option
  },
  getMealOption (data) {
    let option = JSON.parse(JSON.stringify(commonPie))
    // 对数据排序 按顺序展示
    data = data.reverse()
    if (data.length === 5) {
      let a = data.shift()
      data.push(a)
    }
    console.log('data', data)
    let dataName = []
    let dataRatio = []
    data.forEach(item => {
      dataName.push(item.name)
      if (item.ratio.indexOf('%')) {
        item.ratio = item.ratio.slice(0, item.ratio.length - 1)
      }
      dataRatio.push(item.ratio)
    })
    option.color = ['#f8f386', '#f3aa72', '#00e3fd', '#0063fb', '#a26cf7', '#21a9ff', '#e2e3e3']
    option.legend.data = dataName

    option.legend.show = true

    option.legend.left = '5%'
    option.legend.bottom = '17%'
    // option.legend.top = '20%'
    option.legend.orient = 'vertical'
    option.series[0].label.show = false
    option.series[0].minAngle = 10
    // option.series[0].startAngle = 90
    // option.series[0].minShowLabelAngle = 90
    option.series[0].emphasis.label.show = false
    option.series[0].data = data
    // option.series[0].bottom = '10'
    option.tooltip.show = true
    option.zlevel = 100

    option.series[0].bottom = '10%'
    option.series[0].left = '5%'
    option.series[0].radius = [55, 70]
    option.series[0].roseType = false
    option.series[0].itemStyle.normal.borderWidth = 0
    option.tooltip.trigger = 'item'

    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
      result += '<li>' + '用户数' + '：' + thousands(params.data.value) + '万户</li>'
      result += '<li>' + '占比' + '：' + params.percent + '%</li>'
      result += '<ul/></div>'
      return result
    }
    // console.log(2222, option)
    return option
  },
  getVolteOption (data) {
    // console.log('data', data)
    let option = JSON.parse(JSON.stringify(commonPie))
    let colors = ['#0063fb', '#00e3fd']
    let colorT = ['#004bbe', '#00a6b9']
    let dataName = []
    let dataRatio = []
    let dataValue = []
    // 添加series隐藏半圆使用的数据
    // 将需要的数组过滤出来得到一个只有数字的数组
    let dataCounts = data.map(item =>
      Number(item.value)
    )
    // 使用reduce将这个数组的所有值相加
    const reducer = (accumulator, currentValue) => {
      // console.log(accumulator + '|' + currentValue)
      return accumulator + currentValue
    }
    let dataCount = dataCounts.reduce(reducer)
    let dataTwo = []
    data.forEach((item, index) => {
      dataName.push(item.name)
      if (item.ratio.indexOf('%')) {
        item.ratio = item.ratio.slice(0, item.ratio.length - 1)
      }
      dataRatio.push(item.ratio)

      dataValue.push({
        name: item.name,
        value: item.value,
        ratio: item.ratio,
        itemStyle: {
          color: colors[index]
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (params) {
            // console.log('params', params)
            let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
            result += '<li>' + '用户数' + '：' + thousands(params.data.value) + '万户</li>'
            result += '<li>' + '占比' + '：' + params.data.ratio + '%</li>'
            result += '<ul/></div>'
            return result
          }
        }
      })
      dataTwo.push({
        // name: item.name,
        value: item.value,
        ratio: item.ratio,
        itemStyle: {
          color: colorT[index]
        }
      })
    })
    dataValue.push({
      value: dataCount,
      name: '',
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        normal: {
          color: 'transparent',
          borderWidth: 0,
          shadowBlur: 0,
          borderColor: 'transparent',
          shadowColor: 'transparent'
        }
      }
    })
    dataTwo.push({
      value: dataCount,
      name: '',
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        normal: {
          color: 'transparent',
          borderWidth: 0,
          shadowBlur: 0,
          borderColor: 'transparent',
          shadowColor: 'transparent'
        }
      }
    })
    option.legend.data = dataName

    option.legend.show = true
    option.legend.left = '31%'
    option.legend.bottom = '25%'
    option.legend.orient = 'horizontal'
    option.series[0].label.show = true
    option.series[0].emphasis.label.show = false
    // option.series[0].roseType = 'radius'
    option.series[0].startAngle = 180
    option.series[0].itemStyle.normal.borderWidth = 0
    option.series[0].data = dataValue
    option.series[0].top = '51%'
    // option.series[0].itemStyle.color = ['#0063fb', '#00e3fd']

    // option.series[0].bottom = 0
    option.series[0].radius = ['248%', '300%']
    option.series[0].center = ['center', '55%']
    option.series[0].label = {
      normal: {
        show: true,
        position: 'inside',
        textStyle: {
          fontSize: '16',
          color: '#FFF'
        },
        formatter (params) {
          return params.data.ratio + '%'
        }

      }

    }
    option.series[1] = {
      type: 'pie',
      // color: '#fff',
      startAngle: 180,
      top: '49%',
      radius: ['235%', '248%'],
      center: ['center', '55%'],
      // itemStyle: {
      //   color: ['#004bbe', '#00a6b9']
      // },
      silent: true,
      data: dataTwo
    }

    option.tooltip.show = false
    // option.tooltip.trigger = 'item'
    // option.tooltip.formatter = function (params) {
    //   console.log('params', params)
    //   let result = '<div style="color:#FFF;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
    //   result += '<li>' + '用户数' + '：' + thousands(params.data.value) + '万户</li>'
    //   result += '<li>' + '占比' + '：' + params.data.ratio + '%</li>'
    //   result += '<ul/></div>'
    //   return result
    // }
    console.log(111, option)
    return option
  },
  getTerminal (platformsData) {
    let option = JSON.parse(JSON.stringify(commonPie))

    let color = ['#27d79b', '#00e3fd', '#21a9ff', '#005ff3', '#e2e3e3']
    let [arrName, arrValue, pieSeries, lineYAxis] = [[], [], [], []]
    let sum = 0
    // 过滤值为0的数据
    platformsData = platformsData.filter(el => {
      return Number(el.value) > 0
    })
    // 数据处理
    platformsData.forEach((v, i) => {
      arrName.push(v.name)
      arrValue.push(v.value)
      sum = sum + Number(v.value)
    })
    // 对数据排序 按顺序展示
    platformsData = platformsData.reverse()
    let a = platformsData.shift()
    platformsData.push(a)
    // 图表option整理
    platformsData.forEach((v, i) => {
      pieSeries.push({
        name: '终端',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: [85 - i * 15 + '%', 77 - i * 15 + '%'],
        center: ['50%', '43%'],
        label: {
          show: false
        },
        data: [{
          value: v.value,
          name: v.name
        }, {
          value: sum - v.value,
          name: '',
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          },
          tooltip: {
            show: false
          }
        }]
      })
      pieSeries.push({
        name: '背景',
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: false, // 顺时加载
        hoverAnimation: false, // 鼠标移入变大
        radius: [85 - i * 15 + '%', 77 - i * 15 + '%'],
        center: ['50%', '43%'],
        label: {
          show: false
        },
        data: [{
          value: 7.5,
          itemStyle: {
            color: 'rgba(255,255,255,0.1)' // 圆环颜色
          },
          tooltip: {
            show: false
          }
        }, {
          value: 2.5,
          name: '',
          itemStyle: {
            color: 'rgba(0,0,0,0)'
          },
          tooltip: {
            show: false
          }
        }]
      })
      v.percent = (v.value / sum * 100).toFixed(1) + '%'
      lineYAxis.push({
        value: i,
        textStyle: {
          rich: {
            circle: {
              color: color[i],
              padding: [0, 5]
            }
          }
        }
      })
    })

    option = {
      backgroundColor: 'transparent',
      color: color,
      tooltip: tooltip,
      legend: {
        left: '5%',
        orient: 'vertical',
        top: 'middle',
        itemWidth: 14,
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        data: platformsData
      },
      yAxis: [{
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: function (params) {
            let item = platformsData[params]
            return '{circle|●}{name|' + item.name + '}'
          },
          interval: 0,
          inside: true,
          textStyle: {
            color: '#beceff', // 元字颜色
            fontSize: 14,
            rich: {
              line: {
                width: 170,
                height: 2, // 标线高度
                backgroundColor: 'rgba(255,255,255,0.1)' // 标线颜色
              },
              name: {
                color: '#beceff',
                fontSize: 12
              },
              bd: {
                color: '#beceff',
                padding: [0, 5],
                fontSize: 12
              },
              percent: {
                color: '#beceff',
                fontSize: 14
              },
              value: {
                color: '#beceff',
                fontSize: 16,
                fontWeight: 500,
                padding: [0, 0, 0, 20]
              }
            }
          },
          show: true
        },
        data: lineYAxis
      }],
      xAxis: [{
        show: false
      }],
      series: pieSeries
    }
    // 标记点动态偏移处理
    option.grid = {
      top: '0',
      bottom: (104 - platformsData.length * 8) + '%',
      left: '50%',
      containLabel: false
    }
    option.tooltip.trigger = 'item'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
      result += '<li>' + '用户数' + '：' + thousands(params.data.value) + '万户</li>'
      result += '<li>' + '占比' + '：' + params.percent + '%</li>'
      result += '<ul/></div>'
      return result
    }
    return option
  },
  getGroupOption (data) {
    let option = JSON.parse(JSON.stringify(commonPie))

    let dataName = []
    let dataCount = []
    option.color = ['#f8f386', '#f3aa72', '#00e3fd', '#0063fb', '#a26cf7', '#21a9ff', '#e2e3e3']
    let colorSex = ['#a26cf7', '#db4f4f', '#21a9ff']
    data.ages.forEach(item => {
      if (item.value.indexOf('%')) {
        item.value = item.value.slice(0, item.value.length - 1)
      }
      dataName.push(item.name)
      dataCount.push({

        name: item.name,
        value: item.value
      })
    })

    let dataSexName = []
    let dataSexCount = []

    data.genders.forEach((item, index) => {
      if (item.value.indexOf('%')) {
        item.value = item.value.slice(0, item.value.length - 1)
      }
      dataSexName.push(item.name)

      dataSexCount.push({
        name: item.name,
        value: item.value,
        itemStyle: {
          color: colorSex[index]
        }
      })
    })
    dataSexName = dataSexName.reverse()
    let seriesitem = option.series[0]
    option.series = [JSON.parse(JSON.stringify(seriesitem)), JSON.parse(JSON.stringify(seriesitem))]
    option.legend = [JSON.parse(JSON.stringify(legend)), JSON.parse(JSON.stringify(legend))]
    option.legend[0].data = dataName
    option.legend[0].type = 'scroll'
    option.legend[0].show = true
    option.legend[0].left = '75%'
    option.legend[0].right = '0'
    option.legend[0].bottom = '5%'
    // option.legend[0].textStyle.fontSize = 16
    option.legend[0].orient = 'vertical'
    option.series[0].label.show = false
    option.series[0].emphasis.label.show = false
    option.series[0].data = dataCount
    option.series[0].bottom = '0'
    option.series[0].top = '0'
    option.series[0].left = '0'
    option.series[0].itemGap = 3
    option.series[0].radius = ['65%', '80%']
    option.series[1].radius = '50%'
    option.legend[1].left = '5%'
    option.legend[1].bottom = '25%'
    option.legend[1].show = true
    option.legend[1].data = dataSexName
    // option.legend[1].textStyle.fontSize = 12
    option.legend[1].orient = 'vertical'
    option.series[1].left = '1%'

    option.series[1].emphasis.label.show = false
    option.series[1].label.show = true
    option.series[1].labelLine = {
      show: true,
      length: 2,
      length2: 1
    }
    option.series[1].label = {
      normal: {
        show: true,
        position: 'outside',
        textStyle: {
          fontSize: '12',
          color: '#FFF'
        },
        formatter: function (params) {
          return params.name
        }

      }
    }
    // option.series[1].label.position = 'inside'
    option.series[1].data = dataSexCount.sort(function (a, b) { return a.value - b.value })
    option.series[1].bottom = '11%'
    option.series[1].top = '15%'
    option.series[0].roseType = false
    option.series[1].roseType = 'radius'

    option.tooltip.trigger = 'item'

    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
      result += '<li>' + '用户数' + '：' + thousands(params.data.value) + '万户</li>'
      result += '<li>' + '占比' + '：' + params.percent + '%</li>'
      result += '<ul/></div>'
      return result
    }
    return option
  }

}
