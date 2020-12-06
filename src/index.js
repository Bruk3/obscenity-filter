const badWords = require('../data/amharic.json').words;

/**
 * Checks if a word is obscene.
 * Returns true if the word is not obscene
 *
 * @param {string} word
 * @returns {boolean}
 */
function isPure(word) {
  return !(word in badWords);
}

/**
 * Returns the categorizing labels for a given obscene word.
 * Returns an empty array if isPure(word) == true.
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

/**
 * Checks if a phrase/sentence contains any obscene word.
 * Splits the string by whitespace before checking each word for obscenity.
 *
 * @param {string} phrase
 * @return {boolean}
*/
function containsObsceneWord(phrase) {
  const words = phrase.trim().split(/\s+/);

  for (let i = 0; i < words.length; i += 1) {
    if (!isPure(words[i])) {
      return true;
    }
  }

  return false;
}

/**
 * Scrubs all obscene words and replaces them with asterisk characters.
 *
 * @param {string} phrase
 * @return {string}
 */

function rmObscenityFromString(phrase) {
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
/**
 * Returns an array of all non-obscene words. Order of input is maintained.
 *
 * @param {array} words
 * @return {array}
 */

function rmObscenityFromArray(words) {
  const filtered = [];
  for (let i = 0; i < words.length; i += 1) {
    if (isPure(words[i])) {
      filtered.push(words[i]);
    }
  }
  return filtered;
}

function rmObscenity(words) {
  if (typeof (words) === 'string') {
    return rmObscenityFromString(words);
  }

  if (Array.isArray(words)) {
    return rmObscenityFromArray(words);
  }

  throw new TypeError();
}

module.exports = {
  containsObsceneWord,
  getLabels,
  isPure,
  rmObscenity,
};
