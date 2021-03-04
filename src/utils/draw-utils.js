import Echarts from 'echarts'
export default {
  getCommonColor () {
    return ['#d52626', '#29c695', '#4072ee', '#1d26ec', '#b156f2', '#f8c002', '#d62647', '#f06715', '#e16d56', '#4c52c3', '#cf3585']
  },
  getCommonTooptip () {
    return {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    }
  },
  getCommonLegend (data, color) {
    return {
      data: data || [],
      top: '5%',
      textStyle: {
        color: color || '#FFFFFF'
      }
    }
  },
  // 线性渐变
  getLinearGradient (smallColor, smallOffset, bigColor, bigOffset) {
    return new Echarts.graphic.LinearGradient(
      0,
      1,
      0,
      0,
      [{
        offset: bigOffset,
        color: bigColor// '#E5B206'
      }, {
        offset: smallOffset,
        color: smallColor // '#E5B206'
      }, {
        offset: 0,
        color: 'transparent'
      }])
  },
  // 径向渐变
  getRadialGradient (x, y, r, smallOffset, smallColor, bigOffset, bigColor) {
    return {
      type: 'radial',
      x: x || 0.5,
      y: y || 0.5,
      r: r || 0.5,
      colorStops: [{
        offset: smallOffset || 0, color: smallColor || 'red' // 0% 处的颜色
      }, {
        offset: bigOffset || 1, color: bigColor || 'blue' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }
  },
  getCommonXAxis (name, data) {
    return {
      name: name || '',
      data: data | [], // this.timingList.tagTimingList.x,
      type: 'category',
      axisLine: { show: true, lineStyle: { color: '#29C896' } },
      axisTick: { show: true },
      axisLabel: { show: true, textStyle: { color: '#FFFFFF' } }
    }
  },
  getCommonYAxis () {
    return {
      // 坐标轴
      axisLine: {
        show: false
      },
      // 坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      // 分格线
      splitLine: {
        lineStyle: {
          color: '#4784e8'
        }
      }
    }
  },
  getGrid (option) {
    return {
      top: option.top | '25%',
      right: option.right | '10%',
      bottom: option.bottom | '10%',
      left: option.left | '18%'
    }
  }
}
