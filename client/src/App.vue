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
	.profile  {
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-align: center;
    display: flex;
    background-color:#5AAC44;
  }
    .publish {
    background-color:#0099FF;
    justify-content: center;
    align-items: center;
    text-align: center;
    display:flex;
    margin:10px;
    height:40px;
    color:#fafafa;
    z-index:1;
  }
    .btn:hover .btn-primary:hover{
    opacity:1;
    color:red;
  }
  .modal {
  	top:300px;
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
  .modal-header span {
  	/*padding-bottom:40px;*/
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
  	margin:10px auto;
  }
  .custom-multimedia-upload {
  	display:block;
  	cursor:pointer;
  }
  input[type="file"] {
    display: none;
}

</style>
