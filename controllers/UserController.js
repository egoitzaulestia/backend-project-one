const { User, Order, OrderItem, Product, Token } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const UserController = {
    async createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: 'Todos los campos son obligatorios' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const RoleId = 1;

        const user = await User.create({ ...req.body, password: hashedPassword, RoleId });
        res.status(201).send({ message: 'Usuario creado con éxito', user });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear usuario', error });
    }
},

    async login(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).send({ message: 'Usuario o contraseña incorrectos' });
            }

            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ message: 'Usuario o contraseña incorrectos' });
            }

            const token = jwt.sign({ id: user.id }, jwt_secret);
            await Token.create({ token, UserId: user.id });

            const { password, ...userData } = user.toJSON();
            res.send({ user: userData, token });

        } catch (error) {
            res.status(500).send({ message: 'Error al iniciar sesión', error });
        }
    },

  async logout(req, res) {
      try {
        const token = req.headers.authorization;

        if (!token) {
          return res.status(401).send({ message: 'Token no proporcionado' });
        }

        const deleted = await Token.destroy({ where: { token } });

        if (deleted) {
          return res.send({ message: 'Sesión cerrada exitosamente' });
        } else {
          return res.status(400).send({ message: 'Token no encontrado o ya cerrado' });
        }
      } catch (error) {
        res.status(500).send({ message: 'Error al cerrar sesión', error });
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

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

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
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
};

module.exports = UserController;