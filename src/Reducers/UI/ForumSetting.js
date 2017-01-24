import { Map } from 'immutable';
import { UI } from '../InitialStates';
import {
  HANDLE_CHANGE_FORM_FORUM_META,
  HANDLE_RESET_BUTTON,
  SUCCESS_UPDATE_FORUM_META,
  FAILURE_UPDATE_FORUM_META,
  SUCCESS_ADD_FORUM_PREFIX,
  FAILURE_ADD_FORUM_PREFIX,
  SUCCESS_UPDATE_FORUM_PREFIX,
  FAILURE_UPDATE_FORUM_PREFIX,
  SUCCESS_DELETE_FORUM_PREFIX,
  FAILURE_DELETE_FORUM_PREFIX,
  SUCCESS_DELETE_FORUM_ANNOUNCE,
  FAILURE_DELETE_FORUM_ANNOUNCE,
  SUCCESS_ADD_FORUM_BAN_USER,
  FAILURE_ADD_FORUM_BAN_USER,
  SUCCESS_DELETE_FORUM_BAN_USER,
  FAILURE_DELETE_FORUM_BAN_USER,
} from '../../Actions/ForumSetting';

const ForumSetting = (state = UI.ForumSetting, action) => {
  switch (action.type) {
    case HANDLE_RESET_BUTTON: {
      return state.setIn(['forumInfo', 'success'], null);
    }
    case HANDLE_CHANGE_FORM_FORUM_META: {
      return state.mergeIn(['forumInfo'], action.data);
    }
    case SUCCESS_UPDATE_FORUM_META: {
      return state.setIn(['forumInfo', 'success'], 'updated');
    }
    case FAILURE_UPDATE_FORUM_META: {
      return state.setIn(['forumInfo', 'success'], 'failed');
    }
    case SUCCESS_ADD_FORUM_PREFIX: {
      return state.updateIn(['forum', 'prefixes'], list => {
        return list.push(Map(action.result))
      });
    }
    case FAILURE_ADD_FORUM_PREFIX: {
      return state;
    }
    case SUCCESS_UPDATE_FORUM_PREFIX: {
      return state.updateIn(['forum', 'prefixes'], list => {
        const entry = list.findEntry(i => i.get('id') === action.result.id);
        return list.update(entry[0], () => Map(action.result))
      });
    }
    case FAILURE_UPDATE_FORUM_PREFIX: {
      return state;
    }
    case SUCCESS_DELETE_FORUM_PREFIX: {
      return state.updateIn(['forum', 'prefixes'], list => {
        return list.filterNot(i => i.get('id') === action.result.id);
      });
    }
    case FAILURE_DELETE_FORUM_PREFIX: {
      return state;
    }
    case SUCCESS_DELETE_FORUM_ANNOUNCE: {
      return state.updateIn(['forum', 'announces'], list => {
        return list.filterNot(i => i.get('id') === action.result.postId)
      });
    }
    case FAILURE_DELETE_FORUM_ANNOUNCE: {
      return state;
    }
    case SUCCESS_ADD_FORUM_BAN_USER: {
      return state.updateIn(['forum', 'bans'], list => {
        return list.push(Map(action.result.user))
      });
    }
    case FAILURE_ADD_FORUM_BAN_USER: {
      return state;
    }
    case SUCCESS_DELETE_FORUM_BAN_USER: {
      return state.updateIn(['forum', 'managers'], list => {
        return list.filterNot(i => i.get('id') === action.result.userId)
      });
    }
    case FAILURE_DELETE_FORUM_BAN_USER: {
      return state;
    }
    default: return state;
  }
};

export default ForumSetting;
