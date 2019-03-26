import * as fb from 'firebase';
import router from '../main.js';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async registerUser({commit}, {email, password}) {
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
        commit('setUser', user.user.uid);
        commit('setLoading', false);
        router.push('/');
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async loginUser({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password);
        const token = await user.user.getIdTokenResult();
        localStorage.setItem('token', token.token);
        localStorage.setItem('userId', token.claims.user_id);
        const expirationDate = new Date(token.expirationTime);
        localStorage.setItem('expirationTime', expirationDate);
        commit('setUser', user.user.uid);
        commit('setLoading', false);
        router.push('/');
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    autoLoginUser({commit, dispatch}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationTime = new Date(localStorage.getItem('expirationTime')).getTime();
      const now = new Date().getTime();
      if (now >= expirationTime) {
        dispatch('logoutUser');
        return;
      }
      const userId = localStorage.getItem('userId');
      commit('setUser', userId);
    },
    logoutUser({commit}) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationTime');
      commit('setUser', null);
      router.push('/login');
    }
  },
  getters: {
    isUserLoggedIn(state) {
      return state.user !== null;
    }
  }
}