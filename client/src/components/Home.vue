<template>
	<div id="app"> 
		<div 
		v-for="post in sortedPosts"
		ref="post"
		class="post"
		:id="post._id">
			<div class="container">
				<div class="row">
					<span class="post-author-initials logo profile">
						{{post.author_firstname | initials}}{{post.author_lastname | initials}} 
					</span>
					<span class="post-author">{{post.author_firstname}} {{post.author_lastname }}</span>
				</div>
				<div class="row">
					<div class="post-title"> {{ post.title}}</div>
				</div>
				<div class="row">
					<div 
						v-if="post.content"
						class="post-content">
						{{post.content | subStr}}
					</div>
					<div

						v-else
						class="post-image">	
						<div v-if="itsImage(post.imageUrl)"><img :src="post.imageUrl"></div>
						<div v-else><video controls :src="post.imageUrl"></video></div>	
					</div>
				</div>
			</div>
			<hr>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'home',
		data(){
			return {
				posts:'',
				imageType: [
					  "jpeg",
					  "png",
					  "gif",
					  "jpg",  
					  "pjpeg",  
					  "jfif",
				],
				sortedPosts:'',
			}
		},
		created(){
			this.getData()
		},
		watch: {
			posts : 'getData'
		},
		methods: {
			itsImage : function(string) {
				let output = document.querySelector('.post-image')
				let image = string.split('.')[1]
				if(this.imageType.includes(image)){
					return true
				}
			},
			sortByDate(a,b){
				var dateA = new Date(a.date).getTime();
				var dateB = new Date(b.date).getTime();
				return dateA > dateB ? -1 : 1
			},
			getData(){
				this.$store.dispatch('retrievePosts')
				.then(response => {
					this.posts = response.data
					this.sortedPosts = this.posts.sort(this.sortByDate)
				})
			}
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