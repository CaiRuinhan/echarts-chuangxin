
// import echarts from 'echarts'
import { barSeries, lineSeries, gaugeSeries, graphSeries, totalSeries, pieSeries, product3DSeries } from './series_option'
const color = ['#78FCFF', '#FEF888', '#F9AD73', '#2B82F5', '#034CFF', '#1CBA6B', '#B584F6']
// 使用颜色  排行榜的颜色
const COLOR = ['#eb3b5a', '#fa8231', '#f7b731', '#00E2FC', '#389CFF']

// 用户页饼图的颜色
const colorPie = ['#00e3FF', '#0086FF', '#DDDEE1', '#21AAFF', '#0064FE', '#18B88F', '#F3AA72']
// // 产品页饼状图的颜色
// const colorList = ['#00E5FF', '#00E5FF', '#0059E2', '#21A8FF']

const tooltip = {
  trigger: 'axis',
  // padding: 10,/
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

const legend = {
  show: true,
  // icon: 'roundRect',
  itemWidth: 20,
  textStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20
  },
  data: []
}

const grid = {
  left: '5%',
  right: '3%',
  bottom: '8%',
  containLabel: true
}

const xAxis = {
  type: 'category',
  name: '',
  namelocation: 'end',
  nameTextStyle: {
    color: '#FFFFFF',
    align: 'center',
    verticalAlign: 'middle'
  },
  data: [],
  axisLine: {
    show: true,
    onZero: false,
    lineStyle: {
      color: '#FFFFFF'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    show: true,
    interval: 0,
    rotate: 45,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400,
    align: 'center'
  },
  splitLine: {
    show: false
  }
}

const yAxis = {
  position: 'left',
  type: 'value',
  name: '',
  namelocation: 'end',
  nameTextStyle: {
    color: '#FFFFFF',
    align: 'center',
    verticalAlign: 'middle'
  },
  scale: true,
  axisLabel: {
    show: true,
    interval: 0,
    rotate: 45,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 400
  },
  axisLine: {
    show: false
  },
  axisTick: {
    show: false
  },
  splitLine: {
    show: false
  }
}

// 柱状图
const commonBar = {
  tooltip: tooltip,
  legend: legend,
  grid: grid,
  xAxis: xAxis,
  yAxis: yAxis,
  // itemStyle: {
  //   barBorderRadius: '',
  //   color: ''
  // },
  series: [barSeries]
}
// 折线图
const commonLine = {
  legend: legend,
  tooltip: tooltip,
  grid: grid,
  xAxis: xAxis,
  yAxis: yAxis,
  series: [lineSeries]
}
// 地图
const commonMap = {
  tooltip: tooltip,
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 10000000,
    calculable: true,
    align: 'left',
    show: true,
    left: '25%',
    bottom: '10%',
    seriesIndex: 1,
    // text: ['高', '低'],
    inRange: {

      // 之前样式
      // color: ['#d5f3ff', '#0077b2']
      color: ['#00e2fc', '#0059e2']

    },
    orient: 'vertical',
    textStyle: {
      color: '#FFFFFF',
      fontSize: 14,
      lineHeight: 16
    }
  },
  geo: {
    map: 'china',
    show: true,
    roam: false,
    zoom: 1.2,
    scaleLimit: {
      min: 0,
      max: 3
    }, // 缩放级别
    itemStyle: {
      normal: {
        // areaColor: '#24CFF4',
        borderColor: '#fff',
        borderWidth: 1.3
      },
      emphasis: {
        areaColor: '#ffc15d',
        borderWidth: 1.6
      }
    }

  },
  series: [
    {
      // show: false,
      type: 'effectScatter',
      z: 998,
      coordinateSystem: 'geo',
      symbolSize: 14,
      data: []
    },
    {
      type: 'map',
      z: 998,
      geoIndex: 0,
      data: []

    }]

}

const geoCoordMap = {
  '台湾': [121.5135, 25.0308],
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  '吉林': [125.8154, 44.2584],
  '北京': [116.4551, 40.2539],
  '辽宁': [123.1238, 42.1216],
  '河北': [114.4995, 38.1006],
  '天津': [117.4219, 39.4189],
  '山西': [112.3352, 37.9413],
  '陕西': [109.1162, 34.2004],
  '甘肃': [103.5901, 36.3043],
  '宁夏': [106.3586, 38.1775],
  '青海': [101.4038, 36.8207],
  '新疆': [87.9236, 43.5883],
  '西藏': [91.11, 29.97],
  '四川': [103.9526, 30.7617],
  '重庆': [108.384366, 30.439702],
  '山东': [117.1582, 36.8701],
  '河南': [113.4668, 34.6234],
  '江苏': [118.8062, 31.9208],
  '安徽': [117.29, 32.0581],
  '湖北': [114.3896, 30.6628],
  '浙江': [119.5313, 29.8773],
  '福建': [119.4543, 25.9222],
  '江西': [116.0046, 28.6633],
  '湖南': [113.0823, 28.2568],
  '贵州': [106.6992, 26.7682],
  '云南': [102.9199, 25.4663],
  '广东': [113.12244, 23.009505],
  '广西': [108.479, 23.1152],
  '海南': [110.3893, 19.8516],
  '上海': [121.4648, 31.2891],
  '南海诸岛': [110.5, 18.5]

}
const MapPrevience = [
  { 'name': '台湾' },
  { 'name': '黑龙江' },
  { 'name': '内蒙古' },
  { 'name': '吉林' },
  { 'name': '北京' },
  { 'name': '辽宁' },
  { 'name': '河北' },
  { 'name': '天津' },
  { 'name': '山西' },
  { 'name': '陕西' },
  { 'name': '甘肃' },
  { 'name': '宁夏' },
  { 'name': '青海' },
  { 'name': '新疆' },
  { 'name': '西藏' },
  { 'name': '四川' },
  { 'name': '重庆' },
  { 'name': '山东' },
  { 'name': '河南' },
  { 'name': '江苏' },
  { 'name': '安徽' },
  { 'name': '湖北' },
  { 'name': '浙江' },
  { 'name': '福建' },
  { 'name': '江西' },
  { 'name': '湖南' },
  { 'name': '贵州' },
  { 'name': '云南' },
  { 'name': '广东' },
  { 'name': '广西' },
  { 'name': '海南' },
  { 'name': '上海' },
  { 'name': '南海诸岛' }
]
// 金字塔
const commonFunnel = {
  tooltip: tooltip,
  calculable: true,
  series: [{
    name: '',
    type: 'funnel',
    sort: 'ascending',
    gap: 10,
    itemStyle: {
      borderWidth: 0
    }
  }]
}
// 饼状图
const commonPie = {
  tooltip: tooltip,
  grid: grid,
  legend: legend,

  series: [pieSeries]
}
const commonGauge = {
  tooltip: tooltip,
  series: [gaugeSeries]
}
// 散点图动画图
const commonGraph = {
  // 图表标题
  backgroundColor: 'transparent',
  // tooltip: {},
  animationDurationUpdate: function (idx) { // 数据更新动画的时长。
    // 越往后的数据延迟越大
    return idx * 100
  },
  animationEasingUpdate: 'bounceIn', // 数据更新动画的缓动效果。
  series: [graphSeries]
}
const commonScatter = {
  xAxis: {
    max: 90,
    min: 5,
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  },
  yAxis: {
    min: 100,
    max: 0,
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  },
  animation: false,
  selectedMode: false, // 取消图例上的点击事件
  series: [{
    symbolSize: 80,
    data: [],
    // itemStyle: {
    //   normal: {
    //     borderWidth: '1',
    //     borderType: 'solid',
    //     borderColor: '#fff',
    //     color: '#68b837',
    //     shadowColor: '#1A47C6',
    //     shadowBlur: 10
    //   }
    // },
    type: 'scatter'
  }]
}
// 排行榜
const commontotalBar = {

  grid: {
    top: 8,
    left: 30,
    right: 30,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    show: true,
    inverse: true,
    type: 'category',
    axisLine: {
      show: false
    }
  },
  series: totalSeries

}
// 柱状图
const commonProduct3D = {
  tooltip: tooltip,
  xAxis: xAxis,
  grid: grid,
  yAxis: yAxis,
  series: product3DSeries
}

export {
  COLOR,
  color,
  colorPie,
  tooltip,
  grid,
  legend,
  xAxis,
  yAxis,
  geoCoordMap,
  commonBar,
  commonLine,
  commonFunnel,
  commonMap,
  commonPie,
  commonGauge,
  commonGraph,
  commonScatter,
  commontotalBar,
  commonProduct3D,
  MapPrevience

}
