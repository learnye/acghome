import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import search from '../views/search.vue'
import detail from '../views/detail.vue'
import login from '../views/Login.vue'
import pic360 from '../views/pic360.vue'
import header from '../views/Header.vue'
import Manage from '../views/Manage'
import Managers from '../views/managers.vue'
import cart from '../views/Cart'
import NotFound from '../views/NotFound'
import manageProduct from '../views/manageProduct'
// 个人中心
import Portal from '../views/Portal.vue'
import Users from '../components/portal/user.vue'
import Orders from '../components/portal/orderlist.vue'
import Comment from '../components/portal/comment.vue'
import Message from '../components/portal/message.vue'
import Address from '../components/portal/address.vue'
import Service from '../components/portal/service.vue'
import Security from '../components/portal/security.vue'
import Favogoods from '../components/portal/favogoods.vue'
import Amcas from '../components/portal/amcas.vue'
import Password from '../components/portal/security_components/security_password.vue'
import Profile from '../components/portal/security_components/security_profile.vue'
import Sns from '../components/portal/security_components/security_sns.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path:'/managers',
    component:Managers
  },
  {
    path: '/Manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/manageProduct',
    name: 'manageProduct',
    component: manageProduct
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/header',
    name: 'header',
    component: header
  },
  {
    path: '/pic360',
    name: 'pic360',
    component: pic360
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '/portal',
    redirect:'/user',
    name: 'Portal',
    component: Portal,
    children: [{
        path: '/user',
        component: Users
      },
      {
        path: '/orderlist',
        component: Orders
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/message',
        component: Message
      },
      {
        path: '/address',
        component: Address
      },
      {
        path: '/service',
        component: Service
      },
      {
        path: '/favogoods',
        component: Favogoods
      },
      {
        path: '/amcas',
        component: Amcas
      },
    ]
  },
  {
    path: '/security',
    name: 'Security',
    component: Security,
    children: [{
      path: '/security/password',
      component: Password
    }, {
      path: '/security/profile',
      component: Profile
    }, {
      path: '/security/sns',
      component: Sns
    }, ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
