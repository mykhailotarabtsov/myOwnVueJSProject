<template>
  <div class="container">
    <div class="row">
      <div class="card col-12">
        <img :src="post.imageSrc" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.description }}</p>
          <app-edit-post-modal :id="id"></app-edit-post-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditPostModal from '../EditPostModal.vue';

export default {
  props: ['id'],
  data () {
    return {
      
    }
  },
  computed: {
    post() {
      const id = this.id;
      return this.$store.getters.postByID(id);
    }
  },
  components: {
    appEditPostModal: EditPostModal
  }
}
</script>
