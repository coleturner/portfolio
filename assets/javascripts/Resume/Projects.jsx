import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import styled from 'react-emotion';

import Gallery from '../Components/Gallery';
import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Container from '../Components/Container';

const ResumeProjects = styled.div``;

const ResumeHeader = styled.div`
  background: #eee;
  background-blend-mode: screen;
  margin: 0 0 3em 0;
  padding: 2em 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
  letter-spacing: -0.03em;
  font-size: 1.25em;
`;

const Heading = styled.h1`
  font-size: 1.5em;
  font-weight: 100;
`;

const BREAKING_POINT = '700px';

const ProjectList = styled.div`
  max-width: 100vmin;
  min-width: 40vmax;
  margin: 0 auto;

  @media screen and (min-width: ${BREAKING_POINT}) {
    border-left: 3px solid #eee;
  }
`;

const Project = styled.div`
  position: relative;
  padding: 0;
  margin-bottom: 6em;
  font-size: 1.2em;

  @media screen and (min-width: ${BREAKING_POINT}) {
    padding: 0 3em;
  }

  @media screen and (min-width: ${BREAKING_POINT}) {
    &::before {
      position: absolute;
      left: -1px;
      top: 1.5em;
      width: 1em;
      height: 1em;
      content: ' ';
      border-radius: 10em;
      background: #ccc;
      border: 2px solid transparent;
      transform: translate(-50%, -50%);
    }
  }

  ${({ isActive }) =>
    isActive &&
    `
    &::before {
      background: #fff;
      border-color: #ccc;
      width: 1.35em;
      height: 1.35em;
    }
  `};
`;

const ProjectTitle = styled.h3`
  font-size: 1.5em;
  letter-spacing: -0.03em;
  margin: 0;
`;

const Duration = styled.div`
  color: #aaa;
`;

const ProjectContent = styled.div`
  background: #fff;
  border-radius: 0.5em;
  box-shadow: 0 0.15em 0.45em rgba(0, 0, 0, 0.15);
  padding: 0.5em;
  margin-top: 1em;
  color: #717171;
  ${({ emphasize }) => !emphasize && 'max-width: 730px;'};
`;

const Time = styled.time`
  font-size: inherit;
  display: inline;
  vertical-align: baseline;
`;

const ProjectDetails = styled.div`
  padding: 1em;

  @media screen and (min-width: ${BREAKING_POINT}) {
    padding: 1.5em 3em 3em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #333;
  }

  h4 {
    font-size: 1.15em;
    font-weight: 500;
    margin: 1em 0 0.25em;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const Tags = styled.div`
  margin-top: 1em;
`;

const Tag = styled.span`
  background: #eee;
  border-radius: 10em;
  display: inline-block;
  margin-right: 0.3em;
  margin-bottom: 0.3em;
  padding: 0.2em 0.65em;
  color: #999;
`;

const ProjectLink = styled(Hyperlink)`
  display: inline-block;
  margin-top: 1.5em;
  font-size: 1em;
  color: #aaa;

  svg.icon {
    margin-right: 0.5em;
    use {
      fill: #aaa;
    }
  }

  &:hover {
    color: ${({
      theme: {
        COLORS: { PRIMARY }
      }
    }) => PRIMARY};
    svg use {
      fill: ${({
        theme: {
          COLORS: { PRIMARY }
        }
      }) => PRIMARY};
    }
  }
`;

export const MarkdownHeading = props => {
  const { level, children } = props;

  const Component = `H${Math.min(6, level + 3)}`;

  return <Component>{children}</Component>;
};

MarkdownHeading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number.isRequired
};

export const MarkdownLink = props => {
  const { className, href, title, children } = props;

  let rel;
  let target;

  try {
    const url = new URL(`${!href.match(/^https?/) ? 'https:' : ''}${href}`);
    if (url.hostname !== window.location.hostname) {
      rel = 'nofollow';
      target = '_blank';
    }

    return (
      <a className={classNames(className)} {...{ href, title, target, rel }}>
        {children}
      </a>
    );
  } catch (e) {
    // Do nothing
  }

  return (
    <a className={classNames(className)} {...{ href, title, target, rel }}>
      {children}
    </a>
  );
};

MarkdownLink.propTypes = {
  className: PropTypes.any,
  href: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any
};

export const getDomain = url => {
  try {
    const constructed = new URL(url);
    return constructed.hostname;
  } catch (e) {
    return url;
  }
};

export default class ResumeProjectsView extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string
  };

  componentDidMount() {
    if (window.location.hash.indexOf('#project-') !== -1) {
      const el = document.getElementById(window.location.hash.substring(1));
      setTimeout(() => {
        window.scrollTop = document.body.scrollTop = el.offsetTop - 80;
      }, 20);
    }
  }

  renderProjects(projects) {
    return (
      <ProjectList>
        {projects.map(
          (
            { images, abstract, name, started, ended, emphasize, tags, url },
            index
          ) => {
            const startTime = started && dayjs(started);
            const endTime = ended && dayjs(ended);
            const startTimestamp = startTime && startTime.format('MMMM YYYY');
            const endTimestamp = endTime && endTime.format('MMMM YYYY');

            const imageArray = (images && images.length ? images : []).map(
              image => {
                const width = !emphasize ? 620 : 1000;
                return {
                  src: `${image.file.url}?w=${width}`,
                  preloadSrc: `${image.file.url}?w=30&h=30`,
                  ...image.file.details.image
                };
              }
            );

            const moreLink = url && {
              url,
              text: [
                <Icon symbol={Icon.LIST.LINK} key="icon" />,
                <span key="txt">{getDomain(url)}</span>
              ]
            };

            return (
              <Project
                id={`project-${name
                  .replace(/[^a-zA-Z0-9]+/g, '')
                  .toLowerCase()}`}
                emphasize={emphasize}
                isActive={!ended}
                key={index}
              >
                <ProjectTitle>{name}</ProjectTitle>
                <Duration>
                  {startTimestamp && <Time>{startTimestamp}</Time>}
                  {' - '}
                  {endTimestamp ? <Time>{endTimestamp}</Time> : 'Present'}
                </Duration>
                <ProjectContent>
                  <Gallery images={imageArray} />
                  <ProjectDetails>
                    <ReactMarkdown
                      className="markdown"
                      source={abstract}
                      renderers={{
                        heading: MarkdownHeading,
                        link: MarkdownLink
                      }}
                    />
                    <Tags>
                      {tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Tags>
                    {moreLink && (
                      <ProjectLink href={moreLink.url}>
                        {moreLink.text}
                      </ProjectLink>
                    )}
                  </ProjectDetails>
                </ProjectContent>
              </Project>
            );
          }
        )}
      </ProjectList>
    );
  }

  render() {
    const { title, body, projects } = this.props;

    return (
      <ResumeProjects>
        <ResumeHeader>
          <Heading>{title}</Heading>
          {body && (
            <ReactMarkdown
              className="markdown"
              source={body}
              renderers={{
                link: MarkdownLink
              }}
            />
          )}
        </ResumeHeader>
        <Container>{this.renderProjects(projects)}</Container>
      </ResumeProjects>
    );
  }
}
