import Login from './components/auth/Login.vue'
import Signup from './components/auth/Signup.vue'
import DeleteUser from './components/auth/DeleteUser.vue'
import User from './components/User.vue'
import Home from './components/Home.vue'
import Post from './components/Post.vue'


export const routes = [
	{ 
		path: '/login',
		name:'login',
		component: Login,
		props:true,
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
		name:'signup',
		component: Signup,

	},
	{
		path:'*',
		redirect:'/'
	},
	{
		path:'/user/',
		name:'user',
		component:User,
		meta:{
			requiresAuth:true
		}
	},
	{
		path:'/user/delete',
		name:'deleteUser',
		component:DeleteUser,
		meta:{
			requiresAuth: true
		}
	},{
		path:'/post/:id',
		name:'post',
		component:Post,
		meta:{
			requiresAuth:true
		}
	}
];