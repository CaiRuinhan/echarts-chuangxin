<template>
  <div class="page-wrap">
    <HeadPartTwo :titleName="productName"></HeadPartTwo>
    <div class="top">
      <ul>
        <li>
          <span>{{ bigData.users | toThousandFilter }} <span class="font-little">(万户)</span></span>
          <div class="font-bottom">
            网上用户数
            <span class="font-little">(日)</span>
          </div>
        </li>
        <li>
          <span>{{ bigData.feeUsers | toThousandFilter }}<span class="font-little">(万户)</span></span>
          <div class="font-bottom">
            网上付费用户数
            <span class="font-little">(日)</span>
          </div>
        </li>
        <li>
          <span>{{ bigData.activeUsers | toThousandFilter }}<span class="font-little">(万户)</span></span>
          <div class="font-bottom">
            累计活跃用户数
            <span class="font-little">(日)</span>
          </div>
        </li>
        <li>
          <span>{{ bigData.permeabilities | toThousandFilter }}</span>
          <div class="font-bottom">
            渗透率
            <span class="font-little">(月)</span>
          </div>
        </li>
        <li>
          <span>{{ bigData.aupu | toThousandFilter }}<span class="font-little">(元/户)</span></span>
          <div class="font-bottom">
            平均ARPU值
            <span class="font-little">(月)</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="main-left-top">
          <span class="part-title">产品介绍</span>
          <div class="part-content main-left-top-content">
            <div class="main-left-top-content-up">
              <div class="product-introduction">
                <label>公司名称：</label>
                <span>{{ productInfo.name }}</span>
              </div>
              <div style="text-indent: 31px" class="product-introduction">
                <label>部门：</label>
                <span>
                  {{ productInfo.subCompany }}
                </span>
              </div>
              <div class="product-introduction">
                <label>产品经理：</label>
                <span>
                  {{ productInfo.pm }}
                </span>
              </div>
              <div class="product-introduction">
                <label>产品说明：</label>
                <div class="dec">
                  {{ productInfo.detail }}
                </div>
              </div>
            </div>
            <div class="main-left-top-content-bottom">
              <div class="time-line-data">
                <div class="circle"></div>
                试商用时间：
                <span>
                  {{
                    !productInfo.precommercialTime
                      ? '暂未试商用'
                      : productInfo.precommercialTime
                  }}
                </span>
              </div>
              <div class="link-right"></div>
              <div class="time-line-data">
                <div class="circle"></div>
                商用时间：
                <span>
                  {{
                    !productInfo.commercialTime
                      ? '暂未正式商用'
                      : productInfo.commercialTime
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="main-left-bottom">
          <span class="part-title">产品亮点展示</span>
          <div v-show="productInfo.starPoints.length" class="part-content">
            <div
              v-for="(item, index) in productInfo.starPoints"
              :key="index"
              class="part-content-main"
            >
              <div class="light-pic"></div>
              <span class="light-content">
                {{ item.point }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="main-center">
        <div class="main-center-top">
          <span class="tooltip">地域分布</span>
          <div
            id="region"
            style="width: 100%; height: 358px; z-index: 9999"
          ></div>
        </div>
        <div class="main-center-center">
          <span class="part-title">收入</span>
          <div id="income" class="part-content"></div>
          <div v-show="incomeFlag" class="incomeFlag">【暂无数据】</div>
        </div>
        <div class="main-center-bottom">
          <span class="part-title">新增订购用户数</span>
          <div id="newUser" class="part-content"></div>
        </div>
      </div>
      <div class="main-right">
        <div class="main-right-top">
          <span class="part-title">终端</span>
          <div id="terminal" class="part-content"></div>
        </div>
        <div class="main-right-center">
          <span class="part-title">套餐</span>
          <div id="meal" class="part-content"></div>
        </div>
        <div class="main-right-bottom">
          <span class="part-title">活跃用户数</span>
          <div id="activeUser" class="part-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductInfoService from '@/service/product/product-info-service.js'
export default {
  name: 'product-info',
  data () {
    return {
      productName: sessionStorage.getItem('productName') || '',
      pid: sessionStorage.getItem('productId') || '',
      bigData: {
        activeUsers: '',
        aupu: '',
        feeUsers: '',
        permeabilities: '',
        users: ''
      },
      productInfo: {
        commercialTime: '',
        detail: '',
        name: '',
        pid: '',
        precommercialTime: '',
        subCompany: '',
        starPoints: []
      },
      incomeFlag: false

    }
  },

  mounted () {
    this.initEcharts()// 初始化图表
    this.getEchartsData()// 获取数据
    this.initEvent()
  },
  methods: {
    // 设置地图默认样式
    initEvent () {
      var _that = this
      // this.mapChart.on('click', function (params) {
      //   _that.params.provinceCode = params.data.provinceCode
      //   _that.getMonthListService(_that.params)
      // })
      this.regionCharts.on('mouseover', function (event) {
        if (event.componentType === 'series' && event.seriesIndex === 1) {
          let option = _that.regionCharts.getOption()
          option.series[0].data = ProductInfoService.convertData([event.data])
          _that.regionCharts.setOption(option, true)
          // 由于绑定了mouseover事件，地图默认的高亮事件不触发了
          // 所以手动高亮一下
          _that.regionCharts.dispatchAction({
            type: 'highlight',
            seriesIndex: event.seriesIndex,
            dataIndex: event.dataIndex
          })
        }
      })
    },
    // 初始化图表
    initEcharts () {
      this.regionCharts = this.Echarts.init(document.getElementById('region'))// 地域分布
      this.incomeCharts = this.Echarts.init(document.getElementById('income'))// 收入
      this.newUserCharts = this.Echarts.init(document.getElementById('newUser'))// 新增订购用户数
      this.terminalCharts = this.Echarts.init(document.getElementById('terminal'))// 终端
      this.mealCharts = this.Echarts.init(document.getElementById('meal'))// 套餐
      this.activeUserCharts = this.Echarts.init(document.getElementById('activeUser'))// 活跃用户数
    },
    // 获取数据
    getEchartsData () {
      ProductInfoService.getProductInfoData({ year: '2020', pid: this.pid }).then(res => {
        this.bigData = res.bigData// 数字展示
        this.productInfo = res.productInfo// 产品介绍
        this.regionCharts.setOption(res.regionOption)// 地域分布
        if (res.incomeOption.series[0].data.length === 0) {
          this.incomeCharts.dispose()
          this.incomeFlag = true
        } else {
          this.incomeCharts.setOption(res.incomeOption)// 收入
        }
        this.newUserCharts.setOption(res.newUserOption)// 新增订购用户数
        this.terminalCharts.setOption(res.terminalOption)// 终端
        this.mealCharts.setOption(res.mealOption)// 套餐
        this.activeUserCharts.setOption(res.activeUserOption)// 活跃用户数
      })
    }
    // initEvent () {
    //   var _that = this
    //   // this.regionCharts.on('click', function (params) {
    //   //   _that.params.provinceCode = params.data.provinceCode
    //   //   _that.getMonthListService(_that.params)
    //   // })
    //   // this.regionChartss已经作为一个函数 就需要使用_that     因为函数里面和函数外this的指向不同

    //   this.regionCharts.on('mouseover', function (event) {
    //     // 找到想要高亮的样式，这个是北京样式
    //     if (event.componentType === 'series' && event.seriesIndex === 1) {
    //     // 设置地图样式
    //       let option = _that.regionCharts.getOption()
    //       // 将获得数据赋值给样式的数据
    //       option.series[0].data = ExperienceService.convertData([event.data])

    //       _that.regionCharts.setOption(option, true)
    //       // 由于绑定了mouseover事件，地图默认的高亮事件不触发了
    //       // 所以手动高亮一下
    //       // 设置默认高亮
    //       _that.regionCharts.dispatchAction({
    //         type: 'highlight',
    //         seriesIndex: event.seriesIndex,
    //         dataIndex: event.dataIndex
    //       })
    //     }
    //   })
    // }
  },
  // 减少echarts的卡顿问题
  beforeDestroy () {
    this.regionCharts.clear()// 地域分布
    this.incomeCharts.clear()// 收入
    this.newUserCharts.clear()// 新增订购用户数
    this.terminalCharts.clear()// 终端
    this.mealCharts.clear()// 套餐
    this.activeUserCharts.clear()// 活跃用户数
  }
}
</script>

<style  lang="scss" scoped>
@import '@/assets/styles/common.scss';
@import '@/assets/styles/product-info.scss';
</style>
