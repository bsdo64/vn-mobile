import { UI } from '../InitialStates';
import {
  OPEN_COMMENT_UPDATE_VIEW,
  CLOSE_COMMENT_UPDATE_VIEW
} from '../../Actions/Comment';

const Community = (state = UI.Community, action) => {
  switch (action.type) {
    case OPEN_COMMENT_UPDATE_VIEW: {
      const { target } = action;
      return state.merge({
        updateId: target.targetId,
        updateType: target.type,
        updating: true
      });
    }

    case CLOSE_COMMENT_UPDATE_VIEW: {
      return state.merge({
        updateId: null,
        updateType: null,
        updating: false
      });
    }

    default: return state;
  }
};

export default Community;
