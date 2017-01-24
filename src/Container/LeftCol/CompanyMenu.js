import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Company from '../../Components/LeftMenus/Company';

const MenuContainer = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
  },

  render() {
    return <Company {...this.props} />
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
    ListStore: getUIState('List'),
    GnbStore: getUIState('Gnb'),
    AuthStore: getUIState('Auth'),
    CommunityStore: getUIState('Community'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Collections: getDomainState('Collections')
  }
};

module.exports = connect(
  mapStateToProps,
  {

  }
)(MenuContainer);
