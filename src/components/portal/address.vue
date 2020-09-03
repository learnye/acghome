<template>
  <div class="uc-address-box">
    <div class="box">
      <h1>收货地址</h1>
      <div class="address-box">
        <div class="address-list">
          
          <div class="address-item" @click="getAddressOpen()">
            <div class="add-desc">
              <i class="iconfont iconfont-plus"></i>
              <span>添加新地址</span>
            </div>
          </div>

          <div class="address-item">
            <div class="address-info">
              <div class="name">
                张三
                <span>公司</span>
              </div>
              <div class="tel">123****8901</div>
              <div class="address-con">
                <span id="province">浙江</span>
                <span id="city">杭州市</span>
                <span id="district">西湖区</span>
                <span id="street">文新街道</span>
                <span class="info">昌地火炬大厦</span>
              </div>
              <div class="address-action">
                <span>修改</span>
                <span>删除</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <transition name="fade">
    <address-input v-show="flag"></address-input>
    </transition>
  </div>
</template>

<script>
import Address from './address_components/address_input.vue'

export default {
  name:"Address",
  data(){
    return{
      flag:false,
    }
  },
  methods:{
    getAddressOpen:function(){
      this.flag=true;
  },
  getAddressClose:function(){
      this.flag=false;
  },
},
  components: {
    "address-input":Address,
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

.uc-address-box {
  background: #fff;
  padding: 20px 0;
}

.uc-address-box .box {
  margin: 0 48px;
}

.address-box {
  margin-top: 15px;
}

.address-list .address-item {
  display: inline-block;
  width: 268px;
  height: 178px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  position: relative;
  margin-right: 17px;
  margin-bottom: 20px;
  vertical-align: top;
  transition: all 0.4s ease;
}

.address-list .add-desc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: #b0b0b0;
}

.box h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.address-list .iconfont {
  display: table;
  width: 30px;
  height: 30px;
  margin: 0 auto 8px;
  font-size: 30px;
  line-height: 30px;
  border-radius: 17px;
  text-align: center;
  transition: all 0.4s ease;
  color: #e0e0e0;
  font-family: iconfont !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
}

.address-list .address-item:hover{
  border: 1px solid #757575;
}

.address-item:hover .iconfont{
    color: #757575;
}

.iconfont-plus:before {
  content: "\e60c";
}

.address-list .address-info {
  padding: 15px 24px 0;
}

.address-list .address-action,
.address-list .address-info,
.address-list .telephone {
  line-height: 22px;
  color: #757575;
}

.address-list .name {
  font-size: 18px;
  color: #333;
  line-height: 30px;
  margin-bottom: 10px;
}

.address-list .name span{
    float: right;
    font-size: 14px;
    color: #757575;
}

.address-list .address-con span {
  display: inline-block;
  margin-right: 3px;
  word-wrap: break-word;
}

.address-list .address-con .info {
  width: 100%;
}

.address-list .address-action {
  text-align: right;
  position: absolute;
  right: 24px;
  bottom: 10px;
  opacity: 0;
  line-height: 22px;
  color: #757575;
}

.address-list .address-action span{
    color: #ff6700;
    margin-left: 10px;
}

.address-item:hover .address-action{
    opacity: 1;
}

</style>