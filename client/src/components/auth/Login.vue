<template>
	<div>
		<h4>Welcome to Groupomania</h4>
		<form  @submit.prevent="onSignin">
			<div class="form-group">
				<label for="email">Email</label>
				<input 
				type="email" 
				id="email" 
				name="email" 
				class="form-control"
				autofocus
				v-validate="'required|email'"  
				v-model="email">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input 
				type="password" 
				id="password" 
				name="password" 
				class="form-control"
				v-validate="'required'" 
				v-model="password">
			</div>
			<button 
				class="btn btn-primary" 
				type="submit">
				Sign In
			</button>
		</form>
	</div>
</template>
<script>
	import VeeValidate from 'vee-validate';
	import axios from 'axios';
	import VueResource from 'vue-resource';

	export default {
		data(){
			return {
				email:"",
				password:""
			}
		},
		methods:{
			onSignin(e){
				if(this.password.length >0){
					this.$http.post('auth/login', {
						email: this.email,
						password:this.password
					})
					.then(response=>{
							localStorage.setItem('user', JSON.stringify(response.data.userId))
							localStorage.setItem('jwt', response.data.token)
							this.$router.push('dashboard')
					})
					.catch(function(error){
						console.error(error.response);
					});
				}
			}
		}
	}


</script>