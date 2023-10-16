/* eslint-disable no-nested-ternary */
import Loader from '../../components/Loader';
import {
  Container,
} from './styles';

import Modal from '../../components/Modal';
import ContactsList from './components/ContactsList';
import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import Header from './components/Header';
import InputSearch from './components/InputSearch';
import SearchNotFound from './components/SearchNotFound';
import useHome from './useHome';

function Home() {
  const {
    isLoading,
    contacts,
    searchTerm,
    handlerSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderByAsc,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDelete,
    handleToggleOrderBy,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!hasContacts && !isLoading);
  const isSearchTermEmpty = !hasError && (filteredContacts.length === 0 && hasContacts);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {hasContacts && (
      <InputSearch
        value={searchTerm}
        onChange={(e) => handlerSearchTerm(e)}
      />
      )}
      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />
      {hasError && (<ErrorStatus onTryAgain={handleTryAgain} />)}
      {isListEmpty && (<EmptyList />)}
      {isSearchTermEmpty && (<SearchNotFound searchTerm={searchTerm} />)}
      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderByAsc={orderByAsc}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
            contactBeingDelete={contactBeingDelete}
          />

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
        </>
      )}
    </Container>
  );
}

export default Home;
