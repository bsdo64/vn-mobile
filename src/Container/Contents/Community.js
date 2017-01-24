import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Community from '../../Components/Contents/Community';
import { UI, Domains } from '../../Reducers/InitialStates';

import { setScrollPosition } from '../../Actions/List';
import { toggleLoginModal } from '../../Actions/Login';
import { toggleReportModal } from '../../Actions/Report';
import { requestFollowForum, requestUnFollowForum } from '../../Actions/Forum';
import { requestAddForumInCollection, requestRemoveForumInCollection } from '../../Actions/Collection';
import { toggleDeleteModal } from '../../Actions/DeleteItem';
import { requestLikePost, toggleActiveVenalinkModal } from '../../Actions/Post';
import {
  requestSubmitSubComment, requestSubmitComment,
  requestLikeComment, requestLikeSubComment,
  requestUpdateComment, requestUpdateSubComment,
  openCommentUpdateView, closeCommentUpdateView,
} from '../../Actions/Comment';
import {
  requestActivateVenalink, requestParticipateVenalink
} from '../../Actions/VenacleStore';

const CommunityContainer = React.createClass({
  render() {
    return (<Community {...this.props} />)
  }
});

CommunityContainer.defaultProps = {
  LoginStore: UI.Login,
  CommunityStore: UI.Community,
  ListStore: UI.List,
  AuthStore: UI.Auth,
  ForumStore: UI.Forum,
  PaginationStore: UI.Pagination,

  Collections: Domains.Collections,
  Forums: Domains.Forums,
  Users: Domains.Users,
  Posts: Domains.Posts,
  Comments: Domains.Comments,
  SubComments: Domains.SubComments,
  Prefixes: Domains.Prefixes,
  Venatems: Domains.Venatems,
  Items: Domains.Items,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    LoginModalStore: getUIState('LoginModal'),
    ListStore: getUIState('List'),
    AuthStore: getUIState('Auth'),
    ForumStore: getUIState('Forum'),
    PaginationStore: getUIState('Pagination'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Collections: getDomainState('Collections'),
    Forums: getDomainState('Forums'),
    Users: getDomainState('Users'),
    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
    Prefixes: getDomainState('Prefixes'),
    Items: getDomainState('Items'),
    Venatems: getDomainState('Venatems'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireSetScrollPosition: setScrollPosition,
    FireToggleLoginModal: toggleLoginModal,
    FireToggleReportModal: toggleReportModal,
    FireToggleDeleteModal: toggleDeleteModal,
    FireRequestAddForumInCollection: requestAddForumInCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
    FireRequestFollowForum: requestFollowForum,
    FireRequestUnFollowForum: requestUnFollowForum,
    FireRequestLikePost: requestLikePost,
    FireRequestLikeComment: requestLikeComment,
    FireRequestLikeSubComment: requestLikeSubComment,
    FireRequestSubmitComment: requestSubmitComment,
    FireRequestSubmitSubComment: requestSubmitSubComment,
    FireRequestUpdateComment: requestUpdateComment,
    FireRequestUpdateSubComment: requestUpdateSubComment,
    FireOpenCommentUpdateView: openCommentUpdateView,
    FireCloseCommentUpdateView: closeCommentUpdateView,
    FireToggleActiveVenalinkModal: toggleActiveVenalinkModal,
    FireRequestActivateVenalink: requestActivateVenalink,
    FireRequestParticipateVenalink: requestParticipateVenalink,
  }
)(CommunityContainer);
