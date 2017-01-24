import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';
import {
  CLOSE_DELETE_MODAL,
  REQUEST_DELETE_ITEM,
  SUCCESS_DELETE_ITEM,
  FAILURE_DELETE_ITEM
} from '../../Actions/DeleteItem';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaDeleteItem() {
  while (WORKING) {
    // REQUEST_DELETE_ITEM
    const { payload } = yield take(REQUEST_DELETE_ITEM);

    try {
      const item = yield call([Api, API.delete], '/user/removeItem', payload);

      yield put({ type: SUCCESS_DELETE_ITEM, item })
      yield put({ type: CLOSE_DELETE_MODAL, item })
    }

    catch (error) {
      yield put({ type: FAILURE_DELETE_ITEM, error })
    }
  }
}

export default function* deleteItem() {
  yield [
    SagaDeleteItem(),
  ]
}