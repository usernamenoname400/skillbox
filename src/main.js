import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
/* import { anothermsg, data as d } from './data';
import showCustomAlert from './showalert'; */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

/* showCustomAlert(d.message);
showCustomAlert(anothermsg); */
