export const REQUEST_GET_MORE_FORUM_LIST = 'REQUEST_GET_MORE_FORUM_LIST';
export const SUCCESS_GET_MORE_FORUM_LIST = 'SUCCESS_GET_MORE_FORUM_LIST';
export const FAILURE_GET_MORE_FORUM_LIST = 'FAILURE_GET_MORE_FORUM_LIST';

export const REQUEST_FOLLOW_FORUM = 'REQUEST_FOLLOW_FORUM';
export const SUCCESS_FOLLOW_FORUM = 'SUCCESS_FOLLOW_FORUM';
export const FAILURE_FOLLOW_FORUM = 'FAILURE_FOLLOW_FORUM';

export const REQUEST_UN_FOLLOW_FORUM = 'REQUEST_UN_FOLLOW_FORUM';
export const SUCCESS_UN_FOLLOW_FORUM = 'SUCCESS_UN_FOLLOW_FORUM';
export const FAILURE_UN_FOLLOW_FORUM = 'FAILURE_UN_FOLLOW_FORUM';

export const REQUEST_VALIDATE_TITLE_FORUM_CREATE = 'REQUEST_VALIDATE_TITLE_FORUM_CREATE';
export const SUCCESS_VALIDATE_TITLE_FORUM_CREATE = 'SUCCESS_VALIDATE_TITLE_FORUM_CREATE';
export const FAILURE_VALIDATE_TITLE_FORUM_CREATE = 'FAILURE_VALIDATE_TITLE_FORUM_CREATE';

export const REQUEST_CREATE_FORUM = 'REQUEST_CREATE_FORUM';
export const SUCCESS_CREATE_FORUM = 'SUCCESS_CREATE_FORUM';
export const FAILURE_CREATE_FORUM = 'FAILURE_CREATE_FORUM';

export function requestCreateForum(payload) {
  return {
    type: REQUEST_CREATE_FORUM,
    payload
  }
}

export function requestValidateTitleForumCreate(payload) {
  return {
    type: REQUEST_VALIDATE_TITLE_FORUM_CREATE ,
    payload
  }
}

export function requestGetMoreForumList(payload) {
  return {
    type: REQUEST_GET_MORE_FORUM_LIST ,
    payload
  }
}

export function requestFollowForum(payload) {
  return {
    type: REQUEST_FOLLOW_FORUM ,
    payload
  }
}

export function requestUnFollowForum(payload) {
  return {
    type: REQUEST_UN_FOLLOW_FORUM ,
    payload
  }
}

export default {
  requestGetMoreForumList,
  requestFollowForum,
  requestUnFollowForum,
}