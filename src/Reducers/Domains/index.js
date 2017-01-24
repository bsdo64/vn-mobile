import { List, Map, fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  SUCCESS_USER_AVATAR_IMAGE_UPLOAD,
  SUCCESS_USER_AVATAR_IMAGE_REMOVE,
  SUCCESS_USER_UPDATE_PROFILE,
  SUCCESS_USER_READ_NOTIFICATION,
  RECEIVE_SOCKET_NOTI,
  RECEIVE_SOCKET_POINT,
  RECEIVE_SOCKET_TERMINATE_VENALINK,
  SUCCESS_USER_PAYBACK_RP,
} from '../../Actions/User';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';
import {
  SUCCESS_GET_MORE_POST_LIST,
  SUCCESS_GET_INIT_POST_LIST,
  SUCCESS_LIKE_POST,
  FAILURE_LIKE_POST,
} from '../../Actions/Post';
import {
  SUCCESS_LIKE_COMMENT,
  SUCCESS_LIKE_SUB_COMMENT,
  FAILURE_LIKE_COMMENT,
  FAILURE_LIKE_SUB_COMMENT,
  SUCCESS_SUBMIT_COMMENT,
  SUCCESS_SUBMIT_SUB_COMMENT,
  SUCCESS_UPDATE_COMMENT,
  SUCCESS_UPDATE_SUB_COMMENT,
} from '../../Actions/Comment';
import {
  SUCCESS_GET_MORE_FORUM_LIST,
  SUCCESS_FOLLOW_FORUM,
  SUCCESS_UN_FOLLOW_FORUM,
} from '../../Actions/Forum';
import {
  SUCCESS_CREATE_COLLECTION,
  SUCCESS_ADD_FORUM_IN_COLLECTION,
  SUCCESS_REMOVE_FORUM_IN_COLLECTION,
  SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS,
} from '../../Actions/Collection';
import {
  SUCCESS_DELETE_ITEM
} from '../../Actions/DeleteItem';
import {
  SUCCESS_ADD_FORUM_MANAGER,
  SUCCESS_ADD_FORUM_BAN_USER,
  SUCCESS_DELETE_FORUM_MANAGER,
  SUCCESS_DELETE_FORUM_BAN_USER
} from '../../Actions/ForumSetting';
import {
  SUCCESS_PURCHASE_ITEM,
  SUCCESS_ACTIVATE_VENALINK,
  SUCCESS_PARTICIPATE_VENALINK,
} from '../../Actions/VenacleStore';

const initList = Map({});

const Users = (state = initList, action) => {
  const findUserById = (userId) => {
    if (userId) {
      return state.get(userId.toString())
    } else {
      return null;
    }
  };

  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.mergeDeep(action.data.entities.author)
    }

    case SUCCESS_GET_INIT_POST_LIST:
    case SUCCESS_GET_MORE_POST_LIST:
    case SUCCESS_GET_MORE_FORUM_LIST: {
      return state.mergeDeep(action.data.entities.author);
    }

    case SUCCESS_FOLLOW_FORUM: {
      const userId = action.result.userId;
      const loginUser = findUserById(userId);
      if (loginUser) {
        const updateUser = loginUser
          .update('follow_forums', list => list.push(action.result.forum_id));

        return state.update(userId.toString(), () => updateUser);
      }

      return state;
    }

    case SUCCESS_UN_FOLLOW_FORUM: {
      const userId = action.result.userId;
      const loginUser = findUserById(userId);
      if (loginUser) {
        const updateUser = loginUser
          .update('follow_forums', list => list.filterNot(v => v === action.result.forum_id));

        return state.update(userId.toString(), () => updateUser);
      }

      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.author);
    }

    case SUCCESS_SUBMIT_SUB_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.author);
    }

    case SUCCESS_USER_AVATAR_IMAGE_UPLOAD: {
      const { file, user } = action;
      const fileObj = file.files[0];

      return state.mergeDeep({ [user.user.id]: { profile: { avatar_img: fileObj.name } } });
    }

    case SUCCESS_USER_AVATAR_IMAGE_REMOVE: {
      const { result } = action;
      return state.mergeDeep({ [result.id]: { profile: { avatar_img: null } } });
    }

    case SUCCESS_ADD_FORUM_MANAGER: {
      const { result } = action;
      return state.mergeDeep({ [result.manager.user_id]: result.user });
    }

    case SUCCESS_ADD_FORUM_BAN_USER: {
      const { result } = action;
      return state.mergeDeep({ [result.bannedUser.user_id]: result.user });
    }

    case SUCCESS_USER_UPDATE_PROFILE: {
      const newProfile = action.result[0];
      const userId = newProfile.user_id;
      return state.mergeDeep({ [userId]: { profile: newProfile } });
    }

    case SUCCESS_USER_READ_NOTIFICATION: {
      const { result } = action;
      const { userId, id } = result;
      return state
        .updateIn([userId.toString(), 'notifications', 'INoti', 'entities', 'notis', id.toString()], v => {
          return v
            .set('read', true)
            .set('read_at', new Date)
        });
    }

    case SUCCESS_PURCHASE_ITEM: {
      const { result } = action;
      const { trendbox } = result;
      const userId = trendbox.user_id;

      return state
        .updateIn([userId.toString(), 'trendbox'], t => t.merge(trendbox));
    }

    case SUCCESS_ACTIVATE_VENALINK: {
      const { result } = action;
      const { trendbox } = result;
      const userId = trendbox.user_id;

      return state.updateIn([userId.toString(), 'trendbox'], t => t.merge(trendbox));
    }

    case RECEIVE_SOCKET_NOTI: {
      const { notis, userId } = action;

      return state
        .mergeDeepIn([userId.toString(), 'notifications'], { INoti: notis });
    }

    case RECEIVE_SOCKET_POINT: {
      const { data, userId } = action;

      return state
        .updateIn([userId.toString(), 'trendbox', 'T'], point => data.TP ? point + data.TP : point)
        .updateIn([userId.toString(), 'trendbox', 'R'], point => data.RP ? point + data.RP : point);
    }

    case SUCCESS_USER_PAYBACK_RP: {
      const { result } = action;
      const { trendbox, list, userId } = result;

      return state
        .mergeDeepIn([userId.toString(), 'participatedVenalinks'], fromJS(list))
        .mergeIn([userId.toString(), 'trendbox'], trendbox)
    }

    case RECEIVE_SOCKET_TERMINATE_VENALINK: {
      const { refundedVenalink } = action;

      return state
        .updateIn([refundedVenalink.user_id.toString(), 'trendbox', 'R'], point =>
          refundedVenalink.total_refunded_r ? point + refundedVenalink.total_refunded_r : point
        );
    }

    default: return state;
  }
};

const Posts = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.mergeDeep(action.data.entities.posts)
    }

    case SUCCESS_GET_INIT_POST_LIST:
    case SUCCESS_GET_MORE_POST_LIST: {
      return state.mergeDeep(action.data.entities.posts);
    }

    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      if (item && item.id && !item.comment_id && !item.post_id) {
        return state.updateIn([item.id.toString(), 'deleted'], () => true);
      }

      return state;
    }

    case SUCCESS_LIKE_POST: {
      const postId = action.postId;
      return state.update(postId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });
    }

    case FAILURE_LIKE_POST: {
      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.posts);
    }

    case SUCCESS_ACTIVATE_VENALINK: {
      const { result } = action;
      return state.updateIn([result.venalink.post_id.toString(), 'venalinks'], (v = List([])) => v.push(Map(result.venalink)));
    }

    case SUCCESS_PARTICIPATE_VENALINK: {
      const { result, postId } = action;
      return state
        .mergeDeep({ [postId.toString()]: { venalinks: [result.participateVenalink.venalink] } });
    }

    case RECEIVE_SOCKET_TERMINATE_VENALINK: {
      const { refundedVenalink } = action;
      return state
        .updateIn([refundedVenalink.post_id.toString(), 'venalinks'], list => {
          if (list) {
            const entry = list.findEntry(i => i.get('id') === refundedVenalink.id);
            return list.set(entry[0], Map(refundedVenalink))
          }
        })
    }

    default: return state;
  }
};

const Comments = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      if (item && item.id && !item.comment_id && item.post_id) {
        return state.updateIn([item.id.toString(), 'deleted'], () => true);
      }

      return state;
    }

    case SUCCESS_LIKE_COMMENT: {
      const itemId = action.commentId;
      return state.update(itemId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });
    }

    case FAILURE_LIKE_COMMENT: {
      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.comments);
    }

    case SUCCESS_SUBMIT_SUB_COMMENT: {
      const { normalized, commentId } = action;
      const subCommentId = normalized.result;

      return state
        .updateIn([commentId.toString(), 'subComments'], list =>
          list.push(subCommentId)
        )
        .updateIn([commentId.toString(), 'sub_comment_count'], value =>
          value + 1
        );
    }

    case SUCCESS_UPDATE_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.comments);
    }

    default: return state;
  }
};

const Collections = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_CREATE_COLLECTION: {
      return state.merge({ [action.collection.id]: action.collection })
    }

    case SUCCESS_ADD_FORUM_IN_COLLECTION: {
      const { collectionId, normalizedForum } = action;
      const forumId = normalizedForum.result;
      return state.updateIn([collectionId.toString(), 'forums'], forumIds => {
        return forumIds.push(forumId);
      });
    }

    case SUCCESS_REMOVE_FORUM_IN_COLLECTION: {
      const { collectionId, forumId, removeSuccess } = action;
      if (removeSuccess) {
        return state.updateIn([collectionId.toString(), 'forums'], forumIds => forumIds.filter(id => id !== forumId))
      } else {
        return state;
      }
    }

    default: return state;
  }
};

const Forums = (state = initList, action) => {
  switch (action.type) {

    case SUCCESS_ADD_FORUM_IN_COLLECTION: {
      const { normalizedForum } = action;
      const forumId = normalizedForum.result;

      return state.update(forumId.toString(), forum => {
        return forum.update('subs_count', v => v + 1);
      });
    }

    case SUCCESS_REMOVE_FORUM_IN_COLLECTION: {
      const { forumId } = action;
      return state.update(forumId.toString(), forum => forum.update('subs_count', v => v - 1));
    }

    case SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS: {
      return state.mergeDeep(action.normalizedForums.entities.forums);
    }

    case SUCCESS_GET_MORE_FORUM_LIST: {
      return state.mergeDeep(action.data.entities.forums);
    }

    case SUCCESS_FOLLOW_FORUM: {
      const forumId = action.result.forum_id;
      return state.update(forumId.toString(), forum => {
        return forum.update('follow_count', v => v + 1);
      });
    }

    case SUCCESS_UN_FOLLOW_FORUM: {
      const forumId = action.result.forum_id;
      return state.update(forumId.toString(), forum => {
        return forum.update('follow_count', v => v - 1);
      });
    }

    case SUCCESS_ADD_FORUM_MANAGER: {
      const { result } = action;
      return state.updateIn([result.manager.forum_id, 'managers'], managerList => {
        return managerList.push(result.manager.user_id);
      });
    }

    case SUCCESS_ADD_FORUM_BAN_USER: {
      const { result } = action;
      return state.updateIn([result.bannedUser.forum_id, 'bans'], list => {
        return list.push(result.bannedUser.user_id);
      });
    }

    case SUCCESS_DELETE_FORUM_MANAGER: {
      const { result } = action;
      const { forumId, userId } = result;

      return state.updateIn([forumId.toString(), 'managers'], list => {
        return list.filterNot(i => i === userId)
      });
    }

    case SUCCESS_DELETE_FORUM_BAN_USER: {
      const { result } = action;
      const { forumId, userId } = result;

      return state.updateIn([forumId.toString(), 'bans'], list => {
        return list.filterNot(i => i === userId)
      });
    }

    default: return state;
  }
};

const Categories = (state = initList, action) => {
  switch (action.type) {
    default: return state;
  }
};

const Prefixes = (state = initList, action) => {
  switch (action.type) {
    default: return state;
  }
};

const SubComments = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      if (item && item.id && item.comment_id && !item.post_id) {
        return state.updateIn([item.id.toString(), 'deleted'], () => true);
      }

      return state;
    }

    case SUCCESS_LIKE_SUB_COMMENT: {
      const itemId = action.subCommentId;
      return state.update(itemId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });
    }

    case FAILURE_LIKE_SUB_COMMENT: {
      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.merge(normalized.entities.subComments);
    }

    case SUCCESS_SUBMIT_SUB_COMMENT: {
      const normalized = action.normalized;
      return state.merge(normalized.entities.subComments);
    }

    case SUCCESS_UPDATE_SUB_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.subComments);
    }

    default: return state;
  }
};

const Notis = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      // Post
      if (item && item.id && !item.comment_id && !item.post_id) {
        return state.filter(noti => noti.get('post_id') !== item.id);
      }

      return state;
    }

    default: return state;
  }
};

const Inventories = (state = initList, action) => {
  switch (action.type) {

    case SUCCESS_PURCHASE_ITEM:
    case SUCCESS_ACTIVATE_VENALINK:
    case SUCCESS_PARTICIPATE_VENALINK: {
      const { result } = action;
      const { inventories } = result;
      const i = inventories.entities.inventories;

      return state.mergeDeep(i);
    }

    default: return state;
  }
};

const Items = (state = initList, action) => {
  switch (action.type) {

    case SUCCESS_PURCHASE_ITEM:
    case SUCCESS_ACTIVATE_VENALINK:
    case SUCCESS_PARTICIPATE_VENALINK: {
      const { result } = action;
      const { inventories } = result;

      return state.mergeDeep(inventories.entities.items);
    }

    default: return state;
  }
};

const Venatems = (state = initList, action) => {
  switch (action.type) {

    case SUCCESS_PURCHASE_ITEM:
    case SUCCESS_ACTIVATE_VENALINK:
    case SUCCESS_PARTICIPATE_VENALINK: {
      const { result } = action;
      const { inventories } = result;

      return state.mergeDeep(inventories.entities.venatems);
    }

    default: return state;
  }
};

// Domain reducer
export default combineReducers({
  Users,
  Inventories,
  Items,
  Venatems,
  Posts,
  Comments,
  Collections,
  Forums,
  Categories,
  Prefixes,
  SubComments,
  Notis,
});
