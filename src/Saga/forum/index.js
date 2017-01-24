import { normalize, arrayOf } from 'normalizr';
import { forum } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_FORUM_LIST,
  SUCCESS_GET_MORE_FORUM_LIST,
  FAILURE_GET_MORE_FORUM_LIST,

  REQUEST_FOLLOW_FORUM,
  SUCCESS_FOLLOW_FORUM,
  FAILURE_FOLLOW_FORUM,

  REQUEST_UN_FOLLOW_FORUM,
  SUCCESS_UN_FOLLOW_FORUM,
  FAILURE_UN_FOLLOW_FORUM,

  REQUEST_VALIDATE_TITLE_FORUM_CREATE,
  SUCCESS_VALIDATE_TITLE_FORUM_CREATE,
  FAILURE_VALIDATE_TITLE_FORUM_CREATE,

  REQUEST_CREATE_FORUM,
  SUCCESS_CREATE_FORUM,
  FAILURE_CREATE_FORUM,

} from '../../Actions/Forum';
import {

  REQUEST_UPDATE_FORUM_META,
  SUCCESS_UPDATE_FORUM_META,
  FAILURE_UPDATE_FORUM_META,

  REQUEST_ADD_FORUM_PREFIX,
  SUCCESS_ADD_FORUM_PREFIX,
  FAILURE_ADD_FORUM_PREFIX,

  REQUEST_UPDATE_FORUM_PREFIX,
  SUCCESS_UPDATE_FORUM_PREFIX,
  FAILURE_UPDATE_FORUM_PREFIX,

  REQUEST_DELETE_FORUM_PREFIX,
  SUCCESS_DELETE_FORUM_PREFIX,
  FAILURE_DELETE_FORUM_PREFIX,

  REQUEST_ADD_FORUM_MANAGER,
  SUCCESS_ADD_FORUM_MANAGER,
  FAILURE_ADD_FORUM_MANAGER,

  REQUEST_DELETE_FORUM_MANAGER,
  SUCCESS_DELETE_FORUM_MANAGER,
  FAILURE_DELETE_FORUM_MANAGER,

  REQUEST_DELETE_FORUM_ANNOUNCE,
  SUCCESS_DELETE_FORUM_ANNOUNCE,
  FAILURE_DELETE_FORUM_ANNOUNCE,

  REQUEST_ADD_FORUM_BAN_USER,
  SUCCESS_ADD_FORUM_BAN_USER,
  FAILURE_ADD_FORUM_BAN_USER,

  REQUEST_DELETE_FORUM_BAN_USER,
  SUCCESS_DELETE_FORUM_BAN_USER,
  FAILURE_DELETE_FORUM_BAN_USER,
} from '../../Actions/ForumSetting';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaUpdateForumMeta() {
    while (WORKING) {
    // REQUEST_UPDATE_FORUM_META
    const { payload } = yield take(REQUEST_UPDATE_FORUM_META);

    try {
      const result = yield call([API, API.put], '/forum', payload);

      if (result) {
        yield put({ type: SUCCESS_UPDATE_FORUM_META, result })
      } else {
        yield put({ type: FAILURE_UPDATE_FORUM_META })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_UPDATE_FORUM_META, error })
    }
  }
}
function* SagaAddForumPrefix() {
    while (WORKING) {
    // REQUEST_ADD_FORUM_PREFIX
    const { payload } = yield take(REQUEST_ADD_FORUM_PREFIX);

    try {
      const result = yield call([API, API.post], '/forum/prefix', payload);

      yield put({ type: SUCCESS_ADD_FORUM_PREFIX, result })
    }

    catch (error) {
      yield put({ type: FAILURE_ADD_FORUM_PREFIX, error })
    }
  }
}
function* SagaDeleteForumPrefix() {
    while (WORKING) {
    // REQUEST_DELETE_FORUM_PREFIX
    const { payload } = yield take(REQUEST_DELETE_FORUM_PREFIX);

    try {
      yield call([API, API.delete], '/forum/prefix', payload);

      yield put({ type: SUCCESS_DELETE_FORUM_PREFIX, result: payload })
    }

    catch (error) {
      yield put({ type: FAILURE_DELETE_FORUM_PREFIX, error })
    }
  }
}
function* SagaUpdateForumPrefix() {
    while (WORKING) {
    // REQUEST_UPDATE_FORUM_PREFIX
    const { payload } = yield take(REQUEST_UPDATE_FORUM_PREFIX);

    try {
      const result = yield call([API, API.put], '/forum/prefix', payload);

      yield put({ type: SUCCESS_UPDATE_FORUM_PREFIX, result });

    }

    catch (error) {
      yield put({ type: FAILURE_UPDATE_FORUM_PREFIX, error })
    }
  }
}
function* SagaAddForumManager() {
    while (WORKING) {
    // REQUEST_ADD_FORUM_MANAGER
    const { payload } = yield take(REQUEST_ADD_FORUM_MANAGER);

    try {
      const result = yield call([API, API.post], '/forum/manager', payload);

      yield put({ type: SUCCESS_ADD_FORUM_MANAGER, result });
    }

    catch (error) {
      yield put({ type: FAILURE_ADD_FORUM_MANAGER, error })
    }
  }
}
function* SagaDeleteForumManager() {
    while (WORKING) {
    // REQUEST_DELETE_FORUM_MANAGER
    const { payload } = yield take(REQUEST_DELETE_FORUM_MANAGER);

    try {
      yield call([API, API.delete], '/forum/manager', payload);

      yield put({ type: SUCCESS_DELETE_FORUM_MANAGER, result: payload });
    }

    catch (error) {
      yield put({ type: FAILURE_DELETE_FORUM_MANAGER, error })
    }
  }
}
function* SagaDeleteForumAnnounce() {
    while (WORKING) {
    // REQUEST_DELETE_FORUM_ANNOUNCE
    const { payload } = yield take(REQUEST_DELETE_FORUM_ANNOUNCE);

    try {
      yield call([API, API.delete], '/forum/announce', payload);

      yield put({ type: SUCCESS_DELETE_FORUM_ANNOUNCE, result: payload });
    }

    catch (error) {
      yield put({ type: FAILURE_DELETE_FORUM_ANNOUNCE, error })
    }
  }
}
function* SagaAddForumBanUser() {
    while (WORKING) {
    // REQUEST_ADD_FORUM_BAN_USER
    const { payload } = yield take(REQUEST_ADD_FORUM_BAN_USER);

    try {
      const result = yield call([API, API.post], '/forum/banUser', payload);

      yield put({ type: SUCCESS_ADD_FORUM_BAN_USER, result });
    }

    catch (error) {
      yield put({ type: FAILURE_ADD_FORUM_BAN_USER, error })
    }
  }
}

function* SagaDeleteForumBanUser() {
  while (WORKING) {
    // REQUEST_DELETE_FORUM_BAN_USER
    const { payload } = yield take(REQUEST_DELETE_FORUM_BAN_USER);

    try {
      yield call([API, API.delete], '/forum/banUser', payload);

      yield put({ type: SUCCESS_DELETE_FORUM_BAN_USER, result: payload });
    }

    catch (error) {
      yield put({ type: FAILURE_DELETE_FORUM_BAN_USER, error })
    }
  }
}

function* SagaCreateForum() {
  while (WORKING) {
    // REQUEST_CREATE_FORUM
    const { payload } = yield take(REQUEST_CREATE_FORUM);

    try {
      const result = yield call([API, API.post], '/forum', payload);

      if (result && result.id) {
        yield put({ type: SUCCESS_CREATE_FORUM, result })
      } else {
        yield put({ type: FAILURE_CREATE_FORUM, result })
      }

    }

    catch (error) {
      yield put({ type: FAILURE_CREATE_FORUM, error })
    }
  }
}

function* SagaVaildateTitleCreateForum() {
  while (WORKING) {
    // REQUEST_VALIDATE_TITLE_FORUM_CREATE
    const { payload } = yield take(REQUEST_VALIDATE_TITLE_FORUM_CREATE);

    try {
      const result = yield call([API, API.get], '/validate/forum/create', payload);

      if (result.success) {
        yield put({ type: SUCCESS_VALIDATE_TITLE_FORUM_CREATE, result })
      } else if (!result.success && result.type === 'Error') {
        yield put({ type: FAILURE_VALIDATE_TITLE_FORUM_CREATE, result })
      }

    }

    catch (error) {
      yield put({ type: FAILURE_VALIDATE_TITLE_FORUM_CREATE, error })
    }
  }
}

function* SagaUnFollow() {
  while (WORKING) {
    // REQUEST_UN_FOLLOW_FORUM
    const { payload } = yield take(REQUEST_UN_FOLLOW_FORUM);

    try {
      const result = yield call([API, API.post], '/user/forum/unfollow', payload);

      result.userId = payload.userId;

      yield put({ type: SUCCESS_UN_FOLLOW_FORUM, result })
    }

    catch (error) {
      yield put({ type: FAILURE_UN_FOLLOW_FORUM, error })
    }
  }
}

function* SagaFollow() {
  while (WORKING) {
    // REQUEST_FOLLOW_FORUM
    const { payload } = yield take(REQUEST_FOLLOW_FORUM);

    try {
      const result = yield call([API, API.post], '/user/forum/follow', payload);

      result.userId = payload.userId;

      yield put({ type: SUCCESS_FOLLOW_FORUM, result })
    }

    catch (error) {
      yield put({ type: FAILURE_FOLLOW_FORUM, error })
    }
  }
}

function* SagaMoreList() {
  while (WORKING) {
    // REQUEST_GET_MORE_FORUM_LIST
    const { payload } = yield take(REQUEST_GET_MORE_FORUM_LIST);

    try {
      const result = yield call([API, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(forum));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_MORE_FORUM_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_FORUM_LIST, error })
    }
  }
}

export default function* forumSaga() {
  yield [
    SagaCreateForum(),
    SagaVaildateTitleCreateForum(),
    SagaMoreList(),
    SagaFollow(),
    SagaUnFollow(),
    SagaUpdateForumMeta(),
    SagaAddForumPrefix(),
    SagaDeleteForumPrefix(),
    SagaUpdateForumPrefix(),
    SagaAddForumManager(),
    SagaDeleteForumManager(),
    SagaDeleteForumAnnounce(),
    SagaAddForumBanUser(),
    SagaDeleteForumBanUser(),
  ]
}