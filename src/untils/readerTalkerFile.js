const fs = require('fs').promises;

async function readFile() {
  return fs.readFile('./src/talker.json', 'utf-8')
  .then((data) => JSON.parse(data));
}

async function writeFile({ name, age, talk: { watchedAt, rate } }) {
  const dataTalkers = await readFile();
  // {"age": 62, "id": 1, "name": "Henrique Albuquerque", "talk": {"rate": 5, "watchedAt": "23/10/2020"}},
  const newTalkerData = {
    name,
    age,
    id: dataTalkers.length + 1,        
    talk: {
      rate,
      watchedAt,
    },
  };
  dataTalkers.push(newTalkerData);
  console.log('after push', dataTalkers);
  return fs.writeFile('./src/talker.json', JSON.stringify(dataTalkers));
  // return res.status(201).json({ age, name, talk: { rate, watchedAt } });
}

module.exports = { readFile, writeFile };
