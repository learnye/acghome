<template>
  <div>
        <div class="left-menu">
          <asideBar></asideBar>
        </div>
        <div class="right-content pr">
          <headTop></headTop>
          <div class="product" v-if="pid==''"><addProduct></addProduct></div>
          <div class="product" v-else><editProduct :pid="pid"></editProduct></div>
        </div>   
  </div>
</template>
<script>
import headTop from "@/components/head-top";
import asideBar from "@/components/aside-bar";
import addProduct from "@/components/add-product";
import editProduct from "@/components/edit-product";

export default {
  components: {
    headTop,
    asideBar,
    addProduct,
    editProduct,
  },
  data() {
    return {
        pid:"",
    };
  },
  mounted() {
    //获取地址栏中的pid
    var urlParams = new URLSearchParams(location.search);
    if(urlParams.get("product_id")){
      this.pid = urlParams.get("product_id");
    }
    // console.log(this.pid)
  },
};
</script>
<style>
  /* html{
    overflow-y: hidden;
  } */
</style>
<style scoped>
 html{
    overflow-y: hidden;
  }
.left-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
    z-index: 99;
}
.pr {
    position: relative;
}
.right-content {
    width: auto;
    margin: 0 0 0 200px;
    -webkit-transition: margin-right .5s;
    transition: margin-right .5s;
    height: 100vh;
}
.product{
  background-color: #F6F8FB;
}
</style>