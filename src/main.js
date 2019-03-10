import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue';
import * as fb from 'firebase';
import {routes} from './routes';
import store from './store/store';
import Vuelidate from 'vuelidate';
import App from './App.vue';

Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueResource);

Vue.use(VueRouter);

Vue.use(Vuelidate);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;

new Vue({
  router,
  store,
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

    // fb.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.dispatch('autoLoginUser', user);
    //   }
    // });
    this.$store.dispatch('autoLoginUser');

    this.$store.dispatch('fetchPosts');
  },
  render: h => h(App),
}).$mount('#app')
