<!-- 所有 "-" 类名为Boot类名,  "_" 类名为my_css自定义类名 -->
<template>
    <div class="homePhone">
      <router-link to="">
        <img :src="this.banner.row" alt="" class="my-4" ref="src">
      </router-link>
      <div class="d-flex justify-content-between">
        <h4 class="w-75">{{ptype}}</h4>
        <router-link :to="{path:'/search',query:{ptype:ptype}}" class="my_more pr-4 td_a">
          查看全部
        </router-link>
      </div>
      <div class="content">
        <router-link to="">
          <img :src="this.banner.col" alt="" class="my_shadow">
        </router-link>
        <!-- 手办8张图片 -->
        <ul class="float-right d-flex flex-wrap">
          <router-link :to="`/detail?product_id=${v.pid}`" v-for="(v,i) of resultArrFirst" :key="i" class="td_a text_center">
            <li class="my_shadow my_cursor" >
              <div class="resultArrImg">
                <img :src="v.image" alt="" class="img mt-3 w-100">
              </div>
              <p class="font_m mb-1 mt-3 font-weight-bold">{{v.pname}}</p>
              <p class="font_s">{{v.description}}</p>
              <span class="color_6700">{{v.price}}元</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
  import '../assets/css/HomeFirste.css'
export default{
  props:['resultArrFirst','ptype','banner'],
  data(){
    // console.log(this.banner.row)
    return{
    }
    
  },

}
</script>