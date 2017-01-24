export const TOGGLE_DELETE_MODAL = 'TOGGLE_DELETE_MODAL';
export const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL';

export const REQUEST_DELETE_ITEM = 'REQUEST_DELETE_ITEM';
export const SUCCESS_DELETE_ITEM = 'SUCCESS_DELETE_ITEM';
export const FAILURE_DELETE_ITEM = 'FAILURE_DELETE_ITEM';

export function toggleDeleteModal({ data, contentType }) {
  return {
    type: TOGGLE_DELETE_MODAL,
    data,
    contentType
  }
}

export function requestDeleteItem(payload) {
  return {
    type: REQUEST_DELETE_ITEM,
    payload
  }
}