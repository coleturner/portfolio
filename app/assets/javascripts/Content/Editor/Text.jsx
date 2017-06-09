import React from 'react';

import RichText from './RichText';
import View from '../../Components/View';

export default class ContentText extends React.PureComponent {
  static childContextTypes = {
    contentProps: React.PropTypes.object
  }

  getChildContext() {
    return {
      contentProps: this.props
    };
  }

  render() {
    const { title, contents, __typename, id } = this.props;

    return (
      <View>
        <View className="form-group">
          <input className="form-input" type="text" defaultValue={title} />
        </View>
        <View>
          <RichText source={contents} />
        </View>
      </View>
    );
  }
}
