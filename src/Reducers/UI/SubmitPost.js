import { UI } from '../InitialStates';
import { List } from 'immutable';
import {
  REMOVE_SERVER_INIT,
  HANDLE_POST_TITLE,
  HANDLE_POST_CONTENT,
  HANDLE_RESET_POST_CONTENT,
  HANDLE_SELECT_PREFIX,
  HANDLE_ADD_POST_IMAGES,
  HANDLE_DELETE_POST_IMAGES,
  HANDLE_SET_REPRESENT_IMAGE,

  SUCCESS_SUBMIT_POST,
  SUCCESS_UPDATE_POST,
  SUCCESS_GET_POST_META,
  SUCCESS_DELETE_UN_USING_IMAGE,
} from '../../Actions/Post';

const SubmitPost = (state = UI.SubmitPost, action) => {
  switch (action.type) {
    case REMOVE_SERVER_INIT: {
      return state.merge({ server: null })
    }

    case HANDLE_POST_TITLE: {
      return state.merge({ title: action.title })
    }

    case HANDLE_POST_CONTENT: {
      return state.merge({ ...action.postContent })
    }

    case HANDLE_RESET_POST_CONTENT: {
      return state.merge({
        selectPrefixId: null,
        title: '',
        content: null
      });
    }

    case HANDLE_SELECT_PREFIX: {
      return state.merge({ selectPrefixId: action.prefixId })
    }

    case SUCCESS_SUBMIT_POST: {
      const result = action.result;

      if (result) {
        const forum = result.forum;

        return state.merge({
          title: '',
          content: null,
          submitSuccess: true,
          forumId: forum.id,
          postId: result.id,
        });
      }

      return state;
    }

    case HANDLE_ADD_POST_IMAGES: {
      let newState = state.update('postImages', list => {
        if (!list) {
          list = List();
        }
        return list.push(action.data);
      });

      if ((newState.get('representingImage') === null) || (newState.get('representingImage') === undefined)) {
        newState = newState.set('representingImage', 0);
      }

      return newState;
    }

    case HANDLE_DELETE_POST_IMAGES: {
      const { deleteUrl } = action;
      let deleteItemIndex = null;

      let newState = state.update('postImages', list => {
        return list.filterNot((item, index) => {

          const deleteItem = item.deleteUrl === deleteUrl;
          if (deleteItem) {
            deleteItemIndex = index;
          }
          return deleteItem
        })
      });

      if (deleteItemIndex !== null) {
        if (newState.get('postImages').size > 0) {
          newState = newState.set('representingImage', 0);
        } else {
          newState = newState.set('representingImage', null);
        }
      }

      return newState;
    }

    case HANDLE_SET_REPRESENT_IMAGE: {
      return state.set('representingImage', action.index);
    }

    case SUCCESS_UPDATE_POST: {
      const { result } = action;
      const forum = result.forum;

      return state.merge({
        successUpdatePost: true,
        successForumId: forum.id,
        successPostId: result.id
      });
    }

    case SUCCESS_GET_POST_META: {
      return state.merge({ urlMetaData: action.result });
    }

    case SUCCESS_DELETE_UN_USING_IMAGE: {
      return state;
    }

    default:
      return state;
  }
};

export default SubmitPost;
