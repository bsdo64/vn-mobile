import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import memoize from 'fast-memoize';

require('./SigninButton.scss');
const FlatButton = (props) => {
  const { linkTo, text } = props;
  return (
    <div id="signin_button" className="widget">
      <Link to={linkTo}>
        <button className="ui primary button fluid">{text}</button>
      </Link>
    </div>
  )
};

FlatButton.propTypes = {
  linkTo: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default memoize(FlatButton);
