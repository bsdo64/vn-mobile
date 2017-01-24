import React, { PropTypes } from 'react';

const InfiniteLoader = ({ collection }) => {
  if (collection && collection.get('next_page')) {
    return (
      <div className="ui items">
        <div className="ui item load_more_loading">
          <div className="ui text active loader inline centered"></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="no-more-post">
        <div className="alert">
          더이상 표시할 추천 게시물이 없습니다
        </div>
      </div>
    )
  }
};

InfiniteLoader.propTypes = {
  collection: PropTypes.object
};

module.exports = InfiniteLoader;