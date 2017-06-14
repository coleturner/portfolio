import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { H2, H3 } from '../Components/Heading';
import Hyperlink from '../Components/Hyperlink';
import Picture from '../Components/Picture';
import View from '../Components/View';

export default class FrontpageRecentProjects extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { title, projects } = this.props;

    return (
      <View className="recent-projects">
        <H2>{title}</H2>
        <View className="project-list">
          {projects.map(({ previewImage, name, tags, url }, index) => {
            const Component = !!url ? Hyperlink : View;
            const props = Component === Hyperlink ? { href: url } : {};

            const classes = [];
            let image = `${previewImage.file.url}`;

            if (index === 0) {
              classes.push('feature');
              image += '?w=600';
            } else if (index === 1) {
              classes.push('subfeature');
              image += '?w=600';
            } else if (index === 2) {
              classes.push('leftside');
              image += '?h=600';
            } else if (index === 3) {
              classes.push('rightside');
              image += '?h=600';
            }


            return (
              <Component
                className={classNames('glance', classes)}
                key={index}
                {...props}>
                <Picture className="preload" src={previewImage.file.url + '?w=30'} />
                <Picture src={image} />
                <View className="card">
                  <H3>{name}</H3>
                  <View className="tags">
                    {tags.map(tag => <span key={tag}>{tag}</span>)}
                  </View>
                </View>
              </Component>
            );
          })}
        </View>
      </View>
    );
  }
}
