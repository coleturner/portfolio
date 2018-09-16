import React from 'react';
import styled from 'react-emotion';

import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Container from '../Components/Container';

const Aclamations = styled.div`
  background-blend-mode: screen;
  padding: 6em 0;
}
`;

const AclamationList = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const AclamationItem = styled.div`
  flex: 1;
  padding: 3em 0;
  text-align: center;

  ${Icon} {
    max-width: 3em;
    max-height: 3em;
    margin-bottom: 1em;

    use {
      fill: ${({
        theme: {
          COLORS: { PRIMARY }
        }
      }) => PRIMARY};
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

  ${Hyperlink} {
    color: inherit;
    &:hover {
      opacity: 0.75;
    }
  }
`;

export default class FrontpageAclamations extends React.Component {
  render() {
    return (
      <Aclamations>
        <Container>
          <AclamationList>
            <AclamationItem>
              <Icon symbol={Icon.LIST.TROPHY} />
              <Text>
                <Title>
                  <Hyperlink href="https://techcrunch.com/2010/01/08/crunchies-winner/">
                    Crunchie: Best Bootstrapped StartUp
                  </Hyperlink>
                </Title>
                Tinychat (2010)
              </Text>
            </AclamationItem>
            <AclamationItem>
              <Icon symbol={Icon.LIST.EDUCATION} />
              <Text>
                <Title>
                  <Hyperlink href="http://catalog.csun.edu/academics/coms/programs/ba-communication-studies/">
                    B.A., Communication Studies
                  </Hyperlink>
                </Title>
                California State University Northridge (2009-2013)
              </Text>
            </AclamationItem>
          </AclamationList>
        </Container>
      </Aclamations>
    );
  }
}
