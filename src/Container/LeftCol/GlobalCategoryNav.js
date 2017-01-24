import React from 'react';
import { connect } from 'react-redux';
import { toggleGnbPanel, openSideCategory, openForumMeta } from '../../Actions/Gnb';
import CategoryNav from '../../Components/CategoryNav';

const LeftColCategoryNav = React.createClass({
  render() {
    return (<CategoryNav {...this.props} />)
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  return {
    GnbStore: getUIState('Gnb')
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireToggleGnbPanel: toggleGnbPanel,
    FireOpenSideCategory: openSideCategory,
    FireOpenForumMeta: openForumMeta,
  }
)(LeftColCategoryNav);