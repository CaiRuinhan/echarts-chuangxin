<template>
  <div class="page-wrap">
     <HeadPartTwo :titleName="$route.meta.title"></HeadPartTwo>
    <div class="left">
      <div class="left-top">
          <span class="part-title">三曲线产品分布</span>
          <div id="threeProduct"  class="part-content"></div>
      </div>
      <div class="left-bottom">
        <ul>
          <li>
            <span class="part-title">BCG模型分析</span>
            <div id="modelBgc"  class="part-content"></div>
          </li>
          <li>
            <span class="part-title">ADL矩阵模型</span>
            <div id="modelAdl"  class="part-content"></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
     <ul>
       <li>
           <span class="part-title">产品渗透率TOP5</span>
            <p><span>排名</span><span>产品名称</span><span>渗  透  率</span></p>
          <div id="permeability"  class="part-content"></div>
       </li>
       <li>
           <span class="part-title">产品ARPU值TOP5</span>
            <p><span>排名</span><span>产品名称</span><span>ARPU  值  (元/户)</span></p>
          <div id="productArpu"  class="part-content"></div>
       </li>
     </ul>
    </div>
  </div>
</template>

<script>
import ProductEvaluationService from '@/service/product/product-evaluation-service.js'
export default {
  name: 'product-evaluation',
  data () {
    return {

    }
  },
  mounted () {
    this.initEcharts()// 初始化图表
    this.getEchartsData()// 获取数据
  },
  methods: {
    // 初始化图表
    initEcharts () {
      this.threeProductCharts = this.Echarts.init(document.getElementById('threeProduct'))// 三曲线产品分布
      this.modelBgcCharts = this.Echarts.init(document.getElementById('modelBgc'))// BGC模型分析
      this.modelAdlCharts = this.Echarts.init(document.getElementById('modelAdl'))// ADL矩阵模型
      this.permeabilityCharts = this.Echarts.init(document.getElementById('permeability'))// 产品渗透率top5
      this.productArpuCharts = this.Echarts.init(document.getElementById('productArpu'))// 产品ARPU值TOP5
    },
    // 获取数据
    getEchartsData () {
      ProductEvaluationService.getProductEvaluationData(this.params).then(res => {
        this.threeProductCharts.setOption(res.threeProductOption)// 三曲线产品分布
        this.modelBgcCharts.setOption(res.modelBgcOption)// BGC模型分析
        this.modelAdlCharts.setOption(res.modelAdlOption)// ADL矩阵模型
        this.permeabilityCharts.setOption(res.permeabilityOption)// 产品渗透率top5
        this.productArpuCharts.setOption(res.productArpuOption)// 产品ARPU值TOP5
      })
    }
  },
  // 减少echarts的卡顿问题
  beforeDestroy () {
    this.threeProductCharts.clear()/// 三曲线产品分布
    this.modelBgcCharts.clear()/// BGC模型分析
    this.modelAdlCharts.clear()// 生命周期// ADL矩阵模型
    this.permeabilityCharts.clear()/// 产品渗透率top5
    this.productArpuCharts.clear()/// 产品ARPU值TOP5
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/common.scss';
@import '@/assets/styles/product-evaluation.scss';
</style>
