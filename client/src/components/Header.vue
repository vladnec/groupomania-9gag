<template>
  <div>
<!--     <div class="container">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
          <router-link :to="{name:'home'}" class="abs" href="#"><img src="../assets/icon-left-font-monochrome-white.png" width="140px" height="24px"></router-link>
      </div>
      <div 
      class="ml-auto"
      v-if="loggedIn">
          <ul class="nav ml-auto">
              <li 
              class="notifications">
                <i class="fas fa-bell"></i>
                <div
                v-if="unreadPosts" 
                class="num">{{ unreadPosts}}</div>
                <ul 
                v-bind:class="{listNotifications : unreadPosts, noNotification : !unreadPosts}"
                >
                  <li>
                    <span class="icon"><i class="fas fa-user"></i></span>
                    <router-link :to="{name:'home'}" tag="span" class="text">You have {{ unreadPosts }} unread posts.</router-link>
                  </li>
                </ul>
              </li>
              <li @click="retrieveProfileId" class="logo profile">
                  <a>{{ profileName }}</a>
              </li>
              <li>
                <button type="button" class="publish" data-toggle="modal" data-target="#exampleModal">Publish</button>          
              </li>
          </ul>
      </div>
  </nav> 
    </div> -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">

    </div>
    <div class="mx-auto order-0">

        <router-link :to="{name:'home'}" tag="a" class="navbar-brand mx-auto"><img src="../assets/icon-left-font-monochrome-white.png" width="140px" height="24px"></router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul 
        v-if="loggedIn"
        class="navbar-nav ml-auto">

                
                    <li 
                    class="notifications nav-item">
                      <i class="fas fa-bell"></i>
                      <div
                      v-if="unreadPosts" 
                      class="num">{{ unreadPosts}}</div>
                      <ul 
                      class="listNotifications"
                      >
                        <li class="nav-item">
                          <span class="icon"><i class="fas fa-user"></i></span>
                          <router-link :to="{name:'home'}" tag="span" class="text">You have {{ unreadPosts }} unread posts.</router-link>
                        </li>
                      </ul>
                    </li>
                    <li @click="retrieveProfileId" class="logo profile nav-item">
                        <a>{{ profileName }}</a>
                    </li>
                    <li class="nav-item">
                      <button type="button" class="publish" data-toggle="modal" data-target="#exampleModal" data-backdrop="static" data-keyboard="false">Publish</button>  
                    </li>
        </ul>
    </div>
</nav>



<div 
class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

      <!-- ======= MULTIMEDIA MODAL ====== -->
      <div v-if="multimedia" id="multimedia">
        <div class="modal-header">
          <div>
            <h4>Give your post a title</h4>
            <p>An accuarate, descriptive title can help people discover your post</p>
          </div>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>   
        </div> <!-- /modal header -->
        <div class="modal-body">
              <div 
          v-if="serverError"
          class="server-error">
          {{ serverError }}
        </div>
          <form 
          enctype="multipart/form-data"
          @submit.prevent="validateBeforePosting">

          <div class="container">
            <div class="row">
                <textarea 
                name="title"
                v-validate="'required'"
                :class="{'input-error' : errors.has('title')}"
                v-model="currentLength" 
                class="choose left" rows="4" maxlength="280" placeholder="Describe your post..."></textarea>
                <small 
                  class="form-error title-error">
                  {{ errors.first('title') }}
              </small>
            </div>
            <div class="row">
            <div class="row">
              <div class="col-lg-2">
                <div class="length">{{ titleLimit }}</div>
              </div>
            </div>
              <div class="col choose">
                <label for="file" class="custom-multimedia-upload">
                  <i class="fas fa-image"></i>
                  <p>Choose files..</p>
                </label> 
                <input 
                id="file"
                type="file" 
                ref="file"
                @change="selectFile">
              </div>
            </div> <!-- /row -->
            <button class="btn btn-info">Send</button>
          </div> <!--/ container -->
        </form>
        </div> <!-- /modal-body -->
      </div> <!-- MULTIMEDIA modal -->

            <!-- ======= Text MODAL ====== -->
      <div v-else-if="text" id="text">
        <div class="modal-header">
          <div>
            <h4>Give your post a title</h4>
            <p>An accuarate, descriptive title can help people discover your post</p>
          </div>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>   
        </div> <!-- /modal header -->
        <div class="modal-body">
        <div 
          v-if="serverError"
          class="server-error">
          {{ serverError }}
        </div>
          <form>
            <div class="form-group">
              <textarea
                v-validate="'required'" 
                v-model="currentLength"
                name="title"
                class="choose"
                :class="{'input-error' : errors.has('title')}"
                rows="4"
                maxlength="280"
                placeholder="Describe your post...">
              </textarea>
              <div class="length">{{ titleLimit}}</div>
                <small 
                class="form-error title-error">
                {{ errors.first('title') }}
              </small>
            </div>
            <div class="form-group">
              <textarea
              v-validate="'required'"
              v-model="contentCurrentLength"
              name="content"
              :class="{'input-error' : errors.has('content')}"
              class="choose left"
              rows="8"
              maxlength="40000"
              placeholder="Add content..."
              ></textarea>
              <div class="content-length"> {{contentLimitComputed}}</div>
              <small 
                class="form-error">
                {{ errors.first('content') }}
              </small>
            </div>
            <button @click.prevent="validateBeforePost" class="btn btn-primary">Post</button>

          </form>
        </div>

      </div> <!--TEXT modal -->
            <!-- ======= DEFAULT MODAL ====== -->
      
      <div v-else>
        <div class="modal-header">
          <h4>Publish Content</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                Choose the type of content you want to publish
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 choose main-choose" @click="textModal">
                <i class="fas fa-file-alt"></i> Text

              </div>
            </div>
            <div class="row">
                <div class="col-lg-8 choose main-choose" @click="multimediaModal">

                    <i class="fas fa-image"></i>Multimedia
   
                </div>
            </div>
          </div>
        </div>
      </div>

    </div> <!-- /modal-content -->
  </div> <!-- /modal dialog -->
</div> <!-- modal -->


</div>
</template>

<script>
  export default {
    name:'Header',
    data(){
      return { 
        notChosen:true,
        text:false,
        multimedia:false,
        limit:280,
        contentLimit:40000,
        currentLength:'',
        contentCurrentLength:'',
        serverError:'',
        file:'',      
      }
    },
    created(){
      this.unreadPosts()
    },
    computed: {
      unreadPosts(){
         return this.$store.getters.UnreadPosts   
      },
      postsVisited(){
        return this.$store.state.postsVisited.length
      },
      profileName(){
        return this.$store.getters.profileName
      },
      titleLimit(){
        return this.limit - this.currentLength.length
      },
      contentLimitComputed(){
        return this.contentLimit - this.contentCurrentLength.length
      },
      loggedIn(){
        return this.$store.getters.loggedIn
      },
      userId(){
        return this.$store.state.userId
      }
    },
    created(){
      this.$store.dispatch('retrieveName')
    },
    methods:{
      selectFile(){
        this.file = this.$refs.file.files[0];
      },
      retrieveProfileId(){
        this.$store.dispatch('retrieveName')
        .then(response => {
          this.$router.push({name:'user',})
        })
      },
      multimediaModal(){
        this.notChosen = false
        this.multimedia = true
      },
      textModal(){
        this.notChosen = false,
        this.text = true;
      },
      closeModal(){
        $('#exampleModal').modal('hide')
        this.notChosen = true,
        this.multimedia = false,
        this.text = false,
        this.currentLength = '',
        this.contentCurrentLength = '',
        this.serverError = ''
        this.file = ''
      },
      validateBeforePost(){
          this.$validator.validateAll().then((result)=>{
          if(result){
            this.postWritten()
          }
        });
      },
      validateBeforePosting(){
          this.$validator.validateAll().then((result)=>{
          if(result){
            if(this.file){
                this.sendFile()
            } else {
              this.serverError = "No file uploaded!"
            }
            
          }
        });
      },
      sendFile(){
        this.serverError = ''
        this.$store.dispatch('mediaPost', {
          title:this.currentLength,
          file:this.file,
          userId:this.$store.state.userId,
          author_firstname:this.$store.state.firstname,
          author_lastname:this.$store.state.lastname
        })
        .then(response => {
          this.closeModal()
          this.$router.push('/')
          this.$store.dispatch('retrievePosts')
        })
        .catch(error => {
          this.serverError = "File type not supported!"
          this.file = ''
          this.currentLength = ''
        })
      },
      postWritten(){
        this.$store.dispatch('writtenPost', {
          title:this.currentLength,
          content:this.contentCurrentLength,
          userId: this.$store.state.userId,
          author_firstname: this.$store.state.firstname,
          author_lastname : this.$store.state.lastname
        })
        .then(response => {
          this.closeModal()
          this.$router.push('/')
          this.$store.dispatch('retrievePosts')
        })
        .catch(error =>{
          this.serverError 
        })
      }
    }
  }

</script>
<style scoped>

  .logo-header {
    height: 40px;
    display: flex;
    align-items: center;
  }
    
  a {
    color:#fff;
  }

</style>