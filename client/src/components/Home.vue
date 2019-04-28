<template>
	<div id="app"> 
		<div 
		v-for="post in getPosts"
		ref="post"
		class="post">
			<div class="container"
			@click="getDetails(post._id)">
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
						{{post.content | subStr}}
					</div>
					<div

						v-else
						class="post-image">	
						<div v-if="itsImage(post.imageUrl)"><img class="w-75":src="post.imageUrl"></div>
						<div v-else><video controls class="w-75" :src="post.imageUrl"></video></div>	
					</div>
				</div>
			</div>
			<hr>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'home',
		data(){
			return {
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
		computed:{
			unreadPosts(){
				 return this.$store.getters.UnreadPosts		
			},
			getPosts(){
				return this.$store.getters.GetPosts.sort(this.sortByDate)
			}
		},
		methods: {
			sortByDate(a,b){
				var dateA = new Date(a.date).getTime();
				var dateB = new Date(b.date).getTime();
				return dateA > dateB ? -1 : 1
			},
			itsImage : function(string) {
				let image = string.split('.')[1]
				if(this.imageType.includes(image)){
					return true
				}
			},
			getData(){
				this.$store.dispatch('retrievePosts')
			},
			getDetails(id){
				this.$store.dispatch('retrieveOnePost', {
					_id : id
				})
				.then(response => {
					this.$router.push({name:'post' , params:{id:id}});
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

 .w-75 {
 	max-width:600px;
 	max-height:600px;
 }

</style>