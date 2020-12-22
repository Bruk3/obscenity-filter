const obsceneWords = require('../data/amharic.json').words;

class Filter {
  /** Filter object constructor
   * @param {boolean} useDefaultWords: Use the default set of obscene words
   * @param {array} excludeWords - Words to exclude from obscenity set
   * @param {string} replaceBy - Character used to replace obscene words
  */
  constructor(useDefaultWords, excludeWords, replaceBy) {
    this.obscenitySet = {};
    if (useDefaultWords === undefined || useDefaultWords === true) {
      this.obscenitySet = obsceneWords;
    }

    this.replaceBy = replaceBy || '*';
    this.removeWords(excludeWords || []);
  }

  /** Add new words to obscenity set
   * @param {array} words: New words to add to obscenity set
   * @param {array} labels: An array of arrays with all the labels for each new word
   */
  addWords(words, labels) {
    if (!words || !labels) {
      throw new Error('Empty argument exception: addWords requires two positional parameters');
    }
    for (let i = 0; i < words.length; i += 1) {
      this.addWord(words[i], labels[i] || null);
    }
  }

  /** Add single word to the set of obscenity words
   * @param {string} word
   * @param {array} labels: Labels of the new word: Existing labels are [PN, RT, IN, NO]
   */

  addWord(word, labels) {
    if (word.length <= 1) {
      return;
    }
    if (!labels || labels.length === 0) {
      this.obscenitySet[word] = ['NO'];
    } else {
      this.obscenitySet[word] = labels;
    }
  }

  /**
   * Checks if a word is obscene.
   * Returns true if the word is not obscene
   *
   * @param {string} word
   * @returns {boolean}
   */
  isPure(word) {
    return !(word in this.obscenitySet);
  }

  /** Remove words from the set of obscenity words
   * @param {list} words: A list of strings
   *
  */
  removeWords(words) {
    for (let i = 0; i < words.length; i += 1) {
      this.removeWord(words[i]);
    }
  }

  /** Remove single word from the set of obscenity words
   * @param {string} word
   */
  removeWord(word) {
    delete this.obscenitySet[word];
  }

  /**
   * Returns the categorizing labels for a given obscene word.
   * Returns an empty array if isPure(word) == true.
   *
   * @param {string} word
   * @returns {array}
   */
  getLabels(word) {
    let labels = [];

    if (word in this.obscenitySet) {
      labels = this.obscenitySet[word];
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
  containsObscenity(phrase) {
    const words = phrase.trim().split(/\s+/);

    for (let i = 0; i < words.length; i += 1) {
      if (!this.isPure(words[i])) {
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

  scrub(phrase) {
    const words = phrase.trim().split(/\s+/);

    const filtered = [];
    for (let i = 0; i < words.length; i += 1) {
      if (this.isPure(words[i])) {
        filtered.push(words[i]);
      } else {
        filtered.push(this.replaceBy.repeat(words[i].length));
      }
    }

    return filtered.join(' ');
  }
}

module.exports = Filter;
