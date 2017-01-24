import React, { PropTypes } from 'react';
import cx from 'classnames';

require('./index.scss');
const ReportModalBox = React.createClass({
  displayName: 'ReportModalBox',
  propTypes: {
    ReportStore: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    Comments: PropTypes.object.isRequired,
    SubComments: PropTypes.object.isRequired,
    FireRequestReport: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      selectItem: 1
    }
  },

  selectReportItem(e) {

    const reportId = e.target.dataset.id;
    const reportMessage = e.target.dataset.message;
    this.setState({
      selectItem: parseInt(reportId, 10),
      reportMessage: reportMessage
    });
  },
  createReportItem(item) {
    const id = item.get('id');
    const message = item.get('message');
    const activeItemStyle = cx('report_item', {
      active: this.state.selectItem === id
    });
    return (
      <div key={id} className="field">
        <div className={activeItemStyle} onClick={this.selectReportItem} data-id={id}
             data-message={message}>{message}</div>
      </div>
    )
  },
  sendReport() {

    const { ReportStore, FireRequestReport } = this.props;

    FireRequestReport({
      type: ReportStore.get('type'),
      typeId: ReportStore.get('typeId'),
      reportId: this.state.selectItem,
      description: this.state.reportMessage
    });
  },
  render() {
    const { ReportStore } = this.props;

    let content, title;
    switch (ReportStore.get('type')) {
      case 'post':
        content = this.props.Posts.get(ReportStore.get('typeId').toString());
        title = ('제목 : ' + content.get('title')) || null;
        break;

      case 'comment':
        content = this.props.Comments.get(ReportStore.get('typeId').toString());
        title = content ? <span>댓글: <div
          dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span> : null;
        break;

      case 'subComment':
        content = this.props.SubComments.get(ReportStore.get('typeId').toString());
        title = content ? (<span>대댓글: <div
          dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span>) : null;
        break;

      default:
        content = null;
        title = null;
    }

    const reportSuccess = ReportStore.get('successReport');

    return (
      <div className="report-modal">
        {
          !reportSuccess &&
          <div className="md-content content">
            <h4 className="ui header">
              불편하신 부분을 알려주세요.
              <div className="sub header">
                {title}
              </div>
            </h4>
            <div className="ui content">
              <div className="ui form">
                <div className="grouped fields">
                  <label htmlFor="report-item">어떤 부분이 불편하신가요? :</label>
                  {
                    ReportStore.get('reportItem').map(this.createReportItem)
                  }
                </div>
              </div>
            </div>
            <div className="ui actions">
              <div className="ui primary approve button" onClick={this.sendReport}>확인</div>
            </div>
          </div>
        }

        {
          reportSuccess &&
          <div className="md-content content">
            <div className="success">
              <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <h2 className="ui icon header">
                <div className="content">
                  신고 되었습니다.
                  <div className="sub header">의견을 보내주셔서 감사합니다.</div>
                </div>
              </h2>
            </div>
          </div>
        }
      </div>
    );
  }
});

export default ReportModalBox;