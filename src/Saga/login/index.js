import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAILURE_LOGIN,

  REQUEST_LOGOUT,
  SUCCESS_LOGOUT,
  FAILURE_LOGOUT

} from '../../Actions/Login';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaLogout() {
  while (WORKING) {
    // REQUEST_LOGOUT
    yield take(REQUEST_LOGOUT);

    try {
      const result = yield call([Api, API.post], '/logout');

      if (result === 'ok') {
        yield put({ type: SUCCESS_LOGOUT })
      } else {
        yield put({ type: FAILURE_LOGOUT })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_LOGOUT, error })
    }
  }
}

function* SagaLogin() {
  while (WORKING) {
    // REQUEST_LOGIN
    const { payload } = yield take(REQUEST_LOGIN);

    try {
      const result = yield call([Api, API.post], '/login', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_LOGIN, result })
      } else {
        yield put({ type: FAILURE_LOGIN, result })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_LOGIN, error })
    }
  }
}

export default function* login() {
  yield [
    SagaLogin(),
    SagaLogout(),
  ]
}