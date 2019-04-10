import Landing from './components/Landing.vue'
import LogIn from './components/auth/Login.vue'
import SignUp from './components/auth/Signup.vue'

export const routes = [
	{ path: '/', component: Landing},
	{ path: '/login', component: LogIn},
	{ path: '/signup', component: SignUp},

];