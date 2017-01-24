import { Map, List, fromJS } from 'immutable';
import moment from 'moment';

export const App = {

};

export const Domains = {
  Users: Map({}),
  Posts: Map({}),
  Venatems: Map({}),
  Items: Map({}),
  Comments: Map({}),
  Collections: Map({}),
  Forums: Map({}),
  Categories: Map({}),
  Prefixes: Map({}),
  SubComments: Map({}),
  Notis: Map({}),
};

export const UI = {
  Activity: Map({}),
  Auth: Map({ isLogin: false, userId: null }),
  ChargePoint: Map({
    isRequestCheckCharge: false,
    successChargePoint: false,
  }),
  Community: Map({}),
  Forum: Map({}),
  ForumSetting: fromJS({
    forumInfo: {
      success: null
    }
  }),
  Gnb: Map({
    openGnb: false,
    gnbMenu: Map({
      openSideNow: 1
    })
  }),
  Inventory: Map({
    openInventory: false,
  }),
  List: Map({
    scrollHeight: 0,
    CategoryList: List([])
  }),
  Login: Map({
    isLoading: false,
    isLogin: false,
    loginSuccess: false,
    loginFail: false,
    logoutSuccess: false,
    logoutFail: false
  }),
  Modal: Map({
    modals: List()
  }),
  Pagination: Map({}),
  Report: Map({
    reportItem: [
      {
        id: 1,
        message: '불쾌하거나 흥미없는 내용입니다.'
      },
      {
        id: 2,
        message: '스팸성 글입니다.'
      },
      {
        id: 3,
        message: '인신공격, 불법, 허위 내용을 유포하고 있습니다.'
      }
    ],
    selectItem: 1,
    openReportModal: false,
    successReport: false
  }),
  ResetPassword: Map({
    error: null,
    requestFindEmail: null,
    userExist: null,
    resetEmailSent: null,
    isLoading: false
  }),
  RemoveModal: Map({}),
  Search: Map({
    query: null
  }),
  UserSetting: Map({}),
  ShareLink: Map({
    openVenalink: false,
    venalinkRP: '',
    startDate: moment()
  }),
  Shopping: Map({
    items: List([]),
    storeModalOpen: false,
    tooltipItemCode: null,
    purchaseItem: null,
    openPurchaseWindow: false
  }),
  SigninForm: Map({

    // agree ui
    agreeTerm: false,
    agreePrivacy: false,
    confirmAgree: false,

    // form ui
    emailDup: null,
    nickDup: null,
    emailRequested: false,
    submitResult: false,
    emailVerifySuccess: false,
    emailVerifyFail: false,
    emailVerifyFormOpen: false,

    // form Value
    email: null,
    password: null,
    nick: null,
    sex: null,
    year: null,
    month: null,
    day: null,
    birth: null
  }),
  SubmitPost: Map({
    deletedUrl: List(),
    representingImage: null
  }),
  SubmitForum: fromJS({
    form: {
      inputValue: {
        title: null,
        subHeader: null,
        description: null,
        rule: null,
      },
      didValidate: {
        title: false,
      },
      validate: {
        title: null
      },
      error: null
    },
  })
};