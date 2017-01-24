import React, {
  PropTypes,
} from 'react';
import Select from 'react-select';
import moment from '../../Lib/Moment';
import debug from 'debug';
const paymentLog = debug('vn:api:payment');

require('./index.scss');
const ChargePointBox = React.createClass({
  displayName: 'ChargePointBox',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
    ChargePointStore: PropTypes.object,
    FireRequestCheckPointCharge: PropTypes.func.isRequired,
    FireFailureCheckPointCharge: PropTypes.func.isRequired,
    FireWaitingCheckCharge: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      pay_method: 'trans',
      amount: 11000
    };
  },

  sendPayment() {
    const { UserStore } = this.props;

    const IMP = window.IMP;
    IMP.init('imp27018207');

    IMP.request_pay({
      pg: 'html5_inicis', // version 1.1.0부터 지원.
      /*
       'kakao':카카오페이,
       'inicis':이니시스, 'html5_inicis':이니시스(웹표준결제),
       'nice':나이스,
       'jtnet':jtnet,
       'uplus':LG유플러스
       */
      pay_method: this.state.pay_method, // 'card' : 신용카드 | 'trans' : 실시간계좌이체 | 'vbank' : 가상계좌 | 'phone' : 휴대폰소액결제
      merchant_uid: 'venacle_rp_' + new Date().getTime(),
      name: 'RP 충전',
      vat: this.state.amount * 10 / 11 * 0.1,
      amount: this.state.amount,
      buyer_email: UserStore.get('email'),
      buyer_name: UserStore.get('nick'),
      digital: true,
      vbank_due: moment().add(7, 'days').format('YYYYMMDDhhmm'),
      m_redirect_url: ''
    }, (rsp) => {
      this.props.FireWaitingCheckCharge();

      if (rsp.success) {
        this.props.FireRequestCheckPointCharge(rsp);

        paymentLog(rsp);
      } else {
        this.props.FireFailureCheckPointCharge(rsp);

        paymentLog(rsp);
      }
    });
  },

  changeMethod({ value }) {
    this.setState({
      pay_method: value
    })
  },
  changeAmount({ value }) {
    this.setState({
      amount: value
    })
  },
  render() {
    const { ChargePointStore } = this.props;
    let isRequestCheckCharge, successChargePoint, failureChargePoint, result;

    if (ChargePointStore) {
      isRequestCheckCharge = ChargePointStore.get('isRequestCheckCharge');
      successChargePoint = ChargePointStore.get('successChargePoint');
      failureChargePoint = ChargePointStore.get('failureChargePoint');
      result = ChargePointStore.get('result');
    }

    return (
      <div className="rp_charge" style={{ paddingBottom: 100 }}>
        <div className="ui segment">
          <h3>포인트 안내</h3>
          <p>베나클에서는 TP와 RP를 이용해서 좀 더 재미있고 창의적인 활동을 할 수 있도록 도와줍니다</p>

          <h3>TP</h3>
          <p>
            TP는 커뮤니티의 각종 활동에 의해서 적립되고 소모되는 포인트 입니다.<br />
            TP를 적립할 수 있는 활동으로 각 게시물을 만들거나 댓글에 참여 함으로써 적립할 수 있습니다.
          </p>
          <p>
            또한, 본인이 업로드한 글의 쉐어링크를 통해서 쉐어링크를 통해 들어온 순방문자당 5 포인트씩 실시간으로 적립됩니다.<br />
            그외에 포인트를 사용하여 아이템을 베나클의 각종 아이템을 구입 하실 수 있습니다.
          </p>

          <h3>RP</h3>
          <p>
            RP는 좀더 효과적으로 자신의 글을 웹상에 널리 알리기 위한 포인트 입니다.<br />
            RP를 사용하여 베나링크를 만들 수 있으며 이 베나링크는 자신의 글을 홍보하는데 사용되어지는 예산입니다.<br />
            1 RP는 1원과 같은 가치가 있으며, 활성화한 베나링크를 통해서 들어온 순방문자당 5 포인트씩 소모되어 집니다.
          </p>
          <p>
            본인의 글을 직접 RP를 사용하여 홍보하기 위해서는 최소 1000P 이상의 RP 가 있어야 하며,<br />
            지정한 예산을 초과한 범위에서는 RP가 전혀 감소하지 않습니다.<br />
            또, 만약 베나링크 활성화에 사용한 RP가 모두 소진되지 않더라도 남은 RP는 본인의 계정으로 모두 재 적립 됩니다.<br /><br />

            RP를 적립하기 위한 방법으로 충전을 하거나 다른 사람의 베나링크에 참여하여 웹상에 공유하면,<br />
            그 베나링크를 타고 들어온 순방문자당 일정 포인트씩 적립이 됩니다.<br />
            베나링크 활성화가 끝나게 되면 적립된 RP를 지급 받으실 수 있습니다.
          </p>

          <h3>환불 정책</h3>
          <p>
            베나클의 서비스를 구매할 때 구입한 보조 제품 및 서비스에 즉시 액세스하여 사용할 수 있습니다.<br />
            따라서 아래에 명시된 경우를 제외하고는 구매를 한 후에 취소 할 수있는 권한을 상실하며 결제한 이후 환불이나 크레딧을 제공하지 않습니다.<br />
            베나클은 언제든지 아래 명시된대로 환불 정책을 수정할 권리를 보유합니다. <br />
            이용과정에 기술적 문제가 발생한 경우 고객 지원부 webmaster@venacle.com 에 문의하십시오. 고객 지원부는 문제를 해결하기 위해 귀하와 협력합니다. 고객 지원 센터에서 문제를 해결할 수없는 경우, 구매에 대한 환불을 처리합니다.<br />
            환불의 조건으로, 충전후 귀하의 구입한 제품과 서비스를 사용하지 않았음을 확인하기 위해 귀하에게 비사용 서비스 환불 확인 서약을 서명하도록 요구할 수 있습니다.<br />
            환불은 원래 구매에 사용 된 결제 수단으로 환불됩니다. 환불 금액이 해당 계정에 반영되기까지 영업일 기준 5 일이 소요될 수 있습니다.<br />
            이 베나클의 환불 정책은 구매를 의도하지 않은 경우에 도움을주기위한 것입니다. 그것은 당신이 우리 시스템을 활용할 수있는 방법은 아닙니다. <br />
            우리는 재량에 따라 환불 정책을 남용하고 있음을 발견하면 환불을 거부 할 권리가 있습니다<br />
          </p>
        </div>

        {
          isRequestCheckCharge &&
          <div className="ui segment">
            충전중 확인중...
          </div>
        }

        {
          successChargePoint &&
          <div className="ui segment">

            <div className="ui center aligned container">
              <h3>결제가 완료 되었습니다</h3>
            </div>
            {result.toString()}
          </div>
        }

        {
          failureChargePoint &&
          <div className="ui segment">
            결제 실패
          </div>
        }

        <div className="ui segment">
          <h3>RP 충전하기</h3>
          <div className="rp_charge_form">
            <h3>1. 충전 방법 선택</h3>
            <Select
              options={[
                { value: 'vbank', label: '가상계좌' },
                { value: 'card', label: '신용카드' },
                { value: 'trans', label: '실시간계좌이체' },
                { value: 'phone', label: '휴대폰소액결제' },
              ]}
              value={this.state.pay_method}
              name="select-method"
              onChange={this.changeMethod}
              clearable={false}
            />
            <h3>2. 충전 포인트</h3>
            <Select
              options={[
                { value: 11000, label: '10,000 RP' },
                { value: 33000, label: '30,000 RP' },
                { value: 55000, label: '50,000 RP' },
                { value: 110000, label: '100,000 RP' }
              ]}
              value={this.state.amount}
              name="select-amount"
              onChange={this.changeAmount}
              clearable={false}
            />
            <h3>충전 내역</h3>
            <div style={{ textAlign: 'right' }}>
              내역 (예산 : {this.state.amount * 10 / 11}원 + VAT:{parseInt(this.state.amount, 10)}원)
              <br />
              총 충전 금액 : {parseInt(this.state.amount, 10)}원
            </div>
            <div style={{ paddingTop: 10 }}>
              <div className="ui button primary right fluid" onClick={this.sendPayment}>충전하기</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default ChargePointBox;
