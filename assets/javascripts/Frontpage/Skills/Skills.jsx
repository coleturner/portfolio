import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../../Components/Flex';
import { H2, H6 } from '../../Components/Heading';
import SkillBar from './SkillBar';
import View from '../../Components/View';

export default class FrontpageSkills extends React.Component {
  static propTypes = {
    skills: PropTypes.array.isRequired
  }

  state = { animatedIndexes: [] }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onReference = (node) => {
    this.node = node;
  }

  onScroll = () => {
    const elements = Array.from(this.node.querySelectorAll('.skill'));
    this.setState({
      animatedIndexes: elements.reduce((acc, element) => {
        if (element.getBoundingClientRect().top - window.innerHeight < 0) {
          return acc.concat(elements.indexOf(element));
        }

        return acc;
      }, [])
    });
  }

  render() {
    const { skills } = this.props;
    const skillsWithRating = skills.filter(s => s.rating);
    const skillsWithoutRating = skills.filter(s => !!!s.rating);


    return (
      <div ref={this.onReference} className="skills">
        <View className="container">
          <H2>I <strong>enjoy</strong> working with</H2>

          <Flex className="skill-list">
            {skillsWithRating.map((skill, index) => {
              return (
                <SkillBar
                  key={index}
                  skill={skill}
                  isAnimated={this.state.animatedIndexes.indexOf(index) !== -1}
                />
              );
            })}
          </Flex>

          {skillsWithoutRating && (
            <View className="other-skills">
              <H6>Miscellaneous skills</H6>
              {skillsWithoutRating.map(skill => <span className="tag" key={skill.name}>{skill.name}</span>)}
            </View>
          )}

        </View>
      </div>
    );
  }
}
