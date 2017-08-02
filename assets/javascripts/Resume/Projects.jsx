import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment-mini';
import ReactMarkdown from 'react-markdown';

import Gallery from '../Components/Gallery';
import { H1, H3, H4, H5, H6 } from '../Components/Heading';
import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Time from '../Components/Time';
import View from '../Components/View';

export const ProjectHeading = (props, context) => {
  const { level, children } = props;

  const Component = `H${Math.min(6, level + 3)}`;

  return (
    <Component>{children}</Component>
  );
};


export const ProjectLink = (props) => {
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
        <a className={classNames(className)} {...{ href, title, target, rel }}>{children}</a>
    );

  } catch (e) {}

  return (
    <a className={classNames(className)} {...{ href, title, target, rel }}>{children}</a>
  );
};

ProjectHeading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number.isRequired
};

export const getDomain = (url) => {
  try {
    const constructed = new URL(url);
    return constructed.hostname;
  } catch (e) {
    return url;
  }
};

export default class ResumeProjects extends React.Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string
  }

  render() {
    const { title, body, projects } = this.props;

    return (
      <View className="resume-projects">
        <View className="title-container">
          <H1>{title}</H1>
          {body &&
            <ReactMarkdown
              className="markdown"
              source={body}
              renderers={{
                'Link': ProjectLink
              }} />
          }
        </View>
        <View className="container">
          <View className="project-list">
            {projects.map(({ images, abstract, name, started, ended, emphasize, tags, url }, index) => {
              const classes = [];
              if (!ended) {
                classes.push('active');
              }

              const startTime = started && moment(started);
              const endTime = ended && moment(ended);
              const startTimestamp = startTime && startTime.format('MMMM YYYY');
              const endTimestamp = endTime && endTime.format('MMMM YYYY');


              if (!emphasize) {
                classes.push('short-term');
              }

              const imageArray = (images && images.length ? images : [])
                .map(image => {
                  const width = !emphasize ? 620 : 1000;
                  return {
                    src: `${image.file.url}?w=${width}`,
                    preloadSrc: `${image.file.url}?w=30&h=30`,
                    ...image.file.details.image
                  };
                });

              const moreLink = url && {
                url,
                text: [
                  <Icon key="icon" id={Icon.LIST.LINK} />,
                  <span key="txt">{getDomain(url)}</span>
                ]
              };

              return (
                <View
                  className={classNames('project', classes)}
                  key={index}>
                  <H3>{name}</H3>
                  <View className="duration">
                    {startTimestamp && <Time>{startTimestamp}</Time>}
                    {' - '}
                    {endTimestamp ? <Time>{endTimestamp}</Time> : 'Present'}
                  </View>
                  <View className="card">
                    <Gallery images={imageArray} />
                    <View className="details">
                      <ReactMarkdown
                        className="markdown"
                        source={abstract}
                        renderers={{
                          'Heading': ProjectHeading,
                          'Link': ProjectLink
                        }} />
                      <View className="tags">
                        {tags.map(tag => <span key={tag}>{tag}</span>)}
                      </View>
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
      </View>
    );
  }
}
