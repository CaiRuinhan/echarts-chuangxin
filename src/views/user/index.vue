<template>
  <div class="page-wrap">
    <head-part :titleName="$route.meta.title"></head-part>
    <div class="left">
      <div class="left-top">
        <ul>
          <li>
            <span>{{ datas.innovateUsers |toThousandFilter}} <span class="font-little">(万户)</span> <span></span></span>
            <p>创新产品出账用户数</p>
          </li>
          <li>
            <span>{{ datas.feeUsers |toThousandFilter}}<span class="font-little">(万户)</span></span>
            <p>大网出账用户数</p>
          </li>
          <li>
            <span>{{ datas.feeInnovateIncome |toThousandFilter}}<span class="font-little">(元/户)</span></span>
            <p>创新产品用户ARPU</p>
          </li>

          <li>
            <span>{{ datas.feeInnovateUsers |toThousandFilter}}<span class="font-little">(元/户)</span></span>
            <p>创新产品ARPU贡献</p>
          </li>
          <li>
            <span>{{ datas.unicomArpus|toThousandFilter}}<span class="font-little">(元/户)</span></span>
            <p>大网用户ARPU</p>
          </li>
        </ul>
      </div>
      <div class="left-main">
        <div class="left-main-left">
          <span class="part-title">分省用户数</span>
          <div id="province" class="part-content">

          </div>
        </div>
        <div class="left-main-right">
          <div class="left-main-right-top">
            <span class="part-title">付费用户数</span>
            <div id="pay" class="part-content"></div>
          </div>
          <div class="left-main-right-main">
            <span class="part-title">活跃用户数</span>
            <div id="active" class="part-content"></div>
          </div>
          <div class="left-main-right-bottom">
            <span class="part-title">用户分布</span>
            <div id="user" class="part-content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <ul>
        <li>
          <span class="part-title">套餐</span>
          <div id="meal" class="part-content" ></div>
        </li>
        <li>
          <span class="part-title">VOLTE</span>
          <div id="volte" style="height:100%;width:100%;"></div>
        </li>
        <li>
          <span class="part-title">终端</span>
          <div id="terminal" class="part-content"></div>
        </li>
        <li>
          <span class="part-title">用户群体</span>
          <div id="group" class="part-content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userService from '@/service/user/user-servic'
// import getUserApi from '@/api/user/user-api.js'
export default {
  name: 'User',
  data () {
    return {
      datas: {},
      params: { 'year': '2020' }
    }
  },
  created () {
  },
  mounted () {
    // this.getNumber()
    this.setInitCharts()

    this.getUserData()
  },
  methods: {

    setInitCharts () {
      this.provinceEcharts = this.Echarts.init(document.getElementById('province'))
      this.payEcharts = this.Echarts.init(document.getElementById('pay'))
      this.activeEcharts = this.Echarts.init(document.getElementById('active'))
      this.userEcharts = this.Echarts.init(document.getElementById('user'))
      this.mealEcharts = this.Echarts.init(document.getElementById('meal'))
      this.volteEcharts = this.Echarts.init(document.getElementById('volte'))
      this.groupEcharts = this.Echarts.init(document.getElementById('group'))
      this.terminalEcharts = this.Echarts.init(document.getElementById('terminal'))
    },
    getUserData () {
      userService.getUserData(this.params).then(res => {
        this.datas = res.bigDatas
        this.provinceEcharts.setOption(res.getProvinceOption)
        this.payEcharts.setOption(res.getPayOption)
        this.activeEcharts.setOption(res.getActiveOption)
        this.userEcharts.setOption(res.getUserOption)
        this.mealEcharts.setOption(res.getMealOption)
        this.volteEcharts.setOption(res.getVolteOption)
        this.groupEcharts.setOption(res.getGroupOption)
        this.terminalEcharts.setOption(res.getTerminalOption)
      })
    }
  },

  // 减少echarts的卡顿问题
  beforeDestroy () {
    this.provinceEcharts.clear()
    this.payEcharts.clear()
    this.activeEcharts.clear()
    this.userEcharts.clear()
    this.mealEcharts.clear()
    this.volteEcharts.clear()
    this.groupEcharts.clear()
    this.terminalEcharts.clear()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/common.scss';
@import '@/assets/styles/user.scss';
</style>
