import React, { PropTypes } from 'react';
import Forum from './Forum';
import PostPage from './PostPage';

const CommunityContents = React.createClass({
  displayName: 'CommunityContents',
  propTypes: {
    Forums: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    ListStore: PropTypes.object.isRequired,
    CommunityStore: PropTypes.object.isRequired,
    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireRequestAddForumInCollection: PropTypes.func.isRequired,
    FireRequestRemoveForumInCollection: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestFollowForum: PropTypes.func.isRequired,
    FireRequestUnFollowForum: PropTypes.func.isRequired,
    FireRequestLikePost: PropTypes.func.isRequired,
    FireRequestLikeComment: PropTypes.func.isRequired,
    FireRequestLikeSubComment: PropTypes.func.isRequired,
    FireRequestSubmitComment: PropTypes.func.isRequired,
    FireRequestSubmitSubComment: PropTypes.func.isRequired,
    FireRequestUpdateComment: PropTypes.func.isRequired,
    FireRequestUpdateSubComment: PropTypes.func.isRequired,
    FireOpenCommentUpdateView: PropTypes.func.isRequired,
    FireCloseCommentUpdateView: PropTypes.func.isRequired,
    FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
    FireRequestActivateVenalink: PropTypes.func.isRequired,
    FireRequestParticipateVenalink: PropTypes.func.isRequired,
  },

  checkBanned() {

    const { Forums, AuthStore, ListStore } = this.props;

    const userId = AuthStore.get('userId');

    const forumId = ListStore.get('forum');

    if (forumId) {
      const forum = Forums.get(forumId.toString());

      if (!forum) {
        return false;
      }

      const bans = forum.get('bans');

      if (!bans) {
        return false;
      }

      return bans.includes(userId);
    } else {
      return false;
    }
  },

  render() {
    const type = this.props.CommunityStore.get('type');
    const isLogin = this.props.AuthStore.get('isLogin');
    const isBanned = this.checkBanned();
    if (isLogin && isBanned) {

      return (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
          <h2 className="ui icon header">
            <i className="remove icon"></i>
            <div className="content">
              당신은 벤 되었습니다
              <div className="sub header">다른 게시판을 찾거나 새로운 게시판을 만들어 보세요</div>
            </div>
          </h2>
        </div>
      )

    } else {
      if (type === 'forum') {
        return (
          <Forum
            {...this.props}
          />
        )
      } else if (type === 'post') {
        return (
          <PostPage
            {...this.props}
          />
        )

      } else {
        return (
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">로딩중..</div>
          </div>
        )
      }
    }
  }
});

export default CommunityContents;