import React from 'react';

export default class ReclineTextAppearance extends React.Component {
  render() {
    const {
      name,
      onChange,
      value,
      getComponentFor,
      read_only: disabled,
      ...otherProps
    } = this.props;

    const View = getComponentFor('div');
    const Label = getComponentFor('label');
    const Textarea = getComponentFor('textarea');


    return (
      <View className="form-group">
        <Label className="form-label">{name}</Label>
        <View className="form-control">
          <Textarea
            className="form-input"
            onChange={onChange}
            disabled={disabled}
            {...otherProps}>
            {value}
          </Textarea>
        </View>
      </View>
    );
  }
}
