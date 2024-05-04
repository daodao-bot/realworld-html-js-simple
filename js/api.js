const API = "https://api.realworld.io/api";

export function articlesFeed({offset, limit = 10}) {
  return fetch(`${API}/articles/feed?${offset ? `&offset=${offset}` : ''}${limit ? `&limit=${limit}` : ''}`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function articles({tag, author, favorited, offset, limit = 10}) {
  return fetch(`${API}/articles?${tag ? `&tag=${tag}` : ''}${author ? `&author=${author}` : ''}${favorited ? `&favorited=${favorited}` : ''}${offset ? `&offset=${offset}` : ''}${limit ? `&limit=${limit}` : ''}`, {
    headers: localStorage.getItem('token') ? {'Authorization': `Token ${localStorage.getItem('token')}`} : {}
  })
    .then(res => res.json())
    .then(data => data);
}

export function createArticle(article) {
  return fetch(`${API}/articles`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({article})
  })
    .then(res => res.json())
    .then(data => data);
}

export function getArticle(slug) {
  return fetch(`${API}/articles/${slug}`, {
    headers: localStorage.getItem('token') ? {'Authorization': `Token ${localStorage.getItem('token')}`} : {}
  })
    .then(res => res.json())
    .then(data => data);
}

export function putArticle(slug, article) {
  return fetch(`${API}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({article})
  })
    .then(res => res.json())
    .then(data => data);
}

export function deleteArticle(slug) {
  return fetch(`${API}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function getComments(slug) {
  return fetch(`${API}/articles/${slug}/comments`, {
    headers: localStorage.getItem('token') ? {
      'Authorization': `Token ${localStorage.getItem('token')}`
    } : {}
  })
    .then(res => res.json())
    .then(data => data);
}

export function postComment(slug, comment) {
  return fetch(`${API}/articles/${slug}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({comment})
  })
    .then(res => res.json())
    .then(data => data);
}

export function deleteComment(slug, id) {
  return fetch(`${API}/articles/${slug}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function favoriteArticle(slug) {
  return fetch(`${API}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function unfavoriteArticle(slug) {
  return fetch(`${API}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function profiles(username) {
  return fetch(`${API}/profiles/${username}`, {
    headers: localStorage.getItem('token') ? {'Authorization': `Token ${localStorage.getItem('token')}`} : {}
  })
    .then(res => res.json())
    .then(data => data);
}

export function followUser(username) {
  return fetch(`${API}/profiles/${username}/follow`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function unfollowUser(username) {
  return fetch(`${API}/profiles/${username}/follow`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function tags() {
  return fetch(`${API}/tags`)
    .then(res => res.json())
    .then(data => data);
}


export function userLogin(user) {
  return fetch(`${API}/users/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user})
  })
    .then(res => res.json())
    .then(data => data);
}

export function userRegister(user) {
  return fetch(`${API}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user})
  })
    .then(res => res.json())
    .then(data => data);
}

export function getUser() {
  return fetch(`${API}/user`, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => data);
}

export function putUser(user) {
  return fetch(`${API}/user`, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
  })
    .then(res => res.json())
    .then(data => data);
}
