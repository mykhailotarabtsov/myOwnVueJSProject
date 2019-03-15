import * as fb from 'firebase';
import router from '../main.js';

// class User {
//   constructor (id) {
//     this.id = id;
//   }
// }

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      // console.log(state.user);
      state.user = payload;
      // console.log(payload);
    }
  },
  actions: {
    async registerUser({commit, dispatch}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      console.log(email, password);
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password);
        const token = await user.user.getIdTokenResult();
        localStorage.setItem('token', token.token);
        localStorage.setItem('userId', token.claims.user_id);
        const expirationDate = new Date(token.expirationTime);
        localStorage.setItem('expirationTime', expirationDate);
        console.log(token);
        dispatch('setLogoutTimer', expirationDate.getTime() - new Date().getTime())
        // commit('setUser', new User (user.user.uid));
        commit('setUser', user.user.uid);
        dispatch('fetchPosts');
        commit('setLoading', false);
        router.push('/');
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async loginUser({commit, dispatch}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password);
        const token = await user.user.getIdTokenResult();
        localStorage.setItem('token', token.token);
        localStorage.setItem('userId', token.claims.user_id);
        const expirationDate = new Date(token.expirationTime);
        localStorage.setItem('expirationTime', expirationDate);
        dispatch('setLogoutTimer', expirationDate.getTime() - new Date().getTime());
        // commit('setUser', new User (user.user.uid));
        commit('setUser', user.user.uid);
        dispatch('fetchPosts');
        commit('setLoading', false);
        router.push('/');
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    setLogoutTimer ({dispatch}, expirationTime) {
      setTimeout(() => {
        dispatch('logoutUser');
      }, expirationTime);
    },
    autoLoginUser({commit, dispatch}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();
      const now = new Date().getTime();
      // console.log(now);
      // console.log(expirationTime);
      if (now >= expirationTime) {
        dispatch('logoutUser');
        return;
      }
      const userId = localStorage.getItem('userId');
      // commit('setUser', new User(userId));
      commit('setUser', userId);
      dispatch('fetchPosts');
    },
    logoutUser({commit}) {
      // fb.auth().signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationTime');
      commit('setUser', null);
      router.push('/login');
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    }
  }
}