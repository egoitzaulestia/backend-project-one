const { where } = require('sequelize');
const {
  Product,
  Review,
  Category,
  Order,
  Sequelize,
} = require('../models/index');
const { Op } = Sequelize;

const ProductController = {
  async insert(req, res, next) {
    try {
      const product = await Product.create(req.body);

      await product.addCategory(req.body.CategoryId);
      res.status(201).send({
        message: 'Product created successfully',
        product,
      });
    } catch (error) {
      console.error(error);
      // res.status(500).send({ message: "Error creating product", error });
      next(error);
    }
  },

  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Category, through: { attributes: [] } },
          // { model: Order, through: { attributes: [] } },
          { model: Review },
        ],
      });

      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(200).send({ message: 'Error', error });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id },
      });

      if (updated === 0) {
        return res.status(404).send({ message: 'Product not found' });
      }
      const updatedProduct = await Product.findByPk(req.params.id);
      await updatedProduct.addCategory(req.body.CategoryId);
      res.status(200).send({
        message: 'Product updated',
        product: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findOne({
        include: [
          { model: Category, through: { attributes: [] } },
          { model: Review },
        ],
        where: { id: req.params.id },
      });

      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }

      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getByName(req, res) {
    try {
      const product = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });

      if (product.length === 0) {
        return res.status(404).send({ message: 'No products found' });
      }

      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getByPrice(req, res) {
    try {
      const product = await Product.findAll({
        where: {
          price: {
            [Op.like]: +req.params.price,
          },
        },
      });

      if (product.length === 0) {
        return res.status(404).send({ message: 'No products found' });
      }

      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getByOrderedPrice(req, res) {
    try {
      const products = await Product.findAll({
        order: [['price', 'DESC']],
      });

      if (products.length === 0) {
        return res.status(404).send({
          message: 'There are no products in the DB',
        });
      }

      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id },
      });

      if (deleted === 0) {
        return res.status(404).send({ message: 'Product not found' });
      }

      res.status(200).send({ message: 'The product has been deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },
};

module.exports = ProductController;
