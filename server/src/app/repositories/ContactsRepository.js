const { v4 } = require('uuid');
const db = require('../database');

let contacts = [
  {
    id: v4(),
    name: 'Bruno',
    email: 'bruno@mail.com',
    phone: '1212121212',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'bonaldi',
    email: 'bonaldi@mail.com',
    phone: '3212121212',
    category_id: v4(),
  },
];
class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT
       c.*
      ,ca.name AS category_name
    FROM contacts c
    LEFT JOIN categories ca
        ON ca.id = c.category_id
    ORDER BY c.name ${direction}
   `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
        SELECT * FROM contacts WHERE id = $1
   `, [id]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      resolve(
        contacts = contacts.filter((cont) => cont.id !== id),
      );
    });
  }

  async findByEmail(email) {
    const [row] = await db.query(`
        SELECT * FROM contacts WHERE email = $1
   `, [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts (name, email, phone, category_id)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `, [name, email, phone, category_id]);
    return row;
  }

  async edit(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
        UPDATE mycontacts
        set  name = $1,
        email = $2,
        phone = $3,
        category_id = $4
        WHERE id = $5
        RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }
}

module.exports = new ContactsRepository();
