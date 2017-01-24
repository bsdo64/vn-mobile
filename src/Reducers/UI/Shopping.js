import { UI } from '../InitialStates';
import {
  SHOW_ITEM_INFO,
  TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL,
  SUCCESS_SHOPPING_ITEM_INIT,
  SUCCESS_PURCHASE_ITEM
} from '../../Actions/VenacleStore';

const Shopping = (state = UI.Shopping, action) => {
  switch (action.type) {
    case SHOW_ITEM_INFO: {
      return state.merge({ tooltipItemCode: action.itemCode });
    }
    case TOGGLE_CONFIRM_PURCHASE_ITEM_MODAL: {
      return state.merge({
        purchaseItem: action.item ? action.item : null,
      })
    }

    case SUCCESS_SHOPPING_ITEM_INIT: {
      return state.merge(action.result);
    }

    case SUCCESS_PURCHASE_ITEM: {
      return state.merge({
        purchaseItem: null
      })
    }

    default: return state;
  }
};

export default Shopping;
