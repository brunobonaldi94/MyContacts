const db = require('../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT
     *
    FROM categories ca
    ORDER BY ca.name ${direction}
   `);
    return rows;
  }

  async findByName(name) {
    const [row] = await db.query(`
    SELECT
     *
    FROM categories ca
    WHERE UPPER(ca.name) = UPPER($1)
   `, [name]);
    return row;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT
     *
    FROM categories ca
    WHERE ca.id = $1
   `, [id]);
    return row;
  }

  async create({
    name,
  }) {
    const [row] = await db.query(`
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *
      `, [name]);
    return row;
  }

  async delete(id) {
    const [row] = await db.query(`
      DELETE FROM categories
      WHERE id = $1`, [id]);
    return row;
  }
}
module.exports = new CategoriesRepository();
