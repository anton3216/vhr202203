import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// vux != vuex
export default new Vuex.Store({
  state: {
    routes : []
  },
  mutations: {
    initRoutes : function (state,data){
      this.state.routes = data;
      // console.log("commit...............");
    }
  },
  actions: {

  }
});
