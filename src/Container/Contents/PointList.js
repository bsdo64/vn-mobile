import React from 'react';
import { getLoginUser } from '../Util/func';
import { connect } from 'react-redux';
import PointListBox from '../../Components/Contents/PointListBox';

const PointList = React.createClass({
  render() {
    return <PointListBox {...this.props } />
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
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Users: getDomainState('Users'),
  }
};

const mapDispatchToProps = (/* dispatch */) => {
  return {}
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PointList);
