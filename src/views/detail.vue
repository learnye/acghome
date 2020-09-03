<template>
  <div id="detail">
    <my-header></my-header>

    <!-- 页头 -->
    <div class="detail_header" id="detail_header">
      <div class="pro_name">
        <span>{{proInfo.productName}}</span>
        <span>
          <a href="#user_comments">用户评价</a>
        </span>
      </div>
      <div class>
        <span></span>
      </div>
    </div>

    <!-- 主展示区域 -->
    <div class="container-up">
      <!-- 左侧图片显示区 -->
      <div class="container_left">
        <!-- swiper轮播图 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              v-for="(elem,index) of proInfo.image"
              :key="index"
              class="swiper-slide"
              :style="{backgroundImage:'url('+elem+')'}"
            ></div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- 右侧内容显示区 -->
      <div class="container_right">
        <div class="pro_name">
          <span>{{proInfo.productName}}</span>
        </div>
        <div class="pro_desc">
          <span>{{proInfo.description}}</span>
        </div>
        <div class="pro_price">
          <span>{{specs[0].price}}元 起</span>
        </div>
        <div class="full_img" @click="show360">
          <span>{{has360==true?"查看该商品的360度图片":"该商品暂无360度图片"}}</span>
        </div>
        <div class="address">
          <img src="../assets/detail/address.png" alt />
          <p class="address-content">
            <span>{{address[0]}}</span>
            <span>{{address[1]}}</span>
            <span>{{address[2]}}</span>
            <span>{{address[3]}}</span>
            <a href="javascript:;">修改</a>
          </p>
          <p class="total">{{proInfo.ptotal>0?"有现货":"无现货"}}</p>
        </div>
        <div class="pro_spec">
          <p>选择规格</p>
          <p class="spec">
            <span
              v-for="(elem,index) of specs"
              :key="index"
              :class="{was_checked:index==specsNow}"
              @click="selectSpec(index)"
            >{{elem.spec}}</span>
          </p>
        </div>
        <div class="pro_order">
          <span class="spec">{{proInfo.productName}} {{specs[specsNow].spec}}</span>
          <span class="price">{{specs[specsNow].price}}元</span>
          <p class="total_price">总计：{{specs[specsNow].price}}元</p>
        </div>
        <div class="cart">
          <span class="order" @click="addToCart">加入购物车</span>
          <span class="like" @click="like">
            <img v-if="liked" src="../assets/liked.png" alt />
            <img v-else src="../assets/like.png" alt />
            收藏
          </span>
        </div>
      </div>
    </div>

    <!-- 商品展示，用户评论区 -->
    <div class="container_bottom_warper">
      <div class="container_bottom">
        <div id="pro_desc">
          详情图片
          <img src="../assets/detail/handup.png" />
        </div>
        <!-- 图片展示 -->
        <div class="pro_descs">
          <div class="desc_img_big">
            <img :src="descs[descNow].Dpath" alt />
          </div>
          <div class="desc_img_wraper">
            <div
              class="desc_img"
              v-for="(item,index) of descs"
              :class="{was_checked:index==descNow}"
              :key="index"
              @click="selectDesc(index)"
            >
              <img :src="item.Dpath" alt />
            </div>
          </div>
        </div>

        <!-- 用户评论 -->
        <div id="user_comments">
          买家评价
          <img src="../assets/detail/handup.png" />
        </div>
        <div class="user_comments">
          <div class="comments_wraper">
            <!-- 单条用户评论 -->
            <div class="user_comment" v-for="(item,index) of comments" :key="index">
              <div class="user_avatar">
                <img :src="item.avatar" alt />
              </div>
              <div class="user_info">
                <div class="nickname">{{item.nickname}}</div>
                <div class="cutime">{{item.commentDate.slice(0,10)}}</div>
              </div>
              <div class="user_rate">
                <div class="user_rate_bg" :style="{width:(item.rate/5)*120+'px'}"></div>
                <div class="user_rate_star"></div>
              </div>
              <div class="comment_content">{{item.comment}}</div>
            </div>
            <div class="loadMoreComments" @click="getComments">加载更多</div>
          </div>
          <div class="pro_rate_average">
            <p>综合评分 {{averageRate.toFixed(2)}}</p>
            <div class="pro_rate">
              <div class="user_rate_bg" :style="{width:(averageRate/5)*180+'px'}"></div>
              <div class="user_rate_star"></div>
            </div>
          </div>
          <a href="javascript:void(0)" class="toTop" v-show="showToTop" @click="toTop">返回顶部</a>
        </div>

        <div id="price_explain">价格说明</div>
        <div class="explain_container">
          <strong>划线价：</strong>商品展示的画横线价格为参考价，该价格可能是品牌专柜标价，商品吊牌价或由品牌供应商提供的正品零售价（如厂商指定等）或该商品在本店或者本店的天猫旗舰店所展示的售价，由于地区、时间的差异性和市场行情波动，品牌专价等可能会与您购物时展示的不一致，该价格仅供您参考。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pid: 0,
      proInfo: { image: ["", "", "", ""] }, //商品信息
      specs: [{}, {}], //商品规格
      specsNow: 0, //正在显示的规格
      address: ["浙江省", "杭州市", "西湖区", "五联西苑"], //地址
      has360: true, //是否有360全景，这个值应先在数据库中获取
      liked: false, //是否收藏 这个值应该先从数据库获取
      comments: [{ commentDate: "" }], //评论
      commentsPage: 0, //评论总页数
      averageRate: 0, //平均评分
      commentsPageNow: 0, //当前评论页数
      descs: [{}], //描述图片列表
      descNow: 0, //当前描述图
      showToTop: false, //返回顶部按钮的显示
    };
  },
  methods: {
    //跳转至360°图片页面
    show360() {
      this.$router.push("/pic360");
    },

    // 喜欢(收藏)
    like() {
      //判断用户是否登录，若未登录，跳转至登录界面
      if (!this.$store.state.isLogin) {
        this.$router.push("/login");
      } else {
        this.liked = !this.liked;
        this.axios
          .post(
            "/setliked",
            `pid=${this.pid}&uid=${this.$store.state.uid}&liked=${this.liked}`
          )
          .then((res) => {
            if (!res.data.code) {
              //若请求失败，则恢复之前的状态
              this.liked = !this.liked;
            }
          });
      }
    },

    // 选择规格
    selectSpec(i) {
      this.specsNow = i;
    },

    // 切换展示图
    selectDesc(i) {
      this.descNow = i;
    },

    // 隐藏返回顶部按钮
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },

    //获取用户评论
    getComments() {
      this.commentsPageNow++;
      if (this.commentsPageNow < this.commentsPage) {
        this.axios
          .get("/comments", {
            params: { pid: this.pid, page: this.commentsPageNow },
          })
          .then((res) => {
            for (var elem of res.data.comments) {
              if (elem.avatar == "") {
                elem.avatar = require("../assets/avatar/useravatardefault.jpg");
              } else {
                elem.avatar = require("../assets/avatar/" + elem.avatar);
              }
              this.comments.push(elem);
            }
          });
      } else {
        alert("没有更多了");
      }
    },

    //添加到购物车
    addToCart() {
      //判断用户是否登录，若未登录，跳转至登录界面
      if (!this.$store.state.isLogin) {
        this.$router.push("/login");
      } else {
        //生成订单
        //判断是否已经存在该商品，若存在，则不执行添加操作
        var hasOrderd = false;
        this.$store.state.shoplist.forEach((elem, index) => {
          if (
            elem.pid == this.pid &&
            elem.spec == this.specs[this.specsNow].spec
          ) {
            hasOrderd = true;
          }
        });
        if (!hasOrderd) {
          //增加一条订单，需要传递的参数包括：商品id，用户id，商品规格，下单时间，商品数量
          var date = this.dataFormatter();
          this.axios
            .post(
              "/add_to_cart",
              `opid=${this.pid}&ospec=${
                this.specs[this.specsNow].spec
              }&ouid=1201329621036&odate=${date}&ocount=1`
            )
            .then((res) => {
              if (res.data.code) {
                //生成订单成功
                this.$router.push("/cart");
              } else {
                // 生成订单失败
                confirm("生成订单失败，请检查您的网络。");
              }
            });
        } else {
          this.$router.push("/cart");
        }
      }
    },

    //日期格式化
    dataFormatter() {
      var date = new Date();
      var month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      var hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
      var minute =
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      var second =
        date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
      return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
    },
  },
  mounted() {
    //获取地址栏中的pid
    var urlParams = new URLSearchParams(location.search);
    this.pid = urlParams.get("product_id");

    if (!this.pid) {
      this.$router.push("/404");
    } else {
      //因为数据的数量的原因，故只做两个页面
      if (this.pid > 2815648) {
        this.pid = 2815647;
      }
      //从后台获取数据

      //获取当前商品是否已经收藏
      this.axios
        .get("/getliked", { params: { pid: this.pid, uid: 1201329621036 } })
        .then((res) => {
          this.liked = res.data.code;
        });

      //获取评论
      this.axios
        .get("/comments", {
          params: { pid: this.pid, page: this.commentsPageNow },
        })
        .then((res) => {
          this.commentsPage = res.data.pageCount;
          this.averageRate = res.data.averageRate;
          this.comments = res.data.comments;
          for (var i in this.comments) {
            if (this.comments[i].avatar == "") {
              this.comments[
                i
              ].avatar = require("../assets/avatar/useravatardefault.jpg");
            } else {
              this.comments[i].avatar = require("../assets/avatar/" +
                this.comments[i].avatar);
            }
          }
        });

      //获取商品信息
      this.axios.get("/proinfo", { params: { pid: this.pid } }).then((res) => {
        this.proInfo = res.data.proInfo[0];
        this.proInfo.image = this.proInfo.image.split(",").map((elem) => {
          return require("../assets/products/" + elem);
        });
        this.specs = [];
        for (var key in res.data.specs) {
          res.data.specs[key].price = res.data.specs[key].price.toFixed(2);
          this.specs.push(res.data.specs[key]);
        }
      });

      //获取详情图片
      this.axios.get("/prodescs", { params: { pid: this.pid } }).then((res) => {
        this.descs = res.data.descs;
        for (var key in this.descs) {
          this.descs[key].Dpath = require("../assets/details/" +
            this.descs[key].Dpath);
        }
      });

      //挂载完成后实例化swiper对象
      var swiper = new Swiper(".swiper-container", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });

      //绑定scroll事件，监听滚轮，显示返回顶部按钮
      window.onscroll = () => {
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 900) {
          this.showToTop = true;
        } else {
          this.showToTop = false;
        }
      };
    }
  },
};
</script>

<style>
#detail {
  font-size: 14px;
}

/* 页头 */
#detail .detail_header {
  border-bottom: 1px solid#cfcfcf;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

#detail .detail_header .pro_name {
  position: relative;
  width: 1226px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}

#detail .detail_header .pro_name span {
  border-bottom: #343434;
  font-size: 18px;
}

#detail .detail_header .pro_name span + span {
  position: absolute;
  right: 0;
}

#detail .detail_header .pro_name span + span a {
  font-size: 14px;
  color: #343434;
  text-decoration: none;
}

/* 详情部分 */
#detail .container-up {
  width: 1226px;
  margin: 0 auto;
  margin-top: 40px;
}

/* 左侧图片显示栏 */
#detail .container-up .container_left {
  box-sizing: border-box;
  height: 720px;
  width: 50%;
  display: inline-block;
}

/* 引入的swiper轮播图部分 */
.swiper-container {
  width: 560px;
  height: 560px;
  margin: 38px 0px 0px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

/* 右侧详情显示区 */
#detail .container-up .container_right {
  box-sizing: border-box;
  width: 50%;
  height: 720px;
  display: inline-block;
  vertical-align: top;
}

/* 名称 */
#detail .container-up .container_right .pro_name {
  font-size: 24px;
}

/* 描述 */
#detail .container-up .container_right .pro_desc {
  padding-top: 8px;
  color: #b0b0b0;
}

/* 价格 */
#detail .container-up .container_right .pro_price {
  font-size: 18px;
  color: #ff6700;
  padding: 12px 0px 12px;
}

/* 全景按钮 */
#detail .container-up .container_right .full_img span {
  cursor: pointer;
  margin: 5px 0px;
  color: #ff6700;
  padding: 8px 10px;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #ff6700;
}

#detail .container-up .container_right .full_img span:hover {
  color: white;
  background-color: #ff6700;
}

/* 地址 */
#detail .container-up .container_right .address {
  width: 100%;
  height: 104px;
  margin: 20px 0;
  padding: 30px 50px;
  background: #fafafa;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #e0e0e0;
}

#detail .container-up .container_right .address img {
  position: absolute;
  width: 18px;
  left: 20px;
  top: 33px;
}

#detail .container-up .container_right .address p {
  margin: 6px 0px;
}
#detail .container-up .container_right .address span {
  margin-right: 14px;
}

#detail .container-up .container_right .address a {
  color: #ff6700;
  text-decoration: none;
}

#detail .container-up .container_right .address .total {
  margin-right: 14px;
  color: #ff6700;
}

/* 规格 */
#detail .container-up .container_right .pro_spec p {
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 30px;
}

#detail .container-up .container_right .pro_spec p span {
  height: 42px;
  width: 300px;
  color: #ff6700;
  line-height: 42px;
  text-align: center;
  display: inline-block;
  border: 1px solid #ff6700;
}

#detail .container-up .container_right .pro_spec p span + span {
  margin-left: 12px;
}

#detail .container-up .container_right .pro_spec p span.was_checked {
  color: #fff;
  background-color: #ff6700;
}

/* 订单 */
#detail .container-up .container_right .pro_order {
  padding: 30px;
  margin-bottom: 30px;
  background: #f9f9fa;
  box-sizing: border-box;
}

#detail .container-up .container_right .pro_order .price {
  float: right;
  margin-right: 10px;
}

#detail .container-up .container_right .pro_order .total_price {
  font-size: 24px;
  color: #ff6700;
  padding-top: 20px;
}

/* 加入购物车 */
#detail .container-up .container_right .cart span {
  height: 54px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 54px;
  text-align: center;
  display: inline-block;
}

#detail .container-up .container_right .cart .order {
  width: 300px;
  margin-right: 12px;
  background-color: #ff6700;
}

#detail .container-up .container_right .cart .order:hover {
  background-color: #f25807;
}

#detail .container-up .container_right .cart .like {
  width: 142px;
  cursor: pointer;
  background-color: #b0b0b0;
}

#detail .container-up .container_right .cart .like img {
  width: 14%;
  vertical-align: middle;
  margin: -1px 5px 0 0;
}

#detail .container-up .container_right .cart .like:hover {
  background-color: #757575;
}

/* 页面下部分 */
#detail .container_bottom_warper {
  background-color: #f5f5f5;
}

#detail .container_bottom {
  width: 1226px;
  margin: 0 auto;
  background-color: #fff;
}

#detail .container_bottom #pro_desc,
#detail .container_bottom #user_comments,
#detail .container_bottom #price_explain {
  font-size: 18px;
  margin-left: 70px;
  padding: 36px 0;
}

#detail .container_bottom #pro_desc img,
#detail .container_bottom #user_comments img {
  width: 12px;
  margin-left: 8px;
  transition: all 0.5s;
  vertical-align: middle;
}

/* 图片区 */
#detail .container_bottom .pro_descs {
  min-height: 600px;
  width: 100%;
  margin-bottom: 30px;
}

#detail .container_bottom .pro_descs .desc_img_wraper {
  width: 20%;
  margin-left: 64px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
}

#detail .container_bottom .pro_descs .desc_img_wraper .desc_img {
  opacity: 75%;
  flex: 0 1 116px;
  margin-top: 12px;
  height: 120px;
  overflow: hidden;
  position: relative;
}

#detail .container_bottom .pro_descs .desc_img_wraper .desc_img.was_checked {
  opacity: 100%;
}

#detail .container_bottom .pro_descs .desc_img_wraper .desc_img:hover {
  opacity: 100%;
}

#detail .container_bottom .pro_descs .desc_img_wraper .desc_img img {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  margin: -60px 0 0 -58px;
}

#detail .container_bottom .pro_descs .desc_img_big {
  position: relative;
  width: 600px;
  height: 600px;
  overflow: hidden;
  float: right;
  right: 14%;
}

#detail .container_bottom .pro_descs .desc_img_big img {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -300px;
}

/* 评论区 */
/* #detail .container_bottom .user_comments {
  text-align: right;
} */

#detail .container_bottom .user_comments .comments_wraper {
  display: inline-block;
  margin-left: 70px;
  width: 600px;
}

#detail .container_bottom .user_comments .user_comment:first-child {
  margin-top: 30px;
}

#detail .container_bottom .user_comments .user_comment {
  border-left: 2px solid #ff6700;
  position: relative;
  margin-top: 45px;
  padding: 10px;
}

#detail .container_bottom .user_comments .user_avatar {
  margin-left: 10px;
  display: inline-block;
  width: 47px;
  height: 47px;
  overflow: hidden;
}

#detail .container_bottom .user_comments .user_avatar img {
  width: 100%;
}

#detail .container_bottom .user_comments .user_info {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
}

#detail .container_bottom .user_comments .user_info .nickname {
  border: 1px solid #f5f5f5;
  font-size: 16px;
}

#detail .container_bottom .user_comments .user_info .cutime {
  margin-top: 10px;
  font-size: 14px;
}

/* 用户评级 */
#detail .container_bottom .user_comments .user_rate {
  position: absolute;
  right: 10px;
  width: 120px;
  height: 24px;
  vertical-align: top;
  display: inline-block;
}

#detail .container_bottom .user_comments .user_rate .user_rate_bg {
  height: 100%;
  background-color: orange;
}

#detail .container_bottom .user_comments .user_rate .user_rate_star {
  margin-top: -24px;
  height: 100%;
  background: url(../assets/detail/star.png) repeat;
  background-size: contain;
}

#detail .container_bottom .user_comments .comment_content {
  line-height: 24px;
  font-size: 16px;
  margin: 10px 0 0 64px;
  text-align: justify;
  width: 520px;
}

#detail .container_bottom .comments_wraper .loadMoreComments {
  width: 200px;
  height: 36px;
  margin: 40px auto;
  line-height: 36px;
  color: #ff6700;
  text-align: center;
  cursor: pointer;
  border: 1px solid #f25807;
}

#detail .container_bottom .toTop {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: fixed;
  background: url(../assets/detail/totop.png) no-repeat;
  background-position: 50% 25%;
  font-size: 12px;
  text-align: center;
  line-height: 95px;
  color: #757575;
  text-decoration: none;
  background-color: #fff;
  bottom: 80px;
  right: 5%;
}

#detail .container_bottom .toTop:hover {
  background: url(../assets/detail/totop_hover.png) no-repeat;
  background-color: #fff;
  background-position: 50% 25%;
  color: #ff6700;
}

/* 平均评分 */
#detail .container_bottom .pro_rate_average {
  display: inline-block;
  margin: 40px 0 0 145px;
  width: 360px;
  height: 160px;
  border: 1px solid #f25807;
  vertical-align: top;
}

#detail .container_bottom .pro_rate_average p {
  margin: 36px 0 21px;
  text-align: center;
  font-size: 24px;
  color: #ff6700;
  letter-spacing: 2px;
}

#detail .container_bottom .pro_rate_average .pro_rate {
  width: 180px;
  height: 36px;
  margin: 0 auto;
}

#detail .container_bottom .pro_rate_average .pro_rate .user_rate_bg {
  height: 100%;
  background-color: orange;
}

#detail .container_bottom .pro_rate_average .pro_rate .user_rate_star {
  margin-top: -36px;
  height: 100%;
  background: url(../assets/detail/star.png) repeat;
  background-size: contain;
}

/* 价格说明 */
#detail .container_bottom .explain_container {
  width: 90%;
  margin: 0 auto;
  font-size: 16px;
  line-height: 24px;
  padding: 40px 48px;
  margin-top: -16px;
  margin-bottom: 135px;
  background-color: #f7f7f7;
  /* border: 1px solid #ff6700; */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#detail .container_bottom .explain_container strong {
  font-weight: 600;
}
</style>
