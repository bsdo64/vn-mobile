import React from 'react';

const SigninMenu = React.createClass({
  render() {
    return (
      <div id="forum_category">
        {/* Title */}
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'회원가입'}</div>
          </div>
        </div>

        {/* Menu */}
        <menu className="sub_category_list">

          <ul >
            <li >
              <h5 className="">
                <a><i className="fa fa-user"/>{' 회원가입'}</a>
              </h5>
            </li>
          </ul>
        </menu>
      </div>
    );
  }
});

export default SigninMenu;
