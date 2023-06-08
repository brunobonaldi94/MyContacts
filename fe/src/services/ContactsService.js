import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderByAsc = true) {
    const orderBy = orderByAsc ? 'ASC' : 'DESC';
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async createContact(contact) {
    const body = ContactMapper.toPersistance(contact);
    return this.httpClient.post('/contacts', {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);
    return ContactMapper.toDomain(contact);
  }

  async updateContact(id, contact) {
    const body = ContactMapper.toPersistance(contact);
    return this.httpClient.put(`/contacts/${id}`, {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
