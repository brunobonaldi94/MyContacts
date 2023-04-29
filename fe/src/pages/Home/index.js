import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import delay from '../../utils/delay';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const getContacts = async () => {
    try {
      setIsLoading(true);
      const orderBy = orderByAsc ? 'asc' : 'desc';
      const contactsPromise = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
      await delay(500);
      const contactsData = await contactsPromise.json();
      setContacts(contactsData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  // eslint-disable-next-line no-sparse-arrays
  }, [orderByAsc]);

  const handleToggleOrderBy = () => {
    setOrderByAsc((prevOrderByAsc) => !prevOrderByAsc);
  };

  const handlerSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const listOfContacts = filteredContacts.map((contact) => (
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
    if (filteredContacts.length === 0) {
      return (
        <p>Nenhum contato encontrado</p>
      );
    }
    return (
      <p>
        {filteredContacts.length}
        {' '}
        {filteredContacts.length === 1 ? 'Contato' : 'Contatos'}
      </p>
    );
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handlerSearchTerm(e)}
          placeholder="Pesquise pelo nome"
        />
      </InputSearchContainer>
      <Header noContact={filteredContacts.length === 0}>
        <strong>{createContactsCount()}</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>
      {filteredContacts.length > 0 && (
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
      )}
      {listOfContacts}
    </Container>
  );
}

export default Home;
