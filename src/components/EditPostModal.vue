<template>
  <div>
    <div>
      <b-button
        v-b-modal.modal1
        @click="post"
        variant="warning">Edit</b-button>

      <!-- Modal Component -->
      <b-modal id="modal1" title="BootstrapVue" @ok="savePost">
        <div class="form-group">
          <label for="title">Title post</label>
          <input 
            type="text"
            class="form-control" 
            id="title" 
            placeholder="Title"
            v-model="postEdited.title">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            class="form-control" 
            id="description" 
            rows="3"
            v-model="postEdited.description"></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input 
            type="text" 
            multiple 
            class="form-control"
            id="image"
            v-model="postEdited.imageSrc">
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import * as fb from 'firebase';

  export default {
    props: ['id'],
    data () {
      return {
        modal: false,
        postEdited: {
          title: '',
          description: '',
          imageSrc: ''
        }
      }
    },
    methods: {
      post () {
        const id = this.id;
        let post = this.$store.getters.postByID(id);
        this.postEdited.title = post.title;
        this.postEdited.description = post.description;
        this.postEdited.imageSrc = post.imageSrc;
      },
      savePost() {
        fb.database().ref('posts/' + this.id).set(this.postEdited);
        // this.$store.dispatch('fetchPosts');
        this.postEdited.id = this.id;
        this.$store.commit('editPost', this.postEdited);
      }
    }
  }
</script>

<style scoped>
  .activeModal {
    display: block;
  }
  .activeModal:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .9);
  }
</style>
