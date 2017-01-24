import { UI } from '../InitialStates';
import debug from 'debug';
const errorLog = debug('vn:action:error');

import {
  TOGGLE_AGREE_TERM,
  TOGGLE_AGREE_PRIVACY,
  CONFIRM_AGREE,
  EMAIL_VERIFY_FORM_OPEN,

  SUCCESS_CHECK_EMAILDUP,
  FAILURE_CHECK_EMAILDUP,
  SUCCESS_CHECK_NICKDUP,
  FAILURE_CHECK_NICKDUP,
  SUCCESS_CHECK_VERIFYCODE,
  FAILURE_CHECK_VERIFYCODE,
  SUCCESS_SIGNIN,
  FAILURE_SIGNIN,
  SUCCESS_EMAILVERIFY,
  FAILURE_EMAILVERIFY,
} from '../../Actions/Signin';

const SigninForm = (state = UI.SigninForm, action) => {
  switch (action.type) {

    case TOGGLE_AGREE_TERM: {
      return state.update('agreeTerm', v => !v)
    }

    case TOGGLE_AGREE_PRIVACY: {
      return state.update('agreePrivacy', v => !v);
    }

    case CONFIRM_AGREE: {
      return state.update('confirmAgree', () => true);
    }

    case EMAIL_VERIFY_FORM_OPEN: {
      return state.update('emailVerifyFormOpen', () => true);
    }

    case SUCCESS_CHECK_EMAILDUP: {
      return state.update('emailDup', () => !!action.dup);
    }

    case SUCCESS_CHECK_NICKDUP: {
      return state.update('nickDup', () => !!action.dup);
    }

    case SUCCESS_CHECK_VERIFYCODE: {
      return state.update('emailRequested', () => action.result === 'ok');
    }

    case SUCCESS_EMAILVERIFY: {
      const result = (action.result === 'ok')
        ? { emailVerifySuccess: true, emailVerifyFail: false }
        : { emailVerifySuccess: false, emailVerifyFail: true };

      return state.merge(result);
    }

    case SUCCESS_SIGNIN: {
      return state.update('submitResult', () => action.result === 'ok');
    }

    case FAILURE_CHECK_NICKDUP:
    case FAILURE_CHECK_EMAILDUP:
    case FAILURE_CHECK_VERIFYCODE:
    case FAILURE_SIGNIN:
    case FAILURE_EMAILVERIFY: {
      errorLog(action.error);
      break;
    }

    default: return state;
  }
};

export default SigninForm;
