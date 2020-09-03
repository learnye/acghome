<template>
  <div>
    <ul>
      <li class="uc-order-item uc-order-item-pay" v-for="item in show_page" :key="item.orderNo">
        <div class="order-detail">
          <div class="order-summary">
            <div class="order-status">已评价</div>
          </div>
          <table class="order-detail-table">
            <thead>
              <tr>
                <th class="col-main">
                  <p class="caption-info">
                    {{item.orderDate.slice(0,4)}}年{{item.orderDate.slice(5,7)}}月{{item.orderDate.slice(8,10)}}日{{item.orderDate.slice(11,19)}}
                    <span
                      class="sep"
                    >|</span>
                    {{userInfo.nickname}}
                    <span class="sep">|</span>
                    订单号:{{item.orderNo}}
                    <span class="sep">|</span>
                    在线支付
                  </p>
                </th>
                <th class="col-sub">
                  <p class="caption-price">
                    应付金额:
                    <span class="num">{{item.price}}</span>
                    元
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="order-items">
                  <ul class="goods-list">
                    <li>
                      <div class="figure-thumb figure">
                        <a href>
                          <img :src="item.img" />
                        </a>
                      </div>
                      <p class="name">
                        <a>{{item.productName}}</a>
                      </p>
                      <p class="price">{{item.price}}元 × {{item.orderCount}}</p>
                    </li>
                  </ul>
                </td>
                <td class="order-actions">
                  <a class="btn btn-small btn-primary">查看详情</a>
                  <a class="btn btn-small btn-line-gray">联系客服</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
    </ul>
    <div class="mi-pagenav">
      <a class="numbers first" @click="prev_page()">
        <span class="iconfont iconfront_pre"></span>
      </a>
      <a
        class="numbers"
        :class="{current:(index+1) == current_page}"
        @click="choice(index)"
        v-for="(item,index) in total_page"
        :key="item"
      >{{item}}</a>
      <a class="numbers last" @click="next_page()">
        <span class="iconfont iconfront_next"></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: "1201329621036",
      orderlist: [],
      userInfo: {},
      show_page: [],
      page_num: 2, //单页显示的个数
      total_page: 0,
      current_page: 1,
      // date:'',
    };
  },
  methods: {
    //获取订单列表  
    // getOrder() {
    //   this.axios.get(`/get_order?uid=${this.uid}`).then((res) => {
    //     console.log(res.data);
    //     let data = res.data.orderlist;
    //     data.forEach(item=>{
    //         if(item.img.split(",")[1] !==null){
    //             //属性重新赋值
    //             item.img=require('../../../assets/image/products/'+item.img.split(",")[0]);
    //         }else{
    //             item.img=require('../../../assets/image/products/'+item.img);
    //         }
    //         this.orderlist.push(item);
            
    //     });
    //     this.orderlist = res.data.orderList;
    //     this.init();
    //   });
    // },

    //获取用户信息
    // getuserId(uid) {
    //   this.axios.get(`/get_userinfo?uid=${this.uid}`).then((res) => {
    //     console.log(res.data.userInfo);
    //     this.userInfo = res.data.userInfo[0];
    //   });
    // },
    init() {
      //计算总的页数 当计算出的总页数为小数时，用Math.ceil()方法往正方向取整
      this.total_page = Math.ceil(this.orderlist.length / 2);
      //当前第一显示的数据    注意slice和splice的使用方法哦 slice不会改变原数组  splice会改变原数组
      this.show_page = this.orderlist.slice(0, this.page_num);
    },
    //上一页
    prev_page() {
      if (this.current_page == 1) {
        return;
      }
      //先--再运行
      --this.current_page;
      // 当前页数第一页时，slice(第一个参数，第二个参数)第一个参数为每页开始数据的索引，第二个参数为每页结束数据的索引
      this.show_page = this.orderlist.slice(
        this.page_num * (this.current_page - 1),
        this.page_num * this.current_page
      );
    },
    //下一页
    next_page() {
      if (this.current_page == this.total_page) {
        return;
      }
      //先++ 再运行
      ++this.current_page;
      this.show_page = this.orderlist.slice(
        this.page_num * (this.current_page - 1),
        this.page_num * this.current_page
      );
    },
    //选择页数，把索引传递进来
    choice(index) {
      // 这个时控制页码类的选中样式，通过传参方式，因为索引从0开始，所以+1，就从1开始
      this.current_page = index + 1;
      this.show_page = this.orderlist.slice(
        this.page_num * index,
        this.page_num * (index + 1)
      );
    },
    // getdate() {
    //   this.date =
    //   this.orderlist.orderDate.slice(0, 3) +
    //     "年" +
    //     this.orderlist.orderDate.slice(5, 6) +
    //     "月" +
    //     this.orderlist.orderDate.slice(8, 9) +
    //     "日" +
    //     this.orderlist.orderDate.slice(11, 18);
    //     console.log(this.date);
    // },
  },
  mounted() {
    // this.getOrder();
    // this.getuserId();
  },
};
</script>

<style scoped>
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

.order-list-box .order-list .uc-order-item {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
}

.order-list-box .order-list .uc-order-item-pay {
  border-color: #ff6700 !important;
}

.order-list-box .order-list .uc-order-item-pay .order-summary {
  background: #fffaf7;
}

.order-list-box .order-summary {
  padding: 25px 30px 1px;
}

.order-list-box .order-list .uc-order-item-pay .order-status {
  color: #ff6700;
}

.order-list-box .order-list .uc-order-item .order-status {
  font-size: 18px;
}

.order-list-box .order-detail-table {
  width: 100%;
  table-layout: fixed;
}

.order-list-box .order-list .uc-order-item-pay .order-detail-table th {
  background: #fffaf7;
  border-bottom: 1px solid #feccac;
}

.order-list-box .order-detail-table th {
  height: 28px;
  padding: 0 30px 24px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 400;
  text-align: left;
  color: #757575;
  vertical-align: bottom;
}

.order-list-box .order-detail-table th p {
  margin: 0;
}

.order-list-box .order-detail-table th.col-main {
  padding-right: 10px;
}

.order-list-box .order-detail-table th.col-sub {
  width: 240px;
  padding-left: 10px;
  text-align: right;
}

.order-list-box .order-detail-table th .sep {
  color: #e0e0e0;
}

.order-list-box .order-detail-table th .num {
  height: 18px;
  margin-right: 5px;
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
  color: #333;
}

.order-list-box .order-detail-table td {
  padding: 0 30px;
}

.order-list-box .goods-list {
  width:100%;
  margin: 0;
  padding: 10px 0;
  list-style-type: none;
}

.order-list-box .goods-list li {
  position: relative;
  height: 44px;
  margin: 10px 0;
  padding: 18px 18px 18px 100px;
  line-height: 22px;
  color: #333;
}

.order-list-box .goods-list .figure-thumb {
  position: absolute;
  left: 0;
  top: -10px;
  width: 80px;
  height: 80px;
}

.order-list-box .goods-list .figure-thumb img {
  width: 100%;
  height: auto;
  transform: scale(0.75);
}

.order-list-box .goods-list .name {
  margin: 0;
}

.order-list-box .goods-list .name a {
  color: #333;
}

.order-list-box .goods-list .name a:hover {
  color: #ff6700;
}

.order-list-box .goods-list .price {
  margin: 0;
}

.order-list-box .order-detail-table .order-actions {
  padding-top: 20px;
  text-align: right;
  vertical-align: top;
}

.order-list-box .order-detail-table .order-actions .btn {
  display: block;
  margin: 0 0 15px auto;
}

.btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}

.btn-small {
  width: 118px;
  height: 28px;
  font-size: 12px;
  line-height: 28px;
}

.order-list-box .order-list {
  margin: 0;
  padding: 10px 0;
  list-style-type: none;
}

.btn-line-gray:hover{
  background: #757575 !important;
  color: #fff !important;
}

.order-list-box .btn-line-gray {
  border-color: #b0b0b0;
  background: #fff;
  color: #757575;
}


/* 分页组件样式 */
.mi-pagenav {
  width: 100%;
  padding: 30px 0;
  height: 30px;
  text-align: center;
}

.mi-pagenav .numbers {
  display: inline-block;
  width: 48px;
  height: 24px;
  padding: 3px 0;
  margin: 0 5px;
  font-size: 18px;
  font-weight: 200;
  line-height: 24px;
  color: #b0b0b0;
}

.mi-pagenav .numbers:hover {
  background-color: #c6b8b4;
  color: #fff;
}

.mi-pagenav .iconfront_pre {
  font-size: 24px !important;
  vertical-align: bottom;
  font-style: normal;
}

.mi-pagenav .iconfront_next {
  font-size: 24px !important;
  vertical-align: bottom;
  font-style: normal;
}

.iconfront_next::before {
  content: "\e612";
}

.iconfront_pre:before {
  content: "\e731";
}

.mi-pagenav .current {
  background-color: #c6b8b4;
  color: #fff;
}

.mi-pagenav a.numbers {
  transition: all 0.2s linear;
}

/* -----------我是分割线----------- */
</style>