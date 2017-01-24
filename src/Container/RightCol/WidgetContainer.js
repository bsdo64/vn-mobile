import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import WidgetBox from '../../Components/WidgetBox';
import { UI, Domains } from '../../Reducers/InitialStates';
import {
  toggleVenacleStoreModal,
  showItemInfo,
  requestShoppingItemInit,
  requestPurchaseItem,
  toggleConfirmPurchaseItemModal,
} from '../../Actions/VenacleStore';
import { toggleAvatarModal, toggleShowInventory } from '../../Actions/User';

const WidgetContainer = React.createClass({
  render() {

    return (<WidgetBox {...this.props} />)
  }
});

WidgetContainer.defaultProps = {
  ShoppingStore: UI.Shopping,
  LoginStore: UI.Login,
  InventoryStore: UI.Inventory,
  UserStore: UI.User,
  Forums: Domains.Forums,
  Venatems: Domains.Venatems,
  Items: Domains.Items,
  Inventories: Domains.Inventories,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    ShoppingStore: getUIState('Shopping'),
    InventoryStore: getUIState('Inventory'),
    LoginStore: getUIState('Login'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Forums: getDomainState('Forums'),
    Venatems: getDomainState('Venatems'),
    Items: getDomainState('Items'),
    Inventories: getDomainState('Inventories'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireToggleVenacleStoreModal: toggleVenacleStoreModal,
    FireToggleAvatarModal: toggleAvatarModal,
    FireShowItemInfo: showItemInfo,
    FireRequestPurchaseItem: requestPurchaseItem,
    FireToggleConfirmPurchaseItemModal: toggleConfirmPurchaseItemModal,
    FireRequestShoppingItemInit: requestShoppingItemInit,
    FireToggleShowInventory: toggleShowInventory,
  }
)(WidgetContainer);
