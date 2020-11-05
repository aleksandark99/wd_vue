
<template>
  <div>
    <b-table
      responsive
      ref="table"
      striped
      hover
      :items="items"
      :fields="fields"
    >
    </b-table>
    Opis:
    <b-card>
      <p style="text-align: left">
        <br />
        <br />
        {{ this.items[0].opis }}
      </p>
    </b-card>

    <b-form inline v-show="show">
      <label class="sr-only" for="inline-form-input-naziv">Naziv</label>
      <b-input
        id="inline-form-input-naziv"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Novi naziv"
        v-model="naziv"
      ></b-input>

      <label class="sr-only" for="inline-form-input-naziv">Zanrovi</label>
      <b-input
        id="inline-form-input-zanrovi"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Novi Zanrovi"
        v-model="zanrovi"
      ></b-input>
      <label class="sr-only" for="inline-form-input-trajanje">Trajanje</label>
      <b-input
        id="inline-form-input-trajanje"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Novo Trajanje"
        v-model="trajanje"
      ></b-input>
      <label class="sr-only" for="inline-form-input-distributer"
        >Distributer</label
      >
      <b-input
        id="inline-form-input-distributer"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Novi Distributer"
        v-model="distributer"
      ></b-input>
      <label class="sr-only" for="inline-form-input-zemlja"
        >Zemlja porekla</label
      >
      <b-input
        id="inline-form-input-zemlja"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Nova zemlja porekla"
        v-model="zemljaPorekla"
      ></b-input>
      <label class="sr-only" for="inline-form-input-godina"
        >Godina proizvodnje
      </label>
      <b-input
        id="inline-form-input-godina"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Nova godina proizvodnje"
        v-model="godina"
      ></b-input>
    </b-form>
    <br />

    <b-button variant="primary" @click="EditMovie" v-show="show"
      >Confirm</b-button
    >
    <br />
    <br />
    <b-button variant="danger" @click="removeMovie" v-show="show"
      >Remove</b-button
    >

    <b-button variant="danger" @click="ggg()">Pogledaj Projekcije</b-button>
  </div>
</template>

<script>
import router from "../router/index.js";

import axios from "axios";
export default {
  name: "Film",
  props: ["id"],
  data() {
    return {
      show: false,
      a: 0,

      godina: "",
      trajanje: "",
      naziv: "",
      zanrovi: "",
      distributer: "",
      zemljaPorekla: "",

      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: "naziv",
          sortable: false,
          formatter: "filmId",
        },
        {
          key: "zanrovi",
          sortable: false,
        },
        {
          key: "trajanje",
          sortable: false,
        },
        {
          key: "distributer",
          sortable: false,
        },
        {
          label: "Zemlja Porekla",
          key: "zemljaPorekla",
          sortable: false,
        },
        {
          label: "Godina Proizvodnje",
          key: "godina",
          sortable: false,
        },
        {
          label: "Reziser",
          key: "reziser",
          sortable: false,
        },
        {
          label: "Glumci",
          key: "glumci",
          sortable: false,
        },
      ],
      items: [],
      methods: {
        filmId(value) {
          return `${value.naziv} `;
        },
      },
    };
  },
  methods: {
    ggg() {
      this.$store.commit("changetestP", this.items[0].naziv);
      console.log(this.items[0].naziv);
      console.log(this.$store.state.testP + "Gledaj ovdee");
      router.push("/");
    },
    UpdateCurrentMovie(res) {
      if (res.data.status == "success") {
        this.items[0].naziv = this.naziv;
        this.items[0].trajanje = this.trajanje;
        this.items[0].distributer = this.distributer;
        this.items[0].godina = this.godina;
        this.items[0].zanrovi = this.zanrovi;
        this.items[0].zemljaPorekla = this.zemljaPorekla;
      } else {
        alert(res.data.message);
        this.naziv = "";
        this.trajanje = "";
        this.distributer = "";
        this.godina = "";
        this.zanrovi = "";
        this.zemljaPorekla = "";
      }
    },

    EditMovie() {
      const params = new URLSearchParams();
      // Ovo bi moglo malo lepse da se uradi al za sada neka ostane ovako
      if (this.naziv == "") {
        this.naziv = this.items[0].naziv;
      }
      if (this.zanrovi == "") {
        this.zanrovi = this.items[0].zanrovi;
      }
      if (this.trajanje == "") {
        this.trajanje = this.items[0].trajanje;
      }
      if (this.distributer == "") {
        this.distributer = this.items[0].distributer;
      }
      if (this.zemljaPorekla == "") {
        this.zemljaPorekla = this.items[0].zemljaPorekla;
      }
      if (this.godina == "") {
        this.godina = this.items[0].godina;
      }

      params.append("naziv", this.naziv);
      params.append("zanrovi", this.zanrovi);
      params.append("trajanje", this.trajanje);
      params.append("distributer", this.distributer);
      params.append("zemljaPorekla", this.zemljaPorekla);
      params.append("godina", this.godina);
      params.append("id", this.items[0].id);
      axios({
        method: "post",
        url: "http://localhost:8081/SF-15-2018-OWP/FilmUpdateServlet",
        data: params,
      })
        .then((res) => this.UpdateCurrentMovie(res))
        .catch((err) => console.log(err));
    },

    removeMovie() {
      const params = new URLSearchParams();
      params.append("id", this.items[0].id);
      axios({
        method: "post",
        url: "http://localhost:8081/SF-15-2018-OWP/RemoveFilmServlet",
        data: params,
      })
        .then(router.push("/filmovi"))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    if (this.$store.state.seen == true) {
      this.show = true;
    }

    axios
      .get(`http://localhost:8081/SF-15-2018-OWP/FilmServlet?id=${this.id}`)
      .then((res) => this.items.push(res.data))
      .catch((err) => console.log(err));
  },
};
</script>