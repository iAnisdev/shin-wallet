import Vue from 'vue'
import Router from 'vue-router'
// ---------------------------- views

//landing page
import Landing from './views/Landing'
import Home from './views/Home.vue'
//auth
import Auth from './views/Auth.vue'
// ---------------------------- components
import login from './components/auth/login'
import signup from './components/auth/signup'
import recover from './components/auth/recover'
// ---------------------------- Home components
import homePage from './components/home/index'
import poolPage from './components/home/pool'
import walletPage from './components/home/wallet'
import mePage from './components/home/me'
import qrcodePage from './components/home/qrcode'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //home views
    {
      path: '/',
      component: Home,
      //home childern routes
      children:[
        {
          path: 'home',
          name: 'home',
          component: homePage,
        },
        {
          path: 'pool',
          name: 'pool',
          component: poolPage,
        },
        {
          path: 'wallet',
          name: 'wallet',
          component: walletPage,
        },
        {
          path: 'qrcode',
          name: 'qrcode',
          component: qrcodePage,
        },
        {
          path: 'me',
          name: 'me',
          component: mePage,
        }
      ]
    },
    //auth views
    {
      path: '/auth',
      component: Auth,
      //auth childern routes
      children:[
        {
          path: '',
          name: 'login',
          component: login,
          alias: '/login'
        },
        {
          path: 'login',
          name: 'authlogin',
          component: login
        },
        {
          path: 'signup',
          name: 'signup',
          component: signup
        },
        {
          path: 'recover',
          name: 'recover',
          component: recover
        }
      ]
    },
    // redirect views
    {
      path: '*',
      redirect: '/'
    },
  ]
})

export default router
