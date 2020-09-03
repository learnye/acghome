<template>
  <div class="timer text_center">
    <p class="text-danger mt-5">{{changci}}:00场</p>
    <img src="../assets/index/flashpurchase.png" alt />
    <p class="my-5">{{timerMessage}}</p>
    <div class="time">
      <div>{{h}}</div>
      <div class="text-muted">:</div>
      <div>{{m}}</div>
      <div class="text-muted">:</div>
      <div>{{s}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changci:'',
      h:'',
      m:'',
      s:'',
      timerMessage:'距离结束还有',
      countdown:''
    }
  },
  mounted() {
    
    setInterval(()=>{
      var endtime = new Date(2020, 8, 18, 22, 0, 0)   //月份需要减一
      var hours = endtime.getHours();
      if (hours >= 10) {
        this.changci=hours
      } else {
        this.changci='0'+hours
      }
      var now = new Date();   //获得当前时间
      var timemscha = endtime.getTime() - now.getTime();   //获得毫秒差
      var times = timemscha / 1000;
      // console.log(timemscha)

      var times_f = parseInt(times);

      var ms_day = 3600 * 24 * 1000
      var dayold = timemscha / ms_day  //实际的天数

      var day_f = parseInt(dayold)

      var h = (dayold - day_f) * 24//实际的小时数
      var h_f = parseInt(h)

      var m = (h - h_f) * 60   //实际的分钟数
      var m_f = parseInt(m)

      var s = (m - m_f) * 60;  //实际的秒数
      var s_f = parseInt(s)
      h_f<10?this.h=`0${h_f}`:this.h=h_f
      m_f<10?this.m=`0${m_f}`:this.m=m_f
      s_f<10?this.s=`0${s_f}`:this.s=s_f
      if(this.h == '00' && this.m=='00' && this.s=='00'){
        this.timerMessage='本场已结束'
      }

    },1000);
  },
  methods: {
    
    
  },
  // watch:{
  //   s_f(){
  //     console.log('watch进来')
  //     setInterval(() => {
  //       this.countdown()
  //     }, 1000);
  //   }
  // }

  
}
</script>
<style>
/* 倒计时div样式 */
.Migo .timer {
  width: 20%;
  height: 100%;
  background-color: #f1eded;
}

</style>