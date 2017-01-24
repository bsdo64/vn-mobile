export const TOGGLE_AGREE_TERM = 'TOGGLE_AGREE_TERM';
export const TOGGLE_AGREE_PRIVACY = 'TOGGLE_AGREE_PRIVACY';
export const CONFIRM_AGREE = 'CONFIRM_AGREE';
export const RESET_SIGNIN_FORM = 'RESET_SIGNIN_FORM';
export const EMAIL_VERIFY_FORM_OPEN = 'EMAIL_VERIFY_FORM_OPEN';

export const REQUEST_CHECK_EMAILDUP = 'REQUEST_CHECK_EMAILDUP';
export const SUCCESS_CHECK_EMAILDUP = 'SUCCESS_CHECK_EMAILDUP';
export const FAILURE_CHECK_EMAILDUP = 'FAILURE_CHECK_EMAILDUP';

export const REQUEST_CHECK_NICKDUP = 'REQUEST_CHECK_NICKDUP';
export const SUCCESS_CHECK_NICKDUP = 'SUCCESS_CHECK_NICKDUP';
export const FAILURE_CHECK_NICKDUP = 'FAILURE_CHECK_NICKDUP';

export const REQUEST_EMAILVERIFY = 'REQUEST_EMAILVERIFY';
export const SUCCESS_EMAILVERIFY = 'SUCCESS_EMAILVERIFY';
export const FAILURE_EMAILVERIFY = 'FAILURE_EMAILVERIFY';

export const REQUEST_CHECK_VERIFYCODE = 'REQUEST_CHECK_VERIFYCODE';
export const SUCCESS_CHECK_VERIFYCODE = 'SUCCESS_CHECK_VERIFYCODE';
export const FAILURE_CHECK_VERIFYCODE = 'FAILURE_CHECK_VERIFYCODE';

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export const SUCCESS_SIGNIN = 'SUCCESS_SIGNIN';
export const FAILURE_SIGNIN = 'FAILURE_SIGNIN';

export function toggleAgreeTerm() {
  return {
    type: TOGGLE_AGREE_TERM
  }
}

export function toggleAgreePrivacy() {
  return {
    type: TOGGLE_AGREE_PRIVACY
  }
}

export function confirmAgree() {
  return {
    type: CONFIRM_AGREE
  }
}

export function resetSigninForm() {
  return {
    type: RESET_SIGNIN_FORM
  }
}

export function emailVerifyFormOpen() {
  return {
    type: EMAIL_VERIFY_FORM_OPEN
  }
}

// Ajax
export function requestCheckEmailDup(payload) {
  return {
    type: REQUEST_CHECK_EMAILDUP,
    payload
  }
}

export function requestCheckNickDup(payload) {
  return {
    type: REQUEST_CHECK_NICKDUP,
    payload
  }
}

export function requestEmailVerify(payload) {
  return {
    type: REQUEST_EMAILVERIFY,
    payload
  }
}

export function requestCheckVerifyCode(payload) {
  return {
    type: REQUEST_CHECK_VERIFYCODE,
    payload
  }
}

export function requestSignin(payload) {
  return {
    type: REQUEST_SIGNIN,
    payload
  }
}