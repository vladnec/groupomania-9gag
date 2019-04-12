import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify';


import App from './App.vue'
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(Vuetify);

Vue.http.options.root = 'http://localhost:3000/'

const router = new VueRouter({
	mode:'history',
	routes	
})

router.beforeEach((to,from,next) => {
	if(to.matched.some(record=> record.meta.requiresAuth)){
		if(localStorage.getItem('jwt') == null){
			next({
				path:'/login'
			})
		} else {
			let user = JSON.parse(localStorage.getItem('user'))
			next()
		}
	} else if (to.matched.some(record => record.meta.guest)){
		if(localStorage.getItem('jwt') == null){
			next()
		} else {
			next({name:'dashboard'})
		}
	} else {
		next()
	}
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
