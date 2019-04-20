import Login from './components/auth/Login.vue'
import Signup from './components/auth/Signup.vue'
import Home from './components/Home.vue'

export const routes = [
	{ 
		path: '/login',
		name:'login',
		component: Login,
	},
	{
		path:'/',
		name:'home',
		component:Home,
		meta:{
			requiresAuth: true
		}
	},
	{ 
		path: '/signup',
		name:'/signup',
		component: Signup,

	},
	{
		path:'*',
		redirect:'/'
	}
];