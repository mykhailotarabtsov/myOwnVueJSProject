import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import * as fb from 'firebase';
import {routes} from './routes';
import store from './store/store';
import App from './App.vue'


Vue.use(VueResource);

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  store,
  router,
  created() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB7r70mP-_tv0YgSshgukQGeQK8hwN-duY",
      authDomain: "myownvuejsproject.firebaseapp.com",
      databaseURL: "https://myownvuejsproject.firebaseio.com",
      projectId: "myownvuejsproject",
      storageBucket: "myownvuejsproject.appspot.com",
      messagingSenderId: "567360955594"
    };
    fb.initializeApp(config);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });

    this.$store.dispatch('fetchPosts');
  },
  render: h => h(App),
}).$mount('#app')
