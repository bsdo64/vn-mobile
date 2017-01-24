import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import { normalize, arrayOf } from 'normalizr';
import { post } from '../../Model/normalizr/schema';

import {
  REQUEST_SAVE_FOLLOWING_FILTER,
  FAILURE_SAVE_FOLLOWING_FILTER,
  SUCCESS_SAVE_FOLLOWING_FILTER,

} from '../../Actions/Gnb';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaSaveFollowingFilter() {
  while (WORKING) {
    // REQUEST_SAVE_FOLLOWING_FILTER
    const { payload } = yield take(REQUEST_SAVE_FOLLOWING_FILTER);

    try {
      const { data, collection }= yield call([Api, API.get], '/best', payload);
      const normalized = normalize(data, arrayOf(post));

      yield put({ type: SUCCESS_SAVE_FOLLOWING_FILTER, data: normalized, collection })
    }

    catch (error) {
      yield put({ type: FAILURE_SAVE_FOLLOWING_FILTER, error })
    }
  }
}

export default function* followingList() {
  yield [
    SagaSaveFollowingFilter(),
  ]
}