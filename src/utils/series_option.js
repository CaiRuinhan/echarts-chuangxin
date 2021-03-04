import echarts from 'echarts'
// 产品页饼状图的颜色
const colorList = ['#00E5FF', '#00E5FF', '#0059E2', '#21A8FF']

const color = ['#78FCFF', '#FEF888', '#F9AD73', '#2B82F5', '#034CFF', '#1CBA6B', '#B584F6']
const tooltip = {
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
  confine: true
}
// 柱状图
const barSeries = {
  type: 'bar',
  name: '',
  barWidth: 20,
  barMaxWidth: 20,
  smooth: true,
  label: {
    show: false,
    position: 'top',
    fontSize: 12,
    fontWeight: 400
  },

  data: []
}
// 折线图
const lineSeries = {
  type: 'line',
  name: '',
  smooth: true,
  symbol: 'circle',
  symbolSize: 4,
  areaStyle: {
    shadowOffsetY: 5,
    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
      offset: 0,
      color: '#21A7FF'
    }, {
      offset: 1,
      color: '#002CC9'
    }])

  },
  data: []
}
// 饼状图
const pieSeries = {
  type: 'pie',
  // roseType: 'radius',
  center: ['50%', '55%'],
  radius: ['55%', '70%'],
  itemStyle: {// 空隙间隔
    normal: {
      borderColor: '#071D5C',
      borderWidth: 5,
      color: function (params) {
        return colorList[params.dataIndex]
      }
    }
  },
  labelLine: {
    normal: {
      // length: 30,
      length2: 5,
      lineStyle: {
        color: '#fff'
      }
    }
  },
  label: {
    show: false,
    position: 'outside',
    formatter: ['{t|{b}}  {c|{c}}', '{h|}', '{t|占比}    {c|{d}%}'].join('\n'),
    rich: {
      t: {
        color: '#FFF',
        align: 'left',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 22
      },
      h: {
        borderColor: '#FFF',
        width: '100%',
        borderWidth: 2,
        align: 'left',
        height: 0
      },
      c: {
        color: '#FFF',
        align: 'center',
        fontSize: 14,
        lineHeight: 24
      }
    }
  },
  emphasis: {

    labelLine: {
      show: true
    },
    label: {
      show: true
    }
  },
  data: []

}
const gaugeSeries = {
  type: 'gauge',
  startAngle: 180,
  endAngle: 0,
  radius: '80%',
  splitNumber: 5,
  title: {
    fontSize: 20,
    fontWeight: 'bolder',
    color: color[0],
    offsetCenter: ['0%', '-120%']
  },
  detail: {
    fontSize: 30,
    fontWeight: 'bolder',
    offsetCenter: ['0%', '30%']
  },
  axisLine: {
    fontSize: 20,
    lineStyle: {
      width: 8,
      color: [
        [0.2, color[0]],
        [0.5, color[1]],
        [0.8, color[2]],
        [1, color[3]]
      ]
    }
  },
  axisTick: {
    splitNumber: 5,
    show: true,
    lineStyle: {
      color: 'auto',
      width: 2
    },
    length: 15
  },
  splitLine: {
    show: true,
    length: 20,
    lineStyle: {
      color: 'auto',
      width: 4
    }
  },
  itemStyle: {
    normal: {
      color: 'auto'
    }
  },
  pointer: {
    width: 5,
    length: '80%'
  },
  data: []
}
// 动画散点图
const graphSeries = {
  type: 'graph',
  layout: 'force',
  force: {// 力引导布局相关的配置项
    repulsion: 1200, // 节点之间的斥力因子
    edgeLength: 20,
    gravity: 0.2, // 节点受到的向中心的引力因子
    layoutAnimation: true
  },
  symbol: '', // 图片转为DataUrl
  symbolSize: null,
  nodeScaleRatio: 1, // 图标大小是否随鼠标滚动而变
  roam: true, // 设置鼠标缩放和平移漫游
  draggable: true, // 节点是否可以拖拽
  focusNodeAdjacency: false, // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
  itemStyle: {
    opacity: 1
  },
  emphasis: {// 高亮
    itemStyle: {
      shadowBlur: 4,
      shadowColor: 'green'
    },
    label: {
      color: 'red',
      rich: {
        totalTitle: {
          color: '#b7fff9',
          fontSize: 56
        },
        totalUnit: {
          color: '#fff',
          fontSize: 30
        },
        totalName: {
          color: '#fff',
          textAlign: 'right',
          align: 'center',
          fontSize: 30
        },
        title: {
          color: '#03e3fd',
          fontSize: 44
        },
        unit: {
          color: '#fff',
          fontSize: 24
        },
        name: {
          color: '#fff',
          textAlign: 'right',
          align: 'center',
          fontSize: 24
        }
      }
    }

  },
  label: {
    normal: {
      show: true,
      position: 'inside',
      color: '#00E2FC',
      fontSize: 24,
      // formatter: function (params) {
      //   return `{title| ${params.value}}` + '{unit|个}' + '\n' + `{name| ${params.name}}`
      // },
      formatter: null,
      rich: {
        totalTitle: {
          color: '#00E3FD',
          fontSize: 48
        },
        totalUnit: {
          color: '#fff',
          fontSize: 22
        },
        totalName: {
          color: '#fff',
          textAlign: 'right',
          align: 'center',
          fontSize: 22
        },
        title: {
          color: '#0086FE',
          fontSize: 36
        },
        unit: {
          color: '#fff',
          fontSize: 16
        },
        name: {
          color: '#fff',
          textAlign: 'right',
          align: 'center',
          fontSize: 16
        }
      }
    }
  },
  data: []
}
const totalSeries = [
  {
    name: 'label',
    type: 'bar',
    barWidth: 5,
    yAxisIndex: 0,

    label: {
      show: true,
      // 内置是排行榜描述的位置
      position: 2,
      offset: [10, -20],
      color: '#262C41',
      fontSize: 15
    },
    // barGap: '50%',itemStyle: {

    barCategoryGap: '30%',
    data: []

  },

  {
    name: 'value',
    type: 'bar',
    xAxisIndex: 0, // 使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。

    // barWidth: 5,
    zlevel: 1,
    barMinHeight: 0, // 最小高度
    // barMinWidth: 2, // 最小高度
    yAxisIndex: 0,
    label: {
      position: [365, -20],
      fontSize: 18
    },
    itemStyle: {
      barBorderRadius: [4, 4, 4, 4]

    },
    showBackground: true,
    backgroundStyle: {
      color: '#05113c',
      barBorderRadius: [4, 4, 4, 4]
    },
    barGap: '60%',
    barCategoryGap: '50%',
    data: []

  },
  {
    name: '背景',
    type: 'bar',
    // barWidth: 5,
    barGap: '-100%',
    barMinHeight: 10, // 最小高度
    yAxisIndex: 0,
    label: {
      position: [330, -20],
      fontSize: 18
    },
    itemStyle: {
      barBorderRadius: [4, 4, 4, 4]
    },
    // barGap: '20%',
    barCategoryGap: '70%',
    data: []

  }]
const product3DSeries = [
  {
    name: [],
    pid: [],
    income: [],
    market: [],
    subCompany: [],
    tooltip: tooltip,
    type: 'bar',
    barWidth: 24.5,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#0059E2' // 0% 处的颜色
        }, {
          offset: 0.6,
          color: '#138CEB' // 60% 处的颜色
        }, {
          offset: 1,
          color: '#00E3FD' // 100% 处的颜色
        }], false)
      }
    },
    data: [],
    barGap: 0
  },
  {
    type: 'bar',
    barWidth: 8,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#0059E2' // 0% 处的颜色
        }, {
          offset: 0.6,
          color: '#0761C0' // 60% 处的颜色
        }, {
          offset: 1,
          color: '#00E3FD' // 100% 处的颜色
        }], false)
      }
    },
    barGap: 0,
    tooltip: tooltip,
    data: []
  },
  {

    name: [],
    // pid: [],
    // income: [],

    // market: [],
    tooltip: tooltip,
    type: 'pictorialBar',
    label: {

      normal: {
        show: true,
        position: 'top',

        fontSize: 18,

        fontWeight: 'bold',
        color: '#fff'
      }

    },
    itemStyle: {
      borderWidth: 1,
      borderColor: '#0571D5',
      color: '#00E3FD'
    },
    symbol: 'path://M 0,0 l 150,0 l -30,10 l -150,0 z',
    symbolSize: ['30', '10'],
    symbolOffset: ['0', '-12'],
    // symbolRotate: -5,
    symbolPosition: 'end',
    data: [],
    z: 3
  }]
// 电池柱状图
const batteryBarSeries = [
  {
    name: '数量',
    type: 'pictorialBar',
    symbol: 'rect',
    itemStyle: {
      color: '#10bffc'
    },
    symbolRepeat: true,
    symbolSize: [28, 6],
    symbolMargin: 2,
    symbolPosition: 'start',
    z: -20,
    data: [],
    label: {
      normal: {
        show: false,
        position: 'top',
        verticalAlign: 'top'
        // formatter: function(value){
        //   return value && (value.data * 100).toFixed(1) + '%'
        // }
      }
    }
  },
  // 柱状图电池背景
  {
    name: '',
    type: 'bar',
    barWidth: 39,
    itemStyle: {
      color: 'rgba(0,0,0,0)',
      borderWidth: 2,
      borderColor: '#10bffc',
      padding: 0
    },
    label: {
      show: false
    },
    z: -10,
    data: []
  },
  // 电池顶部-电极
  {
    name: '',
    type: 'line',
    barWidth: 19,
    symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAADFJREFUGJVjFNj/hwEK/jMQBxgZGBgYWNAFiAUwjcTaBrcEppEk22A2kmobAwMDAwMA74EE3gW8aacAAAAASUVORK5CYII=',
    symbolSize: [24, 7],
    symbolOffset: [0, '-70%'],
    itemStyle: {
      color: 'rgba(0,0,0,0)',
      borderWidth: 2,
      borderColor: '#10bffc',
      padding: 0
    },
    hoverAnimation: false,
    legendHoverLink: false,
    z: -10,
    data: []
  }
]
export {
  barSeries,
  lineSeries,
  pieSeries,
  gaugeSeries,
  graphSeries,
  totalSeries,
  product3DSeries,
  batteryBarSeries

}
