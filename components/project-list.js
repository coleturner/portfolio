import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format, parse } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import Gallery from 'components/gallery';
import styled from '@emotion/styled';
import LinkIcon from 'components/icons/link-icon';
import { css } from 'emotion';
import { OutlineButton } from 'components/button';

const BREAKING_POINT = '700px';

const ProjectListContainer = styled.div`
  --cover-image-background-position: top center;
  margin: 3em auto;
  position: relative;

  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 1.15em;
    bottom: 0;

    @media screen and (min-width: ${BREAKING_POINT}) {
      border-left: 3px solid #eee;

      @media screen and (prefers-color-scheme: dark) {
        border-color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 10em;
    width: 5px;
    background: linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0) 100%);

    @media screen and (prefers-color-scheme: dark) {
      background: linear-gradient(
        to top,
        var(--page-background-color) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }
`;

const Project = styled.div`
  position: relative;
  padding: 0;
  margin-bottom: 6em;
  font-size: 1.2em;

  @media screen and (min-width: ${BREAKING_POINT}) {
    padding-left: 3em;

    &::before {
      position: absolute;
      left: 1px;
      top: 1.35em;
      width: 1em;
      height: 1em;
      content: ' ';
      border-radius: 10em;
      background: var(--page-background-color-minus-5);
      border: 3px solid transparent;
      transform: translate(-50%, -50%);
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
    &::before {
      background: var(--page-background-color);
      border-color: var(--page-background-color-minus-5);
      width: 1.35em;
      height: 1.35em;
  `};
`;

const ProjectHeading = styled.div`
  padding: 0 0.5em;
`;

const ProjectTitle = styled.h3`
  font-size: 2em;
  font-weight: 900;
  letter-spacing: -0.005em;
  margin: 0;

  @media screen and (prefers-color-scheme: dark) {
    background: linear-gradient(
      to right,
      var(--theme-color-1) 0%,
      var(--theme-color-2) 50%,
      var(--theme-color-1) 100%
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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

  @media screen and (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.15);
    color: rgba(255, 255, 255, 0.65);
    box-shadow: none;
  }
`;

const Time = styled.time`
  font-size: inherit;
  display: inline;
  vertical-align: baseline;
`;

const ProjectDetails = styled.div(
  ({ active }) => css`
    padding: 1em;
    display: ${active ? 'block' : 'none'};

    @media screen and (min-width: ${BREAKING_POINT}) {
      display: block;
      padding: 1.5em 3em 3em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #333;

      @media screen and (prefers-color-scheme: dark) {
        background: linear-gradient(
          to right,
          var(--theme-color-1) 0%,
          var(--theme-color-2) 50%,
          var(--theme-color-1) 100%
        );

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    h4 {
      font-size: 1.15em;
      font-weight: 500;
      margin: 1em 0 0.25em;

      &:first-child {
        margin-top: 0;
      }
    }
  `
);

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
  font-size: 1rem;
  color: #999;

  @media screen and (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const ProjectLink = styled.a`
  display: inline-block;
  margin-top: 1.5em;
  font-size: 1em;

  svg {
    margin-right: 0.5em;
    use {
      fill: currentColor;
    }
  }

  &:hover {
    svg use {
      fill: currentColor;
    }
  }
`;

const ReadMoreContainer = styled.p`
  text-align: center;
  padding: 1em 0;
  display: none;

  @media screen and (max-width: ${BREAKING_POINT}) {
    display: block;
  }
`;

export const MarkdownHeading = (props) => {
  const { level, children } = props;

  const Component = `h${Math.min(6, level + 2)}`;

  return <Component>{children}</Component>;
};

MarkdownHeading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number.isRequired,
};

export const MarkdownLink = (props) => {
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
  children: PropTypes.any,
};

export const getDomain = (url) => {
  try {
    const constructed = new URL(url);
    return constructed.hostname;
  } catch (e) {
    return url;
  }
};

export default function ProjectList({ projects }) {
  const dateInputFormat = 'yyyy-MM-d';
  return (
    <ProjectListContainer>
      {projects.map(
        ({ images, abstract, name, started, ended, tags, url }, index) => {
          const [shouldShowProjectDetails, showProjectDetails] = useState(
            false
          );

          const startTime =
            started && parse(started, dateInputFormat, new Date());
          const endTime = ended && parse(ended, dateInputFormat, new Date());
          const startTimestamp = startTime && format(startTime, 'MMMM yyyy');
          const endTimestamp = endTime && format(endTime, 'MMMM yyyy');

          const imageArray = (images && images.length ? images : []).map(
            (image) => ({
              ...image.fields?.file,
              src: image.fields?.file?.url,
            })
          );

          const readMore = () => showProjectDetails(true);

          return (
            <Project
              id={`project-${name.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()}`}
              isActive={!ended}
              key={index}
            >
              <ProjectHeading>
                <ProjectTitle>{name}</ProjectTitle>
                <Duration>
                  {startTimestamp && <Time>{startTimestamp}</Time>}
                  {' - '}
                  {endTimestamp ? <Time>{endTimestamp}</Time> : 'Present'}
                </Duration>
              </ProjectHeading>
              <ProjectContent>
                {imageArray.length ? <Gallery images={imageArray} /> : null}
                {!shouldShowProjectDetails && (
                  <ReadMoreContainer>
                    <OutlineButton onClick={readMore}>Read More</OutlineButton>
                  </ReadMoreContainer>
                )}
                <ProjectDetails active={shouldShowProjectDetails}>
                  <ReactMarkdown
                    className="markdown"
                    source={abstract}
                    renderers={{
                      heading: MarkdownHeading,
                      link: MarkdownLink,
                    }}
                  />
                  <Tags>
                    {tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Tags>
                  {url && (
                    <ProjectLink rel="nofollow" target="_blank" href={url}>
                      <LinkIcon /> <span>{getDomain(url)}</span>
                    </ProjectLink>
                  )}
                </ProjectDetails>
              </ProjectContent>
            </Project>
          );
        }
      )}
    </ProjectListContainer>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.array,
};
