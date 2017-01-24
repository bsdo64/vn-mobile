import { take, put, call, fork } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';
import { normalize, arrayOf } from 'normalizr';
import { forum } from '../../Model/normalizr/schema';
import {
  REQUEST_CREATE_COLLECTION,
  SUCCESS_CREATE_COLLECTION,
  FAILURE_CREATE_COLLECTION,

  REQUEST_UPDATE_COLLECTION,
  SUCCESS_UPDATE_COLLECTION,
  FAILURE_UPDATE_COLLECTION,

  REQUEST_DELETE_COLLECTION,
  SUCCESS_DELETE_COLLECTION,
  FAILURE_DELETE_COLLECTION,

  REQUEST_ADD_FORUM_IN_COLLECTION,
  SUCCESS_ADD_FORUM_IN_COLLECTION,
  FAILURE_ADD_FORUM_IN_COLLECTION,

  REQUEST_REMOVE_FORUM_IN_COLLECTION,
  SUCCESS_REMOVE_FORUM_IN_COLLECTION,
  FAILURE_REMOVE_FORUM_IN_COLLECTION,

  REQUEST_SEARCH_FORUM_TO_COLLECTION_SUBS,
  SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS,
  FAILURE_SEARCH_FORUM_TO_COLLECTION_SUBS,
} from '../../Actions/Collection';
import {
  requestGetInitPostList
} from '../../Actions/Post';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaSearchSubsForum() {
  while (WORKING) {
    // REQUEST_SEARCH_FORUM_TO_COLLECTION_SUBS
    const { payload } = yield take(REQUEST_SEARCH_FORUM_TO_COLLECTION_SUBS);

    try {
      const forums = yield call([Api, API.get], '/forum', payload);
      const normalizedForums = normalize(forums, arrayOf(forum));

      yield put({ type: SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS, normalizedForums })
    }

    catch (error) {
      yield put({ type: FAILURE_SEARCH_FORUM_TO_COLLECTION_SUBS, error })
    }
  }
}

function* updateCollectionPostList(collectionId) {
  try {
    const payload = {
      listName: 'collectionBestPostList',
      pathName: `/collection/${collectionId}/posts`,
      params: {
        page: 1,
        order: 'hot'
      }
    };
    yield put(requestGetInitPostList(payload));
  }
  catch (error) {
    yield put({ type: FAILURE_ADD_FORUM_IN_COLLECTION, error })
  }
}

function* SagaAddSubsForum() {
  while (WORKING) {
    // REQUEST_ADD_FORUM_IN_COLLECTION
    const { payload } = yield take(REQUEST_ADD_FORUM_IN_COLLECTION);

    try {
      const { collectionId } = payload;
      const getForum = yield call([Api, API.post], `/collection/${collectionId}/forum`, payload);
      const result = {
        normalizedForum: normalize(getForum, forum),
        collectionId: payload.collectionId
      };

      yield put({ type: SUCCESS_ADD_FORUM_IN_COLLECTION, ...result });
      /*const task = */yield fork(updateCollectionPostList, collectionId)
    }

    catch (error) {
      yield put({ type: FAILURE_ADD_FORUM_IN_COLLECTION, error })
    }
  }
}

function* SagaRemoveSubsForum() {
  while (WORKING) {
    // REQUEST_REMOVE_FORUM_IN_COLLECTION
    const { payload } = yield take(REQUEST_REMOVE_FORUM_IN_COLLECTION);

    try {
      const { collectionId, forumId } = payload;
      payload.removeSuccess = yield call([Api, API.delete], `/collection/${collectionId}/forum/${forumId}`, payload);

      yield put({ type: SUCCESS_REMOVE_FORUM_IN_COLLECTION, ...payload });
      yield fork(updateCollectionPostList, collectionId)
    }

    catch (error) {
      yield put({ type: FAILURE_REMOVE_FORUM_IN_COLLECTION, error })
    }
  }
}

function* SagaCreateCollection() {
  while (WORKING) {
    // REQUEST_CREATE_COLLECTION
    const { payload } = yield take(REQUEST_CREATE_COLLECTION);

    try {
      const result = yield call([Api, API.post], '/collection', payload);
      result.forums = [];

      yield put({ type: SUCCESS_CREATE_COLLECTION, collection: result })
    }

    catch (error) {
      yield put({ type: FAILURE_CREATE_COLLECTION, error })
    }
  }
}

function* SagaDeleteCollection() {
  while (WORKING) {
    // REQUEST_DELETE_COLLECTION
    const { payload } = yield take(REQUEST_DELETE_COLLECTION);

    try {
      const result = yield call([Api, API.post], '/collection', payload);

      yield put({ type: SUCCESS_DELETE_COLLECTION, result })
    }

    catch (error) {
      yield put({ type: FAILURE_DELETE_COLLECTION, error })
    }
  }
}

function* SagaUpdateCollection() {
  while (WORKING) {
    // REQUEST_UPDATE_COLLECTION
    const { payload } = yield take(REQUEST_UPDATE_COLLECTION);

    try {
      yield call([Api, API.post], '/collection', payload);

      yield put({ type: SUCCESS_UPDATE_COLLECTION })
    }

    catch (error) {
      yield put({ type: FAILURE_UPDATE_COLLECTION, error })
    }
  }
}

export default function* login() {
  yield [
    SagaSearchSubsForum(),
    SagaAddSubsForum(),
    SagaRemoveSubsForum(),
    SagaCreateCollection(),
    SagaDeleteCollection(),
    SagaUpdateCollection(),
  ]
}