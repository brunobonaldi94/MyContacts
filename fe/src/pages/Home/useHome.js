/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
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

  const handleTryAgain = async () => {
    await getContacts();
  };
  return ({
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
  });
}
