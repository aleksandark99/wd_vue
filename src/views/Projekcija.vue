<template>
  <div>
    <b-table responsive :fields="fields" :items="items" :sort-by.sync="sortBy">
      <template v-slot:cell(film.naziv)="data">
        <router-link :to="`/film/${data.item.film.id}`">{{ data.value}}</router-link>
      </template>
    </b-table>
    <b-button v-show="s"  :to="`/AddKarta/${this.id}`" variant="danger">Kupi kartu</b-button>
    <br>
    <br>
    <label style="color:blue;">    Slobodna sedista:{{this.sed}}
</label>
    <br>
    <br>
      <b-form @submit="onSubmit"   v-if="this.$store.state.adminSeen">
        Unesite id karte za brisanje:
   <b-form-input
          id="input-1"
          v-model="kartaid"
          
          required
          placeholder="id:"
        ></b-form-input>
         <b-button type="submit" variant="primary">Potvrdi</b-button>
      </b-form>
    <br>
    <br>
    <p v-if="this.$store.state.adminSeen">
          Prodate karte

    </p>
       <b-table responsive :fields="fieldsKarte" :items="itemsKarte" v-if="this.$store.state.adminSeen">
      <template v-slot:cell(datum)="data">
        <router-link  :to="`/karta/${data.item.projekcija}`">{{ data.value}}</router-link>
      </template>
    </b-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Projekcija",
  props: ["id"],
  data() {
    return {
      kartaid:"",
      sed:0,
      fieldsKarte: [
                     {
          label: "id:",
          key: "id",
          sortable: true,
     
        },
            {
          label: "DatumProdaje",
          key: "datum",
          sortable: true,
                formatter: value => {
            return new Date(value).toLocaleString();
          }
        },
               {
          label: "Kupio:",
          key: "user",
          sortable: true,
     
        },
                    {
          label: "Sediste:",
          key: "sediste",
          sortable: true,
     
        },
        
      ],
      itemsKarte:[],
      s: this.$store.state.loggedIn,

      sortBy: "datum",
      fields: [
        {
          label: "Film",
          key: "film.naziv",
          sortable: true
        },
        { label: "Tip ", key: "tipProjekcije.naziv", sortable: true },
        {
          label: "Sala",
          key: "sala.naizv", // pazi na type bio sam lenj da prepravim bazu
          sortable: true
        },
        {
          key: "cenaKarte",
          sortable: true
        },

        {
          key: "datum",
          sortable: true,
          formatter: value => {
            return new Date(value).toLocaleString();
          }
        },
      
      ],
      items: []
    };
  },
  methods:{
      onSubmit(evt) {
        evt.preventDefault()
        // alert("ss")
 this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
   .then(value => {
            if(value==true){

           
         
        //
        var xff=0;
        for (var i=0 ; i<this.itemsKarte.length;i++){
          console.log(this.kartaid+"||"+this.itemsKarte[i].id)
            if (this.itemsKarte[i].id==this.kartaid){
              this.itemsKarte.pop(i)
              xff=1;
              break;
            }
        }
        if(xff==1){
                             const params = new URLSearchParams();
  params.append('id', this.kartaid);
  axios({
    method: 'post',
    url: 'http://localhost:8081/SF-15-2018-OWP/RemoveKartaFilm',
   data: params
  })
    .then(console.log("SS"))

  .catch(err=> console.log(err))

        }else{
                    alert("id nije u listi karata")
     
        }
          }})//
      },


  },
 
  mounted() {
    console.log(this.id);
    this.s = this.$store.state.loggedIn;

  
    axios
      .get(
        `http://localhost:8081/SF-15-2018-OWP/ProjekcijaServlet?id=${this.id}`
      )
      .then(res => this.items.push(res.data.projekcija))
      .catch(err => console.log(err));

          axios
      .get(
        `http://localhost:8081/SF-15-2018-OWP/GetKarteProjekcije?id_projekcije=${this.id}`
      )
      .then(res => {
        console.log(res.data.karte[0].datum)
        for (var i=0;i<res.data.karte.length;i++){
                  console.log(res.data.karte[i].datum)
                  this.itemsKarte.push(res.data.karte[i])

        }
        console.log(this.itemsKarte)
      })
      .catch(err => console.log(err +"SSS"));

          axios
      .get(
        `http://localhost:8081/SF-15-2018-OWP/SlobodnaSedistaServlet?id_projekcije=${this.id}`
      )
      .then(res => this.sed=res.data.brojSlobodnih )
      .catch(err => console.log(err));
  }
};
</script>
