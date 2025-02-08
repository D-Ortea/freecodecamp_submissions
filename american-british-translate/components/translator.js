const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor() {
    this.counter = 0;
  }

  surroundWithSpan(text) {
    return `<span class="highlight">${text}</span>`;
  }

  findAndReplace(word, newWord, translation) {
    let regex = new RegExp(`(?<!-)\\b${word}\\b(?!-)`, "gi");
    if (Object.keys(americanToBritishTitles).includes(word)) {
      regex = new RegExp(word, "gi");
    }

    if (translation.match(regex)) {
      this.counter++;
    }

    return translation.replace(regex, (match) => {
      let _newWord = newWord;
      if (match[0] === match[0].toUpperCase()) {
        _newWord = _newWord[0].toUpperCase() + _newWord.slice(1);
      }

      return this.surroundWithSpan(_newWord);
    });
  }

  americanToBritish(text) {
    let translation = text;
    const dicts = [
      americanOnly,
      americanToBritishSpelling,
      americanToBritishTitles
    ];

    for (const dict of dicts) {
      for (const [key, value] of Object.entries(dict)) {
        translation = this.findAndReplace(key, value, translation);
      }
    }

    const timeRegex = /([01]?\d|2[0-3]):[0-5]\d/g;
    if (translation.match(timeRegex)) {
      this.counter++;
    }
    translation = translation.replace(
      timeRegex,
      (match) => `<span class="highlight">${match.replace(':', '.')}</span>`
    );

    return translation;
  }

  britishToAmerican(text) {
    let translation = text;
    const dicts = [americanToBritishSpelling, americanToBritishTitles];

    for (const [key, value] of Object.entries(britishOnly)) {
      translation = this.findAndReplace(key, value, translation);
    }

    for (const dict of dicts) {
      for (const [key, value] of Object.entries(dict)) {
        translation = this.findAndReplace(value, key, translation);
      }
    }

    const timeRegex = /([01]?\d|2[0-3]).[0-5]\d/g;
    if (translation.match(timeRegex)) {
      this.counter++;
    }
    translation = translation.replace(
      timeRegex,
      (match) => `<span class="highlight">${match.replace('.', ':')}</span>`
    );

    return translation;
  }

  translate(locale, text) {
    this.counter = 0;
    let translation = locale === 'american-to-british'
      ? this.americanToBritish(text)
      : this.britishToAmerican(text);

    return this.counter === 0 ? 'Everything looks good to me!' : translation;
  }
}

module.exports = Translator;
