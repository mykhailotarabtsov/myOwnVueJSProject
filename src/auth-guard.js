import store from './store/store.js';

export default function (to, from, next) {
  if (localStorage.getItem('userId')) {
    // console.log(localStorage.getItem('userId'));
    next();
  } else {
    // console.log(store.state.user.user);
    next('/login?loginError=true');
    // console.log(store.state.user);
  }

}