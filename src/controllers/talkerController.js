const express = require('express');
const readerTalkerFile = require('../untils/readerTalkerFile');

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

module.exports = talkerRouter;