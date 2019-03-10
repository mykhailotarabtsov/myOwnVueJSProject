<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-5">
      <b-navbar-brand><router-link to="/" class="navbar-brand" href="#">Own Project</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-for="link in links">
            <router-link :to="link.url" class="nav-link">{{link.title}}</router-link>
          </b-nav-item>
          <b-nav-item v-if="isUserLoggedIn" @click="onLogout"><a class="nav-link">Logout</a></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    props: ['links'],
    data () {
      return {
        
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logoutUser');
        this.$router.push('/');
      }
    },
    computed: {
      isUserLoggedIn() {
        return this.$store.getters.isUserLoggedIn;
      },
    }
  }
</script>