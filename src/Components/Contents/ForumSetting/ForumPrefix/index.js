import React, { PropTypes } from 'react';

require('./index.scss');
const PrefixBox = React.createClass({
  propTypes: {
    forum: PropTypes.object.isRequired,
    prefixes: PropTypes.object.isRequired,
    FireRequestAddForumPrefix: PropTypes.func.isRequired,
    FireRequestDeleteForumPrefix: PropTypes.func.isRequired,
    FireRequestUpdateForumPrefix: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      openAdder: false,
      prefixText: null,
      updateItemId: null,
      updateItemText: null
    };
  },

  openPrefixUpdate(id) {

    this.setState({
      updateItemId: id
    });
  },

  closePrefixUpdate() {

    this.setState({
      updateItemId: null
    });
  },

  updateOnChange(e) {

    this.setState({
      updateItemText: e.target.value
    });
  },

  sendUpdate(e) {

    const charCode = e.charCode;
    const text = e.target.value;
    const { forum, FireRequestUpdateForumPrefix } = this.props;

    if (charCode == 13) {
      FireRequestUpdateForumPrefix({
        id: this.state.updateItemId,
        forumId: forum.get('id'),
        prefixName: text
      });
      this.setState({
        openAdder: false,
        prefixText: null,
        updateItemId: null,
        updateItemText: null
      });
    }
  },

  prefixDelete(id) {

    this.props.FireRequestDeleteForumPrefix({
      id: id
    });
  },

  createPrefixItem (p) {

    if (p.get('id') === this.state.updateItemId) {
      return (
        <li key={p.get('id')} className="item">
          <div className="ui action input prefix-adder-input-update">
            <input
              defaultValue={p.get('name')}
              onChange={this.updateOnChange}
              onKeyPress={this.sendUpdate}
            />
            <button className="ui icon button" onClick={this.closePrefixUpdate}>
              <i className="icon remove circle outline"></i>
            </button>
          </div>
        </li>
      )
    } else {
      return (
        <li key={p.get('id')} className="item">
          <a className="ui label large">
            <span className="prefix-adder-item">{p.get('name')}</span>
            <i className="fa fa-pencil" onClick={this.openPrefixUpdate.bind(this, p.get('id'))}/>
            <i className="fa fa-remove" onClick={this.prefixDelete.bind(this, p.get('id'))}/>
          </a>
        </li>
      )
    }
  },
  triggerOpenAddPrefix() {

    this.setState({ openAdder: !this.state.openAdder })

  },
  sendPrefix(e) {
    const charCode = e.charCode;
    const { forum, FireRequestAddForumPrefix } = this.props;

    if (charCode == 13) {
      FireRequestAddForumPrefix({
        forumId: forum.get('id'),
        prefixName: this.state.prefixText
      });
      this.setState({
        openAdder: false,
        prefixText: null
      });
    }
  },
  prefixText() {

    this.setState({
      prefixText: this.refs.input_prefix.value.trim()
    })
  },
  render() {
    const { prefixes } = this.props;
    const self = this;

    const adder = this.state.openAdder
      ? (
      <div className="ui action input prefix-adder-input">
        <input ref="input_prefix" type="text" onKeyPress={this.sendPrefix} onChange={this.prefixText}/>
        <button className="ui icon button" onClick={this.triggerOpenAddPrefix}>
          <i className="icon remove circle outline"></i>
        </button>
      </div>
    )
      : prefixes.size < 5
      ? <div className="ui button primary tiny prefix-adder-button" onClick={this.triggerOpenAddPrefix}>추가 +</div>
      : null;

    return (
      <ul className="prefix-list">
        {prefixes.map(self.createPrefixItem)}
        <li className="item">
          {adder}
        </li>
      </ul>
    );
  }
});

const ForumPrefix = React.createClass({
  propTypes: {
    ForumSettingStore: PropTypes.object.isRequired,
    FireHandleResetButton: PropTypes.func.isRequired,
    FireHandleChangeFormForumMeta: PropTypes.func.isRequired,
    FireRequestUpdateForumMeta: PropTypes.func.isRequired,
    FireRequestAddForumPrefix: PropTypes.func.isRequired,
    FireRequestDeleteForumPrefix: PropTypes.func.isRequired,
    FireRequestUpdateForumPrefix: PropTypes.func.isRequired,
  },

  componentWillUnmount() {
    this.props.FireHandleResetButton();
  },

  updateForumPrefix(e) {
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
        <div className="ui container forum-prefix" style={{ margin: 10, width: 700 }}>
          <div className="ui segments ">
            <div className="ui segment">
              <h3 className="ui header">말머리 설정</h3>
              <div className="ui divider"></div>
              <div className="ui list">
                <a className="item"><i className="right triangle icon"></i>
                  <div className="content">
                    <div className="header">말머리를 설정합니다</div>
                    <div className="description"> - 최대 5개의 말머리를 설정할 수 있습니다</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="ui segment">
              <PrefixBox
                prefixes={forum.get('prefixes')}
                forum={forum}
                {...this.props}
              />
            </div>
          </div>
        </div>
      )
    }

    return <div></div>
  }
});

export default ForumPrefix;