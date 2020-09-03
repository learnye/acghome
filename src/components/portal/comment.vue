<template>
  <div class="uc-comment-box">
      <div class="box">
        <h1>订单评价</h1>
            <div class="comment-box">
                <div class="comment-list">
                    <p class="empty">暂时没有符合条件的商品</p>
                </div>
            </div>
      </div>    
  </div>
</template>

<script>
export default {
    name:"comment",
}
</script>

<style scoped>
.uc-comment-box {
    background: #fff;
    padding: 20px 0;
}

.box{
    margin: 0 48px;
}

.uc-comment-box .box h1{
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    line-height: 68px;
    color: #757575;
}

.comment-box {
    margin-top: 15px;
}

.comment-list .empty{
    font-size: 18px;
    text-align: center;
    color: #b0b0b0;
    margin: 40px 0;
}
</style>