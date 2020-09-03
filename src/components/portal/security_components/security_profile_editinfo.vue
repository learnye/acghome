<template>
  <div class="popup_mask">
    <div class="bkc"></div>
    <div class="mod_wrap">
      <div class="mod_acc_tip layereditinfo">
        <div class="mod_tip_hd">
          <h4>编辑基础资料</h4>
          <a class="btn_mod_close" @click="setCheckbox()"></a>
        </div>
        <div class="mod_tip_bd">
          <form action method>
            <div class="wapbox editbasicinfo">
              <dl class="infobox c_b">
                <dt>昵称：</dt>
                <dd>
                  <label class="labelbox" :class="isErr ? 'err_label' : ''">
                    <input
                      type="text"
                      name="nickname"
                      placeholder="昵称"
                      maxlength="20"
                      class="nickname"
                      ref="nickTag"
                    />
                  </label>
                </dd>
                <dt>性别：</dt>
                <dd class="checkbox infosex">
                  <span value="1" :class="isCheck==1 ? 'now' : ''" @click="checkSex(1)">
                    <i class="icon_select iconinfosex"></i>
                    <em>男</em>
                  </span>
                  <span value="0" :class="isCheck==0 ? 'now' : ''" @click="checkSex(0)">
                    <i class="icon_select iconinfosex"></i>
                    <em>女</em>
                  </span>
                </dd>
              </dl>
              <div
                class="err-tip empty_name err_tip_independ"
                :class="isErr ? 'err-active' : ''"
                _text="名字不能为空"
              >名字不能为空</div>
            </div>
            <div class="tip_btns">
              <a class="btn_tip btn_commom" title="保存" @click="checkNickname(),editUserInfo()">保存</a>
              <a class="btn_tip btn-back" title="取消" @click="setCheckbox()">取消</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isErr: false,
      isCheck: -1,
    };
  },
  methods: {
    //格式验证
    checkNickname: function () {
      let nickname = this.$refs.nickTag.value;
      if (nickname == "") {
        this.isErr = true;
      } else {
        this.isErr = false;
      }
    },
    checkSex: function (i) {
      this.isCheck = i;
    },
    setCheckbox: function () {
      this.$parent.getCheckboxClose();
    },
    // 修改用户信息并提交
    editUserInfo(nickname,gender){
      let param={
        nickname:this.userInfo.nickname,
        gender :this.userInfo.gender
      };
      if(this.isErr==false){
        this.axios.post(`/get_userinfo?uid=${this.uid}`,{params:param}).then((res)=>{
          this.userInfo = res.data.userInfo
        })
      }
    },

  },
  props: ["showCheckbox","userInfo"],
};
</script>

<style scoped>
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

.editbasicinfo {
  padding: 40px 0 0 20px;
}

.infobox {
  padding-bottom: 10px;
  line-height: 42px;
}

.c_b {
  zoom: 1;
}

.infobox dt {
  float: left;
  width: 80px;
  margin-right: 10px;
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  overflow: hidden;
}

.infobox dt,
.infobox dd {
  padding-bottom: 10px;
}

.labelbox {
  height: 42px;
  line-height: 42px;
  display: inline-block;
  border: 1px solid #e8e8e8;
}

.error_bg,
.err_label {
  border: 1px solid #f66 !important;
}

.infobox input {
  line-height: 20px;
}

.labelbox input {
  height: 20px;
  line-height: 20px;
  padding: 10px;
}

.nickname {
  width: 265px;
}

.infosex span {
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
}

.icon_select {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top: -4px;
  display: inline-block;
  vertical-align: middle;
  background: url(~@/assets/portal/checkbox.png);
}

.checkbox .now .icon_select {
  background: url(~@/assets/portal/checkbox-now.png);
}

.editbasicinfo .err_tip_independ {
  margin-left: 35px;
}

.err_tip_independ {
  background-position: 0px 3px;
  padding-left: 20px;
}
.err_tip_independ {
  background-image: url(~@/assets/portal/checkbox-warning.png);
  background-repeat: no-repeat;
}

.err_tip,
.err_tip_independ {
  margin-bottom: 5px;
  line-height: 20px;
  font-size: 14px;
  color: #f66;
  display: none;
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

.btn_back {
  border: 1px solid #e8e8e8;
  color: #555;
}

.err-active {
  display: block;
}
</style>