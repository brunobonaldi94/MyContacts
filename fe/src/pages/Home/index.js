import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

function Home() {
  const [orderByAsc, setOrderByAsc] = useState(true);
  const changeOrderBy = () => {
    setOrderByAsc((prevOrderByAsc) => !prevOrderByAsc);
  };
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome" />
      </InputSearchContainer>
      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>
      <ListContainer $orderByAsc={orderByAsc}>
        <header>
          <button
            type="button"
            className="sort-button"
            onClick={
              () => changeOrderBy()
            }
          >
            <span>
              Nome
            </span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Bruno Bonaldi</strong>
            <small>Instagram</small>
          </div>
          <span>brunobonaldidkjioadfa@gmail.com</span>
          <span>+55 (11) 9 9999-9999</span>
        </div>
        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="Edit" />
          </Link>
          <button type="button">
            <img src={trash} alt="Trash" />
          </button>
        </div>
      </Card>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Bruno Bonaldi</strong>
            <small>Instagram</small>
          </div>
          <span>brunobonaldidkjioadfa@gmail.com</span>
          <span>+55 (11) 9 9999-9999</span>
        </div>
        <div className="actions">
          <a href="/">
            <img src={edit} alt="Edit" />
          </a>
          <button type="button">
            <img src={trash} alt="Trash" />
          </button>
        </div>
      </Card>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Bruno Bonaldi</strong>
            <small>Instagram</small>
          </div>
          <span>brunobonaldidkjioadfa@gmail.com</span>
          <span>+55 (11) 9 9999-9999</span>
        </div>
        <div className="actions">
          <a href="/">
            <img src={edit} alt="Edit" />
          </a>
          <button type="button">
            <img src={trash} alt="Trash" />
          </button>
        </div>
      </Card>
    </Container>
  );
}

export default Home;
