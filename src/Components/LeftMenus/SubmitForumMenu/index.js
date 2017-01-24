import React from 'react';
import { Link } from 'react-router';

const SubmitForumMenu = React.createClass({
  render() {
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'만들기'}</div>
          </div>
        </div>
        <menu className="sub_category_list">
          <ul >
            <li>
              <h5 className="">
                <a>{'메뉴'}</a>
              </h5>

              <div className="sub_category item">
                <Link to="/community/submit/forum">{'게시판 생성'}</Link>
              </div>
            </li>

          </ul>
        </menu>
      </div>
    );
  }
});

export default SubmitForumMenu;
