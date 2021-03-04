import productInfoApi from '@/api/product-info/product-info-api.js'
import { pieSeries } from '@/utils/series_option.js'
import { commonPie, commonLine, color, geoCoordMap, commonMap, tooltip, MapPrevience } from '@/utils/unisk-options.js'
import { backgroundImage } from '@/utils/LifeImage.js'
import { thousands } from '@/utils/index.js'
import Echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  // 获取产品详情数据
  async getProductInfoData (data) {
    let result
    await productInfoApi.getProductInfoList(data).then(res => {
      result = res.data
    })
    console.log(result)
    let options = {
      bigData: result.bigData,
      productInfo: result.productInfo,
      regionOption: this.setRegionOption(result.mapDatas), // 配置（地域分布）option
      incomeOption: this.setIncomeOption(result.incomes), // 配置（收入）option
      newUserOption: this.setNewUserOption(result.users), // 配置（新增订购用户数）option
      terminalOption: this.setTerminalOption(result.platforms), // 配置（终端）option
      mealOption: this.setMealOption(result.networks), // 配置（套餐）option
      activeUserOption: this.setActiveUserOption(result.active)// 配置（活跃用户数）option
    }
    return options
  },
  // 配置（地域分布）option
  setRegionOption (mapDatas) {
    let option = JSON.parse(JSON.stringify(commonMap))
    option.color = color
    let seriesMapData = []
    let defaultMapData = []
    MapPrevience.forEach(element => {
      let flag = false
      mapDatas.forEach(item => {
        if (element.name === item.province) {
          flag = true
          return mapDatas// 知道，mapData里面的省分包含在31省中
        }
      })
      // 找不到   mapData里面不包含element当前的省分
      if (flag === false) {
        mapDatas.push({
          province: element.name,
          users: 0,
          feeUsers: 0,
          permeabilities: 0,
          arpu: 0
        })
      }
    })
    mapDatas.forEach(element => {
      let geoCoord = geoCoordMap[element.province]

      if (geoCoord) {
        seriesMapData.push({

          name: element.province,
          value: element.users,
          realValue: element.users,
          feeUsers: element.feeUsers,
          permeabilities: element.permeabilities + '%',
          arpu: element.arpu
        })

        // 添加地图默认颜色
        if (element.province === '广东') {
          defaultMapData.push({
            name: element.province,
            value: element.users,
            realValue: element.users,
            feeUsers: element.feeUsers,
            permeabilities: element.permeabilities + '%',
            arpu: element.arpu
          })
        }
      }
    })
    // seriesMapData.push({
    //   name: '台湾',
    //   value: 0,
    //   provinceCode: '台湾',
    //   realValue: 0,
    //   feeUsers: 0,
    //   permeabilities: 0,
    //   arpu: 0
    // })
    // seriesMapData.push({
    //   name: '南海诸岛',
    //   value: 0,
    //   provinceCode: '南海诸岛',
    //   realValue: 0,
    //   feeUsers: 0,
    //   permeabilities: 0,
    //   arpu: 0
    // })

    option.series[0].symbolSize = 5
    option.series[0].data = this.convertData(defaultMapData)
    option.geo.zoom = 1.1
    option.tooltip.show = false
    option.series[0].label = {
      normal: {
        show: true,
        formatter (params) {
          if (params.data.permeabilities === '%') {
            params.data.permeabilities = '无'
          } else if (params.data.arpu === '') {
            params.data.arpu = '无'
          } else if (params.data.feeUsers === '') {
            params.data.feeUsers = '无'
          } else if (params.data.realValue === '') {
            params.data.realValue = '无'
          }
          return ['{t|' + params.data.name + '}', '{c|' + '网上用户数' + '：' + thousands(params.data.realValue) + '万户}',
            '{c|' + '网上付费用户数' + '：' + thousands(params.data.feeUsers) + '万户}', '{c|' + '渗透率' + '：' + params.data.permeabilities + '}', '{c|' + 'ARPU值' + '：' + thousands(params.data.arpu) + '元/户}'].join('\n')
          // let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params.data.name + '</li>'
          // result += '<li>网上用户数' + '：' + thousands(params.data.realValue) + '万户</li>'
          // result += '<li>网上付费用户数' + '：' + thousands(params.data.feeUsers) + '万户</li>'
          // result += '<li>渗透率' + '：' + params.data.permeabilities + '%</li>'
          // result += '<li>ARPU值' + ':' + thousands(params.data.arpu) + '元/户' + '</li>'
          // result += '<ul/></div>'

          // return result
        },

        padding: [5, 10, 2],
        offset: [190, -35],
        backgroundColor: {
          image: backgroundImage
        },
        // opacity: 0.7,
        // borderColor: '#0064FE',
        z: 999,
        distance: 90,
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
            padding: [10, 10, 0]

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
    option.visualMap.min = parseInt(seriesMapData[0].value)
    option.visualMap.max = Math.ceil(seriesMapData[seriesMapData.length - 1].value)
    console.log(5555555, option)
    return option
  },
  // 配置（收入）option
  setIncomeOption (incomesData) {
    let option = JSON.parse(JSON.stringify(commonLine))
    let xAxisData = []
    let seriesData = []
    incomesData.forEach(el => {
      xAxisData.push(el['x'])
      seriesData.push(el['y'])
    })
    option = {
      backgroundColor: 'transparent',
      grid: {
        top: '23%',
        left: '10%',
        right: '5%',
        bottom: '16%'
      },
      legend: {
        textStyle: {
          color: '#fff',
          fontSize: 13
        },
        data: ['收入']
      },
      tooltip: {
        trigger: 'axis',
        // padding: 10,
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'transparent',
        // opacity: 0.7,
        // borderColor: '#0064FE',

        // borderWidth: 3,
        textStyle: {
          color: '#FFF',
          fontSize: 16
        },
        formatter: function (params) {
          let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
          result += '<li>' + '收入' + ':' + params[0].data.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) + '万元</li>'

          result += '<ul/></div>'
          return result
        },
        confine: true
      },
      xAxis: [{
        type: 'category',
        axisLine: {
          show: false
        },
        splitArea: {
          // show: true,
          color: '#f00',
          lineStyle: {
            color: '#f00'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 14
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        boundaryGap: false,
        data: xAxisData
      }],
      yAxis: [{
        type: 'value',
        name: '万元',
        // nameLocation: 'middle',
        nameTextStyle: {
          color: '#FFF',
          fontSize: 16,
          padding: [0, 70, 0, 0]
        },
        min: 0,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.3)'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
          lineStyle: {
            width: 3
          }
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            color: '#d1e6eb',
            fontSize: 14
          }
        }
      }],
      series: [{
        name: '收入',
        type: 'line',
        // smooth: true, // 是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          normal: {
            color: '#187FFF'
          }
        },
        itemStyle: {
          color: '#187FFF',
          borderWidth: 3
        },
        areaStyle: {
          // 没有渐变单个透明度 适配ie
          // color: '#194e99',
          // opacity: 0.6
          normal: {
            color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,

              // color: 'rgb(24,127,255,0.3)',
              color: '#194e99',
              opacity: 0.3
            },
            {
              offset: 1,
              // color: 'rgb(24,127,255,0)'
              color: '#0d2552',
              opacity: 0.3
            }
            ], false),
            shadowColor: 'rgba(108,80,243, 0.9)',
            shadowBlur: 20
          }
        },
        data: seriesData
      }
      ]
    }
    // option.tooltip = tooltip

    return option
  },
  // 配置（新增订购用户数）option
  setNewUserOption (usersData) {
    let option = {}
    let xAxisData = []
    let pictorialBarData = []// 象形柱状图数据
    let barData = []// 柱状图数据
    usersData.forEach(el => {
      xAxisData.push(el['x'])
      pictorialBarData.push(el['y'])
    })
    for (let i = 0; i < pictorialBarData.length; i++) {
      barData.push(Math.max(...pictorialBarData))
    }
    option = {
      backgroundColor: 'transparent', // 背景色
      legend: {
        textStyle: {
          color: '#fff',
          fontSize: 13
        },
        icon: 'rect',
        itemWidth: 15,
        type: 'plain',
        data: ['用户数']
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '20%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        // padding: 10,
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'transparent',
        // borderColor: '#0064FE',

        // borderWidth: 3,
        textStyle: {
          color: '#FFF',
          fontSize: 16
        },
        formatter: function (params) {
          let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
          result += '<li>' + '新增用户' + ':' + params[0].data.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) + '户</li>'

          result += '<ul/></div>'
          return result
        },
        confine: true
      },
      xAxis: {
        data: xAxisData,
        triggerEvent: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          interval: 0,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '户',
        // nameLocation: 'middle',
        nameTextStyle: {
          color: '#FFF',
          fontSize: 16,
          padding: [0, 70, 0, 0]
        },
        min: 0,
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.3)'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
          lineStyle: {
            width: 3
          }
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            color: '#d1e6eb',
            fontSize: 14
          }
        }
      },
      // color: ["#e54035"],
      series: [{
        name: '用户数',
        barMinHeight: 10,
        type: 'pictorialBar',
        barCategoryGap: '70%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z', // 凹三角锥形
        itemStyle: {
          normal: {
            color: '#00E3FD'
          }
        },
        label: {
          normal: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          }
        },
        data: pictorialBarData,
        z: 10
      },
      {
        name: 'hill',
        type: 'bar',
        barWidth: '30%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
          normal: {
            color: 'rgba(24,127,255,0.1)'
          }
        },
        data: barData,
        z: 9
      }
      ]
    }
    // option.tooltip = tooltip

    return option
  },
  // 配置（终端）option
  setTerminalOption (platformsData) {
    // 过滤值为0的数据
    let filterData = platformsData.filter(el => {
      return Number(el.value) > 0
    })
    let option = {}
    let color = ['#27d79b', '#00e3fd', '#21a7ff', '#0059e2', '#e2e3e3']
    let [arrName, arrValue, pieSeries, lineYAxis] = [[], [], [], []]
    let sum = 0
    // 数据处理
    filterData.forEach((v, i) => {
      arrName.push(v.name)
      arrValue.push(v.value)
      sum = sum + Number(v.value)
    })
    // 对数据排序 按顺序展示
    filterData = filterData.reverse()
    if (filterData.length === 4) {
      let a = filterData.shift()
      filterData.push(a)
    }
    // 图表option整理
    filterData.forEach((v, i) => {
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
        }],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0)'
          }
        }
      })
      pieSeries.push({
        name: '',
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
        left: 'center',
        top: 'bottom',
        bottom: 20,
        itemWidth: 14,
        textStyle: {
          color: '#fff',
          fontSize: 13
        },
        data: filterData
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
            let item = filterData[params]
            return '{circle|●}{name|' + item.name + '}'
          },
          interval: 0,
          inside: true,
          textStyle: {
            color: '#beceff', // 元字颜色
            fontSize: 14
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
      top: '0%',
      bottom: (104 - filterData.length * 8) + '%',
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
  // 配置（套餐）option
  setMealOption (networksData) {
    console.log('networksData', networksData)
    let option = JSON.parse(JSON.stringify(commonPie))
    let pieSerie = JSON.parse(JSON.stringify(pieSeries))
    option.color = ['#E5E5E5', '#00E5FF', '#0059E2', '#21A8FF', '#AD83EB']
    // 对数据排序 按顺序展示
    networksData = networksData.reverse()
    if (networksData.length === 5) {
      let a = networksData.shift()
      networksData.push(a)
    }
    option.legend.bottom = 10
    option.legend.textStyle = { color: '#fff', fontSize: 14 }
    option.legend.data = networksData
    option.tooltip.show = true
    option.tooltip.trigger = 'item'

    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params.name + '</li>'
      result += '<li>' + '用户数' + '：' + thousands(params.data.value) + '万户</li>'
      result += '<li>' + '占比' + '：' + params.percent + '%</li>'
      result += '<ul/></div>'
      return result
    }

    option.tooltip.trigger = 'item'
    option.series[0] = pieSerie
    option.series[0].minAngle = 10
    option.series[0].data = networksData
    option.series[0].emphasis.labelLine.show = false
    option.series[0].emphasis.label.show = false

    option.series[0].label.rich.t.fontSize = 14
    option.series[0].label.rich.c.fontSize = 18
    option.series[0].itemStyle.normal = {
      borderColor: '#071D5C',
      borderWidth: 5
    }

    option.series[0].radius = ['30%', '50%']
    option.series[0].center = ['50%', '50%']
    option.series[0].label.show = false
    option.series[0].label.formatter = ['{t|{b}} {t|  } {c|{c}个}', '{h|}', '   {t|{d}%}'].join('\n')
    option.series[0].labelLine.normal.length2 = 10
    return option
  },

  // 配置（活跃用户数）option
  setActiveUserOption (activeData) {
    // activeData[0].day = activeData[0].day * 100
    // activeData[0].month = activeData[0].month * 100
    let option = {}
    let dataArr = [
      { name: '日活跃', value: activeData[0].day, positon: ['25%', '85%'] },
      { name: '月活跃', value: activeData[0].month, positon: ['75%', '85%'] }
    ]
    let seriesArr = []
    var rich = {
      gray: {
        fontSize: 16,
        color: '#fff',
        padding: 10
      },
      white: {
        fontSize: 18,
        fontWeight: 500,
        color: '#0086FF',
        padding: [95, 10]
      }
    }
    dataArr.forEach((item, index) => {
      // if(item.value>180){

      // }
      let degreesValue = item.value > 180 ? 180 : item.value

      let dayDegrees = 180 - (180 * parseInt(degreesValue) / 180) // 蓝色刻度尺计算
      let colorSet = [[parseInt(item.value) / 180, '#00B3FE'], [1, '#212D43']]// 蓝色背景
      seriesArr.push(
        // 黑色刻度线
        {
          name: '白色圈刻度',
          type: 'gauge',
          radius: '100%',
          splitNumber: 6,
          center: item.positon,
          startAngle: 180, // 刻度起始
          endAngle: 0, // 刻度结束
          z: 4,
          axisTick: {
            show: false
          },
          splitLine: {
            length: 12, // 刻度节点线长度
            lineStyle: {
              width: 2,
              color: 'rgba(14,15,20, 0.8)'
            } // 刻度节点线
          },
          axisLabel: {
            show: false,
            color: '#FFF',
            fontSize: 12
          }, // 刻度节点文字颜色
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          detail: {
            show: false
          },
          data: [{
            value: 0,
            name: ''
          }]
        },
        // 蓝色数字刻度
        {
          name: '外圈刻度m', // 刻度背景
          type: 'gauge',
          z: 20,
          radius: '165%',
          splitNumber: 6,
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 180,
          center: item.positon, // 整体的位置设置
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [0.8, '#00B3FE'],
                [1, '#212D43']
              ],
              width: 35,
              opacity: 0 // 刻度背景宽度
            }
          },
          splitLine: {
            show: false
          },
          data: [{
            show: false,
            value: '80'
          }],
          axisLabel: {
            show: true,
            distance: 10,
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            formatter: function (value) {
              return value + '%'
            }

          },
          pointer: {
            show: false
          },
          axisTick: {
            show: false
          },
          detail: {
            show: 0
          }
        },
        // 蓝色饼状图
        {
          name: '蓝圈背景', // 刻度背景
          type: 'gauge',
          z: 2,
          radius: '100%',
          splitNumber: 6,
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 15,
          center: item.positon, // 整体的位置设置
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: colorSet,
              width: 12,
              opacity: 1 // 刻度背景宽度
            }
          },
          splitLine: {
            show: false
          },
          data: [{
            show: false,
            value: '80'
          }],
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          axisTick: {
            show: false
          },
          detail: {
            show: 0
          }
        },
        // 黑色小刻度
        {
          name: '刻度尺', // 刻度背景
          type: 'gauge',
          z: 2,
          radius: '80%',
          splitNumber: 6,
          startAngle: 180,
          endAngle: 0,
          // min: 0,
          // max: 15,
          center: item.positon, // 整体的位置设置
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [0.8, '#00B3FE'],
                [1, '#212D43']
              ],
              width: 12,
              opacity: 0 // 刻度背景宽度
            }
          },
          data: [{
            show: false,
            value: '80'
          }],
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#222E48',
              width: 1
            },
            length: 8,
            splitNumber: 6
          },
          detail: {
            show: 0
          },
          splitLine: {
            length: 12, // 刻度节点线长度
            lineStyle: {
              width: 1,
              color: '#222E48'

            } // 刻度节点线
          }
        },
        // 蓝色小刻度
        {
          name: '蓝色刻度尺', // 刻度背景
          type: 'gauge',
          z: 4,
          radius: '80%',
          splitNumber: Math.ceil(parseInt(degreesValue) / 30), // 向上取整
          startAngle: 180,
          endAngle: dayDegrees,
          center: item.positon, // 整体的位置设置
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [
                [0.8, '#00B3FE'],
                [1, '#212D43']
              ],
              width: 12,
              opacity: 0 // 刻度背景宽度
            }
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#00B3FE',
              width: 1
            },
            length: 8,
            splitNumber: 6
          },
          detail: {
            // 展示文字部分
            formatter: function (params) {
              return '{gray|' + item.name + '\n' + '}{white|' + item.value + '%}'
            },
            rich: rich,
            offsetCenter: ['0', '-30%']
          },
          splitLine: {
            length: 12, // 刻度节点线长度
            lineStyle: {
              width: 1,
              color: '#00B3FE'
            } // 刻度节点线
          }
        }
      )
    })
    option = {
      backgroundColor: 'transparent',
      series: seriesArr
    }

    console.log('日活跃', option)
    return option
  },
  // 地图需要用的方法
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
