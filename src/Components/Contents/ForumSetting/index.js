import React, { PropTypes } from 'react';
import ForumInfo from './ForumInfo';
import ForumUrl from './ForumUrl';
import ForumPrefix from './ForumPrefix';
import Announce from './Announce';
import WritePost from './WritePost';
import WriteComment from './WriteComment';
import Share from './Share';
import Promotion from './Promotion';
import Managers from './Managers';
import BanList from './BanList';
import Spams from './Spams';
import SpamReports from './SpamReports';
import StatForum from './StatForum';
import StatViews from './StatViews';
import StatVisitors from './StatVisitors';
import StatLikeRank from './StatLikeRank';
import StatCommentRank from './StatCommentRank';
import StatViewRank from './StatViewRank';

const checkManager = function checkManager(forum, userId) {
  if (forum && userId) {
    const managers = forum.get('managers');
    if (managers) {
      return managers.find(id => id === userId);
    } else {
      return false
    }
  }

  return false;
};

const ForumSettingsComponent = (props) => {
  const { ForumSettingStore, Forums, AuthStore, location } = props;
  const content = ForumSettingStore.get('content');
  const forumId = location.query.forumId;
  const isManager = checkManager(Forums.get(forumId.toString()), AuthStore.get('userId'));

  if (isManager) {
    switch (content) {
      case 'foruminfo':
        return <ForumInfo {...props} />;
      case 'forumurl':
        return <ForumUrl {...props} />;
      case 'forumprefix':
        return <ForumPrefix {...props} />;
      case 'announce':
        return <Announce {...props} />;
      case 'writepost':
        return <WritePost {...props} />;
      case 'writecomment':
        return <WriteComment {...props} />;
      case 'share':
        return <Share {...props} />;
      case 'promotion':
        return <Promotion {...props} />;
      case 'managers':
        return <Managers {...props} />;
      case 'banlist':
        return <BanList {...props} />;
      case 'spams':
        return <Spams {...props} />;
      case 'spamreports':
        return <SpamReports {...props} />;
      case 'stat_forum':
        return <StatForum {...props} />;
      case 'stat_views':
        return <StatViews {...props} />;
      case 'stat_visitors':
        return <StatVisitors {...props} />;
      case 'stat_likerank':
        return <StatLikeRank {...props} />;
      case 'stat_commentrank':
        return <StatCommentRank {...props} />;
      case 'stat_viewrank':
        return <StatViewRank {...props} />;
      default:
        return (
          <div className="ui segments">
            <div className="ui segment">

            </div>
          </div>
        )
    }
  } else {
    return (
      <div>
        권한이 없습니다
      </div>
    )
  }
};

ForumSettingsComponent.propTypes = {
  ForumSettingStore: PropTypes.object.isRequired,
  Forums: PropTypes.object.isRequired,
  AuthStore: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  FireHandleResetButton: PropTypes.func.isRequired,
  FireHandleChangeFormForumMeta: PropTypes.func.isRequired,
  FireRequestUpdateForumMeta: PropTypes.func.isRequired,
  FireRequestAddForumPrefix: PropTypes.func.isRequired,
  FireRequestDeleteForumPrefix: PropTypes.func.isRequired,
  FireRequestUpdateForumPrefix: PropTypes.func.isRequired,
  FireRequestAddForumManager: PropTypes.func.isRequired,
  FireRequestDeleteForumManager: PropTypes.func.isRequired,
  FireRequestDeleteForumAnnounce: PropTypes.func.isRequired,
  FireRequestAddForumBanUser: PropTypes.func.isRequired,
  FireRequestDeleteForumBanUser: PropTypes.func.isRequired,
};

export default ForumSettingsComponent;