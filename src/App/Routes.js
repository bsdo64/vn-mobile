import React from 'react';
import { IndexRedirect, Link, IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
const ForumMenu = require('../Container/LeftCol/ForumMenu.js');
const CollectionMenu = require('../Container/LeftCol/CollectionMenu');
const DefaultMenu = require('../Container/LeftCol/DefaultMenu');

const HeaderMyMenu = require('../Container/Header/MyMenu');
const HeaderSearch = require('../Container/Header/Search');

const ContentsContainer = require('../Container/Contents/Best');
const CollectionContentsContainer = require('../Container/Contents/BestCollection');
const SigninContainer = require('../Container/Contents/Signin');
const CommunityContainer = require('../Container/Contents/Community');
const SubmitContainer = require('../Container/Contents/SubmitPost');
const SubmitForumContainer = require('../Container/Contents/SubmitForum');
const ForumSettingMain = require('../Container/Contents/ForumSetting');
const SearchContainer = require('../Container/Contents/Search');
const SettingContainer = require('../Container/Contents/Setting');
const ActivityContainer = require('../Container/Contents/Activity');
const PolicyContainer = require('../Container/Contents/Policy');
const HelpContainer = require('../Container/Contents/Help');
const CompanyContainer = require('../Container/Contents/Company');
const FindMemberContainer = require('../Container/Contents/FindMember');
const ChargePointContainer = require('../Container/Contents/ChargePoint');
const PointListContainer = require('../Container/Contents/PointList');
const ChargeLogListContainer = require('../Container/Contents/ChargeLogList');
const VenalinkActiveList = require('../Container/Contents/VenalinkActiveList');
const VenalinkShareList = require('../Container/Contents/VenalinkShareList');

const BestCategoryMenu = require('../Container/LeftCol/BestCategoryMenu');
const AccountCategoryMenu = require('../Container/LeftCol/AccountCategoryMenu');
const UserPointMenu = require('../Container/LeftCol/UserPointMenu');
const PolicyMenu = require('../Container/LeftCol/PolicyMenu');
const HelpMenu = require('../Container/LeftCol/HelpMenu');
const CompanyMenu = require('../Container/LeftCol/CompanyMenu');
const SubmitForumMenu = require('../Container/LeftCol/SubmitForumMenu');
const SubmitPostMenu = require('../Container/LeftCol/SubmitPostMenu');
const ForumSettingMenu = require('../Container/LeftCol/ForumSettingMenu');
const SigninMenu = require('../Container/LeftCol/SigninMenu');
const SearchMenu = require('../Container/LeftCol/SearchMenu');

const ModalContainer = require('../Container/Modal/ModalContainer');
const WidgetContainer = require('../Container/RightCol/WidgetContainer');

const App = (props) => {
  return (
    <div>
      <div id="wrap">
        <div id="global-header">
          <div className="top_area">
            <div className="top_contents">
              <div id="top_logo" onClick={() => {
                document.body.scrollTop = 0;
              }}>
                <Link className="ui header inverted huge" to="/">
                  V
                </Link>
              </div>
              <div id="top_search">
                { props.HeaderSearch }
              </div>
              <div id="top_my_area">
                { props.HeaderMyMenu }
              </div>
            </div>
          </div>
        </div>
        <div id="container">
          <div id="left_col">
            <div id="category_menu">
              { props.LeftColGnb }
            </div>
            <div id="category">
              { props.LeftColMenu }
            </div>
          </div>
          <div id="section">
            <div id="contents">
              { props.ContentsContainer }
            </div>
          </div>
        </div>
      </div>
      <div id="modal">
        { props.ModalContainer }
      </div>
    </div>
  )
};

App.propTypes = {
  HeaderSearch: React.PropTypes.element.isRequired,
  HeaderMyMenu: React.PropTypes.element.isRequired,
  LeftColGnb: React.PropTypes.element.isRequired,
  LeftColMenu: React.PropTypes.element.isRequired,
  ContentsContainer: React.PropTypes.element.isRequired,
  ModalContainer: React.PropTypes.element.isRequired,
};

const HelpApp = (props) => {
  return (
    <div>
      <div id="wrap">
        <div id="global-header">
          <div className="top_area">
            <div className="top_contents">
              <div id="top_logo">
                <Link className="ui header inverted huge" to="/">
                  <img src="/images/Venacle.png"/>
                </Link>
              </div>
              <div id="top_search">
                { props.HeaderSearch }
              </div>
              <div id="top_my_area">
                { props.HeaderMyMenu }
              </div>
            </div>
          </div>
        </div>
        <div id="container">
          <div id="left_col">
            <div id="category_menu">
              { props.LeftColGnb }
            </div>
            <div id="category">
              { props.LeftColMenu }
            </div>
          </div>
          <div id="section">
            <div id="contents">
              { props.ContentsContainer }
            </div>
          </div>
        </div>
      </div>
      <div id="modal">
        { props.ModalContainer }
      </div>
    </div>
  )
};

HelpApp.propTypes = {
  HeaderSearch: React.PropTypes.element.isRequired,
  HeaderMyMenu: React.PropTypes.element.isRequired,
  LeftColGnb: React.PropTypes.element.isRequired,
  LeftColMenu: React.PropTypes.element.isRequired,
  ContentsContainer: React.PropTypes.element.isRequired,
  ModalContainer: React.PropTypes.element.isRequired,
};

export default (store) => {

  const enhancedHistory = syncHistoryWithStore(browserHistory, store, {
    selectLocationState (state) {
      return state.get('routing').toObject();
    }
  });

  return (
    <Router key={Math.random()} history={enhancedHistory}>
      <Route path="/" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: BestCategoryMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ContentsContainer
          }}/>
      </Route>

      <Route path="/all" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: BestCategoryMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ContentsContainer
          }}/>
      </Route>

      <Route path="/signin" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: SigninMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: SigninContainer
          }}/>
      </Route>

      <Route path="/collection" component={App}>
        <IndexRedirect to="/"/>
      </Route>

      <Route path="/collection/:collectionId" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: CollectionMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: CollectionContentsContainer
          }}/>
      </Route>

      <Route path="/community" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: CommunityContainer
          }}/>

        <Route path="submit"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: SubmitPostMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SubmitContainer
               }}
        />

        <Route path="submit/forum"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: SubmitForumMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SubmitForumContainer
               }}
        />

        <Route path="settings">
          <IndexRoute
            components={{
              HeaderMyMenu: HeaderMyMenu,
              HeaderSearch: HeaderSearch,
              LeftColGnb: LeftColGlobalCategoryNav,
              LeftColMenu: ForumSettingMenu,
              ModalContainer: ModalContainer,
              ContentsContainer: ForumSettingMain
            }}/>

          <Route path="forumprefix" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="foruminfo" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="forumurl" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="announce" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="writepost" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="writecomment" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="share" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="promotion" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="managers" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="banlist" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="spams" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="spamreports" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="stat/forum" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="stat/views" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="stat/visitors" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="stat/likerank" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="stat/commentrank" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

          <Route path="stat/viewrank" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: ForumSettingMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain
          }}/>

        </Route>

      </Route>

      <Route path="/search" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: SearchMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: SearchContainer
          }}
        />
      </Route>

      <Route path="/activity" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: AccountCategoryMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: ActivityContainer
          }}
        />

        <Route path="likes"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: AccountCategoryMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ActivityContainer
               }}
        />

        <Route path="posts"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: AccountCategoryMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ActivityContainer
               }}
        />

        <Route path="comments"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: AccountCategoryMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ActivityContainer
               }}
        />

      </Route>

      <Route path="/user" component={App}>
        <Route path="chargePoint"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: UserPointMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ChargePointContainer
               }}
        />

        <Route path="points"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: UserPointMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: PointListContainer
               }}
        />

        <Route path="points/chargeLog"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: UserPointMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ChargeLogListContainer
               }}
        />

        <Route path="venalinks">
          <IndexRoute
            components={{
              HeaderMyMenu: HeaderMyMenu,
              HeaderSearch: HeaderSearch,
              LeftColGnb: LeftColGlobalCategoryNav,
              LeftColMenu: UserPointMenu,
              ModalContainer: ModalContainer,
              ContentsContainer: VenalinkActiveList
            }}/>

          <Route path="active" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: UserPointMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: VenalinkActiveList
          }}/>

          <Route path="share" components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: UserPointMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: VenalinkShareList
          }}/>
        </Route>
      </Route>

      <Route path="/setting" component={App}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: AccountCategoryMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: SettingContainer
          }}
        />

        <Route path="password"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: AccountCategoryMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SettingContainer
               }}
        />

        <Route path="profile"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: AccountCategoryMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SettingContainer
               }}
        />
      </Route>

      <Route path="/policies" component={HelpApp}>
        <IndexRedirect to="privacy"/>

        <Route path="privacy"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: PolicyMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: PolicyContainer
               }}
        />

        <Route path="terms"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: PolicyMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: PolicyContainer
               }}
        />

      </Route>

      <Route path="/advertisement" component={HelpApp}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: CompanyMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: CompanyContainer
          }}
        />

      </Route>

      <Route path="/about" component={HelpApp}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: CompanyMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: CompanyContainer
          }}
        />

      </Route>

      <Route path="/careers" component={HelpApp}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: CompanyMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: CompanyContainer
          }}
        />

      </Route>

      <Route path="/help" component={HelpApp}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: HelpMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: HelpContainer
          }}
        />

        <Route path="guide"
               components={{
                 HeaderMyMenu: HeaderMyMenu,
                 HeaderSearch: HeaderSearch,
                 LeftColGnb: LeftColGlobalCategoryNav,
                 LeftColMenu: HelpMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: HelpContainer
               }}
        />

      </Route>

      <Route path="/member/find" component={HelpApp}>
        <IndexRoute
          components={{
            HeaderMyMenu: HeaderMyMenu,
            HeaderSearch: HeaderSearch,
            LeftColGnb: LeftColGlobalCategoryNav,
            LeftColMenu: DefaultMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: FindMemberContainer
          }}
        />

      </Route>

      <Route path="*" component={App}>
        <IndexRedirect to="/"/>
      </Route>
    </Router>
  )
}
