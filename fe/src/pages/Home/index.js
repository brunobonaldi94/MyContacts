import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
} from './styles';
import Button from '../../components/Button';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import ContactsService from '../../services/ContactsService';

function Home() {
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const contactsData = await ContactsService.listContacts(orderByAsc);
      setContacts(contactsData);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderByAsc]);

  useEffect(() => {
    getContacts();
  }, [orderByAsc, getContacts]);

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

  const handleTryAgain = async () => {
    await getContacts();
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
      <Header hasError={hasError} noContact={filteredContacts.length === 0}>
        {!hasError && <strong>{createContactsCount()}</strong>}
        <Link to="/new">Novo Contato</Link>
      </Header>
      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos.</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}
      {filteredContacts.length > 0 && !hasError && (
      <>
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
      </>
      )}
    </Container>
  );
}

export default Home;
