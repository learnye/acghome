<template>
    <div class="right-content-box">
        <div class="subject-wrap">
            <div class="product-list">
                <!-- 商品搜索添加栏 -->
                <div class="common-seach-wrap">
                    <div class="seach-wrap">
                        <span class="item-label">商品名称</span>
                        <div class="item-content">
                            <input type="text" autocomplete="off" placeholder="请输入商品名称" v-model="pname" class="input-inner" @keyup.enter="searchInput()">
                        </div>
                        <div class="search-btn-wapper" @click="searchInput()">
                            <button class="search-btn">
                                <i class="iconfont icon-sousuo"></i>
                                <span>查询</span> 
                            </button>
                        </div>
                        <div class="add-btn-wrapper">
                            <router-link to="/manageProduct">
                                <button class="search-btn">
                                    <i class="iconfont icon-addTodo-nav"></i>
                                    <span ref="addProduct">添加商品</span> 
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- 商品搜索添加栏 -->
                <!-- 商品列表栏 -->
                <div class="product-content">
                    <div class="table-head-wrapper">
                        <table cellspacing="0" cellpadding="0" border="0" class="table-head" width="1638px">
                            <thead>
                                <tr>
                                    <th colspan="1" rowspan="1" height="38px" v-for="(sl,i) of showList" :key="i" class="isleaf">
                                        <div class="cell">{{sl}}</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table-row" v-for="(pl,i) of productList" :key="i">
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">
                                            <div class="product-info">
                                                <div class="pic">
                                                    <img :src="pl.image" alt="">
                                                </div>
                                                <div class="info">
                                                    <div class="name">{{pl.pname}}</div>
                                                    <div class="price">￥{{(pl.price).toFixed(2)}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">{{pl.pid}}</div>
                                    </td>
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">{{pl.pmenu}}</div>
                                    </td>
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">{{pl.total}}</div>
                                    </td>
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">{{pl.sold}}</div>
                                    </td>
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">{{pl.plike}}</div>
                                    </td>
                                    <td colspan="1" rowspan="1">
                                        <div class="cell">
                                            <router-link :to="{path:'/manageProduct',query:{product_id:pl.pid}}">
                                                <button>编辑</button>
                                            </router-link>
                                            <button class="btndel" @click="sendProduct(pl.pid)">删除</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 商品列表栏 -->
                <!-- 分页栏 -->
                <div class="pagination1">
                <childDivide :goodspage="goodspage" :Count="Count" @getPage="getPage"></childDivide>
                </div>
                <!-- 分页栏 -->
            </div>
        </div>
    </div>
</template>
<script>
import childDivide from "@/components/child-divide";
export default {
    components:{
        childDivide,
    },
    data() {
        return {
            showList:['商品','编号','生产厂家','库存','销量','收藏','操作'],
            limit:10,
            goodspage:0,
            Count:0,
            page:1,
            productList:[],
            pname:"",
        }
    },
    methods: {
        // 初始情况下获取商品数据
        movePage(){
            // 获取全部商品路由，传入页数
            this.axios.get('/back_prolist',{
            params:{
                page:this.page,
                limit:this.limit,
            }
            }).then(res=>{
            this.goodspage=res.data.pageCount;
            this.Count=res.data.Count;
            let data=res.data.prolist;
            // console.log(data);
            data.forEach(item=>{
                        if(item.image.split(",")[1] !==null){
                            //属性重新赋值
                            item.image=require('../assets/image/products/'+item.image.split(",")[0]);
                        }else{
                            item.image=require('../assets/image/products/'+item.image);
                        }
                        this.productList.push(item);
                    });
            });
        },
        // 模糊查找相关商品
        searchProduct(){
            this.axios.get('/like_prolist',{
            params:{
                page:this.page,
                limit:this.limit,
                pname:this.pname,
            }
            }).then(res=>{
            this.goodspage=res.data.pageCount;
            this.Count=res.data.Count;
            let data=res.data.prolist;
            // console.log(data);
            data.forEach(item=>{
                        if(item.image.split(",")[1] !==null){
                            //属性重新赋值
                            item.image=require('../assets/image/products/'+item.image.split(",")[0]);
                        }else{
                            item.image=require('../assets/image/products/'+item.image);
                        }
                        this.productList.push(item);
                    });
            });
        },
        // 获取子组件传来的页数并执行对应数据渲染
        getPage(data){
           this.page=data;
           this.productList=[];
           if(this.pname){
               this.searchProduct();
           }else{
               this.movePage();
           }
           
        },
        // 触发商品搜索函数
        searchInput(){
            this.page=1;
            this.productList=[];
            this.searchProduct();
        },
        // 点击编辑传入对应商品id
        sendProduct(pid){
            this.$emit('child-pid',pid);
        },
    },
    mounted() {
        this.movePage();
    },
}
</script>
<style scoped>
.icon-quxiao:before {
    content: "\e606";
}
.btndel{
    margin-left: 5px;
}
.icon-sousuo:before {
    content: "\e634";
}
.icon-addTodo-nav:before {
    content: "\e600";
}
input::placeholder{
color:#C0C4CC;
}
button{
    outline: 0;
}
.right-content-box {
    max-height: calc(100vh - 48px);
    min-height: calc(100vh - 80px);
    overflow: auto;
    padding: 20px 16px;
    box-sizing: border-box;
    font-size: 12px;
}
.subject-wrap {
    padding: 16px;
    min-height: calc(100vh - 90px);
    overflow-x: auto;
    background: #FFFFFF;
}
.subject-wrap .common-seach-wrap{
    margin-bottom: 18px;
}
.seach-wrap{
    display: flex;
}
.seach-wrap .item-label{
    line-height: 32px;
}
.seach-wrap .item-content{
    width: 178px;
    height: 32px;
    
}
.item-content,.item-label,.search-btn-wapper{
    margin-right: 10px;
}
.seach-wrap .item-content .input-inner{
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    outline: 0;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    font-size: 12px;
    transition: border .5s;
}
.seach-wrap .item-content .input-inner:focus{
    border-color:  #409EFF;
}
.seach-wrap .search-btn-wapper{
    height: 32px;
}
.seach-wrap .search-btn{
    background-color: #409EFF;
    padding: 9px 15px;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
}
.seach-wrap .search-btn .icon-sousuo,.icon-addTodo-nav{
    font-size: 12px;
    margin-right: 5px;
}
/* 商品列表样式 */
.product-content .table-head-wrapper{
    overflow: hidden;
    width: 100%;
}
.table-head-wrapper .table-head,.table-body{
    table-layout: fixed;
    border-collapse: separate;
}
.table-head-wrapper .table-head .isleaf{
    border: 1px solid #ebeef5;
    text-align: left;
    vertical-align: middle;
}
.table-head .isleaf div{
    padding-left: 10px;
    color: #909399;
}
.table-head .isleaf .cell{
    position: relative;
    word-wrap: normal;
    text-overflow: ellipsis;
    vertical-align: middle;
    width: 100%;
    line-height: 23px;
}
/* 表格body样式 */
.table-row:nth-child(odd){
    background: #f5f7fa;
    
}
.table-row:hover{
    background: #f5f7fa;
}
.table-row td{
    border: 1px solid #ebeef5;
    border-top: 0;
    vertical-align: middle;
}
.table-row .cell{
    padding-left: 10px;
-webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
}
.table-row .cell button{
    color: #409eff;
    background: 0 0;
    font-size: 12px;
    outline: 0;
    border: 0;
}
.table-row .product-info{
    display: flex;
    padding: 10px 0;
}
.table-row .product-info .pic {
    position: relative;
    width: 50px;
    height: 50px;
    background: #F0F0EE;
}
.table-row .product-info .pic img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    max-height: 100%;
    max-width: 100%;
}
.product-info .info {
    flex: 1;
    padding-left: 10px;
    overflow: hidden;
    line-height: 18px;
}
.product-info .name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.product-info .price {
    color: rgb(255, 51, 0);
}
/* 分页样式 */
.pagination1 {
  text-align: right;
  margin-top: 18px;

}
</style>