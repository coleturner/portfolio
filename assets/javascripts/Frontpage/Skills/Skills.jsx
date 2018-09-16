import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Skill from './Skill';
import Container from '../../Components/Container';

const BREAKING_POINT = '700px';

const Skills = styled('div')`
  padding: 6em 0;
  hr {
    margin: 3em auto;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 500;

  strong {
    font-weight: 900;
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (min-width: ${BREAKING_POINT}) {
    justify-content: space-between;
  }

  ${Skill} {
    flex: 1;
  }
`;

const Misc = styled.div`
  font-size: 1.15em;
`;

const MiscTitle = styled.h6`
  font-weight: 500;
`;

const SkillLabel = styled.span`
  background: #eee;
  color: #666;
  padding: 0.45em 1em;
  line-height: 1;
  border-radius: 10em;
  display: inline-block;
  margin-right: 0.45em;
  margin-bottom: 0.45em;
`;

export default class FrontpageSkills extends React.Component {
  static propTypes = {
    skills: PropTypes.array.isRequired
  };

  state = { animatedIndexes: [] };

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onReference = node => {
    this.node = node;
  };

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
  };

  render() {
    const { skills } = this.props;
    const skillsWithRating = skills.filter(s => s.rating);
    const skillsWithoutRating = skills.filter(s => !!!s.rating);

    return (
      <Skills ref={this.onReference}>
        <Container>
          <Title>
            I <strong>enjoy</strong> working with
          </Title>

          <SkillList>
            {skillsWithRating.map((skill, index) => {
              return (
                <Skill
                  key={index}
                  skill={skill}
                  isAnimated={this.state.animatedIndexes.indexOf(index) !== -1}
                />
              );
            })}
          </SkillList>

          {skillsWithoutRating && (
            <Misc>
              <MiscTitle>Miscellaneous skills</MiscTitle>
              {skillsWithoutRating.map(skill => (
                <SkillLabel key={skill.name}>{skill.name}</SkillLabel>
              ))}
            </Misc>
          )}
        </Container>
      </Skills>
    );
  }
}
