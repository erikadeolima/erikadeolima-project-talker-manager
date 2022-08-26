const fs = require('fs').promises;

async function readFile() {
  return fs.readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));
}

module.exports = { readFile };
