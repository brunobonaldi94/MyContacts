import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import useEditContact from './useEditContact';

function EditContact() {
  const {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  } = useEditContact();

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
