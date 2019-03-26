<template>
  <b-row v-if="!loading">
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

          <app-edit-post-modal :id="id" :currentPost="post"></app-edit-post-modal>
        </b-card>
    </b-col>
  </b-row>
  <app-spinner v-else></app-spinner>
</template>

<script>
import EditPostModal from '../EditPostModal.vue';
import Spinner from '../Spinner.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  props: ['id'],
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    ...mapActions([
      'autoLoginUser'
    ]),
    post() {
      const id = this.id;
      return this.$store.getters.postByID(id);
    }
  },
  components: {
    appEditPostModal: EditPostModal,
    appSpinner: Spinner
  },
  mounted() {
    this.autoLoginUser;
  }
}
</script>
