export default function (to, from, next) {
  if (localStorage.getItem('userId') && localStorage.getItem('token') && localStorage.getItem('expirationTime')) {
    next();
  } else {
    next('/login?loginError=true');
  }

}