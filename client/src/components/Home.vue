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
					:class="{visited : itsVisited(post._id, post.userId)}"
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
				postsVisited : this.$store.state.postsVisited,
				postsNotVisited: this.$store.state.postsNotVisited,
				userId: this.$store.state.userId,
			}
		},
		created(){
			this.getData()
		},
		computed:{
			unreadPosts(){
				 return this.$store.getters.UnreadPosts.length	
			},
			getPosts(){
				return this.$store.getters.GetPosts.sort(this.sortByDate)
			},
		},
		methods: {
			sortByDate(a,b){
			var dateA = new Date(a.date).getTime();
		    var dateB = new Date(b.date).getTime();
				if (navigator.userAgent.indexOf("Firefox") > 0) {
	   			 	return dateA > dateB ? -1 : 1;  
				} else {
	    			return dateA > dateB ? 1 : -1;  
				}
			},
			getData(){
				this.$store.dispatch('retrievePosts')
			},
			itsImage : function(string) {
				let image = string.split('.')[1]
				if(this.imageType.includes(image)){
					return true
				}
			},
			getDetails(id){
				this.$store.dispatch('retrieveOnePost', {
					_id : id
				})
				.then(response => {
					let routeData = this.$router.resolve({name:'post', params:{id:id}});
					window.open(routeData.href, '_blank');
					this.$store.dispatch('itsVisited', {
						id:this.id
					})
				})
			},
			itsVisited(id, userId){
				let visited = this.postsVisited
				if(visited.includes(id) && userId !== this.userId){
					return true
				} else {
					return false
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

 .w-75 {
 	max-width:600px;
 	max-height:600px;
 }

 .visited {
 	color:#9F9F9F;
 }

</style>