import React from 'react';

const SubmitPostMenu = React.createClass({
  render() {
    return (
      <div>
        <div id="sub_category">
          <div className="sub_category_button">
            <div className="sub_category_text">{'글쓰기'}</div>
          </div>
        </div>
        <menu className="sub_category_list">
          <ul >
            <li>
              <h5 className="">
                <a>{'메뉴'}</a>
              </h5>

              <div className="sub_category item">
                <a>{'글 쓰기'}</a>
              </div>
            </li>

          </ul>
        </menu>
      </div>
    );
  }
});

export default SubmitPostMenu;
