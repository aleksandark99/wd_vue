import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./Store";
import vuetify from './plugins/vuetify';

import axios from 'axios'

axios.defaults.withCredentials = true;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
