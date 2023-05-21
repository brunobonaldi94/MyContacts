import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import contactsService from '../../services/ContactsService';

function EditContact() {
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      const response = await contactsService.update(contact);
      console.log(response);
    } catch {
      alert('Ocorreu um erro ao editar o contato!');
    }
  };

  return (
    <>
      <PageHeader
        title="Editar Bruno Bonaldi"
      />
      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Salvar Alterações"
      />
    </>
  );
}

export default EditContact;
