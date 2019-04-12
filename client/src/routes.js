import Landing from './components/Landing.vue'
import Login from './components/auth/Login.vue'
import Signup from './components/auth/Signup.vue'
import Dashboard from './components/Dashboard.vue'

export const routes = [
	{	path: '/',
		name:'Landing', 
		component: Landing
	},
	{ 
		path: '/login',
		name:'login',
		component: Login,
		meta:{
			guest:true
		}
	},
	{ 
		path: '/signup',
		name:'/signup',
		component: Signup,
		meta: {
			guest:true
		}
	},
	{
		path:'/dashboard',
		name:'dashboard',
		component: Dashboard,
		meta:{
			requiresAuth: true
		}
	}
];