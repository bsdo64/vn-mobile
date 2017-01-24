import { UI } from '../InitialStates';
import {
  SUCCESS_VALIDATE_TITLE_FORUM_CREATE,
  FAILURE_VALIDATE_TITLE_FORUM_CREATE,
  SUCCESS_CREATE_FORUM,
  FAILURE_CREATE_FORUM,
} from '../../Actions/Forum';

const SubmitForum = (state = UI.SubmitForum, action) => {
  switch (action.type) {
    case SUCCESS_VALIDATE_TITLE_FORUM_CREATE: {
      return state
        .updateIn(['form', 'didValidate'], item => {
          return item.set('title', true);
        })
        .updateIn(['form', 'validate'], item => {
          return item.set('title', true);
        })
        .setIn(['form', 'error'], null);
    }

    case FAILURE_VALIDATE_TITLE_FORUM_CREATE: {
      return state
        .updateIn(['form', 'didValidate'], item => {
          return item.set('title', true);
        })
        .updateIn(['form', 'validate'], item => {
          return item.set('title', false);
        })
        .setIn(['form', 'error'], action.result);
    }

    case SUCCESS_CREATE_FORUM: {
      return state.set('createForumSuccess', action.result.id);
    }

    case FAILURE_CREATE_FORUM: {
      return state.set('createForumSuccess', false);
    }

    default:
      return state;
  }
};

export default SubmitForum;
