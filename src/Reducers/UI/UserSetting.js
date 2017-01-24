import { UI } from '../InitialStates';
import {
  CLOSE_USER_SETTING_MESSAGE,
  SUCCESS_USER_UPDATE_PROFILE,
  FAILURE_USER_UPDATE_PROFILE,
  SUCCESS_USER_UPDATE_PASSWORD,
  FAILURE_USER_UPDATE_PASSWORD,
} from '../../Actions/User';

const UserSetting = (state = UI.UserSetting, action) => {
  switch (action.type) {
    case CLOSE_USER_SETTING_MESSAGE: {
      return state.set(action.successType, null);
    }

    case SUCCESS_USER_UPDATE_PROFILE: {
      return state.set('error', null).set('success', true);
    }

    case FAILURE_USER_UPDATE_PROFILE: {
      return state.set('error', '프로필 설정에 실패하였습니다.');
    }

    case SUCCESS_USER_UPDATE_PASSWORD: {
      return state.set('error', null).set('success', true);
    }

    case FAILURE_USER_UPDATE_PASSWORD: {
      return state.set('error', '비밀번호설정을 실패 하였습니다.');
    }

    default: return state;
  }
};

export default UserSetting;
