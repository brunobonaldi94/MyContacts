import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderByAsc = true) {
    const orderBy = orderByAsc ? 'ASC' : 'DESC';
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async createContact(contact) {
    return this.httpClient.post('/contacts', {
      body: contact,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async updateContact(contact) {
    return this.httpClient.put('/contacts', {
      body: contact,
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
