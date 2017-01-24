export const REQUEST_LIKE_COMMENT = 'REQUEST_LIKE_COMMENT';
export const SUCCESS_LIKE_COMMENT = 'SUCCESS_LIKE_COMMENT';
export const FAILURE_LIKE_COMMENT = 'FAILURE_LIKE_COMMENT';

export const REQUEST_LIKE_SUB_COMMENT = 'REQUEST_LIKE_SUB_COMMENT';
export const SUCCESS_LIKE_SUB_COMMENT = 'SUCCESS_LIKE_SUB_COMMENT';
export const FAILURE_LIKE_SUB_COMMENT = 'FAILURE_LIKE_SUB_COMMENT';

export const REQUEST_SUBMIT_COMMENT = 'REQUEST_SUBMIT_COMMENT';
export const SUCCESS_SUBMIT_COMMENT = 'SUCCESS_SUBMIT_COMMENT';
export const FAILURE_SUBMIT_COMMENT = 'FAILURE_SUBMIT_COMMENT';

export const REQUEST_SUBMIT_SUB_COMMENT = 'REQUEST_SUBMIT_SUB_COMMENT';
export const SUCCESS_SUBMIT_SUB_COMMENT = 'SUCCESS_SUBMIT_SUB_COMMENT';
export const FAILURE_SUBMIT_SUB_COMMENT = 'FAILURE_SUBMIT_SUB_COMMENT';

export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT';
export const SUCCESS_UPDATE_COMMENT = 'SUCCESS_UPDATE_COMMENT';
export const FAILURE_UPDATE_COMMENT = 'FAILURE_UPDATE_COMMENT';

export const REQUEST_UPDATE_SUB_COMMENT = 'REQUEST_UPDATE_SUB_COMMENT';
export const SUCCESS_UPDATE_SUB_COMMENT = 'SUCCESS_UPDATE_SUB_COMMENT';
export const FAILURE_UPDATE_SUB_COMMENT = 'FAILURE_UPDATE_SUB_COMMENT';

export const OPEN_COMMENT_UPDATE_VIEW = 'OPEN_COMMENT_UPDATE_VIEW';
export const CLOSE_COMMENT_UPDATE_VIEW = 'CLOSE_COMMENT_UPDATE_VIEW';

export function closeCommentUpdateView() {
  return {
    type: CLOSE_COMMENT_UPDATE_VIEW
  }
}

export function openCommentUpdateView(target) {
  return {
    type: OPEN_COMMENT_UPDATE_VIEW,
    target
  }
}

export function requestLikeComment(payload) {
  return {
    type: REQUEST_LIKE_COMMENT,
    payload
  }
}

export function requestLikeSubComment(payload) {
  return {
    type: REQUEST_LIKE_SUB_COMMENT,
    payload
  }
}

export function requestSubmitComment(payload) {
  return {
    type: REQUEST_SUBMIT_COMMENT,
    payload
  }
}

export function requestSubmitSubComment(payload) {
  return {
    type: REQUEST_SUBMIT_SUB_COMMENT,
    payload
  }
}

export function requestUpdateComment(payload) {
  return {
    type: REQUEST_UPDATE_COMMENT,
    payload
  }
}

export function requestUpdateSubComment(payload) {
  return {
    type: REQUEST_UPDATE_SUB_COMMENT,
    payload
  }
}