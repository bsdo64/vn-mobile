import React from 'react';
import { connect } from 'react-redux';
import LeftMenu from '../../Components/LeftMenus/ForumSettingLeftMenu';

const ForumSettingLeftMenu = React.createClass({
  render() {
    return (<LeftMenu {...this.props} />)
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
    AuthStore: getUIState('Auth'),
    CommunityStore: getUIState('Community'),

    Forums: getDomainState('Forums'),
  }
};

module.exports = connect(
  mapStateToProps,
  {

  }
)(ForumSettingLeftMenu);