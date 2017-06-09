import React from 'react';
import View from '../Components/View';

const createRenderer = (elements, className = 'content-render') => {
 return (props) => {
   const { contents } = props;

   return (
     <View className={className}>
       {contents.map((content, index) => {
         const { object } = content;
         if (object.__typename in elements) {
           const Component = elements[object.__typename];
           return <Component key={'id' in object ? object.id : index} {...object} />;
         }

         console.error('Unknown content type', object.__typename, 'for', object);
         return null;
       })}
     </View>
   );
 }
};

export default createRenderer;
