<template>
	<h1>Welcome, {{ name }}!</h1>
</template>

<script>
	
	import VeeValidate from 'vee-validate';
	import axios from 'axios';
	import VueResource from 'vue-resource';

	export default {
		name: 'home',
		data(){
			return {
				name:''
			}
		},
		created(){
			this.$store.dispatch('retrieveName')
				.then(response => {
					this.name = response.data.firstname
				})
		},
	}
</script>