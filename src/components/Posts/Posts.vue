<template>
  <div class="container">
    <div class="row">
      <div class="d-flex flex-wrap justify-content-around">
        <div 
          v-for="post in getPosts" 
          :key="post.id"
          class="card col-6 col-md-4 mb-5">
          <img :src="post.imageSrc" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.description }}</p>
            <router-link :to="'/post/' + post.id" class="btn btn-primary">Open</router-link>
            <!-- <button class="btn btn-primary" @click="openPost(post.id)">Open</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Post from './Post.vue';

  export default {
    data () {
      return {
        
      }
    },
    computed: {
      getPosts() {
          return this.$store.getters.getPosts;
      }
    },
    components: {
      appPost: Post
    }
  }
</script>

<style scoped>
  
</style>