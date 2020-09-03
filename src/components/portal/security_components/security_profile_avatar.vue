<template>
  <!-- 设置头像 -->
  <div class="popup_mask" v-show="showAvatar">
    <div class="bkc"></div>
    <div class="mod_wrap">
      <div class="mod_acc_tip layeruploadface">
        <div class="mod_tip_hd">
          <h4>修改头像</h4>
        </div>
        <a class="btn_mod_close" @click="setAvatar()"></a>
        <div class="mod_tip_bd preupload" v-show="preupload">
          <form
            action="/pass/auth/profile/requesUpload"
            method="POST"
            enctype="mulitipart/form-data"
            target="uploadAvatar"
            id="photoUploader"
          >
            <input type="hidden" name="userId" value />

            <div class="wapbox accset">
              <dl>
                <dt>
                  <strong class="wap_title_big">请上传图片：</strong>
                </dt>
                <dd>
                  <div class="uplode_img">
                    <input type="button" class="btn_tip btn_commom" value="上传头像" />
                    <input
                      type="file"
                      class="uplodefile"
                      name="userfile"
                      accept="image/*"
                      autocomplete="off"
                      disableautocomplete
                      @change="addpht()"
                      ref="img"
                    />
                  </div>
                  <p>图片格式jpg、png、jpeg，大小不超过10MB</p>
                </dd>
              </dl>
            </div>
            <div class="tip_btns">
              <a class="btn_tip btn_commom" title="下一步" @click="nextAvatar()">下一步</a>
              <a class="btn_tip btn_back" title="取消" @click="setAvatar()">取消</a>
            </div>
          </form>
        </div>
        <div class="mod_tip_bd uploaded" v-show="uploadimg">
          <div class="wapbox">
            <div class="clipimg t_c">
              <!-- 图片位置 -->
              <div class="uploadimgs">
                <div class="clipmsk">
                  <img :src="picSrc" id="clipimage" />
                </div>
              </div>
            </div>
          </div>
          <div class="tip_btns">
            <input type="submit" class="btn_tip btn_commom" value="确定" />
            <a class="btn_tip btn_back" title="重新上传" id="reuploadPhoto" @click="preAvatar()">重新上传</a>
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
      preupload: true,
      uploadimg: false,
      picSrc: null,
    };
  },
  props: ["showAvatar"],
  methods: {
    setAvatar: function () {
      this.$parent.getAvatarClose();
    },
    nextAvatar: function () {
      this.uploadimg = true;
      this.preupload = false;
    },
    //头像预览窗口
    preAvatar: function () {
      this.preupload = true;
      this.uploadimg = false;
    },
    //头像预览功能
    addpht() {
      var that = this;
      //注意这里要使用that保存this，不然下方调用f.onload的时候会出现问题
      console.log(this.$refs.img.files);
      var f = new FileReader();
      f.readAsDataURL(this.$refs.img.files[0]);
      f.onload = function () {
        that.picSrc = f.result;
      };
    },
  },
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
  right: 7px;
  cursor: pointer;
  background: url(~@/assets/portal/close-bck.png);
  background-repeat: no-repeat;
  background-position: center;
}

.accset {
  width: 200px;
  margin: 0 auto;
  padding-top: 30px;
}

.accset dt {
  padding-bottom: 15px;
  font-size: 14px;
  color: #333;
}

.accset dd {
  padding-bottom: 10px;
}

.uplode_img {
  line-height: 35px;
  position: relative;
}

.uplode_img .btn_commom {
  width: 200px;
  margin: 0;
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

.uplodefile {
  height: 35px;
  width: 202px;
  line-height: 30px;
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  opacity: 0.01;
}

.tip_btns {
  height: 35px;
  padding-top: 25px;
  text-align: center;
}

.btn_back {
  border: 1px solid #e8e8e8;
  color: #555;
}

#photoUploader .uplodefile {
  font-size: 45px;
}

.clipimg {
  background: #2c2c2c;
  width: 300px;
  height: 300px;
  margin: 20px auto 0;
  position: relative;
  text-align: left;
  vertical-align: middle;
}

.t_c {
  text-align: center;
}

.clipmsk {
  width: 80px;
  height: 80px;
  top: 110px;
  left: 110px;
  position: absolute;
}

.clipmsk img {
  width: 80px;
  height: 80px;
  top: 110px;
  left: 110px;
  vertical-align: middle;
}
</style>

