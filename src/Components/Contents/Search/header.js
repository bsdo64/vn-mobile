import React, { PropTypes } from 'react';

const SearchHeader = React.createClass({
  displayName: 'SearchHeader',
  propTypes: {
    posts: PropTypes.object.isRequired,
  },

  render() {
    const { posts } = this.props;
    if (posts) {
      const postData = posts.get('posts');
      const total = postData.get('total') ? postData.get('total') : 0;

      return (
        <div className="search-header">
          포스트 {total}개
        </div>
      );
    }

    return <div></div>
  }
});

export default SearchHeader;
