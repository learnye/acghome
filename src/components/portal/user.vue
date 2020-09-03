<template>
  <div class="uc-box uc-main-box">
    <div class="uc-content portal-content-box">
      <div class="box-bd">
        <div class="portal-main clearfix">
          <!-- 个人名片 -->
          <div class="user-card">
            <h2 class="username">{{userName}}</h2>
            <p class="tip">{{sayhi}}</p>
            <a href="/security/password" target="_blank" class="link">修改个人信息 ></a>
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/6472532d-6a64-47c9-8ee5-1805a1095d38.jpg"
              alt
              class="avatar"
            />
          </div>

          <!-- 账号状态 -->
          <div class="user-actions">
            <ul class="action-list">
              <!-- 根据用户详细信息改变样式 -->
              <li>
                账户安全：
                <span class="level level-3">{{level}}</span>
              </li>
              <li>
                绑定手机：
                <span class="tel">{{Phone}}</span>
              </li>
              <li>
                绑定邮箱：
                <span class="mail">{{eMaile}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="portal-sub">
          <ul class="info-list clearfix">
            <li>
              <h3>
                待支付的订单：
                <span class="num">0</span>
              </h3>
              <a href="/orderlist">
                查看待支付的订单
                <i class="iconfont"></i>
              </a>
              <img src="~@/assets/portal/portal-icon-1.png" alt />
            </li>
            <li>
              <h3>
                待收货的订单：
                <span class="num">0</span>
              </h3>
              <a href="/orderlist">
                查看待收货的订单
                <i class="iconfont"></i>
              </a>
              <img src="~@/assets/portal/portal-icon-2.png" alt />
            </li>
            <li>
              <h3>
                待评价的商品：
                <span class="num">0</span>
              </h3>
              <a href="/comment">
                查看待评价的商品
                <i class="iconfont"></i>
              </a>
              <img src="~@/assets/portal/portal-icon-3.png" alt />
            </li>
            <li>
              <h3>
                喜欢的商品：
                <span class="num">0</span>
              </h3>
              <a href="/favogoods">
                查看喜欢的商品
                <i class="iconfont"></i>
              </a>
              <img src="~@/assets/portal/portal-icon-4.png" alt />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "user",
  data() {
    return {
      userInfo:[],
      userName: "张三",
      Phone: "133******01",
      eMaile: "12******9@q*.com",
      level: "较高",
      sayhi:'',
    };
  },
  methods: {
    currentTime() {
            setInterval(this.getDate, 500);
        },
    getDate(){
      let hh = new Date().getHours();
      if(hh>=0 && hh<=10){
        this.sayhi='早上好~'
      }else if(hh>10 && hh<=14 ){
        this.sayhi='中午好~'
      }else if(hh>14 && hh<=18){
        this.sayhi='下午好~'
      }else if(hh>18 && hh<=24){
        this.sayhi='晚上好~'
      }
    }
    
  },
  mounted(){
    this.currentTime()
  },

  beforeDestroy:function(){
    if (this.getDate) {
            console.log("销毁定时器")
            clearInterval(this.getDate);
        }
  }
};
</script>

<style>
.uc-box {
  background: #fff;
}

.uc-main-box {
  padding: 36px 48px;
}

.user-card img {
  width: 150px;
  height: 150px;
  border: 0;
}

.portal-content-box .portal-main {
  padding-top: 24px;
}

.clearfix:after,
.clearfix:before {
  content: " ";
  display: table;
}

.clearfix:after {
  clear: both;
}

.portal-content-box .user-card {
  position: relative;
  float: left;
  width: 302px;
  height: 160px;
  padding-left: 180px;
  padding-top: 40px;
}

.portal-content-box .user-card .username {
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  color: #616161;
}

.portal-content-box .user-card .tip {
  margin: 0 0 10px;
  color: #b0b0b0;
}

.portal-content-box .user-card .link {
  font-size: 12px;
  color: #ff6700;
}

.portal-content-box .user-card .avatar {
  position: absolute;
  left: 0;
  top: 0;
  padding: 4px;
  border: 1px solid #e0e0e0;
  border-radius: 150px;
}

.portal-content-box .user-actions {
  float: right;
  width: 358px;
  margin-top: 35px;
}

.portal-content-box .user-actions .action-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  color: #757575;
}

.portal-content-box .user-actions .action-list li {
  position: relative;
  padding: 6px 0;
}

.portal-sub {
  border-top: 1px solid #e0e0e0;
}

.portal-sub .info-list {
  margin: 0;
  padding: 60px 0 0;
  list-style-type: none;
  color: #757575;
}

.portal-sub .info-list li {
  position: relative;
  float: left;
  width: 276px;
  height: 65px;
  padding-left: 112px;
  padding-top: 15px;
  margin-left: 14px;
  margin-bottom: 80px;
}

.portal-sub .info-list h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
}

.portal-sub .info-list .num {
  color: #ff6700;
}

.portal-sub .info-list img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: -10px;
  top: -10px;
}

.portal-sub .info-list .iconfont {
  font-size: 12px;
  line-height: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}

.iconfont:before {
  content: "\e603";
}

.level-1 {
  color: red;
}

.level-2 {
  color: #ffac13;
}

.level-3 {
  color: #83c44e;
}

a {
  color: #757575;
}
</style>