const express = require('express');
const tokenGenerate = require('../untils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerate();
  res.status(200).json({ email, password, token });
});

module.exports = loginRouter;