<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-3" label="Filmovi:" label-for="input-3">
        <b-form-select id="input-3" v-model="form.film" :options="options" required></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-3" label="Tip:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.tip"
          :options="optionsTip"
          required
          @change="poz(form.tip)"
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-3" label="Sale:" label-for="input-3">
        <b-form-select id="input-3" v-model="form.sala" :options="optionsSale" required></b-form-select>
      </b-form-group>
      <b-form-input v-model="text" placeholder="Enter price" required></b-form-input>
      <div class="col-md-6 mx-auto">
        Datum i Vreme
        <datepicker></datepicker>
        <vue-timepicker class="inLine" v-model="yourTimeValue1"></vue-timepicker>
        <datepicker class="inLine" :disabled-dates="disabledDates" v-model="date1"></datepicker>
      </div>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vuejs-timepicker";
import router from '../router/index.js'

export default {
  components: {
    Datepicker,
    VueTimepicker
  },
  name: "AddProjekcija",
  data() {
    return {
      disabledDates: {
        to: new Date()
      },
      yourTimeValue1: {
        HH: "00",
        mm: "00"
      },

      date1: "",

      form: {
        text: null,

        film: null,
        tip: null,
        sala: null
      },
      options: [{ value: null, text: "Please select some item" }],
      optionsTip: [
        { value: null, text: "Please select some item" },
        { value: 1, text: "2D" },
        { value: 2, text: "3D" },
        { value: 3, text: "4D" }
      ],
      optionsSale: [{ value: null, text: "Please select some item" }],

      show: true
    };
  },
  mounted() {
            if(this.$store.state.user.role !="ADMIN"){
          router.push("/");

    }
    var op = [];
    // var ss = [];
    axios
      .get("http://localhost:8081/SF-15-2018-OWP/FilmoviServlet")
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          op.push({ value: response.data[i].id, text: response.data[i].naziv });
        }
      })
      .catch(err => console.log(err));

    this.options = op;
  },

  methods: {
    testd() {
      if (this.date1 != "") {
        var formatted_date =
          this.date1.getFullYear() +
          "-" +
          this.date1.getDate() +
          "-" +
          (this.date1.getMonth() + 1) +
          " " +
          this.yourTimeValue1.HH +
          ":" +
          this.yourTimeValue1.mm +
          ":" +
          "00";
        return formatted_date;
      }
    },
    poz(a) {
      var op = [];
      console.log(a);
      op.push({ value: null, text: "Please select some item" });
      axios
        .get(`http://localhost:8081/SF-15-2018-OWP/SaleSaTipom?id_tipa=${a}`)
        .then(function(response) {
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            op.push({
              value: response.data[i].id,
              text: response.data[i].naizv
            });
          }
        })
        .catch(err => console.log(err));
      this.optionsSale = op;
    },
    onSubmit(evt) {
      evt.preventDefault();
      var x = this.text;
      var b = "";
      console.log(typeof b);

      try {
        b = parseInt(x, 10);
        console.log(b);
      } catch (error) {
        console.log("cena nije int");
      }
      if (isNaN(b)) {
        alert("cena mora biti int");
      } else if (this.date1 == "") {
        alert("Odaberite vreme");
      } else {
        console.log("sssss");
        var date = this.testd();
        console.log(this.form.film);
        console.log(this.form.tip);
        console.log(this.form.sala);
        console.log(date);
        console.log(b);
        console.log(this.$store.state.user.username);

               const params = new URLSearchParams();
        params.append("datum", date);
        params.append("usernameAdmina", this.$store.state.user.username);
        params.append("id_filma", this.form.film);
        params.append("id_tipa", this.form.tip);
        params.append("id_sale", this.form.sala);
        params.append("cena", b);
      

        axios({
          method: "post",
          url: "http://localhost:8081/SF-15-2018-OWP/AddProjekcija",
          data: params
        })
        .then(res=>{
          console.log(res)
          if(res.data.status!="success"){
            alert("Error")
          }
              router.push("/");

        })
        .catch(err=> console.log(err))


      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.film = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
.inLine {
  display: inline-block;
  margin: 5px;
  border: 1px solid;
}
</style>