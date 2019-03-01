<template>
  <div id="app" class="container">
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
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Home from './Home.vue';

export default {
  name: 'app',
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
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
    clearError() {
      this.$store.dispatch('clearError');
    }
  },
  components: {
    appHeader: Header,
    appHome: Home
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
</style>
