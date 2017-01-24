import { UI } from '../InitialStates';
import {
  REQUEST_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD
} from '../../Actions/User';

const ResetPassword = (state = UI.ResetPassword, action) => {
  switch (action.type) {
    case REQUEST_RESET_PASSWORD: {
      return state.merge({
        isLoading: true,
        error: null,
        requestFindEmail: null,
        userExist: false,
      })
    }

    case SUCCESS_RESET_PASSWORD: {
      return state.merge({
        error: null,
        requestFindEmail: true,
        userExist: false,
        resetEmailSent: true,
        isLoading: false
      })
    }

    default:
      return state
  }
};

export default ResetPassword;
