<template>
  <div class="card">
    <div class="title-bg">
      <span style="opacity: 1;font-size:22px;font-family:HYCuJianHeiJ;">{{title}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("~@/assets/images/service/card_bg.png");
  background-size: 100% 100%;
  color: #fff;

  padding: 40px 20px 20px;
  box-sizing: border-box;
  & * {
    box-sizing: border-box;
  }
  .title-bg {
    width: 100%;
    min-height: 32px;
    line-height:32px;
    font-size:22px;
    font-family:HYCuJianHeiJ;
    font-weight:400;
    position: absolute;
    top: 0px;
    left: 0px;
    text-align: center;
    padding: 5px 20px;
    background: url("~@/assets/images/service/cardtitle_bg.png") no-repeat;
    background-position:top center;
    color: #fff;
    background-size: 464px 100%;
  }
}
</style>
