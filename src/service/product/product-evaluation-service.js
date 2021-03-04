import productEvaApi from '@/api/product-evaluation/product-evaluation-api.js'

import { commontotalBar, COLOR } from '@/utils/unisk-options.js'
import { getLifeImage, backgroundImage } from '@/utils/LifeImage.js'

export default {
  // 获取产品评价数据
  async getProductEvaluationData () {
    let result
    await productEvaApi.getProductEvaluationList({ year: '2020' }).then(res => {
      result = res.data
    })

    let options = {
      threeProductOption: this.setThreeProductOption(result.threes), // 配置（三曲线产品分布）option
      modelBgcOption: this.setModelBgcOption(result.bgcMatrix), // 配置（BGC模型分析）option
      modelAdlOption: this.setModelAdlOption(result.adlMatrix), // 配置（ADL矩阵模型）option
      permeabilityOption: this.setPermeabilityOption(result.permeabilities), // 配置（产品渗透率top5）option
      productArpuOption: this.setProductArpuOption(result.arpus)// 配置（产品ARPU值TOP5）option
    }
    return options
  },
  // 配置（三曲线产品分布）option
  setThreeProductOption (threesData) {
    let [xAxisData, yAxisData, toolArray] = [[], [], []]
    // 处理数据

    threesData.forEach((el, index) => {
      el.value = [el['three'], el['market']]
      xAxisData.push(el['three'])
      yAxisData.push(el['market'])
      toolArray.push(el['three'] + ',' + el['market'])
      if (el.logo === '') {
        el.symbol = getLifeImage
        el.symbolSize = 50
      } else {
        el.symbol = 'image://data:image/png;base64,' + el.logo
        el.symbolSize = 50
      }
    })

    toolArray = Array.from(new Set(toolArray))// 去重
    // 图片在一个格子里时做偏移处理
    for (let i = 0; i < toolArray.length; i++) {
      let array = threesData.filter(el => {
        return toolArray[i] === el.value.join(',')
      })
      // 图片偏移量计算
      array.forEach((el, index) => {
        let offset = -38 * (array.length - 1) + index * 70
        el.symbolOffset = [offset, 0]
      })
    }
    xAxisData = Array.from(new Set(xAxisData))// 横坐标去重
    yAxisData = Array.from(new Set(yAxisData))// 纵坐标去重
    console.log('xAxisData', xAxisData)
    let option = {}
    option = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'transparent',
        // borderColor: '#0064FE',
        // borderWidth: 5,
        // padding: [5, 25],
        textStyle: {
          color: '#fff',
          fontSize: 20
        },
        formatter: function (params) {
          return '<div style="color:#FFF;background:url(' + backgroundImage + ') 0 0/100% 100% no-repeat;padding:15px;">' + params.name + '</div>'
        },
        axisPointer: {
          type: 'shadow',
          borderColor: 'rgba(124,128,244, .5)'
        },
        position: 'right'
      },
      grid: {
        show: true,
        top: 30,
        left: '8%',
        right: '3%',
        bottom: 40,
        borderColor: '#061C61'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'

          }
        },
        axisLabel: {
          fontSize: 20
        },
        // 网格样式
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#fff'],
            width: 1,
            type: 'solid'
          }
        }
      },
      yAxis: {
        type: 'category',
        // 网格样式
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#fff'],
            width: 1,
            type: 'dashed'
          }
        },
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          fontSize: 20
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        data: yAxisData,
        scale: true
      },

      series: [{
        name: '数据2',
        //  先X,后y
        data: threesData,
        // [

        //   {
        //     value: ['1月', '厦门'],
        //     three: '1月',
        //     // 自定义标签样式，仅对该数据项有效
        //     market: '福州',
        //     symbolOffset: ['-100%', 0]
        //   },
        //   {
        //     value: [0, 0],
        //     three: '1月',
        //     // 自定义标签样式，仅对该数据项有效
        //     market: '福州',
        //     symbolOffset: ['-170%', 0]
        //   },
        //   {
        //     value: [0, 0],
        //     three: '1月',
        //     // 自定义标签样式，仅对该数据项有效
        //     market: '福州',
        //     symbolOffset: [0, 0]
        //   },
        //   {
        //     value: [0, 0],
        //     three: '1月',
        //     // 自定义标签样式，仅对该数据项有效
        //     market: '福州',
        //     symbolOffset: ['170%', 0]
        //   }
        // ],
        type: 'scatter',

        emphasis: {
          label: {
            show: false,
            formatter: function (param) {
              return param.data[2]
            },
            position: 'top'
          }
        },
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0,0,0, 0.5)',
          shadowOffsetY: 5,
          color: '#ff9f7f'
        }
      }
      ]
    }

    return option
  },
  // 配置（BGC模型分析）option
  setModelBgcOption (bgcMatrixData) {
    let option = {}
    bgcMatrixData = [
      { income: '111',
        knowledge: '111',
        market: '111',
        name: '测试0',
        pid: '230',
        subCompany: '测试0',
        three: '111',
        users: '0111',
        x: 21,
        y: 45
      }, { income: '111',
        knowledge: '111',
        market: '111',
        name: '测试1',
        pid: '230',
        subCompany: '测试0',
        three: '111',
        users: '0111',
        x: 201,
        y: 45
      }, { income: '111',
        knowledge: '111',
        market: '111',
        name: '测试2',
        pid: '230',
        subCompany: '测试0',
        three: '111',
        users: '0111',
        x: -21,
        y: -45
      }, { income: '111',
        knowledge: '111',
        market: '111',
        name: '测试3',
        pid: '230',
        subCompany: '测试0',
        three: '111',
        users: '0111',
        x: 21,
        y: -45
      }, { income: '111',
        knowledge: '111',
        market: '111',
        name: '测试4',
        pid: '230',
        subCompany: '测试0',
        three: '111',
        users: '0111',
        x: -21,
        y: 45
      } ]
    let [seriesData, center, xValue, yValue] = [[], [20, 10], '', '']// center是markline的中点
    // 处理数据
    bgcMatrixData.forEach(el => {
      seriesData.push([parseFloat(el['x']), parseFloat(el['y']), el['name']])
    })
    // 遍历找出数据中的绝对值最大的差值{Math.abs()求绝对值方法}
    for (var i = 0; i < seriesData.length; i++) {
      if (Math.abs(xValue) < Math.abs(seriesData[i][0] - center[0])) {
        xValue = seriesData[i][0] - center[0]
      }
      if (Math.abs(yValue) < Math.abs(seriesData[i][1] - center[1])) {
        yValue = seriesData[i][1] - center[1]
      }
    }
    let xAxisRange = [center[0] - Math.abs(xValue) - 10, Math.abs(xValue) + center[0] + 10]// x轴线范围(范围扩大5各单位)
    let yAxisRange = [center[1] - Math.abs(yValue) - 10, Math.abs(yValue) + center[1] + 10]// y轴轴线范围(范围扩大5各单位)
    option = {
      backgroundColor: 'transparent',
      color: ['rgba(56,156,255,0.3)', 'rgba(24,127,255,0.3)'],
      // color: ['#187FFF', '#389CFF'],
      grid: {
        show: true,
        top: 30,
        left: '5%',
        right: '3%',
        bottom: 40,
        borderColor: '#061C61'
      },
      tooltip: {
        show: false,
        trigger: 'item',
        backgroundColor: '#062379',
        borderColor: '#187FFF',
        borderWidth: 5,
        padding: [5, 25],
        textStyle: {
          color: '#fff',
          fontSize: 20
        },
        formatter: function (params) {
          return params.data[2]
        },
        axisPointer: {
          type: 'shadow',
          borderColor: 'rgba(124,128,244, .5)'
        },
        position: 'right'
      },
      xAxis: {
        type: 'value',
        name: '市场份额',
        nameLocation: 'center',
        scale: true,
        splitNumber: xAxisRange[1] - xAxisRange[0],
        nameGap: 8,
        min: xAxisRange[0],
        max: xAxisRange[1],
        axisLabel: {
          color: 'rgba(250,250,250,0.6)',
          fontSize: 16,
          formatter: function (value) {
            if (value === Math.ceil((xAxisRange[0] + center[0]) / 2)) {
              return '低'
            } else if (value === Math.ceil((xAxisRange[1] + center[0]) / 2)) {
              return '高'
            }
          }
        },
        nameTextStyle: {

          fontSize: 14,
          color: '#FFF'

        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#e1e1e1'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'red'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '市场增长',
        nameLocation: 'center',
        scale: true,
        splitNumber: yAxisRange[1] - yAxisRange[0],
        nameGap: 8,
        min: yAxisRange[0],
        max: yAxisRange[1],
        axisLine: { //  改变y轴颜色
          show: false,
          lineStyle: {
            color: '#FFF'
          }
        },
        nameTextStyle: {
          verticalAlign: false,
          color: '#FFF',
          fontSize: 14
        },
        axisLabel: { //  改变y轴字体颜色和大小
          // formatter: '{value} m³ ', //  给y轴添加单位

          textStyle: {
            color: 'rgba(250,250,250,0.6)',
            fontSize: 16
          },
          formatter: function (value) {
            if (value === Math.ceil((yAxisRange[1] + center[1]) / 2)) {
              return '高'
            } else if (value === Math.ceil((yAxisRange[0] + center[1]) / 2)) {
              return '低'
            }
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          // interval: 1,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      },

      series: [{
        itemStyle: {
          borderColor: '#187FFF',
          borderWidth: 2,
          shadowColor: '#187FFF',
          shadowBlur: 10
        },
        symbolSize: 22,
        symbolOffset: [10, 25],
        markLine: {// 图表标线
          animation: false,
          lineStyle: {
            color: '#fff',
            type: 'solid',
            width: 1
          },
          label: {
            show: true,
            position: 'start',
            formatter: '{b}',
            fontSize: 11,
            color: '#666'
          },
          symbol: ['none', 'none'],
          silent: true,
          data: [
            { xAxis: center[0] }, { yAxis: center[1] },
            { xAxis: xAxisRange[0] }, { yAxis: center[1] }
          ]
        },
        markArea: {
          silent: true,
          label: {
            align: 'center',
            position: ['50%', '43%'],
            fontSize: 30,
            fontWeight: '700',
            // opacity: '0.2'
            itemStyle: {
              color: '#389CFF',
              opacity: 0.2

            }
          },
          itemStyle: {
            color: 'transparent'
          },
          data: [
            [{
              name: '问题',
              yAxis: center[1],
              xAxis: xAxisRange[0]
            },
            {
              yAxis: yAxisRange[1],
              xAxis: center[0]
            }
            ],
            [{
              name: '明星',
              yAxis: center[1],
              xAxis: center[0]
            },
            {
              yAxis: yAxisRange[1],
              xAxis: xAxisRange[1]
            }
            ],
            [{
              name: '瘦狗',
              yAxis: yAxisRange[0],
              xAxis: xAxisRange[0]
            },
            {
              yAxis: center[1],
              xAxis: center[0]
            }
            ],
            [{
              name: '金牛',
              yAxis: yAxisRange[0],
              xAxis: center[0]
            },
            {
              yAxis: center[1],
              xAxis: xAxisRange[1]
            }
            ]
          ]
        },
        label: {
          show: true,
          formatter: function (param) {
            return param.data[2]
          },
          position: 'left',
          color: '#FFF'
        },
        data: seriesData,

        type: 'scatter'
      }]
    }

    return option
  },
  // 配置（ADL矩阵模型）option
  setModelAdlOption (adlMatrixData) {
    adlMatrixData = [
      { evaluate: '主导',
        income: '71',
        knowledge: '111',
        lifeCycle: '孵化期',
        market: '111',
        name: '测试0',
        pid: '230',
        three: '111',
        users: '0111',
        x: '10',
        y: '10'
      }, { evaluate: '竞争有利',
        income: '160',
        knowledge: '91',
        lifeCycle: '成熟期',
        market: '111',
        name: '测试1',
        pid: '230',
        three: '111',
        users: '0111',
        x: '10',
        y: '0'
      }, { evaluate: '产品较强',
        income: '40',
        knowledge: '51',
        lifeCycle: '成长期',
        market: '111',
        name: '测试2',
        pid: '230',
        three: '111',
        users: '0111',
        x: '5',
        y: '5'
      }, { evaluate: '产品较强',
        income: '30',
        knowledge: '51',
        lifeCycle: '成长期',
        market: '111',
        name: '测试3',
        pid: '230',
        three: '111',
        users: '0111',
        x: '0',
        y: '5'
      }, { evaluate: '产品较强',
        income: '50',
        knowledge: '51',
        lifeCycle: '成长期',
        market: '111',
        name: '测试4',
        pid: '230',
        three: '111',
        users: '0111',
        x: '5',
        y: '10'
      }, { evaluate: '脆弱',
        income: '60',
        knowledge: '111',
        lifeCycle: '成熟期',
        market: '111',
        name: '测试5',
        pid: '230',
        three: '111',
        users: '0111',
        x: '0',
        y: '5'
      }, { evaluate: '实力维护',
        income: '60',
        knowledge: '31',
        lifeCycle: '衰退期',
        market: '111',
        name: '测试6',
        pid: '230',
        three: '111',
        users: '0111',
        x: '0',
        y: '0'
      } ]
    let option = {}
    if (adlMatrixData.length) {
      let seriesData = [[], [], [], []]
      let toolArray = []
      let xAxisData = ['孵化期', '成长期', '成熟期', '衰退期']
      let yAxisData = ['主导', '产品较强', '竞争有利', '实力维护', '脆弱']
      // 处理数据
      adlMatrixData.forEach((el, index) => {
        el.value = [el['lifeCycle'], el['evaluate']]
        toolArray.push(el['lifeCycle'] + ',' + el['evaluate'])
        switch (el.lifeCycle) {
          case '孵化期':
            el.color = '#187FFF'
            seriesData[0].push(el)
            break
          case '成长期':
            el.color = '#00DFF9'
            seriesData[1].push(el)
            break
          case '成熟期':
            el.color = '#AB84EB'
            seriesData[2].push(el)
            break
          case '衰退期':
            el.color = '#E2E3E3'
            seriesData[3].push(el)
            break
        }
      })
      toolArray = Array.from(new Set(toolArray))// 去重
      let optionData = this.getAdlOptionData(seriesData)

      // 散点在一个格子里时做偏移处理
      for (let i = 0; i < toolArray.length; i++) {
        let array = adlMatrixData.filter(el => {
          return toolArray[i] === el.value.join(',')
        })
        // 数据点偏移量计算
        array.forEach((el, index) => {
          let [xOffset, yOffset] = ['0', '0']
          if (el.x === '0') {
            xOffset = -20
          } else if (el.x === '10') {
            xOffset = 20
          }
          if (el.y === '0') {
            yOffset = -20
          } else if (el.y === '10') {
            yOffset = 20
          }
          el.symbolOffset = [xOffset, yOffset]
        })
      }
      option = {
        tooltip: {
          show: false,
          trigger: 'item',
          backgroundColor: '#062379',
          borderColor: '#187FFF',
          borderWidth: 5,
          padding: [5, 25],
          textStyle: {
            color: '#fff',
            fontSize: 20
          },
          // formatter: function (params) {
          //   return params.data.income
          // },
          axisPointer: {
            type: 'shadow',
            borderColor: 'rgba(124,128,244, .5)'
          },
          position: 'right'
        },
        legend: {
          show: true,
          icon: 'rect',
          itemGap: 27,
          itemWidth: 15,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          show: true,
          top: 30,
          left: '8%',
          right: '3%',
          bottom: 40,
          borderColor: '#061C61'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: xAxisData,
          axisPointer: {
            type: 'shadow'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'

            }
          },
          axisLabel: {
            fontSize: 14
          },
          // 网格样式
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#fff'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          },
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            fontSize: 14,
            formatter: function (item) {
              if (item.length > 2) {
                item = item.substring(0, 2) + '\n' + item.substring(2)
              }
              return item
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          data: yAxisData,
          scale: true
        },
        series: optionData.series
      }
    }

    return option
  },
  // 配置（产品渗透率top5）option
  setPermeabilityOption (data) {
    let option = {}
    let permeabilitiesData = data.concat()
    option = JSON.parse(JSON.stringify(commontotalBar))
    for (let i = 0; i < 5 - data.length; i++) {
      permeabilitiesData.push({ name: '暂无', sort: data.length + 1 + i, value: '0' })
    }
    option.series[0].data = permeabilitiesData.map((item, index) => {
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
        },
        itemStyle: {
          color: color
        }
      }
    })

    option.series[1].data = permeabilitiesData.map(({ value }, index) => {
      // 设置两个颜色一个颜色是这个根据变化的颜色
      const color = COLOR[index % COLOR.length]
      // 设置一个统一的颜色
      const colors = '#FFF'
      // const color = '#00E2FC'
      return {
        value: parseFloat(value) > 100 ? 100 : parseFloat(value),
        label: {
          // 右侧文字如果变化，超过第三个就是固定颜色
          color: index > 2 ? colors : color,
          fontSize: index < 3 ? 17 : 15,
          fontWeight: index < 3 ? 700 : 500
        },
        // 柱状图的颜色
        itemStyle: {
          color: '#187FFF'
        }

      }
    })
    // option.series[2].data = permeabilitiesData.map(({ value }, index) => {
    //   // const color = '#00E2FC'
    //   return {
    //     value: 100,
    //     // 柱状图的颜色
    //     itemStyle: {
    //       color: '#222629'
    //     }
    //   }
    // })
    option.series[0].label.offset = [10, -30]
    option.series[1].barCategoryGap = '60%'
    // option.series[2].barCategoryGap = '60%'
    // 右侧文字
    option.series[1].label.show = true
    option.series[1].label.position = [500, -23]
    option.series[1].backgroundStyle.color = '#021558'
    option.series[1].label.fontSize = 20
    option.series[1].barWidth = 22
    // option.series[2].barWidth = 22
    // option.series[1].backgroundStyle.color = 'transparent'
    option.series[1].label.formatter = function (value) {
      return `${value.value}%`
    }
    // option.grid.width = '100%'
    return option
  },
  // 配置（产品ARPU值TOP5）option
  setProductArpuOption (arpusData) {
    let option = {}
    option = JSON.parse(JSON.stringify(commontotalBar))
    // 不要暂无
    // for (let i = 0; i < 5 - arpusData.length; i++) {
    //   arpusData.push({ name: '暂无', sort: arpusData.length + 1 + i, value: '0' })
    // }
    option.series[0].data = arpusData.map((item, index) => {
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
        },
        itemStyle: {
          color: color
        }
      }
    })

    option.series[1].data = arpusData.map((item, index) => {
      // 设置两个颜色一个颜色是这个根据变化的颜色
      const color = COLOR[index % COLOR.length]
      // 设置一个统一的颜色
      const colors = '#FFF'
      // const color = '#00E2FC'
      return {
        value: parseFloat(item.value),
        label: {
          // 右侧文字如果变化，超过第三个就是固定颜色
          color: index > 2 ? colors : color,
          fontSize: index < 3 ? 17 : 15,
          fontWeight: index < 3 ? 700 : 500
        },
        // 柱状图的颜色
        itemStyle: {
          color: '#187FFF'
        }
      }
    })
    option.series[0].label.offset = [10, -30]
    option.series[1].barCategoryGap = '60%'
    // option.grid.width = '100%'
    // 右侧文字
    option.series[1].label.show = true
    option.series[1].label.position = [500, -23]
    option.series[1].label.fontSize = 20
    option.series[1].barWidth = 22
    // option.series[2].barWidth = 22
    option.series[1].backgroundStyle.color = '#021558'
    option.series[1].label.formatter = function (value) {
      return `${value.value}`
    }
    return option
  },
  // 遍历获取ADL中option数据
  getAdlOptionData (data) {
    let res = { series: [] }
    for (var i = 0; i < data.length; i++) {
      if (data[i].length > 0) {
        res.series.push({
          name: data[i][0].lifeCycle,
          data: data[i],
          type: 'scatter',
          symbol: 'circle',
          symbolSize: function (data, params) {
            return params.data.income * 0.3
          },
          emphasis: {
            label: {
              show: false,
              formatter: function (param) {
                return param.data[2]
              },
              position: 'top'
            }
          },
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(0,0,0, 0.5)',
            shadowOffsetY: 5,
            color: data[i][0].color
          },
          label: {
            show: true,
            formatter: function (param) {
              return param.name
            },
            position: 'right',
            color: '#FFF'
          }

        })
      }
    }
    return res
  }
}
