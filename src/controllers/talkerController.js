const express = require('express');
const readerTalkerFile = require('../untils/readerTalkerFile');
const authorizationToken = require('../middlewares/authorizationToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  try {
    const talker = await readerTalkerFile.readFile();
    return res.status(200).json(talker);
  } catch (err) {
    console.log(err);
    return res.status(200).json([]);
  }
  /* const talker = await readerTalkerFile.readFile();
  if (!talker) {
    return res.status(200).json([]);
  } 
  return res.status(200).json(talker); */
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readerTalkerFile.readFile();
  const result = talker.find((talkerPerson) => Number(talkerPerson.id) === Number(id));
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(result);
});

talkerRouter.post(
  '/',
  authorizationToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    await readerTalkerFile.writeFile({ name, age, talk: { watchedAt, rate } });
    res.status(201).json({ age, name, talk: { rate, watchedAt } });
  },
);

module.exports = talkerRouter;