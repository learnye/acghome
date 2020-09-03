<template>
    <div>
        <div class="menu-wrapper">
            <div class="home-login">
                <div class="home-icon">
                    <img src="../assets/manage/souye.png" alt="" class="icon">
                </div>
            </div>
            <div class="nav-wrapper">
                    <ul class="nav-ul">
                        <li :class="typeChecked==i?'menu-item active':'menu-item'" v-for="(tb,i) of typeBar" :key="i" @click="changeManage(i)">
                            <div class="item-box">
                                <div class="menu-item-icon"><span :class="tb.image"></span></div>
                                <span>{{tb.name}}</span>
                            </div>
                        </li>
                    </ul>
            </div>
        </div>
        <div class="child-menu-wrapper">
            <div class="child-menu right-animation">
                <ul v-if="typeChecked==0">
                    <router-link to="/Manage">
                        <li class="router-link active">
                            <span class="name">商品管理</span>
                        </li>
                    </router-link>
                </ul>
                <!-- <ul v-else-if="typeChecked==1">
                    <li class="router-link active">
                        <span class="name">订单管理</span>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            typeBar:[{'name':'商品','image':"iconfont icon-shangpin1"}],
            typeChecked:0,
        }
    },
    methods: {
        changeManage(i){
            this.typeChecked=i;
            
        }
    },
}
</script>
<style scoped>
.icon-shangpin1:before {
    content: "\e7ea";
}
/* 左侧栏样式 */
a{
    text-decoration: none;
}
.menu-wrapper {
    height: 100vh;
    background: #333844;
    z-index: 1;
    width: 100px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
}
.menu-wrapper .home-login .home-icon, .menu-wrapper .home-login {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
}
.menu-wrapper .home-login{
    width: 100px;
    height: 80px;
}
.menu-wrapper .home-login .icon{
    width: 45px;
    height: 45px;
}
.menu-wrapper .nav-wrapper .nav-ul li {
    width: 100%;
    min-height: 44px;
    line-height: 44px;
    padding-left: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #c9cfd5;
    cursor: pointer;
    font-size: 12px;
}
.menu-wrapper .nav-wrapper .nav-ul li.active {
    background: #FFFFFF;
    color: #3a8ee6;
}
.menu-wrapper .nav-wrapper .nav-ul .menu-item .menu-item-icon {
    display: inline-block;
    margin-right: 6px;
    height: 20px;
    width: 20px;
    vertical-align: -10%;
}
.menu-wrapper .iconfont{
    font-size: 20px;
}
/* 左侧子栏样式 */
.child-menu-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 100px;
    width: 100px;
    background: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px;
}
.child-menu {
    width: 100px;
    height: 100vh;
    background: #fff;
    -webkit-transform: translateX(-300px);
    transform: translateX(-300px);
    -webkit-transition: all .3s;
    transition: all .3s;
    border-right: 1px solid #eee;
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.right-animation {
    position: relative;
    -webkit-transform: translateX(0);
    transform: translateX(0);
}
.child-menu ul li {
    display: block;
    width: 86px;
    margin-bottom: 8px;
    text-align: center;
    line-height: 38px;
    color: #666;
    cursor: pointer;
}
.child-menu ul .active {
    color: #3a8ee6;
}
</style>