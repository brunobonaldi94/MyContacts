import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity:1;
    transform: translateY(0);
  }
`;

const messageOut = keyframes`
  from {
    opacity:1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariant = {
  default: css`
     background: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
     background: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
     background: ${({ theme }) => theme.colors.danger.main};
  `,
};

export const Container = styled.div`
  padding:16px 32px;
  ${({ type }) => containerVariant[type] || containerVariant.default};
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  color: #FFF;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${messageIn} 0.3s ease-in-out forwards;
  ${({ $isLeaving }) => $isLeaving && css`
    animation: ${messageOut} 0.2s ease-in-out forwards;
  `}
  cursor: pointer;
  img {
    margin-right: 8px;
  }
  & + & {
    margin-top: 12px;
  }
`;
