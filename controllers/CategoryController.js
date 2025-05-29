const { Category, Product } = require('../models/index');

const CategoryController = {
  async insert(req, res) {
    try {
      const category = await Category.create(req.body);
      res
        .status(201)
        .send({ message: 'New category created successfully', category });
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [{ model: Product, through: { attributes: [] } }],
      });
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },
};

module.exports = CategoryController;
