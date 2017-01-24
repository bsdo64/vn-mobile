import React, { PropTypes } from 'react';

function handleOpenLoginModal(props) {
  const { location, FireToggleLoginModal } = props;
  FireToggleLoginModal({
    contentType: 'Login',
    location: location.pathname + location.search
  });
}

const LoginButton = (props) => {
  return (
    <div className="item">
      <div className="ui mini button primary"
           onClick={handleOpenLoginModal.bind(this, props)}>
        {'로그인'}
      </div>
    </div>
  );
};

LoginButton.displayName = 'LoginButton';
LoginButton.propTypes = {
  location: PropTypes.object.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired
};
LoginButton.defaultProps = {};

export default LoginButton;