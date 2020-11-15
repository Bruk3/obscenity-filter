const { assert } = require('chai');
const { describe, it } = require('mocha');

const { getLabels, isPure } = require('../src/index');

const BAD_WORDS = [
   ብድ
];

const GOOD_WORDS = [
  ብድሬን
];

describe('wordCheck', () => {
  describe('isPure', () => {
    it('should return type boolean for all words', () => {
      for (let i = 0; i < BAD_WORDS.length; i += 1) {
        const word = BAD_WORDS[i];
        assert.typeOf(isPure(word), 'boolean', `isPure(${word}) does not return a boolean`);
      }

      for (let i = 0; i < GOOD_WORDS.length; i += 1) {
        const word = GOOD_WORDS[i];
        assert.typeOf(isPure(word), 'boolean', `isPure(${word}) does not return a boolean`);
      }
    });
  });
});

describe('wordCheck', () => {
  describe('isPure', () => {
    it('should return false for any obscene amharic word in the json file', () => {
      for (let i = 0; i < BAD_WORDS.length; i += 1) {
        const word = BAD_WORDS[i];
        assert.equal(isPure(word), false);
      }
    });
  });
});

describe('wordCheck', () => {
  describe('isPure', () => {
    it('should return true for all "non-obscene" Amharic words', () => {
      for (let i = 0; i < GOOD_WORDS.length; i += 1) {
        const word = GOOD_WORDS[i];
        assert.equal(isPure(word), true);
      }
    });
  });
});

describe('wordCheck', () => {
  describe('getLabels', () => {
    it('should return an empty list for "non-obscene" Amharic words', () => {
      for (let i = 0; i < GOOD_WORDS.length; i += 1) {
        const word = GOOD_WORDS[i];
        assert.deepEqual(getLabels(word), []);
      }
    });
  });
});

describe('wordCheck', () => {
  describe('getLabels', () => {
    it('should return a list of the matching labels', () => {
        assert.deepEqual(getLabels(BAD_WORDS[0]), ['PN']);
      }
    });
  });
});