import { UI } from '../InitialStates';
import {
  TOGGLE_DELETE_MODAL,

  REQUEST_DELETE_ITEM,
  SUCCESS_DELETE_ITEM,
} from '../../Actions/DeleteItem';

const RemoveModal = (state = UI.RemoveModal, action) => {
  switch (action.type) {

    case TOGGLE_DELETE_MODAL: {
      return state.merge(action.data)
    }

    case REQUEST_DELETE_ITEM: {
      return state.merge({ isLoading: true, deleteSuccess: false })
    }

    case SUCCESS_DELETE_ITEM: {
      return state.merge({ isLoading: false, deleteSuccess: true })
    }

    default:
      return state
  }
};

export default RemoveModal;
