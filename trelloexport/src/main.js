import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
require('dotenv').config();

Vue.config.productionTip = false;
//Intall Vuex
Vue.use(Vuex);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const store = new Vuex.Store({
  state: {
    trelloBoards: [{Name: '01 - Integrated Portal Development', Key: 'lztHyDSf'}],
    trelloCards: [],
    trelloBoardSelected: { Name: 'Select...', Key: '123456'}
  },
  mutations: {
    getTrelloCards: (state) => {
        var apiKey = '6c376abd3ddca03bcedec4772430b4dc';
        var serverToken = '2ccc3d31f1f33e232bdba86571c88798fe38685490c2c283766ba6419e14e27e';
        var defaultBoard = state.trelloBoards[0].Key;
        console.log(apiKey, serverToken, defaultBoard);
        fetch('https://api.trello.com/1/boards/'+ defaultBoard +'?cards=all&key='+ apiKey +'&token=' + serverToken, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(data => data.json())
        .then((data) => {
            state.trelloCards = data;
        })
        .catch(err => {
            console.error(err);
        });
    },
    selectTrelloBoard: (state, obj) => {
      for(var i = 0; i < state.trelloBoards.length; i++) {
        if (state.trelloBoards[i].Key == obj.Key) {
          state.trelloBoardSelected = obj;
        }
      }
    }
  }
})

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
