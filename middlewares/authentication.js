// const { User, Token, Role, Sequelize } = require("../models");
// const { Op } = Sequelize;
// const jwt = require("jsonwebtoken");
// const { jwt_secret } = require("../config/config")["development"];

// const authentication = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;

//     const playload = jwt.verify(token, jwt_secret);

//     const user = await User.findByPk(playload.id, {
//       include: [{ model: Role }],
//     });

//     const tokenFound = await Token.findOne({
//       where: {
//         [Op.and]: [{ UserId: user.id }, { token: token }],
//       },
//     });

//     if (!tokenFound) {
//       return res.status(401).send({ message: "You are not authorized" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ error, message: "There was a problem with the token" });
//   }
// };

// const isAdmin = async (req, res, next) => {
//   // const admins = ["admin", "superadmin"];
//   const roleName = req.user.Role && req.user.Role.name;
//   if (!["admin", "superadmin"].includes(roleName)) {
//     return res.status(403).send({
//       message: "You are not athorized as any kind of admin",
//     });
//   }

//   next();
// };

// authentication.js

// authentication.js

const { User, Token, Role, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config')['development'];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);

    // Eager‐load the Role so we can read role.name later
    const user = await User.findByPk(payload.id, {
      include: [{ model: Role }],
    });

    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    const tokenFound = await Token.findOne({
      where: {
        [Op.and]: [{ UserId: user.id }, { token }],
      },
    });

    if (!tokenFound) {
      return res.status(401).send({ message: 'You are not authorized' });
    }

    // We attach the entire user (with user.Role) to req.user
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'There was a problem with the token',
      error: error,
    });
  }
};

const isAdmin = (req, res, next) => {
  // req.user.Role.name is the string from our Roles table
  const roleName = req.user.Role && req.user.Role.name;

  if (!['admin', 'superadmin'].includes(roleName)) {
    return res.status(403).send({
      message: 'You are not authorized as any kind of admin',
    });
  }

  next();
};

module.exports = { authentication, isAdmin };
