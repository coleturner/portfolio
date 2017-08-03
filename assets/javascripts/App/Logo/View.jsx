import React from 'react';
import PropTypes from 'prop-types';

export default class Logo extends React.PureComponent {
  static propTypes = {
    animateLogo: PropTypes.bool.isRequired
  };

  componentWillMount() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    if (!this.props.animateLogo) {
      return;
    }

    const [moveX, moveY] = [(e.clientX / -100), (e.clientY / -120)];
    this.node.style.textShadow = `${-moveX/2}px ${-moveY}px rgba(0, 0, 0, 0.1)`;
  }

  onReference = (node) => {
    this.node = node;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { animateLogo, ...otherProps } = this.props;

    return (
      <a ref={this.onReference} {...otherProps} href="/">
        Cole Turner
      </a>
    );
  }
}
