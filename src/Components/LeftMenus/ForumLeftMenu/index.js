import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CollectionComponent from '../BestCategorySelect/Collection';

// import AdForumLeft from '../Ad/AdForumLeft';

const ForumLeftMenu = React.createClass({
  displayName: 'ForumLeftMenu',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
    Forums: PropTypes.object.isRequired,
    Collections: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    forum: PropTypes.object,
  },

  render() {
    const {
      UserStore, location,
      forum
    } = this.props;

    const order = location.query.order || 'new';
    const user = UserStore.get('user');

    if (forum) {
      const creator = forum.get('creator');
      if (creator) {

        return (
          <div id="forum_category">
            {/* Title */}
            <div id="sub_category">
              <div className="sub_category_button">
                <div className="sub_category_text">
                  <Link to={`/community?forumId=${forum.get('id')}`}>{forum.get('title')}</Link>
                </div>
              </div>
            </div>

            {/* Menu */}
            <menu className="sub_category_list" key={forum.get('id')}>

              <ul >
                <li >
                  <h5 className="">
                    <a><i className="fa fa-rss"/>{' 뉴스피드'}</a>
                  </h5>

                  <div className="sub_category item">
                    {
                      (order === 'new') &&
                      <div className="active-menu"></div>
                    }
                    <Link
                      to={{ pathname: '/community', query: { forumId: forum.get('id'), order: 'new' } }}>{'최신 글'}</Link>
                  </div>
                  <div className="sub_category item">
                    {
                      (order === 'hot') &&
                      <div className="active-menu"></div>
                    }
                    <Link
                      to={{ pathname: '/community', query: { forumId: forum.get('id'), order: 'hot' } }}>{'인기 글'}</Link>
                  </div>
                  <div className="sub_category item">
                    {
                      (order === 'm_view') &&
                      <div className="active-menu"></div>
                    }
                    <Link to={{
                      pathname: '/community',
                      query: { forumId: forum.get('id'), order: 'm_view' }
                    }}>{'많이 본 글'}</Link>
                  </div>
                  <div className="sub_category item">
                    {
                      (order === 'm_comment') &&
                      <div className="active-menu"></div>
                    }
                    <Link to={{
                      pathname: '/community',
                      query: { forumId: forum.get('id'), order: 'm_comment' }
                    }}>{'댓글 많은 글'}</Link>
                  </div>
                </li>

                {
                  user &&
                  <CollectionComponent
                    {...this.props}
                  />
                }

              </ul>
            </menu>

            {/* forum Ad */}
            {/*<AdForumLeft url="http://www.heybannerbanner.com/client_folders/QS/600s/150_sleep1_600.gif"/>*/}
          </div>
        )
      }
    }

    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{''}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-rss"/>{' 뉴스피드'}</a>
              </h5>

              <div className="sub_category item">
                <Link to={{ pathname: '/community' }}>{'최신 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{ pathname: '/community' }}>{'인기 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{ pathname: '/community' }}>{'많이 본 글'}</Link>
              </div>
              <div className="sub_category item">
                <Link to={{ pathname: '/community' }}>{'댓글 많은 글'}</Link>
              </div>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

export default ForumLeftMenu;