<template>
  <div>
    <form v-if="!loading">
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="user.email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password">
      </div>
      <button 
        type="submit" 
        class="btn btn-primary" 
        @click.prevent="onSubmit"
        :disabled="loading">Submit</button>
    </form>
    <app-spinner v-else></app-spinner>
  </div>
</template>

<script>
  import Spinner from '../Spinner.vue';

  export default {
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('loginUser', this.user)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => console.log(err));
      }
    },
    components: {
      appSpinner: Spinner
    },
    created() {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page...')
      }
    }
  }
</script>

<style scoped>

</style>
