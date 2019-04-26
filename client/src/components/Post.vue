<template>
	<div id="app">
			<div class="container">
				<div class="row">
					<span class="post-author-initials logo profile">
						{{post.author_firstname | initials}}{{post.author_lastname | initials}} 
					</span>
					<span class="post-author">{{post.author_firstname}} {{post.author_lastname }}</span>
				</div>
				<div class="row">
					<div 
					class="post-title"> {{ post.title}}</div>
				</div>
				<div class="row">
					<div 
						v-if="post.content"
						class="post-content">
						{{post.content}}
					</div>
					<div

						v-else
						class="post-image">	
						<div v-if="itsImage(post.imageUrl)"><img :src="post.imageUrl"></div>
						<div v-else><video controls :src="post.imageUrl"></video></div>	
					</div>
				</div>
			</div>

	</div>

</template>

<script>
	export default {
		name:'post',
		data() {
			return {
				post:'',
				id:this.$route.params.id,
				imageType: [
					  "jpeg",
					  "png",
					  "gif",
					  "jpg",  
					  "pjpeg",  
					  "jfif",
				],
			}
		},
		created(){
			this.getData()
		},
		watch:{
			'$route' (to,from) {
				this.id = to.params.id
			}
		},
		methods: {
			getData(){
				this.$store.dispatch('retrieveOnePost', {
					_id : this.id
				})
				.then(response => {
					this.post = response.data
				})
			},
			itsImage : function(string) {
				let output = document.querySelector('.post-image')
				let image = string.split('.')[1]
				if(this.imageType.includes(image)){
					return true
				}
			},
		},
		filters: {
			subStr: function(string){
				if(string.length > 1000) {
					return string.substring(0,1000) + '...'
				} else {
					return string
				}
			},
			initials: function(string){
				return string.split('')[0].toUpperCase()
			},
		},

	}
</script>
<style scoped>

.post {
	cursor:pointer;
}

.post-author-initials {
	width:30px;
	height:30px;
}

.post-author { 
	margin-left:10px;
	margin-top:15px;
	color:#999999;
	font-size:14px;
 }
 .post-title {
 	font-size:21px;
 	color:#101010;
 	margin-top:10px;
 	font-weight: bold;
 }
 .post-content {
 	width:60%;
 	font-size:16px;
 	text-align: left;
 	margin-top:25px;
 }

 .post-image {
 	width:80%;
 	height:80%;
 	margin-top:20px;
 }

</style>