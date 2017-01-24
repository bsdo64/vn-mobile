import { UI } from '../InitialStates';
import {
  REQUEST_ADD_FORUM_IN_COLLECTION,
  SUCCESS_ADD_FORUM_IN_COLLECTION,
  REQUEST_REMOVE_FORUM_IN_COLLECTION,
  SUCCESS_REMOVE_FORUM_IN_COLLECTION
} from '../../Actions/Collection';

const Forum = (state = UI.Forum, action) => {
  switch (action.type) {

    case REQUEST_ADD_FORUM_IN_COLLECTION:
    case REQUEST_REMOVE_FORUM_IN_COLLECTION:{
      return state.merge({
        isRequestingSubs: true
      });
    }


    case SUCCESS_ADD_FORUM_IN_COLLECTION:
    case SUCCESS_REMOVE_FORUM_IN_COLLECTION: {
      return state.merge({
        isRequestingSubs: false
      })
    }

    default: return state;
  }
};

export default Forum;
