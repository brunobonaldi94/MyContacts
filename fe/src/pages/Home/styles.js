import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Header = styled.header`
  display:flex;
  align-items:center;
  width:100%;
  margin-top: 24px;
  justify-content: space-between;
  strong {
    color: #222;
    font-size: 24px;
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

export const ListContainer = styled.div`
  margin-top: 24px;
  header {
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
          ${({ $orderByAsc }) => !$orderByAsc && css`
              transform: rotate(180deg);
          `}
        }
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

export const InputSearchContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  input {
    width: 100%;
    border-radius:25px;
    height:50px;
    border:none;
    background:'#fff';
    box-shadow: 0px 4px 10px rgba(0, 0,0, 0.04);
    outline:0;
    padding:16px;

    &::placeholder{
      color:#BCBCBC;
    }
  }
`;
