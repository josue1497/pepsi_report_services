/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';

// import { sync } from 'vuex-router-sync'

import App from './App.vue';
import router from './router/router';
import './registerServiceWorker';
import ArgonDashboard from './plugins/argon-dashboard';
import store from '@/store';
import Toasted from 'vue-toasted';
import VueLoading from 'vuejs-loading-plugin'
import VueToastify from 'vue-toastify';

Vue.config.productionTip = false;

Vue.use(ArgonDashboard);
Vue.use(Toasted);

// overwrite defaults
Vue.use(VueLoading, {
  dark: true, // default false
  text: 'Cargando', // default 'Loading'
  loading: true, // default false
  background: 'rgb(255,255,255, .5)', // set custom background
});

Vue.use(VueToastify, {
  canTimeout: true,
  duration: 3000,
  position: "top-right",
  defaultTitle: 'InformaciÃ³n',
  theme: 'light'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
