<template>
  <div id="verify-faile">
    <div class="bg"></div>
    <div class="msg-box">
      <div class="text">页面开发中 敬请期待~</div>
      <div class="button">
        <a href="/security/profile">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#verify-faile {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  /* display: none; */
}

#verify-faile .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  opacity: 0.7;
  background-color: #aaa;
}

#verify-faile .msg-box {
  width: 560px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -280px;
  margin-top: -100px;
  background-color: #fff;
}

.msg-box .text {
  position: absolute;
  text-align: center;
  top: 56px;
  font-size: 18px;
  color: #585858;
  width: 560px;
}

.msg-box .button {
  position: absolute;
  text-align: center;
  top: 100px;
  width: 120px;
  height: 40px;
  color: #333;
  border: 1px solid #dadada;
  left: 50%;
  margin-left: -61px;
  cursor: pointer;
  line-height: 40px;
  font-size: 16px;
  border-radius: 1px;
}
</style>