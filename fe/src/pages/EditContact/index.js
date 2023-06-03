import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import contactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import Loader from '../../components/Loader';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

function EditContact() {
  const { id } = useParams();
  const contactFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
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
          history.push('/');
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
  }, [id, history, safeAsyncAction]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar Alterações"
      />
    </>
  );
}

export default EditContact;
