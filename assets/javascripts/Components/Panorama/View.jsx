import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';


export default class Panorama extends React.PureComponent {

  static propTypes = {
    className: PropTypes.any,
    children: PropTypes.node,
    pannable: PropTypes.bool,
    preloadSrc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  };

  state = {
    isPanning: false,
    x: null,
    src: null,
    anchor: null
  }

  componentWillMount() {
    this.loadImage(this.props);
  }

  componentDidMount() {
    document.addEventListener('touchstart', this.activatePanning, true);
    document.addEventListener('touchmove', this.onTouchMove, true);
    document.addEventListener('touchend', this.onTouchEnd, true);
    document.addEventListener('mouseover', this.onMouseOver, true);
    document.addEventListener('mousemove', this.onMouseMove, true);
    document.addEventListener('mouseout', this.onMouseOut, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.activatePanning, true);
    document.removeEventListener('touchmove', this.onTouchMove, true);
    document.removeEventListener('touchend', this.onTouchEnd, true);
    document.removeEventListener('mouseover', this.onMouseOver, true);
    document.removeEventListener('mousemove', this.onMouseMove, true);
    document.removeEventListener('mouseout', this.onMouseOut, true);
  }

  componentWillReceiveProps(nextProps) {
    this.loadImage(nextProps);
  }

  loadImage = (props) => {
    if (props.preloadSrc) {
      const preimageLoader = new Image;
      preimageLoader.src = props.preloadSrc;
    }

    const imageLoader = new Image;
    imageLoader.onload = () => {
      this.setState({ src: props.src });
    };

    imageLoader.src = props.src;
    if (imageLoader.complete) {
      imageLoader.onload();
    }
  }

  activationTimeout = null
  activatePanning = () => {
    this.activationTimeout = setTimeout(() => {
      this.setState({ isPanning: true });
    }, 1000);
  }

  deactivatePanning = () => {
    clearTimeout(this.activationTimeout);
    this.setState({ isPanning: false });
  }

  getPositionProperties(x, y) {
    const normalX = Math.min(-20, Math.max(-75, -1 * x)) + '%';

    return {
      x: normalX,
      anchor: x + '%'
    };
  }

  onTouchMove = (e) => {
    if (!this.state.isPanning || !this.node) {
      return;
    }

    const touch = e.touches[0];
    if (!touch) {
      return;
    }

    const bounds = this.node.getBoundingClientRect();
    const x = Math.ceil(((touch.clientX - bounds.left) / bounds.width) * 100);
    const y = Math.ceil(((touch.clientY - bounds.top) / bounds.height) * 100);

    this.setState(this.getPositionProperties(x, y));
  }

  onTouchEnd = (e) => {
    this.onMouseOut(e);
  }

  onMouseOver = () => {
    clearTimeout(this.resetTimeout);
  }

  onMouseOut = () => {
    this.setState({
      isPanning: false,
    });

    this.resetTimeout = setTimeout(() => {
      this.setState({
        backgroundPositionX: null,
        objectPositionX: null
      });
    }, 10 * 1000);
  }

  onMouseMove = (e) => {
    if (!this.node || !this.node.parentNode) { return; }

    if (e.target !== this.node && !this.node.parentNode.contains(e.target)) {
      return;
    }

    const bounds = this.node.getBoundingClientRect();
    const x = Math.ceil(((e.clientX - bounds.left) / bounds.width) * 100);

    requestAnimationFrame(() => {
      this.setState(this.getPositionProperties(x));
    });
  }

  onReference = (node) => this.node = node;

  render()  {
    const { children, className } = this.props;
    const {
      anchor,
      x
    } = this.state;

    const src = this.state.src || this.props.preloadSrc || this.props.src;

    const imgStyle = {
      transform: `translateX(${x})`
    };

    const anchorStyle = {
      left: anchor
    };

    return (
      <div
        ref={this.onReference}
        className={classNames(['panorama', className])}>
        {src === this.props.preloadSrc && <img className="preload" src={src} style={imgStyle} />}
        {src !== this.props.preloadSrc && <img src={src} style={imgStyle} />}
        {children}
        <span
          className="anchor"
          style={anchorStyle}
        />
      </div>
    );
  }
}
