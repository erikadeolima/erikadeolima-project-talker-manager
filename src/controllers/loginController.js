const express = require('express');
// const fs = require('fs').promises;
const validatePassword = require('../middlewares/validatePassword.js');
const tokenGenerate = require('../untils/generateToken');
const validateEmail = require('../middlewares/validateEmail');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const token = await tokenGenerate();
  // fs.writeFile('../userAuth.json', JSON.stringify([email, password, token]));
  res.status(200).json({ email, password, token });
});

module.exports = loginRouter;