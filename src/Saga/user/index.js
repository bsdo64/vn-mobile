import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  FAILURE_RESET_PASSWORD,

  REQUEST_USER_AVATAR_IMAGE_UPLOAD,
  SUCCESS_USER_AVATAR_IMAGE_UPLOAD,
  FAILURE_USER_AVATAR_IMAGE_UPLOAD,

  REQUEST_USER_AVATAR_IMAGE_REMOVE,
  SUCCESS_USER_AVATAR_IMAGE_REMOVE,
  FAILURE_USER_AVATAR_IMAGE_REMOVE,

  REQUEST_USER_UPDATE_PASSWORD,
  SUCCESS_USER_UPDATE_PASSWORD,
  FAILURE_USER_UPDATE_PASSWORD,

  REQUEST_USER_UPDATE_PROFILE,
  SUCCESS_USER_UPDATE_PROFILE,
  FAILURE_USER_UPDATE_PROFILE,

  REQUEST_USER_READ_NOTIFICATION,
  SUCCESS_USER_READ_NOTIFICATION,
  FAILURE_USER_READ_NOTIFICATION,

  REQUEST_USER_PAYBACK_RP,
  SUCCESS_USER_PAYBACK_RP,
  FAILURE_USER_PAYBACK_RP,

  CLOSE_AVATAR_MODAL,
} from '../../Actions/User';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaPaybackRP() {
  while (WORKING) {
    // REQUEST_USER_PAYBACK_RP
    const { payload } = yield take(REQUEST_USER_PAYBACK_RP);

    try {
      const result = yield call([API, API.post], '/user/payback/rp', payload);
      if (result && result.list) {

        yield put({ type: SUCCESS_USER_PAYBACK_RP, result });
      } else {
        yield put({ type: FAILURE_USER_PAYBACK_RP })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_PAYBACK_RP, error })
    }
  }
}

function* SagaReadNoti() {
  while (WORKING) {
    // REQUEST_USER_READ_NOTIFICATION
    const { payload } = yield take(REQUEST_USER_READ_NOTIFICATION);

    try {
      const result = yield call([API, API.put], '/user/noti/read', payload);
      if (result) {
        payload.userId = result;
        yield put({ type: SUCCESS_USER_READ_NOTIFICATION, result: payload });
      } else {
        yield put({ type: FAILURE_USER_READ_NOTIFICATION })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_READ_NOTIFICATION, error })
    }
  }
}

function* SagaUserUpdateProfile() {
  while (WORKING) {
    // REQUEST_USER_UPDATE_PROFILE
    const { payload } = yield take(REQUEST_USER_UPDATE_PROFILE);

    try {
      const result = yield call([API, API.post], '/user/setting/profile', payload);

      if (result.length === 1) {
        yield put({ type: SUCCESS_USER_UPDATE_PROFILE, result });
      }
      if (result.code === 1) {
        yield put({ type: FAILURE_USER_UPDATE_PROFILE, result });
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_UPDATE_PROFILE, error })
    }
  }
}

function* SagaUserUpdatePassword() {
  while (WORKING) {
    // REQUEST_USER_UPDATE_PASSWORD
    const { payload } = yield take(REQUEST_USER_UPDATE_PASSWORD);

    try {
      const result = yield call([API, API.post], '/user/setting/password', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_USER_UPDATE_PASSWORD, result });
      }

      if (result.code === 1) {
        yield put({ type: FAILURE_USER_UPDATE_PASSWORD, result });
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_UPDATE_PASSWORD, error })
    }
  }
}


function* SagaUserAvatarImageRemove() {
  while (WORKING) {
    // REQUEST_USER_AVATAR_IMAGE_REMOVE
    yield take(REQUEST_USER_AVATAR_IMAGE_REMOVE);

    try {
      const result = yield call([API, API.delete], '/user/avatarImg');

      if (result) {
        yield put({ type: SUCCESS_USER_AVATAR_IMAGE_REMOVE, result });
      } else {
        yield put({ type: FAILURE_USER_AVATAR_IMAGE_REMOVE })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_AVATAR_IMAGE_REMOVE, error })
    }
  }
}

function* SagaUserAvatarImageUpload() {
  while (WORKING) {
    // REQUEST_USER_AVATAR_IMAGE_UPLOAD
    const { payload } = yield take(REQUEST_USER_AVATAR_IMAGE_UPLOAD);

    try {
      const file = yield call([API.setEntryPoint('/image'), API.postImg], '/upload', payload);
      const user = yield call([API.setEntryPoint('/ajax'), API.post], '/user/avatarImg', { file: file.files[0] });

      if (file && file.files[0] && user.user.id) {
        yield put({ type: SUCCESS_USER_AVATAR_IMAGE_UPLOAD, file, user });
        yield put({ type: CLOSE_AVATAR_MODAL });
      } else {
        yield put({ type: FAILURE_USER_AVATAR_IMAGE_UPLOAD })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_AVATAR_IMAGE_UPLOAD, error })
    }
  }
}

function* SagaResetPassword() {
  while (WORKING) {
    // REQUEST_RESET_PASSWORD
    const { payload } = yield take(REQUEST_RESET_PASSWORD);

    try {
      const result = yield call([API, API.post], '/user/resetPassword', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_RESET_PASSWORD, result })
      } else {
        yield put({ type: FAILURE_RESET_PASSWORD, result })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_RESET_PASSWORD, error })
    }
  }
}

export default function* user() {
  yield [
    SagaPaybackRP(),
    SagaReadNoti(),
    SagaResetPassword(),
    SagaUserUpdateProfile(),
    SagaUserUpdatePassword(),
    SagaUserAvatarImageRemove(),
    SagaUserAvatarImageUpload(),
  ]
}