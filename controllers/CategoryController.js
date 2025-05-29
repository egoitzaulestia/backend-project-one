const { Category } = require('../models/index');

const CategoryController = {
  async insert(req, res) {
    try {
      const category = await Category.create(req.body);
      res
        .status(201)
        .send({ message: 'Category added successfully', category });
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },
};

module.exports = CategoryController;
