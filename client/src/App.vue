<template>
	<div id="app">
	    <div class="container">
		  	<div class="row justify-content-center">
		  		<div class="col-lg-12">
		  			<router-link to="/signup">Signup</router-link>
		  			<router-link to="/login">Login</router-link>
		  		</div>
		  	</div>
		  	<hr>
		  	<div class="row">
		  		<div class=col-lg-12>
		  			<router-view></router-view>
		  		</div>
		  	</div>
 		</div>
	</div>
</template>

<script>

</script>

<style>
	.container {
		color:#101010;
		font-size:14px;
	}
	input{
		outline:none;
	}
	.btn {
		width:80px;
		height:30px;
		border-radius:4px;
		text-align:center;
		margin:0 auto;
		background-color:#fff;
		border:1px solid #101010;
		color:#101010;
		display:table;
		opacity:0.6;
	}
	.btn:hover{
		opacity:1;
	}
	h6 {
		margin:5px auto;
		text-align: center;
	}
	.server-error{
		margin-bottom:12px;
		font-size:14px;
		padding:5px 14px;
		color:#a94442;
		background:#f3dede;
		border-radius:4px;
	}
	.form-error {
		color:#FF3636;
	}
	.input-error {
		border:1px solid #FF3636;;
	}
	.mail-error{
		outline:none;
	}

</style>
