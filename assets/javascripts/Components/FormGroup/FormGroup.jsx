import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FormGroup extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ])
  }

  state = { focus: false }

  componentDidMount() {
    this.node.addEventListener('focus', this.onFocus, true);
    this.node.addEventListener('blur', this.onBlur, true);
  }

  onFocus = () => {
    this.setState({ focus: true });
  }

  onBlur = () => {
    this.setState({ focus: false });
  }

  onReference = (node) => {
    this.node = node;
  }

  render() {
    const { children, className, ...otherProps } = this.props;

    return (
      <div
        ref={this.onReference}
        className={classNames(
          'form-group',
          this.state.focus ? 'focus' : null,
          className
        )}
        {...otherProps}>
        {children}
      </div>
    );
  }
}
