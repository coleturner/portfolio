import React from 'react';

import Container from './container';
import EducationIcon from './icons/education-icon';
import TrophyIcon from './icons/trophy-icon';
import styled from '@emotion/styled';

const AclamationList = styled.div``;

const AclamationItem = styled.div`
  flex: 1;
  padding: 3em 0;
  text-align: center;

  svg {
    max-width: 5em;
    max-height: 5em;
    height: 5em;
    margin-bottom: 1em;

    use {
      fill: #2ff3f9;
    }
  }

  h2 {
    font-weight: 200;
    letter-spacing: -0.03em;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
  }
`;

const Text = styled.p`
  color: #777;
  font-size: 1.35em;
  font-weight: 300;
`;

const Title = styled.strong`
  display: block;
  font-size: 1.15em;
  color: #333;
  margin-bottom: 0.3em;

  @media screen and (prefers-color-scheme: dark) {
    color: #ccc;
  }
`;

export default function Aclamations() {
  return (
    <AclamationList>
      <AclamationItem>
        <TrophyIcon />
        <Text>
          <Title>
            <a
              target="_blank"
              rel="nofollow"
              href="https://techcrunch.com/2010/01/08/crunchies-winner/"
            >
              Crunchie: Best Bootstrapped StartUp
            </a>
          </Title>
          Tinychat (2010)
        </Text>
      </AclamationItem>
      <AclamationItem>
        <EducationIcon />
        <Text>
          <Title>
            <a
              target="_blank"
              rel="nofollow"
              href="http://catalog.csun.edu/academics/coms/programs/ba-communication-studies/"
            >
              B.A., Communication Studies
            </a>
          </Title>
          California State University Northridge (2009-2013)
        </Text>
      </AclamationItem>
    </AclamationList>
  );
}
