<template>
	<form @submit.prevent="signup">
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
			<label for="password">Password</label>
			<input 
			type="password" 
			id="password" 
			name="password" 
			class="form-control"
			v-validate="'required'" 
			v-model="user.password">
		</div>
		<div class="form-group">
			<label for="confirmPassword">Confirm Password</label>
			<input 
			type="password" 
			id="confirmPassword" 
			name="confirmPassword" 
			class="form-control"
			v-validate="'required'" 
			v-model="user.confirmPassword">
		</div>
		<div class="form-group">
			<label for="firstname">First Name</label>
			<input 
			type="text" 
			id="firstname" 
			name="firstname" 
			class="form-control"
			v-validate="'required'"
			v-model="user.firstname">
		</div>
		<div class="form-group">
			<label for="lastname">Last Name</label>
			<input 
			type="text" 
			id="lastname" 
			name="lastname" 
			class="form-control"
			v-validate="'required'"
			v-model="user.lastname">
		</div>
		<button 
			type="submit" 
			class="btn btn-primary">
				Sign Up
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
					firstname:'',
					lastname:'',
					email:'',
					password:'',
					confirmPassword:'',
				}
			};
		},
		methods:{
			signup(){
				if(this.user.password === this.user.confirmPassword && this.user.password.length > 0){
				this.$http.post('auth/signup', this.user )
					.then(response => {
						console.log(response)
					}, error =>{
						console.log(error)
					});
					this.$router.push('login')
				} else {
					this.user.password = "",
					this.user.confirmPassword = ""
					return alert ("passwords do not match")
				}
			}
		}
	}
</script>