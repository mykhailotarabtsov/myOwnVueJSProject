<template>
  <div>
    <b-form v-if="!loading" @submit.prevent="onSubmit">
      <b-form-group
      id="email"
      label="Enter your email please"
      label-for="email"
      >
        <b-form-input type="email" id="email" v-model="user.email" trim :class="{invalid: $v.user.email.$error}" @blur="$v.user.email.$touch()" />
        <p v-if="!$v.user.email.email" class="mt-1 warning">Please provide a valid email adress.</p>
        <p v-if="!$v.user.email.required" class="mt-1 warning">This field most not be empty</p>
      </b-form-group>
      <b-form-group
      id="password"
      label="Enter your password please"
      label-for="password"
      >
        <b-form-input type="password" id="password" v-model="user.password" trim :class="{invalid: $v.user.password.$error}" @blur="$v.user.password.$touch()" />
        <p v-if="$v.user.password.$invalid" class="mt-1 warning">This field most not be empty and most have {{ $v.user.password.$params.minLength.min }} characters</p>
      </b-form-group>
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="$v.$invalid">Submit</button>
    </b-form>

    <app-spinner v-else></app-spinner>
  </div>
</template>

<script>
  import Spinner from '../Spinner.vue';
  import { required, email, minLength } from 'vuelidate/lib/validators';

  export default {
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    validations: {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
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
  .invalid {
    border: 1px solid red;
    background-color: #ffc9aa;
  }
  .warning {
    color: red;
  }
</style>
