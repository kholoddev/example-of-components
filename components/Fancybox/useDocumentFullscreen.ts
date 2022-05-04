import {useEffect, useState} from 'react';
import {isDocumentFullscreen} from './isDocumentFullscreen';

document.body.requestFullScreen =
  document.body.requestFullScreen ||
  document.body.webkitRequestFullScreen ||
  document.body.mozRequestFullScreen ||
  function (): void {
    return;
  };

document.cancelFullScreen =
  document.cancelFullScreen ||
  document.webkitCancelFullScreen ||
  document.mozCancelFullScreen ||
  function (): void {
    return;
  };

const FULLSCREEN_EVENT_NAMES = [
  'fullscreenchange',
  'mozfullscreenchange',
  'webkitfullscreenchange',
  'msfullscreenchange'
];

type OnFullscreenChangeCallback = (event: Event) => void;

interface UseDocumentFullscreen {
  isFullscreen: boolean;
  requestFullScreen: () => void;
  cancelFullScreen: () => void;
  subscribe: (callback: OnFullscreenChangeCallback) => void;
}

export const useDocumentFullscreen = (): UseDocumentFullscreen => {
  const [subscriptions, setSubscriptions] = useState<OnFullscreenChangeCallback[]>([]);
  const [isFullscreen, setFullscreen] = useState<boolean>(isDocumentFullscreen());

  const requestFullScreen = (): void => document.body.requestFullScreen();

  const cancelFullScreen = (): void => document.cancelFullScreen();

  const handleFullscreenChange = (): void => setFullscreen(isDocumentFullscreen());

  const subscribe = (callback: OnFullscreenChangeCallback): void => {
    setSubscriptions(current => [...current, callback]);
    FULLSCREEN_EVENT_NAMES.forEach(eventName => document.addEventListener(eventName, callback));
  };

  useEffect(() => {
    FULLSCREEN_EVENT_NAMES.forEach(eventName => {
      document.addEventListener(eventName, handleFullscreenChange);
    });

    return () => {
      FULLSCREEN_EVENT_NAMES.forEach(eventName => {
        document.removeEventListener(eventName, handleFullscreenChange);
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      subscriptions.forEach(callback => {
        FULLSCREEN_EVENT_NAMES.forEach(eventName => {
          document.removeEventListener(eventName, callback);
        });
      });
    };
  }, [subscriptions]);

  return {isFullscreen, requestFullScreen, cancelFullScreen, subscribe};
};
