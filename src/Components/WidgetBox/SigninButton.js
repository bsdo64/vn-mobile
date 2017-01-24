import React from 'react';
import { Link } from 'react-router';

require('./SigninButton.scss');
const SigninButton = React.createClass({
  render() {
    return (
      <div id="signin_button" className="widget">
        <Link to="/signin">
          <button className="ui primary button fluid">지금 가입하세요 !</button>
        </Link>
      </div>
    );
  }
});

export default SigninButton;
