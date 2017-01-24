// Action Types
// UI
export const TOGGLE_GNB_PANEL = 'TOGGLE_GNB_PANEL';
export const OPEN_SIDE_CATEGORY = 'OPEN_SIDE_CATEGORY';
export const OPEN_FORUM_META = 'OPEN_FORUM_META';
export const UPDATE_FOLLOWING_FILTER = 'UPDATE_FOLLOWING_FILTER';

// AJAX
export const REQUEST_SAVE_FOLLOWING_FILTER = 'REQUEST_SAVE_FOLLOWING_FILTER';
export const SUCCESS_SAVE_FOLLOWING_FILTER = 'SUCCESS_SAVE_FOLLOWING_FILTER';
export const FAILURE_SAVE_FOLLOWING_FILTER = 'FAILURE_SAVE_FOLLOWING_FILTER';

// Action Creator
export function toggleGnbPanel() {
  return {
    type: TOGGLE_GNB_PANEL
  }
}

export function openSideCategory(clubId) {
  return {
    type: OPEN_SIDE_CATEGORY,
    clubId
  }
}

export function openForumMeta(forumId) {
  return {
    type: OPEN_FORUM_META,
    forumId
  }
}

export function updateFollowingFilter(clubs) {
  return {
    type: UPDATE_FOLLOWING_FILTER,
    data: clubs
  }
}

export function requestSaveFollowingFilter(payload) {
  return {
    type: REQUEST_SAVE_FOLLOWING_FILTER,
    payload
  }
}

export default {
  toggleGnbPanel,
  openSideCategory,
  openForumMeta,
  updateFollowingFilter,
}