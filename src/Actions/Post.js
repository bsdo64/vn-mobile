export const REQUEST_GET_MORE_POST_LIST = 'REQUEST_GET_MORE_POST_LIST';
export const SUCCESS_GET_MORE_POST_LIST = 'SUCCESS_GET_MORE_POST_LIST';
export const FAILURE_GET_MORE_POST_LIST = 'FAILURE_GET_MORE_POST_LIST';

export const REQUEST_SUBMIT_POST = 'REQUEST_SUBMIT_POST';
export const SUCCESS_SUBMIT_POST = 'SUCCESS_SUBMIT_POST';
export const FAILURE_SUBMIT_POST = 'FAILURE_SUBMIT_POST';

export const REQUEST_GET_INIT_POST_LIST = 'REQUEST_GET_INIT_POST_LIST';
export const SUCCESS_GET_INIT_POST_LIST = 'SUCCESS_GET_INIT_POST_LIST';
export const FAILURE_GET_INIT_POST_LIST = 'FAILURE_GET_INIT_POST_LIST';

export const REQUEST_LIKE_POST = 'REQUEST_LIKE_POST';
export const SUCCESS_LIKE_POST = 'SUCCESS_LIKE_POST';
export const FAILURE_LIKE_POST = 'FAILURE_LIKE_POST';

export const REQUEST_GET_POST_META = 'REQUEST_GET_POST_META';
export const SUCCESS_GET_POST_META = 'SUCCESS_GET_POST_META';
export const FAILURE_GET_POST_META = 'FAILURE_GET_POST_META';

export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST';
export const SUCCESS_UPDATE_POST = 'SUCCESS_UPDATE_POST';
export const FAILURE_UPDATE_POST = 'FAILURE_UPDATE_POST';

export const REQUEST_DELETE_UN_USING_IMAGE = 'REQUEST_DELETE_UN_USING_IMAGE';
export const SUCCESS_DELETE_UN_USING_IMAGE = 'SUCCESS_DELETE_UN_USING_IMAGE';
export const FAILURE_DELETE_UN_USING_IMAGE = 'FAILURE_DELETE_UN_USING_IMAGE';

export const REMOVE_SERVER_INIT = 'REMOVE_SERVER_INIT';
export const HANDLE_POST_TITLE = 'HANDLE_POST_TITLE';
export const HANDLE_POST_CONTENT = 'HANDLE_POST_CONTENT';
export const HANDLE_RESET_POST_CONTENT = 'HANDLE_RESET_POST_CONTENT';
export const HANDLE_SELECT_PREFIX = 'HANDLE_SELECT_PREFIX';
export const HANDLE_ADD_POST_IMAGES = 'HANDLE_ADD_POST_IMAGES';
export const HANDLE_DELETE_POST_IMAGES = 'HANDLE_DELETE_POST_IMAGES';
export const HANDLE_SET_REPRESENT_IMAGE = 'HANDLE_SET_REPRESENT_IMAGE';
export const TOGGLE_ACTIVE_VENALINK_MODAL = 'TOGGLE_ACTIVE_VENALINK_MODAL';
export const CLOSE_ACTIVE_VENALINK_MODAL = 'CLOSE_ACTIVE_VENALINK_MODAL';

export function requestDeleteUnUsingImage(payload) {
  return {
    type: REQUEST_DELETE_UN_USING_IMAGE,
    payload
  }
}

export function requestUpdatePost(payload) {
  return {
    type: REQUEST_UPDATE_POST,
    payload
  }
}

export function requestGetPostMeta(payload) {
  return {
    type: REQUEST_GET_POST_META,
    payload
  }
}

export function toggleActiveVenalinkModal({ data, contentType, venalinkActivateRequestPostId }) {
  return {
    type: TOGGLE_ACTIVE_VENALINK_MODAL,
    data,
    contentType,
    venalinkActivateRequestPostId
  }
}

export function requestLikePost(payload) {
  return {
    type: REQUEST_LIKE_POST,
    payload
  }
}

export function handleSetRepresentImage(index) {
  return {
    type: HANDLE_SET_REPRESENT_IMAGE,
    index
  }
}

export function handleDeletePostImages(deleteUrl) {
  return {
    type: HANDLE_DELETE_POST_IMAGES,
    deleteUrl
  }
}

export function handleAddPostImages(data) {
  return {
    type: HANDLE_ADD_POST_IMAGES,
    data
  }
}

export function handleSelectPrefix(prefixId) {
  return {
    type: HANDLE_SELECT_PREFIX,
    prefixId
  }
}

export function handleResetPostContent() {
  return {
    type: HANDLE_RESET_POST_CONTENT
  }
}

export function handlePostContent(postContent) {
  return {
    type: HANDLE_POST_CONTENT,
    postContent
  }
}

export function handlePostTitle(title) {
  return {
    type: HANDLE_POST_TITLE,
    title
  }
}

export function removeServerInit() {
  return {
    type: REMOVE_SERVER_INIT
  }
}

export function requestSubmitPost(payload) {
  return {
    type: REQUEST_SUBMIT_POST,
    payload
  }
}

export function requestGetInitPostList(payload) {
  return {
    type: REQUEST_GET_INIT_POST_LIST ,
    payload
  }
}

export function requestGetMorePostList(payload) {
  return {
    type: REQUEST_GET_MORE_POST_LIST ,
    payload
  }
}

export default {
  requestGetMorePostList
}