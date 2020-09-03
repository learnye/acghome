<template>
  <div class="Migo mt-5">
    <div class="d-flex justify-content-between">
      <h4 class="w-75">限时闪购</h4>
      <ul class="pointer">
        <li></li>
        <li></li>
      </ul>
    </div>

    <div class="d-flex justify-content-between">
      <Timer></Timer>
      <div class="small_carousel">
        <ul class="w-100 h-100 migoUl">
          <li class="border_1" v-for="(v,i) of arrCarousel" :key="i">
            <div>
              <router-link to class="td_a">
                <img :src="v.src" alt />
                <p class="text-dark font_m mt-2">{{v.title}}</p>
                <p class="text-muted font_s">{{v.introduce}}</p>
                <span class="color_6700">
                  {{v.newPrice}}元
                  <s class="text-muted ml-1">{{v.oldPrice}}</s>
                </span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/MiGo.css";
import Timer from "./Timer";
export default {
  components: {
    Timer,
  },
  data() {
    return {
      arrCarousel: [
        {
          src: require("../assets/index/middle_carousel/200x200-1.png"),
          title: "魔法未来 2017ver.",
          introduce: "价格实惠，人气超高",
          newPrice: "999",
          oldPrice: "1299",
        },
        {
          src: require("../assets/index/middle_carousel/200x200-2.png"),
          title: "初音未来 Natural",
          introduce: "价格实惠，人气超高",
          newPrice: "2099",
          oldPrice: "2299",
        },
        {
          src: require("../assets/index/middle_carousel/200x200-3.png"),
          title: "figma 少女前线 UMP45",
          introduce: "价格实惠，人气超高",
          newPrice: "1399",
          oldPrice: "1599",
        },
        {
          src: require("../assets/index/middle_carousel/200x200-4.png"),
          title: "少女前线 G41 初始皮肤",
          introduce: "价格实惠，人气超高",
          newPrice: "1599",
          oldPrice: "1999",
        },
      ],
    };
  },
};
</script>
<style>
.Migo .migoUl li:first-child {
  border-top: 1px solid rgb(255, 81, 81);
}
.Migo .migoUl li:nth-child(2) {
  border-top: 1px solid rgb(57, 253, 139);
}
.Migo .migoUl li:nth-child(3) {
  border-top: 1px solid rgb(255, 84, 41);
}
.Migo .migoUl li:nth-child(4) {
  border-top: 1px solid rgb(78, 58, 253);
}
</style>
