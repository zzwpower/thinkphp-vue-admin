import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Admin from '@/components/admin/Index'
import Home from '@/components/admin/Home'
import SuperStore from '@/components/admin/SuperStore'
import App from '@/components/admin/App'
import Message from '@/components/admin/Message'
import Store from '@/components/admin/Store'
import VueRouter from 'vue-router';

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: '/admin/home',
    children: [
      {
        path: "/admin/home",
        name: '首页',
        component: Home
      },
      {
        path: "/admin/store",
        name: '店铺管理',
        component: Store
      },
      {
        path: "/admin/superstore",
        name: '商圈管理',
        component: SuperStore
      },
      {
        path: "/admin/message",
        name: '消息管理',
        component: Message
      },
      {
        path: "/admin/app",
        name: 'App版本管理',
        component: App
      },
    ]
  }
];

const router = new VueRouter({
  routes: routes,
})

router.beforeEach((to, from, next) => {
  let data = localStorage.getItem('d88_user')
  data = JSON.parse(data)
  console.log(data)
  if(data.user == 'admin' && data.pass == '2012Dibaba') {
    next()
  }else{
    next('/login')
  }
})

export default router