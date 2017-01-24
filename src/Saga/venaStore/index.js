import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';
import { inventory } from '../../Model/normalizr/schema';
import { normalize } from 'normalizr';

import {
  REQUEST_SHOPPING_ITEM_INIT,
  SUCCESS_SHOPPING_ITEM_INIT,
  FAILURE_SHOPPING_ITEM_INIT,

  REQUEST_PURCHASE_ITEM,
  SUCCESS_PURCHASE_ITEM,
  FAILURE_PURCHASE_ITEM,

  REQUEST_ACTIVATE_VENALINK,
  SUCCESS_ACTIVATE_VENALINK,
  FAILURE_ACTIVATE_VENALINK,

  REQUEST_PARTICIPATE_VENALINK,
  SUCCESS_PARTICIPATE_VENALINK,
  FAILURE_PARTICIPATE_VENALINK,

  CLOSE_CONFIRM_PURCHASE_ITEM_MODAL,
} from '../../Actions/VenacleStore';
import {
  CLOSE_ACTIVE_VENALINK_MODAL
} from '../../Actions/Post';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaParticipateVenalink() {
  while (WORKING) {
    // REQUEST_PARTICIPATE_VENALINK
    const { payload } = yield take(REQUEST_PARTICIPATE_VENALINK);

    try {
      const result = yield call([API, API.post], '/venalink/participate', payload);
      result.inventories = normalize(result.inventories, inventory);

      yield put({ type: SUCCESS_PARTICIPATE_VENALINK, result, postId: payload.postId });
    }

    catch (error) {
      yield put({ type: FAILURE_PARTICIPATE_VENALINK, error })
    }
  }
}

function* SagaActivateVenalink() {
  while (WORKING) {
    // REQUEST_ACTIVATE_VENALINK
    const { payload } = yield take(REQUEST_ACTIVATE_VENALINK);

    try {
      const result = yield call([API, API.post], '/venalink/activate', payload);
      result.inventories = normalize(result.inventories, inventory);

      yield put({ type: SUCCESS_ACTIVATE_VENALINK, result });
      yield put({ type: CLOSE_ACTIVE_VENALINK_MODAL });
    }

    catch (error) {
      yield put({ type: FAILURE_ACTIVATE_VENALINK, error })
    }
  }
}

function* SagaPurchaseItem() {
  while (WORKING) {
    // REQUEST_PURCHASE_ITEM
    const { payload } = yield take(REQUEST_PURCHASE_ITEM);

    try {
      const result = yield call([API, API.post], '/venastore/purchase/item', payload);
      result.inventories = normalize(result.inventories, inventory);

      yield put({ type: SUCCESS_PURCHASE_ITEM, result });
      yield put({ type: CLOSE_CONFIRM_PURCHASE_ITEM_MODAL, result });
    }

    catch (error) {
      yield put({ type: FAILURE_PURCHASE_ITEM, error })
    }
  }
}

function* SagaInitShoppingItems() {
  while (WORKING) {
    // REQUEST_SHOPPING_ITEM_INIT
    const { payload } = yield take(REQUEST_SHOPPING_ITEM_INIT);

    try {
      const result = yield call([API, API.get], '/venastore', payload);

      yield put({ type: SUCCESS_SHOPPING_ITEM_INIT, result });
    }

    catch (error) {
      yield put({ type: FAILURE_SHOPPING_ITEM_INIT, error })
    }
  }
}

export default function* venaStore() {
  yield [
    SagaParticipateVenalink(),
    SagaActivateVenalink(),
    SagaPurchaseItem(),
    SagaInitShoppingItems()
  ]
}