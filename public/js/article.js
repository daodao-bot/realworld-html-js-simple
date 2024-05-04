import {
  deleteComment,
  favoriteArticle,
  followUser,
  getArticle,
  deleteArticle,
  getComments,
  postComment,
  unfavoriteArticle,
  unfollowUser
} from './api.js';
import {init} from './main.js';

(function () {

  const slug = location.pathname.split('/').pop();

  function renderArticle() {
    getArticle(slug).then(data => {
      const article = data.article;
      document.querySelector("h1").innerText = article.title;
      document.querySelectorAll("a.author-profile").forEach((a)=>{a.href = `/profile/${article.author.username}`});
      document.querySelector("a.author").innerText = article.author.username;
      document.querySelector("span.author-username").innerText = article.author.username;
      document.querySelector("img.author-image").src = article.author.image;
      document.querySelector("span.date").innerText = new Date(article.createdAt).toDateString();
      document.querySelector("p#p-description").innerText = article.description;
      document.querySelector("p#p-body").innerText = article.body;
      document.querySelector("ul.tag-list").innerHTML = article.tagList.map(tag => `<li class="tag-default tag-pill tag-outline">${tag}</li>`).join('');
      document.querySelector("span#favorite-count").innerHTML = `(${article.favoritesCount})`;
      if (article.favorited) {
        document.querySelector("button#favorite-button").classList.add('btn-primary');
        document.querySelector("button#favorite-button").classList.remove('btn-outline-primary');
      } else {
        document.querySelector("button#favorite-button").classList.remove('btn-primary');
        document.querySelector("button#favorite-button").classList.add('btn-outline-primary');
      }
      if (article.author.following) {
        document.querySelector("button#follow-button").classList.add('btn-secondary');
        document.querySelector("button#follow-button").classList.remove('btn-outline-secondary');
      } else {
        document.querySelector("button#follow-button").classList.remove('btn-secondary');
        document.querySelector("button#follow-button").classList.add('btn-outline-secondary');
      }
      if (article.author.username === JSON.parse(sessionStorage.getItem('user'))?.username) {
        document.querySelector("button#favorite-button").setAttribute('hidden', 'true');
        document.querySelector("button#follow-button").setAttribute('hidden', 'true');
        document.querySelector("button#delete-button").removeAttribute('hidden');
        document.querySelector("button#edit-button").removeAttribute('hidden');
      } else {
        document.querySelector("button#favorite-button").removeAttribute('hidden');
        document.querySelector("button#follow-button").removeAttribute('hidden');
        document.querySelector("button#delete-button").setAttribute('hidden', 'true');
        document.querySelector("button#edit-button").setAttribute('hidden', 'true');
      }
    }).catch(error => {
      console.error(error);
    })
  }

  function renderComments() {
    getComments(slug).then(data => {
      document.querySelector("div#comment-list").innerHTML = '';
      data.comments.forEach(comment => {
        renderComment(comment);
      });
    }).catch(error => {
      console.error(error);
    })
  }

  function renderComment(comment) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const div = document.createElement('div');
    div.classList.add('card');
    div.attributes['data-comment-id'] = comment.id;
    div.innerHTML = `
      <div class="card-block">
        <p class="card-text">${comment.body}</p>
      </div>
      <div class="card-footer">
        <a href="/profile/${comment.author.username}" class="comment-author">
          <img src="${comment.author.image}" class="comment-author-img" alt=""/>
        </a>
        &nbsp;
        <a href="/profile/${comment.author.username}" class="comment-author">${comment.author.username}</a>
        <span class="date-posted">${new Date(comment.createdAt).toDateString()}</span>
        ${user && user.username === comment.author.username ? `
          <span class="mod-options">
            <i class="ion-trash-a delete-comment"></i>
          </span>
        ` : ''}
      </div>
    `;
    document.querySelector("div#comment-list").appendChild(div);
    document.querySelector("i.delete-comment").addEventListener('click', commentDelete)
  }

  function favorite(event) {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      location.href = '/register';
    } else {
      return document.querySelector("button#favorite-button").classList.contains('btn-primary') ? unFavorite : doFavorite
    }
  }

  function doFavorite(event) {
    event.preventDefault();
    favoriteArticle(slug).then(data => {
      document.querySelector("button#favorite-button").classList.add('btn-primary');
      document.querySelector("button#favorite-button").classList.remove('btn-outline-primary');
      document.querySelector("span#favorite-count").innerText = `(${data.article.favoritesCount})`;
    })
  }

  function unFavorite(event) {
    event.preventDefault();
    unfavoriteArticle(slug).then(data => {
      document.querySelector("button#favorite-button").classList.remove('btn-primary');
      document.querySelector("button#favorite-button").classList.add('btn-outline-primary');
      document.querySelector("span#favorite-count").innerText = `(${data.article.favoritesCount})`;
    })
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

  function commentPost(event) {
    event.preventDefault();
    const body = document.querySelector("textarea#comment-content").value;
    postComment(slug, {body}).then(data => {
      document.querySelector("textarea#comment-content").value = '';
      const comment = data.comment;
      renderComment(comment);
    })
  }

  function commentDelete(event) {
    event.preventDefault();
    const commentId = event.target.closest('div.card').attributes['data-comment-id'];
    deleteComment(slug, commentId).then(data => {
      event.target.closest('div.card').remove();
    })
  }

  function editArticle(event) {
    event.preventDefault();
    location.href = `/editor/${slug}`;
  }

  function delArticle(event) {
    event.preventDefault();
    deleteArticle(slug).then(data => {
      location.href = '/';
    }).catch(error => {
      console.error(error);
    })
  }

  init().then(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      document.querySelector("form#comment-form").removeAttribute("hidden");
      document.querySelector("img.user-image").src = user.image;
    } else {
      document.querySelector("p#comment-alert").removeAttribute("hidden");
    }
  });

  renderArticle();

  renderComments();

  document.querySelector("form#comment-form").addEventListener('submit', commentPost);

  document.querySelector("button#favorite-button").addEventListener('click', favorite);

  document.querySelector("button#follow-button").addEventListener('click', follow);

  document.querySelector("button#edit-button").addEventListener('click', editArticle);

  document.querySelector("button#delete-button").addEventListener('click', delArticle);

})();