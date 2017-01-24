import React, { PropTypes } from 'react';
import cx from 'classnames';

require('./index.scss');
const DeleteModalBox = React.createClass({
  displayName: 'DeleteModalBox',
  propTypes: {
    RemoveModalStore: PropTypes.object.isRequired,
    LoginStore: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    Comments: PropTypes.object.isRequired,
    SubComments: PropTypes.object.isRequired,

    FireRequestDeleteItem: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      selectItem: 1
    }
  },
  sendReport() {
    const { RemoveModalStore, LoginStore } = this.props;

    const isLogin = LoginStore.get('isLogin');
    if (isLogin) {
      const reportObj = {
        type: RemoveModalStore.get('type'),
        typeId: RemoveModalStore.get('typeId')
      };

      this.props.FireRequestDeleteItem(reportObj);
    }
  },
  render() {
    const {
      Posts, Comments, SubComments, RemoveModalStore
    } = this.props;

    let content, title;
    switch (RemoveModalStore.get('type')) {
      case 'post':
        content = Posts.get(RemoveModalStore.get('typeId').toString());
        title = ('제목 : ' + content.get('title')) || null;
        break;

      case 'comment':
        content = Comments.get(RemoveModalStore.get('typeId').toString());
        title = content ? <span>댓글: <div
          dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span> : null;
        break;

      case 'subComment':
        content = SubComments.get(RemoveModalStore.get('typeId').toString());
        title = content ? (<span>대댓글: <div
          dangerouslySetInnerHTML={{ __html: content.get('content') }}></div></span>) : null;
        break;

      default:
        content = null;
        title = null;
    }

    const buttonStyle = cx('ui primary approve button', {
      loading: RemoveModalStore.get('isLoading')
    });

    return (
      <div className="delete-modal">
        <div className="md-content content">
          <h4 className="ui header">
            글 삭제하기
            <div className="sub header">
              {title}
            </div>
          </h4>
          <div className="ui content">
            정말로 이 글을 삭제 하시겠습니까?
          </div>
          <div className="ui actions">
            <div className={buttonStyle} onClick={this.sendReport}>확인</div>
          </div>
        </div>
      </div>
    );
  }
});

export default DeleteModalBox;