const { Review, User, Products, Sequelize } = require('../models/index');
const { Op } = Sequelize;

const ReviewController = {
  async create(req, res) {
    try {
      const review = await Review.create({
        ...req.body,
        UserId: req.user.id,
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
};

module.exports = ReviewController;
