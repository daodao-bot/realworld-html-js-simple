import { putUser } from './api.js';

(function (){

  function updateSettings(event) {
    event.preventDefault();
    const user = {
      image: document.querySelector("input[type=url]").value,
      username: document.querySelector("input[type=text]").value,
      bio: document.querySelector("textarea").value,
      email: document.querySelector("input[type=email]").value,
      password: document.querySelector("input[type=password]").value
    };
    putUser(user).then(data => {
      if (data.errors) {
        const errors = data.errors;
        document.querySelector("ul.error-messages").innerHTML = Object.keys(errors).map(key => errors[key].map(message => `<li>${key} ${message}</li>`)).join('');
      } else {
        location.href = `/profile/${data.user.username}`;
      }
    }).catch(error => {
      console.error(error);
    });
  }

  function logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.href = '/';
  }

  document.querySelector("form").addEventListener('submit', updateSettings);

  document.querySelector('button#button-logout').addEventListener('click', logout);

})();
