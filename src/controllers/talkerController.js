const express = require('express');
const { editFile, readFile, deleteFile, writeFile } = require('../untils/readerTalkerFile');
const authorizationToken = require('../middlewares/authorizationToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const talkerRouter = express.Router();

talkerRouter.get('/search', authorizationToken, async (req, res) => {
  const { q } = req.query;
  const talker = await readFile();
  const result = talker.filter((user) => user.name.includes(q));
  if (!q || q.length === 0) {
    return res.status(200).json(talker);
  }
  if (result.length === 0) {
    return res.status(200).json(talker);
  }
  return res.status(200).json(result);
});

talkerRouter.get('/', async (req, res) => {
  try {
    const talker = await readFile();
    return res.status(200).json(talker);
  } catch (err) {
    console.log(err);
    return res.status(200).json([]);
  }
  /* const talker = await readFile();
  if (!talker) {
    return res.status(200).json([]);
  } 
  return res.status(200).json(talker); */
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
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
  writeFile,
  /* (req, _res) => {
    // const { name, age, talk: { watchedAt, rate } } = req.body;
    readerTalkerFile.writeFile({ name, age, talk: { watchedAt, rate } });
    // const talker = await readerTalkerFile.readFile();
  // return res.status(201).json({ talker });
    // return res.status(201).json({ name, age, talk: { watchedAt, rate } });
  }, */
);

talkerRouter.put(
  '/:id',
  authorizationToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  editFile,
);

talkerRouter.delete(
  '/:id',
  authorizationToken,
  deleteFile,
);

module.exports = talkerRouter;