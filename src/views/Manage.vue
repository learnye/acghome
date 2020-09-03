<template>
  <div class="m1">
        <div class="left-menu">
          <asideBar></asideBar>
        </div>
        <div class="right-content pr">
          <headTop></headTop>
          <div class="product"><productManage @child-pid="receivePid"></productManage></div>
        </div>
        <div ref="msgn" class="message-box-wrapper">
          <div class="message-box">
            <div class="message-box-header">
              <div class="message-box-title">
                <span>提示</span>
              </div>
              <button class="message-box-headerbtn" @click="cancleDel">
                <i class="iconfont icon-quxiao"></i>
              </button>
            </div>
            <div class="message-box-content">
              <div class="message-box-status">
                <i class="iconfont icon-jinggao"></i>
              </div>
              <div class="message-box-message">
                <p>删除后不可恢复，确认删除该记录吗?</p>
              </div>
            </div>
            <div class="message-box-btns">
              <button class="message-btn" @click="cancleDel">
                <span>取消</span>
              </button>
              <button class="message-btn btn-color" @click="deleteProduct" >
                <span>确认</span>
              </button>
            </div>
          </div>
        </div>   
  </div>
</template>
<script>
import headTop from "@/components/head-top";
import asideBar from "@/components/aside-bar";
import productManage from "@/components/product-Manage";

export default {
  components: {
    headTop,
    asideBar,
    productManage,
  },
  data() {
    return {
      pid:"",
    };
  },
  methods: {
    receivePid(data){
      this.pid=data;
      this.$refs.msgn.style="display:block"
    },
    cancleDel(){
      this.$refs.msgn.style="display:none"
    },
    deleteProduct(){
      this.axios.delete('/delete_product',{params:{pid:this.pid}}).then(res=>{
        console.log(res.data.code);
        if(res.data.code==1){
          this.$router.go(0);
        }
      })
    }
  },
  mounted(){
    document.documentElement.style="overflow-y: hidden;";
  }
};
</script>
<style scoped>
.icon-quxiao:before {
    content: "\e606";
}
.icon-jinggao:before {
    content: "\e657";
}


.left-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
    z-index: 99;
}
.pr {
    position: relative;
}
.right-content {
    width: auto;
    margin: 0 0 0 200px;
    -webkit-transition: margin-right .5s;
    transition: margin-right .5s;
    height: 100vh;
}
.product{
  background-color: #F6F8FB;
}
/* 提示框样式 */
.message-box-wrapper {
    z-index: 2001;
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(0,0,0,.5);
}
.message-box-wrapper:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
}
.message-box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
/* 提示框头部 */
.message-box-header {
    position: relative;
    padding: 15px 15px 10px;
}
.message-box-title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 1;
    color: #303133;
}
.message-box-headerbtn {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 0;
    border: none;
    outline: 0;
    background: 0 0;
    font-size: 16px;
    cursor: pointer;
}
.message-box-headerbtn .iconfont{
  color: #909399;
}
/* 提示内容 */
.message-box-content {
    position: relative;
    padding: 10px 15px;
    color: #606266;
    font-size: 14px;
}
.message-box-status {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 24px;
    color: #e6a23c;
}
.message-box-status .iconfont{
  font-size: 24px;
}
.message-box-status+.message-box-message {
    padding-left: 36px;
    padding-right: 12px;
}
.message-box-message p {
    margin: 0;
    line-height: 24px;
}
/* 提示按钮 */
.message-box-btns {
    padding: 5px 15px 0;
    text-align: right;
}
.message-btn{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  font-size: 14px;
  padding: 9px 15px;
  border-radius: 3px;
}
.btn-color{
  margin-left: 10px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>