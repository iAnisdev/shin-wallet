import Vue from 'vue'
import Router from 'vue-router'
import Cookies from '@/plugins/cookies'
import store from './store/store'
// ---------------------------- views

//Pages
import Landing from './views/Landing'
import Home from './views/Home.vue'
import buy from './views/buy.vue'
import withdraw from './views/withdraw.vue'
import addWallet from './views/addWallet.vue'
import transaction from './views/transaction.vue'
import record from './views/record.vue'
import scan from './views/scan.vue'
import changePassword from './views/changePassword.vue'
import phone from './views/phones.vue'
import addPhone from './views/addphone.vue'
import transfer from './views/transfer.vue'
import refer from './views/refer.vue'
import apps from './views/apps.vue'

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
      redirect: '/home',
      beforeEnter: requireAuth,
      //home childern routes
      children: [
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
      children: [
        {
          path: '',
          name: 'login',
          component: login,
          alias: '/login',
          beforeEnter: isLoggedOut
        },
        {
          path: 'login',
          name: 'authlogin',
          component: login,
          beforeEnter: isLoggedOut
        },
        {
          path: 'signup',
          name: 'signup',
          component: signup,
          beforeEnter: isLoggedOut
        },
        {
          path: 'recover',
          name: 'recover',
          component: recover,
          beforeEnter: isLoggedOut
        }
      ]
    },
    {
      path: '/buy',
      name: 'buy',
      beforeEnter: requireAuth,
      component: buy,
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      beforeEnter: requireAuth,
      component: withdraw,
    },
    {
      path: '/addWallet',
      name: 'addWallet',
      beforeEnter: requireAuth,
      component: addWallet,
    },
    {
      path: '/transaction',
      name: 'transaction',
      beforeEnter: requireAuth,
      component: transaction,
    },
    {
      path: '/record/:id',
      name: 'record',
      beforeEnter: requireAuth,
      component: record,
    },
    {
      path: '/scan',
      name: 'scan',
      component: scan,
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword,
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone,
    },
    {
      path: '/phone/add',
      name: 'addphone',
      component: addPhone,
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: transfer,
    },
    {
      path: '/refer',
      name: 'refer',
      component: refer,
      beforeEnter: requireAuth,
    },
    {
      path: '/apps',
      name: 'apps',
      component: apps,
      beforeEnter: requireAuth,
    },
    // redirect views
    {
      path: '*',
      redirect: '/'
    },
  ]
})

function requireAuth(to, from, next) {
  if (!store.getters.getLoginStatus) {
    let userToken = Cookies.getCookies('x-auth-tok')
    if (userToken) {
      next()
    } else {
      next("/auth")
    }
  } else {
    next()
  }
}

function isLoggedOut(to, from, next) {
  if (!store.getters.getLoginStatus) {
    let userToken = Cookies.getCookies('x-auth-tok')
    if (!userToken) {
      next()
    } else {
      next("/home")
    }
  } else {
    next()
  }
}

export default router
