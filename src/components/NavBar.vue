<template>
  <div id="ss">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand id="navTitle" to="/">Vueplex bioskop web</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/filmovi">Filmovi</b-nav-item>
          <b-nav-item v-show="admin" to="/users">Users</b-nav-item>
          <b-button v-show="admin" to="/addMovie" variant="success">Add Movie</b-button>
          <b-button v-show="admin" to="/addProjekcija" variant="success">Add Projekcija</b-button>
                    <b-button v-show="admin" to="/izvestaj" variant="success">Izvestaj</b-button>


              <b-button
            v-show="loged"
            :to="`/user/${this.$store.state.user.username}`"
            variant="success"
            id="reg"
          >Moje karte</b-button>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        
          <b-button
            v-show="loged"
            :to="`/user/${this.$store.state.user.username}`"
            variant="success"
            id="reg"
          >Moj Profil</b-button>
          <b-button v-show="user" to="/login" variant="success" id="reg">Login</b-button>

          <br />
          <br />
          <!-- <button type="button" @click="routeToAddUser" class="btn btn-danger">Register</button> -->
          <b-button v-show="user" to="/addUser" variant="danger" id="reg">Register</b-button>
          <b-button v-show="!user" @click="logout" to="/" variant="danger" id="reg">Logout</b-button>

          <!-- 
          <b-nav-item-dropdown right class="user">
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  
  props: {
    user: {
      type: Boolean,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    },
    loged: {
      type: Boolean,
      required: true
    }
  },
  name: "NavBar",
  // seen:true,
  // el:"ss",
  data() {
    return {
      // seen:this.props[0]
    };
  },
  mounted() {},
  methods: {
    routeToAddUser() {
      //  this.router.replace('/addUser')
    },
    logout() {
      this.$store.commit("changeuserSeen", true);
      this.$store.commit("changeLogedIn", false);

      this.$store.commit("changeadminSeen", false);
      this.$store.commit("changeRole", null);
      this.$store.commit("changeUsername", null);
                axios
      .get(`http://localhost:8081/SF-15-2018-OWP/LogoutServlet`)
      .then(res => (console.log("Uspesno izlogovani"+res)))
      .catch(err => console.log(err));

      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-success {
  margin-right: 5px;
}
.user {
  display: none;
  visibility: hidden;
}
#navTitle {
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: purple;
}
#reg {
  color: white;
  text-align: center;
  font-weight: 100;
}
</style>
