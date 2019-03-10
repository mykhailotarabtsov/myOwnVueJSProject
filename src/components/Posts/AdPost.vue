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
          placeholder="Enter Title" />
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
        />
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
          placeholder="Image src" />
      </b-form-group>
      <button 
        class="btn btn-success">Send</button>
    </b-form>

    <app-spinner v-else></app-spinner>
  </div>
</template>

<script>
  import Spinner from '../Spinner.vue';

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

</style>
