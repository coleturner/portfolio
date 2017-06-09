import React from 'react';

import View from '../../Components/View';

export const EditorWrapperView = (props) => {
  const { children } = props;

  return (
    <View className="editor-wrapper">
      {children}
    </View>
  );
};

export default EditorWrapperView;
