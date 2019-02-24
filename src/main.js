import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueLazyLoad from 'vue-lazyload';
import store from './store';
import router from './routes/web';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('cutString', (str, countSymbols = 100) => `${str.substr(0, countSymbols - 3)}...`);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDupWh7ch3wJhfDlooPMtzvrHHls3HH4p4',
    libraries: 'places',
  },
});
Vue.use(VueLazyLoad);


export default new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
