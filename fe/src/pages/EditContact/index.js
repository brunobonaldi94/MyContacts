import React from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

function EditContact() {
  return (
    <>
      <PageHeader
        title="Editar Bruno Bonaldi"
      />
      <ContactForm buttonLabel="Salvar Alterações" />
    </>
  );
}

export default EditContact;
