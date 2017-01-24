import React, { PropTypes } from 'react';
import cx from 'classnames';
import { browserHistory } from 'react-router';

const SigninFormContents = React.createClass({
  displayName: 'SigninFormContents',
  propTypes: {
    submitResult: PropTypes.bool.isRequired,
    emailVerifySuccess: PropTypes.bool.isRequired,
    emailVerifyFail: PropTypes.bool.isRequired,
    emailVerifyFormOpen: PropTypes.bool.isRequired,
    emailDup: PropTypes.any,
    nickDup: PropTypes.any,
    emailRequested: PropTypes.any,

    FireRequestCheckEmailDup: PropTypes.func.isRequired,
    FireRequestCheckNickDup: PropTypes.func.isRequired,
    FireRequestEmailVerify: PropTypes.func.isRequired,
    FireEmailVerifyFormOpen: PropTypes.func.isRequired,
    FireRequestCheckVerifyCode: PropTypes.func.isRequired,
    FireRequestSignin: PropTypes.func.isRequired,
  },

  componentWillReceiveProps(nextProps) {
    const oldSubmitResult = this.props.submitResult;
    const oldEmailVerifySuccess = this.props.emailVerifySuccess;
    const { submitResult, emailVerifySuccess } = nextProps;
    if (oldSubmitResult === false && submitResult === true) {
      if (oldEmailVerifySuccess === true && emailVerifySuccess === true) {
        browserHistory.push('/');
      }
    }
  },

  componentDidMount() {
    $('form select').dropdown();
    $(this.refs.signinform).form({
      inline: true,
      keyboardShortcuts: false,
      on: 'blur',
      fields: {
        email: {
          identifier: 'signinEmail',
          rules: [
            {
              type: 'empty',
              prompt: '이메일을 입력해주세요'
            },
            {
              type: 'email',
              prompt: 'Email 형식을 입력해 주세요.'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'regExp[/^[A-Za-z0-9~!@\#$%<>^&*\()\-=+_\’]{6,20}$/]',
              prompt: '비밀번호는 특수문자포함 6~20 자리 안으로 입력해주세요'
            }
          ]
        },
        password_re: {
          identifier: 'password_re',
          rules: [
            {
              type: 'match[password]',
              prompt: '입력한 비밀번호가 서로 다릅니다.'
            }
          ]
        },
        nick: {
          identifier: 'signinNick',
          rules: [
            {
              type: 'empty',
              prompt: '닉네임을 입력해주세요'
            },
            {
              type: 'regExp[/^[a-z가-힣A-Z0-9_]+( [a-z가-힣A-Z0-9_]+)*$/]',
              prompt: '닉네임은 한글과 영문 숫자로 이루어진 2~10 사이를 입력해주세요. <br />한칸 이상 공백은 허용하지 않습니다'
            },
            {
              type: 'minLength[2]',
              prompt: '닉네임은 한글과 영문 숫자로 이루어진 2~10 사이를 입력해주세요. <br />한칸 이상 공백은 허용하지 않습니다'
            },
            {
              type: 'maxLength[10]',
              prompt: '닉네임은 한글과 영문 숫자로 이루어진 2~10 사이를 입력해주세요. <br />한칸 이상 공백은 허용하지 않습니다'
            }
          ]
        },
        sex: {
          identifier: 'sex',
          rules: [
            {
              type: 'minCount[1]',
              prompt: '성별을 선택해주세요'
            }
          ]
        },
        year: {
          identifier: 'year',
          rules: [
            {
              type: 'exactCount[1]',
              prompt: '태어난 연도를 선택해 주세요'
            }
          ]
        },
        month: {
          identifier: 'month',
          rules: [
            {
              type: 'exactCount[1]',
              prompt: '태어난 월을 선택해 주세요'
            }
          ]
        },
        day: {
          identifier: 'day',
          rules: [
            {
              type: 'exactCount[1]',
              prompt: '태어난 일을 선택해 주세요'
            }
          ]
        }
      },
      onSuccess: (err, result) => {
        result.birth = new Date(result.year, result.month - 1, result.day);
        this.props.FireRequestSignin(result);
      }
    });
  },
  createYear() {
    const currentYear = new Date().getYear() + 1900;
    const options = [];
    for (let i = 0; i < 100; i++) {
      const y = currentYear - i;
      options.push(<option key={y} value={y}>{y}</option>)
    }
    return options;
  },

  render() {
    const { emailDup, nickDup, emailVerifyFail, emailVerifyFormOpen } = this.props;

    let dupError = '';
    if (emailDup || nickDup || emailVerifyFail) {
      dupError = (
        <div className="ui error message" style={{ display: 'block' }}>
          <ul className="list">
            {
              emailDup &&
              <li>이미 등록 되어 있는 이메일 입니다.</li>
            }
            {
              nickDup &&
              <li>이미 등록 되어 있는 닉네임 입니다.</li>
            }
            {
              emailVerifyFail &&
              <li>이메일 인증 코드가 일치하지 않습니다. 다시 확인해 주세요.</li>
            }
          </ul>
        </div>
      );
    }

    const formCx = {
      default: cx('field', {
        disabled: emailVerifyFormOpen
      })
    };

    return (
      <div id="signinform_section" className="ui container section_pad">
        <h3 className="ui dividing header">
          회원 가입
          <div className="sub header">회원가입을 하시면 다양항 서비스를 이용하실 수 있습니다.</div>
        </h3>
        <form ref="signinform" className="ui form" name="fregister" id="fregister">

          <div className="ui basic segment">
            <h4>로그인 정보</h4>
            <div className={formCx.default}>
              <label>이메일</label>
              <input ref="signinEmail" type="text" name="signinEmail" placeholder="이메일을 입력하세요"
                     onBlur={this.handleEmail}/>
            </div>
            <div className={formCx.default}>
              <label>비밀번호</label>
              <input type="password" name="password" placeholder="비밀번호를 입력하세요"/>
            </div>
            <div className={formCx.default}>
              <label>비밀번호 재입력</label>
              <input type="password" name="password_re" placeholder="비밀번호를 다시한번 입력하세요"/>
            </div>
          </div>

          <div className="ui divider"></div>

          <div className="ui basic segment">
            <div className={formCx.default}>
              <label>닉네임</label>
              <input ref="signinNick" type="text" name="signinNick" placeholder="닉네임을 입력하세요" onBlur={this.handleNick}/>
            </div>
            <div className={formCx.default}>
              <label>성별</label>
              <select className="ui dropdown" name="sex">
                <option value="">성별</option>
                <option value="1">남자</option>
                <option value="0">여자</option>
              </select>
            </div>
            <div className={formCx.default}>
              <label>생일</label>
              <div className="three fields">
                <div className="field">
                  <select className="ui fluid search dropdown" name="year">
                    <option value="">연도</option>
                    {
                      this.createYear()
                    }
                  </select>
                </div>
                <div className="field">
                  <select className="ui fluid search dropdown" name="month">
                    <option value="">월</option>
                    <option value="1">1월</option>
                    <option value="2">2월</option>
                    <option value="3">3월</option>
                    <option value="4">4월</option>
                    <option value="5">5월</option>
                    <option value="6">6월</option>
                    <option value="7">7월</option>
                    <option value="8">8월</option>
                    <option value="9">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                  </select>
                </div>
                <div className="field">
                  <select className="ui fluid search dropdown" name="day">
                    <option value="">일</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
              </div>
            </div>

            {
              emailVerifyFormOpen &&
              <div className="field">
                <label>이메일 확인</label>
                <input ref="emailVerify" type="text" name="nick" placeholder="이메일을 확인해주세요"
                       onBlur={this.handleCheckEmailCodeVerify}/>
              </div>
            }
          </div>

          {dupError}

          <div className="ui basic segment">
            <div className="ui button primary fluid" onClick={this.handleSubmit}>가입하기</div>
          </div>
        </form>
      </div>
    );
  },

  handleEmail() {
    const emailValue = this.refs.signinEmail.value;
    if (emailValue.length > 3) {
      this.props.FireRequestCheckEmailDup({ email: emailValue });
    }
  },

  handleNick() {
    const nickValue = this.refs.signinNick.value;
    if (nickValue.length > 1) {
      this.props.FireRequestCheckNickDup({ nick: nickValue });
    }
  },

  _sendEmailVerify() {
    const email = this.refs.signinEmail.value;
    if (email) {
      this.props.FireRequestEmailVerify({ email });
    }
  },
  handleSubmit() {
    const { emailDup, nickDup, emailVerifyFail, emailVerifySuccess, emailRequested } = this.props;

    if (emailVerifyFail) {
      return;
    }

    if ((emailDup === false) && (nickDup === false) &&
      (emailVerifySuccess === false) && (emailVerifyFail === false) &&
      (!emailRequested)) {
      this.props.FireEmailVerifyFormOpen();
      this._sendEmailVerify();
    }

    if (!emailDup && !nickDup && !emailVerifyFail && emailVerifySuccess && emailRequested) {
      $(this.refs.signinform).form('validate form');
    }
  },

  handleCheckEmailCodeVerify() {
    this.props.FireRequestCheckVerifyCode({ verifyCode: this.refs.emailVerify.value });
  }
});

export default SigninFormContents;
