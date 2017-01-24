import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import AvatarImage from '../AvatarImage';
import Menu from './ReportMenu';
import ShareLinkMenu from './ShareLinkMenu';

require('./Post.scss');

const BigPost = React.createClass({
  displayName: 'BigPost',
  propTypes: {
    post: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    user: PropTypes.object,
    view: PropTypes.bool.isRequired,
    Venatems: PropTypes.object.isRequired,
    Items: PropTypes.object.isRequired,
    postStyle: PropTypes.string,
    location: PropTypes.object.isRequired,
    shorten: PropTypes.bool.isRequired,
    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestLikePost: PropTypes.func.isRequired,
    FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
    FireRequestActivateVenalink: PropTypes.func.isRequired,
    FireRequestParticipateVenalink: PropTypes.func.isRequired,
    FireOpenCommentUpdateView: PropTypes.func,
  },

  mixins: [PureRenderMixin],

  componentDidMount() {
    this.postItem.addEventListener('click', this.setScroll);
  },

  componentWillUnmount() {
    this.postItem.removeEventListener('click', this.setScroll)
  },

  setScroll() {

    const currentScroll = document.body.scrollTop;
    this.props.FireSetScrollPosition(currentScroll)
  },

  sendLike() {

    const { post, location, user, FireRequestLikePost } = this.props;
    if (!user) {
      this.props.FireToggleLoginModal({
        contentType: 'Login',
        location: location.pathname + location.search
      });
    } else {
      FireRequestLikePost({ postId: post.get('id') });
    }
  },

  createIconImg(iconImg) {
    if (iconImg) {
      return <img id="user_icon_img" src={'/images/' + iconImg}/>;
    }
  },

  render() {
    const {
      post, author, user, view, postStyle, shorten,
      FireToggleReportModal, FireToggleDeleteModal, FireOpenCommentUpdateView
    } = this.props;

    const userId = user && user.get('id');
    const sex = author.getIn(['profile', 'sex']),
      avatar_img = author.getIn(['profile', 'avatar_img']),
      icon_img = author.getIn(['icon', 0, 'iconDef', 'icon_img']);

    const forumId = post.get('forum_id');
    const postId = post.get('id');
    const forumUrl = `/community?forumId=${forumId}`;
    const postUrl = `/community?forumId=${forumId}&postId=${postId}`;
    const liked = post.get('liked');

    const cPost = cx('ui item best_list_item', {
      post_item: (postStyle === 'post_item')
    });

    const isLong = (post.get('height') > 0) && (post.get('height') > 1000);
    const contentStyle = cx('ui description best_post_content', {
      shorten_post: isLong
    });

    return (
      <div ref={(ref) => this.postItem = ref}
           key={post.get('id')}
           className={cPost}
      >

        {/* meta */}
        <div className="ui content">
          {/* forum */}
          <div className="meta best_post_meta">
            <div className="ui horizontal divided list">
              <div className="item">
                <Link to={forumUrl}>{post.getIn(['forum', 'title'])}</Link>
              </div>
            </div>
          </div>

          <div className="post-flex-box">
            {/* avatar */}
            <div className="post-avatar-image">
              <AvatarImage
                sex={sex}
                avatarImg={avatar_img}
              />
            </div>

            <div>

              {/* title */}
              <h3 className="best_post_title"><Link to={postUrl}>{post.get('title')}</Link></h3>

              {/* nick, date, view */}
              <div className="meta best_post_meta">
                <div className="ui horizontal divided list">
                  <div className="item">
                    <div className="author_nick">
                      <a data-tip
                         data-for={'nick_' + author.get('nick') + '_' + post.get('id')}
                         data-offset="{'bottom': 8, 'right': 42}"
                      >
                        {author.get('nick')}
                      </a>
                      <ReactTooltip
                        id={'nick_' + author.get('nick') + '_' + post.get('id')}
                        place="right"
                        class="abc"
                        effect="solid"
                      >
                        <div id="trend_box" className="widget">
                          <div id="widget_user_info">
                            <div className="ui items">
                              <div className="ui item">

                                <a id="user_avatar_img" className="ui mini image">
                                  <AvatarImage
                                    sex={sex}
                                    avatarImg={avatar_img}
                                  />
                                </a>

                                <div className="content">
                                  <div className="user_info_header">
                                    <span className="ui description">{author.get('nick')}</span>
                                    {this.createIconImg(icon_img)}
                                  </div>
                                  <div className="description">

                                    <div className="item">
                                      <span className="item_col">레벨</span>
                                      <div className="item_num">
                                        <span>{author.getIn(['trendbox', 'level'])}</span>
                                      </div>
                                    </div>

                                    <div className="item">
                                      <span className="item_col">명성</span>
                                      <div className="item_num">
                                        <span>{author.getIn(['trendbox', 'reputation'])}</span>
                                      </div>
                                    </div>

                                    <div className="item">
                                      <span className="item_col">랭크</span>
                                      <div className="item_num">
                                        <span></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ReactTooltip>
                    </div>
                    <div className="author_icon">
                      {this.createIconImg(icon_img)}
                    </div>
                  </div>
                  <div className="item">
                    {post.get('created_at')}
                  </div>
                  {
                    view === true &&
                    <div className="item">
                      조회 {post.get('view_count')}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* post Ad*/}
          {/*
           (postStyle === 'post_item') &&
           <AdPost1 url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXpJWqQSSZ2s4-aw-miw-Q9spL7qCJ7rjOLav-VQpNpbdK5po" />
           */}

          {/* content */}
          <div className={contentStyle} dangerouslySetInnerHTML={{ __html: post.get('content') }}></div>

          {/* isLong */}
          {
            isLong && shorten &&
            <div className="more_long_post">
              <div className="more_long_post_button">
                <Link to={postUrl} target="_blank">
                  <i className="fa fa-external-link"/>
                </Link>
                <Link to={postUrl}>
                  {' 더 보기'}
                </Link>
              </div>
            </div>
          }

          {/* <TagList items={Tags} /> */}

          {/* buttons */}
          <div className="ui extra best_post_buttons">
            <div className="like_box">
              <div className={'like_icon ' + (liked ? 'active' : '')} onClick={this.sendLike}>
                <i className={'heart ' + (liked ? '' : 'outline') + ' icon'}/>
              </div>
              <a className="like_count">{post.get('like_count')}</a>
            </div>
            <div className="comment_box">
              <div className="comment_icon">
                <Link to={postUrl + '#comment_box'}>
                  <i className="edit outline icon"></i>
                </Link>
              </div>
              <a className="comment_count">{post.get('comment_count')}</a>
            </div>
            <div className="share_link_box">
              <ShareLinkMenu
                userId={userId}
                post={post}
                author={author}
                user={user}
                {...this.props}
              />
            </div>
            {
              userId &&
              <div className="report_box">
                <Menu
                  post={post}
                  targetType="post"
                  forumId={post.get('forum_id')}
                  targetId={post.get('id')}
                  isUser={userId && (userId === author.get('id'))}
                  FireToggleReportModal={FireToggleReportModal}
                  FireToggleDeleteModal={FireToggleDeleteModal}
                  FireOpenCommentUpdateView={FireOpenCommentUpdateView}
                />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
});

export default BigPost;