import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import DeleteModalBox from '../../Components/Modals/Components/DeleteItem';
import { requestDeleteItem } from '../../Actions/DeleteItem';

const DeleteModalContainer = React.createClass({
  render() {
    return (<DeleteModalBox {...this.props} />)
  }
});

DeleteModalContainer.propTypes = {
  LoginStore: PropTypes.object.isRequired,
  RemoveModalStore: PropTypes.object.isRequired,
  Posts: PropTypes.object.isRequired,
  Comments: PropTypes.object.isRequired,
  SubComments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    LoginStore: getUIState('Login'),
    RemoveModalStore: getUIState('RemoveModal'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),

    Posts: getDomainState('Posts'),
    Comments: getDomainState('Comments'),
    SubComments: getDomainState('SubComments'),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestDeleteItem: requestDeleteItem
  }
)(DeleteModalContainer);
