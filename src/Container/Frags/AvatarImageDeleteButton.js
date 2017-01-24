import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  requestUserAvatarImageRemove
} from '../../Actions/User';

const removeImage = (props) => () => props.FireRequestUserAvatarImageRemove();

const DeleteButton = (props) => {
  return (
    <div className="delete_avatar_btn"
         onClick={removeImage(props)}
    >
      <i className="fa fa-remove"/>
    </div>
  );
};

DeleteButton.propTypes = {
  FireRequestUserAvatarImageRemove: PropTypes.func.isRequired,
};

const AvatarImageDeleteButtonContainer = React.createClass({
  render() {
    return (<DeleteButton {...this.props} />)
  }
});

module.exports = connect(
  null,
  {
    FireRequestUserAvatarImageRemove: requestUserAvatarImageRemove,
  }
)(AvatarImageDeleteButtonContainer);
