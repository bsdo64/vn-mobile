import { UI } from '../InitialStates';
import {
  TOGGLE_SHOW_INVENTORY
} from '../../Actions/User';

const Inventory = (state = UI.Inventory, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_INVENTORY: {
      return state.set('openInventory', !state.get('openInventory'));
    }

    default:
      return state;
  }
};

export default Inventory;
