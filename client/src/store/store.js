import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
	state :{
		token: localStorage.getItem('token') ||  null,
		userId: localStorage.getItem('userId') || null,
	},
	mutations:{
		retrieveToken(state, token){
			state.token = token
		},
		retrieveUserId(state,userId){
			state.userId = userId
		}
	},
	getters:{
		loggedIn(state){
			return state.token !== null
		}
	},
	created(){
		this.$store.dispatch('retrieveName')
		    .this(response => {
				console.log(response);
			})
	},
	actions:{
		register(context,data){
			return new Promise((resolve,reject)=>{
				axios.post('http://localhost:3000/auth/signup', {
					firstname: data.firstname,
					lastname:data.lastname,
					email:data.email,
					password:data.password
				})
					.then(response => {
						resolve(response)
					})
					.catch(error =>{
						reject(error)
					})
			})
		},
		retrieveName(context){
			return new Promise((resolve,reject)=>{
				axios.get('http://localhost:3000/auth/user/' + this.state.userId)
				.then(response=>{
					resolve(response)
				})
				.catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		retrieveToken(context, credentials){
			return new Promise((resolve, reject) => {
				axios.post('http://localhost:3000/auth/login',{
					email: credentials.email,
					password:credentials.password
				})
				.then(response =>{
					const token = response.data.token
					const userId = response.data.userId
					localStorage.setItem('access_token', token)
					localStorage.setItem('userId', userId)
					context.commit('retrieveToken', token)
					context.commit('retrieveUserId', userId)
					resolve(response)
				})
				.catch(error =>{
					console.log(error)
					reject(error)
				})
			})		
		}
	},
})