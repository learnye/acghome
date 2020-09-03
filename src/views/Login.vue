<!-- 所有 "-" 类名为Boot类名,  "_" 类名为my_css自定义类名 -->
<template>
  <div>
    <div class="login w-100 mg_auto">
      <div class="top mg_auto">
        <router-link to="/" class="td_a d-flex h-100">
          <img src="../assets/logo.png" />
          <div class="mt-4 ml-3">
            <h3 class="mb-0">伊红美蓝</h3>
            <span class="font_s_muted">一个二次元周边的贩售站</span>
          </div>
        </router-link>
      </div>
      <!-- 大banner -->
      <div class="banner position-relative">
        <!-- img -->
        <!-- <router-link to="" class="d-block mg_auto banner_img">
            <img src="../../assets/login_img/1920x588.png" alt="" class="banner_img mg_auto d-blockh-100 position-absolute">
        </router-link>-->
        <!-- form表单 -->
        <div class="formDiv mr-auto">
          <div class="form px-4 pt-4">
            <!-- 内容区域 -->
            <div class="form_content w-100 h-100">
              <!-- 账号登录nav -->
              <div class="nav d-flex justify-content-between px-5 py-3">
                <span class="d-inline-block" @click="nav1" :class="{color_6700:color1}">账号登录</span>
                <div></div>
                <span class="d-inline-block" @click="nav2" :class="{color_6700:color2}">扫码登录</span>
              </div>
              <div v-if="isAccount">
                <!-- input框  登录页面 -->
                <div class="text_center login" v-if="isShow">
                  <input
                    type="text"
                    v-model="uname"
                    @focus="foucu"
                    :class="{border:border}"
                    placeholder="邮箱/手机号码"
                    class="w-100 px-3 mb-4 d-inline-block"
                  />
                  <input
                    type="password"
                    v-model="pwd"
                    @focus="foucu"
                    @keyup.13="login"
                    placeholder="密码"
                    class="w-100 px-3"
                  />
                  <!-- 未输入账号提示框 -->
                  <span class="hintMsg pl-3 mt-2" v-show="hintBox">{{hintMsg}}</span>
                  <div class="pt-2">
                    <button class="w-100 my-1 my_cursor" @click="login">登录</button>
                  </div>
                  <span
                    class="d-block mg_auto mt-3 color_6700 font_m td_6700 my_cursor"
                    @click="change"
                  >手机短信登录/注册</span>
                  <div class="font_m text-muted mt-4">
                    <router-link to class="td_a">
                      <span>立即注册</span>
                    </router-link>
                    <span class="px-2">|</span>
                    <router-link to class="td_a">
                      <span>忘记密码?</span>
                    </router-link>
                  </div>
                </div>
                <!-- input框 注册页面 -->
                <div class="text_center regist" v-else>
                  <div class="w-100">
                    <div class="d-inline-block _86">+86</div>
                    <input
                      type="text"
                      ref="regPhone"
                      @focus="foucu()"
                      placeholder="手机号码"
                      class="w-80 px-3 mb-4"
                    />
                  </div>
                  <input
                    type="password"
                    ref="regPwd"
                    v-model="pwd"
                    @focus="foucu()"
                    @keyup.13="regist"
                    placeholder="密码"
                    class="w-100 px-3"
                  />
                  <!-- 注册账号/密码错误提示框 -->
                  <span class="hintMsg pl-3 mt-2" v-show="regHintBox">{{registHintMsg}}</span>
                  <div class="pt-2">
                    <button class="w-100 my-1 my_cursor" @click="regist">立即注册</button>
                  </div>
                  <span
                    class="d-block mg_auto mt-3 color_6700 font_m td_6700 my_cursor w-40"
                    @click="change"
                  >用户名密码登录</span>
                  <div class="font_m text-muted mt-4">
                    <router-link to class="td_a">
                      <span>收不到验证码?</span>
                    </router-link>
                  </div>
                </div>
              </div>

              <div v-else class="QrCode">
                <div class="QrCodeDiv">
                  <img :src="QrCodeArr[`${Math.floor(Math.random()*8)}`].src" alt />
                </div>
                <div class="QrCode_msgDiv" v-show="ismsgDiv">
                  <p class="text-white text-center mt-5 font-weight-bold">二维码已失效</p>
                  <div class="refresh_QrCode" @click="nav3()">刷新一下</div>
                </div>
                <p class="color_75 text-center mt-4">
                  使用
                  <i class="color_6700">小米商城APP</i>扫一扫
                </p>
                <p class="font_s w-100 text-center">小米手机可打开「设置」>「小米帐号」扫码登录</p>
              </div>
            </div>
          </div>
          <router-link
            to="/managers"
            class="text-center d-block mt-4 td_6700"
            v-if="isAccount"
          >管理员登录</router-link>
        </div>
      </div>

      <my-footer></my-footer>

      <Verify :isVerify="isVerify" :MarginL="MarginL" @closepop="closepop"></Verify>
    </div>
  </div>
</template>
<script>
// import eventBus from '@/eventBus.js'
import Verify from "../components/Verify";
export default {
  components: {
    Verify,
  },
  data() {
    return {
      uname: "", //用于接收输入的用户名
      // upwd:'',     //用于接收输入的密码
      phone: "",
      email: "",
      hintBox: false, //账号不能为空提示div
      hintMsg: "", //提示信息默认为空
      isShow: true, //判断是登录显示 还是注册显示
      regHintBox: false,
      registHintMsg: "",
      pwd: "",
      border: false,
      isVerify: false, //开局是false隐藏的传给子组件
      MarginL: 0,
      isSend: false,
      a: "",
      isAccount: true, //账号登录 还是 二维码登录
      color1: true, //开局账号登录的字体黄色
      color2: false,
      ismsgDiv: false, //二维码超时显示的div
      QrCodeArr: [
        { src: require(`../assets/login_img/QrCode/1.png`) },
        { src: require(`../assets/login_img/QrCode/2.png`) },
        { src: require(`../assets/login_img/QrCode/3.png`) },
        { src: require(`../assets/login_img/QrCode/4.png`) },
        { src: require(`../assets/login_img/QrCode/5.png`) },
        { src: require(`../assets/login_img/QrCode/6.png`) },
        { src: require(`../assets/login_img/QrCode/7.png`) },
        { src: require(`../assets/login_img/QrCode/8.png`) },
      ],
      QrCodeArrI: "",
      timer: "",
    };
  },
  methods: {
    //点击账号登录 input框显示
    nav1() {
      this.isAccount = true;
      this.color1 = true;
      this.color2 = false;
      this.QrCodeArrI = "";
      clearTimeout(this.timer);
    },
    nav2() {
      this.ismsgDiv = false;
      this.isAccount = false;
      this.color2 = true;
      this.color1 = false;
      this.timer = window.setTimeout(() => {
        this.ismsgDiv = true;
      }, 5000);
    },
    nav3() {
      this.nav1();
      this.nav2();
      this.ismsgDiv = false;
    },

    // 定义自定义函数,来执行子组件的内容
    closepop() {
      this.isVerify = false;
    },

    // 判断账号密码函数
    login() {
      this.MarginL = Math.ceil(Math.random() * 150) + 150 + "px";
      // console.log(this.MarginL)
      let myname = this.uname;
      // console.log(myname)
      // let upwd=this.$refs.upwd.value;
      // let phone=0;
      // let email=0;
      let unameReg = /^1[3-9]\d{9}$/;
      let unameEmailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      let upwdReg = /^\w{6,}/;
      // console.log(unameReg.test(uname))
      if (myname == "") {
        // console.log('000')
        this.hintMsg = "请输入账号";
        this.hintBox = true;
        return false;
      }
      if (this.pwd == "") {
        // console.log('111')
        this.hintMsg = "请输入密码";
        this.hintBox = true;
        return false;
      }
      if (!(unameReg.test(myname) || unameEmailReg.test(myname))) {
        this.hintBox = true;
        // console.log('格式不正确')
        this.hintMsg = "手机或邮箱格式不正确";
        return false;
      }
      if (unameReg.test(myname)) {
        this.phone = myname;
        this.email = "";
        // console.log(phone,`可以发送:phone=${phone},upwd=${upwd},email=${email}`)
      }
      if (unameEmailReg.test(myname)) {
        this.email = myname;
        this.phone = "";
        // console.log(email,`可以发送:phone=${phone},upwd=${upwd},email=${email}`)
      }
      this.isVerify = true;
      // console.log(this.a)
    },

    //获取焦点清除Msg
    foucu() {
      // console.log('获取焦点')
      //提示框隐藏掉
      this.hintBox = false;
      this.regHintBox = false;
      //获取焦点清除橘色边框
      // this.bord=false
    },

    // 登录,注册 切换函数
    change() {
      if (this.isShow) {
        this.isShow = false;
        this._86enter = false;
      } else {
        this.isShow = true;
        this._86enter = true;
      }
      //不把密码置空,会出现login与regist的密码混合显示
      this.pwd = "";
    },

    //注册 axios函数
    regist() {
      let myname = this.$refs.regPhone.value;
      let upwd = this.$refs.regPwd.value;
      let phone = 0;
      let mynameReg = /^1[3-9]\d{9}$/;
      let upwdReg = /^\w{6,18}$/;
      if (myname == "") {
        // console.log('000')
        this.registHintMsg = "请输入账号";
        this.regHintBox = true;
        return false;
      }
      if (upwd == "") {
        // console.log('111')
        this.registHintMsg = "请输入密码";
        this.regHintBox = true;
        return false;
      }
      if (!mynameReg.test(myname)) {
        this.regHintBox = true;
        console.log("格式不正确");
        this.registHintMsg = "手机格式不正确";
        return false;
      } else {
        phone = myname;
      }
      if (!upwdReg.test(upwd)) {
        // console.log('111')
        this.registHintMsg = "密码格式错误,请输入6-18位以上字母或数字";
        this.regHintBox = true;
        return false;
      }
      console.log(phone, upwd);
      this.axios
        .post(`/regsist`, `phone=${myname}&upwd=${upwd}`)
        .then((res) => {
          this.$message({
            message: "注册成功",
            type: "success",
          });
          this.change();
          // console.log(res.data)
        });
    },
  },
  mounted() {
    this.eventBus.$on("isaxios", (message) => {
      this.a = message;
      if (this.a == true) {
        // 发送axios请求
        this.axios
          .get(
            `/login?upwd=${this.pwd}&phone=${this.phone}&email=${this.email}`
          )
          .then((res) => {
            let data = res.data;
            let userInfo = data.userInfo;
            // console.log(data)
            // console.log(userInfo[0])
            if (data.code == 1) {
              window.sessionStorage.setItem("isLogin", true);
              window.sessionStorage.setItem("uid", userInfo[0].uid);
              window.sessionStorage.setItem("nickname", userInfo[0].nickname);
              // console.log(sessionStorage.getItem('uid'))
              // console.log(sessionStorage.getItem('nickname'))
              this.$store.commit("login_mutation", userInfo[0]);

              // this.$router.push("/");
              window.history.go(-1);

              history.pushState(null, null, document.URL);
              window.addEventListener(
                "popstate",
                function (e) {
                  history.pushState(null, null, document.URL);
                },
                false
              );
            } else {
              console.log("账号密码错误");
              this.hintBox = true;
              this.hintMsg = "账号或密码错误";
              this.border = true;
              // console.log("账号或密码错误")
            }
          });
        return;
      }
    });
  },
};
</script>

<style>
/* 登录样式 */
.login .top {
  height: 98px;
  width: 1200px;
  margin: 0 auto;
}
.login .top > a {
  width: 245px;
}
.login .top > a img {
  margin: auto 0;
}
.login .banner {
  /* width: 100%; */
  height: 588px;
  margin: 0 auto;
  background: url(../assets/login_img/1920x588.png);
}

/* 整个form表单 */
.login .formDiv {
  position: absolute;
  margin-top: 38px;
  width: 410px;
  height: 550px;
  background-color: rgb(253, 251, 250);
  left: 65%;
  z-index: 100;
}
.login > .banner > .form {
  position: absolute;
  top: 10%;
  right: 350px;
  width: 410px !important;
  height: 530px;
  position: absolute;
}
.login .nav > div {
  width: 2px;
  height: 25px;
  margin: auto 0;
  background: rgb(190, 189, 189);
}
.login .nav > span {
  cursor: pointer;
  font-size: 24px;
  color: #555;
}
.login .nav > span:hover {
  color: #ff6700;
}
.login input {
  outline: none;
  padding: 12px 0;
  border: 1px solid #ccc;
}
.input_86 {
  height: 80px;
}
.login .form button {
  height: 50px;
  outline: none;
  border: none;
  background-color: #ff6700;
  color: #fff;
}
.login .hintMsg {
  display: block;
  text-align: left;
  font-size: 14px;
  color: #ff6700;
  width: 100%;
  height: 20px;
  background-color: rgb(255, 210, 210);
  background: url(../assets/login_img/hint.png) no-repeat left center;
}
.border {
  border: 1px solid #ff6700 !important;
}
/* 登录样式结束 */
</style>

<style>
/* 注册样式 */
.login .w-80 {
  width: 85% !important;
  float: right;
}
.login ._86 {
  border: 1px solid #ccc;
  border-right: none;
  padding: 12px;
  width: 54px;
  height: 40px;
  width: 15%;
  height: 50px !important;
}

/* 注册样式结束 */
.login .color_6700 {
  color: #ff6700 !important;
}

/* 二维码Div */
.login .QrCode {
  width: 100%;
  height: 455px;
  background-color: rgb(254, 254, 255);
}
.login .QrCodeDiv {
  width: 180px;
  height: 180px;
  /* border: 1px solid red; */
  margin: 25% auto 0;
}
/* 二维码失效时,遮罩层出来 */
.login .QrCode_msgDiv {
  width: 173px;
  height: 173px;
  position: absolute;
  margin: -43% auto 0;
  left: 118px;
  background-color: rgba(26, 25, 25, 0.8);
}
.login .refresh_QrCode {
  width: 80px;
  height: 25px;
  color: #000;
  line-height: 25px;
  text-align: center;
  border-radius: 2px;
  position: absolute;
  bottom: 15%;
  left: 28%;
  cursor: pointer;
  background-color: rgb(226, 153, 44);
}
.login .QrCode::before {
  display: table;
  content: "";
  clear: both;
}
</style>
