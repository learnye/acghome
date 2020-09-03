<template>
  <div>
    <div class="title-item title_security_wap security_level">
      <h4 class="title-big dis-inb">安全等级</h4>
      <em class="space6"></em>
      <p class="font-normal dis-inb wap_colb2">
        <em class="light-num" style="padding:0">
          <span class="score_2">{{score}}</span>
        </em>
        分
      </p>
      <div class="slider-area dis-inb vert-m" style="width:360px">
        <div class="slider-bar-bg"></div>
        <!-- 根据用户安全得分控制长度  1分=1% -->
        <div class="slider-bar-line score_bg_2" style="width:75%"></div>
        <em class="drag-ico" style="left:75%"></em>
      </div>
      <p class="font-normal dis-inb security_level_txt">
        <span class="score_outer_2">
          存在
          <em class="light-num">{{num}}</em>
          项风险
        </span>
      </p>
    </div>
    <ul class="device-detail-area">
      <li id="changePassword" class="click-row">
        <div class="font-img-item clearfix">
          <em class="fi-ico fi-ico-lock"></em>
          <p class="title-normal dis-inb">帐号密码</p>
          <p class="font-default">用于保护帐号信息和登录安全</p>
        </div>
        <div class="ada-btn-area" id="btnUpdatePassword">
          <a class="n-btn" @click="getfix()">修改</a>
        </div>
      </li>
      <li id="changeEmail" class="click-row">
        <div class="font-img-item clearfix">
          <em class="fi-ico fi-ico-email"></em>
          <div class="item_column">
            <p class="title-normal dis-inb">安全邮箱</p>
            <span class="title-normal wap-desc user_address">{{Email}}</span>
          </div>
          <p class="font-default">安全邮箱可以用于登录帐号，重置密码或其他安全验证</p>
        </div>
        <div class="ada-btn-area" id="btnUpdateEmail">
          <a class="n-btn" @click="getmail()">修改</a>
        </div>
      </li>
      <li id="changeMobile" class="click-row">
        <div class="font-img-item clearfix">
          <em class="fi-ico fi-ico-phone"></em>
          <div class="item_column">
            <p class="title-normal dis-inb">安全手机</p>
            <span class="title-normal wap-desc user_address">
              <span class="phone-bind-address">{{Phone}}</span>
            </span>
          </div>
          <p class="font-default">安全手机可以用于登录帐号，重置密码或其他安全验证</p>
        </div>
        <div class="ada-btn-area" id="btnUpdatePhone">
          <a class="n-btn" @click="getphone()">修改</a>
        </div>
      </li>
      <li id="setMibao" class="click-row">
        <div class="font-img-item clearfix">
          <em class="fi-ico fi-ico-secret"></em>
          <p class="title-normal dis-inb">密保问题</p>
          <span class="warning-tip" v-show="questionundifind">&nbsp;</span>
          <span class="title-normal wap-desc">
            <span class="color-active" v-show="questionundifind">未设置</span>
            <p class="font-default color-active" v-show="questionundifind">密保问题用于安全验证，建议立即设置</p>
            <p class="font-default" v-show="question">密保问题可用于重置密码和其他安全验证</p>
          </span>
        </div>
        <div class="ada-btn-area" id="btnSetMibao">
          <a href class="n-btn">设置</a>
        </div>
      </li>
    </ul>
    <password-fix v-show="fix"></password-fix>
    <security-mail v-show="mail"></security-mail>
    <security-phone v-show="phone"></security-phone>
  </div>
</template>

<script>
import Password from "./security_password_fix";
import Mail from "./security_password_mail";
import Phone from "./security_password_phone";

export default {
  data() {
    return {
      questionundifind:false,
      question:true,
      score: "75",
      num: "1",
      Email: "12******0@q*.com",
      Phone: "133******69",
      fix: false,
      mail: false,
      phone: false,
    };
  },
  methods: {
    //修改密码窗口
    getfix: function () {
      this.fix = !this.fix;
    },
    //修改邮箱窗口
    getmail: function () {
      this.mail = !this.mail;
    },
    //修改手机号窗口
    getphone: function () {
      this.phone = !this.phone;
    },
  },
  components: {
    "password-fix": Password,
    "security-mail": Mail,
    "security-phone": Phone,
  },
};
</script>
<style >
*{margin: 0;
padding: 0;}

ol,
ul,
li {
  list-style: none;
}

img {
  vertical-align: middle;
}
</style>
<style scoped>
*{margin: 0;
padding: 0;}

ol,
ul,
li {
  list-style: none;
}

img {
  vertical-align: middle;
}

.title-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
  clear: both;
}

.dis-inb {
  display: inline-block;
}

.title-big {
  font-size: 20px;
  color: #333;
  line-height: 1.5;
  font-weight: bold;
}

.title-normal {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  font-weight: bold;
}

.light-num {
  font-size: 20px;
  font-weight: bold;
  color: #ff7e00;
  padding: 0 2px;
}

.score_1 {
  color: rgb(255, 0, 0);
}

.score_2 {
  color: rgb(255, 102, 0);
}

.score_3 {
  color: rgb(51, 204, 0);
}

em {
  font-style: normal;
}
em {
  font-style: normal;
  font-family: arial, "MI Lan Pro", "Hiragino Sans GB", "Microsoft YaHei",
    "微軟正黑體", "儷黑 Pro", sans-serif;
}

.font-normal {
  font-size: 14px;
  color: #9d9d9d;
}

.space6 {
  display: inline-block;
  width: 6px;
  height: 12px;
}

.slider-area {
  position: relative;
}

.slider-bar-bg {
  border: 1px solid #ddd;
  background: #e6e6e6;
  height: 2px;
  overflow: hidden;
}

.slider-bar-line {
  background: #ec6a3d;
  height: 4px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
}

.score_bg_1 {
  background-color: rgb(255, 0, 0);
}

.score_bg_2 {
  background-color: rgb(255, 102, 0);
}

.score_bg_3 {
  background-color: rgb(51, 204, 0);
}

.drag-ico {
  display: inline-block;
  zoom: 1;
  width: 16px;
  height: 16px;
  position: absolute;
  top: -6px;
  z-index: 2;
  background: url(~@/assets/portal/drag-ico.png) 0 0 no-repeat;
}

.score_outer_1 em {
  color: rgb(255, 0, 0);
}

.score_outer_2 em {
  color: rgb(255, 102, 0);
}

.score_outer_3 em {
  color: rgb(51, 204, 0);
}

.security_level_txt {
  margin-left: 20px;
}

.device-detail-area {
  position: relative;
  zoom: 1;
  overflow: hidden;
}

.device-detail-area li {
  padding: 30px 0;
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: -1px;
}

.device-detail-area .font-img-item {
  margin-left: -10px;
}

.font-img-item {
  position: relative;
  overflow: hidden;
  padding: 0 0 0 56px;
}

.font-img-item .fi-ico {
  position: absolute;
  left: 0;
  top: 0;
}

.fi-ico-lock {
  background-position: 0px 0;
}

.fi-ico {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url(~@/assets/portal/device-icos.png) 0 0 no-repeat;
}

.device-detail-area .title-normal {
  vertical-align: middle;
}

.title-normal {
  color: #555;
}

.font-default {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 680px;
  line-height: 1.5;
  color: #9d9d9d;
  font-weight: normal;
}

.device-detail-area .title-normal {
  vertical-align: middle;
}

.device-detail-area .ada-btn-area {
  position: absolute;
  top: 40px;
  right: 0px;
}

.n-btn {
  display: inline-block;
  line-height: normal !important;
  color: #555;
  border: 1px solid #e8e8e8;
  padding: 7px 40px;
  background: #fff;
  overflow: visible;
  cursor: pointer;
  margin-left: 10px;
}

.n-btn:hover {
  background: #f3f3f4;
}

.fi-ico-email {
  background-position: -40px 0;
}

.item_column {
  display: inline-block;
}

.fi-ico-phone {
  background-position: -200px 0;
}

.fi-ico-secret {
  background-position: -80px 0;
}

.color-active {
  color: rgb(255, 102, 0) !important;
}

.wap-desc .color-active:nth-child(1) {
  font-size: 12px;
}

.wap-desc .color-active:nth-child(2) {
  font-size: 14px;
}

.warning-tip {
  color: #ff6700;
  background: url(~@/assets/portal/n-warning-ico.png) no-repeat;
  width: 14px;
  height: 14px;
  overflow: hidden;
  display: inline-block;
  zoom: 1;
  line-height: 1.5;
  vertical-align: middle;
}
</style>
