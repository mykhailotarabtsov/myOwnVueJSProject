<template>
  <div>
    <div>
      <button class="btn btn-warning" slot="activator" @click="post">Edit</button>
      <div v-if="modal" class="modal" :class="{activeModal: modal}">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modal = !modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

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

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="modal = !modal">Close</button>
              <button type="button" class="btn btn-primary" @click="savePost">Save changes</button>
            </div>
          </div>
        </div>
      </div>
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
        this.modal = !this.modal;
      },
      savePost() {
        fb.database().ref('posts/' + this.id).set(this.postEdited);
        this.$store.dispatch('fetchPosts');
        this.modal = !this.modal;
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
