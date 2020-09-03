<template>
  <div class="popup_mask">
    <div class="bkc"></div>
    <div class="mod_wrap">
      <div class="mod_acc_tip" id="UpdatePassword" style="margin-top: -249px;">
        <div class="mod_tip_hd">
          <h4>修改密码</h4>
          <a class="btn_mod_close" @click="setFix()"></a>
        </div>
        <div class="mod_tip_bd">
          <div class="modify_pwd">
            <dl>
              <dt>原密码</dt>
              <dd class="OldPass">
                <div class="inputbg">
                  <label class="labelbox pwd_panel c_b" :class="errpwd==true ?'error_bg':''">
                    <input
                      type="password"
                      name="password"
                      id="oldPassword"
                      autocomplete="off"
                      disableautocomplete
                      placeholder="输入原密码"
                      value
                      @blur="checkPassword"
                    />
                  </label>
                </div>
                <div class="err_tip error-con" v-show="errpwd">
                  <em class="icon_error"></em>
                  <span id="msg_pwd">原密码不能为空</span>
                </div>
              </dd>
              <dt>新密码</dt>
              <dd class="NewPass">
                <div class="inputbg">
                  <label class="labelbox pwd_panel c_b" :class="errnewpwd==true ?'error_bg': ''">
                    <input
                      type="password"
                      name="repassword"
                      id="newPass"
                      autocomplete="off"
                      disableautocomplete
                      placeholder="输入新密码"
                      value
                      @blur="checkNewPassword"
                    />
                  </label>
                  <label class="labelbox pwd_panel c_b" :class="errnewpwd2==true ?'error_bg': ''">
                    <input
                      type="password"
                      name="repassword2"
                      id="newPass2"
                      autocomplete="off"
                      disableautocomplete
                      placeholder="重复新密码"
                      value
                      @blur="checkNewPassword"
                    />
                  </label>
                </div>
                <div class="err_tip error-con" v-show="errnewpwd">
                  <em class="icon_error"></em>
                  <span id="msg_pwd1">新密码不能为空</span>
                </div>
                <div class="err_tip error-con" v-show="errnewpwd2">
                  <em class="icon_error"></em>
                  <span id="msg_pwd2">两次密码不一致</span>
                </div>
              </dd>
              <dl class="capt_box">
                <dt>验证码</dt>
                <dd>
                  <div class="inputcode">
                    <label
                      class="labelbox chkcode input_bg"
                      :class="errcodes==true || errcodes2==true ?'error_bg': ''"
                    >
                      <input
                        type="text"
                        name="icode"
                        id="code_input"
                        value
                        placeholder="请输入验证码(大写输入法)"
                        autocomplete="off"
                        disableautocomplete
                        v-model="code"
                      />
                    </label>
                    <div
                      class="chkcode_img"
                      style="width:125px;height:42px;"
                      @click="refreshCode()"
                    >
                      <verify-code :identifyCode="identifyCode"></verify-code>
                    </div>
                  </div>
                  <div class="err_tip error_con" v-show="errcodes">
                    <em class="icon_error"></em>
                    <span>请输入验证码</span>
                  </div>
                  <div class="err_tip error_con" v-show="errcodes2">
                    <em class="icon_error"></em>
                    <span>验证码不正确</span>
                  </div>
                </dd>
              </dl>
            </dl>
          </div>
          <div class="tip_btns">
            <a class="btn_tip btn_commom" @click="checkLpicma">确定</a>
            <a class="btn_tip btn_back" @click="setFix()">取消</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from "./verify";

export default {
  data() {
    return {
      userPassword: "123456789",
      fixFailedNum: 1,
      identifyCodes: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      identifyCode: "",
      code: "", // text框输入的验证码
      errpwd: false,
      errnewpwd: false,
      errnewpwd2: false,
      errcodes: false,
      errcodes2: false,
    };
  },
  mounted() {
    this.refreshCode();
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    //窗口开关
    setFix: function () {
      this.$parent.getfix();
    },
    //配置验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    //验证码验证
    checkLpicma() {
      if (this.code == "") {
        this.errcodes = true;
      } else if (this.code !== this.identifyCode) {
        this.errcodes2 = true;
      } else {
        this.errcodes = false;
        this.errcodes2 = false;
      }
    },
    // fix() {
    //   //重新登录验证
    //   this.checkLpicma();
    // },
    //原密码验证
    checkPassword: function () {
      let input = document.getElementById("oldPassword");
      if (input.value == "") {
        this.errpwd = true;
      } else {
        this.errpwd = false;
      }
    },
    //新密码验证
    checkNewPassword: function () {
      let input = document.getElementById("newPass");
      let input2 = document.getElementById("newPass2");
      if (input.value == "" || input2.value == "") {
        this.errnewpwd = true;
      } else if (input.value !== input2.value) {
        this.errnewpwd2 = true;
      } else {
        this.errnewpwd = false;
        this.errnewpwd2 = false;
      }
    },
  },
  props: ["fix"],
  components: {
    "verify-code": Verify,
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

.popup_mask .mod_acc_tip {
  /* display: none; */
  position: absolute;
  left: 50%;
  margin-left: -206px;
  top: 50%;
  margin-top: -187px;
}

.popup_mask .mod_acc_tip {
  /* display: none; */
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

:root .mod_acc_tip {
  border: 1px solid #838383;
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

.modify_pwd {
  padding: 30px 40px 0;
}

.modify_pwd dt {
  font-size: 15px;
  color: #555;
  font-weight: bold;
  line-height: 30px;
}

.inputbg {
  padding-bottom: 5px;
}

.modify_pwd label {
  margin-bottom: 6px;
}

.labelbox,
.input_bg {
  height: 42px;
  line-height: 42px;
  display: inline-block;
}

.labelbox,
.input_bg {
  border: 1px solid #e8e8e8;
}

.error_bg,
.err_label {
  border: 1px solid #f66 !important;
}

.c_b {
  zoom: 1;
}

.inputbg input {
  width: 310px;
}

.err_tip {
  margin-bottom: 5px;
  line-height: 20px;
  font-size: 14px;
  color: #f66;
  /* display: none; */
}

.icon_error {
  width: 14px;
  height: 14px;
  margin: -1px 5px 0 0;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  background: url(~@/assets/portal/n-warning-ico.png) no-repeat;
}

.chkcode_img {
  vertical-align: top;
  margin-left: 7px;
  vertical-align: middle;
  cursor: pointer;
  float: right;
}

.tip_btns {
  height: 35px;
  padding-top: 25px;
  text-align: center;
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

.btn_commom {
  background: #ff6700;
  border: 1px solid #ff6700;
  color: #fff;
}

.btn_back {
  border: 1px solid #e8e8e8;
  color: #555;
}
</style>