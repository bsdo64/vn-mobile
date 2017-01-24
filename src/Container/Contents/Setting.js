import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Setting from '../../Components/Contents/Setting';
import { UI } from '../../Reducers/InitialStates';
import {
  closeUserSettingMessage,
  requestUserUpdatePassword,
  requestUserUpdateProfile,
} from '../../Actions/User';

const SettingContainer = React.createClass({
  propTypes: {
    UserSettingStore: PropTypes.object.isRequired,
  },

  render() {
    return (<Setting {...this.props} />)
  }
});

SettingContainer.defaultProps = {
  UserSettingStore: UI.UserSetting
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    UserSettingStore: getUIState('UserSetting'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireCloseUserSettingMessage: closeUserSettingMessage,
    FireRequestUserUpdatePassword: requestUserUpdatePassword,
    FireRequestUserUpdateProfile: requestUserUpdateProfile,
  }
)(SettingContainer);
