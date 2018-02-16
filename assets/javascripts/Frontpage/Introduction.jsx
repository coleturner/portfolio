import React from 'react';

import Hyperlink from '../Components/Hyperlink';
import Panorama from '../Components/Panorama';
import View from '../Components/View';

export default class FrontpageIntroduction extends React.Component {
  componentDidMount() {
    this.maxHeight = screen.height || window.innerHeight;
    document.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    const [moveX, moveY] = [(((window.innerWidth / 2) - e.clientX) / -100), (e.clientY / -100)];
    this.node.style.textShadow = `${-moveX}px ${-moveY /2}px 5px rgba(254, 255, 190, 0.45)`;
    this.node.style.transform = `translate3d(${-moveX}px, 0, 0)`;
  }

  onReference = (node) => {
    this.node = node;
  }

  render() {
    const { text, panoramaImage } = this.props;

    return (
      <View className="introduction">
        <Panorama
          src={panoramaImage.file.url + '?h=' + this.maxHeight}
          preloadSrc={panoramaImage.file.url + '?w=30&h=30'}
        />
        <div ref={this.onReference} className="container">
          <p  dangerouslySetInnerHTML={{ __html: text }} />

          <View className="actions">
            <Hyperlink className="button" path="resume">Resumé</Hyperlink>
          </View>

        </div>
      </View>
    );
  }
}
