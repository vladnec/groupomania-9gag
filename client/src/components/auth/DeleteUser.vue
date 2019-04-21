<template>
	
</template>

<script>
	export default {
		created(){
			this.$store.dispatch('deleteAccount')
			.then(response=> {
				this.$router.push({name:'login', params:{
					deletedMessage:response.data.message
				}})
			})
		}
	}

</script>