import React, { PropTypes } from 'react';

require('./index.scss');
const Announce = React.createClass({
  propTypes: {
    ForumSettingStore: PropTypes.object.isRequired,
    FireHandleResetButton: PropTypes.func.isRequired,
    FireHandleChangeFormForumMeta: PropTypes.func.isRequired,
    FireRequestUpdateForumMeta: PropTypes.func.isRequired,
    FireRequestDeleteForumAnnounce: PropTypes.func.isRequired,
  },

  componentWillUnmount() {
    this.props.FireHandleResetButton();
  },

  updateAnnounce(e) {
    e.preventDefault();
    e.stopPropagation();

    const { ForumSettingStore, FireRequestUpdateForumMeta } = this.props;
    const forumInfo = ForumSettingStore.get('forumInfo');
    const forum = ForumSettingStore.get('forum');

    FireRequestUpdateForumMeta({
      id: forum.get('id'),
      sub_header: forumInfo ? forumInfo.get('forum_sub_header') : forum.get('sub_header'),
      description: forumInfo ? forumInfo.get('forum_description') : forum.get('description'),
      rule: forumInfo ? forumInfo.get('forum_rule') : forum.get('rule')
    })
  },

  changeForm(e) {
    this.props.FireHandleChangeFormForumMeta({ [e.target.name]: e.target.value.trim() })
  },

  removeAnnounce(announce) {
    "use strict";
    const { ForumSettingStore, FireRequestDeleteForumAnnounce } = this.props;
    // const forumInfo = ForumSettingStore.get('forumInfo');
    const forum = ForumSettingStore.get('forum');

    FireRequestDeleteForumAnnounce({
      forumId: forum.get('id'),
      postId: announce.get('id')
    })
  },

  render() {
    const { ForumSettingStore } = this.props;
    const forum = ForumSettingStore.get('forum');

    if (forum) {
      const announces = forum.get('announces');
      const patch = ForumSettingStore.getIn(['forumInfo', 'success']);
      const patchSuccess = patch === 'updated' ? true : patch === 'failed' ? false : null;
      let button;

      if (patchSuccess === true) {
        button = <div className="ui submit button positive">변경 완료</div>
      } else if (patchSuccess === false) {
        button = <button type="submit" className="ui submit button negative">변경 실패</button>
      } else if (patchSuccess === null) {
        button = <button type="submit" className="ui submit button primary">변경</button>
      }

      return (
        <div className="ui container announce" style={{ margin: 10, width: 700 }}>
          <div className="ui segments ">
            <div className="ui segment">
              <h3 className="ui header">공지글 설정</h3>
              <div className="ui divider"></div>
              <div className="ui list">
                <a className="item"><i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">공지글을 설정합니다</div>
                    <div className="description"> - 최대 5개의 공지글을 설정할 수 있습니다</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="ui segment">
              <ul className="announce-list">
                {
                  announces &&
                  announces.map(announce => {
                    "use strict";
                    return (
                      <li className="announce-item" key={announce.get('id')}>
                        <a className="ui label large">
                          <i className="fa fa-thumb-tack"/>
                          <span className="title">{announce.get('title')}</span>
                          <i className="fa fa-remove" onClick={this.removeAnnounce.bind(this, announce)}/>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      )
    }

    return <div></div>
  }
});

export default Announce;