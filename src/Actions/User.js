export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const SUCCESS_RESET_PASSWORD = 'SUCCESS_RESET_PASSWORD';
export const FAILURE_RESET_PASSWORD = 'FAILURE_RESET_PASSWORD';

export const REQUEST_USER_AVATAR_IMAGE_UPLOAD = 'REQUEST_USER_AVATAR_IMAGE_UPLOAD';
export const SUCCESS_USER_AVATAR_IMAGE_UPLOAD = 'SUCCESS_USER_AVATAR_IMAGE_UPLOAD';
export const FAILURE_USER_AVATAR_IMAGE_UPLOAD = 'FAILURE_USER_AVATAR_IMAGE_UPLOAD';

export const REQUEST_USER_AVATAR_IMAGE_REMOVE = 'REQUEST_USER_AVATAR_IMAGE_REMOVE';
export const SUCCESS_USER_AVATAR_IMAGE_REMOVE = 'SUCCESS_USER_AVATAR_IMAGE_REMOVE';
export const FAILURE_USER_AVATAR_IMAGE_REMOVE = 'FAILURE_USER_AVATAR_IMAGE_REMOVE';

export const REQUEST_USER_UPDATE_PASSWORD = 'REQUEST_USER_UPDATE_PASSWORD';
export const SUCCESS_USER_UPDATE_PASSWORD = 'SUCCESS_USER_UPDATE_PASSWORD';
export const FAILURE_USER_UPDATE_PASSWORD = 'FAILURE_USER_UPDATE_PASSWORD';

export const REQUEST_USER_UPDATE_PROFILE = 'REQUEST_USER_UPDATE_PROFILE';
export const SUCCESS_USER_UPDATE_PROFILE = 'SUCCESS_USER_UPDATE_PROFILE';
export const FAILURE_USER_UPDATE_PROFILE = 'FAILURE_USER_UPDATE_PROFILE';

export const REQUEST_USER_READ_NOTIFICATION = 'REQUEST_USER_READ_NOTIFICATION';
export const SUCCESS_USER_READ_NOTIFICATION = 'SUCCESS_USER_READ_NOTIFICATION';
export const FAILURE_USER_READ_NOTIFICATION = 'FAILURE_USER_READ_NOTIFICATION';

export const REQUEST_USER_PAYBACK_RP = 'REQUEST_USER_PAYBACK_RP';
export const SUCCESS_USER_PAYBACK_RP = 'SUCCESS_USER_PAYBACK_RP';
export const FAILURE_USER_PAYBACK_RP = 'FAILURE_USER_PAYBACK_RP';

export const TOGGLE_AVATAR_MODAL = 'TOGGLE_AVATAR_MODAL';
export const CLOSE_AVATAR_MODAL = 'CLOSE_AVATAR_MODAL';
export const CLOSE_USER_SETTING_MESSAGE = 'CLOSE_USER_SETTING_MESSAGE';
export const TOGGLE_SHOW_INVENTORY = 'TOGGLE_SHOW_INVENTORY';

export const RECEIVE_SOCKET_NOTI = 'RECEIVE_SOCKET_NOTI';
export const RECEIVE_SOCKET_POINT = 'RECEIVE_SOCKET_POINT';
export const RECEIVE_SOCKET_TERMINATE_VENALINK= 'RECEIVE_SOCKET_TERMINATE_VENALINK';

export function receiveSocketTerminateVenalink({ refundedVenalink }) {
  return {
    type: RECEIVE_SOCKET_TERMINATE_VENALINK,
    refundedVenalink
  }
}

export function requestUserPaybackRP(payload) {
  return {
    type: REQUEST_USER_PAYBACK_RP,
    payload
  }
}

export function receiveSocketNoti({ notis, userId }) {
  return {
    type: RECEIVE_SOCKET_NOTI,
    notis,
    userId
  }
}
export function receiveSocketPoint({ data, userId }) {
  return {
    type: RECEIVE_SOCKET_POINT,
    data,
    userId
  }
}

export function toggleShowInventory() {
  return {
    type: TOGGLE_SHOW_INVENTORY
  }
}

export function requestUserReadNotification(payload) {
  return {
    type: REQUEST_USER_READ_NOTIFICATION,
    payload
  }
}

export function closeUserSettingMessage(successType) {
  return {
    type: CLOSE_USER_SETTING_MESSAGE,
    successType
  }
}

export function requestUserUpdatePassword(payload) {
  return {
    type: REQUEST_USER_UPDATE_PASSWORD,
    payload
  }
}

export function requestUserUpdateProfile(payload) {
  return {
    type: REQUEST_USER_UPDATE_PROFILE,
    payload
  }
}

export function toggleAvatarModal({ data, contentType }) {
  return {
    type: TOGGLE_AVATAR_MODAL,
    data,
    contentType
  }
}

export function requestResetPassword(payload) {
  return {
    type: REQUEST_RESET_PASSWORD,
    payload
  }
}

export function requestUserAvatarImageUpload(payload) {
  return {
    type: REQUEST_USER_AVATAR_IMAGE_UPLOAD,
    payload
  }
}

export function requestUserAvatarImageRemove() {
  return {
    type: REQUEST_USER_AVATAR_IMAGE_REMOVE
  }
}