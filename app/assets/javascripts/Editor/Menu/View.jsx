import React from 'react';
import { withRouter } from 'found';

import Button from '../../Components/Button';
import Flex from '../../Components/Flex';
import { H2 } from '../../Components/Heading';
import Icon from '../../Components/Icon';

export const EditorMenuView = (props) => {
  const { children, match, title } = props;

  const backAction = match.location.index > 0
    ? () => props.router.go(-1)
    : () => props.router.push({ pathname: '/editor' });

  const backButton = match
    ? (
      <Button className="transparent back-button" onClick={backAction}>
        <Icon id={Icon.LIST.BACK} />
      </Button>
      )
    : null;

  return (
    <Flex className="editor-menu">
      {backButton}
      {title ? <H2>{title}</H2> : null}
      {children}
    </Flex>
  );
};

export default withRouter(EditorMenuView);
