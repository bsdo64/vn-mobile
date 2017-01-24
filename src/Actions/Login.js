export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAILURE_LOGIN = 'FAILURE_LOGIN';

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const FAILURE_LOGOUT = 'FAILURE_LOGOUT';

export function toggleLoginModal({ contentType, location }) {
  return {
    type: TOGGLE_LOGIN_MODAL,
    contentType,
    location
  }
}

export function closeLoginModal() {
  return {
    type: CLOSE_LOGIN_MODAL
  }
}

export function requestLogin(payload) {
  return {
    type: REQUEST_LOGIN,
    payload
  }
}

export function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  }
}

export default {
  toggleLoginModal,
  closeLoginModal,
  requestLogin
}