<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand" href="#">Own Project</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link :to="link.url" class="nav-item active" v-for="link in links">
            <a class="nav-link" href="#">{{link.title}} <span class="sr-only">(current)</span></a>
          </router-link>

          <li class="nav-item" v-if="isUserLoggedIn">
            <a href="" @click="onLogout" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    props: ['links'],
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