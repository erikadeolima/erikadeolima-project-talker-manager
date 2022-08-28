function validateTalk(req, res, next) {
  const { talk } = req.body;
  // const { talk: { watchedAt, rate } } = req.body;
  // const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } 
  next();
}

module.exports = validateTalk;