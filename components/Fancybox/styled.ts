import styled, {css, keyframes} from 'styled-components';

const showAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const hideAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const FancyboxContainer = styled.div<{$zIndex: number; $hideAnimation: boolean}>`
  z-index: ${({$zIndex}) => $zIndex};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  animation: ${showAnimation} ease-in-out 240ms;

  ${({$hideAnimation}) =>
    $hideAnimation &&
    css`
      animation: ${hideAnimation} ease-in-out 240ms;
      animation-fill-mode: forwards;
    `};
`;
