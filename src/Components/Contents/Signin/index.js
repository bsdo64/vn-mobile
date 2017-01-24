/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import SigninAgree from './SigninAgree';
import SigninFormContents from './SigninFormContents';

require('./Signin.scss');
const SigninContents = React.createClass({
  displayName: 'SigninContents',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
    SigninFormStore: PropTypes.object.isRequired,
    FireToggleAgreePrivacy: PropTypes.func.isRequired,
    FireToggleAgreeTerm: PropTypes.func.isRequired,
    FireConfirmAgree: PropTypes.func.isRequired,
    FireResetSigninForm: PropTypes.func.isRequired,
    FireEmailVerifyFormOpen: PropTypes.func.isRequired,

    FireRequestCheckEmailDup: PropTypes.func.isRequired,
    FireRequestCheckNickDup: PropTypes.func.isRequired,
    FireRequestEmailVerify: PropTypes.func.isRequired,
    FireRequestCheckVerifyCode: PropTypes.func.isRequired,
    FireRequestSignin: PropTypes.func.isRequired,
  },

  componentWillMount() {
    const { UserStore } = this.props;
    if (UserStore.get('user')) {
      browserHistory.replace('/');
    }
  },

  componentWillUnmount() {
    this.props.FireResetSigninForm();
  },

  render() {
    const { SigninFormStore } = this.props;

    const agreeTerm = SigninFormStore.get('agreeTerm');
    const agreePrivacy = SigninFormStore.get('agreePrivacy');
    const confirmAgree = SigninFormStore.get('confirmAgree');

    const signinContentsProps = {
      emailDup: SigninFormStore.get('emailDup'),
      nickDup: SigninFormStore.get('nickDup'),
      emailRequested: SigninFormStore.get('emailRequested'),
      submitResult: SigninFormStore.get('submitResult'),
      emailVerifySuccess: SigninFormStore.get('emailVerifySuccess'),
      emailVerifyFail: SigninFormStore.get('emailVerifyFail'),
      emailVerifyFormOpen: SigninFormStore.get('emailVerifyFormOpen'),

      email: SigninFormStore.get('email'),
      password: SigninFormStore.get('password'),
      nick: SigninFormStore.get('nick'),
      sex: SigninFormStore.get('sex'),
      year: SigninFormStore.get('year'),
      month: SigninFormStore.get('month'),
      day: SigninFormStore.get('day'),
      birth: SigninFormStore.get('birth')
    };

    return (
      <div id="signing">
        {
          confirmAgree &&
          <SigninFormContents
            {...signinContentsProps}
            FireRequestCheckEmailDup={this.props.FireRequestCheckEmailDup}
            FireRequestCheckNickDup={this.props.FireRequestCheckNickDup}
            FireEmailVerifyFormOpen={this.props.FireEmailVerifyFormOpen}
            FireRequestEmailVerify={this.props.FireRequestEmailVerify}
            FireRequestCheckVerifyCode={this.props.FireRequestCheckVerifyCode}
            FireRequestSignin={this.props.FireRequestSignin}
          />
        }

        {
          !confirmAgree &&
          <SigninAgree
            agreeTerm={agreeTerm}
            agreePrivacy={agreePrivacy}
            confirmAgree={confirmAgree}
            FireToggleAgreePrivacy={this.props.FireToggleAgreePrivacy}
            FireToggleAgreeTerm={this.props.FireToggleAgreeTerm}
            FireConfirmAgree={this.props.FireConfirmAgree}
            FireResetSigninForm={this.props.FireResetSigninForm}
          />
        }
      </div>
    );
  }
});

export default SigninContents;
