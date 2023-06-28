import styled from 'styled-components';

export const Container = styled.div`
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
