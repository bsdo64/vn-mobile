import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from './Routes';

const App = (props) => {
  return (
    <Provider store={props.store}>
      {Router(props.store)}
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;