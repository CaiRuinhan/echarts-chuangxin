<template>
  <div class="home">
    <div class="top">
      <div class="top-top">
        <span class="logo"></span>
        <span class="title"> 公众创新产品域运营管理支撑平台 </span>
      </div>
      <div class="top-bottom">
        <span>聚合开放</span>
        <span>创新孵化</span>
        <span>运营监控</span>
        <span>精准管理</span>
      </div>
    </div>
    <div class="main">
      <div class="ball"></div>
      <ul>
        <li @click="toChannel">
          <img src="../../assets/images/home/2.png" alt="" />
        </li>
        <li @click="toUser">
          <img src="../../assets/images/home/1.png" alt="" />
        </li>
        <li @click="toProduct">
          <img src="../../assets/images/home/122x122.png" alt="" />
        </li>
        <li @click="toExperience">
          <img src="../../assets/images/home/4.png" alt="" />
        </li>
        <li @click="toPower">
          <img src="../../assets/images/home/3.png" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HomeApi from '@/api/home/home-api.js'
export default {
  name: 'Home',
  data () {
    return {
      params: { 'year': '2020' }
    }
  },
  mounted () {
    // this.getMenu()
    // this.getToken()
  },
  methods: {
    getMenu () {
      HomeApi.getMenu().then(res => {
        console.log(res)
      })
    },
    getToken () {
      HomeApi.getToken().then(res => {
        console.log(res)
      })
    },
    toChannel () {
      alert('正在优化')
      // this.$router.push({
      //   path: '/channel'
      // })
    },
    toUser () {
      this.$router.push({
        path: '/user'
      })
    },
    toProduct () {
      this.$router.push({
        path: '/product'
      })
    },
    toExperience () {
      this.$router.push({
        path: '/experience'
      })
    },
    toPower () {
      alert('正在优化')
      // this.$router.push({
      //   path: '/power'
      // })
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/home.scss';
</style>
