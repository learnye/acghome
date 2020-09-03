<template>
    <div class="search-list">
        <div class="keywords">
            <my-header></my-header>
        </div>
        <div class="search-container" :style="searchbarwidth">
            <my-SearchBar></my-SearchBar>
        </div>
        <div class="search-result">
            <my-SearchBody></my-SearchBody>
        </div>
        <myFooter></myFooter>
    </div>
</template>
<style>
  html{overflow:scroll;}  
</style>
<style scoped>
.search-list .keywords{
    text-align: center;
    position: relative;
    z-index: 99;

}
.search-list .search-container{
    width: 100%;
}
.search-list a{
    text-decoration: none;
    cursor: pointer;
}
.search-list .search-result {
    width: 100%;
    padding: 20px 0 100px;
    background-color: #F5F5F5;
}
</style>

<script>
import mySearchBar from '@/components/my-searchBar';
import mySearchBody from '@/components/my-searchBody';
export default {
    name: 'search',
    components: {
      mySearchBar,
      mySearchBody,
    },
    data() {
        return {
            searchbarwidth:"height:220px",
            keyword:"",
        }
    },
    methods: {
        // 获取子组件参数，并将之设置为自身高度
        // parentEvent(data){
        //     this.searchbarwidth=data;
        // },
        // 关键词搜索，将关键词传入my-searchBody组件中
        // search(){
        //     this.eventBus.$emit('kw',this.keyword);
        // },
    },
}
</script>