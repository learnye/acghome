<template>
  <div class="popup_mask callable">
    <div class="bkc"></div>
    <div class="mod_wrap">
      <div class="mod_acc_tip" id="popEnterNewPhone">
        <div class="mod_tip_hd">
          <h4>修改安全手机</h4>
          <a class="btn_mod_close" @click="setphone(),getStep()"></a>
        </div>
        <div class="mod_tip_bd">
          <div class="tabbar_panel">
            <div class="tabbar">
              <div class="tab_opt c_b">
                <span :class="step1==true ? 'now' : ''">输入新手机</span>
                <span :class="step2==true ? 'now' : ''">验证新手机</span>
                <span class>完成</span>
              </div>
              <div class="tabline c_b">
                <i :class="step1==true ? 'now' : ''"></i>&nbsp;
                <i :class="step2==true ? 'now' : ''"></i>&nbsp;
                <i class></i>&nbsp;
                <span class="justify_fix"></span>
              </div>
            </div>
          </div>
          <div class="wapbox">
            <dl class="binding phonestep1" v-show="step1">
              <dt>请输入新的安全手机号码</dt>
              <dd>
                <div>
                  <label class="input_bg" :class="isErr==true ? 'error_bg':''">
                    <input
                      type="tel"
                      id="new_phone"
                      name="phone"
                      placeholder="请输入手机号码"
                      autocomplete="off"
                    />
                  </label>
                </div>
                <div class="err_tip error_con" v-show="isErr">
                  <em class="icon_error"></em>
                  <span>请输入手机号码</span>
                </div>
              </dd>
              <div class="tip_btns">
                <a class="btn_tip btn_commom" @click="checkphone(),getStep2(),addNumber(6)">下一步</a>
              </div>
            </dl>
            <dl class="verify" v-show="step2">
              <div class="phonestep2">
                <div class="xs_title_box">
                  <div class="content_title">我们向您的手机发送一条验证短信</div>
                  <p>请输入短信中的验证码</p>
                </div>
                <div class="mod inputsend">
                  <label class="input_bg">
                    <input
                      type="text"
                      id="phone_capt"
                      class="remain_input"
                      name="ticket"
                      placeholder="请输入验证码"
                      autocomplete="off"
                    />
                    <span class="remain">
                      <a
                        class="resend"
                        autocomplete="off"
                        v-show="show"
                        @click="getCode(),addNumber(6)"
                      >重新获取验证码</a>
                      <a class="resend" autocomplete="off" v-show="!show">{{count}}s</a>
                    </span>
                  </label>
                </div>
              </div>
              <div class="tip_btns">
                <a class="btn_tip btn_commom">确定</a>
                <a class="btn_tip btn_back" @click="setphone(),getStep()">取消</a>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      step1: true,
      step2: false,
      count: "",
      timer: null,
      show: true,
      str: "",
      isErr: false,
    };
  },
  methods: {
    //关闭窗口
    setphone() {
      this.$parent.getphone();
    },
    //打开第二步窗口
    getStep2() {
      if (this.isErr == true) {
        return;
      } else {
        this.step2 = true;
        this.step1 = false;
      }
    },
    //重置窗口
    getStep() {
      this.step1 = true;
      this.step2 = false;
    },

    //验证手机格式
    checkphone() {
      let input = document.getElementById("new_phone");
      if (input.value == "") {
        this.isErr = true;
      } else {
        this.isErr = false;
      }
    },
    //模拟短信发送(生成随机数字)
    addNumber(_idx) {
      var str = "";
      let input = document.getElementById("new_phone");
      if (this.isErr == true) {
        return;
      } else {
        for (var i = 0; i < _idx; i += 1) {
          str += Math.floor(Math.random() * 10);
        }
        this.str = str;
        alert("您的短信验证码为：" + this.str);
      }
    },
    //模拟短信验证码倒计时
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
input {
    background: none;
    border: 0 none;
}

input, button, select, textarea {
    outline: none;
}

input, button, textarea, select {
    font-size: 100%;
}

.callable {
  z-index: 200;
}

.popup_mask {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* display: none; */
}

.popup_mask .bkc {
  position: absolute;
  width: 100%;
  height: 200%;
  left: 0;
  top: 0;
  background-color: #333;
  opacity: 0.7;
}

.popup_mask .mod_wrap {
  height: 100%;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 1;
}

#popEnterNewPhone {
  margin-top: -250px;
  width: 500px;
  height: 550px;
}

.popup_mask .mod_acc_tip {
  position: absolute;
  left: 50%;
  margin-left: -206px;
  top: 50%;
  margin-top: -187px;
}

:root .mod_acc_tip {
  border: 1px solid #838383;
}

.mod_acc_tip {
  background: #fff;
  width: 412px;
  min-height: 300px;
  height: auto;
  padding: 0 14px 30px;
  line-height: 20px;
  border: 1px solid #838383;
  border-radius: 5px;
  color: #666;
  position: relative;
  z-index: 4;
}

.mod_tip_hd {
  height: 42px;
  padding-top: 13px;
  line-height: 42px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}

.mod_tip_hd h4 {
  font-size: 15px;
  color: #1e1e1e;
  font-weight: bold;
}

.btn_mod_close {
  width: 22px;
  height: 22px;
  overflow: hidden;
  position: absolute;
  top: 7px;
  right: -7px;
  cursor: pointer;
  background: url(~@/assets/portal/close-bck.png);
  background-repeat: no-repeat;
  background-position: center;
}

.tabbar_panel {
  padding-top: 30px;
}

.tab_opt {
  width: 410px;
  margin: 0 auto;
}

.c_b {
  zoom: 1;
}

.c_b:before,
.c_b:after {
  content: "";
  display: block;
}

.tab_opt span {
  color: #9d9d9d;
  display: block;
  float: left;
  text-align: center;
  width: 33.33%;
}

.tab_opt .now {
  color: #ff6700 !important;
}

.tabline {
  width: 296px;
  margin: 0 auto;
  height: 12px;
  border-bottom: 1px solid #e8e8e8;
  text-align: justify;
}

.tabline .now {
  background-position: -32px -62px;
}

.tabline i {
  margin: 0 auto;
  width: 14px;
  height: 14px;
  margin-top: 6px;
  display: inline-block;
}

.tabline i {
  background: url(~@/assets/portal/icon_tip.png) no-repeat;
  background-position: -32px -85px;
}

.justify_fix {
  display: inline-block;
  width: 100%;
  height: 0;
  overflow: hidden;
}

#popEnterNewPhone .phonestep1 {
  padding-left: 80px;
  width: 298px;
}

.phonestep1 {
  padding: 30px 58px 0;
}

#popEnterNewPhone .phonestep2 {
  padding: 0 85px 20px;
  width: 298px;
}

.binding {
  padding: 30px 30px 0;
}

.binding dt {
  padding-bottom: 10px;
  font-size: 15px;
  color: #333;
  font-weight: bold;
}

.input_bg {
  vertical-align: middle;
  margin-bottom: 6px;
  height: 42px;
  line-height: 42px;
  display: inline-block;
  border: 1px solid #e8e8e8;
}

.error_bg {
  border: 1px solid #f66 !important;
}

.err_tip,
.err_tip_independ {
  margin-bottom: 5px;
  line-height: 20px;
  font-size: 14px;
  color: #f66;
  /* display: none; */
}

.input_bg input {
  height: 20px;
  line-height: 20px;
  padding: 10px;
  display: inline-block;
}

.binding input {
  width: 275px;
}

.icon_error {
  width: 14px;
  height: 14px;
  margin: -1px 5px 0 0;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  background: url(../../../assets/portal/checkbox-warning.png) no-repeat;
}

.tip_btns {
  height: 35px;
  padding-top: 25px;
  text-align: center;
}

.btn_commom {
  background: #ff6700;
  border: 1px solid #ff6700;
  color: #fff;
}

.btn_back {
  border: 1px solid #e8e8e8;
  color: #555;
}

.btn_tip {
  min-width: 100px;
  height: 33px;
  margin: 0 2px;
  padding: 0 10px;
  line-height: 33px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.phonestep2 {
  padding: 0 85px 20px;
}

.mod.inputsend {
  height: auto;
}

.xs_title_box {
  padding: 30px 0 20px;
}

.inputsend {
  margin-bottom: 10px;
}

.content_title {
  color: #333;
  font-size: 15px;
  font-weight: bold;
}
.input_bg .remain_input {
  width: 140px;
}

.remain {
  margin-left: 8px;
  vertical-align: middle;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
</style>