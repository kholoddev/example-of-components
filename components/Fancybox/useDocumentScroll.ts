import {useState} from 'react';

interface UseDocumentScroll {
  disableScroll: () => void;
  enableScroll: () => void;
  scrollEnabled: boolean;
}

export const useDocumentScroll = (): UseDocumentScroll => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const disableScroll = (): void => {
    document.body.style.overflow = 'hidden';
    setScrollEnabled(false);
  };

  const enableScroll = (): void => {
    document.body.style.overflow = 'auto';
    setScrollEnabled(true);
  };

  return {
    disableScroll,
    enableScroll,
    scrollEnabled
  };
};
