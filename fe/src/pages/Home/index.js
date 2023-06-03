/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
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
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';
import Button from '../../components/Button';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';
import ContactsService from '../../services/ContactsService';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';

function Home() {
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDelete, setContactBeingDelete] = useState(null);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsData = await ContactsService.listContacts(orderByAsc);
      setHasError(false);
      setContacts(contactsData);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderByAsc]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const handleToggleOrderBy = () => {
    setOrderByAsc((prevOrderByAsc) => !prevOrderByAsc);
  };

  const handlerSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteContact = (contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDelete(contact);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
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
        <button onClick={() => handleDeleteContact(contact)} type="button">
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

  const handleConfirmDeleteContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDelete.id);
      setContacts((prevState) => (
        prevState.filter((contact) => contact.id !== contactBeingDelete.id)
      ));
      setContactBeingDelete(null);
      handleCloseDeleteModal();

      toast({ type: 'success', text: 'Contato excluído com sucesso' });
    } catch (e) {
      toast({ type: 'danger', text: 'Não foi possível excluir o contato' });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handlerSearchTerm(e)}
          placeholder="Pesquise pelo nome"
        />
      </InputSearchContainer>
      )}
      <Header
        justifyContent={
          hasError ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
}
        noContact={filteredContacts.length === 0}
      >
        {(!hasError && contacts.length > 0) && <strong>{createContactsCount()}</strong>}
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
      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="Empty Box" />
            <p>
              Você ainda não tem nenhum contato cadastrado!
              Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
        )}

        {(filteredContacts.length === 0 && contacts.length > 0) && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="Magnifier Question" />
            <p>Nenhum resultado foi encontrado para <strong>”{searchTerm}”.</strong></p>
          </SearchNotFoundContainer>
        )}

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
      </>
      )}
      <Modal
        title={`Tem certeza que deseja remover o contato "${contactBeingDelete?.name}" ?`}
        danger
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
      >
        <p>Essa ação nao pode ser desfeita</p>
      </Modal>
    </Container>
  );
}

export default Home;
