function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    console.log('O campo "password" é obrigatório');
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      console.log('O "password" deve ter pelo menos 6 caracteres');
      return res.status(400).json({
          message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }
  next();
}

module.exports = validatePassword;