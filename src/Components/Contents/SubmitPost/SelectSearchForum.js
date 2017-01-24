import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import AvatarImage from '../../AvatarImage';

const SelectSearchForum = React.createClass({
  propTypes: {
    profile: PropTypes.object.isRequired,
  },

  componentDidMount() {
    $('.ui.search_forums')
      .search({
        searchFullText: false,
        apiSettings: {
          url: '/ajax/search/forum?q={query}'
        },
        error: {
          source: '검색 할 수 없습니다 API를 참고하세요',
          noResults: '일치하는 제목의 게시판이 없습니다',
          logging: 'Error in debug logging, exiting.',
          noEndpoint: 'No search endpoint was specified',
          noTemplate: 'A valid template name was not specified.',
          serverError: '서버에러 입니다.',
          maxResults: 'Results must be an array to use maxResults setting',
          method: 'The method you called is not defined.'
        },
        onSelect: (forum) => {

          this.selectForum(forum);
        }
      });
  },

  selectForum(forum) {

    if (forum && forum.id) {
      browserHistory.push('/community/submit?forumId=' + forum.id)
    }
  },

  render() {
    const { profile } = this.props;
    const sex = profile.get('sex');
    const avatarImg = profile.get('avatar_img');

    return (
      <div id="submit_box" className="ui items">
        <div className={"ui item post_item"}>
          {/* avatar */}
          <div className="ui image tiny">
            <AvatarImage
              sex={sex}
              avatarImg={avatarImg}
            />
          </div>

          {/* meta */}
          <div className="ui segment search_forum_box">
            <div className="search_box">
              <h3 className="ui header">
                게시판 선택
                <div className="sub header">관심 게시판을 찾아보세요</div>
              </h3>

              <div className="ui search search_forums">
                <div className="ui icon input">
                  <input className="prompt" type="text" placeholder="게시판 찾아보기"/>
                  <i className="search icon"></i>
                </div>
                <div className="results"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

export default SelectSearchForum;
