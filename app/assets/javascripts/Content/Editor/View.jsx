import React from 'react';
import classNames from 'classnames';
import Renderer from '../Renderer';

import Button from './Button';
import Image from './Image';
import Text from './Text';

const contentEditorGroup = (Component) => {
  return (props) => {
    const className = props.__typename.replace(/([A-Z])/g, ($1) =>  "-"+$1.toLowerCase());
    return (
      <fieldset className={classNames('content-group', className)}>
        <legend><a name={props.id} href={`#${props.id}`}>{props.__typename}</a></legend>
        <Component {...props} />
      </fieldset>
    );
  };
};

const ContentEditorRenderer = Renderer({
  'ButtonEntry': contentEditorGroup(Button),
  'Image': contentEditorGroup(Image),
  'TextEntry': contentEditorGroup(Text)
});

export default class ContentEditor extends React.PureComponent {

  render() {
    const { contents } = this.props;

    return (
      <ContentEditorRenderer contents={contents.map(block => {
        return {
          ...block
        };
      })} />
    );
  }
}
