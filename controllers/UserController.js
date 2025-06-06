const { User, Order, OrderItem, Product, Token } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const UserController = {
    async createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: 'All fields are obligatory' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const RoleId = 1;

        const user = await User.create({ ...req.body, password: hashedPassword, RoleId });
        res.status(201).send({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error });
    }
},

    async login(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).send({ message: 'User or password are not correct' });
            }

            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: 'User or password are not correct' });
            }

            const token = jwt.sign({ id: user.id }, jwt_secret);
            await Token.create({ token, UserId: user.id });

            const { password, ...userData } = user.toJSON();
            res.send({ user: userData, token });

        } catch (error) {
            res.status(500).send({ message: 'Error while loggin', error });
        }
    },

  async logout(req, res) {
      try {
        const token = req.headers.authorization;

        if (!token) {
          return res.status(401).send({ message: 'Token not given' });
        }

        const deleted = await Token.destroy({ where: { token } });

        if (deleted) {
          return res.send({ message: 'Session closed successfully' });
        } else {
          return res.status(400).send({ message: 'Token not founded or already destroyed' });
        }
      } catch (error) {
        res.status(500).send({ message: 'Error while loggout', error });
      }
    },

    async loggedUserWithOrders(req, res) {
      try {
        const userId = req.user.id;

        const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Order,
          attributes: ['id', 'orderDate', 'status', 'totalAmount'],
          include: [
            {
              model: OrderItem,
              attributes: ['quantity', 'unitPrice'],
              include: [
                {
                  model: Product,
                  attributes: ['id', 'name']
                }
              ]
            }
          ]
        }
      ]
    });

    if (!user) return res.status(404).json({ error: 'User not founded' });

    // Formatear la salida
    const result = {
      id: user.id,
      name: user.name,
      email: user.email,
      orders: user.Orders.map(order => ({
        id: order.id,
        orderDate: order.orderDate,
        status: order.status,
        totalAmount: order.totalAmount,
        items: order.OrderItems.map(item => ({
          productId: item.Product.id,
          name: item.Product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }))
      }))
    };

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
};

module.exports = UserController;