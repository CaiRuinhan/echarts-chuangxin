<!-- 头部 -->
<template>
  <div class="head-part">
    <h4>
      <span class="title">{{ titleName }}</span>
    </h4>
    <div class="button" @click="$router.push('/')"></div>
  </div>
</template>

<script>
export default {
  name: 'HeadPart',
  props: {
    titleName: {
      type: String,
      required: true,
      market: sessionStorage.getItem('market') || ''
    }
  },
  data () {
    return {
    }
  },
  mounted () { }
}
</script>

<style lang="scss" scoped>
.head-part {
  height: 88px;
  text-align: center;
  background-image: url('../../assets/images/common/top-bg1920x88.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;

  .title {
    height: 80px;
    line-height: 80px;
    font-size: 40px;
    color: #fff;
    background-clip: text;
    -webkit-background-clip: text;
    font-family: 'HYXiaoBoMeiYanTiW';
    letter-spacing: 10px;
  }

  .button {
    width: 102px;
    height: 42px;
    background-image: url('../../assets/images/common/88x36.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    cursor: pointer;
    position: absolute;
    left: 60px;
    top: 24px;
    z-index: 1000;
    &:hover {
      background-image: url('../../assets/images/common/home.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
}
</style>
