import React from 'react';
import classNames from 'classnames';

import View from '../View';

import ifDocument from '../../ifDocument';

export default class Dropdown extends React.PureComponent {
  static propTypes = {
    activeClassName: React.PropTypes.any,
    className: React.PropTypes.any,
    inactiveClassName: React.PropTypes.any,
    children: React.PropTypes.node.isRequired,
    toggle: React.PropTypes.node.isRequired,
    trigger: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    activeClassName: 'open',
    inactiveClassName: null,
    trigger: 'click'
  }

  constructor(...args) {
    super(...args);
    this.boundOnClick = (e) => this.onClick(e);
    this.boundDocumentClick = (e) => this.onDocumentClick(e);
    this.boundOnMouseOver = (e) => this.onMouseOver(e);
    this.boundOnMouseOut = (e) => this.onMouseOut(e);
  }

  state = { isMenuVisible: false }
  node = null
  menu = null

  componentWillMount() {
    ifDocument(() => document.addEventListener('click', this.boundDocumentClick, true));
  }

  componentWillUnmount() {
    ifDocument(() => document.removeEventListener('click', this.boundDocumentClick));
  }

  componentDidUpdate() {
    // Check if out of bounds
    if (this.menu && this.state.isMenuVisible) {
      const bounds = this.menu.getBoundingClientRect();
      if (bounds.left + bounds.width > window.innerWidth) {
        this.menu.style.marginLeft = (window.innerWidth - bounds.left + bounds.width) + 'px';
      } else if (bounds.left < 0) {
        this.menu.style.marginLeft = Math.abs(bounds.left) + 'px';
      }
    }
  }

  onDocumentClick(e) {
    if (!this.node) {
      return;
    }

    let node = e.target;
    while (node) {
      if (node === this.node) {
        return;
      }

      node = node.parentNode;
    }

    this.setState({ isMenuVisible: false });
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const isMenuVisible = !this.state.isMenuVisible;
    this.setState({ isMenuVisible });
  }

  mouseOutTimeout = null

  onMouseOver(e) {
    clearTimeout(this.mouseOutTimeout);
    const isMenuVisible = !this.state.isMenuVisible;

    if (isMenuVisible) {
      this.setState({ isMenuVisible });
    }
  }

  onMouseOut(e) {
    this.mouseOutTimeout = setTimeout(() => {
      const isMenuVisible = false;
      this.setState({ isMenuVisible });
    }, 100);
  }

  render() {
    const containerTrigger = this.props.trigger === 'hover' ? { onMouseOver: this.boundOnMouseOver, onMouseOut: this.boundOnMouseOut } : {};
    const toggleTrigger = this.props.trigger === 'click' ? { onClick: this.boundOnClick } : {};

    return (
      <div
        ref={(node) => { this.node = node; }}
        className={classNames('dropdown', this.state.isMenuVisible ? this.props.activeClassName : this.props.inactiveClassName, this.props.className)} {...containerTrigger}>
        <View className="toggle-container" {...toggleTrigger}>{this.props.toggle}</View>
        {this.state.isMenuVisible ?
          (<div ref={(node) => { this.menu = node; }} className="menu">{this.props.children}</div>) : null}
      </div>
    );
  }
}
