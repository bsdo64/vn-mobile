import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import BestCategorySelect from '../../Components/LeftMenus/BestCategorySelect';
import { UI, Domains } from '../../Reducers/InitialStates';

import {
  updateFollowingFilter,
  requestSaveFollowingFilter,
} from '../../Actions/Gnb';
import {
  requestCreateCollection,
  requestRemoveForumInCollection
} from '../../Actions/Collection';

const BestCategoryMenu = React.createClass({
  render() {
    return (
      <div>
        <BestCategorySelect {...this.props} />
      </div>
    )
  }
});

BestCategoryMenu.defaultProps = {
  GnbStore: UI.Gnb,
  ListStore: UI.List,
  UserStore: UI.User,
  Categories: Domains.Categories,
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
    GnbStore: getUIState('Gnb'),
    AuthStore: getUIState('Auth'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
    Forums: getDomainState('Forums'),
    Categories: getDomainState('Categories'),
    Collections: getDomainState('Collections')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireUpdateFollowingFilter: updateFollowingFilter,
    FireRequestSaveFollowingFilter: requestSaveFollowingFilter,
    FireRequestCreateCollection: requestCreateCollection,
    FireRequestRemoveForumInCollection: requestRemoveForumInCollection,
  }
)(BestCategoryMenu);
