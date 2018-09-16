import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

export class Picture extends React.PureComponent {
  static propTypes = {
    backupSrc: PropTypes.string,
    onAlreadyLoaded: PropTypes.func,
    onError: PropTypes.func,
    src: PropTypes.string
  };

  static defaultProps = {
    backupSrc: null,
    onAlreadyLoaded: () => {},
    onError: () => {}
  };

  constructor(...args) {
    super(...args);

    this.boundSetRef = ref => {
      if (ref && ref.complete) {
        this.props.onAlreadyLoaded(ref);
      }

      this.element = ref;
    };

    this.boundOnError = evt => this.onError(evt);
  }

  element = null;

  onError(evt) {
    this.props.onError(evt);

    if (
      this.element &&
      this.props.backupSrc &&
      this.props.src !== this.props.backupSrc
    ) {
      this.element.src = this.props.backupSrc;
    }
  }

  render() {
    const props = this.props;
    const { onAlreadyLoaded, onError, backupSrc, src, ...otherProps } = props;

    return (
      <img
        onError={this.boundOnError}
        ref={this.boundSetRef}
        src={src || backupSrc}
        {...otherProps}
      />
    );
  }
}

export default styled(Picture)``;
