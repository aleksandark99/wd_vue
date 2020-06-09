<template >
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">Projekcija</v-stepper-step>

    <v-stepper-content step="1">
      <b-table responsive :fields="fields" :items="items" :sort-by.sync="sortBy">
        <template v-slot:cell(film.naziv)="data">
          <router-link :to="`/film/${data.item.film.id}`">{{ data.value}}</router-link>
        </template>
        <template v-slot:cell(datum)="data">
          <router-link :to="`/projekcija/${data.item.id}`">{{ data.value}}</router-link>
        </template>
      </b-table>

      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="success" @click="posleucitavanje">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step id="sekcijaSedista" :complete="e6 > 2" step="2">Izabir sedista</v-stepper-step>

    <v-stepper-content step="2">

        <!-- <div v-for="(sediste,index) in sedista " :key="sediste.redniBroj" style="display: inline;
    width: fit-content;
    margin: 0;"
    > -->
     <!-- <br v-if="index % 10 ==0"> -->

    <!-- <v-radio-group row  multiple> -->
      <div v-for="(sediste,index)  in sedista" :key="sediste.redniBroj"
    style="display: inline;
    width: fit-content;
    margin: 0;">
            <br v-if="index % 10 ==0">
            {{sediste.redniBroj}}
       <b-form-checkbox   :label="sediste.redniBroj"  :value="sediste.redniBroj" :disabled="sediste.disabled"  @change="testttt(sediste.redniBroj)"
      
        style="display: inline;
    width: fit-content;
    margin: 0;
    "
        ></b-form-checkbox>
        <!-- <b-radio  :label="sediste.redniBroj" :value="sediste.redniBroj" :disabled="sediste.disabled"  @change="testttt(sediste.redniBroj)"
      
        style="display: inline;
    width: fit-content;
    margin: 0;
    "
        /> -->
      </div>


        <!-- </v-radio> -->

    <!-- </v-radio-group> -->
    


    <!-- </div> -->
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <!-- <v-btn color="success" @click="e6 = 3"      >Continue</v-btn> -->
        <v-btn color="success" @click="test2"      >Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">Kasa</v-stepper-step>
    <v-stepper-content step="3">
              <b-table responsive :fields="fields" :items="items" :sort-by.sync="sortBy">
        <template v-slot:cell(film.naziv)="data">
          <router-link :to="`/film/${data.item.film.id}`">{{ data.value}}</router-link>
        </template>
        <template v-slot:cell(datum)="data">
          <router-link :to="`/projekcija/${data.item.id}`">{{ data.value}}</router-link>
        </template>
        
      </b-table>

      Odabrana sedista: <div v-for="a in this.selektovanaSedista" :key="a"><p>{{a}}</p></div>
      <br>
        Ukupna cena:
        <p>{{this.selektovanaSedista.length * this.items[0].cenaKarte}}</p>
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn class="bluebtn" color="success" @click="dodavanjeKarte">Plati</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>


<script>
import axios from "axios";
import router from "../router/index.js";

export default {
  name: "AddKarta",
  props: ["id"],
  data() {
    return {
      zzz:[],
      t:[],
      options:[],
      sedista: [],
      selektovanaSedista:[],
      zauzetaSedista:[],
      e6: 1,
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
        }
      ],
      items: []
    };
  },

  mounted() {
    if(this.$store.state.user.username ==null){
          router.push("/");

    }

    axios
      .get(
        `http://localhost:8081/SF-15-2018-OWP/ProjekcijaServlet?id=${this.id}`
      )
      .then(res => {
        this.items.push(res.data.projekcija);
        // this.sedista=(res.data.sedista);
        for(var i=0; i<res.data.sedista.length;i++)
        {
          // console.log(res.data.sedista[i].redniBroj)
          this.sedista.push({id:res.data.sedista[i].redniBroj ,disabled:false, redniBroj:res.data.sedista[i].redniBroj})
        }


        // console.log(this.sedista);       
      })
      .catch(err => console.log(err));

     axios
     .get(`http://localhost:8081/SF-15-2018-OWP/ZauzetaSedista?id_projekcije=${this.id}`)
     .then(res=>{
       this.zzz=res.data.zauzetaSedista
       console.log(this.zzz)
     })
     .catch(err=>console.log(err))
  },

  methods: {
    posleucitavanje(){
       this.e6 = 2
           for(var ii=0;ii<this.sedista.length;ii++){
               for(var h=0;h< this.zzz.length;h++){
                   console.log(this.zzz[h])
                 if(this.sedista[ii].redniBroj==this.zzz[h]){
                   console.log("SSS"+this.sedista[ii].redniBroj)
                   this.sedista[ii].disabled=true;
                 }
               }
             }
    },
    dodavanjeKarte(){
      var x=this.selektovanaSedista.sort();
      for(var i=0; i+1<x.length;i++){
        if(x[i].substr(1)==parseInt(x[1+i].substr(1))-1){
          // console.log(x[i].substr(1)+"||||"+x[1+i].substr(1))
        }else{if(x.length!=1){
alert("Sedista moraju biti jedna do drugih")
  this.e6=2
          return
        }
          
        }
      }
      const params = new URLSearchParams();
      params.append("id_projekcije",this.items[0].id)
      params.append("sedista",this.selektovanaSedista)
      
        axios({
          method: "post",
          url: "http://localhost:8081/SF-15-2018-OWP/AddKartaServlet",
          data: params
        })
                .then(function(response) {
            console.log(response);
            if (response.data.status == "failure") {
              alert("doslo je do failura");
            }
            if (response.data.status == "success") {
              alert("Uspeno obavljena kupovina");
              router.push("/");
            }
            //   if (response.data.status == "unauthenticated"|| response.data.status == "unauthorized") {
            //   alert("Doslo je do greske ponovo se login");
            //   router.push("/logout");
            // }
          })
          .catch(function(error) {
            console.log(error);
            alert(error);
          });

    },
      test2(){
          if (this.selektovanaSedista.length>0){
              this.e6 = 3;
          }else{
              alert("Morate izabrati sedista")
          }
      },
      testttt(a){
        // console.log(a)
        for(var i=0; i<this.sedista.length;i++){
          if(this.sedista[i].id[0]!=a[0]){
            if(this.sedista[i].disabled==false ){

            this.sedista[i].disabled=true;
            // this.t.push(this.sedista[i].id)
           
            }else{
              this.sedista[i].disabled=false;
              // for(var s=0; s<this.t.length;s++){
              //   if(this.t[s]==a){
              //     this.t.pop(s)
              //   }
              // }
            }
            }
        }
      if(this.selektovanaSedista.includes(a)){
          this.selektovanaSedista.pop(a)
      }else{
                  this.selektovanaSedista.push(a);

      }
              console.log(this.selektovanaSedista)

              if(this.selektovanaSedista.length<1){
               console.log("SS")
               for(var j=0;j<this.sedista.length;j++){
                 this.sedista[j].disabled=false
               }
              }else{
                 for(var c=0;c<this.sedista.length;c++){
                  if(this.sedista[c].id[0]!=a[0]){
                    // console.log(a+"|||"+this.sedista[c].id[0])
                    this.sedista[c].disabled=true;
                  }
                }
              }
              // console.log(this.selektovanaSedista)

             for(var ii=0;ii<this.sedista.length;ii++){
               for(var h=0;h< this.zzz.length;h++){
                   console.log(this.zzz[h])
                 if(this.sedista[ii].redniBroj==this.zzz[h]){
                   console.log("SSS"+this.sedista[ii].redniBroj)
                   this.sedista[ii].disabled=true;
                 }
               }
             }
                


      },
    onInput(val) {
      this.steps = parseInt(val);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    }
  }
};
</script>

<style >
/* .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #0277BD;
}
.theme--light.v-stepper .v-stepper__step__step {
  color: black;
  background: #0277BD;
} */

.custom-control-label::before {
    background-color:red;
}

</style>

<style  scoped>

.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #0277BD;
}
.theme--light.v-stepper .v-stepper__step__step {
  color: black;
  background: #0277BD;
}


.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #0277BD;
}

</style>
