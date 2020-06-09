<template>
    <div>
    <div class="container" id="s">
      <div class="row">
              <div class="col-md-6 mx-auto">
          OD
          <datepicker class="inLine" @input="filterIzvestaj" :disabled-dates="disabledDates" v-model="date1"></datepicker>
          <vue-timepicker class="inLine" @input="filterIzvestaj" v-model="yourTimeValue1"></vue-timepicker>

        </div>
         <div class="col-md-6 mx-auto">
           DO
          <datepicker class="inLine" @input="filterIzvestaj" v-model="date2" ></datepicker>
          <vue-timepicker class="inLine" @input="filterIzvestaj" v-model="yourTimeValue2"></vue-timepicker>

        </div>
 </div> </div>

    <b-table responsive :fields="fields" :items="items">
      <template v-slot:cell(film.naziv)="data">
        <router-link :to="`/film/${data.item.film.id}`">{{ data.value}}</router-link>
      </template>
    </b-table>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router/index.js";
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vuejs-timepicker'
export default {
      components: {
    Datepicker,
    VueTimepicker 
  },
    name:"Izvestaj",
    data(){
        return{
                   yourTimeValue1: {
        HH: "00",
        mm: "00",
      },
      
        date1:"",
      
               yourTimeValue2: {
        HH: "00",
        mm: "00",
      },
        date2:"",
             fields: [
        {
          key: "film.naziv",
          sortable: true
        },
         {
          key: "brojProjekcija",
          sortable: true
        },
        {
          key: "brojKarata",
          sortable: true
        },
            {
          key: "ukupnaCena",
          sortable: true
          
        },
  
      ],
      items: []
            
        };
    },
    methods:{
        testd(){
        if(this.date1 != ""){
                 var formatted_date =this.date1.getFullYear()+"-" +  this.date1.getDate() + "-" + (this.date1.getMonth() + 1) +" "+this.yourTimeValue1.HH+":"+this.yourTimeValue1.mm+":"+"00"
            console.log(formatted_date)
            return formatted_date;
    }},
    testf(){
       console.log(this.date)
        if(this.date2 != ""){
                 var formatted_date =this.date2.getFullYear()+"-" +  this.date2.getDate() + "-" + (this.date2.getMonth() + 1) +" "+this.yourTimeValue2.HH+":"+this.yourTimeValue2.mm+":"+"00"
            console.log(formatted_date)
            return formatted_date;
        }

    },
      filterIzvestaj(){
            var odDate=this.testd();

     var doDate=this.testf();
      this.items=[]
        alert("Ss")
           axios
      .get(`http://localhost:8081/SF-15-2018-OWP/IzvestajServlet?odDate=${odDate}&doDate=${doDate}`)
      .then(res => (this.items = res.data))
      .then(res =>  console.log("sss"+res.data))
      .catch(err => console.log(err));
    
      }
    },
    mounted(){
              if(this.$store.state.user.role !="ADMIN"){
          router.push("/");

    }
   axios
      .get("http://localhost:8081/SF-15-2018-OWP/IzvestajServlet")
      .then(res => (this.items = res.data))
      .then(res =>  console.log("sss"+res.data))
      .catch(err => console.log(err));
    }
}
</script>

<style scoped>
.inLine{
  display: inline-block;
  margin: 5px;
      border: 1px solid;

}
</style>