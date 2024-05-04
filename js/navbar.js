import {init} from './main.js';

(function () {

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  init().then(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      document.querySelector('a#nav-link-user').href = `/profile/${user.username}`;
      document.querySelector('a#nav-link-user').innerHTML = `<img class="user-pic" src="${user.image}" alt=""/> ${user.username}`;
      document.querySelector('li#nav-item-editor').removeAttribute('hidden');
      document.querySelector('li#nav-item-settings').removeAttribute('hidden');
      document.querySelector('li#nav-item-profile').removeAttribute('hidden');
      document.querySelector('li#nav-item-login').setAttribute('hidden', "true");
      document.querySelector('li#nav-item-register').setAttribute('hidden', "true");
    } else {
      document.querySelector('li#nav-item-editor').setAttribute('hidden', "true");
      document.querySelector('li#nav-item-settings').setAttribute('hidden', "true");
      document.querySelector('li#nav-item-profile').setAttribute('hidden', "true");
      document.querySelector('li#nav-item-login').removeAttribute('hidden');
      document.querySelector('li#nav-item-register').removeAttribute('hidden');
    }
  });

})();