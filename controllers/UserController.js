// const { User, Order, OrderItem, Product, Token } = require('../models/index');
const {
  User,
  Review,
  Product,
  Token,
  Order,
  OrderItem,
  Sequelize,
} = require('../models/index');
const { Op } = Sequelize;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];
const transporter = require('../config/nodemailer');

const UserController = {
  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .send({ message: 'Todos los campos son obligatorios' });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // const RoleId = 1;

      const user = await User.create({
        ...req.body,
        password: hashedPassword,
        confirmed: false,
        RoleId: 1,
      });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: '48h',
      });
      // IMPORTANT: Correct the "2" in users2 !!!
      const url = `http://localhost:3000/users/confirm/${emailToken}`;
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirm your regist',
        html: `
        <h3>Welcome, you are almost there </3>
        <a href=${url}> Click here to confirm your regist</a>
        `,
      });

      res.status(201).send({ message: 'Usuario creado con éxito', user });
    } catch (error) {
      // res.status(500).send({ message: 'Error al crear usuario', error });
      console.error(error);
      next(error);
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      await User.update(
        { confirmed: true },
        {
          where: {
            email: payload.email,
          },
        },
      );
      res.status(201).send('User confirmed successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  // async login(req, res) {
  //   try {
  //     const user = await User.findOne({ where: { email: req.body.email } });
  //     if (!user) {
  //       return res
  //         .status(400)
  //         .send({ message: 'Usuario o contraseña incorrectos' });
  //     }

  //     const isMatch = bcrypt.compare(req.body.password, user.password);
  //     if (!isMatch) {
  //       return res
  //         .status(400)
  //         .send({ message: 'Usuario o contraseña incorrectos' });
  //     }

  //     if (!user.confirmed) {
  //       return res.status(400).send({ message: 'You must confirm your email' });
  //     }

  //     const token = jwt.sign({ id: user.id }, jwt_secret);
  //     await Token.create({ token, UserId: user.id });

  //     const { password, ...userData } = user.toJSON();
  //     res.send({ message: `Welcome ${user.name}`, user: userData, token });
  //   } catch (error) {
  //     res.status(500).send({ message: 'Error al iniciar sesión', error });
  //   }
  // },

  async login(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (!user) {
        return res.status(400).send({ message: 'Incorrect user or password' });
      }

      const inputPassword = req.body.password;
      const isMatch = await bcrypt.compare(inputPassword, user.password);

      if (!isMatch) {
        return res.status(400).send({ message: 'Incorrect user or password' });
      }

      if (!user.confirmed) {
        return res.status(400).send({ message: 'You must confirm your email' });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });

      res.status(200).send({ message: `Welcome ${user.name}`, user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Logging error', error });
    }
  },

  // async logout(req, res) {
  //   try {
  //     const token = req.headers.authorization;

  //     if (!token) {
  //       return res.status(401).send({ message: 'Token no proporcionado' });
  //     }

  //     const deleted = await Token.destroy({ where: { token } });

  //     if (deleted) {
  //       return res.send({ message: 'Sesión cerrada exitosamente' });
  //     } else {
  //       return res
  //         .status(400)
  //         .send({ message: 'Token no encontrado o ya cerrado' });
  //     }
  //   } catch (error) {
  //     res.status(500).send({ message: 'Error al cerrar sesión', error });
  //   }
  // },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.status(200).send({ message: 'Logout successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem while trying to logout',
      });
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
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!user)
        return res.status(404).json({ error: 'Usuario no encontrado' });

      // Formatear la salida
      const result = {
        id: user.id,
        name: user.name,
        email: user.email,
        orders: user.Orders.map((order) => ({
          id: order.id,
          orderDate: order.orderDate,
          status: order.status,
          totalAmount: order.totalAmount,
          items: order.OrderItems.map((item) => ({
            productId: item.Product.id,
            name: item.Product.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        })),
      };

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = UserController;
