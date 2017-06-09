import React from 'react';
import ColorAppearance from './Appearance/Color';
import DateAppearance from './Appearance/Date';
import DateTimeAppearance from './Appearance/DateTime';
import DropdownAppearance from './Appearance/Dropdown';
import EmailAppearance from './Appearance/Email';
import ReferenceAppearance from './Appearance/Reference';
import MarkdownAppearance from './Appearance/Markdown';
import MediaAppearance from './Appearance/Media';
import NumberAppearance from './Appearance/Number';
import RatingAppearance from './Appearance/Rating';
import StringAppearance from './Appearance/String';
import TextAppearance from './Appearance/Text';
import ToggleAppearance from './Appearance/Toggle';

export default class ReclineField extends React.PureComponent {
  static types = {
    COLOR: ColorAppearance,
    DATE: DateAppearance,
    DATETIME: DateTimeAppearance,
    DROPDOWN: DropdownAppearance,
    EMAIL: EmailAppearance,
    MARKDOWN: MarkdownAppearance,
    MEDIA: MediaAppearance,
    NUMBER: NumberAppearance,
    RATING: RatingAppearance,
    REFERENCE: ReferenceAppearance,
    STRING: StringAppearance,
    TEXT: TextAppearance,
    TOGGLE: ToggleAppearance
  }

  static defaultProps = {
    getComponentFor: element => element
  }

  static registerType(typeName, Component) {
    if (!React.Component.isPrototypeOf(Component)) {
      throw new Error('ReclineField.registerType typeOf Component must be prototype of React.Component');
    }

    this.types[typeName] = Component;
  }

  static detectType(value) {
    if (typeof value === 'number') {
      return 'NUMBER';
    } else if (typeof value === 'boolean') {
      return 'TOGGLE';
    } else if (Array.isArray(value)) {
      return 'DROPDOWN';
    }
    return 'STRING';
  }

  render() {
    const appearance = this.props.appearance || this.constructor.detectType(this.props.value);
    if (appearance in this.constructor.types) {
      const Component = this.constructor.types[appearance];
      return (
        <Component
          {...this.props}
        />);
    }

    throw new Error(`Appearance type not supported: ${appearance}`);
  }
}
