<template>
  <div class="footer">
    <div class="container">
      <div class="col-1">
        <ul class="col-links">
          <li class="li">帮助中心</li>
          <li>
            <router-link to="" class="a">账户管理</router-link>
          </li>
          <li>
            <router-link to="" class="a">购物指南</router-link>
          </li>
          <li>
            <router-link to="" class="a">订单操作</router-link>
          </li>
        </ul>
      </div>
      <div class="col-1">
        <ul class="col-links">
          <li class="li">服务支持</li>
          <li>
            <router-link to="" class="a">售后政策</router-link>
          </li>
          <li>
            <router-link to="" class="a">自助服务</router-link>
          </li>
          <li>
            <router-link to="" class="a">相关下载</router-link>
          </li>
        </ul>
      </div>
      <div class="col-1">
        <ul class="col-links">
          <li class="li">线下门店</li>
          <li>
            <router-link to="" class="a">手办之家</router-link>
          </li>
          <li>
            <router-link to="" class="a">服务网点</router-link>
          </li>
          <li>
            <router-link to="" class="a">授权体验店</router-link>
          </li>
        </ul>
      </div>
      <div class="col-contact">
        <p class="phone">123-456-7890</p>
        <p class="time">
          8:00-18:00
          <br />(资费请咨询运营商)
        </p>
        <router-link to="" class="staff btn link">
          <span>人工客服</span>
        </router-link>
      </div>
    </div>
    <div class="info-text">
      <p class="sites">京ICP证123456号 京ICP备12345678号 京公网安备1234567899876号</p>
      <p class="sites-1">北京海牛信息科技有限公司 版权所有</p>
    </div>
  </div>
</template>
<style>
/* 添加 */
.footer {
  width: 100%;
}
.footer .container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  width: 1226px;
  height: 145px;
  margin: 0 auto;
  /* border: 1px solid red; */
}
.footer .col-1 {
  flex: 0 1 23%;
  text-align: center;
  margin-top: 2%;
}
.footer .col-links {
  width: 160px;
  height: 120px;
  margin-top: 20px auto;
}
.footer .li {
  margin-bottom: 20px;
  font-size: 14px;
}
.footer .col-links > li > a {
  display: inline-block;
  /* width:160px;
  height: 120px; */
  font-size: 12px;
  text-decoration: none;
  color: #757575;
  margin: 8px 0 0;
}
.footer .col-links > li > a:hover {
  color: orange;
}
.footer .col-contact {
  width: 285px;
  text-align: center;
  height: 139px;
  border-left: 1px solid #75757561;
  margin-top: 4px;
}
.footer .phone {
  margin: 21px 0 6px 0px;
  font-size: 22px;
  color: #ff6700;
}
.footer .time {
  margin: 0 0 8px 0px;
  line-height: 16px;
  font-size: 12px;
}
.footer .staff {
  display: inline-block;
  width: 120px;
  height: 30px;
  border: 1px solid #ff6700;
  margin: 0 0 5px 0px;
  /* line-height: 30px; */
}

.footer .btn {
  font-size: 12px;
  text-decoration: none;
  color: #ff6700;
  text-align: center;
}

.footer .staff > span {
  margin-left: 14%;
}

.footer .link:hover {
  background-color: #ff6700;
  background-image: url("../assets/news.png");
  background-repeat: no-repeat;
  color: #fff;
}

.footer .col-contact > a {
  display: inline-block;
  /* position: absolute; */
  /* width: 120px;
    height: 30px;
    border: 2px solid #FF6700;
    margin: -25px 40px;
    text-decoration: none; */
  background: url("../assets/new.png") no-repeat 25px;
  background-size: 12px;
  transition: all 0.2s ease;
}

.footer .info-text {
  width: 1226px;
  margin: 20px auto;
  border-top: 1px solid #000;
}

.footer .sites,
.footer .sites-1 {
  margin: 20px;
  text-align: center;
  font-size: 14px;
}
</style>
