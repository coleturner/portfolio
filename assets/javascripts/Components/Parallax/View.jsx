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
    scale: null,
    src: null
  }

  componentWillMount() {
    this.loadImage(this.props);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, true);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll, true);
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

  onReference = (node) => this.node = node;

  render()  {
    const { children, className } = this.props;
    const {
      scale
    } = this.state;

    const src = this.state.src || this.props.preloadSrc || this.props.src;


    return (
      <div
        ref={this.onReference}
        className={classNames(['panorama', className])}>
        {src === this.props.preloadSrc && <img className="preload" src={src} style={imgStyle} />}
        {src !== this.props.preloadSrc && <img src={src} style={imgStyle} />}
        {children}
      </div>
    );
  }
}
