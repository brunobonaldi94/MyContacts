import styled from 'styled-components';

export const Container = styled.div`

  & + & {
    margin-top:16px;
  }

  small {
    margin-top:8px;
    font-size:12px;
    padding:8px;
    color: ${({ theme }) => theme.colors.danger.main};
  }

  .form-item {
    position:relative;
    .loader{
      position:absolute;
      top:18px;
      right:16px;
    }
  }

`;
