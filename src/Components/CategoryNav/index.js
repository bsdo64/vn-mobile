import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { fromJS } from 'immutable';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';
import marked from '../Lib/Marked';
import AvatarImage from '../AvatarImage';

const RankList = React.createClass({
  displayName: 'RankList',
  propTypes: {
    forums: PropTypes.object.isRequired,
    openForumMeta: PropTypes.number,
    FireOpenForumMeta: PropTypes.func.isRequired,
  },

  openForumMeta (forumId) {
    this.props.FireOpenForumMeta(forumId);
  },
  stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  },
  render() {
    const { openForumMeta, forums } = this.props;
    return (
      <div className="forum_rank">
        <ul>
          {
            forums.get('data').map((forum, index) => {
              const creatorProfile = forum.get('creator').get('profile');
              const cButton = cx({
                active: forum.get('id') === openForumMeta
              });

              return (
                <li key={forum.get('id')} onMouseEnter={this.openForumMeta.bind(null, forum.get('id'))}
                >
                  <div className="forum_button">
                    <Link to={`/community?forumId=${forum.get('id')}`} className={cButton}>
                      {`${index + 1}. ${forum.get('title')}`}
                    </Link>
                  </div>
                  {
                    (openForumMeta == forum.get('id')) &&
                    <div className="forum_info" onMouseEnter={this.stopEvent}>
                      <div id="forum_contents">

                        <div id="forum_info" style={{
                          margin: '0 0 0 2px',
                          padding: 0,
                        }}>
                          <div className="ui cards">
                            <div className="card" style={{
                              borderTop: '1px solid rgb(5, 130, 148)',
                              boxShadow: 'none',
                              width: '100%'
                            }}>
                              <div className="content">
                                <AvatarImage
                                  sex={creatorProfile.get('sex')}
                                  avatarImg={creatorProfile.get('avatar_img')}
                                  imageClass="right floated mini ui image"
                                />
                                <div className="header">
                                  <Link to={`/community?forumId=${forum.get('id')}`}>
                                    {forum.get('title')}
                                  </Link>
                                </div>
                                <div className="meta">
                                  {forum.get('sub_header')}
                                </div>
                                <div className="description">
                                  {forum.get('description')}
                                </div>
                              </div>
                              <div className="content">
                                {
                                  forum.get('rule') &&
                                  <div >
                                    <div className="ui header tiny">
                                      클럽 규칙
                                    </div>
                                    <div className="description"
                                         dangerouslySetInnerHTML={{ __html: marked(forum.get('rule')) }}
                                    ></div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
});

const ClubList = React.createClass({
  displayName: 'ClubList',
  propTypes: {
    gnbMenu: PropTypes.object.isRequired,
    categorySet: PropTypes.object,
    newForums: PropTypes.object.isRequired,
    hotForums: PropTypes.object.isRequired,
    FireOpenSideCategory: PropTypes.func.isRequired,
    FireOpenForumMeta: PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.props.FireOpenSideCategory(1);
  },


  openSideCategories(clubId) {
    this.props.FireOpenSideCategory(clubId);
  },

  createCategory(item) {
    return (
      <li key={item.get('id')}>
        <Link to={"/community?forumId=" + item.get('id')}>{item.get('title')}</Link>
      </li>
    )
  },

  createCategoryGroup(item) {
    return (
      <div className="four wide column group" key={item.get('id')}>
        <h3 >{item.get('title')}</h3>
        <ul className="category_lists">
          <Scrollbars style={{ height: 80 }}>
            {
              item.get('forums').map(this.createCategory)
            }
          </Scrollbars>
        </ul>
      </div>
    )
  },

  createClub (item) {
    const { gnbMenu } = this.props;
    const openSideNow = gnbMenu.get('openSideNow');
    const type = item.get('type');
    const list = item.get('list');

    if (type === 'rank') {
      return (
        <li key={item.get('id')} className="gnbm">
          <a className="category_btn"
             ref={'menu_btn_' + item.get('id')}
             onMouseEnter={this.openSideCategories.bind(null, item.get('id'))}
             onClick={this.openSideCategories.bind(null, item.get('id'))}>
            {
              (openSideNow == item.get('id')) &&
              <i className="fa fa-arrow-right"/>
            }
            <span>{' ' + item.get('title')}</span>
          </a>
          {
            (openSideNow == item.get('id')) &&
            <div className="gnb_inner_wrap">

              <div className="gnb_inner">
                <div className="ui grid grouping">
                  {
                    (list === 'hot_forums') &&
                    <RankList
                      forums={item.get('groups')}
                      openForumMeta={gnbMenu.get('openForumMeta')}
                      FireOpenForumMeta={this.props.FireOpenForumMeta}
                    />
                  }

                  {
                    (list === 'new_forums') &&
                    <RankList
                      forums={item.get('groups')}
                      openForumMeta={gnbMenu.get('openForumMeta')}
                      FireOpenForumMeta={this.props.FireOpenForumMeta}
                    />
                  }
                </div>
              </div>
            </div>
          }
        </li>
      )
    } else {
      return (
        <li key={item.get('id')} className="gnbm">
          <a className="category_btn"
             ref={'menu_btn_' + item.get('id')}
             onMouseEnter={this.openSideCategories.bind(null, item.get('id'))}
             onClick={this.openSideCategories.bind(null, item.get('id'))}>
            {
              (openSideNow == item.get('id')) &&
              <i className="fa fa-arrow-right"/>
            }
            <span>{' ' + item.get('title')}</span>
          </a>
          {
            (openSideNow == item.get('id')) &&
            <div className="gnb_inner_wrap">

              <div className="gnb_inner">
                <div className="ui grid grouping">
                  {item.get('groups').map(this.createCategoryGroup)}
                </div>
              </div>
            </div>
          }
        </li>
      )
    }
  },

  render() {
    const { gnbMenu, newForums, hotForums } = this.props;
    const groups = gnbMenu.get('data');
    const data = fromJS([{
      id: 1,
      title: '일반',
      groups: groups
    }, {
      id: 2,
      title: '인기 게시판',
      type: 'rank',
      list: 'hot_forums',
      groups: hotForums
    }, {
      id: 3,
      title: '새로운 게시판',
      type: 'rank',
      list: 'new_forums',
      groups: newForums
    }]);

    return (
      <ul>
        {data.map(this.createClub)}
      </ul>
    )
  }
});

const ClubListMain = React.createClass({
  displayName: 'ClubListMain',
  render() {

    return (
      <div className="category_box_main">
        Hello main
      </div>
    )
  }
});

require('./index.scss');
const CategoryNav = React.createClass({
  displayName: 'CategoryNav',
  propTypes: {
    FireToggleGnbPanel: PropTypes.func.isRequired,
    FireOpenForumMeta: PropTypes.func.isRequired,
    FireOpenSideCategory: PropTypes.func.isRequired,
    GnbStore: PropTypes.object.isRequired,
  },

  handleToggleGnb() {

    this.props.FireToggleGnbPanel();
  },
  render() {
    const { GnbStore } = this.props;
    const openGnb = GnbStore.get('openGnb');
    const gnbMenu = GnbStore.get('gnbMenu');
    const newForums = GnbStore.get('newForums');
    const hotForums = GnbStore.get('hotForums');
    const categorySet = GnbStore.get('categorySet');

    return (
      <div>
        <div className="category_button" onClick={this.handleToggleGnb}>
          <i className="fa fa-bars"/>
          <i className="fa fa-caret-right" aria-hidden="true"/>
          <div className="category_text">카테고리</div>
        </div>

        { /* 카테고리 박스 */ }
        {
          openGnb &&
          <div ref="category_box" className="category_box">
            <div className="gnb_menu">
              <ClubList
                gnbMenu={gnbMenu}
                categorySet={categorySet}
                newForums={newForums}
                hotForums={hotForums}
                FireOpenSideCategory={this.props.FireOpenSideCategory}
                FireOpenForumMeta={this.props.FireOpenForumMeta}
              />
              <ClubListMain />
            </div>
          </div>
        }
      </div>
    )
  }
});

module.exports = CategoryNav;
