import {articles, favoriteArticle, followUser, profiles, unfollowUser} from "./api.js";
import {init} from "./main.js";

(function () {

  const username = location.pathname.split('/').pop();

  function renderProfile() {
    profiles(username).then(data => {
      const profile = data.profile;
      document.querySelector("img.profile-image").src = profile.image;
      document.querySelector("h4.profile-username").innerText = profile.username;
      document.querySelector("span.profile-username").innerText = profile.username;
      document.querySelector("p.profile-bio").innerText = profile.bio;
      if (profile.following) {
        document.querySelector("button#follow-button").classList.add('btn-secondary');
        document.querySelector("button#follow-button").classList.remove('btn-outline-secondary');
      } else {
        document.querySelector("button#follow-button").classList.remove('btn-secondary');
        document.querySelector("button#follow-button").classList.add('btn-outline-secondary');
      }
    }).catch(error => {
      console.error(error);
    });
  }

  function renderArticles(data) {
    document.querySelector("div#articles-list").innerHTML = data.articles.map(article => `
      <div class="article-preview">
          <div class="article-meta">
            <a href="/profile/${article.author.username}"><img src="${article.author.image}"  alt=""/></a>
            <div class="info">
              <a href="/profile/${article.author.username}" class="author">${article.author.username}</a>
              <span class="date">${article.createdAt}</span>
            </div>
            <button class="btn ${article.favorited ? 'btn-primary' : 'btn-outline-primary'} btn-sm pull-xs-right">
              <i class="ion-heart"></i> ${article.favoritesCount}
            </button>
          </div>
          <a href="/article/${article.slug}" class="preview-link">
            <h1>${article.title}</h1>
            <p>${article.description}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              ${article.tagList.map(tag => `<li class="tag-default tag-pill tag-outline">${tag}</li>`).join('')}
            </ul>
          </a>
        </div>
      `).join('');
  }

  function renderPagination(data, offset = 0, limit = 10) {
    document.querySelector("ul.pagination").innerHTML = data.articlesCount > 10 ? [...Array(Math.ceil(data.articlesCount / 10)).keys()].map(i => `<li class="page-item ${offset === i * limit ? 'active' : ''}"><a href="" class="page-link">${i + 1}</a></li>`).join('') : '';
  }

  function myArticles(event) {
    if (event) {
      event.preventDefault();
    }
    document.querySelector("a#nav-link-my").classList.add("active");
    document.querySelector("a#nav-link-favorited").classList.remove("active");
    document.querySelector("div#articles-list").innerText = 'Loading articles...';
    articles({author: username}).then(data => {
      renderArticles(data);
      renderPagination(data);
    });
  }

  function favoritedArticles(event) {
    if (event) {
      event.preventDefault();
    }
    document.querySelector("a#nav-link-my").classList.remove("active");
    document.querySelector("a#nav-link-favorited").classList.add("active");
    document.querySelector("div#articles-list").innerText = 'Loading articles...';
    articles({favorited: username}).then(data => {
      renderArticles(data);
      renderPagination(data);
    });
  }

  function toPage(event) {
    event.preventDefault();
    if (event.target.tagName === 'A') {
      const offset = (parseInt(event.target.innerText) - 1) * 10;
      articles({offset}).then(data => {
        renderArticles(data);
        renderPagination(data, offset);
      });
    }
  }

  function follow(event) {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      location.href = '/register';
    } else {
      return document.querySelector("button#follow-button").classList.contains('btn-secondary') ? unFollow : doFollow
    }
  }

  function doFollow(event) {
    event.preventDefault();
    followUser(document.querySelector("span.author-username").innerText).then(data => {
      document.querySelector("button#follow-button").classList.add('btn-secondary');
      document.querySelector("button#follow-button").classList.remove('btn-outline-secondary');
    })
  }

  function unFollow(event) {
    event.preventDefault();
    unfollowUser(document.querySelector("span.author-username").innerText).then(data => {
      document.querySelector("button#follow-button").classList.remove('btn-secondary');
      document.querySelector("button#follow-button").classList.add('btn-outline-secondary');
    })
  }

  init().then(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      document.querySelector('button#follow-button').setAttribute('hidden', "true");
      if (user.username === username) {
        document.querySelector('button#edit-button').removeAttribute('hidden');
      } else {
        document.querySelector('button#edit-button').setAttribute('hidden', "true");
      }
    } else {
      document.querySelector('button#edit-button').setAttribute('hidden', "true");
      document.querySelector("button#follow-button").classList.remove('btn-secondary');
      document.querySelector("button#follow-button").classList.add('btn-outline-secondary');
    }
  });

  renderProfile();

  myArticles();

  document.querySelector("button#follow-button").addEventListener('click', follow);

  document.querySelector("a#nav-link-my").addEventListener('click', myArticles);

  document.querySelector("a#nav-link-favorited").addEventListener('click', favoritedArticles)

  document.querySelector("ul.pagination").addEventListener('click', toPage);

})();