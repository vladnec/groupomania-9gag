import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';


import App from './App.vue'
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.http.options.root = 'http://localhost:3000/'

const router = new VueRouter({
	mode:'history',
	routes	
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
