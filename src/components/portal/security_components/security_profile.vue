<template>
  <div>
    <div class="uinfo c_b">
      <div v-for="item in userInfo" :key="item.nickname">
        <div class="main_l">
          <div class="naInfoImgBox t_c">
            <div class="na-img-area marauto" @click="getAvatarOpen()">
              <div class="na-img-bg-area">
                <img
                  :src="require('../../../assets/avatar/'+item.avatar)"
                  alt
                />
                <em class="na-edit"></em>
              </div>
            </div>
            <div class="naImgLink">
              <a title="修改头像" class="colorblue" @click="getAvatarOpen()">修改头像</a>
            </div>
          </div>
        </div>
        <div class="main_r">
          <div class="framedatabox">
            <div class="fdata">
              <a class="colorblue fr" title="编辑" id="editInfo" @click="getCheckboxOpen()">
                <i class="iconpencil"></i>
                编辑
              </a>
              <h3>基础资料</h3>
            </div>
            <div class="fdata lblnickname">
              <p>
                <span>昵称：</span>
                <span class="value">{{item.nickname}}</span>
              </p>
            </div>
            <div class="fdata lblgender">
              <p>
                <span>性别：</span>
                <span class="value">{{gender}}</span>
              </p>
            </div>
          </div>
          <div class="framedatabox">
            <div class="fdata">
              <h3>高级设置</h3>
            </div>
            <div class="fdata click-row">
              <a href class="colorblue fr">管理</a>
              <p>
                <span>银行卡</span>
              </p>
            </div>
            <div class="fdata click-row">
              <a href class="colorblue fr">管理</a>
              <p>
                <span>数据权利中心</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <avatar-upload v-show="showAvatar"></avatar-upload>
    <edit-info v-show="showCheckbox"></edit-info>
  </div>
</template>

<script>
import axios from "axios";
import Avatar from "./security_profile_avatar.vue";
import Editinfo from "./security_profile_editinfo.vue";

export default {
  data() {
    return {
      //获取到的uid
      uid: "1201329621037",
      //用户信息对象
      userInfo: [],
      gender: '',
      // avatar:'~@/assets/avatar/'+userInfo.avatar,
      //窗口状态
      showAvatar: false,
      showCheckbox: false,
    };
  },
  mounted() {
    this.getuserId();
    this.getGender();
  },
  methods: {
    //请求获取用户数据
    getuserId(uid) {
      this.axios.get(
        `/get_userinfo?uid=${this.uid}`
      ).then((res)=>{
        console.log(res.data.userInfo);
        this.userInfo = res.data.userInfo;
      });
    },
    //头像开关
    getAvatarOpen: function () {
      this.showAvatar = true;
    },
    getAvatarClose: function () {
      this.showAvatar = false;
    },
    //编辑个人信息开关
    getCheckboxOpen: function () {
      this.showCheckbox = true;
    },
    getCheckboxClose: function () {
      this.showCheckbox = false;
    },

    //数据转换
    getGender () {
      this.gender=this.userInfo.gender
      if(this.gender==1){
        this.gender='男'
      }else{
        this.gender='女'
      }
    },
  },
  components: {
    "avatar-upload": Avatar,
    "edit-info": Editinfo,
  },
};
</script>

<style>
.uinfo {
  font-size: 14px;
}

.c_b {
  zoom: 1;
}

.c_b:after {
  clear: both;
}

.c_b:before,
.c_b:after {
  content: "";
  display: block;
}

.main_l {
  float: left;
  width: 300px;
}

.naInfoImgBox {
  padding: 80px 20px 0;
}

.t_c {
  text-align: center;
}

.na-img-area {
  cursor: default;
}

.marauto {
  margin: 0 auto;
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

.marauto {
  margin: 0 auto;
}

:root .na-img-bg-area {
  background: none;
}

.na-img-bg-area {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.na-edit {
  position: absolute;
  top: 23px;
  left: 23px;
  display: none;
  width: 43px;
  height: 43px;
  background: url(~@/assets/portal/n-ava-edit.png) 0 0 no-repeat;
}

.na-img-area:hover .na-edit {
  display: block;
  cursor: pointer;
}

.naImgLink {
  padding-top: 15px;
}

.colorblue {
  color: #4a90e3;
}

.main_r {
  float: left;
  width: 590px;
}

.framedatabox {
  padding-top: 15px;
}

.fdata {
  padding-left: 20px;
  line-height: 40px;
  overflow: hidden;
}

.fr {
  float: right;
}

.iconpencil {
  width: 14px;
  height: 14px;
  margin-right: 5px;
  margin-top: -5px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  background-image: url(~@/assets/portal/iconpencil.png);
}
</style>