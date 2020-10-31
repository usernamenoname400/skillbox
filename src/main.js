import Vue from 'vue';
import App from './App.vue';
/* import { anothermsg, data as d } from './data';
import showCustomAlert from './showalert'; */

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

/* showCustomAlert(d.message);
showCustomAlert(anothermsg); */
