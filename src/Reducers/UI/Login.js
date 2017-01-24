import { Map } from 'immutable';
import { UI } from '../InitialStates';

import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAILURE_LOGIN,

  SUCCESS_LOGOUT,
  FAILURE_LOGOUT
} from '../../Actions/Login';

const Login = (state = UI.Login, action) => {
  switch (action.type) {
    case REQUEST_LOGIN: {
      return state.merge(Map({ isLoading: true }))
    }

    case SUCCESS_LOGIN: {
      return state.merge(Map({ isLoading: false, loginSuccess: true, loginFail: false }))
    }

    case FAILURE_LOGIN: {
      return state.merge(Map({ isLoading: false, loginSuccess: false, loginFail: true }))
    }

    case SUCCESS_LOGOUT: {
      return state.merge(Map({ logoutSuccess: true, logoutFail: false }))
    }

    case FAILURE_LOGOUT: {
      return state.merge(Map({ logoutSuccess: false, logoutFail: true }))
    }
  }
  return state;
};

export default Login;
