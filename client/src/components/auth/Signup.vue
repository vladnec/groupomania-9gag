<template>
	<form @submit.prevent="signup">
		<div 
			v-if="serverError"
			class="server-error">
			{{ serverError }}
		</div>
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
			v-model="password">
		</div>
		<div class="form-group">
			<label for="confirmPassword">Confirm Password</label>
			<input 
			type="password" 
			id="confirmPassword" 
			name="confirmPassword" 
			class="form-control"
			v-validate="'required'" 
			v-model="confirmPassword">
		</div>
		<div class="form-group">
			<label for="firstname">First Name</label>
			<input 
			type="text" 
			id="firstname" 
			name="firstname" 
			class="form-control"
			v-validate="'required'"
			v-model="firstname">
		</div>
		<div class="form-group">
			<label for="lastname">Last Name</label>
			<input 
			type="text" 
			id="lastname" 
			name="lastname" 
			class="form-control"
			v-validate="'required'"
			v-model="lastname">
		</div>
		<button 
			type="submit"
			class="btn">Sign Up
		</button>
	</form>
</template>

<script>
	import VeeValidate from 'vee-validate';
	import axios from 'axios';


	export default {
		data(){
			return {
				firstname:'',
				lastname:'',
				email:'',
				password:'',
				confirmPassword:'',
				serverError:'',
			};
		},
		methods:{
			signup(){
				this.serverError=''
				if (this.firstname        !== '' & 
					this.lastname        !== '' & 
					this.email           !== '' & 
					this.confirmPassword !== '' & 
					this.password        !==''){
					
					if(this.confirmPassword === this.password) {
						this.$store.dispatch('register',{
							firstname:this.firstname,
							lastname:this.lastname,
							email:this.email,
							password:this.password,
						})
						.then(response =>{
							this.$router.push('home')
						})
						.catch(error => {
							this.serverError = 'Email is already in use!'
						})
					} else {
							this.serverError = 'Passwords do not match'
						}
				} else {
					this.serverError = 'All fields are required!'
				}
			}
		}
	}
</script>
<style>
	.container {
		color:#101010;
		font-size:14px;
	}
	.col-centered {
		margin:0 auto;
		float:none;
	}
	.link {
		color:inherit;
	}
	input{
		outline:none;
	}
	.btn {
		width:80x;
		height:30px;
		border-radius:4px;
		text-align:center;
		margin:0 auto;
		background-color:#fff;
		border:1px solid #101010;
		color:#101010;
		margin:0 auto;
	}
	.server-error{
		margin-bottom:12px;
		font-size:14px;
		padding:5px 14px;
		color:#a94442;
		background:#f3dede;
		border-radius:4px;
	}
</style>