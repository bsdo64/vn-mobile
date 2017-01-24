/**
 * Created by dobyeongsu on 2016. 11. 9..
 */
import { combineReducers } from 'redux-immutable';
import Domains from './Domains';
import UI from './UI';
const Stores = combineReducers({
  UI,
  Domains
});

function selectReducer(state, action) {

  switch (action.type) {
    case "@@router/LOCATION_CHANGE" : {
      return state.merge(action.serverInitData);
    }
    default :
      return state;
  }
}

// Root Reducer
export default function (state, action) {
  const intermediateState = Stores(state, action);
  return selectReducer(intermediateState, action);
}
