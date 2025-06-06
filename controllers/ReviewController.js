const { Review, User, Product, Sequelize } = require('../models/index');
const { Op } = Sequelize;

const ReviewController = {
  async create(req, res) {
    try {
      const user = await User.findByPk(req.body.UserId);
      const product = await Product.findByPk(req.body.ProductId);

      if (!user || !product) {
        return res.status(400).send({ message: 'User or product not found' });
      }
      const review = await Review.create({
        ...req.body,
        UserId: user.id,
        ProductId: product.id,
      });
      res.status(201).send({
        message: 'Review created successfully',
        review,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  // async create(req, res) {
  //   try {
  //     // At this point, `authentication` has already set `req.user`
  //     // (and we know req.user.id is a valid, authenticated user).
  //     const userId = req.user.id;
  //     const productId = req.body.ProductId;
  //     // (we still want to verify the client-­provided product ID exists)

  //     // We check that the product actually exists
  //     const product = await Product.findByPk(productId);
  //     if (!product) {
  //       return res.status(400).send({ message: "Product not found" });
  //     }

  //     // We create the review with `UserId` coming from the token
  //     const review = await Review.create({
  //       title: req.body.title,
  //       comment: req.body.comment,
  //       rating: req.body.rating,
  //       UserId: userId,
  //       ProductId: productId,
  //     });

  //     return res.status(201).send({
  //       message: "Review created successfully",
  //       review,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send({ message: "Error", error });
  //   }
  // },

  async getAll(req, res) {
    try {
      const reviews = await Review.findAll({
        include: [{ model: User }, { model: Product }],
      });
      res.send(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Review.update(req.body, {
        where: { id: req.params.id },
      });

      if (updated === 0) {
        return res.status(404).send({ message: 'Review not found' });
      }

      const updatedReview = await Review.findByPk(req.params.id);
      res.status(200).send({
        message: 'Review updated',
        review: updatedReview,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async delete(req, res) {
    try {
      await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({ message: 'The review has been deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },
};

module.exports = ReviewController;
