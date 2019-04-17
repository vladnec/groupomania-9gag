import Landing from './components/Landing.vue'
import Login from './components/auth/Login.vue'
import Signup from './components/auth/Signup.vue'
import Dashboard from './components/Dashboard.vue'
import Home from './components/Home.vue'

export const routes = [
	{	path: '/',
		name:'Landing', 
		component: Landing
	},
	{ 
		path: '/login',
		name:'login',
		component: Login,
	},
	{
		path:'/home',
		name:'home',
		component:Home,
	},
	{ 
		path: '/signup',
		name:'/signup',
		component: Signup,
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