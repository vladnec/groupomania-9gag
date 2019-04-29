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
		title:'',	
		email:'',
		initials:'',
		post:'',
		unreadPosts:'',
		sortedPosts:'',
		posts:[],
		postsVisited: JSON.parse(localStorage.getItem('postsVisited')) || [],
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
		retrieveOnePost(state,post) {
			state.post = post
		},
		retrievePosts(state,posts){
			state.posts = posts
		},
		destroyToken(state){
			state.token = null
		},
		destroyUserId(state){
			state.userId = null
		},
		postsVisited(state, postsVisited){
			state.postsVisited = postsVisited
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
		},
		UnreadPosts:state => {
			let arr = state.posts.filter(post => !state.postsVisited.includes(post._id))
			let userId = localStorage.getItem('userId')
			return state.unreadPosts = arr.filter(post => post.userId !== userId).length
		},
		GetPosts:state => {
			return state.sortedPosts = state.posts
		}
	},
	actions:{
		itsVisited(context, data){
			const itsVisited = JSON.parse(localStorage.getItem('postsVisited')) || [];
			if (!itsVisited.includes(data.id)) {
				itsVisited.push(data.id)
				context.commit('postsVisited', itsVisited)
				localStorage.setItem('postsVisited', JSON.stringify(itsVisited));	
			}
		},
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
		mediaPost(context,data){
			axios.defaults.headers.common['authorization'] = 'Bearer ' + this.state.token
			const formData = new FormData();
			formData.append('file', data.file);
			formData.append('userId', data.userId)
			formData.append('author_lastname', data.author_lastname)
			formData.append('author_firstname', data.author_firstname)
			formData.append('title', data.title)
			return new Promise((resolve, reject) => {
				axios.post('http://localhost:3000/post',formData)
				.then(response => {
					resolve(response)
					this.retrievePosts()
				})
				.catch(error =>{
					reject(error)
				})
			})
		},
		writtenPost(context,data) {
			return new Promise((resolve,reject) =>{
				axios.post('http://localhost:3000/post', {
					title : data.title,
					content : data.content,
					userId : data.userId,
					author_firstname : data.author_firstname,
					author_lastname : data.author_lastname,
				})
				.then(response => {
					resolve(response)
					this.retrievePosts()
				})
				.catch(error => {
					console.log(error.response)
				})
			})
		},
		retrieveOnePost(context,data) {
			return new Promise((resolve,reject) => {
				axios.get('http://localhost:3000/post/' + data._id)
				.then(response=> {
					const post = response.data
					context.commit('retrieveOnePost', post)
					resolve(response)
				})
			})
		},
		retrievePosts(context,data) {
			return new Promise((resolve,reject)=>{
				axios.get('http://localhost:3000/post')
				.then(response => {
					const posts = response.data
					context.commit('retrievePosts' , posts)
					resolve(response)
				})
				.catch(error=>{
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
						axios.delete('http://localhost:3000/auth/user/' + this.state.userId)
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
		logout(context){
			if(context.getters.loggedIn) {
					return new Promise((resolve, reject) => {
						axios.post('http://localhost:3000/auth/logout')
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