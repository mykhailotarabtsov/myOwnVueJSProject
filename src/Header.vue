<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-5">
      <b-navbar-brand><router-link to="/" class="navbar-brand" href="#">Own Project</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item 
            v-for="(link, index) in links"
            :key="index">
            <router-link :to="link.url" class="nav-link">{{link.title}}</router-link>
          </b-nav-item>
          <b-nav-item v-if="isUserLoggedIn" @click="logoutUser"><a class="nav-link">Logout</a></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    props: ['links'],
    data () {
      return {
        // links: []
      }
    },
    methods: {
      ...mapActions([
        'logoutUser'
      ])
    },
    computed: {
      ...mapGetters([
        'isUserLoggedIn'
      ])
    },
    // created() {
    //   if (this.isUserLoggedIn) {
    //     this.links = [
    //       {
    //         title: 'Home', url: '/'
    //       },
    //       {
    //         title: 'Posts', url: '/posts'
    //       },
    //       {
    //         title: 'Ad Post', url: '/ad-post'
    //       }
    //     ]
    //   } else {
    //     this.links = [
    //       {
    //         title: 'Login', url: '/login'
    //       },
    //       {
    //         title: 'Register', url: '/register'
    //       }
    //     ]
    //   }
    // }
  }
</script>