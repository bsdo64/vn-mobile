import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_CHECK_EMAILDUP,
  SUCCESS_CHECK_EMAILDUP,
  FAILURE_CHECK_EMAILDUP,

  REQUEST_CHECK_NICKDUP,
  SUCCESS_CHECK_NICKDUP,
  FAILURE_CHECK_NICKDUP,

  REQUEST_CHECK_VERIFYCODE,
  SUCCESS_CHECK_VERIFYCODE,
  FAILURE_CHECK_VERIFYCODE,

  REQUEST_EMAILVERIFY,
  SUCCESS_EMAILVERIFY,
  FAILURE_EMAILVERIFY,

  REQUEST_SIGNIN,
  SUCCESS_SIGNIN,
  FAILURE_SIGNIN,
} from '../../Actions/Signin';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaSignin() {
  while (WORKING) {
    // REQUEST_EMAILVERIFY
    const { payload } = yield take(REQUEST_SIGNIN);

    try {
      const { result }= yield call([Api, API.post], '/signin', payload);
      yield put({ type: SUCCESS_SIGNIN, result })
    }

    catch (error) {
      yield put({ type: FAILURE_SIGNIN, error })
    }
  }
}

function* SagaEmailVerify() {
  while (WORKING) {
    // REQUEST_EMAILVERIFY
    const { payload } = yield take(REQUEST_EMAILVERIFY);

    try {
      const { result }= yield call([Api, API.post], '/signin/requestEmailVerify', payload);
      yield put({ type: SUCCESS_EMAILVERIFY, result })
    }

    catch (error) {
      yield put({ type: FAILURE_EMAILVERIFY, error })
    }
  }
}

function* SagaCheckVerifyCode() {
  while (WORKING) {
    // REQUEST_CHECK_VERIFYCODE
    const { payload } = yield take(REQUEST_CHECK_VERIFYCODE);

    try {
      const { result }= yield call([Api, API.post], '/signin/checkEmailCodeVerify', payload);
      yield put({ type: SUCCESS_CHECK_VERIFYCODE, result })
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_VERIFYCODE, error })
    }
  }
}

function* SagaCheckNickDup() {
  while (WORKING) {
    // REQUEST_CHECK_NICKDUP
    const { payload } = yield take(REQUEST_CHECK_NICKDUP);

    try {
      const { dup }= yield call([Api, API.post], '/signin/checkNickDup', payload);
      yield put({ type: SUCCESS_CHECK_NICKDUP, dup })
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_NICKDUP, error })
    }
  }
}

function* SagaCheckEmailDup() {
  while (WORKING) {
    // REQUEST_CHECK_EMAILDUP
    const { payload } = yield take(REQUEST_CHECK_EMAILDUP);

    try {
      const { dup }= yield call([Api, API.post], '/signin/checkEmailDup', payload);
      yield put({ type: SUCCESS_CHECK_EMAILDUP, dup })
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_EMAILDUP, error })
    }
  }
}

export default function* signinSaga() {
  yield [
    SagaCheckEmailDup(),
    SagaCheckNickDup(),
    SagaCheckVerifyCode(),
    SagaEmailVerify(),
    SagaSignin()
  ]
}