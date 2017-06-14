import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-mini';

import { H5 } from '../Heading';
import Hyperlink from '../Hyperlink';
import Paragraph from '../Paragraph';
import Picture from '../Picture';
import View from '../View';


const tooClose = (event, _event) => {
  return (event.left + event.width === _event.left) ||
         (event.left === _event.left + _event.width);
};

const overlap = (event, _event) => {
  return (event.left <= _event.left && event.left + event.width >= _event.left + _event.width) ||
         (event.left >= _event.left && event.left <= _event.left + _event.width);
};

const neighbors = (event, _event) => {
  return overlap(event, _event) || tooClose(event, _event);
};

export default class Timeline extends React.PureComponent {
  static propTypes = {
    events: PropTypes.array.isRequired,
    flexBasis: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    gutter: PropTypes.number.isRequired,
  }

  static defaultProps = {
    flexBasis: 10,
    lineHeight: 15,
    gutter: 5
  }

  constructor(...args) {
    super(...args);
    this.calculateData(this.props);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillReceiveProps(nextProps) {
    this.calculateData(nextProps);
  }

  state = {
    slideIndex: 0,
    isPanning: false,
    positionX: '0px', // this may also be percentage
    positionStart: 0,
    baseX: '0px' // this may also be percentage
  }

  calculateData(props) {
    const { events } = props;

    const currentYear = (new Date()).getFullYear();

    const years = Array.from(
      new Set(
        events.reduce((previous, event) => {
          const start = event.started ? parseInt(moment(event.started).format('Y'), 10) : currentYear;
          const end = event.ended ? parseInt(moment(event.ended).format('Y'), 10) : currentYear;
          return [
            ...previous,
            start,
            end
          ];
        }, currentYear)
    )).sort().reduce((previous, year) => {
      const gap = [];
      const lastYear = Array.from(previous)[previous.length - 1];

      let i = year;
      while (i > lastYear) {
        gap.push(i--);
      }

      gap.shift();

      return [
        ...previous,
        ...gap.reverse(),
        year
      ];
    }, []).concat([currentYear + 1]).reverse();

    const positionedEvents = events.sort((a, b) => {
      if (a.default === true) {
        return -1;
      } else if (b.default === true) {
        return 1;
      }

      const Astart = moment(a.started);
      const Aend = a.ended ? moment(a.ended) : null;

      const Bstart = moment(b.started);
      const Bend = b.ended ? moment(b.ended) : null;

      if (!Bend && !Aend) {
        if (Astart === Bstart) {
          return 0;
        }

        return Astart > Bstart ? -1 : 1;
      } else if (Aend && !Bend) {
        return 1;
      } else if (Bend && !Aend) {
        return -1;
      }

      return Astart > Bstart ? -1 : 1;
    }).reduce((previous, event) => {
      const stop = parseInt(moment(event.started).format('Y'), 10);
      const start = event.ended ? parseInt(moment(event.ended).format('Y'), 10) : years[0];
      const stopIndex = years.indexOf(stop);
      const startIndex = years.indexOf(start);

      event.left = startIndex * props.flexBasis;
      event.width = Math.max(1, stopIndex - startIndex) * props.flexBasis;

      const lineIndexes = previous
        .filter(_event => neighbors(event, _event))
        .map(_event => _event.row).sort();

      event.row = !lineIndexes.length ? 0 : lineIndexes.reduce((_previous, row) => {
        if (row - _previous === 1) {
          return row;
        }

        return _previous;
      }, -1) + 1;

      event.top = event.row * (props.lineHeight + props.gutter);

      return [
        ...previous,
        event
      ];
    }, []);

    const [ maxWidth, minHeight ] = positionedEvents.reduce((previous, value) => {
      const top = value.top + props.lineHeight;
      const width = value.left + value.width;
      return [
        width > previous[0] ? width : previous[0],
        top > previous[1] ? top : previous[1]
      ];
    }, [0, 0]);

    this.years = years;
    this.positionedEvents = positionedEvents;
    this.maxWidth = maxWidth;
    this.minHeight = minHeight;
  }

  onMouseDown = (e) => {
    this.setState({ isPanning: true, positionStart: e.clientX });
  }

  onTouchStart = (e) => {
    const touch = e.touches[0];
    if (!touch) {
      return;
    }

    this.setState({ isPanning: true, positionStart: touch.clientX });
  }

  onTouchMove = (e) => {
    if (!this.state.isPanning) {
      return;
    }

    const touch = e.touches[0];
    if (!touch) {
      return;
    }

    const difference = touch.clientX - this.state.positionStart;
    this.setState({ positionX: Math.min(0, this.state.baseX + difference) + 'px' });
  }

  onTouchEnd = (e) => {
    this.onMouseUp(e);
  }

  onMouseMove = (e) => {
    if (!this.state.isPanning) {
      return;
    }

    const rulerWidth = e.currentTarget.getBoundingClientRect().width;

    const max = typeof e.currentTarget.querySelectorAll === 'function'
      ? Array.from(e.currentTarget.querySelectorAll('.activity')).reduce((previous, element) => {
        const bounds = element.getBoundingClientRect();
        return Math.max(previous, bounds.left + bounds.width);
      }, 0) : null;

    const baseX =
      this.state.baseX.indexOf('%') !== -1
        ? Math.round((parseInt(this.state.baseX, 10) / 100) * rulerWidth)
        : parseInt(this.state.baseX, 10);

    const positionX =
      this.state.positionX.indexOf('%') !== -1
        ? Math.round((parseInt(this.state.positionX, 10) / 100) * rulerWidth)
        : parseInt(this.state.positionX, 10);

    const difference = e.clientX - this.state.positionStart;
    if (
      max + this.props.gutter < rulerWidth &&
      baseX + difference < positionX
    ) {
      return;
    }

    this.setState({ positionX: Math.min(0, baseX + difference) + 'px' });
  }

  onMouseUp = () => {
    setTimeout(() => {
      this.setState({
        isPanning: false,
        baseX: this.state.positionX
      });
    }, 10);
  }

  toPrevious = () => {
    this.setState(this.stateToPrevious);
  }

  stateToPrevious = (state) => {
    const event = this.positionedEvents[state.slideIndex - 1];
    const positionX = event ? -1 * event.left + '%' : state.positionX;

    return {
      slideIndex: Math.max(0, state.slideIndex - 1),
      positionX
    };
  };

  toNext = () => {
    this.setState(this.stateToNext);
  }

  stateToNext = (state) => {
    const event = this.positionedEvents[state.slideIndex + 1];
    const positionX = event ? -1 * event.left + '%' : state.positionX;

    return {
      slideIndex: Math.min(this.positionedEvents.length - 1, state.slideIndex + 1),
      positionX
    };
  };

  setSlideIndex = (index) => {
    const event = this.positionedEvents[index];
    const positionX = event ? -1 * event.left + '%' : this.state.positionX;

    this.setState({
      slideIndex: index,
      positionX
    });
  }


  render()  {
    const {
      minHeight,
      maxWidth,
      positionedEvents,
      years
    } = this;


    return (
      <View
        className="timespan container">
        <View
          onClick={this.toPrevious}
          className={`previous${this.state.slideIndex <= 0 ? ' disabled' : ''}`} />
        <View
          onClick={this.toNext}
          className={`next${this.state.slideIndex >= positionedEvents.length - 1 ? ' disabled' : ''}`}
        />
        <View className="gallery">
          <View
            className="scroller"
            style={{
              left: (-1 * this.state.slideIndex * 100) + '%'
            }}>
            {positionedEvents.map(({ abstract, image, name, moreLink }, index) => {

              return (
                <View
                  className={'activity' + (this.state.slideIndex === index ? ' focus' : '')}
                  key={index}>
                  <View className="content">
                    {image && (
                      <View className="image">
                        <Picture
                          src={image} />
                      </View>
                    )}
                    <View className="card">
                      <H5>{name}</H5>
                      <Paragraph>{abstract}</Paragraph>
                      {moreLink && (
                        <Hyperlink className="external-link" href={moreLink.url}>{moreLink.text}</Hyperlink>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          onTouchStartCapture={this.onTouchStart}
          onTouchMoveCapture={this.onTouchMove}
          onTouchEndCapture={this.onTouchEnd}
          onMouseDownCapture={this.onMouseDown}
          onMouseMoveCapture={this.onMouseMove}
          onMouseUpCapture={this.onMouseUp}
          className="browser">
          <View
            className="ruler"
            style={{
              left: (this.state.positionX)
            }}>
            <View className="plot"
              style={{
                minHeight: minHeight
              }}>
              {positionedEvents.map(({ name, top, left, width }, index) => {
                const style = {
                  position: 'absolute',
                  top: top + 'px',
                  left: left + '%',
                  width: width + '%'
                };

                return (
                  <View
                    key={index}
                    className={'activity' + (this.state.slideIndex === index ? ' focus' : '')}
                    style={style}
                    onClick={() => this.setSlideIndex(index)}>
                    <span>{name}</span>
                  </View>
                );
              })}
            </View>
            <View className="markers" style={{ minWidth: maxWidth + '%' }}>
              {years.map(year => (
                <View
                  className="marker"
                  style={{
                    flexBasis: this.props.flexBasis + '%'
                  }}
                  key={year}>
                  {year}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
