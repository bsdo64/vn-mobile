import { Map } from 'immutable';
import { UI } from '../InitialStates';
import { TOGGLE_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from '../../Actions/Login';
import { TOGGLE_REPORT_MODAL, CLOSE_REPORT_MODAL } from '../../Actions/Report';
import { TOGGLE_DELETE_MODAL, CLOSE_DELETE_MODAL } from '../../Actions/DeleteItem';
import {
  TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL, CLOSE_CONFIRM_PURCHASE_ITEM_MODAL,
  TOGGLE_VENACLE_STORE_MODAL, CLOSE_VENACLE_STORE_MODAL
} from '../../Actions/VenacleStore';
import { TOGGLE_AVATAR_MODAL, CLOSE_AVATAR_MODAL } from '../../Actions/User';
import { CLOSE_MODAL } from '../../Actions/Modal';
import {
  TOGGLE_ACTIVE_VENALINK_MODAL,
  CLOSE_ACTIVE_VENALINK_MODAL,
} from '../../Actions/Post';

const Modal = (state = UI.Modal, action) => {
  switch (action.type) {

    case TOGGLE_REPORT_MODAL:
    case TOGGLE_DELETE_MODAL:
    case TOGGLE_VENACLE_STORE_MODAL:
    case TOGGLE_AVATAR_MODAL:
    case TOGGLE_ACTIVE_VENALINK_MODAL:
    case TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL:
    case TOGGLE_LOGIN_MODAL: {
      const modals = state.get('modals');
      const lastModal = modals.last();

      if (lastModal) {

        if ( lastModal.get('contentType') !== action.contentType ) {
          const newModals = modals.push(Map({
            contentType: action.contentType,
            openModal: true,
            location: action.location ? action.location : null
          }));

          return state.set('modals', newModals);
        }

        if ( lastModal.get('contentType') === action.contentType && lastModal.get('openModal')) {
          const newModals = modals.pop();

          return state.set('modals', newModals);
        }

      } else if (!lastModal) {
        const newModals = modals.push(Map({
          contentType: action.contentType,
          openModal: true,
          location: action.location ? action.location : null
        }));

        return state.set('modals', newModals);
      }

      return state;
    }

    case CLOSE_REPORT_MODAL:
    case CLOSE_DELETE_MODAL:
    case CLOSE_LOGIN_MODAL:
    case CLOSE_VENACLE_STORE_MODAL:
    case CLOSE_AVATAR_MODAL:
    case CLOSE_ACTIVE_VENALINK_MODAL:
    case CLOSE_CONFIRM_PURCHASE_ITEM_MODAL:
    case CLOSE_MODAL: {
      const modals = state.get('modals');
      const newModals = modals.pop();

      return state.set('modals', newModals);
    }

    default:
      return state
  }
};

export default Modal;
