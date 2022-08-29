const fs = require('fs').promises;

async function readFile() {
  return fs.readFile('./src/talker.json', 'utf-8')
  .then((data) => JSON.parse(data));
}

async function writeFile(req, res) {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const dataTalkers = await readFile();
  const newTalkerData = {
    name, 
    age,
    id: Number(dataTalkers.length + 1),       
    talk: {
      rate,
      watchedAt,
    },
  };
  dataTalkers.push(newTalkerData);
  /* const result = await fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  return result; */
  // return res.status(201).json({ age, name, talk: { rate, watchedAt } });
  await fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  return res.status(201).json(newTalkerData);
}

async function editFile(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const dataTalkers = await readFile();
  const edit = { name, age, talk };
  const talkersEdited = dataTalkers.map((talker) => {
    if (talker.id === Number(id)) {
      return { ...talker, ...edit };
    }
    return talker;
  });
  await fs.writeFile('./src/talker.json', JSON.stringify(talkersEdited));
  return res.status(200).json({ id: Number(id), ...edit });
}

async function deleteFile(req, res) {
  const { id } = req.params;
  const dataTalkers = await readFile();
  const result = dataTalkers.findIndex((talkerPerson) => Number(talkerPerson.id) === Number(id));
  await dataTalkers.splice(result, 1);
  fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  return res.status(204).json(dataTalkers);
}

module.exports = { readFile, writeFile, editFile, deleteFile };
