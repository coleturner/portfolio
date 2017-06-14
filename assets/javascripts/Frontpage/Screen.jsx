import React from 'react';
import PropTypes from 'prop-types';

import CallToAction from './CallToAction';
import Introduction from './Introduction';
import RecentProjects from './RecentProjects';
import Services from './Services';
import Skills from './Skills';
import View from '../Components/View';
import Wrapper from '../App/Wrapper';

export default class FrontpageScreen extends React.Component {
  static propTypes = {
    contents: PropTypes.array.isRequired
  }

  view() {
    const { contents } = this.props;

    return (
      <View id="frontpage">
        {contents.map((content, index) => {
          const { $type, ...fields } = content;

          try {

            switch ($type) {
              case 'introduction':
                return <Introduction key={index} {...fields} />;
              case 'servicesContainer':
                return <Services key={index} {...fields} />;
              case 'recentProjects':
                return <RecentProjects key={index} {...fields} />;
              case 'skillsContainer':
                return <Skills key={index} {...fields} />;
              case 'callToAction':
                return <CallToAction key={index} {...fields} />;
              default:
                console.warn('Content type not supported', $type);
                return null;
            }
          } catch (e) {
            console.warn(e);
            return null;
          }
        })}
      </View>
    );
  }

  render() {
    return <Wrapper>{this.view()}</Wrapper>;
  }
}
