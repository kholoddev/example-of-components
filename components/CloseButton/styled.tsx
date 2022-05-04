import styled from 'styled-components';

export const Button = styled.button`
  position: absolute;
  right: 32px;
  top: 32px;
  border-radius: 22px;
  width: 44px;
  height: 44px;
  border: none;
  cursor: pointer;
  transition: ease-in-out 80ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #dadada;
`;

export const Container = styled.div`
  z-index: 10;
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  height: 100px;

  &:hover,
  &:active {
    ${Button} {
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
