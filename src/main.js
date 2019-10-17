import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/iview.js'
import VTabBar from 'v-tab-bar'
import 'v-tab-bar/dist/v-tab-bar.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('v-icon', Icon)

Vue.use(VTabBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
