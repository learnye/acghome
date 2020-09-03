<template>
<div class="uc-box uc-main-box">
<div class="uc-content-box">
    <div class="box-hd">
        <h1 class="title">消息通知</h1>
        <div class="more clearfix">
            <ul class="filter-list">
                <li class="first active">
                    <a href="">全部消息</a>
                    <span class="num"></span>
                </li>
                <li>
                    <a href="">物流动态</a>
                </li>
                <li>
                    <a href="">特惠活动</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="box-bd">
        <div class="empty" type="all">
            暂无数据
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.uc-box {
    padding: 36px 48px;
    background: #fff;
}

.box-hd .title {
    margin: 0;
    font-size: 30px;
    font-weight: 400;
    line-height: 68px;
    color: #757575;
}

.box-hd .more {
    border-bottom: 1px solid #e0e0e0;
}

.box-hd .filter-list {
    float: left;
    margin: 0;
    padding: 18px 0;
    list-style-type: none;
    font-size: 16px;
    line-height: 1.25;
}

.box-hd .filter-list li.first {
    padding-left: 0;
    border-left: 0;
}

.box-hd .filter-list li{
    float: left;
    padding: 0 20px;
    border-left: 1px solid #e0e0e0;
    color: #757575;
}

.box-hd .filter-list li.active, .box-hd .filter-list li.active a {
    color: #ff6700;
}

.box-bd .empty {
    margin: 40px 0;
    font-size: 18px;
    text-align: center;
    color: #b0b0b0;
}
</style>