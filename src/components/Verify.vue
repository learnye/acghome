<template>
  <div>
    <!-- 整个背景 -->
    <div class="verifyDiv w-100 h-100" v-show="isVerify">

    </div>
    <div ref="verifyConter" class="verifyConter" v-show="isVerify">
      <!-- 整张遮罩层 -->
      <div ref="mask" class="mask">
        <img src="../assets/login_img/cuo.png" alt="" @click="close" class="float-right close">
      </div>
      <!-- 验证成功的遮罩层 -->
      <div class="success_mask" v-show="success_mask"></div>

      <img src="../assets/login_img/resetverify.png" alt="" class="resetverify" @click="changeVerify">

      <!-- 图片区域 -->
      <div class="verifyTop">
        <img ref="verifyImg" :src="verifyImg1" alt="">
        <div ref="move" class="move" :class="{move1:move1}">
          <img ref="verifyImg_left" :src="verifyImg1_left" alt="">
        </div>
        <div ref="fixed" class="fixed">
          <img src="../assets/login_img/verify/gap.png"  :style="{marginLeft:MarginL}" alt="">
        </div>
        
      </div>
      <!-- 滑块区域 -->
      <div class="verifyBottom">
        <!-- <div class="fill"></div> -->

        <div ref="round" class="round" :class="{move1:move1}">
          <img ref="earch" :src="earch1" alt="" class="w-100 h-100">
        </div>
      </div>
    </div>

    <div class="verifyConter_msg" :class="{verifyConter_msg_h:verifyConter_msg_h}">
      <div class="w-75 ml-5">
        <img src="../assets/login_img/verify_true.png" alt="">
        <span class="text-white pl-2">{{HowLong}}</span>
      </div>
    </div>
    

  </div>
</template>

<script>
// import eventBus from '@/eventBus.js'
export default {
  props:['isVerify','MarginL'],
  data() {
    return {
      move1:false, //类名为move1的transition
      verifyConter_msg_h:false,  //高度开局0,已在class中定义
      verifyImg1:require('../assets/login_img/verify/1.png'),
      verifyImg1_left:require('../assets/login_img/verify/left1.png'),
      verifyImg2:require('../assets/login_img/verify/2.png'),
      verifyImg2_left:require(`../assets/login_img/verify/left2.png`),
      earch1:require(`../assets/login_img/earth.png`),
      earch2:require(`../assets/login_img/earthG.png`),
      HowLong:'',
      success_mask:false,
      verifyArr:[
        {big:require('../assets/login_img/verify/1.png'),left:require('../assets/login_img/verify/left1.png')},
        {big:require('../assets/login_img/verify/2.png'),left:require('../assets/login_img/verify/left2.png')},
        {big:require('../assets/login_img/verify/3.png'),left:require('../assets/login_img/verify/left3.png')},
        {big:require('../assets/login_img/verify/4.png'),left:require('../assets/login_img/verify/left4.png')},
      ],
      verifyIndex:0,   //验证码图片的下标
      
    }
  },
  mounted() {
    let verifyImg=this.$refs.verifyImg;
    let verifyImg_left=this.$refs.verifyImg_left;
    let i=Math.floor(Math.random()*this.verifyArr.length)
    verifyImg.src=this.verifyArr[i].big
    console.log(verifyImg.src)
    verifyImg_left.src=this.verifyArr[i].left
  },
  methods: {
    //同时关闭透明背景和中间滑块函数,并传给父组件
    close(){
      this.verifyConter_msg_h=false   //把验证成功的提示框隐藏
       this.success_mask=false   //成功后的遮罩层置false
      // this.HowLong='';  //提示消息置空
      this.$emit('closepop',false) //让父组件关闭
      //关闭滑块框的时候,给父传fallse,要不然 头一次传个true过去后,会一直发axios请求
       this.eventBus.$emit('isaxios',false)
    },
    changeVerify(){
      // console.log("ok")
      let verifyImg=this.$refs.verifyImg;
      let verifyImg_left=this.$refs.verifyImg_left;
      let index=Math.floor(Math.random()*this.verifyArr.length+1);
      // console.log(index)
      ++this.verifyIndex;
      this.verifyIndex==4 && (this.verifyIndex=0);

      verifyImg.src=`${this.verifyArr[this.verifyIndex].big}`;
      verifyImg_left.src=`${this.verifyArr[this.verifyIndex].left}`
      return
    }
  },
  mounted() {
    // console.log(this.MarginL)
    let mask=this.$refs.mask;
    let move=this.$refs.move;
    let round=this.$refs.round;
    this.moveMl="30px"
    mask.onmousedown=(e)=>{
      
      this.move1=false
      var startDate=new Date();
      e.preventDefault();
      let x=e.offsetX;
      let y=e.offsetY;
      // console.log(`点击时--X:${x},点击时--Y:${y}`)
      if((x>=10 && x<=60) && (y>=340 && y<=390)){
        mask.onmousemove=(event)=>{
          // console.log(event.offsetX,event.offsetX)
          // 移动的块左外边距等于两个相减
          move.style.marginLeft=`${event.offsetX-e.offsetX}px`; 
          // console.log(move.style.marginLeft+'//move的左外边距')

          round.style.marginLeft=`${event.offsetX-e.offsetX}px`;
          //以为作比较时,不能以字符串比较,得把PX截掉
          let left_str=move.style.marginLeft.substring(0,move.style.marginLeft.length-2);
          // console.log(left_str+'//转为数字的move的左外边距')
          let round_left_str=round.style.marginLeft.substring(0,round.style.marginLeft.length-2);
          // console.log(round_left_str+'//球球的左外边距')
          let MarginL=Number(this.MarginL.slice(0,-2));
          left_str<=0&&(move.style.marginLeft="0px");
          left_str>=330&&(move.style.marginLeft="330px");
          
          if(round_left_str<=0){
            round.style.marginLeft="0px"
          }
          if(round_left_str>=330){
              // console.log('到了330px了')
            round.style.marginLeft="330px"
          }
          document.onmouseup=(e)=>{
            let stopDate=new Date();
            let dateTime=stopDate-startDate
            let s=Number((dateTime/1000).toFixed(1));
            // console.log(s,typeof s)

            mask.onmousemove='';
            if((left_str>=`${MarginL-6}`) && (left_str<=`${MarginL+6}`)){
              // console.log(left_str+'这是松手时的左边距')
              s<=1.5&&(this.HowLong=`用时${s}s,简直太快了..`);
              s>1.5&&(this.HowLong=`用时${s}s,下次努力哦!`);
              let earch=this.$refs.earch;
              earch.src=this.earch2;
              this.success_mask=true
              // if(s<1){
                // round.style.marginLeft='0px';
                // move.style.marginLeft='0px';
                this.verifyConter_msg_h=true  //把验证成功的提示框显示
                window.setTimeout(()=>{
                  round.style.marginLeft='0px';
                  move.style.marginLeft='0px';
                  earch.src=this.earch1;

                  this.close();  //自动关闭
                  
                },2000)
                window.setTimeout(() => {
                  this.eventBus.$emit('isaxios',true);
                }, 2200);
                document.onmouseup='';
                return
                


              
            }else{
              this.move1=true
              this.eventBus.$emit('isaxios',false);
              move.style.marginLeft='0px';
              round.style.marginLeft='0px';
            }
            return
          }
        }
      }
    }


  },
};
</script>



<style scoped>
/* 白色背景 */
.verifyDiv {
  position: fixed;
  top: 0;
  opacity: 0.5;
  background: #000;
  z-index: 100;
  position: absolute;
}
/* 中间白色区域 */
.verifyConter,.verifyConter_msg{
  /* border-radius: 10px; */
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 400px;
  height: 400px;
  background: rgb(255, 255, 255);
  z-index: 110;
}
.formDiv{
  z-index: -100;
}
/* 验证成功后提示层显示出来 */
.verifyConter_msg{
  height: 0;
  overflow: hidden;
  width: 350px;
  transform: translate(-55%, -50%);
  z-index: 400;
  background: none;
}
.verifyConter_msg_h{
  height: 40px;
  transition: height .3s linear;
  margin-top: -90px;
  margin-left: 15px;
  padding: 0;
}
.verifyConter_msg>div:first-child{
  text-align: center;
  line-height: 50px;
  height: 40px;

}
.verifyTop {
  width: 100%;
  height: 320px;
  z-index: 1;
  /* background-color: rgb(57, 226, 212); */
  /* background: url(../../assets/login_img/verify/big2.png) no-repeat center center; */
  position: relative;
}

/* ×样式 */
.verifyTop .close {
  cursor: pointer;
  width: 20px;
}
.verifyTop .move{
  width: 50px;height: 50px;
  /* background-color: #fddc01; */
  /* background: url(../../assets/login_img/verify/left2.png); */
  position: absolute;
  top: 50%;
  transform: translate(0%,-50%);
  z-index: 10;
}
.verifyTop .fixed{
  width: 50px;height: 50px;
  /* background-color: rgb(12, 10, 10);  */
  position: absolute;
  top: 50%;left: 7%;
  transform: translate(-50%,-50%);
  z-index: 9;
}
.verifyConter .mask{
  width: 380px;height: 380px;
  margin: auto;
  position: absolute;
  
  /* float: left; */
  z-index: 201;

}
.success_mask{
  width: 95%;height: 80%;
  position: absolute;
  background-color: rgba(12, 12, 12, 0.6);
  z-index: 200;
}
.verifyBottom {
  z-index: 2;
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 30px;
  position: relative;
  /* border: 1px solid blue; */
  background-color: rgb(240, 238, 238);
}
.verifyBottom .round{
  width: 50px;height: 100%;
  position: absolute;
  /* margin-left: 275px; */
  /* background-color: rgb(39, 247, 67); */
  /* background: url(../../assets/login_img/earth.png) no-repeat center; */
  border-radius: 30px;
  display: inline-block;
  z-index: 250;
}
/* 刷新按钮 */
.resetverify{
  /* cursor: pointer; */
  position: absolute;
  right: 4%;
  bottom: 4%;
  /* 比mask201底就行 */
  z-index: 202; 
}
.move1{
  transition: all .5s linear;
}
</style>