<template>
	<div>
		<div class="container">
			<h4>Welcome to Groupomania</h4>
			<div class="row">
				<div class="col-centered">
					<form  @submit.prevent="login">
						<div 
						v-if="serverError"
						class="server-error">
							{{ serverError }}
						</div>
						<div class="form-group">
							<input 
							type="email" 
							id="email" 
							name="email" 
							class="form-control"
							autofocus
							v-validate="'required|email'"  
							v-model="email"
							placeholder="Enter your e-mail here">
						</div>
						<div class="form-group">
							<input 
							type="password" 
							id="password" 
							name="password" 
							class="form-control"
							v-validate="'required'" 
							v-model="password"
							placeholder="Enter your password here">
						</div>
						<button 
							class="btn btn-primary" 
							type="submit">
							Sign In
						</button>
					</form>
					<h6>Don't have an account? Sign up <router-link class="link" to="/signup">here</router-link></h6>
					<h6>Forgot password? Click <router-link class="link" to="/forgotPassword">here</router-link></h6>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import VeeValidate from 'vee-validate';
	import axios from 'axios';
	import VueResource from 'vue-resource';

	export default {
		name:'login',
		data(){
			return {
				email:"",
				password:"",
				serverError:'',
			}
		},
		methods:{
			login(){
				this.$store.dispatch('retrieveToken',{
					email:this.email,
					password:this.password,
				})
				.then(response =>{
					this.$router.push('home')
				})
				.catch(error => {
					this.serverError = error.response.data.message
					this.password= ''
					this.email =''
				})
			}
		}
	}


</script>
<style scoped>
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
	button {
		width:80x;
		height:30px;
		border-radius:4px;
		text-align:center;
		margin:0 auto;
		background-color:#fff;
		border:1px solid #101010;
		color:#101010;
		font-family:'Roboto';
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