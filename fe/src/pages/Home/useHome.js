/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useState, useEffect, useCallback,
  useMemo,
  useDeferredValue,
} from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDelete, setContactBeingDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm, { timeoutMs: 500 });

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )), [contacts, deferredSearchTerm]);

  const getContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      const contactsData = await ContactsService.listContacts(signal, orderByAsc);
      setHasError(false);
      setContacts(contactsData);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setIsLoading(false);
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderByAsc]);

  useEffect(() => {
    const controller = new AbortController();
    getContacts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [getContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderByAsc((prevOrderByAsc) => !prevOrderByAsc);
  }, []);

  const handlerSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDelete(contact);
  }, []);

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
