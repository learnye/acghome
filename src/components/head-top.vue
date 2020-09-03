<template>
    <div class="common-header">
        <div class="breadcrumb1">
            <div class="baseInfo">
                <span class="name">{{info}}</span>
            </div>
            <div class="header-navbar">
                <div class="header-navbar-icon">
                    <span class="ml4">
                        <span class="iconfont icon-avatar"></span>

                    </span>
                    <span class="text ml4">admin，欢迎您！</span>
                </div>
                <div class="header-navbar-icon">
                    <span class="gray">|</span>
                </div>
                <a href="javascript:;" @click="showUpd" class="header-navbar-icon link">
                    <span class="text">修改密码</span>
                </a>
                <a href="javascript:;" @click="loginout" class="header-navbar-icon login-out link">
                    <span class="iconfont icon-tuichuzhuanhuan"></span>
                    <span class="text ml4">退出</span>
                </a>
            </div>
        </div>
        <div ref="upd" class="message-box-wrapper">
          <div class="message-box">
            <div class="message-box-header">
              <div class="message-box-title">
                <span>修改密码</span>
              </div>
              <button class="message-box-headerbtn" @click="cancleUpd">
                <i class="iconfont icon-quxiao"></i>
              </button>
            </div>
            <div class="message-box-body">
                <div class="input-item is-require">
                    <label for="product_pwd1" class="label">原始密码：</label>
                    <div class="item-content">
                        <input v-model="pwd1" type="password" id="product_pwd1" autocomplete="off" class="input-inner">
                    </div>
                </div>
                <div class="input-item is-require">
                    <label for="product_pwd2" class="label">新密码：</label>
                    <div class="item-content">
                        <input v-model="pwd2" type="password" id="product_pwd2" autocomplete="off" class="input-inner">
                    </div>
                </div>
                <div class="input-item is-require">
                    <label for="product_pwd3" class="label">确认密码：</label>
                    <div class="item-content">
                        <input v-model="pwd3" type="password" id="product_pwd3" autocomplete="off" class="input-inner">
                    </div>
                </div>
              <div></div>
              <div></div>
            </div>
            <div class="message-box-btns">
              <button class="message-btn" @click="cancleUpd">
                <span>取消</span>
              </button>
              <button class="message-btn btn-color" @click="updateInfo" >
                <span>确认</span>
              </button>
            </div>
          </div>
        </div> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            pwd1:"",
            pwd2:"",
            pwd3:"",
            info:'商品',
        }
    },
    methods: {
        showUpd(){
            this.$refs.upd.style="display:block";
        },
        cancleUpd(){
            this.$refs.upd.style="display:none";
        },
        updateInfo(){
            if( this.pwd2==this.pwd3){
                if(this.pwd1!="" && this.pwd2!="" && this.pwd3!=""){
                    let data=`pwd1=${this.pwd1}&pwd2=${this.pwd2}`;
                    this.axios.put('/update_pwd',data).then(res=>{
                        if(res.data.code==1){
                        console.log('success');
                        this.$refs.upd.style="display:none";
                        }else{
                        console.log('error');
                        }
                    })
                }
            }
        },
        loginout(){
            this.$router.push('/');
            this.defaultBack();
        },
        defaultBack(){
            history.pushState(null, null, document.URL);
                window.addEventListener("popstate",function(e) {  
                    history.pushState(null, null, document.URL);
                }, false);
        }
    },
    mounted(){
       this.defaultBack();    
    }
}
</script>
<style scoped>
.icon-quxiao:before {
    content: "\e606";
}
a{
    text-decoration: none;
}
.common-header {
    height: 48px;
    border-bottom: 1px solid #eee;
    background: #fff;
    line-height: 48px;
}
.common-header, .common-header-index {
    padding-left: 20px;
    font-size: 14px;
    box-sizing: border-box;
}
.common-header .breadcrumb1 {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.breadcrumb1 .baseInfo {
    font-weight: bold;
    font-size: 16px;
}
.common-header .header-navbar {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.common-header .header-navbar-icon {
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
}
.icon-tuichuzhuanhuan:before {
    content: "\e604";
}
.common-header .header-navbar-icon .text {
    color: rgb(70, 79, 101);
}
.common-header .ml4 {
    margin-left: 4px;
}
.common-header .icon{
    width: 20px;
    height: 20px;
}
.common-header .ml4 .icon-avatar,.common-header .icon-tuichuzhuanhuan{
    font-size: 21px;
}
.common-header .icon-tuichuzhuanhuan{
    color: red;
}
.common-header .gray {
    color: #CCCCCC;
}
/* 提示框样式 */
.message-box-wrapper {
    z-index: 2013;
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
    margin-top: 15vh;
    width: 30%;
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
    top: 0px;
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
.message-box-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
.input-item{
    display: flex;
    margin-bottom: 18px;
}
.input-item .label{
    display: inline-block;
    text-align: right;
    vertical-align: middle;
    font-size: 12px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 130px;
    line-height: 32px;
}
.is-require>label::before{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
}
/* 密码输入框样式 */
.input-item .item-content{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    max-width: 460px;
}
.item-content .input-inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    height: 32px;
    line-height: 32px;
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