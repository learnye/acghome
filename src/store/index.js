import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:sessionStorage.getItem('isLogin') || false,
    uid:sessionStorage.getItem('uid') || '',
    nickname:sessionStorage.getItem('nickname') || '',
    shoplist:[],
    totalPrice:0,
    totalSelected:0,
    keyword:"",
  },
  
  mutations: {
    login_mutation(state,payload){
      state.isLogin=true;
      state.uid=payload.uid;
      state.nickname=payload.nickname;

    },
    change_keyword_mutation(state,playload){
      state.keyword=playload;
    },
    login_mutation(state,payload){
      state.isLogin=true;
      state.uid=payload.uid;
      state.nickname=payload.nickname;
    },
    updateShoplist(state,payload){
      state.shoplist = payload.shoplist;
      state.totalPrice=payload.totalPrice;
      state.totalSelected=payload.totalSelected;
    }
  },
  actions: {
  },
  modules: {
  }
})
