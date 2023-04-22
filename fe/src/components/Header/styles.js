import styled from 'styled-components';

export const Container = styled.header`
  margin-top:74px;
  display:flex;
  align-items:center;
  flex-direction: column;
  margin-bottom: 48px;

  img {
    padding:4px;
  }
`;

export const InputSearchContainer = styled.div`
  margin-top: 48px;
  width: 100%;
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
