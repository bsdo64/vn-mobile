import qs from 'qs';

class MakeUrl {
  constructor(location) {
    this.pathname = location.pathname + '?';
    this.query = {
      forumId: location.query.forumId,
      postId: location.query.postId,
      p: location.query.p || 1,
      comment_p: location.query.comment_p || 1,
      forumPrefix: location.query.forumPrefix,
      forumSearch: location.query.forumSearch,
      comment_order: location.query.comment_order,
      order: location.query.order,
    }
  }

  // Community Post
  setQuery(typeName, typeValue) {
    this.query[typeName] = typeValue;

    return this;
  }

  removeQuery(...args) {
    for (let index in args) {
      this.query[args[index]] = null;
    }

    return this;
  }

  end() {
    return this.pathname + qs.stringify(this.query, { skipNulls: true });
  }
}

export default MakeUrl;