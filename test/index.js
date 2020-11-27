const { assert } = require('chai');
const { describe, it } = require('mocha');

const {
  containsObsceneWord, getLabels, isPure, removeObscenity,
} = require('../src/index');

const BAD_WORDS = [
  'ብድ',
];

const GOOD_WORDS = [
  'ብድሬን',
];

const GOOD_PHRASES = [
  'ልዑኩ ትናንት አዲስ አበባ የገባው በኢትዮጵያ መንግሥትና በትግራይ ክልል ኃይሎች መካከል እየተካሄደ ያለው ግጭት ሦስት ሳምንት ካስቆጠረ እና የመጨረሻ የተባለው ዘመቻ እንዲካሄድ ጠቅላይ ሚንሰትሩ ካዘዙ በኋላ ነው።',
  'በዚህ መሰል የምርመራ ሥራ ላይ ተሳትፎ     ሲደረግ    በተቻለ መጠን ግላዊ  ስሜትን ወደ ጎን በማድረግ ሙያዊ ሥራ ላይ ማተኮር ይጠበቃል',
];

const BAD_PHRASES = [
  'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ',
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
  describe('isPure', () => {
    it('empty string should return false', () => {
      assert.equal(isPure(''), true);
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
    });
  });
});

describe('phraseCheck', () => {
  describe('containsObsceneWord', () => {
    it('should return true for sentences that contain obscenity', () => {
      for (let i = 0; i < BAD_PHRASES.length; i += 1) {
        const phrase = BAD_PHRASES[i];
        assert.equal(containsObsceneWord(phrase), true);
      }
    });
  });
});

describe('phraseCheck', () => {
  describe('containsObsceneWord', () => {
    it('should return false for sentences with no obscene words in them', () => {
      for (let i = 0; i < GOOD_PHRASES.length; i += 1) {
        const phrase = GOOD_PHRASES[i];
        assert.equal(containsObsceneWord(phrase), false);
      }
    });
  });
});

describe('filterWords', () => {
  describe('removeObscenity', () => {
    it('should not remove anything except whitespaces for phrases with no obscenity', () => {
      for (let i = 0; i < GOOD_PHRASES.length; i += 1) {
        const phrase = GOOD_PHRASES[i];
        const trimmedWords = phrase.trim().split(/\s+/);
        assert.equal(removeObscenity(phrase), trimmedWords.join(' '));
      }
    });
  });
});

describe('filterWords', () => {
  describe('removeObscenity', () => {
    it('should remove all obscene words from string', () => {
      const rawPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ';
      const cleanedPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ **** እያሉ ይሳደባሉ';
      assert.equal(removeObscenity(rawPhrase), cleanedPhrase);
    });
  });
});

describe('filterWords', () => {
  describe('removeObscenity', () => {
    it('should return non-obscene words only from array', () => {
      const rawPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ';
      const cleanedPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ እያሉ ይሳደባሉ';
      assert.deepEqual(removeObscenity(rawPhrase.split(/\s+/)), cleanedPhrase.split(/\s+/));
    });
  });
});

describe('filterWords', () => {
  describe('removeObscenity', () => {
    it('throws TypeError for arguments of neither string nor array', () => {
      assert.throws(() => removeObscenity({ key: 'value' }), TypeError);
    });
  });
});
