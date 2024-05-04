import {tags, articles, articlesFeed} from './api.js';
import {init} from './main.js';

(function () {

  function renderTags() {
    tags().then(data => {
      document.querySelector("div.tag-list").innerHTML = data.tags.map(tag => `<a href="" class="tag-pill tag-default">${tag}</a>`).join('');
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

  function globalFeed(event) {
    if (event) {
      event.preventDefault();
    }
    document.querySelector("a#nav-link-your").classList.remove("active");
    document.querySelector("a#nav-link-global").classList.add("active");
    document.querySelector("a#nav-link-tag").classList.remove("active");
    document.querySelector("div#articles-list").innerText = 'Loading articles...';
    articles({}).then(data => {
      renderArticles(data);
      renderPagination(data);
    });
  }

  function yourFeed(event) {
    if (event) {
      event.preventDefault();
    }
    document.querySelector("a#nav-link-your").classList.add("active");
    document.querySelector("a#nav-link-global").classList.remove("active");
    document.querySelector("a#nav-link-tag").classList.remove("active");
    document.querySelector("div#articles-list").innerText = 'Loading articles...';
    articlesFeed({}).then(data => {
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

  function toTag(event) {
    event.preventDefault();
    if (event.target.tagName === 'A') {
      const tag = event.target.innerText.replace('#', '');
      document.querySelector("a#nav-link-your").classList.remove("active");
      document.querySelector("a#nav-link-global").classList.remove("active");
      document.querySelector("a#nav-link-tag").classList.add("active");
      document.querySelector("a#nav-link-tag").innerText = "#" + tag;
      document.querySelector("div#articles-list").innerText = 'Loading articles...';
      articles({tag}).then(data => {
        renderArticles(data);
        renderPagination(data);
      });
    }
  }

  init().then(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      document.querySelector('a#nav-link-your').removeAttribute('hidden');
    } else {
      document.querySelector('a#nav-link-your').setAttribute('hidden', "true");
    }
  });

  document.querySelector("div.tag-list").addEventListener('click', toTag);

  document.querySelector("a#nav-link-tag").addEventListener('click', toTag);

  document.querySelector("a#nav-link-global").addEventListener('click', globalFeed)

  document.querySelector("a#nav-link-your").addEventListener('click', yourFeed);

  document.querySelector("ul.pagination").addEventListener('click', toPage);

  globalFeed();

  renderTags();

})();