<template>
  <div>
    <div class="uc-box">
      <div class="uc-content-box portal-content-box">
        <div class="uc-content">
          <div class="box-hd">
            <h1 class="title">喜欢的商品</h1>
          </div>
          <div class="box-bd">
            <div class="goods-list-warp">
              <div>
                <ul class="goods-list clearfix">
                  <li class="goods-item" v-for="item in show_page" :key="item.productName">
                    <div class="figure figure-img">
                      <a href="#" target="_blank" id="goodsid-picture">
                        <img :src="item.image" alt />
                      </a>
                    </div>
                    <h3 class="title">
                      <a href="#" target="_blank" id="goods-title">{{item.productName}}</a>
                    </h3>
                    <p class="price">
                      <span data-goods>{{item.price}}元</span>
                    </p>
                    <p class="rank">{{item.description}}</p>
                    <div class="actions">
                      <a class="btn btn-small btn-line-gray">删除</a>
                      <a href="#" target="_blank" class="btn btn-small btn-primary">查看详情</a>
                    </div>
                  </li>
                </ul>
                <div class="mi-pagenav">
                  <a class="numbers first"  @click="prev_page()">
                    <span class="iconfont iconfront_pre"></span>
                  </a>
                  <a
                    class="numbers"
                    :class="{current:(index+1) == current_page}"
                    @click="choice(index)"
                    v-for="(item,index) in total_page"
                    :key="item"
                  >{{item}}</a>
                  <a class="numbers last" @click="next_page()">
                    <span class="iconfont iconfront_next"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <like-delete></like-delete>
  </div>
</template>

<script>
import Delete from "./like_components/like_delete";

export default {
  data() {
    return {
      uid: "1201329621036",
      likelist: [],
      show_page: [],
      page_num: 6,
      total_page: 0,
      current_page: 1,
    };
  },
  created() {
    // this.getLike();
  },
  methods: {
    //获取收藏列表
    getLike() {
      this.axios.get(`/get_like?uid=${this.uid}`).then((res) => {
        console.log(res.data);
        let data = res.data.likeList;
        data.forEach(item=>{
            if(item.image.split(",")[1] !==null){
                //属性重新赋值
                item.image=require('../../assets/image/products/'+item.image.split(",")[0]);
            }else{
                item.image=require('../../assets/image/products/'+item.image);
            }
            this.likelist.push(item);
            
        });
        this.init();
      });
    },
    init() {
      //计算总的页数 当计算出的总页数为小数时，用Math.ceil()方法往正方向取整
      this.total_page = Math.ceil(this.likelist.length / 6);
      //当前第一显示的数据    注意slice和splice的使用方法哦 slice不会改变原数组  splice会改变原数组
      this.show_page = this.likelist.slice(0, this.page_num);
    },
    //上一页
    prev_page() {
      if (this.current_page == 1) {
        return;
      }
      //先--再运行
      --this.current_page;
      // 当前页数第一页时，slice(第一个参数，第二个参数)第一个参数为每页开始数据的索引，第二个参数为每页结束数据的索引
      this.show_page = this.likelist.slice(
        this.page_num * (this.current_page - 1),
        this.page_num * this.current_page
      );
    },
    //下一页
    next_page() {
      if (this.current_page == this.total_page) {
        return;
      }
      //先++ 再运行
      ++this.current_page;
      this.show_page = this.likelist.slice(
        this.page_num * (this.current_page - 1),
        this.page_num * this.current_page
      );
    },
    //选择页数，把索引传递进来
    choice(index) {
      // 这个时控制页码类的选中样式，通过传参方式，因为索引从0开始，所以+1，就从1开始
      this.current_page = index + 1;
      this.show_page = this.likelist.slice(
        this.page_num * index,
        this.page_num * (index + 1)
      );
    },
  },
  components: {
    "like-delete": Delete,
  },
  mounted() {
    this.getLike();
  },
};
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

.goods-list-wrap {
  width: 868px;
  overflow: hidden;
}

.goods-list {
  width: 930px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.goods-item {
  float: left;
  width: 260px;
  height: 348px;
  padding-top: 40px;
  padding-right: 48px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

.goods-item .figure-img {
  display: flex;
  width: 200px;
  height: 200px;
  margin: 0 auto 10px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.goods-item .figure-img img {
  width: 100%;
  height: auto;
  transform: scale(0.75);
}

.goods-item .title,
.goods-item .title a {
  color: #333;
}

.goods-item .title {
  margin: 0 0 5px;
  font-size: 14px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.goods-item .title a:hover {
  color: #ff6700;
}

.goods-item .price {
  margin: 0 0 10px;
  color: #ff6700;
}

.rank {
  height: 18px;
  margin: 0 0 8px;
  font-size: 12px;
  color: #f5a5a5;
}

.goods-item .actions {
  visibility: hidden;
  opacity: 0;
  font-size: 0;
  transition: opacity 0.4s;
}

.goods-item:hover .actions {
  opacity: 1;
  visibility: visible;
}

.btn {
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
  transition: all 0.4s;
}

.btn:hover {
  text-decoration: none;
}

.goods-item .actions .btn {
  width: 108px;
  margin: 0 7px;
  font-size: 12px;
}

.btn-line-gray {
  border-color: #b0b0b0 !important;
  background: #fff !important;
  color: #b0b0b0 !important;
}

.btn-line-gray:hover {
  color: #fff !important;
  background-color: #757575 !important;
  border-color: #757575 !important;
}

.btn-small {
  height: 28px !important;
  font-size: 12px;
  line-height: 28px !important;
}

.btn-primary {
  background: #ff6700 !important;
  border-color: #ff6700 !important;
  color: #fff !important;
}

.btn-primary:hover {
  background-color: #f25807 !important;
  border-color: #f25807 !important;
  color: #fff !important;
}

.empty {
  font-size: 18px;
  text-align: center;
  color: #b0b0b0;
  margin: 40px 0;
}

.mi-pagenav {
  width: 100%;
  padding: 30px 0;
  height: 30px;
  text-align: center;
}

.mi-pagenav .numbers {
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

.mi-pagenav .numbers:hover {
  background-color: #c6b8b4;
  color: #fff;
}

.mi-pagenav .iconfront_pre {
  font-size: 24px !important;
  vertical-align: bottom;
  font-style: normal;
}

.mi-pagenav .iconfront_next {
  font-size: 24px !important;
  vertical-align: bottom;
  font-style: normal;
}

.iconfront_next::before{
  content: "\e612";
}

.iconfront_pre:before {
  content: "\e731";
}

.mi-pagenav .current {
  background-color: #c6b8b4;
  color: #fff;
}

.mi-pagenav a.numbers {
  transition: all 0.2s linear;
}
</style>