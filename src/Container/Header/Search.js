import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../Components/Header/search';
import { UI } from '../../Reducers/InitialStates';
import {
  inputSearchQuery
} from '../../Actions/Search';
import { getUser } from '../../Selectors/User';

const Search = React.createClass({
  render() {
    return (<SearchBar {...this.props} />)
  }
});

Search.defaultProps = {
  SearchStore: UI.Search,
  LoginStore: UI.Login,
};

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  return {
    LoginStore: getUIState('Login'),
    SearchStore: getUIState('Search'),
    UserStore: getUser
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireInputSearchQuery: inputSearchQuery
  }
)(Search);
