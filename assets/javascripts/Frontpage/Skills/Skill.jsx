import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Hyperlink from '../../Components/Hyperlink';
import Icon from '../../Components/Icon';

const Title = styled.h5`
  font-weight: 500;
`;

const Rating = styled.div`
  background: #ddd;
  padding: 2px;
  margin-top: 0.25em;
  border-radius: 1em;
  width:  ${({ rating }) => (rating / 5 * 100) + '%'}
`;

const RatingSpan = styled.div`
  background: ${({ theme: { COLORS: { SUCCESS } } }) => SUCCESS};
  height: 1em;
  border-radius: 1em;
  position: relative;
`;

const Skill = styled.div`
  width: 100%;
  min-width: 15em;
  flex-basis: auto;
  margin: 1.5em 0;
  font-size: 1.15em;
  position: relative;
  
  ${({ isAnimated, theme: { ANIMATIONS: { FILL } } }) => 
    `${RatingSpan} {
      max-width: 0%;
      animation: ${FILL} 1s;
      animation-fill-mode: forwards;
    }

    &:nth-child(2n) ${RatingSpan} { animation-delay: 150ms; }`
  }

  ${Icon} {
    max-width: 3em;
    max-height: 3em;
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: tilt 1s;
    animation-fill-mode: forwards;
  }

  @media screen and (min-width: ${BREAKING_POINT}) {
    justify-content: space-between;
  }
`;

const SkillText = styled.p`
  margin-top: 0.5em;
  color: #666;
`;


export default class SkillItem extends React.Component {
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

    return (
      <Skill isAnimated={isAnimated}>
        <Title>{name}</Title>
        <Rating>
          <RatingSpan rating={rating}>
            {icon && <Icon symbol={icon} />}
          </RatingSpan>
        </Rating>
        {notes && <SkillText>{notes}</SkillText>}
      </Skill>
    );
  }
}
