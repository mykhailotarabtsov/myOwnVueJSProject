export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload);
    },
    setError({commit, dispatch}, payload) {
      commit('setError', payload);
      setTimeout(() => {
        dispatch('clearError');
      }, 3000)
    },
    clearError({commit}) {
      commit('clearError');
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
}