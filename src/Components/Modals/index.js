/**
 * Created by dobyeongsu on 2016. 11. 4..
 */
import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { UI } from '../../Reducers/InitialStates';
import LoginContainer from '../../Container/Modal/LoginModalContainer';
import ReportContainer from '../../Container/Modal/ReportModalContainer';
import AvatarImageContainer from '../../Container/Modal/AvatarImageContainer';
import DeleteItemContainer from '../../Container/Modal/DeleteModalContainer';
import ShoppingContainer from '../../Container/Modal/ShoppingContainer';
import ActivateVenalinkContainer from '../../Container/Modal/ActivateVenalinkContainer';
import ConfirmPurchaseItemContainer from '../../Container/Modal/ConfirmPurchaseItemContainer';

require('./index.scss');
const ModalBox = React.createClass({
  displayName: 'ModalBox',
  propTypes: {
    FireCloseModal: PropTypes.func.isRequired,
    ModalStore: PropTypes.object.isRequired,
  },

  proxyContainer(type) {
    switch (type) {
      case 'Login':
        return <LoginContainer />;
      case 'Report':
        return <ReportContainer />;
      case 'AvatarImage':
        return <AvatarImageContainer />;
      case 'DeleteItem':
        return <DeleteItemContainer />;
      case 'Shopping':
        return <ShoppingContainer />;
      case 'ActivateVenalink':
        return <ActivateVenalinkContainer />;
      case 'ConfirmPurchaseItem':
        return <ConfirmPurchaseItemContainer />;
      case 'Close':
        return <div></div>;

      default:
        return (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">로딩중..</div>
          </div>
        );
    }
  },
  closeModal() {
    this.props.FireCloseModal();
  },
  createModals(modal, key) {
    const openModal = modal.openModal;
    const contentType = modal.contentType;
    const children = this.proxyContainer(contentType);

    return (
      <Modal
        key={key}
        overlayClassName={'ui dimmer modals page visible active'}
        className={`ui small modal scrolling visible active Content-${contentType}`}
        isOpen={openModal}
        closeTimeoutMS={500}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Modal"
      >
        {children}

      </Modal>
    );
  },
  render() {
    const { ModalStore } = this.props;
    const modals = ModalStore.get('modals');
    const modalsArray = modals.toJS();

    if (modals.size === 0) {
      return <div></div>
    }

    return <div>
      {
        modalsArray.map(this.createModals)
      }
    </div>
  }
});

ModalBox.defaultProps = {
  ModalStore: UI.Modal
};

export default ModalBox;