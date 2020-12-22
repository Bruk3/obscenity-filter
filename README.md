# obscenity-filter


#### What is it? 
A javascript library that detects obscene Amharic words and phrases.

### An obscenity filter library for the Amharic langauge. 
![GitHub](https://img.shields.io/github/license/bruk3/obscenity-filter)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/bruk3/obscenity-filter/CI/main)
![nycrc config on GitHub](https://img.shields.io/nycrc/bruk3/obscenity-filter?config=.nycrc.json)
![Read the Docs](https://img.shields.io/readthedocs/j-parser)


---
A variety of public facing social websites process input texts from users in order to display it in public. These websites usually:w
 utilize a profanity filtering service in order to avoid exposing the public from extremely obscene phrases. Unfortunately, most of the filtering packages only have support for a few languages. [Amharic](https://en.wikipedia.org/wiki/Amharic), the official language of Ethiopia with more than 20 million speakers worldwide, has not been one of the supported languages. At least not until [obscenity-filter](https://bruk3.github.io/obscenity-filter).


## Usage


### Check if an Amharic word is obscene or not
```js
const OFilter = require('obscenity-filter');
const filter = new OFilter(true)

console.log(filter.isPure('hello')); // true 
console.log(filter.isPure('ብድሬን')); // true
console.log(filter.isPure('ብድ'));  // false
```

### Scrub all obscene words and replace them with asterisk characters.
```js
const rawPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ';
const cleanedPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ **** እያሉ ይሳደባሉ';

filter.scrub(rawPhrase); // returns cleanedPhrase
```

### Get the labels for an obscene word
```js

filter.getLabels('ልብዳቹ'); // returns [PN, IN] [pornographic, insulting]
```

### Add new words to the set of obscenity words

```js
const newBadWords = ['ግማታም', 'ጥንባታም'];
filter.addWords(newBadWords, [['IN'], ['IN']]);

filter.addWords(['OTHER_BAD_WORD'], []) // Uses the label NO (NONE) as the default label.

```

### Remove words from the set of obscenity words
```js
const wordsToRemove = ['ቅምጥ', 'ግማታም'];
filter.removeWords(toRemove);