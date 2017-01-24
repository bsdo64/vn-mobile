import { combineReducers } from 'redux-immutable';
import Activity from './Activity';
import Auth from './Auth';
import ChargePoint from './ChargePoint';
import Community from './Community';
import ForumSetting from './ForumSetting';
import Forum from './Forum';
import Gnb from './Gnb';
import Inventory from './Inventory';
import List from './List';
import Login from './Login';
import Modal from './Modal';
import Pagination from './Pagination';
import Report from './Report';
import ResetPassword from './ResetPassword';
import RemoveModal from './RemoveModal';
import Search from './Search';
import UserSetting from './UserSetting';
import ShareLink from './ShareLink';
import Shopping from './Shopping';
import SigninForm from './SigninForm';
import SubmitPost from './SubmitPost';
import SubmitForum from './SubmitForum';

// UI reducer
export default combineReducers({
  Activity,
  Auth,
  ChargePoint,
  Community,
  ForumSetting,
  Forum,
  Gnb,
  Inventory,
  List,
  Login,
  Modal,
  Pagination,
  Report,
  ResetPassword,
  RemoveModal,
  Search,
  UserSetting,
  ShareLink,
  Shopping,
  SigninForm,
  SubmitPost,
  SubmitForum,
});
