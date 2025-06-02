const { Order, Product, OrderItem } = require('../models');

const getOrdersWithProducts = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          through: {
            model: OrderItem,
            attributes: ['OrderId', 'ProductId', 'quantity', 'unitPrice'],
          },
          attributes: ['id', 'name', 'description', 'price', 'imageUrl', 'stock'],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
};

module.exports = { getOrdersWithProducts };