import Home from './Home.vue';
import Posts from './components/Posts/Posts.vue';
import Post from './components/Posts/Post.vue';
import Login from './components/User/Login.vue';
import Register from './components/User/Register.vue';
import AdPost from './components/Posts/AdPost.vue';
import AuthGuard from './auth-guard';

export const routes = [
  {
    path: '/', component: Home
  },
  {
    path: '/posts', component: Posts, beforeEnter: AuthGuard
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/ad-post', component: AdPost, beforeEnter: AuthGuard
  },
  {
    path: '/post/:id', props: true, name: 'post', component: Post, beforeEnter: AuthGuard
  }
];