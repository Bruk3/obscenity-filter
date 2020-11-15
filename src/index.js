const badWords = require('../data/amharic.json').words;
const { allLabels } = require('../data/amharic.json');

function isPure(word) {
  return word in badWords;
}

function getLabels(word) {
  let labels = [];

  if (word in badWords) {
    labels = badWords[word];
  }
  return labels;
}

module.exports = {
  getLabels,
  isPure,
};
