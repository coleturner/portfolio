import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { H5 } from '../../Components/Heading';
import Hyperlink from '../../Components/Hyperlink';
import Icon from '../../Components/Icon';
import Paragraph from '../../Components/Paragraph';
import View from '../../Components/View';

export default class SkillBar extends React.Component {
  static propTypes = {
    skill: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.any,
      notes: PropTypes.string,
      rating: PropTypes.number.isRequired
    }).isRequired,
    isAnimated: PropTypes.bool.isRequired
  }

  render() {
    const { skill, isAnimated } = this.props;
    const {
      name,
      rating,
      icon,
      demos = [],
      notes
    } = skill;

    const demoView = demos.map(demo => (
      <Hyperlink key={demo.url} href={demo.url}>{demo.title}</Hyperlink>
    )).reduce((previous, value, index) => {
      return previous.concat(<span key={index}>, </span>).concat(value);
    }, []);

    demoView.shift();

    return (
      <View className={classNames('skill', isAnimated ? 'animate' : null)}>
        <H5>{name}</H5>
        <View className="rating-bar">
          <div className="rating-fill" style={{ width: (rating / 5 * 100) + '%' }}>
            {icon && <Icon symbol={icon} />}
          </div>
        </View>
        {notes && <Paragraph>{notes}</Paragraph>}
      </View>
    );
  }
}
