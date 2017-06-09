import React from 'react';

export default class ReclineToggleAppearance extends React.Component {
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
    const Input = getComponentFor('input');


    return (
      <View className="form-group">
        <Label className="form-label">{name}</Label>
        <View className="form-control">
          <Input
            type="checkbox"
            className="form-input form-toggle"
            checked={value}
            disabled={disabled}
            onChange={onChange}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}
