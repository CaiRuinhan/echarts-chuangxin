const commonBar = {
  color: ['#b156f1', '#29C896', '#f8c002', '#4072ee'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    icon: 'roundRect',
    itemWidth: 14,
    itemHeight: 14,
    textStyle: {
      color: '#fff'
    },
    data: []
  },
  grid: {
    left: '3%',
    right: '5%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series: []
}

const commonLine = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    top: '20%',
    left: '8%',
    right: '8%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ccc'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
      lineStyle: {
        color: '#ccc'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series: {}
}

const commonScatter = {
  xAxis: {
    axisLabel: {
      show: false,
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    axisLabel: {
      show: false,
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  series: {
    type: 'scatter',
    data: [
      [10.0, 8.04],
      [8.0, 6.95],
      [13.0, 7.58],
      [9.0, 8.81],
      [11.0, 8.33],
      [14.0, 9.96],
      [6.0, 7.24],
      [4.0, 4.26],
      [12.0, 10.84],
      [7.0, 4.82],
      [5.0, 5.68]
    ]
  }
}

const common3DBar = {
  tooltip: {},
  // timeline: {
  //   orient: 'horizontal',
  //   axisType: 'category',
  //   autoPlay: true,
  //   inverse: true,
  //   playInterval: 1000,
  //   left: null,
  //   right: 0,
  //   top: 20,
  //   bottom: 20,
  //   width: 55,
  //   height: null,
  //   label: {
  //     color: '#999'
  //   },
  //   symbol: 'none',
  //   lineStyle: {
  //     color: '#555'
  //   },
  //   checkpointStyle: {
  //     color: '#bbb',
  //     borderColor: '#777',
  //     borderWidth: 2
  //   },
  //   controlStyle: {
  //     showNextBtn: false,
  //     showPrevBtn: false,
  //     color: '#666',
  //     borderColor: '#666'
  //   },
  //   emphasis: {
  //     label: {
  //       color: '#fff'
  //     },
  //     controlStyle: {
  //       color: '#aaa',
  //       borderColor: '#aaa'
  //     }
  //   },
  //   data: ['实例']
  // },
  xAxis3D: {
    type: 'category',
    splitLine: {
      show: false
    },
    data: []
  },
  yAxis3D: {
    type: 'category',
    splitLine: {
      show: false
    },
    data: ['默认一组数据']
  },
  zAxis3D: {
    type: 'value',
    splitLine: {
      show: false
    },
    show: true
  },
  grid3D: {
    boxWidth: 280,
    boxHeight: 120,
    boxDepth: 50,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        opacity: 0
      }
    },
    axisTick: {
      show: false
    },
    axisPointer: {
      show: false
    },
    viewControl: {
      distance: 180,
      minDistance: 180,
      maxDistance: 180,
      alpha: 10,
      beta: 0,
      minAlpha: -10,
      maxAlpha: 20,
      minBeta: -10,
      maxBeta: 10
    }
  },
  series: {
    name: '实例',
    type: 'bar3D',
    data: [],
    shading: 'realistic',
    label: {
      show: true,
      distance: 1,
      textStyle: {
        fontSize: 10,
        borderWidth: 0
      }
    },
    itemStyle: {
      opacity: 0.8
    },
    emphasis: {
      label: {
        textStyle: {
          fontSize: 10,
          color: '#fff'
        }
      }
    }
  }
}

const commonMap = {
  tooltip: {
    formatter: function (params) {
      if (params.name === '台湾' || params.name === '香港' || params.name === '澳门' || params.name === '南海诸岛') {
        return params.name
      }
      var hoverHtml = ''
      hoverHtml += '<p>' + params.data.name + '</p>' +
        '<p><i class="tooltip-icon" style="background-color:' + params.color + '"></i>用户数：' + params.data.value + '</p>'
      return hoverHtml
    },
    backgroundColor: 'rgba(50,50,50,0.7)',
    textStyle: {
      color: '#29C896'
    }
  },
  visualMap: {
    left: '20',
    top: 'bottom',
    seriesIndex: 1,
    showLabel: true,
    inRange: {
      color: ['#F3c395', '#E22461']// 地图色系变化
    },
    textStyle: {
      color: '#E22461'
    },
    show: true
  },
  geo: [{
    map: 'china',
    show: true,
    roam: false,
    zoom: 1.2,
    label: {
      normal: { show: false },
      emphasis: { show: false }
    },
    itemStyle: {
      emphasis: { areaColor: '#0a2dae' }
    }
  }],
  series: [
    {
      symbolSize: 5,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#1246F9'
        }
      },
      name: 'light',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: []
    },
    {
      name: '省分用户数',
      type: 'map',
      geoIndex: 0,
      data: []
    },
    {
      name: '省分用户数',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin',
      symbolSize: [50, 50],
      itemStyle: {
        borderColor: '#0a53e9'
      },
      data: [],
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      zlevel: 1
    }]
}

const commonFunnel = {
  color: ['#EE6363', '#50B4D7', '#548B54'],
  tooltip: {
    trigger: 'item'
  },
  calculable: true,
  series: [{
    name: '漏斗图',
    type: 'funnel',
    sort: 'ascending',
    gap: 10,
    itemStyle: {
      borderWidth: 0
    }
  }]
}

const commonPie = {
  color: ['#b156f1', '#28c795', '#f8c002', '#4072ee'],
  tooltip: {
    trigger: 'item'
  },
  grid: {
    top: '15%',
    left: '3%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  legend: {
    orient: 'vertical',
    top: 45,
    left: 30,
    icon: 'roundRect',
    itemWidth: 14,
    itemHeight: 14,
    textStyle: {
      color: '#fff'
    },
    data: []
  },
  series: [{
    name: '访问来源',
    type: 'pie',
    radius: ['60%', '75%'],
    center: ['75%', '50%'],
    avoidLabelOverlap: false,
    labelLine: {
      smooth: 0.2
    },
    itemStyle: {
      normal: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 10
      }
    },
    emphasis: {
      radius: ['0%', '75%'],
      label: {
        show: true,
        fontSize: '18'
      }
    },
    data: []
  }]
}

const commonTree = {
  color: ['#b156f1', '#29C896', '#f8c002', '#4072ee'],
  grid: {
    left: '1%',
    right: '5%',
    bottom: '1%',
    containLabel: true
  },
  tooltip: { // 提示框
    trigger: 'item',
    triggerOn: 'mousemove',
    backgroundColor: 'rgba(1,70,86,1)',
    borderColor: 'rgba(0,246,255,1)',
    borderWidth: 0.5,
    textStyle: {
      fontSize: 10
    }
  },
  series: [{
    type: 'tree',
    data: [],
    layout: 'radial',
    symbol: 'circle',
    symbolSize: 10,
    label: { // 标签样式
      color: '#00DEFF',
      fontSize: 12,
      position: 'right',
      rotate: 0
    }
  }]
}
export {
  commonBar,
  commonScatter,
  common3DBar,
  commonLine,
  commonFunnel,
  commonMap,
  commonPie,
  commonTree
}
