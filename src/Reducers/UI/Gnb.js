import { UI } from '../InitialStates';
import {
  TOGGLE_GNB_PANEL,
  OPEN_SIDE_CATEGORY,
  OPEN_FORUM_META,
  UPDATE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';

const Gnb = (state = UI.Gnb, action) => {
  switch (action.type) {

    case TOGGLE_GNB_PANEL: {
      return state.set('openGnb', !state.get('openGnb'))
    }

    case OPEN_SIDE_CATEGORY: {
      return state.setIn(['gnbMenu', 'openSideNow'], action.clubId);
    }

    case OPEN_FORUM_META: {
      return state.setIn(['gnbMenu', 'openForumMeta'], action.forumId);
    }

    case UPDATE_FOLLOWING_FILTER: {
      return state.merge(action.data);
    }

    default:
      return state;
  }
};

export default Gnb;
