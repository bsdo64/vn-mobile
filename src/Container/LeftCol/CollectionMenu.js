import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import CollectionLeftMenu from '../../Components/LeftMenus/CollectionLeftMenu';
import {
  requestCreateCollection,
  requestAddForumInCollection,
  requestRemoveForumInCollection,
  requestSearchForumToCollectionSubs,
} from '../../Actions/Collection';

const CollectionMenu = React.createClass({
  render() {
    return (<CollectionLeftMenu {...this.props} />)
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
    Categories: getDomainState('Categories'),
    Collections: getDomainState('Collections')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestCreateCollection: requestCreateCollection,
    FireRequestAddForumInCollection: requestAddForumInCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
    FireRequestSearchForumToCollectionSubs: requestSearchForumToCollectionSubs,
  }
)(CollectionMenu);
