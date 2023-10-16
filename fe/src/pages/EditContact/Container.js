import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import contactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import Presentation from './Presentation';

function EditContact() {
  const { id } = useParams();
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const navigate = useNavigate();
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
    async function getContact(contactId) {
      try {
        const contactResponse = await contactsService.getContactById(contactId);
        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contactResponse);
          setContactName(contactResponse.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          navigate('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        });
      }
    }
    if (id) {
      getContact(id);
    }
  }, [id, navigate, safeAsyncAction]);

  return (
    <Presentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  );
}

export default EditContact;
