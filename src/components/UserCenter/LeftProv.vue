<template>
    <div class="userProvinceTu" id="userProvince" style="width:500px;height:900px;"></div>
</template>
<script>
export default {
  name: 'LeftProv',
  data () {
    return {
      year: '',
      provinces: {}
    }
  },
  methods: {
    left () {
      var provChart = this.Echarts.init(document.getElementById('userProvince'))
      provChart.setOption({
        tooltip: {
        // trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // 图标标记相关
        legend: {
          data: ['各省分用户数'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%', // grid 组件离容器左侧的距离。
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          // 横坐标字体样式
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          // 坐标轴轴线相关设置
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.provinces.y,
          // 纵坐标字体样式
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          // 坐标轴轴线相关设置
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            name: ['各省份用户数'],
            type: 'bar',
            barWidth: 23,
            itemStyle: {
              color: new this.Echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                  { offset: 0, color: '#4072EE' },
                  { offset: 0.6, color: '#4072EE' },
                  { offset: 1, color: 'transparent' }
                ]
              )
            },
            emphasis: {
              itemStyle: {
                color: new this.Echarts.graphic.LinearGradient(
                  1, 0, 0, 0,
                  [
                    { offset: 0, color: 'green' },
                    { offset: 0.4, color: 'green' },
                    { offset: 1, color: 'yellow' }
                  ]
                )
              }
            },
            data: this.provinces.x
          }
        ]

      })
      // 使用刚指定的配置项和数据显示图表。
    //  myChart.setOption(option)
    }
  }
}
</script>
