import {getUser} from "./api.js";

export function init() {
  if (sessionStorage.getItem('user')) {
    return Promise.resolve();
  }
  const token = localStorage.getItem('token');
  if (token) {
    return getUser().then(data => {
      sessionStorage.setItem('user', JSON.stringify(data.user));
      document.querySelector('.user-pic').src = data.user.image;
    });
  } else {
    return Promise.resolve();
  }
}
