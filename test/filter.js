const { assert } = require('chai');
const { describe, it } = require('mocha');

const Filter = require('../src/filter');

const filter = new Filter();

const BAD_WORDS = [
  'ብድ',
];

const GOOD_WORDS = [
  'ብድሬን',
];

const GOOD_PHRASES = [
  'ልዑኩ ትናንት አዲስ አበባ የገባው በኢትዮጵያ መንግሥትና በትግራይ ክልል ኃይሎች መካከል እየተካሄደ ያለው ግጭት ሦስት ሳምንት ካስቆጠረ እና የመጨረሻ የተባለው ዘመቻ እንዲካሄድ ጠቅላይ ሚንሰትሩ ካዘዙ በኋላ ነው።',
  'በዚህ መሰል የምርመራ ሥራ ላይ ተሳትፎ ሲደረግ   በተቻለ መጠን ግላዊ  ስሜትን ወደ ጎን በማድረግ ሙያዊ ሥራ ላይ ማተኮር ይጠበቃል',
];

const BAD_PHRASES = [
  'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ',
];

describe('filter', () => {
  describe('isPure', () => {
    it('should return type boolean for all words', () => {
      for (let i = 0; i < BAD_WORDS.length; i += 1) {
        const word = BAD_WORDS[i];
        assert.typeOf(filter.isPure(word), 'boolean', `isPure(${word}) does not return a boolean`);
      }

      for (let i = 0; i < GOOD_WORDS.length; i += 1) {
        const word = GOOD_WORDS[i];
        assert.typeOf(filter.isPure(word), 'boolean', `isPure(${word}) does not return a boolean`);
      }
    });
  });
});

describe('filter', () => {
  describe('isPure', () => {
    it('should return false for any obscene amharic word in the json file', () => {
      for (let i = 0; i < BAD_WORDS.length; i += 1) {
        const word = BAD_WORDS[i];
        assert.equal(filter.isPure(word), false);
      }
    });
  });
});

describe('filter', () => {
  describe('isPure', () => {
    it('should return true for all "non-obscene" Amharic words', () => {
      for (let i = 0; i < GOOD_WORDS.length; i += 1) {
        const word = GOOD_WORDS[i];
        assert.equal(filter.isPure(word), true);
      }
    });
  });
});

describe('filter', () => {
  describe('isPure', () => {
    it('empty string should return false', () => {
      assert.equal(filter.isPure(''), true);
    });
  });
});

describe('filter', () => {
  describe('getLabels', () => {
    it('should return an empty list for "non-obscene" Amharic words', () => {
      for (let i = 0; i < GOOD_WORDS.length; i += 1) {
        const word = GOOD_WORDS[i];
        assert.deepEqual(filter.getLabels(word), []);
      }
    });
  });
});

describe('filter', () => {
  describe('getLabels', () => {
    it('should return a list of the matching labels', () => {
      assert.deepEqual(filter.getLabels(BAD_WORDS[0]), ['PN']);
    });
  });
});

describe('filter', () => {
  describe('containsObscenity', () => {
    it('should return true for sentences that contain obscenity', () => {
      for (let i = 0; i < BAD_PHRASES.length; i += 1) {
        const phrase = BAD_PHRASES[i];
        assert.equal(filter.containsObscenity(phrase), true);
      }
    });
  });
});

describe('filter', () => {
  describe('containsObscenity', () => {
    it('should return false for sentences with no obscene words in them', () => {
      for (let i = 0; i < GOOD_PHRASES.length; i += 1) {
        const phrase = GOOD_PHRASES[i];
        assert.equal(filter.containsObscenity(phrase), false);
      }
    });
  });
});

describe('filter', () => {
  describe('scrub', () => {
    it('should not remove anything except whitespaces for phrases with no obscenity', () => {
      for (let i = 0; i < GOOD_PHRASES.length; i += 1) {
        const phrase = GOOD_PHRASES[i];
        const trimmedWords = phrase.trim().split(/\s+/);
        assert.equal(filter.scrub(phrase), trimmedWords.join(' '));
      }
    });
  });
});

describe('filter', () => {
  describe('scrub', () => {
    it('should remove all obscene words from string', () => {
      const rawPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ';
      const cleanedPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ **** እያሉ ይሳደባሉ';
      assert.equal(filter.scrub(rawPhrase), cleanedPhrase);
    });
  });
});

describe('filter', () => {
  describe('scrub', () => {
    it('throws TypeError for arguments of neither string nor array', () => {
      assert.throws(() => filter.scrub({ key: 'value' }), TypeError);
    });
  });
});

describe('filter', () => {
  describe('addWords', () => {
    it('throws TypeError when labels is undefined', () => {
      const newBadWords = ['አህያ', 'ድንጋይ'];
      assert.throws(() => filter.addWords(newBadWords), Error, 'Empty argument exception: addWords requires two positional parameters');
    });
  });
});

describe('filter', () => {
  describe('addWords', () => {
    it('adds new words with no filters to obscenity set. Check if the filter is NO', () => {
      const newBadWords = ['አህያ', 'ድንጋይ'];
      filter.addWords(newBadWords, []);
      for (let i = 0; i < newBadWords.length; i += 1) {
        assert.equal(filter.isPure(newBadWords[i]), false);
        assert.deepEqual(filter.getLabels(newBadWords[i]), ['NO']);
      }
    });
  });
});

describe('filter', () => {
  describe('addWords', () => {
    it('adds new words with IN (Insulting) filters to obscenity set.', () => {
      const newBadWords = ['ግማታም', 'ጥንባታም'];
      filter.addWords(newBadWords, [['IN'], ['IN']]);
      for (let i = 0; i < newBadWords.length; i += 1) {
        assert.equal(filter.isPure(newBadWords[i]), false);
        assert.deepEqual(filter.getLabels(newBadWords[i]), ['IN']);
      }
    });
  });
});

describe('filter', () => {
  describe('removeWords', () => {
    it('removes words from the set of obscenity words', () => {
      const toRemove = ['ቅምጥ'];
      for (let i = 0; i < toRemove.length; i += 1) {
        assert.equal(filter.isPure(toRemove[i]), false);
        filter.removeWords(toRemove);
        assert.equal(filter.isPure(toRemove[i]), true);
      }
    });
  });
});
