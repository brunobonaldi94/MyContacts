import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import useNewContact from './useNewContact';

function NewContact() {
  const {
    contactFormRef,
    handleSubmit,
  } = useNewContact();
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
