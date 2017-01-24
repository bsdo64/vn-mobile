import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Waypoint from 'react-waypoint';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import cx from 'classnames';
import SearchHeader from './header';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';

require('./index.scss');
const SearchBox = React.createClass({
  displayName: 'SearchBox',
  propTypes: {
    SearchStore: PropTypes.object.isRequired,
    PaginationStore: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    Collections: PropTypes.object.isRequired,
    ListStore: PropTypes.object.isRequired,
    Forums: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    Users: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,

    FireSetScrollPosition: PropTypes.func.isRequired,
    FireRequestGetMorePostList: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestAddForumInCollection: PropTypes.func.isRequired,
    FireRequestRemoveForumInCollection: PropTypes.func.isRequired,
    FireRequestGetMoreForumList: PropTypes.func.isRequired,
    FireRequestFollowForum: PropTypes.func.isRequired,
    FireRequestUnFollowForum: PropTypes.func.isRequired,
    FireRequestLikePost: PropTypes.func.isRequired,
    FireToggleActiveVenalinkModal: PropTypes.func.isRequired,

  },

  componentDidMount() {
    $('.ui.embed').embed();
  },

  componentDidUpdate() {
    $('.ui.embed').embed('refresh');
  },

  getMoreBest() {

    const { PaginationStore, SearchStore, location, FireRequestGetMorePostList } = this.props;
    const Pagination = PaginationStore.get('searchPostList');
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      if (nextPage) {
        FireRequestGetMorePostList({
          listName: 'searchPostList',
          pathName: '/search',
          params: {
            page: nextPage,
            order: location.query.order || 'new',
            query: SearchStore.get('query')
          }
        });
      }
    }
  },
  checkCollectionHasForums(collectionForumList, forumId) {

    return collectionForumList.includes(forumId);
  },
  selectCollection(forumId) {
    const {
      FireRequestAddForumInCollection,
      FireRequestRemoveForumInCollection
    } = this.props;

    return (e) => {
      const params = { collectionId: e.target.value, forumId: forumId };

      if (e.target.checked) {
        FireRequestAddForumInCollection(params)
      } else {
        FireRequestRemoveForumInCollection(params)
      }
    }
  },
  openLoginModal() {
    const {
      location,
      FireToggleLoginModal
    } = this.props;

    FireToggleLoginModal({
      contentType: 'Login',
      location: location.pathname + location.search
    });
  },
  toggleFollow(isForumFollow, forumId) {

    const { AuthStore, FireRequestFollowForum, FireRequestUnFollowForum  } = this.props;
    const userId = AuthStore.get('userId');
    if (!userId) {
      this.openLoginModal();
    } else {
      if (isForumFollow) {
        FireRequestUnFollowForum({ id: forumId, userId });
      } else {
        FireRequestFollowForum({ forumId: forumId, userId });
      }
    }
  },
  createCollectionCheckBox(Collections, forumId, collectionId) {
    const collection = Collections.get(collectionId.toString());
    return (
      <li key={collectionId} className="collection_item">
        <div className="ui checkbox">
          <input id={`collection-id-${collectionId}-forum-id-${forumId}`}
                 type="checkbox"
                 value={collection.get('id')}
                 defaultChecked={this.checkCollectionHasForums(collection.get('forums'), forumId)}
                 onChange={this.selectCollection(forumId)}/>
          <label htmlFor={`collection-id-${collectionId}-forum-id-${forumId}`}>{collection.get('title')}</label>
        </div>
      </li>
    )
  },

  prevForumList() {
    const { PaginationStore, SearchStore, location, FireRequestGetMoreForumList } = this.props;
    const Pagination = PaginationStore.get('searchForumList');
    if (Pagination) {
      const currentPage = Pagination.get('current_page');

      if (currentPage > 1) {
        FireRequestGetMoreForumList({
          listName: 'searchForumList',
          pathName: '/search/forum/list',
          params: {
            page: currentPage - 1,
            order: location.query.order || 'new',
            query: SearchStore.get('query')
          }
        });
      }
    }
  },

  nextForumList() {
    const { PaginationStore, SearchStore, location, FireRequestGetMoreForumList } = this.props;
    const Pagination = PaginationStore.get('searchForumList');
    if (Pagination) {
      const nextPage = Pagination.get('next_page');

      if (nextPage) {
        FireRequestGetMoreForumList({
          listName: 'searchForumList',
          pathName: '/search/forum/list',
          params: {
            page: nextPage,
            order: location.query.order || 'new',
            query: SearchStore.get('query')
          }
        });
      }
    }
  },

  render() {
    const {
      SearchStore, Collections, ListStore, Forums, Posts, Users, AuthStore, PaginationStore,
    } = this.props;
    const Collection = PaginationStore.get('searchPostList');
    const searchPosts = SearchStore.get('search');

    const searchForumList = ListStore.get('searchForumList');
    const searchForumPagination = PaginationStore.get('searchForumList');

    const self = this;

    return (
      <div id="best_contents">

        <div id="search_forum_list">
          <h4>게시판</h4>
          <div className="search-forum-box">
            <ul className="search-forum-list">
              {
                searchForumList &&
                searchForumList.map(forumId => {
                  const forum = Forums.get(forumId.toString());
                  if (!forum) return null;

                  const creator = forum.get('creator');
                  if (!creator) return null;

                  const userId = AuthStore.get('userId');
                  const isLogin = AuthStore.get('isLogin');

                  const isUserForumFollow = isLogin
                    ? Users
                    .get(userId.toString())
                    .get('follow_forums')
                    .find(v => v === forumId)
                    : false;

                  const cFollowActive = cx('ui button primary basic tiny right floated follow_button', {
                    active: isUserForumFollow
                  });

                  if (forum) {
                    return (
                      <li key={forumId} className="search-forum-item">
                        <div id="forum_info" style={{
                          margin: '0 0 0 2px',
                          padding: 0,
                        }}>
                          <div className="ui cards">
                            <div className="card" style={{
                              boxShadow: 'none',
                              width: '100%'
                            }}>
                              <div className="content">
                                <div className="header">
                                  <Link to={`/community?forumId=${forumId}`}>{forum.get('title')}</Link>

                                  {
                                    (userId === creator.get('id')) &&
                                    <Link to={`/community/settings?forumId=${forumId}`}
                                          className="ui button primary basic tiny right floated">
                                      <i className="fa fa-gear"/>
                                      {' 설정'}
                                    </Link>
                                  }

                                  {
                                    userId && isLogin &&
                                    <Dropdown className="subscribe_dropdown" ref="subscribe_dropdown">
                                      <DropdownTrigger className="ui button primary basic tiny right floated">
                                        <i className="fa fa-share"/>
                                        {' 구독'}
                                      </DropdownTrigger>
                                      <DropdownContent>
                                        <h4>구독 컬렉션 선택</h4>
                                        <ul className="collection_list">
                                          {
                                            Users
                                              .get(userId.toString())
                                              .get('collections')
                                              .map(self.createCollectionCheckBox.bind(self, Collections, forumId))
                                          }
                                        </ul>
                                      </DropdownContent>
                                    </Dropdown>
                                  }

                                  {
                                    !userId && !isLogin &&
                                    <a onClick={self.openLoginModal}
                                       className="ui button primary basic tiny right floated">
                                      <i className="fa fa-share"/>
                                      {' 구독'}
                                    </a>
                                  }

                                  <a className={cFollowActive}
                                     onClick={self.toggleFollow.bind(self, isUserForumFollow, forumId)}>
                                    <i className="fa fa-star"/>
                                    {' 팔로우'}
                                  </a>
                                </div>
                                <div className="meta">
                                  {forum.get('sub_header')}
                                </div>
                                <div className="description">
                                  {forum.get('description')}
                                </div>
                                <div className="meta forum_meta">
                                  <div className="forum_counts">
                                    <span className="follow_counts">팔로우 {forum.get('follow_count')} 명</span>
                                    <span className="subs_counts">컬렉션 구독 {forum.get('subs_count')}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  }
                })
              }
            </ul>
            <div className="list_pagination">
              {
                searchForumPagination && searchForumPagination.get('current_page') > 1 &&
                <div className="prev_button"><a onClick={this.prevForumList}>이전</a></div>
              }
              {
                searchForumPagination && searchForumPagination.get('next_page') &&
                <div className="next_button"><a onClick={this.nextForumList}>다음</a></div>
              }
            </div>
          </div>
        </div>

        <SearchHeader posts={searchPosts}/>

        <InfiniteList
          PostIdList={ListStore.get('searchPostList')}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          scrollHeight={ListStore.get('scrollHeight')}
          {...this.props}
        />

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset="-200px"
          scrollableAncestor={window || null}
        />

        <InfiniteLoader collection={Collection}/>

      </div>
    )
  }
});

export default SearchBox;
