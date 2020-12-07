# obscenity-filter


#### What is it? 
A javascript library that detects obscene Amharic words and phrases.

### An obscenity filter library for the amharic langauge. 
![GitHub](https://img.shields.io/github/license/bruk3/obscenity-filter)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/bruk3/obscenity-filter/CI/main)
![nycrc config on GitHub](https://img.shields.io/nycrc/bruk3/obscenity-filter?config=.nycrc.json)
![Read the Docs](https://img.shields.io/readthedocs/j-parser)


---
A variety of public facing social websites process input texts from users in order to display it in public. These websites usually utilize a profanity filtering service in order to avoid exposing the public from extremely obscene phrases . Unfortunately, most of the filtering packages only have support for a few languages. [Amharic](https://en.wikipedia.org/wiki/Amharic), the official language of Ethiopia with more than 20 million speakers worldwide, has not been one of the supported languages. At least not until [obscenity-filter](https://bruk3.github.io/obscenity-filter).


## Usage


### Check if an Amharic word is obscene or not
```js
const filter = require('obscenity-filter');

console.log(filter.isPure('hello')); // false 
console.log(filter.isPure('ብድሬን')); // false
console.log(filter.isPure('ብድ'));  // true
```

### Scrub all obscene words and replace them with asterisk characters.
```js

const rawPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ ብዳታም እያሉ ይሳደባሉ';
const cleanedPhrase = 'አንዳንድ ሰዎች በማህበራዊ ገጽ ላይ እየገቡ **** እያሉ ይሳደባሉ';

filter.rmObscenity(rawPhrase); // returns cleanedPhrase
```

### Get the label for an obscene word
```js

filter.getLabels('ልብዳቹ'); // retuns [PN, IN] [pornographic, insuting]
```

### Returns an array of all non-obscene words. Order of input is maintained.

```js
filter.rmObscenityFromArray(['አንዳንድ', 'ማህበራዊ', 'ብዳታም', 'ገጽ']) // ['አንዳንድ', 'ማህበራዊ', 'ገጽ']
```
