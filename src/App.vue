
<template>
  <div id="app">
    <div id="nav">

      <NavBar :user="this.$store.state.userSeen"  :admin="this.$store.state.adminSeen" :loged="this.$store.state.loggedIn"/>
      <!-- <b-button @click="testUsername">Test username</b-button> -->
      <!-- <HelloWorld/> -->
      
      
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/filmovi">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
//  import HelloWorld from '@/components/HelloWorld.vue';
 import NavBar from '@/components/NavBar.vue'
  export default {
  components: {
    NavBar

  }
  ,
  data(){
    return{
      seen:true
    }
  }
  ,
  methods:{
    testUsername(){
      alert(this.$store.state.adminSeen)
    }
  }
} 
 
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
