function validateEmail(req, res, next) {
  const { email } = req.body;
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!email) {
    res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!reg.test(email)) {
    res.status(400).json(
      {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    );
  }
  next();
}

module.exports = validateEmail;