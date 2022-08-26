const express = require('express');
const readerTalkerFile = require('../readerTalkerFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const talker = await readerTalkerFile.readFile();
  if (!talker) {
    console.log('entrou');
    return res.status(200).json([]);
  } 
  return res.status(200).json(talker);
});

module.exports = talkerRouter;