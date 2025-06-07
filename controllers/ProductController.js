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
  // // CREATE with Multer
  // async insert(req, res, next) {
  //   try {
  //     // 1) Ensure an image was uploaded
  //     if (!req.file) {
  //       return res.status(400).send({ message: 'Product image is required.' });
  //     }

  //     // 2) Build the imageUrl that your front end can fetch
  //     const imageUrl = `/uploads/${req.file.filename}`;

  //     // 3) Pull other fields out of the body
  //     const { name, description, price, stock, CategoryId } = req.body;

  //     // 4) Create the product row, including your new imageUrl
  //     const product = await Product.create({
  //       name,
  //       description,
  //       price,
  //       stock,
  //       imageUrl,
  //     });

  //     // 5) Associate category if provided
  //     if (CategoryId) await product.addCategory(CategoryId);

  //     res.status(201).send({
  //       message: 'Product created successfully',
  //       product,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // },

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

  //  // UPDATE with multer
  // async update(req, res) {
  //   try {
  //     // Gather up the fields to update
  //     const updates = { ...req.body };

  //     // If the admin included a new file, overwrite the imageUrl
  //     if (req.file) {
  //       updates.imageUrl = `/uploads/${req.file.filename}`;
  //     }

  //     // Perform the update
  //     const [updatedCount] = await Product.update(updates, {
  //       where: { id: req.params.id },
  //     });

  //     if (updatedCount === 0) {
  //       return res.status(404).send({ message: 'Product not found' });
  //     }

  //     // Reload the product (with associations)
  //     const updatedProduct = await Product.findByPk(req.params.id, {
  //       include: [{ model: Category, through: { attributes: [] } }, { model: Review }],
  //     });

  //     // If they sent a CategoryId, re-associate
  //     if (req.body.CategoryId) {
  //       await updatedProduct.addCategory(req.body.CategoryId);
  //     }

  //     res.status(200).send({
  //       message: 'Product updated successfully',
  //       product: updatedProduct,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({ message: 'Error', error });
  //   }
  // },

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
