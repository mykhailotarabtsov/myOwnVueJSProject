<template>
  <div>
    <b-form v-if="!loading" @submit.prevent="sendPost">
      <b-form-group
        id="titlePost"
        label="Title post:"
        label-for="titlePost"
      >
        <b-form-input
          id="titlePost"
          type="text"
          v-model="data.title"
          placeholder="Enter Title" 
          :class="{'is-invalid': $v.data.title.$error, 'is-valid': !$v.data.title.$invalid }"
          @blur="$v.data.title.$touch()" />
          <p v-if="$v.data.title.$error" class="mt-1 warning">This field most not be empty and most have {{ $v.data.title.$params.minLength.min }} characters</p>
      </b-form-group>
      <b-form-group
        id="description"
        label="Description:"
        label-for="description"
      >
        <b-form-textarea
          id="description"
          v-model="data.description"
          placeholder="Enter description..."
          rows="3"
          max-rows="6"
          :class="{'is-invalid': $v.data.description.$error, 'is-valid': !$v.data.description.$invalid}" 
          @blur="$v.data.description.$touch()"
        />
        <p v-if="$v.data.description.$error" class="mt-1 warning">This field most not be empty and most have {{ $v.data.description.$params.minLength.min }} characters</p>
      </b-form-group>
      <b-form-group
        id="imageSrc"
        label="Image src:"
        label-for="imageSrc"
      >
        <b-form-input
          id="imageSrc"
          type="text"
          v-model="data.imageSrc"
          placeholder="Image src" 
          :class="{'is-invalid': $v.data.imageSrc.$error, 'is-valid': !$v.data.imageSrc.$invalid}" 
          @blur="$v.data.imageSrc.$touch()" />
          <p v-if="$v.data.imageSrc.$error" class="mt-1 warning">This field must be URL address of your image</p>
      </b-form-group>
      <button 
        class="btn btn-success"
        :disabled="$v.$invalid">Send</button>
    </b-form>

    <app-spinner v-else></app-spinner>
  </div>
</template>

<script>
  import Spinner from '../Spinner.vue';
  import { required, minLength, url } from 'vuelidate/lib/validators';

  export default {
    data () {
      return {
        data: {
          title: '',
          description: '',
          imageSrc: ''
        }
      }
    },
    validations: {
      data: {
        title: {
          required,
          minLength: minLength(3)
        },
        description: {
          required,
          minLength: minLength(10)
        },
        imageSrc: {
          required,
          url
        }
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      }
    },
    methods: {
      sendPost() {
        this.$store.dispatch('createPost', this.data)
          .then(() => {
            this.$router.push('/posts');
          })
          .catch(() => {});
      }
    },
    components: {
      appSpinner: Spinner
    }
  }
</script>

<style scoped>
  .warning {
    color: red;
  }
</style>
