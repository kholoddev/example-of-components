import React, {FC, MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {isDocumentFullscreen} from './isDocumentFullscreen';
import {useDocumentScroll} from './useDocumentScroll';
import {useDocumentFullscreen} from './useDocumentFullscreen';
import {CloseButton} from '../CloseButton';
import {FancyboxContainer} from './styled';

interface FancyboxProps {
  handleClose: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  zIndex: number;
}

export const Fancybox: FC<FancyboxProps> = ({handleClose, children, zIndex}) => {
  const [hideAnimation, setHideAnimation] = useState<boolean>(false);
  const {disableScroll, enableScroll} = useDocumentScroll();
  const {requestFullScreen, cancelFullScreen, subscribe} = useDocumentFullscreen();

  const onClose = (): void => {
    setHideAnimation(true);
    setTimeout(handleClose, 240);
  };

  const handleFullscreenChange = () => {
    if (!isDocumentFullscreen()) {
      onClose();
    }
  };

  useEffect(() => {
    subscribe(handleFullscreenChange);
    disableScroll();
    requestFullScreen();

    return () => {
      enableScroll();
      cancelFullScreen();
    };
  }, []);

  return createPortal(
    <FancyboxContainer $zIndex={zIndex} $hideAnimation={hideAnimation}>
      <CloseButton onClick={onClose} />
      {children}
    </FancyboxContainer>,
    document.body
  );
};
