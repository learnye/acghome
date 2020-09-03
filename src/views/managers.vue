<template>
  <div class="managersLogin">
    <div class="containt">
      <p class="text-center">伊红美蓝网管理系统</p>
      <input type="text" v-model="uname" class="uname input" placeholder="请输入账号">
      <input type="password" v-model="upwd" class="pwd input" placeholder="请输入密码" @keydown.13="login">
      <div class="remember d-flex justify-content-between">
        <label for="check"><input type="checkbox" class="mr-1" id="check">记住账号</label>
        <router-link to="">忘记密码?</router-link>
      </div>
      <el-button round class="el_button d-block mg_auto mt-2" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uname:'',
      upwd:''
    }
  },
  methods: {
    login(){
      let unameReg=/[a-zA-Z0-9]/;
      let upwdReg=/^\w{6,}/;
      if(this.uname==''){
        // console.log('000')
        this.$message.error({
          message:'账号不能为空',
        })
        
        return false
      }
      if(this.upwd==''){
        // console.log('111')
        this.$message.error({
          message:'密码不能为空',
        })
      }
      if(!(unameReg.test(this.uname))){
        this.$message.error('账号格式不正确');
        return false
      }
      this.axios.get(`/ad_login?adname=${this.uname}&adpwd=${this.upwd}`).then(res=>{
        console.log(res.data)
        if(res.data.code==1){
          this.$message({
            message:'登录成功',
            type:'success'
          })
          this.$router.push('/Manage');
          history.pushState(null, null, document.URL);
                window.addEventListener("popstate",function(e) {  
                    history.pushState(null, null, document.URL);
                }, false);
          this.uname='';
          this.upwd='';
          // setTimeout(() => {
          //   let routeUrl = this.$router.resolve({
          //     path: "/Manage",
          //   });
          //   window.open(routeUrl.href, 'blank');
          // }, 500);
        }else{
          this.$message.error('账号或密码错误')
        }
      })
    }
  },
}
</script>
<style scoped>
  .managersLogin{
    width: 100%;
    height: 800px;
    margin: 0 auto;
    /* border: 1px solid #000; */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: url(../assets/login_img/managers/banner.png) no-repeat top center;
  }
  .containt{
    /* text-align: center; */
    width: 700px;
    height: 500px;
    padding: 40px;
    /* border: 1px solid rgb(54, 42, 122); */
    margin: 50px auto 0;
    background-color: rgba(248, 248, 248, 0.8);
  }
  .containt>p:first-child{
    color: #398afc;
    font-size: 28px;
  }
  .input{
    width: 80%;
    height: 70px;
    font-size: 22px;
    padding-left: 60px;
    display: block;
    margin: 30px auto;
    /* border-radius: 30px; */
    outline: none;
    border: none;
    border-bottom: 2px solid #398afc;
  }
  .uname{
    background: url(../assets/login_img/managers/user.png) no-repeat 10px center;
  }
  .pwd{
    background: url(../assets/login_img/managers/pwd.png) no-repeat 10px center;
  }
  .remember{
    width: 80%;
    margin: 0 auto;
  }
  .el_button{
    height: 60px ;
    width: 80%;
    border: none;
    outline: none;
    margin: 0 auto;
    font-size: 26px;
    color: #fff !important;
    background: #35b0ee !important;
    /* box-shadow: 0 0 12px 1px white inset; */
  }

</style>