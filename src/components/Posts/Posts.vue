<template>
  <b-row v-if="!loading">
    <div class="d-flex flex-wrap">
      <div
        v-for="post in getPosts" 
        :key="post.id"
        class="col-6 col-md-4 mb-4">
        <b-card
          :title="post.title"
          :img-src="post.imageSrc"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text>
            {{ post.description }}
          </b-card-text>

          <router-link :to="'/post/' + post.id" class="btn btn-primary">Open</router-link>
        </b-card>
      </div>
    </div>
  </b-row>
  <app-spinner v-else></app-spinner>
</template>

<script>
  import Spinner from '../Spinner.vue';
  import {mapGetters, mapActions} from 'vuex';
  export default {
    data () {
      return {
        
      }
    },
    computed: {
      ...mapGetters([
        'getPosts',
        'loading'
      ]),
      ...mapActions([
        'fetchPosts',
        'autoLoginUser'
      ])
    },
    components: {
      appSpinner: Spinner
    },
    created() {
      this.fetchPosts;
    },
    mounted() {
      this.autoLoginUser;
    }
  }
</script>

<style scoped>
  
</style>