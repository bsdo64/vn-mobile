/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom/server';
import Select from 'react-select';
import cx from 'classnames';
// import Recaptcha from 'react-recaptcha';
import { medium, mediumInsertConfig } from './config';
import AvatarImage from '../../AvatarImage';
import SelectSearchForum from './SelectSearchForum';

import debug from 'debug';
const errorLog = debug('vn:front:error');

const EditorBox = React.createClass({
  displayName: 'EditorBox',
  propTypes: {
    SubmitPostStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    FireRemoveServerInit: PropTypes.func.isRequired,
    FireHandlePostTitle: PropTypes.func.isRequired,
    FireHandlePostContent: PropTypes.func.isRequired,
    FireHandleResetPostContent: PropTypes.func.isRequired,
    FireRequestSubmitPost: PropTypes.func.isRequired,
    FireHandleSelectPrefix: PropTypes.func.isRequired,
    FireHandleAddPostImages: PropTypes.func.isRequired,
    FireHandleDeletePostImages: PropTypes.func.isRequired,
    FireHandleSetRepresentImage: PropTypes.func.isRequired,
    FireRequestDeleteUnUsingImage: PropTypes.func.isRequired,
    FireRequestUpdatePost: PropTypes.func.isRequired,
    FireRequestGetPostMeta: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      type: 'editor',
      isAnnounce: false,
      isLoadingUrl: false,
      isLoadedUrl: false,
      successUrl: false,
      loadedUrlMeta: null
    };
  },

  componentDidMount() {
    // set leave delete

    const dom = this.refs.post_editor;
    this.editor = new MediumEditor(dom, medium);  // eslint-disable-line no-undef
    this.editor.subscribe('editableInput', () => {
      this.handleContent()
    });
    $(dom).mediumInsert(mediumInsertConfig(this));

    // init content
    if (this.props.SubmitPostStore.get('server') === 'update') {
      const initContent = this.props.SubmitPostStore.get('content');
      if (initContent) {
        this.editor.setContent(initContent);
      }
    }

    this.props.FireRemoveServerInit();
  },

  componentWillReceiveProps(nextProps) {
    // init from server
    if (nextProps.SubmitPostStore.get('server') === 'update') {
      const initContent = nextProps.SubmitPostStore.get('content');
      if (initContent) {
        this.editor.setContent(initContent);
      }

      nextProps.FireRemoveServerInit()
    }

    // check update post success
    if (nextProps.SubmitPostStore.get('successUpdatePost') === true) {
      browserHistory.replace(
        '/community?forumId=' + nextProps.SubmitPostStore.get('successForumId') +
        '&postId=' + nextProps.SubmitPostStore.get('successPostId')
      );
    }
  },

  componentWillUnmount() {
    this.editor.destroy();

    const { SubmitPostStore, FireRequestDeleteUnUsingImage } = this.props;
    const postImages = SubmitPostStore.get('postImages');
    if (postImages && postImages.size) {

      FireRequestDeleteUnUsingImage(postImages.toJS());

    } else {
      return true;
    }
  },

  toggleAnnounce() {

    this.setState({ isAnnounce: !this.state.isAnnounce });
  },

  handleContent() {
    let allContents = this.editor.serialize();
    let el = allContents['post_editor'].value;

    this.props.FireHandlePostContent({
      content: el,
      width: this.refs.post_editor.offsetWidth,
      height: this.refs.post_editor.offsetHeight
    });
  },

  submitPost() {
    const { SubmitPostStore, UserStore, location, FireRequestSubmitPost } = this.props;

    const skills = UserStore.get('skills');
    const writePost = skills
      .filter(skill => skill.getIn(['skill', 'name']) === 'write_post')
      .get(0);

    function checkSkillAvailable(writePostSkill) {

      const property = writePostSkill.getIn(['skill', 'property']);
      const cooltime = property.get('cooltime');
      const usingAt = writePostSkill.get('using_at');

      if (usingAt === null) {
        return true;
      }

      if (cooltime && usingAt) {
        const gapSec = (new Date() - new Date(usingAt)) / 1000;
        if (gapSec > cooltime) {
          return true;
        }
      }

      return false;
    }

    const result = checkSkillAvailable(writePost);

    if (result) {
      const title = SubmitPostStore.get('title');
      const content = SubmitPostStore.get('content');
      if (title && content) {
        let newPost = {
          title: title,
          content: content,
          prefixId: SubmitPostStore.get('selectPrefixId'),
          query: location.query,
          isAnnounce: this.state.isAnnounce,
          width: SubmitPostStore.get('width'),
          height: SubmitPostStore.get('height'),
          postImages: SubmitPostStore.get('postImages') || null,
          representingImage: (SubmitPostStore.get('representingImage') === undefined || SubmitPostStore.get('representingImage') === null)
            ? null
            : SubmitPostStore.get('postImages').get(SubmitPostStore.get('representingImage'))
        };

        FireRequestSubmitPost(newPost);
      }
    } else {
      errorLog('not available');
    }
  },

  modPost() {
    const { SubmitPostStore, location, FireRequestUpdatePost } = this.props;

    const title = SubmitPostStore.get('title');
    const content = SubmitPostStore.get('content');

    if (title && content) {
      let newPost = {
        postId: SubmitPostStore.get('postId'),
        title: title,
        content: content,
        prefixId: SubmitPostStore.get('selectPrefixId'),
        query: location.query,
        isAnnounce: this.state.isAnnounce,
        width: SubmitPostStore.get('width'),
        height: SubmitPostStore.get('height')
      };

      FireRequestUpdatePost(newPost);
    }
  },

  removeContent() {
    this.props.FireHandleResetPostContent();
    this.editor.setContent(null);
  },

  getUrlPost() {

    const url = this.refs.url_input.value.trim();
    this.props.FireRequestGetPostMeta({ url });
  },

  selectEditor() {

    this.setState({ type: 'editor' });
  },

  selectUrl() {

    this.setState({ type: 'url' });
  },

  createUrlMetaContent(urlMetaData, askButton) {

    return (
      <div className="url-meta-data-box">
        <a href={urlMetaData.get('url')} target="_blank">
          <div className="ui items">
            <div className="item">
              {
                urlMetaData.get('image') &&
                <div className="image">
                  <img src={urlMetaData.get('image')}/>
                </div>
              }
              <div className="content">
                <div className="header">{urlMetaData.get('title')}</div>
                <div className="meta">
                  <p>{(urlMetaData.get('siteName') || urlMetaData.getIn(['uri', 'host']))}</p>
                </div>
                <div className="description">
                  <p>{urlMetaData.get('description')}</p>
                </div>
                {
                  askButton &&
                  <div className="extra">
                    <div className="ui right floated button" onClick={this.setUrlMetaContent}>
                      링크 사용
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </a>
      </div>)
  },

  setUrlMetaContent(e) {
    e.preventDefault();
    e.stopPropagation();

    const urlMetaData = this.props.SubmitPostStore.get('urlMetaData');
    const box = this.createUrlMetaContent(urlMetaData, false);

    this.props.FireHandlePostContent({ content: ReactDOM.renderToStaticMarkup(box) });
  },

  checkTitleAndContent() {

    const { SubmitPostStore } = this.props;
    return !SubmitPostStore.get('title') || !$(SubmitPostStore.get('content')).text().trim();
  },

  handleRecaptcha(a, b, c, d) {

    const args = Array.prototype.slice.call(arguments, 1);

    errorLog(args, a, b, c, d)
  },

  checkForumManager(user, managers) {

    const key = managers.findKey(u => u.get('id') === user.get('id'));
    if (key === undefined) {
      return false;
    } else {
      return user;
    }
  },

  createThumbnailImages(image, index)  {
    const isRepresent = this.props.SubmitPostStore.get('representingImage') === index;
    const style = cx('image_item select_represent', {
      select_represent: isRepresent
    });
    return (
      <li className={style}
          key={image.key}
          onClick={this.setRepresentImage.bind(this, index)}
      >
        {
          isRepresent &&
          <div className="represent_box">대표</div>
        }
        <img src={image.thumbnailUrl}/>
      </li>
    )
  },

  setRepresentImage(index) {

    this.props.FireHandleSetRepresentImage(index);
  },

  render() {

    const { SubmitPostStore, UserStore } = this.props;
    const type = SubmitPostStore.get('type');
    const urlMetaData = SubmitPostStore.get('urlMetaData');
    const announces = SubmitPostStore.getIn(['forum', 'announces']);
    const announcesLength = (announces && announces.size)
      ? announces.size
      : 0;
    const managers = SubmitPostStore.getIn(['forum', 'managers']);

    const isManager = this.checkForumManager(UserStore.get('user'), managers);

    const displayEditor = cx('ui description submit_post_box', {
      hide: this.state.type !== 'editor'
    });
    const displayUrl = cx('', {
      hide: this.state.type !== 'url'
    });
    const editorActive = cx('item', {
      active: this.state.type === 'editor'
    });
    const urlActive = cx('item', {
      active: this.state.type === 'url'
    });
    const titleAndContentActiveButton = cx('ui primary button', {
      disabled: this.checkTitleAndContent()
    });

    let urlMetaDataBox;
    if (urlMetaData && urlMetaData.size) {
      urlMetaDataBox = this.createUrlMetaContent(urlMetaData, true);
    }

    return (
      <div className="editor-box">

        <div className="ui labeled icon menu editor-type-menu">
          <a className={editorActive} onClick={this.selectEditor}>
            <i className="pencil icon"></i>
            에디터
          </a>
          <a className={urlActive} onClick={this.selectUrl}>
            <i className="fa fa-link icon"></i>
            URL
          </a>
        </div>

        <div className={displayEditor}>
          <div id="post_editor_background">
            <div ref="post_editor" className="post_editor" id="post_editor" placeholder="텍스트를 입력하세요"></div>
          </div>

          {
            SubmitPostStore.get('postImages') && SubmitPostStore.get('postImages').size > 0 &&
            <div className="submit_images">
              <div className="header">
                <h4>대표 이미지</h4>
                <p>대표 이미지를 설정해주세요</p>
              </div>
              <ul className="image_list">
                {
                  SubmitPostStore.get('postImages').map(this.createThumbnailImages)
                }
              </ul>
            </div>
          }
        </div>

        <div className={displayUrl}>
          <div className="ui action input">
            <input ref="url_input" type="text" placeholder="주소를 입력하세요"/>
            <button className="ui button" onClick={this.getUrlPost}>확인</button>
          </div>

          { urlMetaDataBox }

        </div>

        {/* <TagList items={Tags} /> */}

        {
          (announcesLength < 5) && (isManager) &&
          <div className="ui checkbox">
            <input id="is_announce" type="checkbox" onChange={this.toggleAnnounce}/>
            <label htmlFor="announce_check">공지 글 ({`${announcesLength} / 5`})</label>
          </div>
        }

        <div className="submit_button_box">
          {
            (type === 'write') &&
            <button className={titleAndContentActiveButton} onClick={this.submitPost}>
              저장하기
            </button>
          }
          {
            (type === 'mod') &&
            <button className={titleAndContentActiveButton} onClick={this.modPost}>
              수정하기
            </button>
          }
          <button className="ui button" onClick={this.removeContent}>
            다시 쓰기
          </button>
        </div>

      </div>
    )
  }
});

require('./index.scss');
const SubmitContents = React.createClass({
  displayName: 'SubmitContents',
  propTypes: {
    AuthStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
    SubmitPostStore: PropTypes.object.isRequired,

    FireRemoveServerInit: PropTypes.func.isRequired,
    FireHandlePostContent: PropTypes.func.isRequired,
    FireHandlePostTitle: PropTypes.func.isRequired,
    FireHandleResetPostContent: PropTypes.func.isRequired,
    FireRequestSubmitPost: PropTypes.func.isRequired,
    FireHandleSelectPrefix: PropTypes.func.isRequired,
    FireHandleAddPostImages: PropTypes.func.isRequired,
    FireHandleDeletePostImages: PropTypes.func.isRequired,
    FireHandleSetRepresentImage: PropTypes.func.isRequired,
    FireRequestDeleteUnUsingImage: PropTypes.func.isRequired,
    FireRequestUpdatePost: PropTypes.func.isRequired,
    FireRequestGetPostMeta: PropTypes.func.isRequired,
  },

  componentWillReceiveProps(nextProps) {
    if (!this.props.SubmitPostStore.get('submitSuccess') && nextProps.SubmitPostStore.get('submitSuccess')) {
      browserHistory.replace(
        '/community?forumId=' + nextProps.SubmitPostStore.get('forumId') +
        '&postId=' + nextProps.SubmitPostStore.get('postId')
      )
    }
  },

  handleTitle() {
    this.props.FireHandlePostTitle(this.refs.title.value);
  },
  handlePrefix(option) {
    if (option) {
      this.props.FireHandleSelectPrefix(option.value);
    } else if (option === null) {
      this.props.FireHandleSelectPrefix(null);
    }
  },

  render() {
    const { AuthStore, UserStore, SubmitPostStore } = this.props;

    const isLogin = AuthStore.get('isLogin');

    const forumInfo = SubmitPostStore.get('forum');

    if (isLogin) {
      const prefixesData = SubmitPostStore.get('prefixes');
      const user = UserStore.get('user');
      const profile = UserStore.get('profile');
      const icon = UserStore.get('icon');
      const sex = profile.get('sex'),
        avatar_img = profile.get('avatar_img'),
        icon_img = icon ? icon.get('img') : null;

      let iconImg, options;

      if (icon_img) {
        iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
      }

      let prefixes = [];
      if (prefixesData) {
        prefixes = prefixesData.toJS();
        options = prefixes.map(function (item) {
          let result = {};
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              const k = key === 'id' ? 'value' : (key === 'name' ? 'label' : key);
              result[k] = item[key];
            }
          }
          return result;
        });
      }

      if (!forumInfo) {
        return (
          <SelectSearchForum
            profile={profile}
          />
        )
      }

      return (
        <div id="submit_box" className="ui items">
          <div className={"ui item post_item"}>
            {/* avatar */}
            <div className="ui image tiny">
              <AvatarImage
                sex={sex}
                avatarImg={avatar_img}
              />
            </div>

            {/* meta */}
            <div className="ui content">
              <div className="post_header">
                {
                  prefixes &&
                  <Select
                    name="select_prefix"
                    value={SubmitPostStore.get('selectPrefixId')}
                    placeholder="말머리 선택"
                    noResultsText="말머리가 없습니다"
                    options={options}
                    onChange={this.handlePrefix}
                  />
                }
                <div className="ui input">
                  <input ref="title"
                         id="post_submit_title"
                         type="text"
                         placeholder="제목을 입력하세요"
                         value={SubmitPostStore.get('title')}
                         onChange={this.handleTitle}/>
                </div>
              </div>

              <div className="meta best_post_meta">
                <div className="ui horizontal divided list">
                  <div className="item">
                    {forumInfo.get('title')}
                  </div>
                </div>
              </div>
              <div className="meta best_post_meta">
                <div className="author_nick">
                  {user.get('nick')}
                </div>
                <div className="author_icon">
                  {iconImg}
                </div>
              </div>

              <EditorBox
                {...this.props}
              />

            </div>
          </div>
        </div>
      );

    } else {
      return (
        <div>
          안녕하세요 베나클 입니다.
          로그인을 해주세요
        </div>
      )
    }
  }

});

export default SubmitContents;
