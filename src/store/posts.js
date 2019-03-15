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
    posts: [
      // {
      //   id: 0,
      //   author: 'Mykhailo',
      //   title: 'First Post',
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere erat sit amet nisl molestie, non aliquam augue gravida. Maecenas malesuada lacinia urna a commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula magna, accumsan ut lacus eu, facilisis euismod lectus. Vestibulum eleifend molestie bibendum. Mauris faucibus non quam ac suscipit. Cras imperdiet tortor eget metus dictum gravida. Donec varius egestas ex id rutrum. Nulla sed dolor venenatis, rutrum mauris a, rhoncus purus.',
      //   img: 'https://cs8.pikabu.ru/post_img/big/2016/01/26/9/1453819344162885972.jpg'
      // },
      // {
      //   id: 1,
      //   author: 'Gregory',
      //   title: 'Second Post',
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere erat sit amet nisl molestie, non aliquam augue gravida. Maecenas malesuada lacinia urna a commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula magna, accumsan ut lacus eu, facilisis euismod lectus. Vestibulum eleifend molestie bibendum. Mauris faucibus non quam ac suscipit. Cras imperdiet tortor eget metus dictum gravida. Donec varius egestas ex id rutrum. Nulla sed dolor venenatis, rutrum mauris a, rhoncus purus.',
      //   img: 'https://s.dou.ua/img/announces/how-to-front-end-840.jpg'
      // },
      // {
      //   id: 2,
      //   author: 'Volodya',
      //   title: 'Third Post',
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere erat sit amet nisl molestie, non aliquam augue gravida. Maecenas malesuada lacinia urna a commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula magna, accumsan ut lacus eu, facilisis euismod lectus. Vestibulum eleifend molestie bibendum. Mauris faucibus non quam ac suscipit. Cras imperdiet tortor eget metus dictum gravida. Donec varius egestas ex id rutrum. Nulla sed dolor venenatis, rutrum mauris a, rhoncus purus.',
      //   img: 'http://blog.edx.org/wp-content/uploads/2016/07/FrontEndDev.jpg'
      // }
    ],
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
      fb.database().ref('posts/' + payload.id).set(payload);
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