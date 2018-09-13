import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import CallToAction from "./CallToAction";
import RecentProjects from "./RecentProjects";
import Services from "./Services";
import Skills from "./Skills";
import View from "../Components/View";
import Wrapper from "../App/Wrapper";

export default class FrontpageScreen extends React.Component {
  static propTypes = {
    contents: PropTypes.array.isRequired
  };

  getContents() {
    const { contents, flags } = this.props;

    return (
      <View id="frontpage">
        {contents &&
          contents.map((content, index) => {
            const { $type, ...fields } = content;

            try {
              switch ($type) {
                case "card":
                  return <Card key={index} {...fields} flags={flags} />;
                case "introduction":
                  return <Introduction key={index} {...fields} flags={flags} />;
                case "servicesContainer":
                  return <Services key={index} {...fields} flags={flags} />;
                case "recentProjects":
                  return (
                    <RecentProjects key={index} {...fields} flags={flags} />
                  );
                case "skillsContainer":
                  return <Skills key={index} {...fields} flags={flags} />;
                case "callToAction":
                  return <CallToAction key={index} {...fields} flags={flags} />;
                default:
                  console.warn("Content type not supported", $type);
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
    const { flags = {} } = this.props;

    const contents = this.getContents();

    if (flags.wrapper) {
      return <Wrapper>{contents}</Wrapper>;
    }

    return contents;
  }
}
