import styled, { css } from 'styled-components';

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;
     .sort-button {
        display:flex;
        border:none;
        background:transparent;
        align-items:center;

        span {
          margin-right:8px;
          font-weight: bold;
          color: ${({ theme }) => theme.colors.primary.main};
        }

        img {
          width: 10px;
          transition: transform 0.2s ease-in;
          ${({ $orderByAsc }) => $orderByAsc && css`
              transform: rotate(180deg);
          `}
        }
    }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:space-between;

  & + & {
    margin-top: 8px;
  }
    .info {
      display:flex;
      align-items: start;
      flex-direction: column;
      width: 100%;

      .contact-name {
        display:flex;
        align-items:center;

        small{
          background: ${({ theme }) => theme.colors.primary.lighter};
          color: ${({ theme }) => theme.colors.primary.main};
          font-weight: bolder;
          text-transform: uppercase;
          padding: 4px;
          border-radius: 4px;
          margin-left: 8px;
        }
    }
    span {
          font-size: 14px;
          color: ${({ theme }) => theme.colors.gray['200']};
      }
  }
  .actions {
    display: flex;
    align-items: center;
    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }
`;
