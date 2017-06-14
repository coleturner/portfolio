import React from 'react';
import PropTypes from 'prop-types';

import Aclamations from './Aclamations';
import Projects from './Projects';
import View from '../Components/View';
import Wrapper from '../App/Wrapper';

export default class ResumeScreen extends React.Component {
  static propTypes = {
    contents: PropTypes.array.isRequired
  }

  view() {
    const { contents } = this.props;

    return (
      <View id="resume">
        {contents.map((content, index) => {
          const { $type, ...fields } = content;

          try {

            switch ($type) {
              case 'projectsContainer':
                return <Projects key={index} {...fields} />;
              default:
                console.warn('Content type not supported', $type);
                return null;
            }
          } catch (e) {
            console.warn(e);
            return null;
          }
        })}

        <Aclamations />
      </View>
    );
  }

  render() {
    return <Wrapper>{this.view()}</Wrapper>;
  }
}
