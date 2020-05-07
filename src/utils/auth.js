import Cookies from 'js-cookie';

const TokenKey = 'token';
const IsAdult = 'isAdult';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setAdult() {
  return Cookies.set(IsAdult, 1);
}

export function setUnAdult() {
  return Cookies.set(IsAdult, 0);
}

export function getAdult() {
  return Cookies.get(IsAdult);
}

export function hasLogin(the) {
  const token = localStorage.getItem('token');
  if (!token) {
    the.$router.push({ path: '/login' });
    return false;
  }
  return true;
}
