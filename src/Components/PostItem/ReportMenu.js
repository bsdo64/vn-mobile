import React, { PropTypes } from 'react';
import cx from 'classnames';
import { browserHistory } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import memoize from 'fast-memoize';

import './ReportBox.scss';
function createToggleModal(props) {
  const { forumId, targetId, targetType } = props;

  return function toggleModal(e) {
    const action = e.target.dataset.action;
    const reportObj = {
      type: targetType,
      typeId: targetId
    };
    switch (action) {

      case 'report':
        props.FireToggleReportModal({
          data: reportObj,
          contentType: 'Report'
        });
        break;
      case 'mod_post':
        browserHistory.push(`/community/submit?forumId=${forumId}&postId=${targetId}`);
        break;
      case 'mod_comment':
        props.FireOpenCommentUpdateView({
          targetId,
          type: 'comment'
        });
        break;
      case 'mod_subComment':
        props.FireOpenCommentUpdateView({
          targetId,
          type: 'subComment'
        });
        break;
      case 'delete_post':
        props.FireToggleDeleteModal({
          data: reportObj,
          contentType: 'DeleteItem'
        });
        break;
      case 'delete_comment':
        props.FireToggleDeleteModal({
          data: reportObj,
          contentType: 'DeleteItem'
        });
        break;
      case 'delete_subComment':
        reportObj.type = 'sub_comment';

        props.FireToggleDeleteModal({
          data: reportObj,
          contentType: 'DeleteItem'
        });
        break;
      default:
        break;
    }
  }
}

function isActivateVenalinkPost(post) {

  if (post) {
    if (post.get('venalinks') && post.get('venalinks').size > 0) {
      return post.get('venalinks').find(i => i.get('is_activate') === true)
    } else {
      return false;
    }
  }
}

const Menu = (props) => {

  const { isUser, targetType, post } = props;
  const isActivateVenalink = isActivateVenalinkPost(post);
  const removeAvailable = cx('item', {
    disabled: isActivateVenalink
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className={"ui icon dropdown report_icon "}>
          <i className="warning outline icon" />
        </div>
      </DropdownTrigger>
      <DropdownContent>
        <div className="ui dropdown">
          <div className="ui menu transition visible" tabIndex="-1">
            {
              !isUser &&
              <div className="item" data-action="report" onClick={createToggleModal(props)}>신고</div>
            }
            {
              isUser &&
              <div className="item " data-action={`mod_${targetType}`} onClick={createToggleModal(props)}>수정하기</div>
            }
            {
              isUser &&
              <div className={removeAvailable} data-action={`delete_${targetType}`} onClick={createToggleModal(props)}>삭제하기</div>
            }
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  )
};

Menu.propTypes = {
  isUser: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  targetType: PropTypes.string.isRequired,
  FireToggleReportModal: PropTypes.func.isRequired,
  FireToggleDeleteModal: PropTypes.func.isRequired,
  FireOpenCommentUpdateView: PropTypes.func,
};

export default memoize(Menu);