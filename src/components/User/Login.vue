<template>
  <div>
    <b-form v-if="!loading" @submit.prevent="onSubmit(user)">
      <b-form-group
      id="email"
      label="Enter your email please"
      label-for="email"
      >
        <b-form-input 
          type="email" 
          id="email" 
          v-model="user.email" 
          trim 
          :class="{'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid}" 
          @blur="$v.user.email.$touch()" 
        />
        <p v-if="!$v.user.email.email" class="mt-1 warning">Please provide a valid email adress.</p>
        <p v-if="!$v.user.email.required && $v.user.email.$error" class="mt-1 warning">This field most not be empty</p>
      </b-form-group>
      <b-form-group
      id="password"
      label="Enter your password please"
      label-for="password"
      >
        <b-form-input 
          type="password" 
          id="password" 
          v-model="user.password" 
          trim 
          :class="{'is-invalid': $v.user.password.$error, 'is-valid': !$v.user.password.$invalid}" 
          @blur="$v.user.password.$touch()" 
        />
        <p v-if="$v.user.password.$invalid && $v.user.password.$error" class="mt-1 warning">This field most not be empty and most have {{ $v.user.password.$params.minLength.min }} characters</p>
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
  import {mapGetters, mapActions} from 'vuex';

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
      ...mapGetters([
        'loading'
      ])
    },
    methods: {
      ...mapActions({
        onSubmit: 'loginUser'
      })
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
  .warning {
    color: red;
  }
</style>
