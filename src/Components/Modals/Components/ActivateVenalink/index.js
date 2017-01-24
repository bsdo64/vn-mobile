import React from 'react';
import { browserHistory } from 'react-router';
import moment from '../../../Lib/Moment';
import InputNumber from 'rc-input-number';
import DatePicker from 'react-datepicker';

require('./index.scss');
const ActivateVenalink = React.createClass({
  displayName: 'ActivateVenalink',
  propTypes: {
    UserStore: React.PropTypes.object.isRequired,
    ShareLinkStore: React.PropTypes.object.isRequired,
    Inventories: React.PropTypes.object.isRequired,
    Venatems: React.PropTypes.object.isRequired,
    Items: React.PropTypes.object.isRequired,
    FireRequestActivateVenalink: React.PropTypes.func.isRequired,
    FireToggleVenacleStoreModal: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      venalinkRP: '',
      startDate: moment().add(1, 'days')
    };
  },

  checkMaxRP(v) {
    const { UserStore } = this.props;
    const maxRP = UserStore.get('trendbox').get('R');

    if (v <= maxRP) {
      this.setState({
        venalinkRP: v,
        venalinkRPCheck: true
      });
    }
  },

  handleChangeDate(moment) {

    this.setState({
      startDate: moment
    });
  },

  requestActivateVenalink(activateItem) {
    if (activateItem) {
      const { ShareLinkStore } = this.props;

      if (this.state.venalinkRP > 1000) {
        this.props.FireRequestActivateVenalink({
          total_amount_r: this.state.venalinkRP,
          terminate_at: this.state.startDate,
          post_id: ShareLinkStore.get('venalinkActivateRequestPostId'),
          activate_item_id: activateItem.get('id'),
          active_at: new Date()
        });
      }
    }
  },

  findInventoryItem(user, options) {
    const { Items, Venatems } = this.props;

    if (user && user.get('inventories')) {
      const findItem = Items.find(i => i.get('title') === options.title);

      if (findItem) {
        const findVenatem = Venatems.find(v => v.get('item_id') === findItem.get('id'));

        if (findVenatem) {

          if (findVenatem.get('item_count') > 0) {
            return findItem
          }
        }
      }
    }

    return null;
  },

  openPayment() {
    browserHistory.push('/user/chargePoint');
  },

  toggleStoreModal() {
    this.props.FireToggleVenacleStoreModal({
      contentType: 'Shopping'
    });
  },

  render() {
    const { UserStore } = this.props;
    const activateItem = this.findInventoryItem(
      UserStore, { type: 'community', title: '베나링크 활성화' }
    );

    return (
      <div className="ui items">
        <div className="item">
          <a className="ui tiny image">
            <img src="/images/venacle-item1-venalink.png"/>
          </a>
          {
            activateItem &&
            <div className="middle aligned content">
              <div className="header">
                베나링크 활성화
              </div>
              <div className="description">
                <form className="ui form">
                  <div className="field">
                    <label>
                      예산 RP
                      <div
                        className="ui button tiny"
                        style={{ width: 40, height: 21, padding: 5, marginLeft: 10 }}
                        onClick={this.openPayment}
                      >
                        충전
                      </div>
                    </label>
                    <div className="ui right labeled input">
                      <InputNumber
                        step={100}
                        min={0}
                        max={UserStore.get('trendbox').get('R')}
                        onChange={this.checkMaxRP}
                        type="text"
                      />
                      <div className="ui basic label">
                        RP
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label>활성화 기간</label>
                    <div className="ui input">

                      <DatePicker
                        selected={this.state.startDate}
                        dateFormat="YYYY-MM-DD"
                        onChange={this.handleChangeDate}
                        minDate={moment().add(1, "days")}
                        maxDate={moment().add(1, "month")}
                        placeholderText="기한을 입력하세요"/>
                    </div>
                  </div>
                  <div className="field">
                    <div>
                      RP : {UserStore.get('trendbox').get('R')}
                      => {UserStore.get('trendbox').get('R') - this.state.venalinkRP}
                    </div>
                  </div>
                  <div className="ui button primary" onClick={this.requestActivateVenalink.bind(this, activateItem)}>
                    활성화
                  </div>
                </form>
              </div>
            </div>
          }
          {
            !activateItem &&
            <div className="middle aligned content">
              <div className="header" >
                현재 인벤토리에 사용가능한 베나링크 활성화 아이템이 없습니다
              </div>
              <div className="extra">
                <div className="ui label">
                  <a onClick={this.toggleStoreModal}>베나링크 활성화 구입하기 (50 TP)</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
});

export default ActivateVenalink;
