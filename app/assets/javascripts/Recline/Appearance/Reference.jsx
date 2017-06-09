import React from 'react';
import ReferenceList from './ReferenceList';

export default class ReclineReferenceAppearance extends React.Component {
  render() {
    const {
      appearance,
      validators,
      name,
      onChange,
      value,
      getComponentFor,
      read_only: disabled,
      ...otherProps
    } = this.props;

    const View = getComponentFor('div');
    const Label = getComponentFor('label');

    return (
      <View className="form-group">
        <Label className="form-label">Contents</Label>
        <View className="form-control">
          <ReferenceList
            getComponentFor={this.props.getComponentFor}
           references={value}
          />
        </View>
      </View>
    )
  }
}
