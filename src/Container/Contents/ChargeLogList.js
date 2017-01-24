import React from 'react';
import { getLoginUser } from '../Util/func';
import { connect } from 'react-redux';
import ChargeLogListBox from '../../Components/Contents/ChargeLogListBox';
import {
  waitingCheckCharge,
  requestCheckPointCharge,
  failureCheckPointCharge
} from '../../Actions/Point';

const ChargeLogList = React.createClass({
  render() {
    return <ChargeLogListBox {...this.props} />
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
    GnbStore: getUIState('Gnb'),
    LoginStore: getUIState('Login'),
    CommunityStore: getUIState('Community'),
    SearchStore: getUIState('Search'),
    ListStore: getUIState('List'),
    PaginationStore: getUIState('Pagination'),
    ChargePointStore: getUIState('ChargePoint'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Users: getDomainState('Users'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireWaitingCheckCharge: waitingCheckCharge,
    FireRequestCheckPointCharge: requestCheckPointCharge,
    FireFailureCheckPointCharge: failureCheckPointCharge,
  }
)(ChargeLogList);
