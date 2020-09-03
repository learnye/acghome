<template>
  <div id="pic360">
    <a href="javascript:window.history.go(-1);">返回商品页</a>
    <div class="pic_container" ref="pic360">
      <img v-for="(item,index) of imgs" v-show="index==imgNow" :key="index" :src="item" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgNow: 0,
      Timer: "",
    };
  },
  mounted() {
    var pic360 = this.$refs.pic360;
    pic360.onmousedown = (event) => {
      event.preventDefault();
      var x1 = event.clientX;
      var imgnow = this.imgNow;
      document.onmousemove = (event) => {
        clearInterval(this.Timer);
        var x2 = event.clientX;
        this.imgNow = (48000 + imgnow - parseInt((x2 - x1) / 10)) % 48;
      };
      document.onmouseup = () => {
        document.onmousemove = "";
      };
    };
    this.Timer = setInterval(() => {
      this.imgNow = (48000 + this.imgNow + 1) % 48;
    }, 40);
  },
  computed: {
    imgs() {
      var imgs = [];
      for (var i = 1; i <= 48; i++) {
        imgs.push(require("../assets/360/2815647_360_" + i + ".jpg"));
      }
      return imgs;
    },
  },
  methods: {},
};
</script>

<style scoped>
/* 添加了scope */
#pic360 a {
  top: 10px;
  left: 30px;
  width: 100px;
  height: 40px;
  color: #777777;
  line-height: 40px;
  position: absolute;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  background-color: #f3f3f3;
}

#pic360 .pic_container {
  width: 600px;
  height: 800px;
  margin: 50px auto;
  overflow: hidden;
  position: relative;
}

#pic360 img {
  width: 100%;
  left: 50%;
  top: 50%;
  position: absolute;
  margin-left: -300px;
  margin-top: -400px;
}
</style>