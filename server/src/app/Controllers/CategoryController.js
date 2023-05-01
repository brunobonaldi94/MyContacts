const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);
    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }
    const category = await CategoriesRepository.create({ name });
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ error: 'Id is required' });
    }
    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      return response.status(400).json({ error: 'Category does not exists' });
    }
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
