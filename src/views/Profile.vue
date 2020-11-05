
<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "User",
  props: ["username"],

  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "username",
          sortable: false,
        },
        {
          key: "password",
          sortable: false,
        },
        {
          key: "datumRegistracije",
          sortable: false,
          formatter: (value) => {
            return new Date(value).toLocaleDateString();
          },
        },
        {
          key: "uloga",
          sortable: false,
        },
      ],
      items: [],
    };
  },

  mounted() {
    axios
      .get(
        `http://localhost:8081/SF-15-2018-OWP/KorisnikServlet?username=${this.username}`
      )
      .then((res) => this.items.push(res.data))
      .catch((err) => console.log(err));
  },
};
</script>