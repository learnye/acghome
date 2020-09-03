<template>
  <div class="uc-box uc-order-box">
    <div class="content-box order-list-box">
      <div class="box-hd">
        <h1 class="title">
          我的订单
          <small>
            请谨防钓鱼链接或诈骗电话，
            <a href="#">了解更多></a>
          </small>
        </h1>
        <div class="more clearfix">
          <ul class="filter-list">
            <li class="first active">
              <a href="#">全部有效订单</a>
            </li>
            <li class>
              <a href="#">待支付</a>
            </li>
            <li class>
              <a href="#">待收货</a>
            </li>
            <li class>
              <a href="#">订单回收站</a>
            </li>
          </ul>
          <div class="search-form clearfix">
            <label for="search" class="hide">站内搜索</label>
            <input
              type="search"
              name="keywords"
              autocomplete="off"
              placeholder="输入商品名称、订单号"
              class="search-text"
            />
            <input type="button" class="search-btn iconfont" v-model="searchMsg" value />
          </div>
        </div>
      </div>
      <div class="box-bd">
        <div>
          <ul class="order-list">
            <order-list v-show="list"></order-list>
            <p class="empty">当前没有订单</p>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Orderlist from "./order_components/orderlist-table";

export default {
  name: "orderlist",
  data() {
    return {
      searchMsg: "\ue60f",
      list: true,
    };
  },
  components: {
    "order-list": Orderlist,
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

.uc-box {
  background: #fff;
}

.uc-order-box {
  padding: 36px 0 !important;
}

.content-box {
  margin: 0 48px;
}

.box-hd .title {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.box-hd small {
  margin-left: 10px;
  font-size: 12px;
  line-height: 1.5;
}

.box-hd small a {
  color: #757575;
}

.box-hd .more {
  border-bottom: 0 !important;
}

.filter-list {
  float: left;
  margin: 0;
  padding: 18px 0;
  list-style-type: none;
  font-size: 16px;
  line-height: 1.25;
}

.box-hd .filter-list li.first {
  padding-left: 0;
  border-left: 0;
  float: left;
  padding: 0 20px;
}

.box-hd .filter-list li.active {
  color: #ff6700;
}

.box-hd .search-form {
  float: right;
  position: relative;
  width: 262px;
  height: 40px;
  margin-top: 8px;
}

.hide {
  display: none !important;
}

.box-hd .search-text {
  position: absolute;
  top: 0;
  border: 1px solid #e0e0e0;
  outline: 0;
  transition: all 0.2s;
  right: 41px;
  z-index: 1;
  width: 189px;
  height: 40px;
  padding: 0 15px;
  font-size: 12px;
  line-height: 40px;
  color: #757575;
  box-sizing: content-box;
  font: inherit;
  margin: 0;
}

.box-hd .search-btn {
  position: absolute;
  top: 0;
  border: 1px solid #e0e0e0;
  outline: 0;
  right: 0;
  z-index: 2;
  width: 42px;
  height: 42px;
  font-size: 16px;
  line-height: 24px;
  background: #fff;
  color: #616161;
  transition: all 0.2s;
  cursor: pointer;
}

.order-list-box .order-list {
  margin: 0;
  padding: 10px 0;
  list-style-type: none;
}

.order-list-box .empty {
  margin: 40px 0;
  font-size: 18px;
  text-align: center;
  color: #b0b0b0;
  display: none;
}

/* .order-list-box .order-list .uc-order-item {
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
  top: 0;
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

.order-list-box .btn-line-gray {
  border-color: #b0b0b0;
  background: #fff;
  color: #757575;
} */

.clearfix:after {
  clear: both;
}

.clearfix:after,
.clearfix:before {
  content: " ";
  display: table;
}
</style>