const { User, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
// const { jwt_secret } = require('../config/config.json')['development'];
const { jwt_secret } = require('../config/config')['development'];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const playload = jwt.verify(token, jwt_secret);
    const user = await User.findByPk(playload.id);
    const tokenFound = await Token.findOne({
      where: {
        [Op.and]: [{ UserId: user.id }, { token: token }],
      },
    });

    if (!tokenFound) {
      return res.status(401).send({ message: 'You are not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error, message: 'There was a problem with the token' });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ['admin', 'superadmin'];

  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: 'You are not athorized as any kind of admin',
    });
  }

  next();
};

module.exports = { authentication, isAdmin };
