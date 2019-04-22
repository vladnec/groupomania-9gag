import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({
	state :{
		token: localStorage.getItem('token') ||  null,
		userId: localStorage.getItem('userId') || null,
		firstname:'',
		lastname:'',
		email:'',
		initials:'',
	},
	mutations:{
		retrieveToken(state, token){
			state.token = token
		},
		retrieveUserId(state,userId){
			state.userId = userId
		},
		retrieveFirstName(state,firstname){
			state.firstname = firstname
		},
		retrieveLastName(state,lastname){
			state.lastname = lastname
		},
		retrieveEmail(state,email) {
			state.email = email
		},
		destroyToken(state){
			state.token = null
		},
		destroyUserId(state){
			state.userId = null
		}
	},
	getters:{
		loggedIn(state){
			return state.token !== null
		},
		profileName: state => {
			let firstInitial = state.firstname.split("")[0]
			let lastInitial = state.lastname.split("")[0]
			return firstInitial + lastInitial
		}
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
		writtenPost(context,data) {
			return new Promise((resolve,reject) =>{
				axios.post('http://localhost:3000/written/', {
					title : data.title,
					content : data.content,
					userId : data.userId,
					author_firstname : data.author_firstname,
					author_lastname : data.author_lastname,
				})
				.then(response => {
					console.log(response)
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
			})
		},
		retrieveName(context){
			return new Promise((resolve,reject)=>{
				axios.get('http://localhost:3000/auth/user/' + this.state.userId)
				.then(response=>{
					const firstname = response.data.firstname
					const lastname = response.data.lastname
					const email = response.data.email
					context.commit('retrieveFirstName', firstname)
					context.commit('retrieveLastName', lastname)
					context.commit('retrieveEmail', email)
					resolve(response)
				})
				.catch(error => {
					reject(error)
				})
			})
		},
		deleteAccount(context){
			if(context.getters.loggedIn) {
					return new Promise((resolve, reject) => {
						axios.delete('http://localhost:3000/auth/user/' + this.state.userId,{
					})
					.then(response =>{
						localStorage.removeItem('token')
						localStorage.removeItem('userId')
						context.commit('destroyToken')
						context.commit('destroyUserId')
						resolve(response)
					})
					.catch(error =>{
						localStorage.removeItem('token')
						localStorage.removeItem('userId')
						context.commit('destroyToken')
						context.commit('destroyUserId')
						reject(error)
					})
				})		
			}
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
					localStorage.setItem('token', token)
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