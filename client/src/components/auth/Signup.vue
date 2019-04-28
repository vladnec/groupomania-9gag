<template>
	<div class="row justify-content-center">
		<div class="col-lg-2">
			<form @submit.prevent="validateBeforeSubmit">
				<div 
					v-if="serverError"
					class="server-error">
					{{ serverError }}
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input 
					type="email" 
					id="Email" 
					name="Email" 
					class="form-control"
					autofocus
					v-validate="'required|email'"
					:class="{'input-error' : errors.has('Email')}"
					data-vv-validate-on="change"  
					v-model="email">
					<small 
						class="form-error">
						{{ errors.first('Email') }}
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
					:class="{'input-error' : errors.has('password')}"
					ref="password"
					v-model="password">
					<small 
						class="form-error">
						{{ errors.first('password') }}
					</small>
				</div>
				<div class="form-group">
					<label for="confirmPassword">Confirm Password</label>
					<input 
					type="password" 
					id="confirmPassword" 
					name="confirmPassword" 
					class="form-control"
					v-validate="'required|confirmed:password'" 
					data-vv-as="password"
					:class="{'input-error' : errors.has('confirmPassword')}"
					v-model="confirmPassword">
					<small 
						class="form-error">
						{{ errors.first('confirmPassword') }}
					</small>
				</div>
				<div class="form-group">
					<label for="firstname">First Name</label>
					<input 
					type="text" 
					id="firstname" 
					name="First Name" 
					class="form-control"
					v-validate="'required'"
					:class="{'input-error' : errors.has('First Name')}"
					v-model="firstname">
				</div>
					<small 
						class="form-error">
						{{ errors.first('First Name') }}
					</small>
				<div class="form-group">
					<label for="lastname">Last Name</label>
					<input 
						type="text" 
						id="lastname" 
						name="Last Name" 
						class="form-control"
						v-validate="'required'"
						:class="{'input-error' : errors.has('Last Name')}"
						v-model="lastname">
					<small 
						class="form-error">
						{{ errors.first('Last Name') }}
					</small>
				</div>
				<button 
					type="submit"
					class="btn">Sign Up
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	import VeeValidate from 'vee-validate';


	export default {
		name:'Signup',
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
			validateBeforeSubmit(){
				this.$validator.validateAll().then((result)=>{
					if(result){
						this.signup();
					}
				});
			},
			signup(){
				this.$store.dispatch('register',{
					firstname:this.firstname,
					lastname:this.lastname,
					email:this.email,
					password:this.password,
				})
				.then(response => {
						this.$store.dispatch('retrieveToken',{
						email:this.email,
						password:this.password
					})
					.then(response => {
						this.$store.dispatch('retrieveName')
						this.$router.push('/')
					})	
				})
				.catch(error => {
					this.serverError = "Email is already in use!"
				})
			}
		}
	}
</script>
<style>
	form {
		margin:20px 10px;
	}
	input {
		min-width:250px;
	}
</style>