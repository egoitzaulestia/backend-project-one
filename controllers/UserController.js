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
const { jwt_secret } = require('../config/config')['development'];
const transporter = require('../config/nodemailer');

// IMPORTANT:
// It's compulsory to create or establish the roles
// in ROLE TABLE before creating a user
// 1: 'user'
// 2: 'admin'
// 3: 'superadmin'
const UserController = {
  async create(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        ...req.body,
        password: hashedPassword,
        confirmed: false,
        RoleId: 3, // we initaite every user as 'user' role
      });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: '48h',
      });
      // IMPORTANT: Correct the "2" in users2 !!!
      // const url = `http://localhost:3000/users/confirm/${emailToken}`; // Backend route
      const url = `http://localhost:5173/confirm/${emailToken}`; // Frontend route
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirm your regist',
        html: `
        <h3>Welcome, you are almost there </3>
        <a href=${url}> Click here to confirm your regist</a>
        `,
      });

      res.status(201).send({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
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

  async getById(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] }, // never send the hash
        include: [
          {
            model: Order,
            include: [{ model: Product, through: { attributes: [] } }],
          },
          { model: Review },
        ],
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error', error });
    }
  },

  async getInfo(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }, // never send the hash
        include: [
          {
            model: Order,
            include: [
              {
                model: OrderItem,
                include: [Product],
              },
            ],
          },

          { model: Review },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Unable to fetch user info', error });
    }
  },

  async loggedUserWithOrders(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [
          {
            model: Order,
            include: [
              {
                model: OrderItem,
                include: [Product],
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error', error });
    }
  },
};

module.exports = UserController;
