import {
  reaction, makeAutoObservable,
} from 'mobx';

import JwtDecode from 'jwt-decode';

class AuthStore {
  constructor() {
    this.accessToken = window.localStorage.getItem('accessToken');

    this.userData = JSON.parse(window.localStorage.getItem('userData'));

    this.userId = null;

    this.isLogged = null;

    this.isAdmin = null;

    this.loading = {};

    makeAutoObservable(this);
    this.isLogged = this.isLoggedIn();
    this.isAdmin = this.userData ? this.userData.isAdmin : false;
    reaction(
      () => this.accessToken,
      (accessToken) => {
        if (accessToken) {
          window.localStorage.setItem('accessToken', accessToken);
        } else {
          window.localStorage.removeItem('accessToken');
        }
      },
    );
  }

  setToken(token) {
    window.localStorage.setItem('accessToken', token);
    this.accessToken = token;
  }

  getToken() {
    return this.accessToken;
  }

  setUser(userData) {
    window.localStorage.setItem('userData', JSON.stringify(userData));
    this.userData = userData;
    this.isAdmin = userData.admin;
  }

  getUser() {
    return this.userData;
  }

  isLoggedIn() {
    if (this.accessToken !== '' && this.accessToken !== null && !this.isExpiredToken(this.accessToken)) {
      return true;
    }
    window.localStorage.removeItem('accessToken');
    return false;
  }

  isExpiredToken(token) {
    const decodedToken = JwtDecode(token);
    this.userId = decodedToken.user_id;
    const now = new Date().getTime();
    decodedToken.exp *= 1000;
    if (decodedToken.exp < now) {
      return true;
    }
    return false;
  }

  setLoginProps(token) {
    this.setToken(token);
    const decodedToken = JwtDecode(token);
    this.setUser({
      "admin": decodedToken.admin,
      "email": decodedToken.email,
      "first_name": decodedToken.first_name,
      "last_name": decodedToken.last_name,
      "username": decodedToken.username,
      "user_id": decodedToken.user_id,
    })
    this.isLogged = true;
  }

  clearLoginProps() {
    this.setToken('');
    this.setUser([]);
    this.isLogged = false;
  }

  async setLoading(key, val) {
    this.loading[key] = val;
  }
}

export default new AuthStore();
