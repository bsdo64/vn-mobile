import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import SubmitPost from '../../Components/Contents/SubmitPost';
import { UI } from '../../Reducers/InitialStates';
import {
  removeServerInit,
  handlePostContent,
  handlePostTitle,
  handleResetPostContent,
  handleSelectPrefix,
  handleAddPostImages,
  handleDeletePostImages,
  handleSetRepresentImage,
  requestSubmitPost,
  requestDeleteUnUsingImage,
  requestUpdatePost,
  requestGetPostMeta,
} from '../../Actions/Post';

const SubmitPostContainer = React.createClass({
  render() {
    return (<SubmitPost {...this.props} />);
  }
});

SubmitPostContainer.defaultProps = {
  AuthStore: UI.Auth,
  UserStore: UI.User,
  SubmitPostStore: UI.SubmitPost,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    SubmitPostStore: getUIState('SubmitPost'),
    AuthStore: getUIState('Auth'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
    Posts: getDomainState('Posts')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRemoveServerInit: removeServerInit,
    FireHandlePostContent: handlePostContent,
    FireHandlePostTitle: handlePostTitle,
    FireHandleResetPostContent: handleResetPostContent,
    FireRequestSubmitPost: requestSubmitPost,
    FireHandleSelectPrefix: handleSelectPrefix,
    FireHandleAddPostImages: handleAddPostImages,
    FireHandleDeletePostImages: handleDeletePostImages,
    FireHandleSetRepresentImage: handleSetRepresentImage,
    FireRequestDeleteUnUsingImage: requestDeleteUnUsingImage,
    FireRequestUpdatePost: requestUpdatePost,
    FireRequestGetPostMeta: requestGetPostMeta,
  }
)(SubmitPostContainer);
