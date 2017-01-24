import React from 'react';

const SpamReports = () => {
  return (
    <div className="ui container" style={{ margin: 10, width: 700 }}>
      <div className="ui segments ">
        <div className="ui segment"><h3 className="ui header">게시판 생성</h3>
          <div className="ui divider"></div>
          <div className="ui list"><a className="item"><i className="right triangle icon"></i>
            <div className="content">
              <div className="header">사람들과 의견을 나누고 싶은 게시판을 생성하세요</div>
              <div className="description">어떤 주제든 상관없습니다</div>
            </div>
          </a><a className="item"><i className="help icon"></i>
            <div className="content">
              <div className="description">게시판 이름은 중복이 허용되지 않습니다</div>
            </div>
          </a></div>
          <form id="create_forum" className="ui form">
            <div className="field"><label>이름 *</label><input type="text" name="forum_title"/></div>
            <div className="field"><label>작은 제목</label><input type="text" name="forum_sub_header"/>
            </div>
            <div className="field"><label>설명 *</label><input type="text" name="forum_description"/>
            </div>
            <div className="field"><label>규칙 *</label><textarea name="forum_rule"></textarea></div>
            <div className="ui error message"></div>
            <div className="ui submit button primary">확인</div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default SpamReports;
