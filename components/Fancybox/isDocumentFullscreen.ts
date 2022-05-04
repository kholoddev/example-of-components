export const isDocumentFullscreen = (): boolean => {
  return document.webkitIsFullScreen || document.mozFullScreen || false;
};
