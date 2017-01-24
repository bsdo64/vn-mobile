import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { UI } from '../../Reducers/InitialStates';
import {
  requestResetPassword
} from '../../Actions/User';

const FindMemberContainer = React.createClass({
  propTypes: {
    AuthStore: PropTypes.object.isRequired,
    ResetPasswordStore: PropTypes.object.isRequired,
    FireRequestResetPassword: PropTypes.func.isRequired,
  },

  componentDidMount() {
    $('.ui.form')
      .form({
        inline: true,
        on: 'blur',
        fields: {
          name: {
            identifier: 'email',
            rules: [
              {
                type: 'empty',
                prompt: '이메일을 입력해주세요'
              },
              {
                type: 'email',
                prompt: '이메일을 입력해주세요'
              },
            ]
          }
        },
        onSuccess: (e, fields) => {
          e.preventDefault();
          e.stopPropagation();

          this.props.FireRequestResetPassword({
            email: fields.email
          });
        }
      });
  },

  componentDidUpdate() {
    $('.ui.form').form('refresh');
  },

  componentWillMount() {
    const { AuthStore } = this.props;
    if (AuthStore.get('isLogin')) {
      browserHistory.push('/setting/password');
    }
  },

  render() {
    const { ResetPasswordStore } = this.props;
    const error = ResetPasswordStore.get('error');
    const emailSent = ResetPasswordStore.get('resetEmailSent');
    const isLoading = ResetPasswordStore.get('isLoading');

    let validateError;
    if (error) {
      validateError = (
        <div className="ui error message" style={{ display: 'block' }}>
          <ul className="list">
            <li>사용자가 존재하지 않습니다</li>
          </ul>
        </div>
      );
    }

    return (
      <div style={{ paddingTop: 50 }}>
        <div className="ui segments" style={{ width: 300, margin: '0 auto' }}>
          <div className="ui segment">
            <h2 className="ui center aligned icon header">
              <i className="circular history icon"></i>
              비밀번호 재설정
            </h2>
            <p>가입한 이메일을 입력하면 비밀번호 재설정을 위한 안내를 보내드립니다</p>
          </div>

          <div className="ui form segment ">
            <div className="field" style={{ width: '100%', paddingBottom: 10 }}>
              <input type="text" name="email" placeholder="가입하신 Email"/>
            </div>

            {validateError}

            {
              isLoading &&
              <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                  <div className="header">
                    확인 중입니다
                  </div>
                  <p>잠시만 기다려주세요</p>
                </div>
              </div>
            }

            {
              emailSent && !isLoading &&
              <div className="ui positive message">
                <div className="header">
                  이메일이 전송되었습니다!
                </div>
                <p>지금 이메일을 확인해 주세요!</p>
              </div>
            }

            {
              !emailSent && !isLoading &&
              <div className="ui submit button fluid primary">이메일 확인하기</div>
            }
          </div>
        </div>
      </div>
    )
  }
});

FindMemberContainer.defaultProps = {
  AuthStore: UI.Auth,
  ResetPasswordStore: UI.ResetPassword,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  return {
    ResetPasswordStore: getUIState('ResetPassword'),
    AuthStore: getUIState('Auth')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestResetPassword: requestResetPassword
  }
)(FindMemberContainer);
