<template>
	<div id="app">
	    	<app-header></app-header>
	    	<div class="container">
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
	import Header from './components/Header.vue'
	
	export default {
		components: {
			'appHeader': Header
		}
	}
</script>

<style>

	.body{
		min-width:380px;
	}
	.container {
		color:#101010;
		font-size:14px;
		min-width:300px;
	    width: auto !important;
	    width:300px;

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
	.profile  {
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color:#fff;
    text-align: center;
    display: flex;
    background-color:#5AAC44;
  }
    .publish {
    background-color:#0099FF;
    border-radius:4px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display:flex;
    margin:10px;
    height:40px;
    color:#fafafa;
    z-index:1;
    width:80px;
  }
    .btn:hover .btn-primary:hover{
    opacity:1;
    color:red;
  }
  .modal-dialog{
  	justify-content: center;
    align-items: center;
    text-align: center;
  }
  .modal-header{
  	justify-content: center !important;
    align-items: center;
    text-align: center;
  }

  h4 {
  	justify-content: center;
    align-items: center;
    text-align: center;
    display:flex;
  }

  .choose {
  	border:1px solid #000;
  	padding:20px;
  	margin:20px auto;
  	cursor:pointer;
  }
  .main-choose:hover {
  	font-size:16px;
  }

  .custom-multimedia-upload {
  	display:block;
  	cursor:pointer;
  }
  input[type="file"] {
    display: none;
}

textarea {
	width:100%;
	resize:none;
}
	.length {
		margin-top:0px;
		margin-bottom:10px;
		margin-left:420px;
	}
	.content-length {
		margin-top:-30px;
		margin-left:395px;
	}
	label p {
		border:1px solid #BBBBBB;
		padding:3px;
		border-radius:4px;
		width:116px;
		height:30px;
		background-color:#0099FF;
		margin-top:10px;
		color:#fff;
		margin-left:145px;
	}

	.title-error {
		position:relative;
		bottom:20px;
	}
	.logo {
    margin-top:10px;
    width:40px;
    height:40px;
    z-index:1;
    cursor:pointer;
  }
  	.noNotification {
  		display:none;
  	}
  	.notifications {
  		z-index:1;
  		cursor:pointer;
  		margin-top:10px;
  		margin-right:10px;
  		width:40px;
  		height:40px;
  		background:#fff;
  		border-radius:30px;
  		box-sizing: border-box;
  		text-align: center;
  		padding:5px;
  		box-shadow: 0 2px 5px rgba(0,0,0,.2);
  	}
  	.notifications:hover {
  		width:300px;
  		height:50px;
  		text-align: left;
  		padding:0 15px;
  		background:#ff2c74;
  		/*transform:translateY(100%);*/
  		border-bottom-left-radius:0;
  		border-bottom-right-radius:0;

  	}
  	.notifications .fa-bell {
  		color:#cecece;
  		line-height: 30px;
  		font-size:30px;
  	}
  	.notifications:hover .fa-bell{
  		color:#fff;
  		position:relative;
  		top:10px;
  	}
  	.notifications .num {
  		position:relative;
  		bottom:42px;
  		left:20px;
  		width:22px;
  		height:22px;
  		border-radius:50%;
  		background:#ff2c74;
  		color:#fff;
  		line-height:22px;
  		font-family:sans-serif;
  		text-align: center;
  	}
  	.notifications:hover .num{
  		position:relative;
  		background:transparent;
  		color:#fff;
  		font-size:18px;
  		bottom:15px;
  		width:150px;
  		
  	}
  	.notifications:hover .num:after{
  		content:' Notification';
  	}
  	.listNotifications{
  		position: relative;
  		right:15px;
  		top:-3px;
  		margin:0;
  		padding:20px;
  		width:300px;
  		background:#fff;
  		box-shadow:0 5px 15px rgba(0,0,0,.5);
  		box-sizing:border-box;
  		border-bottom-left-radius:30px;
  		border-bottom-right-radius:30px;
  		display:none;

  	}
  	.notifications:hover .listNotifications {
  		display:block;
  	}
  	.listNotifications li {
  		list-style:none;
  		border-bottom:1px solid rgba(0,0,0,.1);
  		padding:15px 0;
  		display:flex;
  	}
  	.listNotifications li .icon {
  		width:24px;
  		height:24px;
  		background:#ccc;
  		border-radius:50%;
  		text-align: center;
  		line-height: 24px;
  		margin-right:10px;
  	}
  	.listNotifications li .icon .fa-user {
  		color:#fff;
  		line-height: 24px;
  		/*font-size:14px;*/
  	}
  	.listNotifications li .text {
  		font-family:sans-serif;
  		cursor:pointer;
  	}

  	.listNotifications li:hover .text {
  		font-weight:bold;
  		color:#ff2c74;
  	}
	.abs {
		/*font-size:30px;*/
	}







@media only screen and (max-width: 900px) {


	.notifications:hover{
		display:none;
	}	.listNotifications {
		display:none;
	}
}










</style>
