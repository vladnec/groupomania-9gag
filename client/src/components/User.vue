<template>
	<div>
		<div class="profile big-circle"> {{ initials }}</div>
		<h6> {{ data.firstname}} {{ data.lastname}} </h6>
		<h6 class="margin-email"> {{ data.email }} </h6>
		<button type="button" class="btn btn-danger">Delete</button>
	</div>
</template>
<script>
	export default {
		name:'User',
		computed:{
			data(){
				return this.$store.state
			},
			initials(){
				return this.$store.getters.profileName
			}
		}
	}

</script>
<style>
.big-circle{
	font-size:30px;
	color:#ccc;
	margin:30px auto;
    width:120px;
    height:120px;

}

.margin-email {
	margin:30px auto;
}

.btn-danger {
	background-color:red;
	opacity:1;
	color:#000;
	height:40px;
	border:none;
}
</style>