import { UI } from '../InitialStates';
import {
  REQUEST_CHECK_POINT_CHARGE,
  SUCCESS_CHECK_POINT_CHARGE,
  FAILURE_CHECK_POINT_CHARGE,
  WAITING_CHECK_CHARGE
} from '../../Actions/Point';

const ChargePoint = (state = UI.ChargePoint, action) => {
  switch (action.type) {
    case REQUEST_CHECK_POINT_CHARGE: {
      return state;
    }

    case SUCCESS_CHECK_POINT_CHARGE: {
      return state.merge({
        isRequestCheckCharge: false,
        successChargePoint: true,
        failureChargePoint: false,
        result: action.result && action.result.response
      })
    }

    case FAILURE_CHECK_POINT_CHARGE: {
      return state.mergeDeep({
        isRequestCheckCharge: false,
        successChargePoint: false,
        failureChargePoint: true,
        result: action.result && action.result.response
      })
    }

    case WAITING_CHECK_CHARGE: {
      return state.merge({
        isRequestCheckCharge: true,
        successChargePoint: false,
        failureChargePoint: false,
      })
    }

    default: return state;
  }
};

export default ChargePoint;
