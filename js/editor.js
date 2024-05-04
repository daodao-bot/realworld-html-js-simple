import {createArticle, getArticle, putArticle} from './api.js';

(function () {

  const slug = location.pathname.split('/').pop();

  function renderArticle() {
    if (slug === 'editor') {
      return;
    }
    getArticle(slug).then(data => {
      const article = data.article;
      document.querySelector("input#input-title").value = article.title;
      document.querySelector("input#input-description").value = article.description;
      document.querySelector("textarea").value = article.body;
      document.querySelector("div.tag-list").innerHTML = article.tagList.map(tag => `<span class="tag-default tag-pill"> <i class="ion-close-round"></i> ${tag} </span>`).join('');
      document.querySelector('i.ion-close-round')?.addEventListener('click', delTag);
    }).catch(error => {
      console.error(error);
    })
  }

  function saveArticle(event) {
    event.preventDefault();
    const article = {
      title: document.querySelector("input#input-title").value,
      description: document.querySelector("input#input-description").value,
      body: document.querySelector("textarea").value,
      tagList: document.querySelector("div.tag-list").innerText.split('\n').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    };
    (slug === 'editor' ? createArticle(article) : putArticle(slug, article)).then(data => {
      if (data.errors) {
        const errors = data.errors;
        document.querySelector("ul.error-messages").innerHTML = Object.keys(errors).map(key => errors[key].map(message => `<li>${key} ${message}</li>`)).join('');
      } else {
        location.href = `/article/${data.article.slug}`;
      }
    }).catch(error => {
      console.error(error);
    });
  }

  function delTag(event) {
    event.preventDefault();
    event.target.parentElement.remove();
  }

  function addTag(event) {
    event.preventDefault();
    const tag = document.querySelector("input#input-tags").value;
    document.querySelector("div.tag-list").innerHTML += `<span class="tag-default tag-pill"> <i class="ion-close-round"></i> ${tag} </span>`;
    document.querySelector("input#input-tags").value = "";
    document.querySelector('i.ion-close-round').addEventListener('click', delTag);
  }

  document.querySelector("form").addEventListener('submit', saveArticle);

  document.querySelector('input#input-tags').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTag(event);
    }
  });

  renderArticle();

})();