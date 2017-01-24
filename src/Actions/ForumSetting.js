export const HANDLE_CHANGE_FORM_FORUM_META = 'HANDLE_CHANGE_FORM_FORUM_META';
export const HANDLE_RESET_BUTTON = 'HANDLE_RESET_BUTTON';

/* Common */
export const REQUEST_UPDATE_FORUM_META = 'REQUEST_UPDATE_FORUM_META';
export const SUCCESS_UPDATE_FORUM_META = 'SUCCESS_UPDATE_FORUM_META';
export const FAILURE_UPDATE_FORUM_META = 'FAILURE_UPDATE_FORUM_META';

/* Prefix */
export const REQUEST_ADD_FORUM_PREFIX = 'REQUEST_ADD_FORUM_PREFIX';
export const SUCCESS_ADD_FORUM_PREFIX = 'SUCCESS_ADD_FORUM_PREFIX';
export const FAILURE_ADD_FORUM_PREFIX = 'FAILURE_ADD_FORUM_PREFIX';

export const REQUEST_UPDATE_FORUM_PREFIX = 'REQUEST_UPDATE_FORUM_PREFIX';
export const SUCCESS_UPDATE_FORUM_PREFIX = 'SUCCESS_UPDATE_FORUM_PREFIX';
export const FAILURE_UPDATE_FORUM_PREFIX = 'FAILURE_UPDATE_FORUM_PREFIX';

export const REQUEST_DELETE_FORUM_PREFIX = 'REQUEST_DELETE_FORUM_PREFIX';
export const SUCCESS_DELETE_FORUM_PREFIX = 'SUCCESS_DELETE_FORUM_PREFIX';
export const FAILURE_DELETE_FORUM_PREFIX = 'FAILURE_DELETE_FORUM_PREFIX';

/* Managers */
export const REQUEST_ADD_FORUM_MANAGER = 'REQUEST_ADD_FORUM_MANAGER';
export const SUCCESS_ADD_FORUM_MANAGER = 'SUCCESS_ADD_FORUM_MANAGER';
export const FAILURE_ADD_FORUM_MANAGER = 'FAILURE_ADD_FORUM_MANAGER';

export const REQUEST_DELETE_FORUM_MANAGER = 'REQUEST_DELETE_FORUM_MANAGER';
export const SUCCESS_DELETE_FORUM_MANAGER = 'SUCCESS_DELETE_FORUM_MANAGER';
export const FAILURE_DELETE_FORUM_MANAGER = 'FAILURE_DELETE_FORUM_MANAGER';

/* Announce */
export const REQUEST_DELETE_FORUM_ANNOUNCE = 'REQUEST_DELETE_FORUM_ANNOUNCE';
export const SUCCESS_DELETE_FORUM_ANNOUNCE = 'SUCCESS_DELETE_FORUM_ANNOUNCE';
export const FAILURE_DELETE_FORUM_ANNOUNCE = 'FAILURE_DELETE_FORUM_ANNOUNCE';

/* Ban Users */
export const REQUEST_ADD_FORUM_BAN_USER = 'REQUEST_ADD_FORUM_BAN_USER';
export const SUCCESS_ADD_FORUM_BAN_USER = 'SUCCESS_ADD_FORUM_BAN_USER';
export const FAILURE_ADD_FORUM_BAN_USER = 'FAILURE_ADD_FORUM_BAN_USER';

export const REQUEST_DELETE_FORUM_BAN_USER = 'REQUEST_DELETE_FORUM_BAN_USER';
export const SUCCESS_DELETE_FORUM_BAN_USER = 'SUCCESS_DELETE_FORUM_BAN_USER';
export const FAILURE_DELETE_FORUM_BAN_USER = 'FAILURE_DELETE_FORUM_BAN_USER';


export function handleResetButton() {
  return {
    type: HANDLE_RESET_BUTTON,
  }
}

export function handleChangeFormForumMeta(data) {
  return {
    type: HANDLE_CHANGE_FORM_FORUM_META,
    data
  }
}

export function requestUpdateForumMeta(payload) {
  return {
    type: REQUEST_UPDATE_FORUM_META,
    payload
  }
}

export function requestAddForumPrefix(payload) {
  return {
    type: REQUEST_ADD_FORUM_PREFIX,
    payload
  }
}

export function requestDeleteForumPrefix(payload) {
  return {
    type: REQUEST_DELETE_FORUM_PREFIX,
    payload
  }
}

export function requestUpdateForumPrefix(payload) {
  return {
    type: REQUEST_UPDATE_FORUM_PREFIX,
    payload
  }
}

export function requestAddForumManager(payload) {
  return {
    type: REQUEST_ADD_FORUM_MANAGER,
    payload
  }
}

export function requestDeleteForumManager(payload) {
  return {
    type: REQUEST_DELETE_FORUM_MANAGER,
    payload
  }
}

export function requestDeleteForumAnnounce(payload) {
  return {
    type: REQUEST_DELETE_FORUM_ANNOUNCE,
    payload
  }
}

export function requestAddForumBanUser(payload) {
  return {
    type: REQUEST_ADD_FORUM_BAN_USER,
    payload
  }
}

export function requestDeleteForumBanUser(payload) {
  return {
    type: REQUEST_DELETE_FORUM_BAN_USER,
    payload
  }
}
