<template>
  <div class="cart">
    <!-- 头部 -->
    <div class="header_container">
      <div class="header">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/logo.png" alt />
          </router-link>
        </div>
        <div class="title">我的购物车</div>
        <div class="tips">温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</div>
        <div class="myorder">
          <router-link to="/cart">我的订单</router-link>
        </div>
      </div>
    </div>

    <div v-if="!totalCount" class="cart_empty_container">
      <div class="cart_empty">
        <img src="../assets/empty_cart.jpg" alt />
        <p>
          购物车还是空的哦~
          <router-link to="/search">买一些</router-link>
        </p>
      </div>
    </div>

    <div v-else class="cart_container">
      <div class="mycart">
        <!-- 订单列表的头部 -->
        <div class="cart_header">
          <div class="checkbox_container">
            <a
              href="javascript:void(0)"
              class="checkbox"
              @click="toggleSelAll"
              :class="{ischecked:checkAll}"
            ></a>
            <span>全选</span>
          </div>
          <div class="proname">商品名称</div>
          <div class="price">单价</div>
          <div class="count">数量</div>
          <div class="total">小计</div>
          <div class="act">操作</div>
        </div>

        <!-- 订单列表的主体 -->
        <div class="cart_body" v-for="(item,index) of shoplist" :key="index">
          <div class="checkbox_container">
            <a
              href="javascript:void(0)"
              class="checkbox"
              @click="toggleSelected(index)"
              :class="{ischecked:item.ischecked}"
            ></a>
            <div class="image">
              <router-link :to="`/detail?product_id=${item.pid}`">
                <img :src="item.image" />
              </router-link>
            </div>
          </div>
          <div class="proname">{{item.productName}} {{item.spec}}</div>
          <div class="price">{{item.price}}元</div>
          <div class="count">
            <a href="javascript:void(0)" class="minus" @click="updateCart('minus',index)">-</a>
            <span>{{item.count}}</span>
            <a href="javascript:void(0)" class="add" @click="updateCart('add',index)">+</a>
          </div>
          <div class="total">{{(item.price*item.count).toFixed(2)}}元</div>
          <div class="act">
            <a href="javascript:void(0)" @click="del(index)">×</a>
          </div>
        </div>

        <div class="cart_footer">
          <p>
            共
            <span>{{totalCount}}</span>件商品
            ,已选择
            <span>{{totalSelected}}</span>件
          </p>
          <p class="totalPrice">
            合计：
            <span>{{totalPrice.toFixed(2)}}</span>元
          </p>
          <a class="pay" href="javascript:void(0)" @click="jump">去结算</a>
        </div>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAll: 0,
      shoplist: [{ price: 0, count: 1, ischecked: false }],
    };
  },

  methods: {
    //更新购物车
    updateCart(operation, i) {
      var ono = this.shoplist[i].orderNo;
      if (operation == "add") {
        this.shoplist[i].count++;
      } else {
        this.shoplist[i].count == 1 || this.shoplist[i].count--;
      }
      var ocount = this.shoplist[i].count;
      //节流操作
      setTimeout(() => {
        if (ocount == this.shoplist[i].count) {
          this.axios
            .get("/update_cart", { params: { ono, ocount } })
            .then((res) => {
              //修改成功
              if (res.data.code) {
                //更新vuex的数据
                this.updateShoplist();
              } else {
                //修改失败，回档
                this.shoplist[i].count = res.data.count;
              }
            });
        }
      }, 500);
    },

    //删除该项
    del(i) {
      var ono = this.shoplist[i].orderNo;
      this.axios.get("/del_cart", { params: { ono } }).then((res) => {
        if (res.data.code) {
          this.shoplist.splice(i, 1);
          this.updateShoplist();
        } else {
          console.log("修改成功");
        }
      });
    },

    //切换全选框的状态
    toggleSelAll() {
      this.checkAll = !this.checkAll;
      var mycheck = this.checkAll;
      this.shoplist.forEach((item, index) => {
        //将状态同步到数据库
        this.axios
          .get("/update_cart", {
            params: { ono: item.orderNo, oischecked: this.checkAll * 1 },
          })
          .then((res) => {
            //修改成功
            if (res.data.code) {
              //更新视图
              this.shoplist[index].ischecked = mycheck;
              //更新vuex的数据
              this.updateShoplist();
            } else {
              console.log("修改失败");
            }
          });
      });
    },

    // 切换当前复选框的选中状态
    toggleSelected(i) {
      this.shoplist[i].ischecked = !this.shoplist[i].ischecked;
      //同步状态至数据库
      var oischecked = this.shoplist[i].ischecked * 1;
      var ono = this.shoplist[i].orderNo;
      this.axios
        .get("/update_cart", { params: { ono, oischecked } })
        .then((res) => {
          //修改成功
          if (res.data.code) {
            //更新vuex的数据
            this.updateShoplist();
          } else {
            //修改失败，回档
            this.shoplist[i].ischecked = !this.shoplist[i].ischecked;
          }
        });
    },

    //更新vuex中的数据
    updateShoplist() {
      this.$store.commit("updateShoplist", {
        shoplist: this.shoplist,
        totalPrice: this.totalPrice,
        totalSelected: this.totalSelected,
      });
    },

    //结算
    jump() {
      this.$router.push("/home");
    },
  },

  computed: {
    // 总价
    totalPrice() {
      var totalPrice = 0;
      for (var elem of this.shoplist) {
        totalPrice += elem.count * elem.ischecked * elem.price;
      }
      return totalPrice;
    },

    // 总数量
    totalCount() {
      var totalCount = 0;
      for (var elem of this.shoplist) {
        totalCount += elem.count;
      }
      return totalCount;
    },

    // 总选择数
    totalSelected() {
      var totalSelected = 0;
      for (var elem of this.shoplist) {
        totalSelected += elem.ischecked * elem.count;
      }
      return totalSelected;
    },
  },

  watch: {
    //控制全选按钮根据子复选框改变状态
    totalSelected() {
      //如果所有的元素被选中，全选被选中，反之不被选中
      this.checkAll = this.totalCount == this.totalSelected;
    },
  },

  mounted() {
    if (!this.$store.state.isLogin) {
      this.$router.push("/login");
    } else {
      var uid = this.$store.state.uid;
      this.axios.get("/cart", { params: { uid } }).then((res) => {
        this.shoplist = [];
        res.data.shoplist.forEach((elem, index) => {
          elem.image = require("../assets/products/" +
            elem.image.split(",")[0]);
          this.shoplist.push(elem);
        });
        //将数据存入vuex中
        this.updateShoplist();
      });
    }
  },
};
</script>

<style>
/* 页面头部 */

.cart .header_container {
  height: 100px;
  border-bottom: 2px solid #ff6700;
}

.cart .header {
  width: 1226px;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  line-height: 100px;
}

.cart .header .logo {
  flex: 0 0 48px;
  height: 55px;
}

.cart .header .logo img {
  width: 100%;
}

.cart .header .title {
  padding-right: 10px;
  text-align: center;
  flex: 0 1 20%;
  font-size: 28px;
  color: #424242;
}

.cart .header .tips {
  flex: 0 1 66%;
  color: #757575;
  font-size: 12px;
  padding-top: 5px;
}

.cart .header .myorder {
  text-align: right;
  flex: 0 1 10%;
}

.cart .header .myorder a {
  font-size: 12px;
  color: #757575;
  text-decoration: none;
}

/* 没有商品的样式 */
.cart .cart_empty_container {
  border: 1px solid transparent;
  width: 100%;
  background-color: #f5f5f5;
}

.cart .cart_empty {
  text-align: center;
  line-height: 320px;
  width: 1226px;
  height: 400px;
  margin: 70px auto;
  background-color: #fff;
}

.cart .cart_empty img {
  width: 280px;
}

.cart .cart_empty p {
  color: #757575;
  line-height: 32px;
  font-size: 18px;
  font-weight: 600;
}

.cart .cart_empty p a {
  color: #ff6700;
  text-decoration: none;
}

.cart .cart_empty p a:hover {
  color: #f25807;
}

/* 页面主体 */
.cart .cart_container {
  background-color: #f5f5f5;
}

.cart .mycart {
  border: 1px solid transparent;
  width: 1226px;
  margin: 0 auto;
}

.cart .mycart .cart_header,
.cart .mycart .cart_body,
.cart .mycart .cart_footer {
  display: flex;
  flex-flow: row nowrap;
  background-color: #fff;
}

/* 复选框 */
.cart .mycart .checkbox {
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  position: relative;
  border: 1px solid #cfcfcf;
}

.cart .mycart .checkbox.ischecked {
  background-color: #ff6700;
}

/* 画一个勾勾 */
.cart .mycart .checkbox.ischecked:after {
  content: "";
  width: 40%;
  height: 60%;
  border: 2px solid white;
  position: absolute;
  left: 36%;
  top: 14%;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
}

/* 每个列的占宽 */
.cart .mycart .checkbox_container {
  text-align: center;
  flex: 0 0 200px;
}

.cart .mycart .checkbox_container div {
  display: inline-block;
}

.cart .mycart .proname {
  text-align: center;
  flex: 0 1 36%;
}

.cart .mycart .price {
  text-align: center;
  flex: 0 1 16%;
}

.cart .mycart .count {
  text-align: center;
  flex: 0 1 16%;
}

.cart .mycart .total {
  text-align: center;
  flex: 0 1 16%;
}

.cart .mycart .act {
  text-align: center;
  flex: 0 1 16%;
}

/* 订单列表头 */
.cart .mycart .cart_header {
  margin-top: 40px;
  line-height: 70px;
  font-size: 14px;
  height: 70px;
}

.cart .mycart .cart_header .checkbox {
  margin-left: -45px;
}

.cart .mycart .cart_header span {
  margin-left: 40px;
}

/* 订单列表主体· */
.cart .mycart .cart_body {
  line-height: 126px;
  font-size: 16px;
  margin-top: 1px;
  height: 126px;
}

.cart .mycart .cart_body .image {
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  margin-left: 36px;
  width: 80px;
  height: 80px;
}

.cart .mycart .cart_body .image img {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -40px;
  margin-top: -40px;
  width: 100%;
}

.cart .mycart .count a,
.cart .mycart .count span {
  color: #424242;
  text-decoration: none;
  line-height: 40px;
  display: inline-block;
  height: 40px;
  width: 40px;
  border: 1px solid #f7f7f7;
}

.cart .mycart .count .minus,
.cart .mycart .count .add {
  cursor: pointer;
}

.cart .mycart .count .minus:hover,
.cart .mycart .count .add:hover {
  background-color: #eeeeee;
}

.cart .mycart .act a {
  text-decoration: none;
  color: #424242;
  line-height: 24px;
  display: inline-block;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.cart .mycart .act a:hover {
  background-color: #dc143c;
  color: #fff;
}

.cart .mycart .cart_body .total {
  color: #ff6700;
}

/* 订单列表尾部 */
.cart .mycart .cart_footer {
  line-height: 50px;
  color: #757575;
  height: 50px;
  font-size: 14px;
  margin: 28px 0 64px 0;
}

.cart .mycart .cart_footer p:first-child {
  margin-left: 40px;
  flex: 0 1 60%;
}

.cart .mycart .cart_footer p:first-child span {
  color: #ff6700;
}

.cart .mycart .cart_footer .totalPrice {
  color: #ff6700;
  text-align: center;
  flex: 0 1 20%;
}

.cart .mycart .cart_footer .totalPrice span {
  font-size: 30px;
}

.cart .mycart .cart_footer .pay {
  height: 50px;
  flex: 0 1 20%;
  width: 200px;
  color: #fff;
  background-color: #ff6700;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
}

.cart .mycart .cart_footer .pay:hover {
  background-color: #f25807;
}
</style>
