<template>
  <div class="home_row w-100 mt-3">
    <div class="d-flex h-100 justify-content-between">
      <div class="row_left">
        <ul class="d-flex flex-wrap w-100 h-100 mg_auto">
          <li class="home_row_ul_item text_center" v-for="(v,i) of arrSix" :key="i">
            <router-link to="" class="td_a text-white">
              <img :src="v.src" alt="">
              <span class="font_s d-block pt-1">{{v.msg}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="row_right d-flex justify-content-between">
        <router-link to="" v-for="(v,i) of arrThreeImg" :key="i"><img :src="v.src" alt=""></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrSix:[
        {src:require('../assets/index/small_icon/six1.png'),msg:'限时秒杀'},
        {src:require('../assets/index/small_icon/six2.png'),msg:'企业团购'},
        {src:require('../assets/index/small_icon/six3.png'),msg:'F码通道'},
        {src:require('../assets/index/small_icon/six4.png'),msg:'置换卡'},
        {src:require('../assets/index/small_icon/six5.png'),msg:'旧货换新'},
        {src:require('../assets/index/small_icon/six6.png'),msg:'会员折扣'},
      ],
      arrThreeImg:[
        {src:require('../assets/index/banner1_m.png')},
        {src:require('../assets/index/banner2_m.png')},
        {src:require('../assets/index/banner3_m.png')}
      ],
      
    }
  },
  
}
</script>

<style>
  .home_row{
    height: 170px;
    width: 1226px;
    /* background-color: red; */
  }
  .home_row .row_left{
    width: 20%;
    background-color:#555;
    height: 100%;
  }
  .home_row .row_right{
    width: 79%;
    /* background-color: cadetblue; */
  }
  .home_row .row_right>a{
    display: inline-block;
    height: 100%;
  }
  .home_row .home_row_ul_item{
    height: 50%;
    width: 33%;
    color: #ddd;
    /* border: 1px solid #000; */
    padding: 22px 8px 0;
  }
  .home_row .home_row_ul_item>a>img{
    width: 24px;
  }
</style>