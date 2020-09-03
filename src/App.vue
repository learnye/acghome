<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  watch: {
    $route() {
      // 回到顶部
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    //检查时是否登录，若登录，同步购物车
    // if (this.$store.state.isLogin) {
    //   //获取用户订单信息
    //   var uid = this.$store.state.uid;
    //   this.axios.get("/cart", { params: { uid } }).then((res) => {
    //     var shoplist = [],
    //       totalPrice = 0,
    //       totalSelected = 0;
    //     res.data.shoplist.forEach((elem, index) => {
    //       elem.image = require("./assets/products/" +
    //         elem.image.split(",")[0]);
    //       shoplist.push(elem);
    //       totalPrice += elem.price * elem.count * elem.ischecked;
    //       totalSelected += elem.count * elem.ischecked;
    //     });
    //     console.log(shoplist, totalSelected, totalPrice);
    //     //将数据存入vuex中
    //     this.$store.commit("updateShoplist", {
    //       shoplist,
    //       totalPrice,
    //       totalSelected,
    //     });
    //   });
    // }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
