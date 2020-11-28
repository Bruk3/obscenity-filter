const badWords = require('../data/amharic.json').words;

/**
 * checks if a word is obscene.
 * returns true if the word is not obscene
 *
 * @param {string} word
 * @returns {boolean}
 */
function isPure(word) {
  return !(word in badWords);
}

/**
 * returns the categorizing labels for a given obscene word
 * returns an empty array if isPure(word) == true
 *
 * @param {string} word
 * @returns {array}
 */
function getLabels(word) {
  let labels = [];

  if (word in badWords) {
    labels = badWords[word];
  }
  return labels;
}

function containsObsceneWord(phrase) {
  const words = phrase.trim().split(/\s+/);

  for (let i = 0; i < words.length; i += 1) {
    if (!isPure(words[i])) {
      return true;
    }
  }

  return false;
}

function removeObscenityFromString(phrase) {
  const words = phrase.trim().split(/\s+/);

  const filtered = [];
  for (let i = 0; i < words.length; i += 1) {
    if (isPure(words[i])) {
      filtered.push(words[i]);
    } else {
      filtered.push('*'.repeat(words[i].length));
    }
  }

  return filtered.join(' ');
}

function removeObscenityFromArray(words) {
  const filtered = [];
  for (let i = 0; i < words.length; i += 1) {
    if (isPure(words[i])) {
      filtered.push(words[i]);
    }
  }
  return filtered;
}

function removeObscenity(words) {
  if (typeof (words) === 'string') {
    return removeObscenityFromString(words);
  }

  if (Array.isArray(words)) {
    return removeObscenityFromArray(words);
  }

  throw new TypeError();
}

module.exports = {
  containsObsceneWord,
  getLabels,
  isPure,
  removeObscenity,
};
