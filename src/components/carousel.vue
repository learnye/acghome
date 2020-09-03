<template>
  <!-- left_ul下划线之类的类名为my_css.css文件自定义样式 别的类名为Boot -->
  <div class="my_carousel">
    <div class="imgs">
      <el-carousel trigger="click">
        <el-carousel-item v-for="(item,i) of carousel_images" :key="i">
          <div>
            <router-link to="/">
              <img class="img" :src="item.src" alt="">
            </router-link>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <img src="../assets/index/carousel/banner6.jpg" class="w-100 h-100" alt=""> -->
    <!-- <ul class="left_ul">
      <li v-for="(v,i) of arr_list" :key="i" class="py-2">
        <router-link to="java:script" class="text-white ml-4 td_a d-block w-100 h-100">{{v}}</router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr_list:['手机 电话卡','电视 盒子','笔记本 显示器','家电 插线板','出行 穿戴','智能 路由器','电源 配件','健康 儿童','耳机 音响','生活 箱包'],
      carousel_images:[
        {src:require('../assets/index/carousel/banner1.jpg')},
        {src:require('../assets/index/carousel/banner2.jpg')},
        {src:require('../assets/index/carousel/banner3.jpg')},
        {src:require('../assets/index/carousel/banner4.jpg')}
        ]
    }
  },
}
</script>
<style>
/* 添加 */
  .my_carousel{
    height: 460px;
    /* background-color: rgb(154, 221, 230); */
  }
  .my_carousel>.left_ul{
    width: 20%;
    height: 100%;
    background-color: rgba(110, 101, 101, .7);
    /* opacity: .5; */
    box-sizing: border-box;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    top: -460px;
    padding: 20px 0;
    z-index: 5;
    /* background: url(..); */
  }
  .my_carousel>.left_ul>li:hover{
      background-color: rgba(248, 85, 26,0.9);
  }
  .my_carousel>.left_ul>li{
    cursor: pointer;
    background: url(../assets/index/small_icon/rjiantou.png) no-repeat 90% center;
  }
  .my_carousel.imgs{
    height: 460px;
    width: 100% ! important;
  }
  .my_carousel.el-carousel{
    height: 460px;
  }
  /* .my_carousel.img{
    width: 100%;
    height: 460px;
  } */
  .my_carousel .el-carousel__container{
    height: 460px !important;
  }
  .my_carousel .el-carousel__arrow--left{
    position: relative;
    /* left: 21%; */
  }
  .my_carousel .el-carousel__arrow--left,.my_carousel .el-carousel__arrow--right{
    border-radius: 5%;
    width: 40px;
    height: 80px;
  }
  .my_carousel .el-carousel button{
    border: 0;outline: none;
  }
</style>
  
