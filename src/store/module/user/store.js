import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
    userData: {},
    balanceOf: 0,
    balanceOFUSDT: 0,
    balanceOfCYN: 0,
    generalExchangeValues: []
}

export default {
    state,
    actions,
    mutations,
    getters
}