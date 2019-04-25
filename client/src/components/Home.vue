<template>
	<div>
		<h1>Welcome to the home page, auth user!</h1>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'home',
		created(){
			this.$store.dispatch('retrievePosts')
		}
	}
</script>