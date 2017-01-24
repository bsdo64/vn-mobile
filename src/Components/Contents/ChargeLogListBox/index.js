import React, {
  PropTypes,
} from 'react';
import accounting from 'accounting';
import moment from '../../Lib/Moment';

const ChargeLogListBox = React.createClass({
  displayName: 'ChargePointBox',
  propTypes: {
    UserStore: PropTypes.object.isRequired,
  },

  paymentTime(payment) {
    const momentTime = moment(payment.get('paid_at'));
    const unixTime = momentTime.unix();

    let time;
    switch (unixTime) {
      case 0: {
        time = '';
        break;
      }

      default: {
        time = momentTime.format('YYYY/MM/DD HH:mm')
      }
    }

    return time;
  },

  paymentStatus(payment) {
    const status = payment.get('status');

    let paymentStatus;
    switch (status) {
      case 'paid': {
        paymentStatus = '결제 완료';
        break;
      }

      case 'ready': {
        paymentStatus = '입금 대기중 ..';
        break;
      }

      case 'cancelled': {
        paymentStatus = '결제 취소';
        break;
      }

      case 'failed': {
        paymentStatus = '결제 실패';
        break;
      }

      default: {
        paymentStatus = ''
      }
    }

    return paymentStatus;
  },

  paymentMethod(payment) {
    const method = payment.get('pay_method');

    let paymentMethod;
    switch (method) {
      case 'trans': {
        paymentMethod = '계좌이체';
        break;
      }

      case 'card': {
        paymentMethod = '신용카드';
        break;
      }

      case 'vbank': {
        paymentMethod = <a>가상계좌</a>;
        break;
      }

      default: {
        paymentMethod = ''
      }
    }

    return paymentMethod;
  },

  render() {
    const { UserStore } = this.props;
    const payments = UserStore.get('payments');

    if (!payments) {
      return <div />
    }

    return (
      <div style={{ padding: 10, fontSize: 12 }}>
        <h4>RP 충전 내역</h4>
        <table className="ui celled padded table">
          <thead>
          <tr>
            <th className="single line">주문 ID</th>
            <th>주문 RP</th>
            <th>주문 내역</th>
            <th>결제 가격</th>
            <th>결제 시간</th>
            <th>결제 수단</th>
            <th>상태</th>
          </tr>
          </thead>
          <tbody>
          {
            payments.map(payment => {
              return (
                <tr key={payment.get('id')}>
                  <td>
                    {payment.get('merchant_uid')}
                  </td>
                  <td className="single line">
                    {
                      accounting.formatNumber(payment.get('amount') * 10 / 11)
                    } RP
                  </td>
                  <td>
                    {payment.get('name')}
                  </td>
                  <td className="right aligned">
                    {
                      accounting.formatNumber(payment.get('amount'))
                    } 원
                  </td>
                  <td className="right aligned">
                    {
                      this.paymentTime(payment)
                    }
                  </td>
                  <td>
                    {
                      this.paymentMethod(payment)
                    }
                  </td>
                  <td className="right aligned">
                    {
                      this.paymentStatus(payment)
                    }
                  </td>
                </tr>
              )
            })
          }
          </tbody>
          <tfoot>
          <tr>
            <th colSpan="7">
            <div className="ui right floated pagination menu">
              <a className="icon item">
                <i className="left chevron icon"></i>
              </a>
              <a className="item">1</a>
              <a className="item">2</a>
              <a className="item">3</a>
              <a className="item">4</a>
              <a className="icon item">
                <i className="right chevron icon"></i>
              </a>
            </div>
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    )
  }
});

export default ChargeLogListBox;
