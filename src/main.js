import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import './plugins/iview.js'
import VTabBar from 'v-tab-bar'
import 'v-tab-bar/dist/v-tab-bar.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import './plugins/filters'
import VueQrcodeReader from "vue-qrcode-reader";
import underscore from 'vue-underscore';

Vue.use(VueQrcodeReader);
Vue.component('v-icon', Icon)
Vue.use(underscore);
Vue.use(VTabBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
