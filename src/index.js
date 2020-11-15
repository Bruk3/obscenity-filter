const badWords = require('../data/amharic.json').words;

function isPure(word) {
  return !(word in badWords);
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
