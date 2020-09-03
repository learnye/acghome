<template>
  <div>
    <div class="title-item title_security_wap title_first">
      <h4 class="title-big dis-inb">绑定</h4>
      <span class="title_item_txt">帐号可用于绑定第三方帐号，可用于直接登录本网站</span>
    </div>
    <div class="third_bindbox c_b" id="sns-bind-panel">
      <dl class="third_area c_b">
        <dt>
          <div class="icon_bind icon_SINA_WEIBO"></div>
        </dt>
        <dd>
          <h3>新浪微博</h3>
          <div class="status_bind">
            <i class="icon_status"></i>
            <span>未绑定</span>
          </div>
          <a href class="th_action_btn bind_del">添加绑定</a>
        </dd>
      </dl>
      <dl class="third_area c_b third_area_binded">
        <dt>
          <div class="icon_bind icon_OPEN_QQ"></div>
        </dt>
        <dd>
          <h3>QQ</h3>
          <div class="status_bind">
            <i class="icon_status"></i>
            <span>已绑定</span>
          </div>
          <a href class="th_action_btn bind_del">解除绑定</a>
        </dd>
      </dl>
      <dl class="third_area c_b">
        <dt>
          <div class="icon_bind icon_WEIXIN"></div>
        </dt>
        <dd>
          <h3>微信</h3>
          <div class="status_bind">
            <i class="icon_status"></i>
            <span>未绑定</span>
          </div>
          <a href class="th_action_btn bind_del">添加绑定</a>
        </dd>
      </dl>
      <dl class="third_area c_b">
        <dt>
          <div class="icon_bind icon_APPLE"></div>
        </dt>
        <dd>
          <h3>Apple</h3>
          <div class="status_bind">
            <i class="icon_status"></i>
            <span>未绑定</span>
          </div>
          <a href class="th_action_btn bind_del">添加绑定</a>
        </dd>
      </dl>
    </div>
    <div class="title-item title_security_wap">
      <h4 class="title-big dis-inb">授权</h4>
      <span class="title_item_txt">您已授权一下应用访问您部分帐号信息</span>
    </div>
    <div id="auth-box" class="third_bindbox c_b">
      <div class="authmsg">暂未授权任何应用访问您的帐号信息</div>
    </div>
    <coming-soon></coming-soon>
  </div>
</template>

<script>
import Comingsoon from "./coming-soon";

export default {
  components: {
    "coming-soon": Comingsoon,
  },
};
</script>

<style>
.title-item {
  color: #666;
}

.title_item_txt {
  margin-left: 10px;
}

.third_bindbox {
  padding-top: 25px;
}

.third_area {
  width: 30%;
  padding-bottom: 50px;
  display: inline-block;
  height: 80px;
  overflow: hidden;
}

.third_area dt {
  float: left;
  margin-right: 8px;
}

.third_area dd {
  padding-right: 10px;
  overflow: hidden;
}

.icon_bind,
.icon_auth {
  display: block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 6px;
  background: url(~@/assets/portal/icon_third.png) 0 0 no-repeat;
}

.icon_SINA_WEIBO {
  background-position: 0px 0;
}

.third_area .status_bind {
  margin: 8px 0;
  height: 19px;
  line-height: 19px;
  overflow: hidden;
}

.icon_status {
  background: url(~@/assets/portal/icon_status.png) 0 0 no-repeat;
  float: left;
  width: 19px;
  height: 19px;
  margin-right: 6px;
  overflow: hidden;
}

.third_area a {
  color: #333;
}

.th_action_btn {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  padding: 0 8px;
  border: 1px solid #d1d1d1;
  font-weight: bold;
  overflow: hidden;
}

.icon_OPEN_QQ {
  background-position: -160px 0;
  /* background: url(~@/assets/portal/icon_third.png) no-repeat; */
}

.third_area_binded .icon_status {
  background-position: -19px 0;
}

.icon_WEIXIN {
  background-position: -560px 0;
  /* background: url(~@/assets/portal/icon_third.png) no-repeat; */
}

.icon_APPLE {
  background-position: -720px 0;
}

.authmsg {
  padding: 40px 0 60px 0;
  text-align: center;
  font-size: 14px;
  color: #666;
}
</style>