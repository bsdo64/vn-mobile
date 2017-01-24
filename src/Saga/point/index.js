import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_CHECK_POINT_CHARGE,
  SUCCESS_CHECK_POINT_CHARGE,
  FAILURE_CHECK_POINT_CHARGE,
} from '../../Actions/Point';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaCheckPointCharge() {
  while (WORKING) {
    // REQUEST_CHECK_POINT_CHARGE
    const { payload } = yield take(REQUEST_CHECK_POINT_CHARGE);

    try {
      const result = yield call([API, API.post], '/point/check/rp', payload);
      if (result && !result.error) {
        yield put({ type: SUCCESS_CHECK_POINT_CHARGE, result });
      } else {
        yield put({ type: FAILURE_CHECK_POINT_CHARGE })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_POINT_CHARGE, error })
    }
  }
}

export default function* user() {
  yield [
    SagaCheckPointCharge(),
  ]
}