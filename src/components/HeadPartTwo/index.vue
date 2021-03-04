<!-- 头部 -->
<template>
  <div  :class="[titleName.length>5 ? 'big' :'head-part']">
    <h4>
      <span class="title">{{ titleName }}</span>
         <span
        style="
          vertical-align: super;
          font-size: 16px;
          letter-spacing: 3px;
          border-bottom: 2px solid #f3aa72;
          color: #78fcff;
        "
        >{{ titleName==="产品评价" ? '' : market }}</span>
    </h4>
    <div class="button" @click="go"></div>
  </div>
</template>

<script>
export default {
  name: 'HeadPartTwo',
  props: {
    titleName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      market: sessionStorage.getItem('market') || ''
    }
  },
  methods: {
    go () {
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="scss" scoped>
.big {
  height: 80px;
  text-align: center;
  background-image: url('../../assets/images/common/big.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  .title {
    height: 80px;
    line-height: 80px;
    font-size: 40px;
    // text-align: center;
    background: #fff;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-family: 'HYXiaoBoMeiYanTiW';
    color: transparent;
    letter-spacing: 10px;
  }

  .button {
    width: 102px;
    height: 42px;
    background-image: url('../../assets/images/common/backView.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    cursor: pointer;
    position: absolute;
    left: 60px;
    top: 24px;
    z-index: 1000;
    &:hover {
      background-image: url('../../assets/images/common/backLight.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
}
.head-part {
  height: 80px;
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
    background-image: url('../../assets/images/common/backView.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    cursor: pointer;
    position: absolute;
    left: 60px;
    top: 24px;
    z-index: 1000;
    &:hover {
      background-image: url('../../assets/images/common/backLight.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
}
</style>
