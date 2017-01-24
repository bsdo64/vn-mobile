import React, { PropTypes } from 'react';
import Waypoint from 'react-waypoint';
import Header from '../../ContentBreadCrumb/ContentBreadCrumb';
import InfiniteList from '../../List/InfiniteList';
import InfiniteLoader from '../../Loader/InfiniteLoader';

const BestBox = React.createClass({
  displayName: 'BestBox',
  propTypes: {
    PaginationStore: PropTypes.object.isRequired,
    GnbStore: PropTypes.object,
    Collections: PropTypes.object,
    ListStore: PropTypes.object.isRequired,
    Posts: PropTypes.object.isRequired,
    Users: PropTypes.object.isRequired,
    Venatems: PropTypes.object.isRequired,
    Items: PropTypes.object.isRequired,
    AuthStore: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,

    FireSetScrollPosition: PropTypes.func.isRequired,
    FireToggleLoginModal: PropTypes.func.isRequired,
    FireRequestGetMorePostList: PropTypes.func.isRequired,
    FireToggleReportModal: PropTypes.func.isRequired,
    FireToggleDeleteModal: PropTypes.func.isRequired,
    FireRequestLikePost: PropTypes.func.isRequired,
    FireToggleActiveVenalinkModal: PropTypes.func.isRequired,
    FireRequestActivateVenalink: PropTypes.func.isRequired,
    FireRequestParticipateVenalink: PropTypes.func.isRequired,

  },

  getMoreBest({ previousPosition, currentPosition, event }) {
    if (previousPosition === 'below' && currentPosition === 'inside' && event) {
      const body = event.target.body;
      if ((body) && body.clientHeight > 768) {
        const { PaginationStore, GnbStore, listName, location, FireRequestGetMorePostList } = this.props;
        const Pagination = PaginationStore.get(listName);
        if (Pagination) {
          const nextPage = Pagination.get('next_page');

          const categoryValue = GnbStore.get('categoryValue') ? GnbStore.get('categoryValue').toJS() : [];
          const normalize = categoryValue.map((object) => {
            return parseInt(object.value);
          });

          if (nextPage) {

            let pathName;
            switch (listName) {
              case 'bestPostList':
                pathName = '/best';
                break;

              case 'collectionBestPostList':
                pathName = location.pathname + '/posts';
                break;

              default:
                pathName = '/best';
            }

            FireRequestGetMorePostList({
              listName: listName,
              pathName: pathName,
              params: {
                page: nextPage,
                order: location.query.order || 'hot',
                categoryValue: (normalize.length > 0) ? normalize : null,
                listType: location.pathname === '/all' ? 'all' : null
              }
            });
          }
        }
      }
    }
  },

  createBreadCrumbArray(array, pathname) {
    array.push({ title: '베스트', url: '/' });

    switch (pathname) {
      case '/':
        array.push({ title: '팔로잉' });
        return array;
      case '/all':
        array.push({ title: '전체글' });
        return array;
    }
  },

  render() {
    const {
      location, listName, ListStore, Posts, Users, Collections, AuthStore, PaginationStore,
    } = this.props;
    const Collection = PaginationStore.get(listName);
    const breadcrumbs = this.createBreadCrumbArray([], location.pathname);
    return (
      <div id="best_contents" ref="best_contents">

        <Header
          type={listName}
          location={location}
          breadcrumbs={breadcrumbs}
          collections={Collections}
        />

        <InfiniteList
          PostIdList={ListStore.get(listName)}
          PostItems={Posts}
          AuthorItems={Users}
          User={AuthStore}
          scrollHeight={ListStore.get('scrollHeight')}
          {...this.props}
        />

        <Waypoint
          onEnter={this.getMoreBest}
          bottomOffset='-200px'
          scrollableAncestor={window || null}
        />

        <InfiniteLoader collection={Collection}/>

      </div>
    )
  }
});

export default BestBox;
