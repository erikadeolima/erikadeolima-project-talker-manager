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
  console.log('after push', dataTalkers);
  /* const result = await fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  return result; */
  // return res.status(201).json({ age, name, talk: { rate, watchedAt } });
  await fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  return res.status(201).json(newTalkerData);
}

async function editFile(req, res) {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const dataTalkers = await readFile();
  let result = dataTalkers.find((talkerPerson) => Number(talkerPerson.id) === Number(id));
  result = {
    name, 
    age,
    id,       
    talk: {
      rate,
      watchedAt,
    },
  };
  dataTalkers.splice(id, 1, result);
  console.log('after splice', dataTalkers);
  await fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  return res.status(200).json({ result });
}

module.exports = { readFile, writeFile, editFile };
