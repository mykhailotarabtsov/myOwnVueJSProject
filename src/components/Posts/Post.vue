<template>
  <b-row>
    <b-col cols="12">
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

          <app-edit-post-modal :id="id"></app-edit-post-modal>
        </b-card>
    </b-col>
  </b-row>
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
