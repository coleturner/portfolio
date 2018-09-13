import React from 'react';
import PropTypes from 'prop-types';
import styled, { cx } from 'react-emotion';

import Hyperlink from '../Components/Hyperlink';
import Picture from '../Components/Picture';
import View from '../Components/View';

const BREAKING_POINT = '1200px';

const RecentProjects = styled.div`
  position: relative;
  z-index: 2;

  @media screen and (min-width: ${BREAKING_POINT}) {
    background: #fafafa;
    padding: 6em 0;
  }
`;

const STYLE_PROJECT = css`
  text-align: center;
  transition: all 150ms ease;
  overflow: hidden;
  position: relative;
  display: block;
  width: 100%;
  align-self: stretch;
  outline: none;
  min-height: 21em;

  @supports not (display: grid) {
    flex-basis: 30%;
    flex-basis: calc(100% / 3 - 4px);
    margin: 2px;
  }

  ${Picture} {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 300ms ease;
    z-index: 2;
  }

  &::before {
    background: rgba(0, 0, 0, 0.35);
    mix-blend-mode: multiply;
    opacity: 0.65;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    content: " ";
    transition: all 150ms ease;
  }

  &:nth-child(4n + 1) {
    &::before {
      background: #ff571d;
      background: linear-gradient(90deg, #d64759 10%, #da7352 90%);
    }

    .tags {
      color: #d64759;
    }
  }

  &:nth-child(4n + 2) {
    &::before {
      background: #19dd7f;
      background: linear-gradient(90deg, #7bbbb0 10%, #8dc35c 90%);
    }

    .tags {
      color: #8dc35c;
    }
  }

  &:nth-child(4n + 3) {
    &::before {
      background: #2390d7;
      background: linear-gradient(90deg, #38aecc 10%, #347fb9 90%);
    }

    .tags {
      color: #347fb9;
    }
  }

  &:nth-child(4n) {
    &::before {
      background: #ff9b1d;
      background: linear-gradient(90deg, #fd6f46 10%, #fb9832 90%);
    }

    .tags {
      color: #ff9b1d;
    }
  }


  &:hover {
    h3 {
      opacity: 1;
    }

    ${Picture} {
      transform: scale(1.2);
    }

    &::before {
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2px;
  position: relative;
  z-index: 6;

  @media screen and (max-width: ${BREAKING_POINT}) {
    padding: 2vh 0;
    background: #555;
    background: linear-gradient(90deg, #00537e 10%, #3aa17e 90%);
    color: #fff;

    &::after,
    &::before {
      position: absolute;
      left: 50%;
      top: 100%;
      content: " ";
      border: 15px solid transparent;
      transform: translateX(-50%);
    }

    &::before {
      border-top-color: #fff;
      border-width: 18px;
      z-index: 2;
    }

    &::after {
      border-top-color: #1e7b7e;
      z-index: 3;
    }
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @supports (display: grid) {
    display: grid;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    justify-items: center;
    align-items: center;
    grid-auto-flow: row;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      "feature feature"
      "leftside rightside"
      "subfeature subfeature"
      "standard1 standard2";

    @media screen and (min-width: 700px) {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "standard1 feature feature standard2"
        "leftside feature feature rightside"
        "leftside subfeature subfeature rightside";
    }
  }

  @media screen and (min-width: ${BREAKING_POINT}) {
      max-width: (#{${BREAKING_POINT} - 100px});
      margin: 3em auto 0;
  }

`;

const ProjectContent = styled.div`
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  opacity: 0;
  transition: all 500ms ease;

  ${STYLE_PROJECT}:hover & {
    opacity: 1;
  }

`;

const ProjectTitle = styled.h3`
  color: #fff;
  font-size: 1.25em;
`;

const STYLE_FEATURE = css`
  grid-area: feature;

  ${ProjectTitle} {
    font-size: 3em;
  }
`;

const STYLE_SUBFEATURE = css`
  grid-area: subfeature;

  ${ProjectTitle} {
    font-size: 2em;
  }
`;

const STYLE_LEFT = css`
  grid-area: leftside;

  ${ProjectTitle} {
    font-size: 1.75em;
  }
`;

const STYLE_RIGHT = css`
  grid-area: rightside;

  ${ProjectTitle} {
    font-size: 1.75em;
  }
`;

const Tags = styled.div`
  color: #666;
`;

const Tag = styled.span`
  background: #fff;
  border-radius: 1em;
  display: inline-block;
  padding: 0.5em 0.75em;
  font-weight: 400;
  margin: 0.15em;
  line-height: 1;
`;

export default class FrontpageRecentProjects extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }
  
  render() {
    const { title, projects } = this.props;

    return (
      <RecentProjects>
        <Title>{title}</Title>
        <ProjectList>
          {projects.map(({ previewImage, name, tags, url }, index) => {
            const Component = !!url ? Hyperlink : View;
            const props = Component === Hyperlink ? { href: url } : {};

            const projectClasses = [];
            let image = `${previewImage.file.url}`;

            if (index === 0) {
              projectClasses.push(STYLE_FEATURE);
              image += '?w=600';
            } else if (index === 1) {
              projectClasses.push(STYLE_SUBFEATURE);
              image += '?w=600';
            } else if (index === 2) {
              projectClasses.push(STYLE_LEFT);
              image += '?h=600';
            } else if (index === 3) {
              projectClasses.push(STYLE_RIGHT);
              image += '?h=600';
            }


            return (
              <Component
                key={index}
                {...props}
                className={cx(STYLE_PROJECT)}>
                <Picture className="preload" src={previewImage.file.url + '?w=30'} />
                <Picture src={image} />
                <ProjectContent className={cx(projectClasses)}>
                  <ProjectTitle>{name}</ProjectTitle>
                  <Tags>
                    {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </Tags>
                </ProjectContent>
              </Component>
            );
          })}
        </ProjectList>
      </RecentProjects>
    );
  }
}
