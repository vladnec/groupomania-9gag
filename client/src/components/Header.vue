<template>
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
              <li class="publish">
                  <a class="publish" href="#">Publish</a>
              </li>
          </ul>
      </div>
  </nav> 
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
    width: 100%;
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


  .publish {
    background-color:#0099FF;
    justify-content: center;
    align-items: center;
    text-align: center;
    display:flex;
    margin:10px;
    height:40px;
    color:#fafafa;
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