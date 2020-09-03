<template>
  <div class="searchBar">
    <!-- 分类导航开始 -->
    <div class="bar-container">
      <router-link to="/" ><span @click="clear_keyword">首页</span></router-link>
      <span class="sep">></span>
      <a href="javascript:;">全部结果</a>
      <span class="sep">></span>
      <span>手办</span>
    </div>
    <!-- 分类导航结束 -->
    <!-- 全部分类详情开始 -->
    <div class="search-filter">
      <div class="filter-wrap">
        <div class="filter-list">
          <ul class="item show-less">
            <span class="label">分类：</span>
            <li :class="t1==i?'active':''" v-for="(t0,i) of type0" :key="i">
              <a href="javascript:;" @click="changeType(t0,i)" v-cloak>{{t0}}</a>
            </li>
          </ul>
          <ul class="item show-less">
            <span class="label">生产厂家：</span>
            <li :class="t2==i?'active':''" v-for="(fac,i) of factory" :key="i">
              <a href="javascript:;" @click="changeFac(fac,i)">{{fac}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 全部分类详情结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      t1:0,
      t2:-1,
      type0:['全部','比例人形','粘土人','可动手办'],
      factory:['良笑社','F:NEX','GSR','世嘉','TAITO','FREEing','Alphamax','万代','MegaHouse','Max Factory','APEX-TOYS'],
    };
  },
  methods: {
    // 点击分类改变点击样式并将对应值传给my-searchBody组件
    changeType(type,i){
      // 将类型保存在add中
      this.eventBus.$emit('add',type);
      // 改变t1的值与点击按钮对应
      this.t1=i;
    },
    changeFac(factory,i){
      if(this.t2==i){
        this.eventBus.$emit('factory',"");
        this.t2=-1;
      }else{
        this.eventBus.$emit('factory',factory);
        this.t2=i;
      }
    },
    clear_keyword(){
      console.log(1);
      let data="";
      this.$store.commit('change_keyword_mutation',data);
    }
  },
  created(){
    this.eventBus.$on('back_ptype',data=>{
        this.type0.forEach((element,index) => {
          if(element==data){
            this.t1=index;
          }
      });
    });
  },
};
</script>
<style scoped>
[v-cloak]{
  display:none;
}
.searchBar {
  width: 100%;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  background: #f5f5f5;
}
/* 给a标签设置标准样式 */
.searchBar,
.searchBar a {
  text-decoration: none;
  color: #757575;
}
/* 给container宽度 */
.searchBar .bar-container {
  width: 1226px;
  /* width: 64.4%; */
  margin: 0 auto;
}
.searchBar .bar-container .sep {
  margin: 0 6px;
  color: #b0b0b0;
}
.searchBar .search-filter {
  background: #fff;
  height: auto;
}
.searchBar .search-filter .filter-wrap {
  margin: auto;
  width: 1226px;
  padding: 18px 0;
}
.searchBar .search-filter .filter-list {
  position: relative;
}
/* 分类详情下ul的样式 */
.searchBar .search-filter .filter-list .item {
  position: relative;
  overflow: hidden;
  border-top: 1px solid #ededed;
  padding: 0 60px 0 124px;
  margin: 0;
  list-style: none;
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
}

/* 定义每个分类ul高度 */
.searchBar .search-filter .filter-list .item.show-less {
  /* height: 48px; */
  height: auto;
}

.searchBar .search-filter .filter-list>.item:first-child {
  border-top: none;
}
/* 类label和more-btn群组选择器 */
.searchBar .search-filter .filter-list .label,
.searchBar .search-filter .filter-list .more-btn {
  position: absolute;
  height: 20px;
  line-height: 20px;
  padding: 14px 0;
  font-size: 14px;
}
/* label类样式 */
.searchBar .search-filter .filter-list .label {
  top: 0;
  left: 0;
  color: #b0b0b0;
}
/* span标签样式 */
.searchBar .search-filter .filter-list .more-btn {
  cursor: pointer;
  color: #757575;
  right: 0;
  top: 0;
}
.searchBar .search-filter .filter-list .item li {
  text-overflow: ellipsis;
  overflow: hidden;
  color: #424242;
  font-size: 14px;
  width: 148px;
  padding: 14px 0;
  line-height: 20px;
}
/* 设置点击后激活的颜色样式 */
.searchBar .search-filter .filter-list .item li.active a {
  color: #ff6700;
}
/* 鼠标移动到对应a标签后颜色样式 */
.searchBar .search-filter .filter-list .item li a:hover {
  color: #ff6700;
}
/* 矢量图标样式 */
.searchBar .search-filter .filter-list .item .iconfont {
  display: inline-block;
  color: #ccc;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  font-size: 6px;
}
</style>
    