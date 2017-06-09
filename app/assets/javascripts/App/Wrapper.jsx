import React from 'react';
import Modal from 'react-modal';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import View from '../Components/View';

export default class AppWrapper extends React.PureComponent {
  previousChildren = null

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const { state: locationState = {} } = location;
    const { modal } = locationState;

    if (nextProps.location.key !== this.props.location.key) {
      if (modal) {
        this.previousChildren = this.props.children;
      } else {
        this.previousChildren = null;
      }
    }
  }

  children() {
    const { props } = this;
    const { children, location } = props;
    const { state: locationState = {} } = location;
    const { modal } = locationState;

    if (this.previousChildren && modal) {
      const modalProps = Object.assign({
        isOpen: true,
        contentLabel: 'Popup',
        portalClassName: 'modal-portal',
        overlayClassName: 'modal-overlay',
        className: 'modal-content'
      }, modal === true ? {} : modal);

      return (
        <Modal
          {...modalProps}>
          {children}
        </Modal>
      );
    }

    return children;
  }

  render() {
    const { props } = this;

    return (
      <View className="application-wrapper">
        <Header />
        <Main>
          {this.children()}
          {this.previousChildren || null}
        </Main>
        <Footer />
      </View>
    );
  }
}
