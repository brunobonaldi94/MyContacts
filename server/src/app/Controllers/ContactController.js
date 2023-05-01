const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found!' });
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;
    if (!name || !email || !phone) {
      return response.status(400).json({
        error: 'it must have name, email, phone',
      });
    }
    const contactsExists = await ContactsRepository.findByEmail(email);
    if (contactsExists) {
      return response.status(400).json({
        error: 'email already exists',
      });
    }
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;
    if (!name || !email || !phone) {
      return response.status(400).json({
        error: 'it must have name, email, phone',
      });
    }
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({
        error: 'user does not exists',
      });
    }
    await ContactsRepository.edit(id/*  */, {
      name, email, phone, category_id,
    });
    response.status(200).json({
      id, name, email, phone, category_id,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User Not Found!' });
    }
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
