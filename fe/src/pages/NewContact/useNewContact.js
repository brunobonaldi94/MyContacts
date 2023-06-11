import { useRef } from 'react';
import contactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);
  const handleSubmit = async (contact) => {
    try {
      await contactsService.createContact(contact);
      contactFormRef.current.resetFields();
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
  return ({
    contactFormRef,
    handleSubmit,
  });
}
