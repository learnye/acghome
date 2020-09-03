<template>
  <div class="header">
    <!-- 页头 -->
    <div class="head_container">
      <div class="content">
        <div class="mall_name">
          <router-link to="/" class="text">伊红美蓝网</router-link>
        </div>
        <div class="loginPanel">
          <ul v-if="this.$store.state.isLogin==false">
            <li>
              <router-link to="/login" class="text">登录</router-link>
            </li>
            <li>
              <router-link to class="text">注册</router-link>
            </li>
            <li>
              <router-link to class="text">个人中心</router-link>
            </li>
          </ul>
          <ul v-else>
            <li>
              <router-link to class="text">{{$store.state.nickname}}</router-link>
            </li>
             <li @click="logOut">
              <router-link to class="text" >退出</router-link>
            </li>
            <li>
              <router-link to="/portal" class="text">个人中心</router-link>
            </li>
          </ul>
        </div>
        <div class="cart">
          <router-link to="/cart" class="shop a1">
            <span class="shopping">购物车({{totalSelected}})</span>
          </router-link>
          <div class="goods">
            <div class="empty" v-if="!totalSelected">
              <span>购物车中还没有商品,赶紧选购吧!</span>
            </div>
            <div class="good_container" v-else>
              <div class="good" v-for="(item,index) of goods" :key="index" v-show="item.ischecked">
                <div class="image">
                  <img :src="item.image" />
                </div>
                <span class="pname">{{item.productName}}</span>
                <span class="price">{{item.price.toFixed(2)}}</span>x
                <span class="count">{{item.count}}</span>
              </div>
            </div>
            <div class="subtotal" v-show="totalSelected">
                <p class="totalselected">共{{totalSelected}}件商品</p>
                <p class="totalprice">总计{{totalPrice.toFixed(2)}}元</p>
                <router-link to="/cart">去购物车结算</router-link>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索栏和产品分类 -->
    <div class="frame">
      <div class="logo">
        <img src="../assets/mi-logo.png" alt />
      </div>
      <div class="productTypes">
        <div>
          <router-link to v-for="(item,index) of productTypes" :key="index">{{item}}</router-link>
        </div>
      </div>
      <div class="searchbar">
        <input
          type="text"
          class="search"
          maxlength="10"
          :class="{active:isactive}"
          @input="search"
          @blur="clearWord"
          @focus="showWord"
          @keydown.enter="searchProduct"
          v-model="keyword"
        />
        <a href="javascript:void(0)" :class="{active:isactive}" @click="searchProduct">搜索</a>
        <div class="keyword" :class="{active:isactive}" v-show="arr.length>0">
          <ul class="result">
            <li
              v-for="(item,index) of arr"
              :key="index"
              :class="{isselected:isselected==index}"
              @mousedown="selectKeyword(index),searchProduct">
              <router-link to="/search">{{item}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
       productTypes: [
        "人气新品",
        "手办",
        "周边",
        "宅物",
        "漫展",
        "厂商",
        "发售信息",
        "服务",
        "肥宅快乐区",
      ],
      goods: [
        {
          price: 0,
        },
      ],
      //关键词列表
      keyword:this.$store.state.keyword,
      arr: [],
      //关键词
      isactive: false,
      //防抖
      canSend: true,
      //当前搜索框扩展中被选中的选项下标
      isselected: -1,
      // 总价
      totalPrice: 0,
      // 总选择
      totalSelected: 0,
    };
  },
  methods: {
    search() {
      this.showKeywords = true;
      if (this.canSend == true) {
        this.canSend == false;
        if (this.keyword) {
          this.axios.get("/searchwords?keyword=" + this.keyword).then(res => {
            this.arr = [];
            if (res.data.words != undefined) {
              res.data.words.forEach(element => {
                this.arr.push(element.sword);
              });
              setTimeout(() => {
                console.log(`查询完成！`);
                this.canSend = true;
              }, 1000);
            }
          });
        } else {
          this.arr = [];
        }
      }
    },
    clearWord() {
      this.isactive = false;
      this.isselected = -1;
      this.arr = [];
    },
    showWord() {
      this.isactive = true;
    },
    selectKeyword(i) {
      console.log(0);
      this.isselected = i;
      this.keyword = this.arr[i];
      // 将关键字转入kw变量中
      this.eventBus.$emit('kw',this.keyword);
      this.$store.commit('change_keyword_mutation',this.keyword);
      this.arr = [];
      this.isselected = -1;
      if(this.$route.path!='/search'){
          this.$router.push({path:'/search'});
      }
    },
    searchProduct(){
      this.eventBus.$emit('kw',this.keyword);
      this.$store.commit('change_keyword_mutation',this.keyword);
      console.log(this.$store.state.keyword)
      if(this.$route.path!='/search'){
          this.$router.push({path:'/search'});
      }
    },
    logOut(){
      this.$store.state.isLogin=false;
      window.sessionStorage.clear();
      this.goods = [{price:0}];
      this.totalPrice = 0;
      this.totalSelected = 0;
    },
  },
  mounted() {
    this.goods = this.$store.state.shoplist;
    this.totalPrice = this.$store.state.totalPrice;
    this.totalSelected = this.$store.state.totalSelected;
    window.onkeydown = e => {
      if (this.arr.length > 0) {
        if (e.keyCode == "38") {
          if (this.isselected == -1) {
            this.isselected = this.arr.length - 1;
          } else {
            this.isselected == 0
              ? (this.isselected = this.arr.length - 1)
              : (this.isselected -= 1);
          }
          this.keyword = this.arr[this.isselected];
        } else if (e.keyCode == "40") {
          if (this.isselected == -1) {
            this.isselected = 0;
          } else {
            this.isselected == this.arr.length - 1
              ? (this.isselected = 0)
              : (this.isselected += 1);
          }
          this.keyword = this.arr[this.isselected];
        } else if (e.keyCode == "13") {
          this.keyword = this.arr[this.isselected];
          this.arr = [];
          this.isselected = -1;
        }
      }
    };
    // 登录时同步更新购物车数据
    if (this.$store.state.isLogin) {
      //获取用户订单信息
      var uid = this.$store.state.uid;
      this.axios.get("/cart", { params: { uid } }).then((res) => {
        var shoplist = [],
          totalPrice = 0,
          totalSelected = 0;
        if(res.data.shoplist){
          res.data.shoplist.forEach((elem, index) => {
            elem.image = require("../assets/products/" +
              elem.image.split(",")[0]);
            shoplist.push(elem);
            totalPrice += elem.price * elem.count * elem.ischecked;
            totalSelected += elem.count * elem.ischecked;
          });
          this.goods=shoplist;
          this.totalPrice=totalPrice;
          this.totalSelected=totalSelected;
          console.log(shoplist, totalSelected, totalPrice);
          //将数据存入vuex中
          this.$store.commit("updateShoplist", {
            shoplist,
            totalPrice,
            totalSelected,
          });
        }
      });
    }
  },
  watch:{
    keyword(){
      this.$store.commit('change_keyword_mutation',this.keyword);
    }
  },

};
</script>
<style scoped>
/* 添加 */
.header {
  width: 100%;
}

/* 页头 */
.header .head_container {
  background-color: #000;
}

.header .head_container a {
  font-size: 12px;
  color: #b0b0b0;
  text-decoration: none;
}

.header .head_container .content {
  width: 1226px;
  margin: 0 auto;
  display: flex;
}

.header .head_container .content > div {
  line-height: 40px;
  height: 40px;
}

.header .head_container .content .mall_name {
  flex: 0 1 75%;
  text-align: left;
}

/* 登录面板 */
.header .head_container .content .loginPanel {
  flex: 0 1 15%;
}

.header .head_container .content .loginPanel ul {
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
}

.header .head_container .content .loginPanel ul li {
  flex: 0 1 25%;
}

.header .head_container .content .loginPanel ul li:last-child {
  flex: 0 1 50%;
}

/* 购物车 */
.header .head_container .cart {
  background-color: #424242;
  text-align: center;
  flex: 0 1 10%;
  position: relative;
}

.header .head_container .cart:hover {
  background-color: #fff;
}

.header .head_container .cart:hover .shopping {
  color: #ff6700;
}

.header .head_container .cart:hover .goods {
  display: block;
  max-height: 285px;
}

.header .head_container .cart .goods {
  max-height: 0px;
  width: 350px;
  top: 40px;
  left: -227px;
  z-index: 999;
  overflow: hidden;
  position: absolute;
  transition: all 0.6s;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);
}

.header .head_container .cart .goods .empty {
  height: 95px;
  text-align: center;
  line-height: 95px;
  font-size: 12px;
}

.header .head_container .cart .goods .good_container {
  max-height: 190px;
  overflow: hidden;
}
/* 购物车中的商品 */

.header .head_container .cart .goods .good {
  height: 95px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: left;
  line-height: 93px;
  padding: 0px 20px;
  display: flex;
  flex-flow: row nowrap;
}

.header .head_container .cart .goods .good .image {
  position: relative;
  flex: 0 0 72px;
  height: 72px;
  margin-top: 11px;
  overflow: hidden;
}

.header .head_container .cart .goods .good .image img {
  position: absolute;
  width: 110%;
  left: 50%;
  top: 50%;
  margin-left: -40px;
  margin-top: -40px;
}

.header .head_container .cart .goods .good .pname {
  padding: 0px 10px;
  box-sizing: border-box;
  flex: 0 1 60%;
}

.header .head_container .cart .goods .good span + span {
  text-align: center;
  flex: 0 1 20%;
}

/* 小计 */

.header .head_container .cart .goods .subtotal {
  height: 95px;
  line-height: 36px;
  position: relative;
  background-color: #f5f5f5;
}

.header .head_container .cart .goods .subtotal .totalprice {
  font-size: 18px;
  color: #ff6700;
  text-align: left;
  margin-left: 25px;
  line-height: 12px;
}

.header .head_container .cart .goods .subtotal .totalselected {
  font-size: 12px;
  text-align: left;
  margin-bottom: 0px;
  margin-left: 25px;
  padding-top: 18px;
}

.header .head_container .cart .goods .subtotal a {
  display: inline-block;
  position: absolute;
  top: 28px;
  line-height: 40px;
  font-size: 14px;
  right: 25px;
  color: #fff;
  background-color: #ff6700;
  width: 150px;
  height: 40px;
}

.header .head_container .cart .goods .subtotal a:hover {
  background-color: #f25807;
}

/* 搜索栏和产品分类 */
.header .frame {
  width: 1226px;
  margin: 20px auto;
  display: flex;
  flex-flow: row nowrap;
}

.header .frame .logo {
  background-color: #ff6700;
  -webkit-box-flex: 0;
  -ms-flex: 0 1 55px;
  flex: 0 1 55px;
  height: 55px;
  text-align: center;
  line-height: 55px;
}

.header .productTypes {
  flex: 0 1 70%;
}

.header .productTypes div {
  width: 75%;
  margin: 0 auto;
  line-height: 55px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.header .productTypes a {
  color: #333333;
  text-decoration: none;
}

.header .searchbar {
  position: relative;
  flex: 0 1 30%;
  line-height: 55px;
  text-align: right;
}

.header .searchbar input[type="text"] {
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-right-width: 0;
  width: 225px;
  height: 50px;
  padding: 0 10px;
  outline: none;
}

.active {
  border-color: #ff6700 !important;
}

.header .searchbar input[type="text"].active {
  border-color: #ff6700 !important;
  border-right-width: 0;
}

.header .searchbar .keyword.active {
  border-top-width: 0;
}

.header .searchbar > a {
  text-decoration: none;
  color: #333333;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  display: inline-block;
  width: 55px;
  height: 50px;
  line-height: 48px;
  padding: 0 10px;
}

.header .searchbar .keyword {
  position: absolute;
  width: 226px;
  top: 52px;
  left: 73px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
}

.header .searchbar .keyword ul {
  margin-bottom: 0;
}

.header .searchbar .keyword li {
  background-color: #fff;
  text-align: left;
  line-height: 32px;
  padding: 0px 12px;
}

.header .searchbar .keyword li:hover {
  background-color: #eeeeee;
}

.header .searchbar .keyword li.isselected {
  background-color: #eeeeee;
}

.header .searchbar .keyword li a {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  text-decoration: none;
  color: #333333;
}
</style>