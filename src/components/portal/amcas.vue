<template>
<div>
  <div class="service-box service-main-box">
    <div class="service-content-box">
      <div class="box-hd">
        <h1 class="title">选择申请方式</h1>
      </div>
      <div class="box-bd">
        <ul class="service-choose-list clearfix">
            <li>
                <i class="icon-plane icon"></i>
                <h3>快速申请</h3>
                <p>
                    本网站 / 商城App购买的订单
                    <br>
                    支持通过订单快速申请
                </p>
                <a href="/orderlist" class="btn btn-line-green">
                前往订单
                </a>
            </li>
            <li>
                <i class="icon-write icon"></i>
                <h3>填写申请单</h3>
                <p>
                    其他渠道购买的产品
                    <br>
                    根据产品唯一识别码和购买凭证申请售后
                </p>
                <a href="/orderlist" class="btn btn-line-green">
                申请售后
                </a>
            </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="service-box service-main-box" style="margin-top:14px">
      <div class="service-content-box">
          <div class="box-bd">
              查看新手指导说明 ？点击
              <a href="#" style="color: #ff6700;">申请售后说明</a>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name:"amcas",
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

body {
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  color: #333;
  background-color: #fff;
  min-width: 1226px;
}

.service-main-box {
  padding: 36px 0;
}

.service-box {
  background: #fff;
}

.service-content-box {
  margin: 0 48px;
}

.service-content-box .box-hd .title {
  margin: 0;
  font-size: 36px;
  font-weight: 400;
  line-height: 68px;
  color: #b0b0b0;
}

.service-choose-list {
    margin: 40px 0;
    padding: 0;
    list-style-type: none;
}

.service-choose-list li {
    float: left;
    width: 50%;
    text-align: center;
}

.service-choose-list .icon {
    font-family: iconfont !important;
    margin: 0 auto 20px;
    font-size: 72px;
    color: #83c44e;
}

.icon-plane:before{
    content: "\e609";
}

.icon-write:before{
    content: "\e60d";
}


.service-choose-list h3 {
    margin: 0 0 5px;
    font-size: 22px;
    font-weight: 400;
    color: #333;
}

.service-choose-list p {
    margin: 0 0 15px;
    color: #757575;
}
.btn {
    display: inline-block;
    width: 158px;
    height: 38px;
    padding: 0;
    margin: 0;
    border: 1px solid #b0b0b0;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    color: #b0b0b0;
    cursor: pointer;
    transition: all .4s;
}

.btn-line-green {
    border-color: #83c44e;
    background: #fff;
    color: #83c44e;
}

.btn-line-green:hover{
    background: #83c44e;
    color: #fff !important;
}

</style>