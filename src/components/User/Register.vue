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
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" placeholder="Password" v-model="confirmPassword">
      </div>
      <button 
        type="submit" 
        class="btn btn-primary" 
        :disabled="loading"
        @click.prevent="onSubmit">Submit</button>
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
        },
        confirmPassword: ''
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      }
    },
    methods: {
      onSubmit() {
        if (this.user.password === this.confirmPassword) {
          this.$store.dispatch('registerUser', this.user)
            .then(() => {
              this.$router.push('/');
            })
            .catch(err => console.log(err));
          this.resetForm();
        } else {
          alert('Passwords is not equal!');
        }
      },
      resetForm() {
        this.user.email = '';
        this.user.password = '';
        this.confirmPassword = '';
      }
    },
    components: {
      appSpinner: Spinner
    }
  }
</script>

<style scoped>

</style>
