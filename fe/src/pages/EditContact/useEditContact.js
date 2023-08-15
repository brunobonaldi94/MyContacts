import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import contactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const { id } = useParams();
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  const handleSubmit = async (contact) => {
    try {
      const contactData = await contactsService.updateContact(id, contact);
      setContactName(contactData.name);
      toast({
        type: 'success',
        text: 'Contato Cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    async function getContact(contactId, signal) {
      try {
        const contactResponse = await contactsService.getContactById(contactId, signal);
        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contactResponse);
          setContactName(contactResponse.name);
          setIsLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setIsLoading(false);
          return;
        }
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        });
      }
    }
    if (id) {
      getContact(id, controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [id, history, safeAsyncAction]);

  return ({
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  });
}
