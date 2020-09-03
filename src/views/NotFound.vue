<template>
  <div>
    <myHeader></myHeader>
      <div class="message">
        <img src="../assets/empty_cart.jpg" alt="">
        <p>页面正在开发中,敬请期待!</p>
      </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  width: 50%;
  height: 400px;
  margin: 0 auto;
}
.message img{
  margin: 0 auto;
    display: block;
    width: 25%;

}
.message p{
  margin-top: 10px;
  font-size: 26px;
}
</style>