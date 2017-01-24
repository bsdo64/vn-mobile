export const REQUEST_CHECK_POINT_CHARGE = 'REQUEST_CHECK_POINT_CHARGE';
export const SUCCESS_CHECK_POINT_CHARGE = 'SUCCESS_CHECK_POINT_CHARGE';
export const FAILURE_CHECK_POINT_CHARGE = 'FAILURE_CHECK_POINT_CHARGE';

export const WAITING_CHECK_CHARGE = 'WAITING_CHECK_CHARGE';

export function waitingCheckCharge() {
  return {
    type: WAITING_CHECK_CHARGE
  }
}

export function requestCheckPointCharge(payload) {
  return {
    type: REQUEST_CHECK_POINT_CHARGE,
    payload
  }
}

export function failureCheckPointCharge(payload) {
  return {
    type: FAILURE_CHECK_POINT_CHARGE,
    payload
  }
}