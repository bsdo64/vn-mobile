import { UI } from '../InitialStates';
import {
  INPUT_SEARCH_QUERY
} from '../../Actions/Search';

const Search = (state = UI.Search, action) => {
  switch (action.type) {
    case INPUT_SEARCH_QUERY: {
      return state.merge({ query: action.query });
    }

    default: return state;
  }
};

export default Search;
