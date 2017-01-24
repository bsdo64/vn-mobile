import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchMenu from '../../Components/LeftMenus/SearchMenu';

const MenuContainer = React.createClass({
  propTypes: {
    SearchStore: PropTypes.object.isRequired,
  },
  render() {
    return <SearchMenu {...this.props} />
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  return {
    SearchStore: getUIState('Search')
  }
};

module.exports = connect(
  mapStateToProps,
  {

  }
)(MenuContainer);
