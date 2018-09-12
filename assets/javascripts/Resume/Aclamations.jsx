import React from 'react';

import Flex from '../Components/Flex';
import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Paragraph from '../Components/Paragraph';
import View from '../Components/View';

export default class FrontpageAclamations extends React.Component {
  render() {
    return (
      <View className="aclamations">
        <View className="container">
          <Flex>
            <View className="awards">
              <Icon symbol={Icon.LIST.TROPHY} />
              <Paragraph>
                <strong>
                  <Hyperlink href="https://techcrunch.com/2010/01/08/crunchies-winner/">Crunchie: Best Bootstrapped StartUp</Hyperlink>
                </strong>
                Tinychat (2010)
              </Paragraph>
            </View>
            <View className="education">
              <Icon symbol={Icon.LIST.EDUCATION} />
              <Paragraph>
                <strong>
                  <Hyperlink href="http://catalog.csun.edu/academics/coms/programs/ba-communication-studies/">B.A., Communication Studies</Hyperlink>
                </strong>
                California State University Northridge (2009-2013)
              </Paragraph>
            </View>
          </Flex>
        </View>
      </View>
    );
  }
}
