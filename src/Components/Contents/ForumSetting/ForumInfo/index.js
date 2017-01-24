import React, { PropTypes } from 'react';

const ForumInfo = React.createClass({
  propTypes: {
    ForumSettingStore: PropTypes.object.isRequired,
    FireHandleResetButton: PropTypes.func.isRequired,
    FireHandleChangeFormForumMeta: PropTypes.func.isRequired,
    FireRequestUpdateForumMeta: PropTypes.func.isRequired,
  },

  componentWillUnmount() {
    this.props.FireHandleResetButton();
  },

  updateForumInfo(e) {
    e.preventDefault();
    e.stopPropagation();

    const { ForumSettingStore, FireRequestUpdateForumMeta } = this.props;
    const forumInfo = ForumSettingStore.get('forumInfo');
    const forum = ForumSettingStore.get('forum');

    FireRequestUpdateForumMeta({
      id: forum.get('id'),
      sub_header: forumInfo ? forumInfo.get('forum_sub_header') : forum.get('sub_header'),
      description: forumInfo ? forumInfo.get('forum_description') : forum.get('description'),
      rule: forumInfo ? forumInfo.get('forum_rule') : forum.get('rule')
    })
  },

  changeForm(e) {
    this.props.FireHandleChangeFormForumMeta({ [e.target.name]: e.target.value.trim() })
  },

  render() {
    const { ForumSettingStore } = this.props;
    const forum = ForumSettingStore.get('forum');

    if (forum) {
      const patch = ForumSettingStore.getIn(['forumInfo', 'success']);
      const patchSuccess = patch === 'updated' ? true : patch === 'failed' ? false : null;
      let button;

      if (patchSuccess === true) {
        button = <div className="ui submit button positive">변경 완료</div>
      } else if (patchSuccess === false) {
        button = <button type="submit" className="ui submit button negative">변경 실패</button>
      } else if (patchSuccess === null) {
        button = <button type="submit" className="ui submit button primary">변경</button>
      }

      return (
        <div className="ui container" style={{ margin: 10, width: 700 }}>
          <div className="ui segments ">
            <div className="ui segment"><h3 className="ui header">게시판 정보</h3>
              <div className="ui divider"></div>
              <div className="ui list">
                <a className="item"><i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">기존 게시판 정보를 수정합니다.</div>
                    <div className="description"> - 게시판 이름은 변경할 수 없습니다</div>
                  </div>
                </a>
              </div>
              <form id="create_forum" className="ui form"
                    onChange={this.changeForm} onSubmit={this.updateForumInfo}>
                <div className="field">
                  <label>이름 *</label>
                  {forum.get('title')}
                </div>
                <div className="field">
                  <label>부제 : </label>
                  <input type="text" defaultValue={forum.get('sub_header')} name="forum_sub_header"/>
                </div>
                <div className="field">
                  <label>설명 *</label>
                  <input type="text" defaultValue={forum.get('description')} name="forum_description"/>
                </div>
                <div className="field">
                  <label>규칙 *</label>
                  <textarea name="forum_rule" defaultValue={forum.get('rule')}/>
                </div>
                <div className="ui error message"></div>
                {button}
              </form>
            </div>
          </div>
        </div>
      )
    }

    return <div></div>
  }
});

export default ForumInfo;