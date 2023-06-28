import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity:1;
  }
`;

const scaleIn = keyframes`
  from {
  transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  width: 450px;
  animation: ${scaleIn} 0.3s ease-in-out;
  .modal-body {
    margin-top: 32px;
  }

  h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray['900'])};

  p {
    margin-top: 8px;
  }

}
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    font-size: 16px;
    margin-right: 24px;
    border:none;
    color: ${({ theme }) => theme.colors.gray['200']};
  }
  button[disabled] {
    color: ${({ theme }) => theme.colors.gray[200]};
    cursor:default;
  }
`;
