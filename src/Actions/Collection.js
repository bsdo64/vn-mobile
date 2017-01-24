export const REQUEST_CREATE_COLLECTION = 'REQUEST_CREATE_COLLECTION';
export const SUCCESS_CREATE_COLLECTION = 'SUCCESS_CREATE_COLLECTION';
export const FAILURE_CREATE_COLLECTION = 'FAILURE_CREATE_COLLECTION';

export const REQUEST_UPDATE_COLLECTION = 'REQUEST_UPDATE_COLLECTION';
export const SUCCESS_UPDATE_COLLECTION = 'SUCCESS_UPDATE_COLLECTION';
export const FAILURE_UPDATE_COLLECTION = 'FAILURE_UPDATE_COLLECTION';

export const REQUEST_DELETE_COLLECTION = 'REQUEST_DELETE_COLLECTION';
export const SUCCESS_DELETE_COLLECTION = 'SUCCESS_DELETE_COLLECTION';
export const FAILURE_DELETE_COLLECTION = 'FAILURE_DELETE_COLLECTION';

export const REQUEST_ADD_FORUM_IN_COLLECTION = 'REQUEST_ADD_FORUM_IN_COLLECTION';
export const SUCCESS_ADD_FORUM_IN_COLLECTION = 'SUCCESS_ADD_FORUM_IN_COLLECTION';
export const FAILURE_ADD_FORUM_IN_COLLECTION = 'FAILURE_ADD_FORUM_IN_COLLECTION';

export const REQUEST_REMOVE_FORUM_IN_COLLECTION = 'REQUEST_REMOVE_FORUM_IN_COLLECTION';
export const SUCCESS_REMOVE_FORUM_IN_COLLECTION = 'SUCCESS_REMOVE_FORUM_IN_COLLECTION';
export const FAILURE_REMOVE_FORUM_IN_COLLECTION = 'FAILURE_REMOVE_FORUM_IN_COLLECTION';

export const REQUEST_SEARCH_FORUM_TO_COLLECTION_SUBS = 'REQUEST_SEARCH_FORUM_TO_COLLECTION_SUBS';
export const SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS = 'SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS';
export const FAILURE_SEARCH_FORUM_TO_COLLECTION_SUBS = 'FAILURE_SEARCH_FORUM_TO_COLLECTION_SUBS';

export function requestCreateCollection(payload) {
  return {
    type: REQUEST_CREATE_COLLECTION,
    payload
  }
}

export function requestUpdateCollection(payload) {
  return {
    type: REQUEST_UPDATE_COLLECTION,
    payload
  }
}

export function requestDeleteCollection(payload) {
  return {
    type: REQUEST_DELETE_COLLECTION,
    payload
  }
}

export function requestAddForumInCollection(payload) {
  return {
    type: REQUEST_ADD_FORUM_IN_COLLECTION,
    payload
  }
}

export function requestRemoveForumInCollection(payload) {
  return {
    type: REQUEST_REMOVE_FORUM_IN_COLLECTION,
    payload
  }
}

export function requestSearchForumToCollectionSubs(payload) {
  return {
    type: REQUEST_SEARCH_FORUM_TO_COLLECTION_SUBS,
    payload
  }
}
