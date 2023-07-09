import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import { ListHeader, Card } from './styles';

function ContactsList({
  filteredContacts,
  orderByAsc,
  onToggleOrderBy,
  onDeleteContact,

}) {
  return (
    <>

      {filteredContacts.length > 0 && (
      <ListHeader $orderByAsc={orderByAsc}>
        <header>
          <button
            type="button"
            className="sort-button"
            onClick={
              () => onToggleOrderBy()
            }
          >
            <span>
              Nome
            </span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListHeader>
      )}
      {filteredContacts.map((contact) => (
        <Card
          key={contact.id}
        >
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {Object.keys(contact.category).length > 0 && (
                <small>{contact.category.categoryName}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button onClick={() => onDeleteContact(contact)} type="button">
              <img src={trash} alt="Trash" />
            </button>
          </div>
        </Card>
      ))}

    </>
  );
}

export default ContactsList;

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      categoryName: PropTypes.string,
    }).isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })).isRequired,
  orderByAsc: PropTypes.bool.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  contactBeingDelete: PropTypes.shape({
    name: PropTypes.string,
  }),

};

ContactsList.defaultProps = {
  contactBeingDelete: null,
};
