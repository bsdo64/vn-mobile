import { normalize } from 'normalizr';
import { post, comment, subComment } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_LIKE_COMMENT,
  SUCCESS_LIKE_COMMENT,
  FAILURE_LIKE_COMMENT,

  REQUEST_LIKE_SUB_COMMENT,
  SUCCESS_LIKE_SUB_COMMENT,
  FAILURE_LIKE_SUB_COMMENT,

  REQUEST_SUBMIT_COMMENT,
  SUCCESS_SUBMIT_COMMENT,
  FAILURE_SUBMIT_COMMENT,

  REQUEST_SUBMIT_SUB_COMMENT,
  SUCCESS_SUBMIT_SUB_COMMENT,
  FAILURE_SUBMIT_SUB_COMMENT,

  REQUEST_UPDATE_COMMENT,
  SUCCESS_UPDATE_COMMENT,
  FAILURE_UPDATE_COMMENT,

  REQUEST_UPDATE_SUB_COMMENT,
  SUCCESS_UPDATE_SUB_COMMENT,
  FAILURE_UPDATE_SUB_COMMENT,

  CLOSE_COMMENT_UPDATE_VIEW
} from '../../Actions/Comment';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaSubmitComment() {
  while (WORKING) {
        // REQUEST_SUBMIT_COMMENT
    const { payload } = yield take(REQUEST_SUBMIT_COMMENT);

    try {
      const result = yield call([Api, API.post], '/community/comment', payload);

      const normalized = normalize(result, post);
      yield put({ type: SUCCESS_SUBMIT_COMMENT, normalized });
    }

    catch (error) {
      yield put({ type: FAILURE_SUBMIT_COMMENT, error })
    }
  }
}
function* SagaUpdateComment() {
  while (WORKING) {
        // REQUEST_UPDATE_COMMENT
    const { payload } = yield take(REQUEST_UPDATE_COMMENT);

    try {
      const result = yield call([Api, API.put], '/community/comment', payload);
      const normalized = normalize(result, comment);
      yield put({ type: SUCCESS_UPDATE_COMMENT, normalized });
      yield put({ type: CLOSE_COMMENT_UPDATE_VIEW });
    }

    catch (error) {
      yield put({ type: FAILURE_UPDATE_COMMENT, error })
    }
  }
}
function* SagaSubmitSubComment() {
  while (WORKING) {
        // REQUEST_SUBMIT_SUB_COMMENT
    const { payload } = yield take(REQUEST_SUBMIT_SUB_COMMENT);

    try {
      const result = yield call([Api, API.post], '/community/subComment', payload);
      const normalized = normalize(result, subComment);
      yield put({ type: SUCCESS_SUBMIT_SUB_COMMENT, normalized, commentId: result.commentId });
    }

    catch (error) {
      yield put({ type: FAILURE_SUBMIT_SUB_COMMENT, error })
    }
  }
}
function* SagaUpdateSubComment() {
  while (WORKING) {
        // REQUEST_UPDATE_SUB_COMMENT
    const { payload } = yield take(REQUEST_UPDATE_SUB_COMMENT);

    try {
      const result = yield call([Api, API.put], '/community/subComment', payload);
      const normalized = normalize(result, subComment);
      yield put({ type: SUCCESS_UPDATE_SUB_COMMENT, normalized });
      yield put({ type: CLOSE_COMMENT_UPDATE_VIEW });
    }

    catch (error) {
      yield put({ type: FAILURE_UPDATE_SUB_COMMENT, error })
    }
  }
}

function* SagaLikeSubComment() {
  while (WORKING) {
    // REQUEST_LIKE_SUB_COMMENT
    const { payload } = yield take(REQUEST_LIKE_SUB_COMMENT);

    try {
      const result = yield call([Api, API.post], '/like/subComment', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_LIKE_SUB_COMMENT, subCommentId: payload.subCommentId })
      } else {
        yield put({ type: FAILURE_LIKE_SUB_COMMENT })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_LIKE_SUB_COMMENT, error })
    }
  }
}

function* SagaLikeComment() {
  while (WORKING) {
    // REQUEST_LIKE_COMMENT
    const { payload } = yield take(REQUEST_LIKE_COMMENT);

    try {
      const result = yield call([Api, API.post], '/like/comment', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_LIKE_COMMENT, commentId: payload.commentId })
      } else {
        yield put({ type: FAILURE_LIKE_COMMENT })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_LIKE_COMMENT, error })
    }
  }
}

export default function* commentSaga() {
  yield [
    SagaLikeComment(),
    SagaLikeSubComment(),
    SagaSubmitComment(),
    SagaUpdateComment(),
    SagaSubmitSubComment(),
    SagaUpdateSubComment(),
  ]
}