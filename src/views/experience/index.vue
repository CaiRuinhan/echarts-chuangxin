<template>
  <div class="page-wrap">
    <head-part :titleName="$route.meta.title"></head-part>
    <div class="left">
      <ul>
        <li>
          <span class="part-title">投诉量最高产品TOP5</span>
          <p>
            <span>排名</span><span>投诉类型</span><span>投 诉 量 (件)</span>
          </p>
          <div id="heighest" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">正声量产品TOP5</span>
          <p>
            <span>排名</span><span>产品名称</span><span>正 声 量 (次)</span>
          </p>
          <div id="positiveTop" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">负声量产品TOP5</span>
          <p>
            <span>排名</span><span>产品名称</span><span>负 声 量 (次)</span>
          </p>
          <div id="negativeTop" class="part-content"></div>
        </li>
      </ul>
    </div>
    <div class="center">
      <div class="center-top">
        <span class="part-title">投诉量分布</span>
        <div id="complaintsMap" style="width: 100%; height: 359px"></div>
        <div id="complaintsBar" style="width: 100%; height: 118px"></div>
      </div>
      <div class="center-center">
        <span class="part-title">投诉量</span>
        <div id="complaints" class="part-content"></div>
      </div>
      <div class="center-bottom">
        <span class="part-title">正负声量时间趋势</span>
        <div id="time" class="part-content"></div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li>
          <span class="part-title">投诉分类</span>
          <div id="classify" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">正声量来源</span>
          <div id="positiveSource" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">负声量来源</span>
          <div id="negativeSource" class="part-content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ExperienceService from '@/service/experience/experience-service'
export default {
  name: 'Experience',
  data () {
    return {
      params: {
        year: 2020
      }
    }
  },
  mounted () {
    this.setetInitEcharts()
    this.getExperienceData()
    this.initEvent()
  },
  methods: {
    // 设置高亮的方法
    highlightHandler (data, defaultName, serieaIndex, dataIndex) {
      // 改变this指向
      let _that = this
      // 拿到option属性
      let option = _that.complaintsMapEcharts.getOption()
      // 拿到data的数据
      option.series[0].data = ExperienceService.convertData(data)
      // 设置op通展示样式
      _that.complaintsMapEcharts.setOption(option, true)
      _that.complaintsMapEcharts.dispatchAction({
        type: 'highlight',
        seriesIndex: serieaIndex,
        dataIndex: dataIndex
      })
      // 拿到柱状图的option
      let options = _that.complaintsBarEcharts.getOption()
      options.series[0].data.forEach((element, index) => {
      // 展示柱状图的高亮
        if (defaultName === element.name) {
          element.itemStyle.color = '#00ffff'
        } else {
          element.itemStyle.color = '#187FFF'
        }
      })
      // 设置柱状图的option
      _that.complaintsBarEcharts.setOption(options, true)
    },
    // 设置地图默认样式
    initEvent () {
      var _that = this
      // 当地图鼠标进入事件触发拿到数据
      this.complaintsMapEcharts.on('mouseover', function (event) {
        // 设置指定系列
        let serieaIndex = 0; let dataIndex = 0
        if (event.componentType === 'series' && event.seriesIndex === 1) {
          serieaIndex = event.seriesIndex
          dataIndex = event.dataIndex
        }
        // 触发高亮事件
        _that.highlightHandler([event.data], event.data.name, serieaIndex, dataIndex)
      })
      // 设置柱状图高粱事件
      this.complaintsBarEcharts.on('mouseover', function (event) {
        let option = _that.complaintsMapEcharts.getOption()
        let dataIndex = 0
        option.series[1].data.forEach((element, index) => {
          if (event.data.name === element.name) {
            dataIndex = index
            return false
          }
        })
        _that.highlightHandler([{
          name: event.data.name,
          sort: event.data.sort,
          value: event.data.value,
          realValue: event.data.value
        }], event.data.name, 1, dataIndex)
      })
    },

    setetInitEcharts () {
      this.heighestEcharts = this.Echarts.init(document.getElementById('heighest'))
      this.positiveTopEcharts = this.Echarts.init(document.getElementById('positiveTop'))
      this.negativeTopEcharts = this.Echarts.init(document.getElementById('negativeTop'))
      this.complaintsMapEcharts = this.Echarts.init(document.getElementById('complaintsMap'))
      this.complaintsBarEcharts = this.Echarts.init(document.getElementById('complaintsBar'))
      this.complaintsEcharts = this.Echarts.init(document.getElementById('complaints'))
      this.timeEcharts = this.Echarts.init(document.getElementById('time'))
      this.classifyEcharts = this.Echarts.init(document.getElementById('classify'))
      this.positiveSourceEcharts = this.Echarts.init(document.getElementById('positiveSource'))
      this.negativeSourceEcharts = this.Echarts.init(document.getElementById('negativeSource'))
    },
    getExperienceData () {
      ExperienceService.getExperienceData(this.params).then(res => {
        this.heighestEcharts.setOption(res.getHeighestOption)
        this.positiveTopEcharts.setOption(res.getPositiveTopOption)
        this.negativeTopEcharts.setOption(res.getNegativeTopOption)
        this.complaintsMapEcharts.setOption(res.getComplaintsMapOption)
        this.complaintsBarEcharts.setOption(res.getComplaintsBarOption)
        this.complaintsEcharts.setOption(res.getComplaintsOption)
        this.timeEcharts.setOption(res.getTimeOption)
        this.classifyEcharts.setOption(res.getClassifyOption)
        this.positiveSourceEcharts.setOption(res.getPositiveSourceOption)
        this.negativeSourceEcharts.setOption(res.getNegativeSourceOption)
      })
    }
  },
  // 减少echarts的卡顿问题
  beforeDestroy () {
    this.heighestEcharts.clear()
    this.positiveTopEcharts.clear()
    this.negativeTopEcharts.clear()
    this.complaintsMapEcharts.clear()
    this.complaintsBarEcharts.clear()
    this.complaintsEcharts.clear()
    this.timeEcharts.clear()
    this.classifyEcharts.clear()
    this.positiveSourceEcharts.clear()
    this.negativeSourceEcharts.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/common.scss';
@import '@/assets/styles/experience.scss';
</style>
