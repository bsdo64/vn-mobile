import React, { PropTypes } from 'react';
import cx from 'classnames';

const Managers = React.createClass({
  displayName: 'Managers',
  propTypes: {
    location: PropTypes.object.isRequired,
    Users: PropTypes.object.isRequired,
    Forums: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    FireRequestAddForumManager: PropTypes.func.isRequired,
    FireRequestDeleteForumManager: PropTypes.func.isRequired,
  },
  componentDidMount() {
    const forumId = this.props.location.query.forumId;

    $('.ui.search')
      .search({
        apiSettings: {
          url: '/ajax/search/users?type=manager&nick={query}&forumId=' + forumId
        },
        cache: false,
        minCharacters: 2,
        fields: {
          title: 'nick'
        },
        error: {
          source: '검색 할 수 없습니다 API를 참고하세요',
          noResults: '일치하는 닉네임이 없습니다',
          logging: 'Error in debug logging, exiting.',
          noEndpoint: 'No search endpoint was specified',
          noTemplate: 'A valid template name was not specified.',
          serverError: '서버에러 입니다.',
          maxResults: 'Results must be an array to use maxResults setting',
          method: 'The method you called is not defined.'
        },
        onSelect: (user) => {

          this.selectUser(user);
        }
      });
  },

  selectUser(user) {
    const { location, FireRequestAddForumManager } = this.props;
    const forumId = location.query.forumId;
    FireRequestAddForumManager({ userId: user.id, forumId: forumId });
  },

  removeUser(manager) {
    const { location, FireRequestDeleteForumManager } = this.props;
    const forumId = location.query.forumId;

    FireRequestDeleteForumManager({
      forumId: forumId,
      userId: manager.get('id')
    });

  },

  createManagerItem(id) {
    const { Users, Forums, location, AuthStore } = this.props;
    const manager = Users.get(id.toString());
    const forumId = location.query.forumId;
    const forum = Forums.get(forumId.toString());
    const creatorId = forum.get('creator_id');
    const myId = AuthStore.get('userId');
    const isCreator = creatorId === id;
    const isMe = myId === id;
    const tagStyle = cx('ui label large', {
      teal: isCreator
    });

    if (manager) {
      return (
        <div className="item padded" key={id} style={{ paddingBottom: 5 }}>
          <a className={tagStyle}>
            <span className="title">{manager.get('nick')}</span>
            {
              (!isCreator && !isMe) &&
              <i className="fa fa-remove" onClick={this.removeUser.bind(this, manager)}/>
            }
          </a>
        </div>
      )
    }
  },

  render() {
    const { Forums, location } = this.props;
    const forumId = location.query.forumId;
    const forum = Forums.get(forumId.toString());
    const managerIds = forum.get('managers');

    return (
      <div className="ui container" style={{ margin: 10, width: 700 }}>
        <div className="ui segments ">
          <div className="ui segment">
            <h3 className="ui header">메니저 설정</h3>
            <div className="ui divider"></div>
            <div className="ui list">
              <a className="item">
                <i className="right triangle icon"></i>
                <div className="content">
                  <div className="header">메니저를 설정하고 커뮤니티를 활성화하세요</div>
                  <div className="description">누구나 메니저가 될 수 있습니다</div>
                </div>
              </a><a className="item"><i className="help icon"></i>
              <div className="content">
                <div className="description">게시판 개설자는 최초의 메니저가 됩니다</div>
              </div>
            </a>
            </div>
            <div className="ui two column grid">
              <div className="row">
                <div className="column">
                  <h4>메니저 추가</h4>
                  <div className="ui search">
                    <div className="ui left icon input">
                      <input className="prompt" type="text" placeholder="유저 검색"/>
                      <i className="user icon"/>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <h4>메니저 리스트</h4>
                  <div className="ui list">
                    {
                      managerIds &&
                      managerIds.map(this.createManagerItem)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Managers;
