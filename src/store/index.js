import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'


import app from './modules/app'
import userData from './modules/userdata'
import getters from './getters'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'pepsi-app',
  storage: window.localStorage
})

const store = new Vuex.Store({
  modules: {
    app,
    userData
  },
  getters: getters,
  plugins: [vuexPersist.plugin]
})

export default store;
