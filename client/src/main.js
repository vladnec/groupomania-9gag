import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify';

import {store} from './store/store';


import App from './App.vue'
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
	events:'blur'
});
Vue.use(Vuetify);

Vue.http.options.root = 'http://localhost:3000/'

const router = new VueRouter({
	mode:'history',
	routes	
})

router.beforeEach((to,from,next) => {
	if(to.matched.some(record=> record.meta.requiresAuth)){
		if(localStorage.getItem('token') == null){
			next({
				path:'/login'
			})
		} else {
			let user = localStorage.getItem('userId')
			next()
		}
	} else {
		next()
	}
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
