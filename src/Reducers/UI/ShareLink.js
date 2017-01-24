import { UI } from '../InitialStates';
import { TOGGLE_ACTIVE_VENALINK_MODAL } from '../../Actions/Post';

const ShareLink = (state = UI.ShareLink, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVE_VENALINK_MODAL: {
      const { venalinkActivateRequestPostId } = action;
      return state.merge({ venalinkActivateRequestPostId })
    }

    default: return state;
  }
};

export default ShareLink;
