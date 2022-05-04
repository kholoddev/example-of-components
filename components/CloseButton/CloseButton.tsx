import React, {FC, MouseEventHandler} from 'react';
import {Cross as CrossIcon} from 'icons';
import {Button, Container, RelativeContainer} from './styled';

interface CloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const CloseButton: FC<CloseButtonProps> = ({onClick}) => {
  return (
    <Container>
      <RelativeContainer>
        <Button type="button" onClick={onClick}>
          <CrossIcon />
        </Button>
      </RelativeContainer>
    </Container>
  );
};
