<template>
	<form>
		<div class="form-group">
			<label for="email">Email</label>
			<input 
			type="email" 
			id="email" 
			name="email" 
			class="form-control"
			autofocus
			v-validate="'required|email'"  
			v-model="user.email">
			<small 
				v-if="errors.has('email')" 
				class="field-text is-danger">
				{{ errors.first('email') }}
			</small>
		</div>
		<div class="form-group">
			<label for="username">Username</label>
			<input 
			type="text" 
			id="username" 
			name="username" 
			class="form-control"
			v-validate="'required'"
			v-model="user.username">
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input 
			type="password" 
			id="password" 
			name="password" 
			class="form-control"
			v-validate="'required'" 
			v-model="user.password">
		</div>
		<button 
			type="submit" 
			class="btn btn-primary" 
			@click.prevent="register">
			Register
		</button>
	</form>
</template>

<script>
	import VeeValidate from 'vee-validate';
	import axios from 'axios';
	import VueResource from 'vue-resource';

	export default {
		data(){
			return {
				user:{
					username:'',
					email:'',
					password:''
				}
			};
		},
		methods:{
			register(){
				this.$http.post('auth/signup', this.user )
				.then(response => {
					console.log(response)
				}, error =>{
					console.log(error)
				});
			}
		}
	}
</script>