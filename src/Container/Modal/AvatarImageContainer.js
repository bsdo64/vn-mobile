import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import AvatarImageModal from '../../Components/Modals/Components/AvatarImage';
import { requestUserAvatarImageUpload } from '../../Actions/User';

const AvatarImageContainer = React.createClass({
  render() {
    return (<AvatarImageModal {...this.props} />)
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestUserAvatarImageUpload: requestUserAvatarImageUpload
  }
)(AvatarImageContainer);
