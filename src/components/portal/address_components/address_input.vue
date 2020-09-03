<template>
  <div class="popup" v-show="flag">
    <div class="popup_mask mi-modal"></div>
    <div class="popup_box">
      <div class="popup_content">
        <div class="mi-dialog__wrapper address-modal" style="width:660px;">
          <div class="mi-dialog" aria-modal="true">
            <div class="mi-dialog__header">
              <span class="mi-dialog__title">添加收货地址</span>
            </div>
            <a class="mi-dialog__headerbtn" @click="setAddress()">
              <i class="mi-dialog__close iconfontclose"></i>
            </a>
            <div class="mi-dialog__body">
              <div class="mi-dialog__inner">
                <div class="address-add">
                  <div class="item">
                    <div class="col mr mi-input" :class="isActive==0 ? [focusClass,activeClass]:''">
                      <label for="name" class="input-label">姓名</label>
                      <input
                        type="text"
                        name="name"
                        placeholder
                        maxlength
                        autocomplete="off"
                        class="input-text"
                        @focus="moveonClass(0)"
                        @blur="moveoutClass(0)"
                      />
                    </div>

                    <div class="col mi-input" :class="isActive==1 ? [focusClass,activeClass]:''">
                      <label for="phone" class="input-label">手机号</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder
                        maxlength
                        autocomplete="off"
                        class="input-text"
                        @focus="moveonClass(1)"
                        @blur="moveoutClass(1)"
                      />
                    </div>
                  </div>

                  <div class="address-info-box item">
                    <div class="col mi-input">
                      <label for="address" class="input-label"></label>
                      <input
                        type="text"
                        name="address"
                        readonly="readonly"
                        placeholder="选择省 / 市 / 区 / 街道"
                        maxlength
                        autocomplete="off"
                        class="input-text show-placeholder"
                        @click="setAddressBox()"
                      />
                      <i class="iconfont-arrow-down-small" @click="setAddressBox()"></i>
                      <div class="address-select-box" v-show="adbox">
                        <div class="con">
                          <i class="iconfont-close-small" @click="setAddressBox()"></i>
                          <div class="search-address">
                            <i class="iconfont-search"></i>
                            <div class="col search-input mi-input">
                              <label for="search" class="input-label"></label>
                              <input
                                type="text"
                                name="search"
                                placeholder="输入街道、乡镇、小区或商圈名称"
                                autocomplete="off"
                                class="input-text show-placeholder"
                                style="height:44px; padding-left:45px;"
                              />
                            </div>
                            <div class="search-example">例如: 杭州 昌地火炬大厦</div>
                          </div>
                          <div class="oper-box">
                            <span class="oper-text">手动选择地址 ></span>
                            <span class="oper-text" style="display:none;">搜索地址快速定位</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <div class="col mi-input" :class="isActive==2 ? [focusClass,activeClass]:''">
                      <label for="addressInfo" class="input-label">详细地址</label>
                      <textarea
                        name="addressInfo"
                        autocomplete="off"
                        class="input-text"
                        :placeholder="placeholder"
                        @focus="getPlaceholder(),moveonClass(2)"
                        @blur="getPlaceholder(),moveoutClass(2)"
                        maxlength
                      ></textarea>
                    </div>
                  </div>
                  <div class="item">
                    <div class="col mi-input" :class="isActive==3 ? [focusClass,activeClass]:''">
                      <label for="addresstag" class="input-label">地址标签</label>
                      <input
                        type="text"
                        name="addresstag"
                        :placeholder="placeholder1"
                        autocomplete="off"
                        class="input-text"
                        @focus="getPlaceholder1(),moveonClass(3)"
                        @blur="getPlaceholder1(),moveoutClass(3)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-dialog__footer">
              <button class="btn btn-primary">确定</button>
              <button class="btn btn-gray" @click="setAddress()">取消</button>
            </div>
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
      adbox: false,
      placeholder: "",
      placeholder1: "",
      isActive: -1,
      focusClass: "mi-input-focus",
      activeClass: "mi-input-active",
    };
  },
  methods: {
    setAddress: function () {
      this.$parent.getAddressClose();
    },
    setAddressBox: function () {
      this.adbox = !this.adbox;
    },
    getPlaceholder: function () {
      if (this.placeholder == "") {
        this.placeholder = "详细地址，路名或街道名称，门牌号";
      } else if (this.placeholder == "详细地址，路名或街道名称，门牌号") {
        this.placeholder = "";
      }
    },
    getPlaceholder1: function () {
      if (this.placeholder1 == "") {
        this.placeholder1 = "如“家”、“公司”。限5个字内";
      } else if (this.placeholder1 == "如“家”、“公司”。限5个字内") {
        this.placeholder1 = "";
      }
    },
    moveonClass: function (i) {
      this.isActive = i;
      // console.log(this.isActive[i]);
    },
    moveoutClass: function (i) {
      this.isActive = -1;
      // console.log(this.isActive[i]);
    },
  },
  props: ["flag"],
};
</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.popup .popup_mask {
  opacity: 0.5;
  background-color: #000;
}

.popup .mi-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}

.popup .mi-dialog__wrapper .address-modal {
  overflow: inherit;
}

.popup .mi-dialog__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  overflow: hidden;
}

 .mi-dialog__wrapper .mi-dialog {
  position: relative;
}

.mi-dialog__wrapper .mi-dialog .mi-dialog__header {
  position: relative;
  height: 32px;
  padding: 14px 20px;
  line-height: 32px;
  background-color: #f5f5f5;
}

.mi-dialog__wrapper .mi-dialog .mi-dialog__header .mi-dialog__title {
  font-size: 18px;
  font-weight: 400;
  color: #424242;
  vertical-align: middle;
}

.mi-dialog__wrapper .mi-dialog .mi-dialog__headerbtn {
  position: absolute;
  right: 14px;
  top: 14px;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #757575;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  border-radius: 15px;
}

.mi-dialog__wrapper .mi-dialog .mi-dialog__headerbtn .mi-dialog__close {
  vertical-align: middle;
  font-size: 16px;
  font-weight: 200;
}

.mi-dialog__wrapper .mi-dialog .mi-dialog__headerbtn:hover {
  color: #fff;
  background-color: #e53935;
}

.iconfontclose:before {
  content: "\e60e";
  font-family: iconfont !important;
  font-style: normal;
}

.mi-dialog__wrapper .mi-dialog .mi-dialog__body {
  padding: 20px;
}

.address-add .item {
  display: flex;
  margin-bottom: 14px;
}

.address-add .mr {
  margin-right: 14px;
}

.address-add .col {
  -webkit-box-flex: 1;
  flex: 1;
}

.mi-input {
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  text-align: left;
}

.input-label {
  position: absolute;
  left: 12px;
  top: 11px;
  z-index: 2;
  padding: 0 3px;
  font-size: 14px;
  line-height: 18px;
  color: #b0b0b0;
  background: rgba(0, 0, 0, 0);
  cursor: text;
  transition: all 0.2s linear;
}

.input-text {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  line-height: 18px;
  background: #fff;
  transition: border-color 0.2s linear;
}

.mi-input-active .input-label {
  color: #ff6700;
  top: -7px;
  font-size: 12px;
}

.mi-input-focus .input-label {
  background: #fff;
}

.input-text:focus {
  outline: 0;
}

.mi-input-focus .input-text {
  border-color: #ff6700 !important;
  color: #333;
}

.input-text:hover {
  border-color: #b0b0b0;
}

.address-add .address-info-box {
  position: relative;
  display: block;
}

.address-select-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding-top: 15px;
  border: 1px solid #ff6700;
  z-index: 3;
}

.address-select-box .con {
  margin: 0 20px;
}

.address-select-box .iconfont-close-small {
  position: absolute;
  top: 10px;
  right: 6px;
  width: 24px;
  color: #b0b0b0;
  cursor: pointer;
  line-height: 1;
  text-align: center;
  font-size: 16px;
  font-family: iconfont !important;
  font-style: normal;
}

.iconfont-close-small:before {
  content: "\e71e";
} 

.address-add .address-info-box .iconfont-arrow-down-small {
  font-family: iconfont !important;
  font-style: normal;
  position: absolute;
  top: 50%;
  right: 6px;
  height: 24px;
  line-height: 24px;
  margin-top: -12px;
  font-size: 12px;
  color: #b0b0b0;
}

.iconfont-arrow-down-small::before {
  content: "\e60a";
}

.search-address {
  position: relative;
  padding-top: 30px;
}

.search-address .iconfont-search {
  font-family: iconfont !important;
  font-style: normal;
  position: absolute;
  font-size: 20px;
  line-height: 1;
  text-align: center;
  -webkit-transform: translate3d(10px, 10px, 0);
  transform: translate3d(10px, 10px, 0);
  color: #b2b2b2;
  z-index: 2;
}

.iconfont-search::before {
  content: "\e60f";
}

.search-address .search-input {
  height: 44px;
}

.search-address .search-example {
  padding: 10px 0;
  color: #b0b0b0;
}

.oper-box {
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  color: #b0b0b0;
}

.oper-box .oper-text {
  color: #b0b0b0;
}

textarea {
  overflow: auto;
  color: inherit;
  font: inherit;
  margin: 0;
}

textarea:focus {
  outline-offset: -2px;
}

textarea {
  height: 5em;
  resize: vertical;
}

.address-info-box span:hover {
  color: #ff6700;
}

.mi-dialog__wrapper .mi-dialog .el-dialog__footer {
  /* height: 40px; */
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  background-color: #f5f5f5;
}

/* .btn {
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

.btn-primary {
    background: #ff6700;
    border-color: #ff6700;
    color: #fff;
} */

.btn-gray {
  background: #b0b0b0 !important;
  border-color: #b0b0b0 !important;
  color: #fff !important;
}

.btn-gray:hover {
  background: #757575 !important;
}

button {
  overflow: visible;
}

.mi-dialog__wrapper .mi-dialog .el-dialog__footer .btn {
  margin: 0 7px;
}

button.btn,
input.btn {
  width: 160px;
  height: 40px;
}
</style>