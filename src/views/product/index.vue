<template>
  <div class="page-wrap">
    <head-part :titleName="$route.meta.title"></head-part>
    <div class="product-evaluation" @click="toEvaluation"></div>
    <div class="left">
      <ul>
        <li>
          <span class="part-title">生命周期产品数量</span>
          <div id="life" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">三曲线产品数量</span>
          <div class="three-bg"></div>
          <div id="three" class="part-content three-content">
            <div class="three-content-top" @click="getThreeTop(tricurveData[2].name)">
              <div class="three-content-top-left three-content-font-left">
                {{ tricurveData[2].value }}
              </div>
              <div class="three-content-top-right three-content-font-right">
                {{ tricurveData[2].name }}
              </div>
            </div>
            <div class="three-content-center" @click="getThreeCenter(tricurveData[1].name)">
              <div class="three-content-center-left three-content-font-left">
                {{ tricurveData[1].value }}
              </div>
              <div class="three-content-center-right three-content-font-right">
                {{ tricurveData[1].name }}
              </div>
            </div>
            <div class="three-content-bottom"  @click="getThreeBottom(tricurveData[0].name)">
              <div class="three-content-bottom-left three-content-font-left">
                {{ tricurveData[0].value }}
              </div>
              <div class="three-content-bottom-right three-content-font-right">
                {{ tricurveData[0].name }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="center">
      <div class="center-top">
        <span class="part-title">产品总视图</span>
        <div class="left" @click="prevFn"></div>
        <div class="right" @click="nextFn"></div>
        <div id="productView" class="part-content"></div>
        <ul>
          <li :style="item.substyle" v-for="(item, key) in stageLst" :key="key">
            <i></i>
            <span :style="'color:' + item.color">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="center-bottom">
        <span class="part-title">总视图</span>
        <div id="incomes" class="tatal-view"></div>
        <div id="users" class="tatal-view"></div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li>
          <span class="part-title">目标市场产品数量</span>
          <div id="market" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">知识产权产品数量</span>
          <div id="knowledge" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">子公司产品数量</span>
          <div id="subcompany" class="part-content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Productservice from '@/service/product/product-service.js'
export default {
  name: 'Product',
  data () {
    return {
      params: {
        year: '2020'
      },
      totalView: {
        year: '2020',
        lifeCycleId: '',
        threeId: '',
        marketId: '',
        knowledgeId: '',
        subCompanyId: ''
      },
      life3DShow: 7,
      tricurveData: [
        { value: '', name: '' },
        { value: '', name: '' },
        { value: '', name: '' }
      ],
      stageLst: []
    }
  },
  mounted () {
    this.initEcharts()// 初始化图表

    this.getProductData()// 获取所有数据
    this.getproductViewtData() // 获取产品总视图数据
  },
  methods: {
    // 初始化图表
    initEcharts () {
      this.lifeCharts = this.Echarts.init(document.getElementById('life'))// 生命周期
      this.productViewCharts = this.Echarts.init(document.getElementById('productView'))// 产品总视图
      this.incomesCharts = this.Echarts.init(document.getElementById('incomes'))// 总视图-收入
      this.usersCharts = this.Echarts.init(document.getElementById('users'))// 总视图-用户
      this.marketCharts = this.Echarts.init(document.getElementById('market'))// 目标市场产品数量
      this.knowledgeCharts = this.Echarts.init(document.getElementById('knowledge'))// 知识产权产品数量
      this.subcompanyCharts = this.Echarts.init(document.getElementById('subcompany'))// 子公司产品数量
    },
    // 初始化所有数据
    getProductData () {
      Productservice.getProductData(this.params).then(res => {
        this.lifeCharts.setOption(res.lifeOption)// 生命周期
        this.tricurveData = res.tricurveData// 三曲线产品数量

        // this.productViewCharts.setOption(res.toPlay.option)// 产品总视图
        this.incomesCharts.setOption(res.incomesOption)// 总视图-收入
        this.usersCharts.setOption(res.usersOption)// 总视图-用户
        this.marketCharts.setOption(res.marketOption)// 目标市场产品数量
        this.knowledgeCharts.setOption(res.knowledgeOption)// 知识产权产品数量
        this.subcompanyCharts.setOption(res.subcompanyOption)// 子公司产品数量
        // this.toProductiInfo(res.toPlay.detailData)
      })
    },
    // 获取产品总视图数据
    getproductViewtData () {
      Productservice.getProducts(this.totalView, this.life3DShow).then(res => {
        this.stageLst = res.toPlay.stageLst
        this.productViewCharts.setOption(res.toPlay.option)// 产品总视图
        this.toProductiInfo(res.toPlay.detailData)
      })
    },
    // // 上一个切换
    prevFn () {
      const res = Productservice.toShowOfIndex('prev', 1, this.life3DShow)

      if (res && res.option) {
        this.productViewCharts.setOption(res.option)
        this.stageLst = res.stageLst
        this.getproductViewtData()
      }
    },
    // 下一个切换
    nextFn () {
      const res = Productservice.toShowOfIndex('next', 1, this.life3DShow)

      if (res && res.option) {
        this.productViewCharts.setOption(res.option)
        this.stageLst = res.stageLst
        this.getproductViewtData()
      }
    },
    // 跳转产品评价
    toEvaluation () {
      this.$router.push({
        path: '/product-evaluation'
      })
    },
    // 进入产品详情
    toProductiInfo (data) {
      let _that = this
      // 获取目标市场的产品数量
      this.marketCharts.on('click', function (params) {
        console.log('市场目标', params.data.name)
        _that.totalView = {}
        _that.totalView.year = '2020'
        _that.totalView.marketId = params.data.name

        Productservice.lifeIndex = 0

        Productservice.lifecycleDatas = null

        _that.getproductViewtData()
      })
      // 获取声明周期的产品数量
      this.lifeCharts.on('click', function (params) {
        _that.totalView = {}
        _that.totalView.year = '2020'
        _that.totalView.lifeCycleId = params.data.name
        Productservice.lifeIndex = 0
        Productservice.lifecycleDatas = null
        _that.getproductViewtData()
      })
      // 获取知识产权产品标识
      this.knowledgeCharts.on('click', function (params) {
        _that.totalView = {}
        _that.totalView.year = '2020'
        _that.totalView.knowledgeId = params.data.name
        Productservice.lifeIndex = 0

        Productservice.lifecycleDatas = null

        _that.getproductViewtData()
      })
      // 获取子公司产品标识
      this.subcompanyCharts.on('click', function (params) {
        _that.totalView = {}
        _that.totalView.year = '2020'
        _that.totalView.subCompanyId = params.name
        Productservice.lifecycleDatas = null
        Productservice.lifeIndex = 0
        _that.getproductViewtData()
      })

      _that.productViewCharts.on('click', function (params) {
        _that.$alert(`是否进入【${params.seriesName.split(',')[params.dataIndex].split(',')}】详情页？`, '产品详情', {
          confirmButtonText: '确定',

          callback: action => {
            if (action === 'confirm') {
              if (data[params.dataIndex].name === '沃学习') {
                // console.log('window.localtion.href', window)
                window.location.href = 'http://111.202.245.140:9180/music_br/#/wo-study'
              } else if (data[params.dataIndex].name === '视频彩铃') {
                window.location.href = 'http://111.202.245.140:9180/music_br/#/video-ring'
              } else {
                sessionStorage.setItem('productId', data[params.dataIndex].pid)
                sessionStorage.setItem('productName', data[params.dataIndex].name)
                sessionStorage.setItem('market', data[params.dataIndex].market)
                _that.$router.push({
                  name: 'product-info'
                })
              }
            }
          }
        })
      })
    },
    // 获取三曲线数据新兴
    getThreeTop (val) {
      this.totalView.threeId = val
      this.totalView.marketId = ''
      this.totalView.knowledgeId = ''
      this.totalView.subCompanyId = ''
      this.totalView.year = '2020'
      this.totalView.lifeCycleId = ''

      this.getproductViewtData()
    },
    // 获取三曲线数据成长
    getThreeCenter (val) {
      this.totalView.threeId = val
      this.totalView.marketId = ''
      this.totalView.knowledgeId = ''
      this.totalView.subCompanyId = ''
      this.totalView.year = '2020'
      this.totalView.lifeCycleId = ''
      this.totalView.threeId = val
      this.getproductViewtData()
    },
    // 获取三曲线数据核心
    getThreeBottom (val) {
      this.totalView.threeId = val
      this.totalView.marketId = ''
      this.totalView.knowledgeId = ''
      this.totalView.subCompanyId = ''
      this.totalView.year = '2020'
      this.totalView.lifeCycleId = ''
      this.totalView.threeId = val
      this.getproductViewtData()
    }
  },
  // 减少echarts的卡顿问题
  beforeDestroy () {
    this.lifeCharts.clear()// 生命周期
    this.productViewCharts.clear()// 产品总视图
    this.incomesCharts.clear()// 总视图-收入
    this.usersCharts.clear()// 总视图-用户
    this.marketCharts.clear()// 目标市场产品数量
    this.knowledgeCharts.clear()// 知识产权产品数量
    this.subcompanyCharts.clear()// 子公司产品数量
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/common.scss';
@import '@/assets/styles/product.scss';
</style>
