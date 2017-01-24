import React from 'react';
import { Link } from 'react-router';

const UserPointMenu = React.createClass({
  render() {
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'포인트 정보'}</div>
          </div>
        </div>
        <menu className="sub_category_list">
          <ul >
            <li>
              <h5 className="">
                <a>{'포인트'}</a>
              </h5>

              <div className="sub_category item">
                <Link to="/user/chargePoint">{'포인트 충전'}</Link>
              </div>
              <div className="sub_category item">
                <Link to="/user/points/chargeLog">{'포인트 충전 내역'}</Link>
              </div>
              <div className="sub_category item">
                <Link to="/user/points">{'포인트 사용 내역'}</Link>
              </div>
            </li>
            <li>
              <h5 className="">
                <a>{'베나링크'}</a>
              </h5>

              <div className="sub_category item">
                <Link to="/user/venalinks/active">{'베나링크 활성화'}</Link>
              </div>
              <div className="sub_category item">
                <Link to="/user/venalinks/share">{'베나링크 참여'}</Link>
              </div>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

export default UserPointMenu;
