const { Order, Product, OrderItem, sequelize } = require('../models');

const createOrder = async (req, res) => {
  const { UserId, orderDate, products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: 'It is necessary at least one product' });
  }

  const t = await sequelize.transaction();

  try {
    // 1. Buscar productos en la BD
    const productIds = products.map((p) => p.ProductId);
    const foundProducts = await Product.findAll({
      where: { id: productIds },
      transaction: t,
    });

    let totalAmount = 0;
    const orderItems = [];

    // 2. Calcular total y preparar datos
    for (const { ProductId, quantity } of products) {
      const product = foundProducts.find((p) => p.id === ProductId);
      if (!product) throw new Error(`Product not found: ${ProductId}`);

      const unitPrice = parseFloat(product.price);
      totalAmount += unitPrice * quantity;

      orderItems.push({
        ProductId,
        quantity,
        unitPrice,
      });
    }

    // 3. Crear el pedido
    const newOrder = await Order.create(
      {
        UserId,
        orderDate,
        totalAmount,
        status: 'pending',
      },
      { transaction: t },
    );

    // 4. Crear los items del pedido
    for (const item of orderItems) {
      await OrderItem.create(
        {
          OrderId: newOrder.id,
          ...item,
        },
        { transaction: t },
      );
    }

    // 5. Confirmar la transacción
    await t.commit();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: newOrder.id,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error creating the order' });
  }
};

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
          attributes: [
            'id',
            'name',
            'description',
            'price',
            'imageUrl',
            'stock',
          ],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
};

module.exports = { createOrder, getOrdersWithProducts };
