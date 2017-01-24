import { createSelector } from 'reselect';

const getCurrentUserId = state => state.getIn(['UI', 'Auth', 'userId']);

const getUsers = state => state.getIn(['Domains', 'Users']);

export const getUser = createSelector(
  [ getCurrentUserId, getUsers ],
  (currentUserId, users) => {
    return users.get(currentUserId + '')
  }
);