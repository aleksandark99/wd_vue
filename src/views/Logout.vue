<template>
  <div></div>
</template>

<script>
import router from '../router/index.js'
import axios from "axios";

export default {
    
  name: "Logout",
  data() {
    return {};
  },
  mounted() {
    console.log("logout");
    this.$store.commit("changeUsername", "");
    this.$store.commit("changeadminSeen", false);
    this.$store.commit("changeuserSeen", true);
    this.$store.commit("changeLogedIn", false);
                    axios
      .get(`http://localhost:8081/SF-15-2018-OWP/LogoutServlet`)
      .then(res => (console.log("Uspesno izlogovani"+res)))
      .catch(err => console.log(err));
    router.push("/");
  }
};
</script>