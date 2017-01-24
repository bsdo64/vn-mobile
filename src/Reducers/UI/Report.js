import { UI } from '../InitialStates';
import {
  TOGGLE_REPORT_MODAL,
  SUCCESS_REPORT
} from '../../Actions/Report';
import {
  CLOSE_MODAL
} from '../../Actions/Modal';

const Report = (state = UI.Report, action) => {
  switch (action.type) {

    case TOGGLE_REPORT_MODAL: {
      return state.merge(action.data)
    }

    case SUCCESS_REPORT: {
      return state.merge({ successReport: true })
    }

    case CLOSE_MODAL: {
      return state.merge({ selectItem: 1, successReport: false })
    }

    default : return state;
  }
};

export default Report;
