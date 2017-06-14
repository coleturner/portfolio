import React from 'react';

import Logo from '../Logo';
import Hyperlink from '../../Components/Hyperlink';
import View from '../../Components/View';

export default class HeaderView extends React.PureComponent {
  state = { sticky: false }

  componentWillMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (!this.node) {
      return;
    }

    if (document.body.scrollTop > this.node.offsetHeight) {
      if (!this.state.sticky) {
        this.setState({ sticky: true });
      }
    } else if (this.state.sticky) {
      this.setState({ sticky: false });
    }
  }

  logo() {
    if (document.body.className.indexOf('index') === -1) {
      return (
        <View className="brand">
          <Logo />
        </View>
      );
    }

    return (
      <h1 className="brand">
        <Logo />
      </h1>
    );
  }

  onReference = (node) => {
    this.node = node;
  }

  render() {
    return (
      <header
        ref={this.onReference}
        id="app-header"
        className={this.state.sticky ? 'sticky' : null}>
        <View id="brand-header">
          <View className="container">
            {this.logo()}
            <nav id="navigation">
              <View className="navigation-main">
                <Hyperlink path="/">Portfolio</Hyperlink>
                <Hyperlink path="resume">Resumé</Hyperlink>
                <Hyperlink href="https://medium.com/@colecodes">Blog</Hyperlink>
              </View>
            </nav>
          </View>
        </View>
      </header>
    );
  }
}
