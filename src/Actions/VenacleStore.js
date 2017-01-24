export const SHOW_ITEM_INFO = 'SHOW_ITEM_INFO';
export const TOGGLE_VENACLE_STORE_MODAL = 'TOGGLE_VENACLE_STORE_MODAL';
export const CLOSE_VENACLE_STORE_MODAL = 'CLOSE_VENACLE_STORE_MODAL';
export const TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL = 'TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL';
export const CLOSE_CONFIRM_PURCHASE_ITEM_MODAL = 'CLOSE_CONFIRM_PURCHASE_ITEM_MODAL';

export const REQUEST_SHOPPING_ITEM_INIT = 'REQUEST_SHOPPING_ITEM_INIT';
export const SUCCESS_SHOPPING_ITEM_INIT = 'SUCCESS_SHOPPING_ITEM_INIT';
export const FAILURE_SHOPPING_ITEM_INIT = 'FAILURE_SHOPPING_ITEM_INIT';

export const REQUEST_PURCHASE_ITEM = 'REQUEST_PURCHASE_ITEM';
export const SUCCESS_PURCHASE_ITEM = 'SUCCESS_PURCHASE_ITEM';
export const FAILURE_PURCHASE_ITEM = 'FAILURE_PURCHASE_ITEM';

export const REQUEST_ACTIVATE_VENALINK = 'REQUEST_ACTIVATE_VENALINK';
export const SUCCESS_ACTIVATE_VENALINK = 'SUCCESS_ACTIVATE_VENALINK';
export const FAILURE_ACTIVATE_VENALINK = 'FAILURE_ACTIVATE_VENALINK';

export const REQUEST_PARTICIPATE_VENALINK = 'REQUEST_PARTICIPATE_VENALINK';
export const SUCCESS_PARTICIPATE_VENALINK = 'SUCCESS_PARTICIPATE_VENALINK';
export const FAILURE_PARTICIPATE_VENALINK = 'FAILURE_PARTICIPATE_VENALINK';

export function showItemInfo(itemCode) {
  return {
    type: SHOW_ITEM_INFO,
    itemCode
  }
}

export function requestShoppingItemInit(payload) {
  return {
    type: REQUEST_SHOPPING_ITEM_INIT,
    payload
  }
}

export function requestPurchaseItem(payload) {
  return {
    type: REQUEST_PURCHASE_ITEM,
    payload
  }
}

export function requestActivateVenalink(payload) {
  return {
    type: REQUEST_ACTIVATE_VENALINK,
    payload
  }
}

export function requestParticipateVenalink(payload) {
  return {
    type: REQUEST_PARTICIPATE_VENALINK,
    payload
  }
}

export function toggleConfirmPurchaseItemModal({ item, contentType }) {
  return {
    type: TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL,
    item,
    contentType
  }
}

export function toggleVenacleStoreModal({ data, contentType }) {
  return {
    type: TOGGLE_VENACLE_STORE_MODAL,
    data,
    contentType
  }
}
