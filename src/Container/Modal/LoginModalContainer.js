import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import LoginModalBox from '../../Components/Modals/Components/Login/index';
import {
  requestLogin
} from '../../Actions/Login';

const LoginModalContainer = React.createClass({
  render() {
    return (<LoginModalBox {...this.props} />)
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
    LoginStore: getUIState('Login'),
    ModalStore: getUIState('Modal'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};


module.exports = connect(
  mapStateToProps,
  {
    FireRequestLogin: requestLogin
  }
)(LoginModalContainer);
