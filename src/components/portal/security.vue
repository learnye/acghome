<template>
  <div class="wrapper blockimportant">
    <div class="warp">
      <div class="layout bugfix dis_none">
        <div class="n-logo-area clearfix">
          <div class="fl-l">
            <img id="logo" src="~@/assets/logo.png" alt />
            <span class="logo_title">用户帐号</span>
          </div>
          <a id="logoutLink" class="fl-r logout" href="/login">退出</a>
        </div>
        <!-- 用户信息导航栏 -->
        <div class="n-account-area-box">
          <div class="n-account-area clearfix">
            <div class="na-info">
              <p class="na-name">{{userInfo.nickname}}</p>
              <p class="na-num">{{uid}}</p>
              <!-- 用户编号 -->
            </div>
            <!-- 用户头像 -->
            <div class="na-img-area fl-l">
              <div class="na-img-bg-area">
                <img
                  :src="require('../../assets/avatar/'+userInfo.avatar)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="verify-faile" v-show="verifyFaile">
        <div class="bg"></div>
        <div class="msg-box">
          <div class="text">哦豁~验证失败了！快洗把脸再试试~</div>
          <div class="button">确定</div>
        </div>
      </div>
      <div class="layout">
        <div class="n-main-nav clearfix">
          <ul class="c_b">
            <li
              v-for="item in navRouterLink"
              @click="routerLink(item.path)"
              :key="item.title"
              :class="item.path == pathNow ? 'current' : ''"
            >
              <a href>{{item.title}}</a>
              <em class="n-nav-corner"></em>
            </li>

            <!-- <li>
							<a href="" title="卡券管理">卡券管理</a>
							<em class="n-nav-corner"></em>
            </li>-->
          </ul>
        </div>
        <div class="n-frame">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      navRouterLink: [
        { title: "帐号安全", path: "/security/password" },
        { title: "个人信息", path: "/security/profile" },
        { title: "绑定授权", path: "/security/sns" },
        { title: "福利中心", path: "/security/welfare" },
      ],
      userInfo:{},
      uid: "1201329621037",
      pathNow: this.$route.path + "",
      verifyFaile: false,
    };
  },
  mounted() {
    this.getuserId();
  },
  methods: {
    //请求获取用户数据
     getuserId(params) {
       this.axios.get(`/get_userinfo?uid=${this.uid}`).then((res) => {
        console.log(res.data);
          this.userInfo = res.data.userInfo[0];
      });
    },

    routerLink(path) {
      this.pathNow = path;
      this.$router.push(path);
    },

    logout() {
      protocol.param_logout.data.userId = this.sessionInfoGetter.userId;
      protocol.param_logout.data.sessionStr = this.sessionInfoGetter.sessionStr;
      http.post(protocol.param_logout).then((res) => {
        let { code, msg, values } = response.data;
        if (code === "0") {
          this.$store.commit("setSessionInfo", "");
          this.$router.push("/");
        }
      });
    },
  },
  watch: {
    $route() {
      // 获取当前路径
      let path = this.$route.path;
      let name = this.$route.name;
      // 检索当前路径
      this.pathNow = path;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  font-size: 14px;
  font-family: Helvetica, arial, "MI Lan Pro", "Hiragino Sans GB", "PingFang SC",
    "Microsoft YaHei", "微軟正黑體", "儷黑 Pro", sans-serif;
}

a,
label,
:focus {
  outline: 0 none;
}
a,
a:hover {
  text-decoration: none;
}

ol,
ul,
li {
  list-style: none;
}

img {
  vertical-align: middle;
}

.title-big,
.title-bigger,
.title-biggest,
.title-normal,
.title_big30 {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  font-weight: bold;
}
.clearfix::before {
  content: "";
  display: none;
}

.wrapper {
  width: 100%;
  min-height: 100%;
  height: auto;
  display: -webkit-box;
  background-color: #f9f9f9;
}

.blockimportant {
  display: block !important;
}

.blockimportant .bugfix {
  padding-bottom: 0;
}

.wrap {
  padding-bottom: 80px;
}

.blockimportant .layout {
  width: 960px;
}

.bugfix {
  display: block;
  position: relative;
  z-index: 4;
  display: block !important;
  padding-bottom: 0;
}

.layout {
  margin: 0 auto;
  padding-bottom: 10px;
}

.n-logo-area {
  padding: 50px 0;
  height: 31px;
  line-height: 31px;
}

.fl-l {
  float: left;
}

.fl-l #logo {
  width: 36px;
  height: 36px;
}

a,
img,
input {
  border: 0 none;
}

span {
  margin: 0;
  padding: 0;
}

.n-logo-area img {
  vertical-align: middle;
}

.n-logo-area .logo_title {
  color: #ff6700;
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
}

.logout {
  font-size: 14px;
  color: #ababab;
}

.fl-r {
  float: right;
}

.n-account-area {
  overflow: hidden;
  position: absolute;
  right: 36px;
  top: 114px;
}

.na-info {
  width: 120px;
  text-align: right;
  padding-top: 16px;
  margin-right: 10px;
  float: left;
}

.na-name {
  color: #333;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.na-num {
  position: relative;
  z-index: 10;
  font-size: 14px;
  color: #666;
  line-height: 1.2;
}

.n-account-area .na-img-area {
  cursor: default;
}

.na-img-area {
  width: 80px;
  height: 80px;
  border: 2px solid #e3e3e3;
  border-radius: 50%;
  padding: 4px;
  background: #fff;
  position: relative;
  z-index: 4;
  cursor: pointer;
}

.na-img-bg-area {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

:root .na-img-bg-area {
  background: none;
}

.na-img-area img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

#verify-faile {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
}

#verify-faile .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  opacity: 0.7;
  background-color: #aaa;
}

#verify-faile .msg-box {
  width: 560px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -280px;
  margin-top: -100px;
  background-color: #fff;
}

.msg-box .text {
  position: absolute;
  text-align: center;
  top: 56px;
  font-size: 18px;
  color: #585858;
  width: 500px;
}

.msg-box .button {
  position: absolute;
  text-align: center;
  top: 100px;
  width: 120px;
  height: 40px;
  color: #333;
  border: 1px solid #dadada;
  left: 50%;
  margin-left: -61px;
  cursor: pointer;
  line-height: 40px;
  font-size: 16px;
  border-radius: 1px;
}

.n-main-nav {
  overflow: hidden;
  height: 44px;
  position: relative;
  z-index: 2;
  margin-bottom: -1px;
}

.n-main-nav ul {
  width: 73%;
  overflow: hidden;
}

.c_b {
  margin: 0;
  padding: 0;
  zoom: 1;
}

.c_b:before,
.c_b:after {
  content: "";
  display: block;
}

.c_b:after {
  clear: both;
}

.n-main-nav li.current a,
.n-main-nav li a:hover {
  color: #ff7e00;
}

.n-main-nav li a {
  display: block;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.n-main-nav li.current .n-nav-corner {
  display: inline-block;
}

.current .n-nav-corner {
  width: 23px;
  height: 12px;
  margin-top: 12px;
  margin-bottom: -2px;
  /* display: none; */
  background: url(~@/assets/portal/n-layout-corner.png) 0 0 no-repeat;
}

.n-nav-corner {
  width: 23px;
  height: 12px;
  margin-top: 12px;
  margin-bottom: -2px;
  display: none;
  background: url(~@/assets/portal/n-layout-corner.png) 0 0 no-repeat;
}

.n-main-nav li {
  float: left;
  text-align: center;
  width: 20%;
  overflow: hidden;
}

.n-frame {
  background: #fff;
  padding: 34px 34px 0;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  min-height: 400px;
}

.warp .layout .clearfix:after {
  display: block;
  content: " ";
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

.dis_none_pc {
  display: none;
}
</style>
