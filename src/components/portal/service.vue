<template>
  <div class="service-box service-main-box">
    <div class="service-content-box order-list-box">
      <div class="box-hd">
        <h1 class="title">我的服务单</h1>
        <div class="more clearfix">
          <ul class="filter-list">
            <li class="first active">
              <a href>全部有效服务单</a>
            </li>
            <li>
              <a href>退货单</a>
            </li>
            <li>
              <a href>换货单</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="box-bd">
        <p class="empty">当前没有服务单哦~</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

.service-main-box {
    padding: 36px 0;
}
.service-box {
    background: #fff;
}

.service-content-box .box-hd .title {
    margin: 0;
    font-size: 36px;
    font-weight: 400;
    line-height: 68px;
    color: #b0b0b0;
}

.content-box {
  margin: 0 48px;
}

.box-hd .title {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
}

.box-hd small {
  margin-left: 10px;
  font-size: 12px;
  line-height: 1.5;
}

.box-hd small a {
  color: #757575;
}
</style>