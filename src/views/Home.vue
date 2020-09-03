<template>
  <!-- 所有 "-" 类名为Boot类名,  "_" 类名为my_css自定义类名 -->
  <div class="home">
    <div class="showhead">
      <my-header></my-header>
    </div>
    <!-- <router-link to="/login" class="text-white" v-if="!$store.state.isLogin">
      <el-button type="primary">登录</el-button>
    </router-link>
    <div v-else>
      {{$store.state.nickname}}
      <el-button type="danger" @click="logOut">退出</el-button>
    </div>-->
    <div class="view">
      <Carousel></Carousel>
      <HomeRow1></HomeRow1>
    </div>
    <div class="bg_view">
      <div class="view">
        <MiGo></MiGo>
        <HomeFirst :resultArrFirst="resultArrFirst" :ptype="Type[0]" :banner="banner[0]"></HomeFirst>
        <HomeFirst :resultArrFirst="resultArrSeconde" :ptype="Type[1]" :banner="banner[1]"></HomeFirst>
        <HomeFirst :resultArrFirst="resultArrThird" :ptype="Type[2]" :banner="banner[2]"></HomeFirst>
      </div>
    </div>
    <div class="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Carousel from "@/components/carousel.vue";
import HomeRow1 from "@/components/HomeRow1.vue";
import MiGo from "@/components/MiGo.vue";
import HomeFirst from "@/components/HomeFirst.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Carousel,
    HomeRow1,
    MiGo,
    HomeFirst,
    // HomeSecond,
    // HomeThird
  },
  data() {
    return {
      scrollTop: "",
      sendAxios: "",
      Type: ["粘土人", "可动手办", "比例人形"],
      limit: "8",
      isSendFirst: true,
      resultArrFirst: [],
      isSendSecond: true,
      resultArrSeconde: [],
      isSendThird: true,
      resultArrThird: [],
      banner: [
        {
          col: require("../assets/index/bigBanner/col1.jpg"),
          row: require("../assets/index/bigBanner/row1.png"),
        },
        {
          col: require("../assets/index/bigBanner/col2.jpg"),
          row: require("../assets/index/bigBanner/row2.png"),
        },
        {
          col: require("../assets/index/bigBanner/col3.jpg"),
          row: require("../assets/index/bigBanner/row3.png"),
        },
      ],
    };
  },
  methods: {
    logOut() {
      this.$store.state.isLogin = false;
      window.sessionStorage.clear();
    },
  },
  mounted() {
    document.documentElement.style = "overflow-y: auto;";
    // 自定义事件
    var ListenerScroll = () => {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 获取滚轮高度
      // console.log(this.scrollTop)
      if (this.scrollTop >= 400) {
        if (this.isSendFirst == true) {
          this.isSendFirst = false;
          this.sendAxios(this.Type[0], this.resultArrFirst);
        }
      }
      if (this.scrollTop >= 1200) {
        if (this.isSendSecond) {
          this.isSendSecond = false;
          this.sendAxios(this.Type[1], this.resultArrSeconde);
        }
      }
      if (this.scrollTop >= 2100) {
        if (this.isSendThird) {
          this.isSendThird = false;
          this.sendAxios(this.Type[2], this.resultArrThird);
        }
      }
    };
    window.addEventListener("scroll", ListenerScroll);

    // 封装AXIOS
    this.sendAxios = (type, resultArr) => {
      this.axios
        .get(`/prolist_search`, {
          params: {
            page: "",
            ptype: type,
            pmanu: "",
            limit: this.limit,
            keyword: "",
            orderby: "",
            pdisc: "",
            ptotal: "",
            order: "",
          },
        })
        .then((res) => {
          console.log(res.data, 1);
          let data = res.data.prolist;
          // console.log(data);
          data.forEach((element) => {
            element.image = require(`../assets/products/${element.image}`);
            resultArr.push(element);
          });
        });
      console.log(resultArr, typeof resultArr);
    };
  },
};
</script>
<style scoped>
.home .view {
  width: 1226px;
  margin: 0 auto;
}
.home .showhead {
  position: relative;
  z-index: 99;
}
.home .bg_view {
  width: 100%;
  background-color: #f5f5f5;
  min-height: 3000px;
}
.home .footer {
  margin-bottom: 28px;
}
</style>
