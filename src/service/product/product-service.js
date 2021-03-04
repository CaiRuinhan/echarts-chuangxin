import ProductApi from '@/api/product/product-api.js'
import { pieSeries, batteryBarSeries } from '@/utils/series_option.js'
import {
  commonGraph, commonLine, commonPie, commonProduct3D

} from '@/utils/unisk-options.js'
import { backgroundImage } from '@/utils/LifeImage.js'
import lifeImagePath from '@/service/product/life-option-image.js'
import echarts from 'echarts'

export default {

  // 获取产品页数据
  async getProductData (data) {
    let result
    await ProductApi.getProductList(data).then(res => {
      result = res.data
    })

    let options = {
      // toPlay: this.toPlay(showNum),
      lifeOption: this.setLifeOption(result.lifeCycles),
      tricurveData: result.threes,
      incomesOption: this.setIncomesOption(result.incomes),
      usersOption: this.setUsersOption(result.users),
      marketOption: this.setMarketOption(result.markets),
      knowledgeOption: this.setKnowledgeOption(result.knowledges),
      subcompanyOption: this.setSubcompanyOption(result.subCompanys)
    }
    return options
  },
  // 配置（生命周期产品数量）option
  setLifeOption (lifeCyclesData) {
    let option = JSON.parse(JSON.stringify(commonGraph))
    option.series[0].symbol = lifeImagePath.getLifeImagePath() // 图片转为DataUrl
    option.series[0].symbolSize = function (value, params) { // 背景图片大小
      let v = (Number(value) + 10) * 8
      if (params.name === '总计') {
        v = 175
      } else {
        if (v < 115) {
          v = 115
        } else if (v > 165) {
          v = 165
        }
      }
      return v
    }
    option.series[0].label.normal.formatter = function (params) { // 字体样式
      return params.name === '总计'
        ? `{totalTitle| ${params.value}}` + '{totalUnit|个}' + '\n' + `{totalName| ${params.name}}`
        : `{title| ${params.value}}` + '{unit|个}' + '\n' + `{name| ${params.name}}`
    }
    option.series[0].data = lifeCyclesData
    return option
  },
  // 请求产品总视图的数据
  lifeIndex: 0,
  lifecycleDatas: null,
  // 获取产品页数据
  async getProducts (data, showNum) {
    // let results
    await ProductApi.getProducts(data).then(res => {
      // console.log(2222, res)
      // results = res.data
      this.lifecycleDatas = res.data
    })

    // // 如果lifeINdex===0且这个没有数据就是空
    // if (this.lifeIndex === 0 && !this.lifecycleDatas) {
    //   if (
    //     !data.market &&
    //   !data.knowledge &&
    //   !data.lifeCycles
    //   ) {
    //     this.lifeIndex = 4
    //   }
    // }

    let options = {
      toPlay: this.toPlay(showNum),
      productViewOption: this.setProductViewOption(this.lifecycleDatas)
    }
    return options
  },

  // 配置（产品总视图）option
  setProductViewOption (data) {
    let option = JSON.parse(JSON.stringify(commonProduct3D))

    let xAxisData = []
    let incomesData = []
    let sideData = []
    let nameData = []
    let marketData = []
    let pidData = []
    let subCompanyData = []
    let colorLine = {
      '孵化期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#A3F7FF'
      }, {
        offset: 1,
        color: '#2E93FF'
      }]),
      '成长期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#21A7FF'
      }, {
        offset: 1,
        color: '#002CC9'
      }]),
      '成熟期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#AB58FF'
      }, {
        offset: 1,
        color: '#0059E2'
      }]),
      '衰退期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#C4E2FF'
      }, {
        offset: 1,
        color: '#0059E2'
      }])
    }
    let colorHeight = {
      '孵化期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#51fff6'
      }, {
        offset: 1,
        color: '#31dbe6 '
      }]),
      '成长期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#8dfeff'
      }, {
        offset: 1,
        color: '#30bbec'
      }]),
      '成熟期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#dec0f6'
      }, {
        offset: 1,
        color: '#38beeb'
      }]),
      '衰退期': new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: '#f8fdff'
      }, {
        offset: 1,
        color: '#3fe1f1'
      }])
    }

    data.forEach(item => {
      incomesData.push({
        value: Number(item.income) + 9,
        itemStyle: {
          color: colorLine[item.lifeCycle]
        },
        emphasis: {
          itemStyle: {
            color: colorHeight[item.lifeCycle]
          }
        },
        incomes: item.income,
        name: item.name,
        market: item.market,
        pid: item.pid,
        subCompany: item.subcompany,
        detail: item.detail
      })

      sideData.push({
        value: Number(item.income) + 9,
        itemStyle: {
          color: colorLine[item.lifeCycle]
        },

        incomes: item.income,
        name: item.name,
        market: item.market,
        pid: item.pid,
        subCompany: item.subcompany,
        detail: item.detail

      }
      )
      nameData.push(item.name)
      marketData.push(item.market)
      pidData.push(item.pid)
      subCompanyData.push(item.subcompany)
    })
    let detailData = []
    data.forEach(val => {
      detailData.push({
        incomes: val.income,
        name: val.name,
        market: val.market,
        pid: val.pid,
        subCompany: val.subcompany
      })
    })
    let stageLst = []

    let colorLst = {
      '孵化期': '#02caf2',
      '成长期': '#29c896',
      '成熟期': '#425ced',
      '衰退期': '#b0dbff'

    }

    const len = data.length
    let count = 0
    let str = ''
    // 配置底线样式
    data.forEach((element, key) => {
      if (str !== '' && str !== element.lifeCycle) {
        stageLst.push({

          name: str,
          percent: (count / len) * 100 + '%',
          color: '#fff',
          substyle: 'width: ' + (count / len) * 100 + '%' + ';border-top: 2px solid ' + colorLst[str]
        })
        count = 0
      }

      count++
      str = element.lifeCycle
      if (key === len - 1) {
        stageLst.push({

          name: str,
          percent: (count / len) * 100 + '%',
          color: '#fff',
          substyle: 'width: ' + (count / len) * 100 + '%' + ';border-top: 2px solid ' + colorLst[str]
        })
      }
    })

    option.series[0].data = incomesData
    option.series[0].name = nameData
    option.series[0].pid = pidData
    option.series[0].income = incomesData
    option.series[0].market = marketData
    option.series[0].subCompany = subCompanyData
    option.series[1].name = nameData
    option.series[1].data = sideData

    option.series[2].data = incomesData
    option.series[2].name = nameData
    // 配置上面文字
    option.series[2].label.normal.formatter = function (params) {
      if (params.seriesName[params.dataIndex] && params.seriesName[params.dataIndex] !== '') {
        return params.seriesName.split(',')[params.dataIndex].split('').join('\n')
      } else {
        return ''
      }
    }

    // 配置浮窗
    option.series[0].tooltip.trigger = 'item'
    option.series[1].tooltip.trigger = 'item'
    option.series[2].tooltip.trigger = 'item'
    option.series[0].tooltip.formatter = function (params) {
      let result = ''
      result += '<div style="background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><h2>' + params.name + '</h2>'
      result += '<hr><div style="margin-top:15px;font-size:16px;font-weight:600;">'
      // <br><p style="line-height:3px;margin-top:1px;">' + params.marker + '<b style="color:red;">收入：</b>' + params.data.income + '万</p><br>'

      // result += '<p style="line-height:3px;">' + params.marker + '<b style="color:red;">' + res.key + '：</b>'
      if (params.data.detail.length > 20) {
        let n = Math.floor(params.data.detail.length / 20) + 1
        for (let i = 0; i < n; i++) {
          if (i === 0) {
            result += '<p style="margin-top:5px;line-height:3px;">' + params.data.detail.substring(i * 20, 20) + '</p><br>'
          } else {
            result += '<p style="line-height:3px;">' + params.data.detail.substr(i * 20, 20) + '</p><br>'
          }
        }
      } else {
        result += params.data.detail + '</p><br>'
      }

      result += '</div></div>'
      return result
    }
    option.series[1].tooltip.formatter = function (params) {
      let result = ''
      result += '<div style="background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><h2>' + params.name + '</h2>'
      result += '<hr><div style="margin-top:15px;font-size:16px;font-weight:600;">'
      // <br><p style="line-height:3px;margin-top:1px;">' + params.marker + '<b style="color:red;">收入：</b>' + params.data.income + '万</p><br>'

      // result += '<p style="line-height:3px;">' + params.marker + '<b style="color:red;">' + res.key + '：</b>'
      if (params.data.detail.length > 20) {
        let n = Math.floor(params.data.detail.length / 20) + 1
        for (let i = 0; i < n; i++) {
          if (i === 0) {
            result += '<p style="margin-top:5px;line-height:3px;">' + params.data.detail.substring(i * 20, 20) + '</p><br>'
          } else {
            result += '<p style="line-height:3px;">' + params.data.detail.substr(i * 20, 20) + '</p><br>'
          }
        }
      } else {
        result += params.data.detail + '</p><br>'
      }

      result += '</div></div>'
      return result
    }
    option.series[2].tooltip.formatter = function (params) {
      let result = ''
      result += '<div style="background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><h2>' + params.name + '</h2>'
      result += '<hr><div style="margin-top:15px;font-size:16px;font-weight:600;">'
      // <br><p style="line-height:3px;margin-top:1px;">' + params.marker + '<b style="color:red;">收入：</b>' + params.data.income + '万</p><br>'

      // result += '<p style="line-height:3px;">' + params.marker + '<b style="color:red;">' + res.key + '：</b>'
      if (params.data.detail.length > 20) {
        let n = Math.floor(params.data.detail.length / 20) + 1
        for (let i = 0; i < n; i++) {
          if (i === 0) {
            result += '<p style="margin-top:5px;line-height:3px;">' + params.data.detail.substring(i * 20, 20) + '</p><br>'
          } else {
            result += '<p style="line-height:3px;">' + params.data.detail.substr(i * 20, 20) + '</p><br>'
          }
        }
      } else {
        result += params.data.detail + '</p><br>'
      }

      result += '</div></div>'
      return result
    }

    option.yAxis.axisLabel.show = false
    option.xAxis.axisLabel.show = false
    option.xAxis.axisLine.show = false
    option.xAxis.data = xAxisData
    option.xAxis.axisLabel.rotate = 0
    // 配置底线下面的文字
    option.xAxis.axisLabel.formatter = function (params) {
      return params
    }
    option.grid.top = '20%'
    option.grid.bottom = '20%'
    option.grid.right = '5%'
    // console.log(11111, option)
    return {
      option,
      stageLst,
      detailData

    }
  },
  // 产品总视图相关方法
  toPlay (showNum) {
    // 如果这个返回数据的长度小于showNUm那么就会使相等就会展示这个长度
    if (this.lifecycleDatas.length < showNum) {
      showNum = this.lifecycleDatas.length
    }

    // 截取这个就要展示
    let res = this.lifecycleDatas.slice(this.lifeIndex, this.lifeIndex + showNum)
    const len = res.length
    // 如果这个长度小于这个
    if (len < showNum) {
      res = res.concat(this.lifecycleDatas.slice(0, showNum - len))
    }

    return this.setProductViewOption(res)
  },
  // 产品总视图相关方法
  toShowOfIndex (type, count, showNum) {
    if (!this.lifecycleDatas || !this.lifecycleDatas) return
    if (type === 'next') {
      // 如果是调用这个方法那么就是下一个加上每次点击调用的
      this.lifeIndex = this.lifeIndex + count
      // 如果点击的小于总的长度那么就是目前的位置否则的就就到0因为是下一个就是循环开始
      this.lifeIndex = (this.lifeIndex < this.lifecycleDatas.length) ? this.lifeIndex : 0
    }
    if (type === 'prev') {
      // 上一页就是点击每次都往上走相应的
      this.lifeIndex = this.lifeIndex - count
      // 如果点击的小于0那么就是往下走
      this.lifeIndex = (this.lifeIndex < 0) ? this.lifecycleDatas.length + this.lifeIndex : this.lifeIndex
    }

    return this.toPlay(showNum)
  },
  // 配置（总视图-收入）option
  setIncomesOption (incomesData) {
    let option = JSON.parse(JSON.stringify(commonLine))
    let xAxisData = []
    let seriesData = []
    incomesData.forEach(el => {
      xAxisData.push(el['x'])
      seriesData.push(el['y'])
    })

    option.series[0].data = seriesData
    option.series[0].smooth = false

    option.series[0].areaStyle.opacity = 0.3
    option.series[0].name = ['收入']

    option.xAxis.axisLabel.rotate = 0
    option.xAxis.data = xAxisData
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.name = '▶ 收入(万元)'
    option.yAxis.nameTextStyle.color = '#187FFF'
    option.yAxis.nameTextStyle.fontSize = 16
    option.yAxis.nameTextStyle.padding = [0, 35, 0, 0]
    option.grid.top = '23%'
    option.grid.left = '2%'
    option.grid.right = '5%'
    option.grid.bottom = '3%'
    option.tooltip.trigger = 'axis'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + params[0].seriesName + ':' + params[0].data.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) + '万元</li>'
      result += '<ul/></div>'
      return result
    }
    option.series[0].areaStyle = {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#194e99'
          // color: 'rgba(24,127,255,0.3)'
        },
        {
          offset: 1,
          color: '#0d2552'
          // color: 'rgba(24,127,255,0)'
        }
        ], false),
        shadowColor: 'rgba(108,80,243, 0.9)',
        shadowBlur: 20
      }
    }

    option.series[0].itemStyle = {
      color: '#187FFF',
      borderWidth: 3
    }

    option.series[0].symbolSize = 10
    option.xAxis = {
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
    }
    option.yAxis = {
      type: 'value',
      name: '▶ 收入(万元)',
      nameTextStyle: {
        color: '#187FFF',
        fontSize: 16,
        padding: [0, 35, 0, 0]
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
    }
    return option
  },
  // 配置（总视图-用户）option
  setUsersOption (usersData) {
    let option = JSON.parse(JSON.stringify(commonLine))
    let xAxisData = []
    let seriesData = []
    usersData.forEach(el => {
      xAxisData.push(el['x'])
      seriesData.push(el['y'])
    })
    option.series[0].data = seriesData
    option.series[0].smooth = false

    option.series[0].areaStyle.opacity = 0.3
    option.series[0].name = ['网上用户']

    option.xAxis.axisLabel.rotate = 0
    option.xAxis.data = xAxisData
    option.yAxis.axisLabel.rotate = 0
    option.yAxis.name = '▶ 网上用户(万户)'
    option.yAxis.nameTextStyle.color = '#187FFF'
    option.yAxis.nameTextStyle.fontSize = 16
    option.yAxis.nameTextStyle.padding = [0, 35, 0, 0]
    option.grid.top = '23%'
    option.grid.left = '2%'
    option.grid.right = '5%'
    option.grid.bottom = '3%'
    option.tooltip.trigger = 'axis'
    option.tooltip.formatter = function (params) {
      let result = '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;"><ul> <li style="font-size:18;font-weight:bold;">' + params[0].name + '</li>'
      result += '<li>' + params[0].seriesName + ':' + params[0].data.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) + '万户</li>'
      result += '<ul/></div>'
      return result
    }
    option.series[0].areaStyle = {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          // color: 'rgb(0,255,255,0.3)'
          color: '#1aabab'
        },
        {
          offset: 1,
          // color: 'rgb(0,255,255,0)'
          color: '#0d2552'
        }
        ], false),
        shadowColor: 'rgba(108,80,243, 0.9)',
        shadowBlur: 20
      }
    }
    option.series[0].itemStyle = {
      color: '#00FFFF',
      borderWidth: 3
    }

    option.series[0].symbolSize = 10
    option.xAxis = {
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
    }
    option.yAxis = {
      type: 'value',
      name: '▶ 网上用户(万户)',
      nameTextStyle: {
        color: '#187FFF',
        fontSize: 16,
        padding: [0, 35, 0, 0]
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
    }
    return option
  },
  //  配置（目标市场产品数量）option
  setMarketOption (marketsData) {
    let option = JSON.parse(JSON.stringify(commonPie))
    let pieSerie = JSON.parse(JSON.stringify(pieSeries))

    // var colorList = ['#187eff', '#00E5FF', '#0059E2', '#21A8FF']
    marketsData = marketsData.filter(
      (item) => item.value !== '0'
    )
    // console.log('marketsData', marketsData)
    option.color = ['#187eff', '#00E5FF', '#0059E2', '#21A8FF']
    option.legend.data = marketsData

    option.legend.bottom = 10
    option.legend.textStyle = { color: '#fff', fontSize: 14 }
    option.series[0] = pieSerie
    option.series[0].data = marketsData
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
    option.tooltip.show = false

    // console.log('目标市场', option)
    return option
  },
  // 配置（ 知识产权产品数量）option
  setKnowledgeOption (knowledgesData) {
    let option = JSON.parse(JSON.stringify(commonPie))
    let pieSerie = JSON.parse(JSON.stringify(pieSeries))
    knowledgesData.forEach(item => {
      if (item.name === '无') {
        item.name = '引入'
      }
    })
    knowledgesData = knowledgesData.filter(
      (item) => item.value !== '0'
    )

    option.color = ['#187eff', '#00E5FF', '#0059E2', '#21A8FF']
    option.legend.bottom = 10
    option.legend.textStyle = { color: '#fff', fontSize: 14 }
    option.legend.data = knowledgesData
    option.tooltip.show = false
    option.series[0] = pieSerie
    option.series[0].data = knowledgesData

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
    // console.log('知识产权', option)
    return option
  },
  // 配置（子公司产品数量）option
  setSubcompanyOption (subCompanysData) {
    let xAxisData = []
    let seriesData = []
    let maxSeriesData = [20, 20, 20]
    let yAxisMaxValue = 20
    subCompanysData.forEach(el => {
      xAxisData.push(el['name'])
      seriesData.push(el['value'])
    })
    let batteryBarSerie = JSON.parse(JSON.stringify(batteryBarSeries))
    // let option = JSON.parse(JSON.stringify(commonBar))
    let option = {
      backgroundColor: 'transparent',
      grid: {
        top: 40,
        right: 20,
        left: 50,
        bottom: 37
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
          result += '<li>' + params[0].seriesName + ':' + params[0].data + '个</li>'

          result += '<ul/></div>'
          return result
        },
        confine: true
      },
      xAxis: [{
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#FFFFFF'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#FFFFFF',
          fontSize: 14,
          interval: 0,
          formatter: function (value) {
            value = value.substr(0, 4)
            value = value.substring(0, 2) + '\n' + value.substring(2)
            return value
          }
        }
      }, {
        type: 'category',
        show: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          margin: 12,
          color: '#fff',
          fontSize: '20'
        },
        data: seriesData
      }],
      yAxis: [{
        max: yAxisMaxValue,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#FFFFFF'
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
            color: '#FFFFFF'
          }
        }
      }],
      series: batteryBarSerie
    }
    option.series[0].data = seriesData
    option.series[1].data = maxSeriesData
    option.series[2].data = maxSeriesData

    return option
  }
}
