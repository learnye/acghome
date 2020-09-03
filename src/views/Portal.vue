<template>
  <div>
     <my-header></my-header>
    <div class="portal">
      <div class="breadcrumbs">
        <div class="container">
          <router-link to="/">首页</router-link>
          <span class="sep">/</span>
          <span>{{ msg }}</span>
        </div>
      </div>
      <div class="page-main user-protal">
        <div class="container">
          <div class="row1">
            <!-- 左侧导航栏 -->
            <div class="span4">
              <div class="user-address-menu">
                <div class="menu-box">
                  <h3 class="title">订单中心</h3>
                  <ul class="list">
                    <li
                      v-for="item in navOrders"
                      @click="routerLink(item.path)"
                      :key="item.title"
                      :class="item.path == pathNow ? 'active' : ''"
                    >
                      <a>{{ item.title }}</a>
                    </li>
                  </ul>
                </div>
                <div class="menu-box">
                  <h3 class="title">个人中心</h3>
                  <ul class="list">
                    <li
                      v-for="item in navUser"
                      @click="routerLink(item.path)"
                      :key="item.title"
                      :class="item.path == pathNow ? 'active' : ''"
                    >
                      <a>{{ item.title }}</a>
                    </li>
                    <!-- <li><a href="/message">消息通知</a></li>
                                  <li><a href="/favo-goods">喜欢的商品</a></li>
                    <li><a href="/adress">收货地址</a></li>-->
                  </ul>
                </div>
                <div class="menu-box">
                  <h3 class="title">售后服务</h3>
                  <ul class="list">
                    <li
                      v-for="item in navService"
                      @click="routerLink(item.path)"
                      :key="item.title"
                      :class="item.path == pathNow ? 'active' : ''"
                    >
                      <a>{{ item.title }}</a>
                    </li>
                  </ul>
                </div>
                <div class="menu-box">
                  <h3 class="title">账户管理</h3>
                  <ul class="list">
                    <li
                      v-for="item in navSecurity"
                      @click="routerLink(item.path)"
                      :key="item.title"
                      :class="item.path == pathNow ? 'active' : ''"
                    >
                      <a>{{ item.title }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 右侧主界面 -->
            <div class="span16">
              <div class="uc-box uc-main-box">
              <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
export default {
  name: "Portal",
  data() {
    return {
      msg: "个人中心",
      navOrders: [
        { title: "我的订单", path: "/orderlist" },
        { title: "评价晒单", path: "/comment" },
      ],
      navUser: [
        { title: "我的个人中心", path: "/user" },
        { title: "消息通知", path: "/message" },
        { title: "喜欢的商品", path: "/favogoods" },
        { title: "收货地址", path: "/address" },
      ],
      navService: [
        { title: "服务记录", path: "/service" },
        { title: "申请服务", path: "/amcas" },
      ],
      navSecurity: [
        { title: "个人信息", path: "/security/password" },
        { title: "修改密码", path: "/security/password" },
      ],
      pathNow: this.$route.path + "",
    };
  },
  methods: {
    routerLink(path) {
      this.pathNow = path;
      this.$router.push(path);
    },
    // checkRouterLocal(path) {
    //   // 查找当前路由下标高亮
    //   this.navIndex = this.nav.findIndex((item) => item.path === path);
    // },
    //保存链接的激活状态
    // saveNavState(activePath) {
    //     window.sessionStorage.setItem('activePath',activePath)
    // }
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
  components: {},
};
</script>

<style>
/* body {
  font: 14px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
} */
a {
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  color: #2C3E50;
}

a:any-link {
  cursor: pointer;
}

a,
a:hover {
  text-decoration: none;
}
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

body {
  font: 14px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
}
a {
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  color: #2C3E50;
}

a:any-link {
  cursor: pointer;
}

a,
a:hover {
  text-decoration: none;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}

.breadcrumbs {
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  background: #f5f5f5;
}

.container {
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
}

.container:before {
  content: " ";
  display: table;
}

.container a:hover {
  color: #ff6700;
}
.breadcrumbs .sep {
  margin: 0 0.5em;
  color: #b0b0b0;
  font-family: sans-serif;
}

.page-main {
  padding-bottom: 40px;
  background: #f5f5f5;
}

.row1 {
  margin-left: -14px;
}

.row1:after,
.row1:before {
  content: " ";
  display: table;
}

.row1:after {
  clear: both;
}
.span4 {
  width: 192px;
  float: left;
  margin-left: 14px;
  min-height: 1px;
}

.span16 {
  width: 904px;
  float: left;
  margin-left: 14px;
  min-height: 1px;
}

/* .span16 {
    width: 978px;
} */

.user-address-menu {
  background: #fff;
  padding: 36px 0;
}

.container {
    max-width: 1140px;
}

.user-address-menu .menu-box {
  margin: 0 48px 12px;
}

.user-address-menu h3 {
  font-size: 16px;
  font-weight: 400;
  line-height: 52px;
  color: #333;
  margin: 0;
  padding: 0;
}

.user-address-menu ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.user-address-menu li {
  padding: 6px 0;
  display: list-item;
  text-align: match-parent;
}

.user-address-menu li a {
  color: #757575;
}

.user-address-menu li a:hover {
  color: #333;
}

.user-address-menu .active a,
.user-address-menu .active a:hover {
  color: #ff6700;
}

/* .uc-box {
  background: #fff;
}

.uc-main-box {
  padding: 36px 48px;
} */
</style>
