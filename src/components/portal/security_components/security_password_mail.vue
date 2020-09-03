<template>
  <div class="popup_mask callable">
    <div class="bkc"></div>
    <div class="mode_wrap">
      <div class="mod_acc_tip" id="UpdateMail" style="margin-top:-249px;">
        <div class="mod_tip_hd">
          <h4>修改安全邮箱</h4>
          <a class="btn_mod_close" @click="setMail()"></a>
        </div>
        <div class="mod_tip_bd">
          <div class="tabbar_panel">
            <div class="tabbar">
              <div class="tab_opt c_b">
                <span class="mailtab1 now">输入新邮箱</span>
                <!-- <span class="mailtab2">验证新邮箱</span>
                <span class="mailtab3">完成</span>-->
              </div>
              <div class="tabline c_b">
                <i class="now"></i>
                <!-- <i class="none"></i> -->
                <!-- <i class="none"></i> -->
                <span class="justify_fix"></span>
              </div>
            </div>
          </div>
          <div class="wapbox">
            <dl class="binding mailstep1">
              <dt>请输入新的安全邮箱地址</dt>
              <dd>
                <label
                  class="input_bg"
                  :class="errempty==true || errmail==true || errmail==true ? 'error_bg' : ''"
                >
                  <input
                    type="text"
                    placeholder="请输入邮箱"
                    autocomplete="off"
                    class="new_mail"
                    id="new_mail"
                    disableautocomplete
                    value
                    @blur="checkMail"
                  />
                </label>
              </dd>
              <div
                class="err_tip empty_email err_tip_independ"
                _text="请输入邮箱地址"
                v-show="errempty"
              >请输入邮箱地址</div>
              <div
                class="err_tip empty_email err_tip_independ"
                _text="请输入邮箱地址"
                v-show="errmail"
              >邮箱格式不正确</div>
              <div
                class="err_tip empty_email err_tip_independ"
                _text="请输入邮箱地址"
                v-show="errsame"
              >新的邮箱地址不能与之前的相同</div>
              <div class="tip_btns">
                <a class="btn_tip btn_commom" title="完成">完成</a>
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
  data() {
    return {
      userEmail: "123456789@qq.com",
      errempty: false,
      errmail: false,
      errsame: false,
    };
  },
  methods: {
    //窗口开关
    setMail: function () {
      this.$parent.getmail();
    },
    //验证邮箱
    checkMail: function () {
      let input = document.getElementById("new_mail");
      let reg = /\w+([- +.]\w)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      let bool = reg.test(input.value);
      if (input.value == "") {
        this.errempty = true;
      } else if (bool == false) {
        this.errmail = true;
      } else if (input.value == this.userEmail) {
        this.errsame = true;
      } else {
        this.errempty = false;
        this.errmail = false;
        this.errsame = false;
      }
    },
  },
  props: [],
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

.callable {
  z-index: 200;
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

.tabbar_panel {
  padding-top: 30px;
}

.tab_opt {
  width: 410px;
  margin: 0 auto;
}

.tab_opt .now {
  color: #ff6700 !important;
}

.tab_opt span {
  color: #9d9d9d;
  display: block;
  float: left;
  text-align: center;
  width: 33.33%;
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

.tabline .none {
  background-position: -32px -85px;
}

.tabline i {
  width: 14px;
  height: 14px;
  margin-top: 6px;
  display: inline-block;
}

.tabline i {
  background: url(~@/assets/portal/icon_tip.png) no-repeat;
}

.justify_fix {
  display: inline-block;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.mailstep1 {
  padding: 30px 58px 0;
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

.input_bg input {
  height: 20px;
  line-height: 20px;
  padding: 10px;
  display: inline-block;
}

.binding input {
  width: 275px;
}

.err_tip_independ {
  background-position: 0px 3px;
  padding-left: 20px;
  background: url(~@/assets/portal/n-warning-ico.png) no-repeat;
}

.err_tip,
.err_tip_independ {
  margin-bottom: 5px;
  line-height: 20px;
  font-size: 14px;
  color: #f66;
  /* display: none; */
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
</style>