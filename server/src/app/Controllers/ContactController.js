const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found!' });
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({
        error: 'it must have name, email, phone',
      });
    }
    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }
    if (email) {
      const contactsExists = await ContactsRepository.findByEmail(email);
      if (contactsExists) {
        return response.status(400).json({
          error: 'email already exists',
        });
      }
    }
    const contact = await ContactsRepository.create({
      name, email: email || null, phone, category_id: category_id || null,
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }
    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }
    if (!name) {
      return response.status(400).json({
        error: 'it must have name, email, phone',
      });
    }
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({
        error: 'Contact does not exists',
      });
    }
    await ContactsRepository.edit(id, {
      name, email: email || null, phone, category_id: category_id || null,
    });
    response.status(200).json({
      name, email: email || null, phone, category_id: category_id || null,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found!' });
    }
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
