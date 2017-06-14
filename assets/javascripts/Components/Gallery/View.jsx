import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Picture from '../Picture';
import View from '../View';

export default class Gallery extends React.PureComponent {

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          preloadSrc: PropTypes.string
        })
      ])
    ).isRequired
  };

  state = { slideIndex: 0, srcLoaded: [], keepPreloading: false }
  srcTouched = []

  componentWillMount() {
    this.preload(this.props.images[0]);
  }

  componentWillReceiveProps(nextProps) {
    this.preload(nextProps.images[0]);
  }

  toPrevious = () => {
    this.setState(this.stateToPrevious, () => {
      const previousIndex = this.state.slideIndex - 1;
      if (this.state.keepPreloading && previousIndex > 0) {
        this.preload(this.props.images[previousIndex]);
      }
    });
  }

  stateToPrevious = (state) => {
    return {
      slideIndex: Math.max(0, state.slideIndex - 1)
    };
  };

  toNext = () => {
    this.setState(this.stateToNext, () => {
      const previousIndex = this.state.slideIndex + 1;
      if (this.state.keepPreloading && previousIndex > 0) {
        this.preload(this.props.images[previousIndex]);
      }
    });
  }

  stateToNext = (state) => {
    return {
      slideIndex: Math.min(this.props.images.length - 1, state.slideIndex + 1)
    };
  };

  setSlideIndex = (index) => {
    this.setState({
      slideIndex: index
    });
  }

  preload(image) {
    if (!image) { return; }

    const src = typeof image === 'string' ? image : image.src;
    const srcLoaded = [].concat(this.state.srcLoaded);
    if (this.srcTouched.indexOf(src) !== -1) {
      return;
    }

    this.srcTouched.push(src);

    const imageLoader = new Image;
    imageLoader.onload = () => {
      srcLoaded.push(src);
      this.setState({ srcLoaded });
      imageLoader.onload = () => { };
    };

    imageLoader.src = src;
    if (imageLoader.complete) {
      imageLoader.onload();
    }
  }

  preloadPrevious = () => {
    const image = this.props.images[this.state.slideIndex - 1];

    this.setState({
      keepPreloading: true
    });

    if (image) {
      this.preload(image);
    }
  }

  preloadNext = () => {
    const image = this.props.images[this.state.slideIndex + 1];

    this.setState({
      keepPreloading: true
    });

    if (image) {
      this.preload(image);
    }
  }

  stopPreloading = () => {
    this.setState({
      keepPreloading: false
    });
  }

  isSourceLoaded(src) {
    return this.state.srcLoaded.indexOf(src) !== -1;
  }

  render() {
    const { images } = this.props;

    const aspectRatio = images.reduce((value, image) => {
      const width = typeof image === 'string' ? null : image.width;
      const height = typeof image === 'string' ? null : image.height;

      const ratio = width && height && ((height / width * 100));

      return ratio < value ? ratio : value;
    }, 100);


    return (
      <View className="gallery">
        <View
          onMouseOver={this.preloadPrevious}
          onMouseLeave={this.stopPreloading}
          onTouchStart={this.preloadPreviou}
          onClick={this.toPrevious}
          className={`previous${this.state.slideIndex <= 0 ? ' disabled' : ''}`} />
        <View
          onMouseOver={this.preloadNext}
          onMouseLeave={this.stopPreloading}
          onTouchStart={this.preloadNext}
          onClick={this.toNext}
          className={`next${this.state.slideIndex >= this.props.images.length - 1 ? ' disabled' : ''}`}
        />
        <View className="gallery-images">
          <View
            className="scroller"
            style={{
              left: (-1 * this.state.slideIndex * 100) + '%'
            }}>
            {images.map((image, index) => {
              const src = typeof image === 'string' ? image : image.src;
              const preloadSrc = typeof image !== 'string' && image.preloadSrc;

              return (
                <View
                  key={index}
                  className={classNames(
                    'image',
                    this.state.slideIndex === index ? 'active' : null
                  )}
                  style={{
                    paddingBottom: aspectRatio + '%'
                  }}>
                  {preloadSrc && <Picture className="preload" src={preloadSrc} />}
                  {(this.isSourceLoaded(src) || this.state.slideIndex === index) && <Picture src={src} />}
                </View>
              );
            })}
          </View>
        </View>
        <View className="blips">
          {images.length > 1 && images.map((image, index) => {
            return (
              <View
                key={index}
                className={classNames(
                  'blip',
                  this.state.slideIndex === index ? 'active' : null
                )}
                onClick={() => this.setSlideIndex(index)}/>
            );
          })}
        </View>
      </View>
    );
  }
}
