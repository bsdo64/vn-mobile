export const SET_SCROLL = 'SET_SCROLL';

export function setScrollPosition(scrollHeight) {
  return {
    type: SET_SCROLL,
    scrollHeight
  }
}

export default {
  setScrollPosition
}