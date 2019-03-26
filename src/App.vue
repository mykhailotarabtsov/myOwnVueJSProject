<template>
  <b-container id="app">
    <app-header :links="links"></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>

    <div v-if="error" class="alert alert-danger alert-dismissible fade show mt-5" role="alert" @click="clearError">
      {{ error }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="clearError">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </b-container>
</template>

<script>
  import Header from './Header.vue';
  import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'error',
      'isUserLoggedIn'
    ]),
    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: 'Home', url: '/'
          },
          {
            title: 'Posts', url: '/posts'
          },
          {
            title: 'Ad Post', url: '/ad-post'
          }
        ]
      } else {
        return [
          {
            title: 'Login', url: '/login'
          },
          {
            title: 'Register', url: '/register'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'clearError',
      'autoLoginUser'
    ])
  },
  created() {
    this.autoLoginUser();
  },
  components: {
    appHeader: Header
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .slide-enter-active {
    animation: slide-in 0.4s ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 0.4s ease-out forwards;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .warning {
    color: red;
  }
</style>
