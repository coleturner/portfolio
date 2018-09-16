import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Icon from '../Components/Icon';
import Container from '../Components/Container';

const BREAKING_POINT = '900px';

const Services = styled.div`
  background: linear-gradient(to bottom, #ffffff 10%, #eeeeee 90%);
  padding: 12em 0 9em;

  &:first-child {
    padding: 15em 0 9em;
  }

  .markdown {
    text-align: center;
    font-size: 1.85em;
    max-width: 700px;
    margin: 0 auto;
    color: #555;
  }

  .service-list {
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 3em;

    @media screen and (max-width: ${BREAKING_POINT}) {
      display: block;
    }
  }
`;

const Service = styled.div`
  background: #fff;
  border-radius: 3px;
  color: #464f54;
  margin: 1.5em auto;
  text-align: center;
  box-shadow: 0 3px 0.15em rgba(0, 0, 0, 0.2);
  padding: 1.5em;
  max-width: 30em;

  ${Icon} {
    margin: auto;
    max-width: 5em;
    height: 5em;
    max-height: none;
    margin-bottom: 1em;
  }

  @media screen and (min-width: ${BREAKING_POINT}) {
    max-width: calc(100% / 3 - 1em);
    flex-basis: calc(100% / 3);
  }
`;

const Title = styled.h2`
  text-align: center;
  white-space: pre-line;

  ${Services}:first-child & {
    font-weight: 800;
  }
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 3em;
`;

const ServiceTitle = styled.h3`
  font-size: 1.25em;
  color: #4488b4;
`;

const ServiceText = styled.p`
  font-size: 1.2em;
  font-weight: 200;
  color: #888;
  max-width: 21em;
  margin: 0 auto;
`;

export default class FrontpageServices extends React.Component {
  static propTypes = {
    body: PropTypes.string,
    services: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { title, body, services } = this.props;

    return (
      <Services>
        <Container>
          <Title>{title}</Title>

          {body && <ReactMarkdown className="markdown" source={body} />}

          {services &&
            services.length && (
              <ServiceList>
                {services.map(({ icon, name, description }, index) => {
                  return (
                    <Service key={index}>
                      {icon && <Icon symbol={icon} />}
                      <ServiceTitle>{name}</ServiceTitle>
                      <ServiceText>{description}</ServiceText>
                    </Service>
                  );
                })}
              </ServiceList>
            )}
        </Container>
      </Services>
    );
  }
}
