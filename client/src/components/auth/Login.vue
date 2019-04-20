<template>
	<div class="row justify-content-center">
		<div class="col-lg-2">
			<h4>Welcome to Groupomania</h4>
			<div class="row">
				<div class="col">
					<form  @submit.prevent="validateBeforeSubmit">
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
							v-validate="'required|email'" 
							:class="{'input-error' : errors.has('email')}" 
							v-model="email"
							placeholder="Enter your e-mail here">
						<small 
							class="form-error">
							{{ errors.first('email') }}
					</small>
						</div>
						<div class="form-group">
							<input 
							type="password" 
							id="password" 
							name="password" 
							class="form-control"
							:class="{'input-error' : errors.has('password')}"
							v-validate="'required'" 
							v-model="password"
							placeholder="Enter your password here">
						<small 
							class="form-error">
							{{ errors.first('password') }}
						</small>
						</div>
						<button 
							class="btn btn-primary" 
							type="submit">
							Sign In
						</button>
					</form>
					<h6>Don't have an account? Sign up <router-link class="link" to="/signup">here</router-link></h6>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import VeeValidate from 'vee-validate';

	export default {
		name:'login',
		data(){
			return {
				email:'',
				password:'',
				serverError:'',
			}
		},
		methods:{
			validateBeforeSubmit(){
				this.$validator.validateAll().then((result)=>{
					if(result){
						this.login();
					}
				});
			},
			login(){
				this.$store.dispatch('retrieveToken',{
					email:this.email,
					password:this.password,
				})
				.then(response =>{
					this.$store.dispatch('retrieveName')
					this.$router.push('/')
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
	form {
		margin:20px 10px;
	}
	.link {
		font-weight: bold;
	}

</style>