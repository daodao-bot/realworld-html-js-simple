import {userRegister} from './api.js';

(function () {
  function register(event) {
    event.preventDefault();
    const user = {
      username: document.querySelector("input[type=text]").value,
      email: document.querySelector("input[type=email]").value,
      password: document.querySelector("input[type=password]").value
    };
    userRegister(user).then(data => {
      if (data.errors) {
        const errors = data.errors;
        document.querySelector("ul.error-messages").innerHTML = Object.keys(errors).map(key => errors[key].map(message => `<li>${key} ${message}</li>`)).join('');
      } else {
        localStorage.setItem("token", data.user.token);
        location.href = '/';
      }
    }).catch(error => {
      console.error(error);
    });
  }

  document.querySelector("form").addEventListener('submit', register);

})();