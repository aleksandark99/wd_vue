
<template>
   <div>
      <b-table striped hover :items="items" :fields="fields"></b-table>
      <!--  -->
                     Karte:

             <b-table responsive :fields="fieldsKarte" :items="itemsKarte" >
   <template v-slot:cell(datum)="data">
        <router-link :to="`/karta/${data.item.projekcija}`">{{ data.value}}</router-link>
      </template>
    </b-table>
        <!--  -->
 <div class="container" id="s">
      <div class="row">
        <div class="col-md-4 mx-auto">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
            <b-form-group id="input-group-1" label="Korisnicko ime:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.username"
                disabled="true"
                placeholder="Enter username"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Lozinka:" label-for="input-2">
              <b-form-input
              type="password"
               id="input-2"
               v-model="form.password" 
               required placeholder="Enter password">
               </b-form-input>
               
            </b-form-group>
                        <b-form-group id="input-group-3" label="Potvrdite lozinku:" label-for="input-3">
              <b-form-input
              type="password"
               id="input-3"
               v-model="form.password2" 
               required placeholder="Enter password again">
               </b-form-input>
               
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>

          <br>
          <br>
           <b-button type="submit" @click="promeniUUsera" variant="primary">Promeni u USERA</b-button>
            <b-button type="reset" @click="promeniUAdmina" variant="danger">Promeni u ADMINA</b-button>
         
        </div>
      </div>
    </div>
        <!--  -->
  </div>
</template>

<script>
import router from '../router/index.js'

import axios from 'axios'
export default {
  name: 'User',
  props: ['username'],

  data() {
      return {
        rrr:"",
          fieldsKarte: [
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

        //
        show:false,
             form: {
        username: "",
        password: "",
        password2: "",
      },
        fields: [
          {
            key: 'username',
            sortable: false,
            
          },
          {
            key: 'password',
            sortable: false
          },
          {
            key: 'datumRegistracije',
            sortable: false,
            formatter: 
            value => {
              //  return new Date(value)
             return new Date(value).toLocaleDateString();

            }
            

          }, 
          {
            key: 'uloga',
            sortable: false
          },
               
        ],
        items: [],
}},
methods:{
promeniUUsera(){
        if(this.items[0].uloga=="USER"){
          alert("this user is already user")
        }else{
          alert("Promena u Usera")
      const params = new URLSearchParams();
      params.append("username",this.items[0].username)
      params.append("uloga","USER")
       
                axios({
          method: "post",
          url: "http://localhost:8081/SF-15-2018-OWP/UlogaKorisnikaServlet",
          data: params
        })
        .then(res=>{
          
  if(res.data.status=="success"){
            this.items[0].uloga="USER"
          }
        })
        .catch(err=>console.log(err))
 }


},
promeniUAdmina(){
        if(this.items[0].uloga=="ADMIN"){
          alert("this user is already admin")
        }else{
          alert("Promena u admina")
                const params = new URLSearchParams();
      params.append("username",this.items[0].username)
      params.append("uloga","ADMIN")
       
                axios({
          method: "post",
          url: "http://localhost:8081/SF-15-2018-OWP/UlogaKorisnikaServlet",
          data: params
        })
        .then(res=>{
          if(res.data.status=="success"){
            this.items[0].uloga="ADMIN"
          }
        })
        .catch(err=>console.log(err))
        }



},



  logOut(){
 this.$store.commit("changeUsername", "");
            this.$store.commit("changeadminSeen", false);
                   this.$store.commit("changeuserSeen", false);
  },
    onSubmit(evt) {
      evt.preventDefault();
      if(this.form.password ===this.form.password2){
      // alert(JSON.stringify(this.form));


      // axios.post(`http://172.16.170.175:8081/SF-15-2018-OWP/RegisterServlet`,
      // {
      //   username:"h",        
      //   password:"h",
      // })
var xxx=null;
const params = new URLSearchParams();

if(this.form.username==""){
params.append('username', this.items[0].username);
this.rrr=this.items[0].username;

}else{
params.append('username', this.form.username);
this.rrr=this.form.username;
}
params.append('password',this.form.password );
params.append('staro',this.items[0].username)
var hhh=this.rrr;
console.log(hhh+this.rrr)
axios({
  method: 'post',
  url: 'http://localhost:8081/SF-15-2018-OWP/EditUserServlet',
  data: params
})
  // .then(function (response) {
  .then(response=> {

console.log(response);
    //     alert(JSON.stringify(response))
    if(response.data.status=="failure"){
      alert("Korisnicko ime je failure")
    }
           if (response.data.status == "unauthenticated"|| response.data.status == "unauthorized") {
              alert("Doslo je do greske ponovo se login");
              router.push("/logout");
            }
    if(response.data.status=="success"){
            this.items[0].password=this.form.password
          
       

      alert("Uspeno ste se updejtovali")
       if(this.$store.state.user.role !="ADMIN" ){
                                                     router.push("/logout");
       }
      // rutirati na login ... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            xxx=1;
                            console.log(xxx)

    }
   

  })
  .catch(function (error) {
    console.log(error);
    alert(error)
  })
                              console.log(xxx+"SSSS")








      

      }
      else{
          alert("Lozinke se ne poklapaju")
          this.form.password = "";
          this.form.password2 = "";
      }
    //    if(xxx!=null){
    //   console.log("zovi logout")
    //   this.$store.commit("changeUsername", "");
    //         this.$store.commit("changeadminSeen", false);
    //                this.$store.commit("changeuserSeen", false);
    //                                            router.push("/");

    // }
    },

        onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.username = "";
      this.form.password = "";
      this.form.password2 = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
},

mounted (){            if(this.$store.state.user.role !="ADMIN" ){
if(this.$store.state.user.username !=this.username || this.$store.state.user.username ==null ){
          router.push("/");

}

}


  this.form.username=this.username;
axios.get(`http://localhost:8081/SF-15-2018-OWP/KorisnikServlet?username=${this.username}`)
// .then(res =>  this.items.push(res.data))
.then(res => {
   this.items.push(res.data)
   if(this.$store.state.user.username!=null){
     this.show=true;
     
   }
   else{
     this.show=false;
   }
})

.catch(err => console.log(err))
//
      axios
      .get(
        `http://localhost:8081/SF-15-2018-OWP/KarteKorisnikaServlet?username=${this.username}`

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
//
 }
//

//
}
</script>