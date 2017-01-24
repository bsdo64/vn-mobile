import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import ForumLeftMenu from '../../Components/LeftMenus/ForumLeftMenu';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  requestCreateCollection,
  requestAddForumInCollection,
  requestRemoveForumInCollection,
  requestSearchForumToCollectionSubs,
} from '../../Actions/Collection';

const MenuContainer = React.createClass({
  render() {
    return (<ForumLeftMenu {...this.props} />)
  }
});

MenuContainer.defaultProps = {
  ListStore: UI.List,
  UserStore: UI.User,

  Forums: Domains.Forums,
  Collections: Domains.Collections,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ListStore: getUIState('List'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Collections: getDomainState('Collections'),

    // New Type
    forum: getUIState(['Community', 'forum'])
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
)(MenuContainer);
