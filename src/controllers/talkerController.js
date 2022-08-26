const express = require('express');
const readerTalkerFile = require('../readerTalkerFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  try {
    const talker = await readerTalkerFile.readFile();
    return res.status(200).json(talker);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
    return res.status(200).json([]);
  }
});

module.exports = talkerRouter;