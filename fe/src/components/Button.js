import styled, { css } from 'styled-components';

export default styled.button`
  padding: 0 16px;
  height: 52px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  transition: background 0.2s ease;
  &:hover{
    background: ${({ theme }) => theme.colors.primary.light};
  }
  &:active{
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray[200]};
    cursor:default;
  }
  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};
    &:hover {
      background: ${theme.colors.danger.light};
    }
    &:active{
      background: ${theme.colors.danger.dark};
  }
  `}
`;
