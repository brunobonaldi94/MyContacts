import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

function Home() {
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const orderBy = orderByAsc ? 'asc' : 'desc';
      const contactsPromise = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
      if (!contactsPromise.ok) {
        return;
      }
      const contactsData = await contactsPromise.json();
      setContacts(contactsData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getContacts();
  // eslint-disable-next-line no-sparse-arrays
  }, [orderByAsc]);

  const handleToggleOrderBy = () => {
    setOrderByAsc((prevOrderByAsc) => !prevOrderByAsc);
  };

  const listOfContacts = contacts.map((contact) => (
    <Card
      key={contact.id}
    >
      <div className="info">
        <div className="contact-name">
          <strong>{contact.name}</strong>
          {contact.category_name && (
            <small>{contact.category_name}</small>
          )}
        </div>
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
      </div>
      <div className="actions">
        <Link to={`/edit/${contact.id}`}>
          <img src={edit} alt="Edit" />
        </Link>
        <button type="button">
          <img src={trash} alt="Trash" />
        </button>
      </div>
    </Card>
  ));

  const createContactsCount = () => {
    if (contacts.length === 0) {
      return (
        <p>Nenhum contato encontrado</p>
      );
    }
    return (
      <p>
        {contacts.length}
        {' '}
        {contacts.length === 1 ? 'Contato' : 'Contatos'}
      </p>
    );
  };

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome" />
      </InputSearchContainer>
      <Header>
        <strong>{createContactsCount()}</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>
      <ListHeader $orderByAsc={orderByAsc}>
        <header>
          <button
            type="button"
            className="sort-button"
            onClick={
              () => handleToggleOrderBy()
            }
          >
            <span>
              Nome
            </span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListHeader>
      {listOfContacts}
    </Container>
  );
}

export default Home;
