<template>
  <div>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
          <router-link :to="{name:'home'}" class="navbar-brand justify-content-center abs" href="#"><img src="../assets/icon-left-font-monochrome-white.png" width="140px" height="24px"></router-link>
      </div>
      <div 
      class="ml-auto"
      v-if="loggedIn">
          <ul class="nav ml-auto">
              <li @click="retrieveProfileId" class="logo profile">
                  <a>{{ profileName }}</a>
              </li>
              <li>
                <button type="button" class="publish" data-toggle="modal" data-target="#exampleModal">Publish</button>          
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
        <div v-if="successMessage"> {{ successMessage }}</div>
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
        <div v-if="successMessage"> {{ successMessage }}</div>
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
        successMessage:'',
        file:'',
      }
    },
    computed: {
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
    mounted(){
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
        this.successMessage = '',
        this.serverError = ''
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
        this.successMessage = ''
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
          this.successMessage = response.data.message
          this.currentLength = '',
          this.file = ''
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
          console.log(response)
          this.closeModal()
          this.$router.push('/')
        })
        .catch(error =>{
          this.serverError 
        })
      }
    }
  }

</script>
<style scoped>

  .navbar {
    height:60px;
  }
  .navbar-brand.abs {
    position: absolute;
    padding-bottom:30px;
    left: 0;
    text-align: center;
    top:10px;
  }
  .logo {
    margin-top:10px;
    width:40px;
    height:40px;
    z-index:1;
    cursor:pointer;
  }

  .logo-header {
    height: 40px;
    display: flex;
    align-items: center;
  }
    
  a {
    color:#fafafa;
  }

</style>