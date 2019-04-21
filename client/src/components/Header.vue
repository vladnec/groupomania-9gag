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
                                    <button type="button" class="publish" data-toggle="modal" data-target="#exampleModal">
                Publish
              </button>
              </li>
          </ul>
      </div>
  </nav> 

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
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
            <div class="col-lg-8 choose">
              <i class="fas fa-file-alt"></i> Text
            </div>
          </div>
          <div class="row">
              <div class="col-lg-8 choose">
                <label for="multimedia" class="custom-multimedia-upload">
                  <i class="fas fa-image"></i>Multimedia
                </label>
                 <input type="file" accept="image/*" id="multimedia">
                
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</div>
</template>

<script>
  export default {
    name:'Header',


    computed: {
      profileName(){
        return this.$store.getters.profileName
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
      retrieveProfileId(){
        this.$store.dispatch('retrieveName')
        .then(response => {
          this.$router.push({name:'user', params: { userData : response}})
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