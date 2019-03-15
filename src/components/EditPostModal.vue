<template>
  <div>
    <div>
      <b-button
        v-b-modal.modal1
        @click="post"
        variant="warning">Edit</b-button>

      <!-- Modal Component -->
      <b-modal id="modal1" title="BootstrapVue" @ok="savePost(postEdited)" :ok-disabled="$v.$invalid">
        <b-form @ok="savePost(postEdited)">
          <b-form-group
            id="titlePost"
            label="Title post:"
            label-for="titlePost"
          >
            <b-form-input
              id="titlePost"
              type="text"
              v-model="postEdited.title"
              placeholder="Enter Title" 
              :class="{'is-invalid': $v.postEdited.title.$error, 'is-valid': !$v.postEdited.title.$invalid }" 
              @blur="$v.postEdited.title.$touch()" />
              <p v-if="$v.postEdited.title.$error" class="mt-1 warning">This field most not be empty and most have {{ $v.postEdited.title.$params.minLength.min }} characters</p>
          </b-form-group>
          <b-form-group
            id="description"
            label="Description:"
            label-for="description"
          >
            <b-form-textarea
              id="description"
              v-model="postEdited.description"
              placeholder="Enter description..."
              rows="3"
              max-rows="6"
              :class="{'is-invalid': $v.postEdited.description.$error, 'is-valid': !$v.postEdited.description.$invalid}" 
              @blur="$v.postEdited.description.$touch()"
            />
            <p v-if="$v.postEdited.description.$error" class="mt-1 warning">This field most not be empty and most have {{ $v.postEdited.description.$params.minLength.min }} characters</p>
          </b-form-group>
          <b-form-group
            id="imageSrc"
            label="Image src:"
            label-for="imageSrc"
          >
            <b-form-input
              id="imageSrc"
              type="text"
              v-model="postEdited.imageSrc"
              placeholder="Image src" 
              :class="{'is-invalid': $v.postEdited.imageSrc.$error, 'is-valid': !$v.postEdited.imageSrc.$invalid}" 
              @blur="$v.postEdited.imageSrc.$touch()" />
              <p v-if="$v.postEdited.imageSrc.$error" class="mt-1 warning">This field must be URL address of your image</p>
          </b-form-group>
        </b-form>

      </b-modal>
    </div>
  </div>
</template>

<script>
  import * as fb from 'firebase';
  import { required, minLength, url } from 'vuelidate/lib/validators';
  import {mapMutations} from 'vuex';

  export default {
    props: ['id'],
    data () {
      return {
        modal: false,
        postEdited: {
          title: '',
          description: '',
          imageSrc: '',
          id: this.id
        }
      }
    },
    validations: {
      postEdited: {
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
    methods: {
      ...mapMutations({
        savePost: 'editPost'
      }),
      post () {
        const id = this.id;
        let post = this.$store.getters.postByID(id);
        this.postEdited.title = post.title;
        this.postEdited.description = post.description;
        this.postEdited.imageSrc = post.imageSrc;
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
  .warning {
    color: red;
  }
</style>
