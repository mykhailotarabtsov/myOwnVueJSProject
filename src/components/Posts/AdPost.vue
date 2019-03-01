<template>
  <div>
    <form v-if="!loading">
      <div class="form-group">
        <label for="title">Title post</label>
        <input 
          type="text"
          class="form-control" 
          id="title" 
          placeholder="Title"
          v-model="data.title">
      </div>
      <!-- <div class="form-group">
        <label for="author">Author</label>
        <input 
          type="text" 
          class="form-control" 
          id="author"
          v-model="data.author">
      </div> -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          class="form-control" 
          id="description" 
          rows="3"
          v-model="data.description"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input 
          type="text" 
          multiple 
          class="form-control" 
          id="image"
          v-model="data.imageSrc">
      </div>
      <button 
        class="btn btn-success"
        @click.prevent="sendPost">Send</button>
    </form>
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
        this.$store.dispatch('createAd', this.data)
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
