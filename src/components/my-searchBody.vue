<template>
  <div class="search-body">
    <div class="result-order">
      <!-- 商品分类排序开始 -->
      <div class="order-list-box">
        <div>
          <ul class="order-list">
            <li :class="check==i?'order-item active':'order-item'"  v-for="(order,i) of orderList" :key="i">
              <a href="javascript:;" @click="allProduct(order,i)">
                {{order}}<!---->
                <i v-show="order=='价格'" :class="orderflag==0?'iconfont icon-xiajiantou':'iconfont icon-changjiantou1'"></i>
                </a>
            </li>
          </ul>
        </div>
        <div>
          <ul class="type-list">
            <li class="address-choose">
              <span class="label">收货地</span>
              <!-- <a href="#">
                <span class="address-show address-info">北京 北京市</span>
              </a> -->
              <div class="inline-place">
              <Dropdown :locaty="city" ></Dropdown>
              </div>
            </li>
            <li>
              <a href="javascript:;" @click="iconChecked">
                <span :class="iconflag==true?'checkbox checkbox-checked':'checkbox'">
                  <i class="iconfont icon-gou"></i>
                </span>
                <!-- -->
                促销
              </a>
            </li>
            <li>
              <a href="javascript:;" @click="iconChecked1">
                <span :class="iconflag1==true?'checkbox checkbox-checked':'checkbox'">
                  <i class="iconfont icon-gou"></i>
                </span>
                <!-- -->
                仅看有货
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品分类排序结束 -->
      <!-- 商品显示开始 -->
      <div class="goods-list-box">
        <div class="goods-list">
          <div class="goods-item" v-for="(item,i) of goods" :key="i">
            <!-- 商品图片开始 -->
            <div class="figure figure-img">
              <router-link :to="{path:'/detail',query:{product_id:item.pid}}">
                <img :src="item.image" alt />
              </router-link>
            </div>
            <!-- 商品图片结束 -->
            <!-- 商品名称开始 -->
            <h2 class="title">
              <router-link :to="{path:'/detail',query:{product_id:item.pid}}">{{item.pname}}</router-link>
            </h2>
            <!-- 商品名称结束 -->
            <!-- 商品价格开始 -->
            <p class="price">
              <span>{{item.price.toFixed(2)}}元</span>
            </p>
            <!-- 商品价格结束 -->
          </div>
        </div>
        <!-- 分页栏开始 -->
        <div class="divide-page" v-show="goodspage>1" @click="changePage($event)">
          <span class="numbers first">
            <i class="iconfont icon-zuojiantou"></i>
          </span>
          <a href="javascript:;" :class="(page==parseInt(v))?'numbers current':'numbers'" v-for="(v,i) of goodspage" :key="i">{{v}}</a>
          <span class="numbers last">
            <i class="iconfont icon-youjiantou"></i>
          </span>
        </div>
        <!-- 分页栏结束 -->
        <!-- 查找失败时界面开始 -->
        <div class="empty-list" v-show="onshow">
            <img src="../assets/icon-search-empty.png" alt="" class="search-icon">
            <p class="empty">对应筛选条件下没有找到商品，换个筛选条件吧</p>
            <div class="btn" @click="init">重置筛选条件</div>
        </div>
        <!-- 查找失败时界面结束 -->
      </div>
      <!-- 商品显示结束 -->
    </div>
  </div>
</template>
<script>
// 1. 首先在父组件中引入地区数据
import city from '../assets/ssq.json'
// 2. 引入下拉框组件
import Dropdown from '../components/Dropdown'
export default {
  name: 'Uregister',
    components : { // 3. 注册下拉框组件
        Dropdown
    },
  data() {
    return {
      city:city,//保存城市数据
      orderList:['综合','销量','价格'],
      check:0,//设置点击排序样式
      iconflag:false,//促销图标显示
      iconflag1:false,//仅看有货图标显示
      goodspage: "",//商品页数
      goods: [],//保存商品的数组
      page:1,//商品页数
      limit:12,//每页商品数量
      Ptype:"",//商品分类
      Pmanu:"",//商品生产厂家
      orderBy:"",//商品通过类型排序
      pdisc:"",//商品折扣
      ptotal:"",//商品库存
      order:"",//商品升序或降序
      keyword:"",//关键词
      orderflag:0,//设置升序 1 和降序 0 标识符
      onshow:false,//设置搜索不到相关商品是样式显示和隐藏
    };
  },
  methods: {
      // 默认数据分页获取函数
    movePage(){
        // 获取全部商品路由，传入页数
        window.scrollTo(0, 0);
        this.axios.get('/prolist',{
          params:{
            page:this.page,
            limit:this.limit,
            orderby:this.orderBy,
            order:this.order,
          }
        }).then(res=>{
          this.goods=[];
          this.goodspage=res.data.pageCount;
          let data=res.data.prolist;
          // console.log(data);
          // console.log(data[0].image.split(","));
          if(data){
          this.onshow=false;
          data.forEach(item=>{
                    if(item.image.split(",")[1] !==null){
                        //属性重新赋值
                        item.image=require('../assets/image/products/'+item.image.split(",")[0]);
                    }else{
                        item.image=require('../assets/image/products/'+item.image);
                    }
                    this.goods.push(item);
                });
          }else{
            this.onshow=true;
          }
        });
    },
    // 根据商品分类显示函数
    changeType(){
      window.scrollTo(0, 0);
      // 获取分类商品路由，传入页数和类别
        this.axios.get('/prolist_search',{
          params:{
            page:this.page,
            ptype:this.Ptype,
            pmanu:this.Pmanu,
            limit:this.limit,
            keyword:this.keyword,
            orderby:this.orderBy,
            pdisc:this.pdisc,
            ptotal:this.ptotal,
            order:this.order,
          }
        }).then(res=>{
          this.goods=[];
          this.goodspage=res.data.pageCount;
          let data=res.data.prolist
          if(data){
            this.onshow=false;
            data.forEach(item=>{
                    if(item.image.split(",")[1] !==null){
                        //属性重新赋值
                        item.image=require('../assets/image/products/'+item.image.split(",")[0]);
                    }else{
                        item.image=require('../assets/image/products/'+item.image);
                    }
                    this.goods.push(item);
                });
              console.log(this.goods);
          }else{
            this.onshow=true;
          }
        });
    },
    // 设置页数跳转函数
    changePage(e) {
      if(e.target.nodeName=="A"){
        this.page=e.target.innerHTML;
        this.goods=[];
        if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
        
      }
      if(e.target==e.currentTarget.getElementsByClassName('first')[0] || e.target==e.currentTarget.getElementsByClassName('icon-zuojiantou')[0]){
        if(this.page>1){
          this.page--;
          this.goods=[];
          if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
        }
      }
      if(e.target==e.currentTarget.getElementsByClassName('last')[0] || e.target==e.currentTarget.getElementsByClassName('icon-youjiantou')[0]){
        if(this.page<this.goodspage){
          this.page++;
          this.goods=[];
          if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
        }
      }
    },
    // 重置筛选条件函数
    init(){
      let path = this.$route.path; //先获取路由路径
      this.$router.push(path); //再跳转路由路径，query参数没带过去，所以被清除了
      this.$router.go(0);
    },
    // 设置全部
    allProduct(order,i){
      this.page=1;
      this.goods=[];
      if(order=='综合'){
        this.orderBy="plike";
        this.orderflag=0;
      }else if(order=="销量"){
        this.orderBy="psold";
        this.orderflag=0;
      }else if(order=="价格"){
        if(this.orderflag==0){
          this.order='desc';
          this.orderflag=1;
        }else{
          this.order='asc';
          this.orderflag=0;
        }
        this.orderBy="sprice";
      }
      if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
      this.check=i;
    },
    // 勾选函数
    iconChecked(){
      this.page=1;
        this.goods=[];
        if(this.iconflag==false){
          this.iconflag=true;
          this.pdisc=1;
        }
        else{
          this.iconflag=false;
          this.pdisc="";
        }
        if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
        
    },
    iconChecked1(){
      this.page=1;
      this.goods=[];
      if(this.iconflag1==true){
        this.iconflag1=false;
        this.ptotal=1;
      }else{
        this.iconflag1=true;
        this.ptotal=""
      }
      if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        } 
    },

  },
  created() {
    // 获取从my-searchBar组件传来的数据
    this.eventBus.$on('add',message=>{
      if(message=="全部"){
        this.Ptype="";
      }else{
        this.Ptype=message;
      }
      // console.log(this.Ptype);
    });
    this.eventBus.$on('factory',fac=>{
      this.Pmanu=fac;
      // console.log(this.Pmanu);
    });
    this.eventBus.$on('kw',kw=>{
      this.keyword=kw;
      console.log(this.keyword);
    });
    // console.log(this.keyword);
  },
  mounted() {
    //获取地址栏中的ptype
    this.page=1;
    this.goods=[];
     var urlParams = new URLSearchParams(location.search);
    let ptype=urlParams.get("ptype");
    if(ptype!==null){
      this.Ptype = ptype;
    }else if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
      this.movePage();
    }else{
      this.changeType();
    }
    // console.log(this.goods);
    // this.keyword=this.$store.state.keyword;
  },
  watch: {
    //监听类别更改事件
    Ptype(){
      this.page=1;
      this.goods=[];
      // 若类别为全部时执行查询所有商品路由
      if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
      this.eventBus.$emit('back_ptype',this.Ptype);
    },
    // 监听生产厂家改变
    Pmanu(){
      this.page=1;
      this.goods=[];
      if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
    },
    keyword(){
      console.log(1);
      this.page=1;
      this.goods=[];
      if(this.Ptype == "" && this.Pmanu == "" && this.pdisc == "" && this.ptotal =="" && this.keyword==""){
          this.movePage();
        }else{
          this.changeType();
        }
      // console.log(this.goods);
    }
  },
};
</script>

<style scoped>
.icon-zuojiantou:before {
    content: "\e731";
}
.icon-youjiantou:before {
    content: "\e612";
}
.icon-xiajiantou:before {
    content: "\e7b6";
}
.icon-changjiantou1:before {
    content: "\e601";
}
.icon-gou:before {
    content: "\e66a";
}
a {
  color: #757575;
  text-decoration: none;
}
.search-body .result-order {
  position: relative;
  margin: 0 auto;
  width: 1226px;
  font-size: 15px;
}
.search-body .result-order .order-list-box {
  display: flex;
  position: relative;
  height: 30px;
  margin: 20px 0;
  justify-content: space-between;
}
.search-body .result-order .order-list-box .order-list {
  display: flex;
}
.search-body .result-order .order-list-box .order-list li {
  padding: 0 30px;
  border-left: 1px solid #e0e0e0;
  line-height: 20px;
}
.search-body .result-order .order-list-box .order-list li:first-child {
  border-left: none;
}
/* 设置分类条件下当前分类是a标签样式 */
.search-body .result-order .order-list-box .order-list li.active a {
  color: #ff6700;
}
.search-body .result-order .order-list-box a:hover {
  color: #ff6700;
}
/* 设置导入上箭头i标签样式 */
.search-body .result-order .order-list-box .order-list i {
  font-size: 16px;
  line-height: 16px;
  vertical-align: -1px;
}
/* 类type-list样式 */
.search-body .result-order .order-list-box .type-list {
  display: flex;
  height: 30px;
  line-height: 30px;
}
.search-body .result-order .order-list-box .type-list li {
  margin-left: 30px;
}
/* 收货地样式 */
.search-body .result-order .order-list-box .address-choose {
  display: flex;
}
.search-body .result-order .order-list-box .address-choose .label {
  display: inline-block;
  margin-right: 8px;
  height: 30px;
}
/* 地址框样式 */
.search-body .result-order .order-list-box .address-choose .inline-place{
  display: inline-block;
}
.search-body .result-order .order-list-box .type-list a {
  color: #757575;
  -webkit-transition: color 0.2s;
  transition: color 0.2s;
}
.search-body .result-order .order-list-box .type-list a:hover {
  color: #ff6700;
}
/* 勾选盒子样式 */
.search-body .result-order .order-list-box .type-list .checkbox {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  /* vertical-align: -2px; */
  font-size: 16px;
  line-height: 18px;
  text-align: center;
}
/* 设置初始状态下勾不显示 */
.search-body .result-order .order-list-box .type-list .checkbox i {
  visibility: hidden;
}
.search-body .result-order .order-list-box .type-list .checkbox-checked {
    background-color: #ff6700;
    border-color: #ff6700;
    color: #fff;
}
.search-body .result-order .order-list-box .type-list .checkbox-checked i{
  visibility: visible;
}
/* 商品显示样式 */
.search-body .result-order .goods-list-box {
  width: 1226px;
}
.search-body .result-order .goods-list-box .goods-list {
  width: 1240px;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}
.search-body .result-order .goods-list-box .goods-list .goods-item {
  position: relative;
  width: 296px;
  height: 383px;
  padding-top: 24px;
  margin-right: 14px;
  margin-bottom: 14px;
  text-align: center;
  background: #fff;
  -webkit-transition: -webkit-box-shadow 0.5s linear;
  transition: -webkit-box-shadow 0.5s linear;
  transition: box-shadow 0.5s linear;
  transition: box-shadow 0.5s linear, -webkit-box-shadow 0.5s linear;
}
/* 设置移入图片时盒子阴影样式 */
.search-body .result-order .goods-list-box .goods-list .goods-item:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color:aliceblue;
}
/* 商品图片样式 */
.search-body .result-order .goods-list-box .goods-list .goods-item .figure-img {
  width: 200px;
  height: 220px;
  overflow: hidden;
  margin: 16px auto 16px;
}
.search-body
  .result-order
  .goods-list-box
  .goods-list
  .goods-item
  .figure-img
  a {
  display: block;
}
.search-body
  .result-order
  .goods-list-box
  .goods-list
  .goods-item
  .figure-img
  img {
  width: 100%;
}
/* 商品名称样式 */
.search-body .result-order .goods-list-box .goods-list .goods-item .title {
  margin: 10px auto;
  width: 230px;
  font-size: 14px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* 商品价格样式 */
.search-body .result-order .goods-list-box .goods-list .goods-item .price {
  margin: 0 0 15px;
  color: #ff6700;
}
/* 分页栏样式 */
.search-body .result-order .goods-list-box .divide-page {
  height: 30px;
  padding: 15px 0;
  text-align: center;
}
.search-body .result-order .goods-list-box .divide-page .numbers {
  display: inline-block;
  width: 48px;
  height: 24px;
  padding: 3px 0;
  margin: 0 5px;
  font-size: 18px;
  font-weight: 200;
  line-height: 24px;
  color: #b0b0b0;
}
/* 设置左右箭头样式 */
.search-body .result-order .goods-list-box .divide-page .iconfont {
  color: #c4b7b4;
  font-size: 40px;
  vertical-align: bottom;
}
/* 当前页所在的页码样式 */
.search-body .result-order .goods-list-box .divide-page .current {
  background-color: #757575;
  color: #fff;
}
/* 鼠标移入页码是页码的颜色变化 */
.search-body .result-order .goods-list-box .divide-page a.numbers:hover {
  background: #b0b0b0;
  color: #fff;
}
/* 数据为空时显示的界面 */
.search-body .result-order .goods-list-box .empty-list{
  padding: 60px 0;
  width: 1226px;
  margin: 0 auto;
  text-align: center;
}
/* 显示的图片样式 */
.search-body .result-order .goods-list-box .empty-list .search-icon {
  width: 200px;
}
.search-body .result-order .goods-list-box .empty-list .empty{
  margin: 14px 0;
}
.search-body .result-order .goods-list-box .empty-list .btn{
    display: inline-block;
    width: 158px;
    height: 38px;
    padding: 0;
    margin: 0;
    border: 1px solid #b0b0b0;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    color: #b0b0b0;
    cursor: pointer;
    transition: none;
    background: #fff;
}
</style>