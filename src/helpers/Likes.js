const likes = getLikes();

export function changeLikes(keyLike, liked = false) {
  likes[keyLike] = liked;
  setLikes(likes);
}

export function isLike(keyLike) {
  return likes[keyLike];
}

function setLikes(likes) {
  localStorage.setItem('likes', JSON.stringify(likes));
}

function getLikes() {
  const data = localStorage.getItem('likes');

  return data ? JSON.parse(data) : {};
}
