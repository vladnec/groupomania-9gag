<template>
	<div id="app">
			<div class="container">
				<div class="row">
					<span class="post-author-initials logo profile">
						{{initials}} 
					</span>
					<span class="post-author">{{post.author_firstname}} {{post.author_lastname }}</span>
				</div>
				<div class="row">
					<div 
					class="post-title"> {{ post.title}}</div>
				</div>
				<div class="row">
					<div 
						v-if="itsContent"
						class="post-content">
						{{post.content}}
					</div>
					<div
						v-else
						class="post-image">
						<div v-if="itsImage"><img class="w-100" :src="post.imageUrl"></div>
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
				initials:'',
				itsContent:false,
				itsImage:false,
			}
		},
		created(){
			this.getData()
			this.itsVisited()
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
					this.makeInitials(this.post.author_lastname, this.post.author_firstname)
					this.checkForImage(this.post.content, this.post.imageUrl)
				})
			},
			itsVisited(){
				this.$store.dispatch('itsVisited', {
					id:this.id
				})
			},
			makeInitials(first, last){
				let fn = first.split('')[0].toUpperCase()
				let ln = last.split('')[0].toUpperCase()
				return this.initials = ln + fn 
			},
			checkForImage(content, imageUrl) {
				if (content){
					return this.itsContent = true
				} else {
					
					let image = imageUrl.split('.')[1]
					if(this.imageType.includes(image)){
						return this.itsImage = true
					}
				}
			}
		},

	}
</script>
<style scoped>

#app {
	margin-top:40px;
}
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