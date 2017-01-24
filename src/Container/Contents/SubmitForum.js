import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import SubmitForumBox from '../../Components/Contents/SubmitForum';
import { UI } from '../../Reducers/InitialStates';
import { requestCreateForum, requestValidateTitleForumCreate } from '../../Actions/Forum';

const SubmitForum = React.createClass({
  propTypes: {
    SubmitForumStore: PropTypes.object.isRequired,
    UserStore: PropTypes.object.isRequired,
  },
  render() {
    return <SubmitForumBox {...this.props} />
  }
});

SubmitForum.defaultProps = {
  SubmitForumStore: UI.SubmitForum,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    SubmitForumStore: getUIState('SubmitForum'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireRequestValidateTitleForumCreate: requestValidateTitleForumCreate,
    FireRequestCreateForum: requestCreateForum,
  }
)(SubmitForum);
