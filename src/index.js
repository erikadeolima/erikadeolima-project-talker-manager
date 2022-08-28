const express = require('express');
const bodyParser = require('body-parser');
const talkerController = require('./controllers/talkerController');
const loginController = require('./controllers/loginController');
// const talkers = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// app.get('/talker', (req, res) => res.status(200).json(talkers));

app.use('/talker', talkerController);
app.use('/login', loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
