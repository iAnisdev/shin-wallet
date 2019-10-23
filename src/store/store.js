import Vue from 'vue'
import Vuex from 'vuex'
import general from './module/general/store'
import auth from './module/auth/store'
import user from './module/user/store'
Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules:{
    general,
    auth,
    user
  }
})
