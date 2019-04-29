<template>
	<div>
		<div class="profile big-circle"> {{ initials }}</div>
		<h6> {{ data.firstname}} {{ data.lastname}} </h6>
		<h6 class="margin-email"> {{ data.email }} </h6>
		<button class="btn btn-primary" @click="confirmationLogout">Logout</button>
		<button type="button" class="btn btn-danger" @click="confirmationDelete">Delete</button>
	</div>
</template>
<script>
	import swal from 'sweetalert';
	export default {
		name:'User',
		computed:{
			data(){
				return this.$store.state
			},
			initials(){
				return this.$store.getters.profileName.toUpperCase();
			}
		},
		methods:{
			confirmationDelete(){
				swal({
				  title: "Your account will be deleted permanently!",
				  text: "Are you sure to proceed?",
				  icon: "warning",
				  buttons: ["No, I am not sure!", "Yes, Remove My Account!"],
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete) {
				    swal("Your account is removed permanently!", {
				      icon: "success",
				    });
				    this.$router.push('/user/delete')
				  } else {
				    swal("Account is not removed!");
				    this.$router.push('/user/')
				  }
				});
			},
			confirmationLogout(){
				swal({
				  title: "You are sure you want to logout?",
				  buttons: ["No, I am not sure!", "Yes, Logout!"],
				  dangerMode: true,
				})
				.then((willLogout) => {
				  if (willLogout) {
				    swal("Succesfully logged out!", {
				      icon: "success",
				    });
				    this.$router.push('/user/logout')
				  } else {
				    this.$router.push('/user/')
				  }
				});
			},
			confirmDelete(){
				if(confirm("Are you sure?")){
					this.$router.push('/user/delete')
				} else {
					this.$router.push('/user/')
				}
			},
			logout(){
				this.$router.push('/user/logout')
			},
		}
	}

</script>
<style>
.big-circle{
	font-size:30px;
	color:#fff;
	margin:30px auto;
    width:120px;
    height:120px;

}

.margin-email {
	margin:30px auto;
}

.btn-danger {
	margin-top:10px;
	background-color:red;
	opacity:1;
	color:#fff;
	height:40px;
	border:none;
}
</style>