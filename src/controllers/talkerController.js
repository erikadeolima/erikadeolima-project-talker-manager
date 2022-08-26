const express = require('express');
const readerTalkerFile = require('../readerTalkerFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  /* try {
    const talker = await readerTalkerFile.readFile();
    return res.status(200).json(talker);
  } catch (err) {
    console.log(err);
    return res.status(200).json([]);
  } */
  /*  */
  const talker = await readerTalkerFile.readFile();
  if (!talker) {
    return res.status(200).json([]);
  } 
  return res.status(200).json(talker);
});

module.exports = talkerRouter;