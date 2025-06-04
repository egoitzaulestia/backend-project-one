const { Category, Product, Sequelize } = require('../models/index');
const { Op } = Sequelize;

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

  async getAllAlone(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id },
      });

      if (!category) {
        return res.status(404).send({ message: 'Category not found' });
      }

      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getOneByName(req, res) {
    try {
      const category = await Category.findAll({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
        include: [Product],
      });

      if (category.length === 0) {
        return res.status(404).send({ message: 'No categories found' });
      }
      res.status(200).send(category);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Category.update(req.body, {
        where: { id: req.params.id },
      });

      if (updated === 0) {
        return res.status(404).send({ message: 'Category no found.' });
      }

      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).send({
        message: 'Category updated.',
        category: updatedCategory,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.id },
      });

      if (deleted === 0) {
        return res.status(404).send({ message: 'Category not found' });
      }

      res.status(200).send({ message: 'The Category has been deleted.' });
    } catch (error) {
      res.status(500).send({ message: 'Error', error });
    }
  },
};

module.exports = CategoryController;
