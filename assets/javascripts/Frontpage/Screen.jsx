import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Card from './Card';
import RecentProjects from './RecentProjects';
import Services from './Services';
import Skills from './Skills';
import Wrapper from '../App/Wrapper';

const Frontpage = styled.div``;

export default class FrontpageScreen extends React.Component {
  static propTypes = {
    contents: PropTypes.array.isRequired
  };

  getContents() {
    const { contents, flags } = this.props;

    return (
      <Frontpage>
        {contents &&
          contents.map((content, index) => {
            const { $type, ...fields } = content;

            try {
              switch ($type) {
                case 'card':
                  return <Card key={index} {...fields} flags={flags} />;
                case 'servicesContainer':
                  return <Services key={index} {...fields} flags={flags} />;
                case 'recentProjects':
                  return (
                    <RecentProjects key={index} {...fields} flags={flags} />
                  );
                case 'skillsContainer':
                  return <Skills key={index} {...fields} flags={flags} />;
                default:
                  console.warn('Content type not supported', $type);
                  return null;
              }
            } catch (e) {
              console.warn(e);
              return null;
            }
          })}
      </Frontpage>
    );
  }

  render() {
    const { flags = {} } = this.props;

    const contents = this.getContents();

    if (flags.wrapper) {
      return <Wrapper>{contents}</Wrapper>;
    }

    return contents;
  }
}
