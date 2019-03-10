import store from './store/store.js';

export default function (to, from, next) {
  if (store.state.user) {
    // console.log(store.state.user);
    next();
  } else {
    // console.log(store.getters.user);
    next('/login?loginError=true');
  }
}