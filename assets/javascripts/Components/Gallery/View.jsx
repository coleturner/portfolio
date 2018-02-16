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

  componentDidMount() {
    // Preload the first and next items
    this.preload(this.props.images[0]);
    this.preload(this.props.images[1]);
  }

  componentWillReceiveProps(nextProps) {
    this.preload(nextProps.images[0]);
  }

  toPrevious = () => {
    this.setState(this.stateToPrevious, this.preloadPrevious);
  }

  preloadPrevious = () => {
    const prevImage = this.props.images[this.state.slideIndex - 1];
    return prevImage && this.preload(prevImage);
  }

  stateToPrevious = (state) => {
    return {
      slideIndex: Math.max(0, state.slideIndex - 1)
    };
  };

  toNext = () => {
    this.setState(this.stateToNext, () => this.preloadNext());
  }

  preloadNext = () => {
    const nextImage = this.props.images[this.state.slideIndex + 1];
    return nextImage && this.preload(nextImage);
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
          onClick={this.toPrevious}
          className={`previous${this.state.slideIndex <= 0 ? ' disabled' : ''}`} />
        <View
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
