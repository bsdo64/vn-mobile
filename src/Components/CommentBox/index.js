import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import MakeUrl from '../Lib/MakeUrl';
import Paginator from '../Paginator';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import debug from 'debug';

import Menu from '../PostItem/ReportMenu';
import AvatarImage from '../AvatarImage';

const logger = debug('vn:Components:PostPage:Comment');
const errorLog = function (text) {
  if (process.env.NODE_ENV !== 'production') {
    return logger(text);
  } else {
    return null;
  }
};

const commentMediumConfig = {
  toolbar: false,
  disableDoubleReturn: true,
  placeholder: {
    /* This example includes the default options for placeholder,
     if nothing is passed this is what it used */
    text: '여기에 댓글을 입력하세요',
    hideOnClick: true
  },
  imageDragging: false,
  targetBlank: true,
  autoLink: true
};

function removeWhiteSpace(text) {
  return text
    .replace(/\n\s*\n/g, '\n') // removedLine
    .replace(/\s{2,}/g, ' ') // removedWhite
    .replace(/ ?&nbsp; ?|\t+/g, ''); // removedNbsp
}

function checkSkillAvailable(skill) {

  const property = skill.getIn(['skill', 'property']);
  const cooltime = property.get('cooltime');
  const usingAt = skill.get('using_at');

  if (usingAt === null) {
    return true;
  }

  if (cooltime && usingAt) {
    const gapSec = (new Date() - new Date(usingAt));
    if (gapSec > cooltime * 1000) {
      return true;
    }
  }

  return false;
}

function closeUpdateComment() {
  this.props.FireCloseCommentUpdateView();
}

function sendSubCommentLike(props) {
  const { location, isLogin, subCommentId, FireRequestLikeSubComment } = props;
  return function createSendSubCommentLike() {
    if (!isLogin) {
      props.FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    } else {
      FireRequestLikeSubComment({ subCommentId });
    }
  }
}

function subCommentItem(props) {
  return function createSubCommentItem(subCommentId) {
    return <SubCommentItem key={subCommentId} {...props} subCommentId={subCommentId}/>
  }
}

const SubCommentItem = React.createClass({
  displayName: 'SubCommentItem',
  propTypes: {
    LoginStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    updating: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    subCommentId: PropTypes.number.isRequired,
    userId: PropTypes.number,
    location: PropTypes.object.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestLikeSubComment: PropTypes.func.isRequired,
    FireRequestUpdateSubComment: PropTypes.func.isRequired,
    FireOpenCommentUpdateView: PropTypes.func.isRequired,
    FireCloseCommentUpdateView: PropTypes.func.isRequired,
  },

  componentDidUpdate(prevProps) {
    const oldUpdating = prevProps.updating;
    const { updating } = this.props;
    if ((oldUpdating.id !== updating.id)) {
      if ((oldUpdating.type !== updating.type) && (updating.type === 'subComment')) {
        if (oldUpdating.updating !== updating) {
          if (this.editor) {
            this.editor.destroy();
          }
          this.editor = new MediumEditor(this.refs.sub_comment_content_update, commentMediumConfig);  // eslint-disable-line no-undef
        }
      }
    }
  },

  updateSubComment(commentId) {

    const { LoginStore, UserStore, location, FireToggleLoginModal, FireRequestUpdateSubComment } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const skills = UserStore.get('skills');
      const writePost = skills
        .filter(skill => skill.getIn(['skill', 'name']) === 'write_sub_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['sub_comment_content_update'].value;
        if ($(el).text().trim()) {
          const comment = {
            id: commentId,
            content: removeWhiteSpace(el)
          };

          FireRequestUpdateSubComment(comment);
        } else {
          errorLog('Input sub comment');
        }
      } else {
        errorLog('not available');
      }
    } else {
      FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  render() {
    const { subComments, authors, subCommentId, userId, updating } = this.props;
    const subComment = subComments.get(subCommentId.toString());

    if (subComment) {
      const subCommentAuthor = authors.get(subComment.get('author').toString());

      if (subCommentAuthor) {
        const commentDeleted = subComment.get('deleted');
        const subCommentSex = subCommentAuthor.getIn(['profile', 'sex']),
          sub_avatar_img = subCommentAuthor.getIn(['profile', 'avatar_img']),
          sub_icon_img = subCommentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
        let subIconImg;

        if (sub_icon_img) {
          subIconImg = <img className="user_icon_img" src={'/images/' + sub_icon_img}/>;
        }

        let contents;
        if (updating.type === 'subComment' && updating.updating && updating.id === subComment.get('id')) {
          contents = (
            <form className="ui reply form sub_comment_form">
              <div className="field update">
                <div
                  id={"sub_comment_content_update"}
                  ref={"sub_comment_content_update"}
                  className="comment_input sub_comment_input"
                  dangerouslySetInnerHTML={{ __html: subComment.get('content') }}
                ></div>
              </div>
              <div className="ui primary submit icon button" onClick={this.updateSubComment.bind(this, subCommentId)}>
                <i className="icon edit"/>
              </div>
              <div
                className="ui submit icon button close_update"
                onClick={closeUpdateComment.bind(this)}
              >
                <i className="icon remove circle outline"/>
              </div>
            </form>
          )
        } else if (commentDeleted) {
          contents = (
            <div>
              [삭제된 글입니다]
            </div>
          )

        } else {
          contents = (
            <div
              className="comment_text"
              dangerouslySetInnerHTML={{ __html: subComment.get('content') }}
            ></div>
          )
        }

        return (
          <div className="comment"
               key={subComment.get('id')}>
            <a className="avatar">
              <AvatarImage
                sex={subCommentSex}
                avatarImg={sub_avatar_img}
              />
            </a>
            <div className="content">
              <a className="author">{subCommentAuthor.get('nick')}</a>
              {subIconImg}
              <div className="metadata">
                <span className="date">{subComment.get('created_at')}</span>
              </div>
              <div className="text">
                {contents}
              </div>
              <div className="actions">
                {
                  commentDeleted &&
                  <div className="like_box">
                    <div className={'like_icon'}>
                      <i className={'disabled heart outline icon'}/>
                    </div>
                    <a className="like_count">{subComment.get('like_count')}</a>
                  </div>
                }
                {
                  !commentDeleted &&
                  <div className="like_box">
                    <div className={'like_icon ' + (subComment.get('liked') ? 'active' : '')}
                         onClick={sendSubCommentLike(this.props)}>
                      <i className={'heart ' + (subComment.get('liked') ? '' : 'outline') + ' icon'}/>
                    </div>
                    <a className="like_count">{subComment.get('like_count')}</a>
                  </div>
                }
                <div className="report_box">
                  {
                    !commentDeleted &&
                    <Menu
                      isUser={userId === subCommentAuthor.get('id')}
                      targetType="subComment"
                      targetId={subComment.get('id')}
                      FireToggleReportModal={this.props.FireToggleReportModal}
                      FireToggleDeleteModal={this.props.FireToggleDeleteModal}
                      FireOpenCommentUpdateView={this.props.FireOpenCommentUpdateView}
                    />
                  }
                </div>
              </div>

            </div>
          </div>
        )
      }
    }

    return (<div key={userId}></div>)

  }
});


const CommentItem = React.createClass({
  displayName: 'CommentItem',
  propTypes: {
    LoginStore: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    updating: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    commentAuthor: PropTypes.object.isRequired,
    subCommentList: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestLikeComment: PropTypes.func.isRequired,
    FireRequestLikeSubComment: PropTypes.func.isRequired,
    FireRequestSubmitSubComment: PropTypes.func.isRequired,
    FireRequestUpdateComment: PropTypes.func.isRequired,
    FireRequestUpdateSubComment: PropTypes.func.isRequired,
    FireOpenCommentUpdateView: PropTypes.func.isRequired,
    FireCloseCommentUpdateView: PropTypes.func.isRequired,
  },

  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      subCommentOpen: false,
      liked: false,
      focus: false
    };
  },

  componentDidUpdate(prevProps) {
    const oldUpdating = prevProps.updating;
    const { updating } = this.props;
    if ((oldUpdating.id !== updating.id)) {
      if ((oldUpdating.type !== updating.type) && (updating.type === 'comment')) {
        if (oldUpdating.updating !== updating) {
          if (this.editor) {
            this.editor.destroy();
          }
          this.editor = new MediumEditor(this.refs.comment_content_update, commentMediumConfig); // eslint-disable-line no-undef
        }
      }
    }
  },

  show() {

    this.setState({ focus: true })
  },

  close() {

    this.setState({ focus: false })
  },

  sendLike() {

    const { comment, location, LoginStore, FireToggleLoginModal, FireRequestLikeComment } = this.props;
    const isLogin = LoginStore.get('isLogin');
    if (!isLogin) {
      FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    } else {
      FireRequestLikeComment({ commentId: comment.get('id') });
    }
  },

  toggleSubComment() {
    this.setState({ subCommentOpen: !this.state.subCommentOpen }, () => {

      const commentId = this.props.comment.get('id');
      this.editor = new MediumEditor(this.refs['sub_comment_content_' + commentId], commentMediumConfig); // eslint-disable-line no-undef
    });
  },

  submitSubComment(commentId) {

    const { LoginStore, UserStore, location, FireToggleLoginModal, FireRequestSubmitSubComment } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {
      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill) => skill.getIn(['skill', 'name']) === 'write_sub_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['sub_comment_input_' + commentId].value;
        if ($(el).text().trim()) {
          const comment = {
            content: removeWhiteSpace(el),
            commentId: commentId
          };

          FireRequestSubmitSubComment(comment);
          this.editor.setContent('');
        } else {
          errorLog('Input sub comment');
        }
      } else {
        errorLog('not available');
      }
    } else {
      FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  updateComment() {
    const {
      LoginStore, UserStore, updating, location,
      FireToggleLoginModal, FireRequestUpdateComment
    } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin && updating.updating) {

      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill) => skill.getIn(['skill', 'name']) === 'write_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['comment_input_update'].value;

        if ($(el).text().trim()) {
          const comment = {
            id: updating.id,
            content: removeWhiteSpace(el),
            postId: location.query.postId
          };

          FireRequestUpdateComment(comment);
          this.editor.destroy();
        } else {
          errorLog('Input comment');
        }
      } else {
        errorLog('not available');
      }
    } else {
      FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  render() {

    const { LoginStore, UserStore, updating } = this.props;
    const isLogin = LoginStore.get('isLogin');

    let userId;
    if (isLogin) {
      userId = UserStore.getIn(['user', 'id'])
    }

    const {
      comment, commentAuthor, subCommentList
    } = this.props;
    const subCommentOpen = this.state.subCommentOpen;
    const commentDeleted = comment.get('deleted');

    const sex = commentAuthor.getIn(['profile', 'sex']),
      avatar_img = commentAuthor.getIn(['profile', 'avatar_img']),
      icon_img = commentAuthor.getIn(['icon', 0, 'iconDef', 'icon_img']);
    let iconImg;

    if (icon_img) {
      iconImg = <img className="user_icon_img" src={'/images/' + icon_img}/>;
    }

    const props = this.props;
    const subCommentProps = {
      isLogin: isLogin,
      userId: userId,
      commentId: comment.get('id'),
      editor: this.editor,
      ...props
    };

    let contents;
    if (updating.type === 'comment' && updating.updating && updating.id === comment.get('id')) {
      contents = (
        <form className="ui reply form ">
          <div className="field">
            <div
              id="comment_input_update"
              ref="comment_content_update"
              className="comment_input"
              dangerouslySetInnerHTML={{ __html: comment.get('content') }}
            >
            </div>
          </div>
          <div
            className="ui primary submit icon button"
            onClick={this.updateComment}
          >
            <i className="icon edit"/>
          </div>
          <div
            className="ui submit icon button close_update"
            onClick={closeUpdateComment.bind(this)}
          >
            <i className="icon remove circle outline"/>
          </div>
        </form>
      )
    } else if (commentDeleted) {
      contents = (
        <div>
          [삭제된 글입니다]
        </div>
      )
    } else {
      contents = (
        <div
          className="comment_text"
          dangerouslySetInnerHTML={{ __html: comment.get('content') }}
        ></div>
      )
    }

    return (
      <div className="comment"
           key={comment.get('id')}
           onMouseEnter={this.show}
           onMouseLeave={this.close}>
        <a className="avatar">
          <AvatarImage
            sex={sex}
            avatarImg={avatar_img}
          />
        </a>
        <div className="content">
          <a className="author">{commentAuthor.get('nick')}</a>
          {iconImg}
          <div className="metadata">
            <div className="date">{comment.get('created_at')}</div>
          </div>
          <div className="text">
            {contents}
          </div>
          <div className="actions">
            {
              !commentDeleted &&
              <div className="like_box" onClick={this.sendLike}>
                <div className={'like_icon ' + (comment.get('liked') ? 'active' : '')}>
                  <i className={'heart ' + (comment.get('liked') ? '' : 'outline') + ' icon'}/>
                </div>
                <a className="like_count">{comment.get('like_count')}</a>
              </div>
            }

            {
              commentDeleted &&
              <div className="like_box disabled">
                <div className={'like_icon'}>
                  <i className={'disabled heart outline icon'}/>
                </div>
                <a className="like_count">{comment.get('like_count')}</a>
              </div>
            }

            <div className="comment_box" onClick={this.toggleSubComment}>
              <div className="comment_icon">
                <i className="edit outline icon"/>
              </div>
              <a className="comment_count">{comment.get('sub_comment_count')}</a>
            </div>
            <div className="report_box">
              {
                !commentDeleted &&
                <Menu
                  isUser={userId === commentAuthor.get('id')}
                  targetType="comment"
                  targetId={comment.get('id')}
                  FireToggleReportModal={this.props.FireToggleReportModal}
                  FireToggleDeleteModal={this.props.FireToggleDeleteModal}
                  FireOpenCommentUpdateView={this.props.FireOpenCommentUpdateView}
                />
              }
            </div>
          </div>
          {
            subCommentOpen && (subCommentList.size > 0) &&
            <div className="comments">
              {subCommentList.map(subCommentItem(subCommentProps))}
            </div>
          }

          {
            subCommentOpen && !commentDeleted &&
            <form className="ui reply form sub_comment_form">
              <div className="field">
                <div
                  id={"sub_comment_input_" + comment.get('id')}
                  ref={"sub_comment_content_" + comment.get('id')}
                  className="comment_input sub_comment_input"
                ><p><br /></p></div>
              </div>
              <div className="ui primary submit icon button"
                   onClick={this.submitSubComment.bind(this, comment.get('id'))}>
                <i className="icon edit"/>
              </div>
            </form>
          }
        </div>
      </div>
    )

  }
});

const CommentList = React.createClass({
  displayName: 'CommentList',
  propTypes: {
    commentIdList: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    LoginStore: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updating: PropTypes.object.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestLikeComment: PropTypes.func.isRequired,
    FireRequestLikeSubComment: PropTypes.func.isRequired,
    FireRequestSubmitSubComment: PropTypes.func.isRequired,
    FireRequestUpdateComment: PropTypes.func.isRequired,
    FireRequestUpdateSubComment: PropTypes.func.isRequired,
    FireOpenCommentUpdateView: PropTypes.func.isRequired,
    FireCloseCommentUpdateView: PropTypes.func.isRequired,
  },

  render() {
    const {
      commentIdList, comments, authors
    } = this.props;

    let commentsNode = commentIdList.map((commentId) => {
      const comment = comments.get(commentId.toString());

      if (comment) {
        const commentAuthor = authors.get(comment.get('author').toString());

        if (commentAuthor) {
          const subCommentList = comment.get('subComments');

          return (
            <CommentItem
              key={commentId}
              comment={comment}
              commentAuthor={commentAuthor}
              subCommentList={subCommentList}
              {...this.props}
            />
          )
        }
      }

      return (<div key={commentId}></div>)
    });
    return (
      <div className="comment_list">
        {commentsNode}
      </div>
    )
  }
});

require('./Comment.scss');
const CommentBox = React.createClass({
  displayName: 'CommentBox',
  propTypes: {
    location: PropTypes.object.isRequired,
    LoginStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    subComments: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    CommunityStore: PropTypes.object.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestLikeComment: PropTypes.func.isRequired,
    FireRequestLikeSubComment: PropTypes.func.isRequired,
    FireRequestSubmitComment: PropTypes.func.isRequired,
    FireRequestSubmitSubComment: PropTypes.func.isRequired,
    FireRequestUpdateComment: PropTypes.func.isRequired,
    FireRequestUpdateSubComment: PropTypes.func.isRequired,
    FireOpenCommentUpdateView: PropTypes.func.isRequired,
    FireCloseCommentUpdateView: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      commentOrder: this.props.location.query.comment_order
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.comment_order !== this.props.location.query.comment_order) {
      this.setState({
        commentOrder: nextProps.location.query.comment_order
      })
    }
  },

  componentDidMount() {
    this.editor = new MediumEditor(this.refs.comment_content, commentMediumConfig); // eslint-disable-line no-undef
  },

  componentDidUpdate() {
    this.editor.destroy();

    this.editor = new MediumEditor(this.refs.comment_content, commentMediumConfig); // eslint-disable-line no-undef
  },

  submitComment() {

    const { LoginStore, UserStore, location, FireToggleLoginModal, FireRequestSubmitComment } = this.props;
    const isLogin = LoginStore.get('isLogin');

    if (isLogin) {

      const skills = UserStore.get('skills');
      const writePost = skills
        .filter((skill) => skill.getIn(['skill', 'name']) === 'write_comment')
        .get(0);

      const result = checkSkillAvailable(writePost);

      if (result) {
        const allContents = this.editor.serialize();
        const el = allContents['comment_input'].value;

        if ($(el).text().trim()) {
          const comment = {
            content: removeWhiteSpace(el),
            postId: location.query.postId
          };

          FireRequestSubmitComment(comment);
          this.editor.setContent('');
        } else {
          errorLog('Input comment');
        }
      } else {
        errorLog('not available');
      }
    } else {
      FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    }
  },

  handleSetPage(pagination) {
    const { commentOrder } = this.state;

    const makeUrl = new MakeUrl(this.props.location);
    browserHistory.push(
      makeUrl
        .setQuery('comment_p', pagination.page)
        .setQuery('comment_order', commentOrder)
        .end()
    );
  },

  changeCommentOrder() {
    const { commentOrder } = this.state;
    let newOrder;
    switch (commentOrder) {
      case 'new': {
        newOrder = 'hot';
        break;
      }

      case 'hot': {
        newOrder = 'new';
        break;
      }

      default: {
        newOrder = 'hot';
        break;
      }
    }

    const makeUrl = new MakeUrl(this.props.location);
    browserHistory.push(makeUrl.setQuery('comment_p', 1).setQuery('comment_order', newOrder).end());
  },

  commentOrderButtom() {
    const { commentOrder } = this.state;
    switch (commentOrder) {
      case 'new': {
        return <li onClick={this.changeCommentOrder}>최신순</li>
      }

      case 'hot': {
        return <li onClick={this.changeCommentOrder}>인기순</li>
      }

      default: return <li onClick={this.changeCommentOrder}>최신순</li>
    }
  },

  render() {
    const {
      location, post, CommunityStore
    } = this.props;
    const commentIdList = post.get('comments');
    const updating = {
      updating: CommunityStore.get('updating'),
      type: CommunityStore.get('updateType'),
      id: CommunityStore.get('updateId')
    };

    if (commentIdList) {

      const commentPage = location.query.comment_p ? location.query.comment_p : 1;
      const commentLength = post.get('comment_count');

      return (
        <div id="comment_box" className="ui comments">

          <div className="comment_header">
            <div className="comment_count">{commentLength}개 댓글</div>
            <ul className="comment_sort_box">
              { this.commentOrderButtom() }
            </ul>
          </div>
          <form className="ui reply form ">
            <div className="field">
              <div
                id="comment_input"
                ref="comment_content"
                className="comment_input"
              ><p><br /></p></div>
            </div>
            <div
              className="ui primary submit icon button"
              onClick={this.submitComment}
            >
              <i className="icon edit"/>
            </div>
          </form>

          <CommentList
            updating={updating}
            commentIdList={commentIdList}
            {...this.props}
          />

          <div className="ui center aligned container">
            { (commentLength > 0) &&
            <Paginator
              total={commentLength}
              limit={10}
              page={parseInt(commentPage, 10)}
              handleSetPage={this.handleSetPage}
            />
            }
          </div>

        </div>
      )
    }

    return (<div></div>)
  }
});

export default CommentBox;
