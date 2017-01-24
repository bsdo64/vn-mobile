import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const MenuContainer = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired,
  },

  getEndpoint(location) {
    return location.pathname.split('/')[1];
  },
  getTitle(endPoint) {
    switch (endPoint) {
      case 'about':
        return '소개';
      case 'careers':
        return '채용';
      case 'help':
        return '고객센터';
      case 'advertisement':
        return '광고안내';
      default:
        return '정책';
    }
  },
  render() {
    const title = this.getTitle(this.getEndpoint(this.props.location));
    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{title}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-rss"/>{' 베나클'}</a>
              </h5>

              <div className="sub_category item">
                <Link to={{ pathname: '/about' }}>{'소개'}</Link>
              </div>
              {/*<div className="sub_category item">
               <Link to={{pathname: '/careers'}}>{'채용'}</Link>
               </div>*/}
              <div className="sub_category item">
                <Link to={{ pathname: '/help' }}>{'고객센터'}</Link>
              </div>
              {/*<div className="sub_category item">
               <Link to={{pathname: '/advertisement'}}>{'광고안내'}</Link>
               </div>*/}
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

module.exports = MenuContainer;
