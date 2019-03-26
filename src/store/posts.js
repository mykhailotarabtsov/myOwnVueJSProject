import * as fb from 'firebase';
import Vue from 'vue';
import router from '../main';

class Post {
  constructor (title, description, author, imageSrc='', id = null) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.imageSrc = imageSrc;
    this.id = id;
  }
}

export default {
  state: {
    posts: [],
  },
  mutations: {
     initPosts(state, payload) {
      if (payload) {
        state.posts = payload;
      } else {
        state.posts = [];
      }
    },
    adPost(state, payload) {
      state.posts.push(payload);
    },
    loadPosts(state, payload) {
      state.posts = payload;
    },
    editPost(state, payload) {
      state.posts.find((post, index) => {
        if (post.id === payload.id) {
          post = payload;
          Vue.set(state.posts, index, payload)
        }
      });
    }
  },
  actions: {
    async fetchPosts({commit, dispatch}) {
      const resultPosts = [];

      try {
        dispatch('setLoading', true);
        const fbValue = await fb.database().ref('posts').once('value');
        const posts = fbValue.val();
        Object.keys(posts).forEach(key => {
          const post = posts[key];
          post.id = key;
          resultPosts.push(post);
        });
        commit('loadPosts', resultPosts);
        dispatch('setLoading', false);
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    async createPost({commit, getters}, payload) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const newPost = new Post (payload.title, payload.description, getters.user, payload.imageSrc)
        const post = await fb.database().ref('posts').push(newPost);
        commit('setLoading', false);
        commit('adPost', {
         ...newPost,
         id: post.key
        });
        router.push('/posts');
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    editPost({commit, dispatch}, payload) {
      dispatch('autoLoginUser');
      if (localStorage.getItem('userId') && localStorage.getItem('token') && localStorage.getItem('expirationTime')) {
        fb.database().ref('posts/' + payload.id).set(payload);
        commit('editPost', payload);
      }
    }
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    postByID(state) {
      return postId => {
        return state.posts.find(post => post.id === postId);
      }
    }
  }
}