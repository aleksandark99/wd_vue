import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
   id_karte:null,

    testP:"",

   formovie:"",
    user: {
        username:null,
        role: null,
      },
      userSeen:true,
      adminSeen:false,
      loggedIn:false,


 },
 getters: {},
 mutations: {
  changeIdkarte(state,payload){
    state.id_karte=payload;
 },
   changeForMovie(state,payload){
      state.formovie=payload;
   },
    changeRole (state, payload) {
        state.user.role = payload
      },
      changeUsername (state, payload) {
        state.user.username = payload
      },

      changeuserSeen(state,payload){
          state.userSeen=payload
      },
      changeadminSeen(state,payload){
        state.adminSeen=payload
    },
    changeLogedIn(state,payload){
      state.loggedIn=payload
  },changetestP(state,payload){
    state.testP=payload
  }
    
 },
 actions: {}
});