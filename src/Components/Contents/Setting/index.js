import React, { PropTypes } from 'react';
import moment from '../../Lib/Moment';
import debug from 'debug';
const logger = debug('vn:front:error');

const SettingProfile = React.createClass({
  displayName: 'SettingProfile',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
    defaultYear: PropTypes.number.isRequired,
    defaultMonth: PropTypes.number.isRequired,
    UserSettingStore: PropTypes.object.isRequired,
    FireCloseUserSettingMessage: PropTypes.func.isRequired,
    FireRequestUserUpdateProfile: PropTypes.func.isRequired,
  },

  getDefaultProps() {
    const d = new Date();
    return {
      defaultYear: d.getYear() + 1900,
      defaultMonth: 12,
      defaultDate: 31
    };
  },

  getInitialState() {
    const { UserStore } = this.props;
    const sex = UserStore.getIn(['profile', 'sex']);
    const birthday = UserStore.getIn(['profile', 'birth']);

    const d = moment(birthday);
    return {
      sex: sex,
      year: d.get('year'),
      month: d.get('month'),
      date: d.get('date')
    };
  },

  createYear() {

    const list = [];
    for (let i = 0; i < 100; i++) {
      const value = this.props.defaultYear - i;
      list.push(<option key={value} value={value}>{value}</option>)
    }

    return list;
  },

  createMonth() {

    const list = [];
    const month = this.props.defaultMonth;
    for (let i = 0; i < month; i++) {
      list.push(<option key={i} value={i}>{`${i + 1} 월`}</option>)
    }

    return list;
  },

  componentDidMount() {
    $('.ui.radio.checkbox')
      .checkbox();

    $('select.dropdown')
      .dropdown();
  },

  changeYear(e) {
    this.setState({ year: e.target.value })
  },
  changeMonth(e) {
    this.setState({ month: e.target.value })
  },
  changeDate(e) {
    this.setState({ date: e.target.value })
  },
  changeSex(sex) {
    this.setState({ sex: sex })
  },

  updateProfile() {
    const birth = {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date
    };
    const profile = {
      sex: this.state.sex,
      birth: moment(birth).format()
    };

    this.props.FireRequestUserUpdateProfile(profile);
  },

  closeMessageBox(successType) {

    $(this.refs[successType + 'Message'])
      .closest('.message')
      .transition('fade');

    this.props.FireCloseUserSettingMessage({ successType });
  },

  setErrorMessage(UserSettingStore) {
    const errMessage = UserSettingStore.get('error');
    const successMessage = UserSettingStore.get('success');

    if (errMessage) {
      return (
        <div ref="errorMessage" className="ui error message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'error')}></i>
          <ul className="list">
            <li>이전 비밀번호와 다릅니다.</li>
          </ul>
        </div>
      )
    }

    if (successMessage) {
      return (
        <div ref="successMessage" className="ui icon small success message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'success')}></i>
          <i className="checkmark icon"></i>
          <div className="content">
            <p>비밀번호를 성공적으로 변경하였습니다</p>
          </div>
        </div>
      )
    }

  },

  render() {
    const { UserSettingStore } = this.props;
    return (
      <div id="setting">
        <h3 className="ui dividing header">
          회원 정보
          <div className="ui sub header">회원 정보를 수정합니다.</div>
        </h3>

        <div className="setting-account">
          <form className="ui form ">
            <div className="three fields">
              <div className="grouped fields">
                <label htmlFor="fruit">성별</label>
                <div className="field">
                  <div className="ui radio checkbox" onClick={this.changeSex.bind(this, true)}>
                    <input type="radio" name="sex"
                           defaultChecked={this.state.sex}
                           className="hidden" value="1"
                    />
                    <label>남자</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox" onClick={this.changeSex.bind(this, false)}>
                    <input type="radio" name="sex"
                           defaultChecked={!this.state.sex}
                           className="hidden" value="0"
                    />
                    <label>여자</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label>생일</label>
              <div className="three fields">
                <div className="field">
                  <select
                    className="ui fluid search dropdown"
                    name="year"
                    value={this.state.year}
                    onChange={this.changeYear}
                  >
                    <option value="">연도</option>
                    {
                      this.createYear()
                    }
                  </select>
                </div>
                <div className="field">
                  <select
                    className="ui fluid search dropdown"
                    name="month"
                    value={this.state.month}
                    onChange={this.changeMonth}
                  >
                    <option value="">월</option>
                    {
                      this.createMonth()
                    }
                  </select>
                </div>
                <div className="field">
                  <select
                    className="ui fluid search dropdown"
                    name="day"
                    value={this.state.date}
                    onChange={this.changeDate}
                  >
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
            <div className="ui button primary" onClick={this.updateProfile}>저장</div>
          </form>

          {
            this.setErrorMessage(UserSettingStore)
          }
        </div>
      </div>
    )
  }
});

const SettingPassword = React.createClass({
  displayName: 'SettingPassword',
  propTypes: {
    UserSettingStore: PropTypes.object.isRequired,
    FireCloseUserSettingMessage: PropTypes.func.isRequired,
    FireRequestUserUpdatePassword: PropTypes.func.isRequired,
  },

  componentDidMount() {
    $('.ui.form')
      .form({
        fields: {
          oldPassword: {
            identifier: 'old-password',
            rules: [
              {
                type: 'empty',
                prompt: '빈칸을 모두 채워주세요'
              }
            ]
          },
          newPassword: {
            identifier: 'new-password',
            rules: [
              {
                type: 'empty',
                prompt: '빈칸을 채워주세요'
              },

              {
                type: 'minLength[6]',
                prompt: '적어도 {ruleValue}글자 이상 입력해주세요'
              }
            ]
          },
          reNewPassword: {
            identifier: 're-new-password',
            rules: [
              {
                type: 'match[new-password]',
                prompt: '입력한 비밀번호와 서로 다릅니다.'
              }
            ]
          }
        },
        onSuccess: (e, value) => {
          e.preventDefault();

          this.props.FireRequestUserUpdatePassword({
            oldPassword: value['old-password'],
            newPassword: value['new-password']
          });

        },
        onFailure: (e) => {
          logger('Form validate fail', e);
        }
      })
    ;
  },

  closeMessageBox(successType) {

    $(this.refs[successType + 'Message'])
      .closest('.message')
      .transition('fade');

    this.props.FireCloseUserSettingMessage({ successType });
  },

  setErrorMessage(UserSettingStore) {
    const errMessage = UserSettingStore.get('error');
    const successMessage = UserSettingStore.get('success');

    if (errMessage) {
      return (
        <div ref="errorMessage" className="ui error message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'error')}></i>
          <ul className="list">
            <li>이전 비밀번호와 다릅니다.</li>
          </ul>
        </div>
      )
    }

    if (successMessage) {
      return (
        <div ref="successMessage" className="ui icon small success message">
          <i className="close icon" onClick={this.closeMessageBox.bind(this, 'success')}></i>
          <i className="checkmark icon"></i>
          <div className="content">
            <p>비밀번호를 성공적으로 변경하였습니다</p>
          </div>
        </div>
      )
    }

  },
  render() {
    const { UserSettingStore } = this.props;
    return (
      <div id="setting">

        <h3 className="ui dividing header">
          비밀번호 설정
          <div className="ui sub header">새로운 비밀번호를 설정합니다.</div>
        </h3>

        <div className="setting-account">
          <div className="ui form ">
            <div className="field">
              <label>이전 비밀번호</label>
              <input type="password" name="old-password" placeholder="예전 비밀번호"/>
            </div>
            <div className="field">
              <label>새 비밀번호</label>
              <input type="password" name="new-password" placeholder="새로운 비밀번호"/>
            </div>
            <div className="field">
              <label>새 비밀번호 확인</label>
              <input type="password" name="re-new-password" placeholder="새로운 비밀번호 확인"/>
            </div>
            <div className="ui submit button primary">저장</div>
            <div className="ui error message "></div>
          </div>
          {
            this.setErrorMessage(UserSettingStore)
          }
        </div>
      </div>
    );
  }
});

require('./index.scss');
const SettingBox = React.createClass({
  displayName: 'SettingBox',
  propTypes: {
    UserSettingStore: PropTypes.object.isRequired,
    FireCloseUserSettingMessage: PropTypes.func.isRequired,
    FireRequestUserUpdatePassword: PropTypes.func.isRequired,
    FireRequestUserUpdateProfile: PropTypes.func.isRequired,
  },

  render() {
    const { UserSettingStore } = this.props;
    switch (UserSettingStore.get('page')) {
      case 'password' :
        return <SettingPassword {...this.props} />;

      case 'profile' :
        return <SettingProfile {...this.props} />;

      default :
        return (<div></div>)
    }
  }
});

export default SettingBox;
