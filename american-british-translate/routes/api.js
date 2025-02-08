'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // american-to-british or british-to-american
      const { locale, text } = req.body;

      if (locale === undefined || text === undefined) {
        return res.json({ error: "Required field(s) missing" });
      }

      if (text === '') {
        return res.json({ error: "No text to translate" });
      }

      if (!['american-to-british', 'british-to-american'].includes(locale.toLowerCase())) {
        return res.json({ error: "Invalid value for locale field" });
      }

      const translation = translator.translate(locale, text);

      res.json({ text, translation });
    });
};
