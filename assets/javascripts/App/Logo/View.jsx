import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import PORTRAIT_IMAGE from '../../../images/portrait.jpg';

const Portrait = styled.img`
  height: 1.6em;
  width: 1.6em;
  border-radius: 12em;
  object-fit: cover;
  object-position: center center;
  margin-right: 0.3em;

  @media screen and (max-width: 500px) {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.3em;
  }
`;

export default class Logo extends React.PureComponent {
  static propTypes = {
    animateLogo: PropTypes.bool.isRequired
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = e => {
    if (!this.props.animateLogo) {
      return;
    }

    const [moveX, moveY] = [e.clientX / -100, e.clientY / -120];
    this.node.style.textShadow = `${moveX / 2}px ${moveY}px rgba(0, 0, 0, 0.1)`;
    this.portrait.style.boxShadow = `${moveX /
      2}px ${moveY}px rgba(0, 0, 0, 0.1)`;
  };

  onLinkReference = node => {
    this.node = node;
  };

  onPortraitReference = node => {
    this.portrait = node;
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { animateLogo, ...otherProps } = this.props;

    return (
      <a ref={this.onLinkReference} {...otherProps} href="/">
        <Portrait
          innerRef={this.onPortraitReference}
          src={PORTRAIT_IMAGE}
          alt=""
        />
        Cole Turner
      </a>
    );
  }
}
