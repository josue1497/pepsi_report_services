// /**
//  * Vuex
//  *
//  * @library
//  *
//  * https://vuex.vuejs.org/en/
//  */

// // Lib imports
// import Vue from 'vue'
// import Vuex from 'vuex'

// // Store functionality
// import actions from './actions'
// import getters from './getters'
// import modules from './modules'
// import mutations from './mutations'
// import state from './state'

// Vue.use(Vuex)

// // Create a new store
// const store = new Vuex.Store({
//   actions,
//   getters,
//   modules,
//   mutations,
//   state
// })

// export default store
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
