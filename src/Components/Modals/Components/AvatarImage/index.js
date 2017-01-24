import React, { PropTypes } from 'react';
import AvatarImage from '../../../../Components/AvatarImage';

require('./index.scss');
const AvatarImageModal = React.createClass({
  displayName: 'AvatarImageModal',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
    FireRequestUserAvatarImageUpload: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      file: null,
      imagePreviewUrl: null
    };
  },

  handleFile: function (e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {

      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  },
  uploadAvatarImage() {
    if (this.state.file) {
      this.props.FireRequestUserAvatarImageUpload(this.state.file);
    }
  },
  render() {
    const { UserStore } = this.props;
    const user = UserStore.get('user');
    const profile = UserStore.get('profile');

    const sex = profile.get('sex'),
      avatar_img = profile.get('avatar_img');
    let avatarImg;

    if (this.state.imagePreviewUrl) {
      avatarImg = <img src={this.state.imagePreviewUrl}/>;
    } else {
      avatarImg = <AvatarImage
        imageClass="image_preview"
        sex={sex}
        avatarImg={avatar_img}
        removable={true}
      />
    }

    return (
      <div className="avatar_img">
        <div className="ui items ">
          <div className="header">
            <div className="header_title">프로필 이미지 변경</div>
          </div>
          <div className="item">
            <div className="image">
              { avatarImg }
              {/*<input name="thumb-roundness" className="slider form-control ng-valid ng-scope ng-dirty" type="range" />*/}
            </div>
            <div className="content">
              <a className="header">{user.get('nick')}</a>
              <div className="meta">
                <span className="cinema">이미지를 변경합니다</span>
              </div>
              <div className="extra">
                <input type="file" onChange={this.handleFile}/>
                <div className="ui label button" onClick={this.uploadAvatarImage}>이미지 업로드</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default AvatarImageModal;
