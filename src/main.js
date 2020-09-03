import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import myHeader from './components/myHeader.vue'
import myFooter from './components/myFooter.vue'
import moment from 'moment'

const eventBus = new Vue();
//引入mint-ui的css文件
import 'mint-ui/lib/style.min.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.axios = axios;
Vue.prototype.eventBus = eventBus;
Vue.config.productionTip = false
Vue.prototype.$moment = moment;

//全局组件
Vue.component(
  'myHeader',
  myHeader
)
Vue.component(
  'myFooter',
  myFooter
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
