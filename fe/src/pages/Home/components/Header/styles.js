import styled from 'styled-components';

export const Container = styled.header`
  display:flex;
  align-items:center;
  width:100%;
  margin-top: 24px;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray['100']};
  padding-bottom: 16px;
  strong {
    color: #222;
    font-size: ${({ $noContact }) => ($noContact ? '18' : '24')}px;
  }
  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease;
    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;
