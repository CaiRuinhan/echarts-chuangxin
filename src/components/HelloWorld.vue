<template>
  <div class="hello">
    <h1 @click="testUser">{{ msg }}</h1>
  </div>
</template>

<script>
// import UserApi from '@/api/user'
import BoardApi from '@/api/board'
import BoardService from '@/service/board-service'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    // testUser: function () {
    //   UserApi.getUserInfo({}).then(res => {

    //   })
    // },
    testBoard: function () {
      var dataItems = BoardService.departmentInfosService({ 'year': 2019 })
      console.log(dataItems)
      // this.msg = res.message
    },
    testLifecycle: function () {
      BoardApi.getLifecycleDatas({ 'year': 2019 }).then(res => {
        this.msg1 = res.message
      })
    },
    testClassify: function () {
      BoardApi.getAllClassifyDatas({ 'year': 2019 }).then(res => {
        console.log(res)
      })
    },
    testPoston: function () {
      BoardApi.getPostonDatas({}).then(res => {
        console.log(res)
      })
    },
    testProductMarket: function () {
      BoardApi.getProductMarketDatas({}).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
