export const TOGGLE_REPORT_MODAL = 'TOGGLE_REPORT_MODAL';
export const CLOSE_REPORT_MODAL = 'CLOSE_REPORT_MODAL';

export const REQUEST_REPORT = 'REQUEST_REPORT';
export const SUCCESS_REPORT = 'SUCCESS_REPORT';
export const FAILURE_REPORT = 'FAILURE_REPORT';

export function toggleReportModal({ contentType, location, data }) {
  return {
    type: TOGGLE_REPORT_MODAL,
    contentType,
    location,
    data
  }
}

export function closeReportModal() {
  return {
    type: CLOSE_REPORT_MODAL
  }
}

export function requestReport(payload) {
  return {
    type: REQUEST_REPORT,
    payload
  }
}

export default {
  toggleReportModal,
  closeReportModal,
  requestReport
}