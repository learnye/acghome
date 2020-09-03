<template>
    <div class="divide-style">
        <span class="total">共 {{Count}} 条</span>
        <div class="divide-page" @click="changePage($event)">
          <span class="numbers first">
            <i class="iconfont icon-zuojiantou"></i>
          </span>
          <a href="javascript:;" :class="(page==parseInt(v))?'numbers current':'numbers'" v-for="(v,i) of goodspage" :key="i">{{v}}</a>
          <span class="numbers last">
            <i class="iconfont icon-youjiantou"></i>
          </span>
        </div>
        <span class="page-jump">
            前往
            <div class="input-page">
                <input type="number" @keyup.enter="changeInput($event)" @blur="changeInput($event)" autocomplete="off" min="1" :max="goodspage" :value="page">
            </div>
            页
        </span>
    </div>
</template>
<script>
export default {
    props:['goodspage','Count'],
    data() {
        return {
            page:1,
        }
    },
    methods: {
         // 设置页数跳转函数
    changePage(e) {
      if(e.target.nodeName=="A"){
        this.page=e.target.innerHTML;
      }
      if(e.target==e.currentTarget.getElementsByClassName('first')[0] || e.target==e.currentTarget.getElementsByClassName('icon-zuojiantou')[0]){
        if(this.page>1){
          this.page--;
        }
      }
      if(e.target==e.currentTarget.getElementsByClassName('last')[0] || e.target==e.currentTarget.getElementsByClassName('icon-youjiantou')[0]){
        if(this.page<this.goodspage){
          this.page++;
        }
      }
      this.$emit('getPage',this.page);
    },
    changeInput(e){
      this.page=e.target.value;
      this.$emit('getPage',this.page);
    }
    },
}
</script>
<style>
html{
  user-select: none;
}
input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
<style scoped>

a{
    text-decoration: none;
}
.divide-style{
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    font-size: 13px;
}
.divide-style .total{
    margin-right: 10px;
    font-weight: 400;
    color: #606266;
}
/* 分页栏样式 */
.divide-style .divide-page {
  display: inline-block;
  height: 30px;
  padding: 15px 0;
  text-align: center;
}
.divide-style .divide-page .numbers {
  display: inline-block;
  width: 30px;
  height: 28px;
  margin: 0 5px;
  font-size: 12px;
  font-weight: 200;
  line-height: 28px;
  color: #606266;
  background-color: #f4f4f5;
}
/* 设置左右箭头样式 */
.divide-style .divide-page .iconfont {
  color: #c4b7b4;
  font-size: 20px;
  vertical-align: bottom;
}
.icon-zuojiantou:before {
    content: "\e731";
}
.icon-youjiantou:before {
    content: "\e612";
}
/* 当前页所在的页码样式 */
.divide-style .divide-page .current {
  background-color: #409EFF;
  color: #fff;
}
/* 鼠标移入页码是页码的颜色变化 */
.divide-style.divide-page a.numbers:hover {
  background: #b0b0b0;
  color: #fff;
}
/* 页面跳转样式 */
.divide-style .page-jump{
    margin-left: 24px;
    font-weight: 400;
    color: #606266;
}
.divide-style .page-jump .input-page{
    display: inline-block;
    line-height: 28px;
    padding: 0 2px;
    height: 28px;
    width: 50px;
    /* text-align: center; */
    margin: 0 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 3px;
}
.page-jump .input-page input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    height: 28px;
    padding: 0 5px;
    text-align: center;
}
</style>