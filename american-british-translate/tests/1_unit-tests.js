const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  test("Translate Mangoes are my favorite fruit. to British English", function() {
    const sentence = 'Mangoes are my favorite fruit.';
    assert.equal(
      translator.translate('american-to-british', sentence),
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });
  test("Translate I ate yogurt for breakfast. to British English", function() {
    const sentence = 'I ate yogurt for breakfast.';
    assert.equal(
      translator.translate('american-to-british', sentence),
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    );
  });
  test("Translate We had a party at my friend's condo. to British English", function() {
    const sentence = "We had a party at my friend's condo.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `We had a party at my friend's <span class="highlight">flat</span>.`
    );
  });
  test("Translate Can you toss this in the trashcan for me? to British English", function() {
    const sentence = "Can you toss this in the trashcan for me ?";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `Can you toss this in the <span class="highlight">bin</span> for me ?`
    );
  });
  test("Translate The parking lot was full. to British English", function() {
    const sentence = "The parking lot was full.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `The <span class="highlight">car park</span> was full.`
    );
  });
  test("Translate Like a high tech Rube Goldberg machine. to British English", function() {
    const sentence = "Like a high tech Rube Goldberg machine.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `Like a high tech <span class="highlight">Heath Robinson device</span>.`
    );
  });
  test("Translate To play hooky means to skip class or work. to British English", function() {
    const sentence = "To play hooky means to skip class or work.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `To <span class="highlight">bunk off</span> means to skip class or work.`
    );
  });
  test("Translate No Mr. Bond, I expect you to die. to British English", function() {
    const sentence = "No Mr. Bond, I expect you to die.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `No <span class="highlight">Mr</span> Bond, I expect you to die.`
    );
  });
  test("Translate Dr. Grosh will see you now. to British English", function() {
    const sentence = "Dr. Grosh will see you now.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `<span class="highlight">Dr</span> Grosh will see you now.`
    );
  });
  test("Translate Lunch is at 12:15 today. to British English", function() {
    const sentence = "Lunch is at 12:15 today.";
    assert.equal(
      translator.translate('american-to-british', sentence),
      `Lunch is at <span class="highlight">12.15</span> today.`
    );
  });
  test("Translate We watched the footie match for a while. to American English", function() {
    const sentence = "We watched the footie match for a while.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `We watched the <span class="highlight">soccer</span> match for a while.`
    );
  });
  test("Translate Paracetamol takes up to an hour to work. to American English", function() {
    const sentence = "Paracetamol takes up to an hour to work.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `<span class="highlight">Tylenol</span> takes up to an hour to work.`
    );
  });
  test("Translate First, caramelise the onions. to American English", function() {
    const sentence = "First, caramelise the onions.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `First, <span class="highlight">caramelize</span> the onions.`
    );
  });
  test("Translate I spent the bank holiday at the funfair. to American English", function() {
    const sentence = "I spent the bank holiday at the funfair.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.`
    );
  });
  test("Translate I had a bicky then went to the chippy. to American English", function() {
    const sentence = "I had a bicky then went to the chippy.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.`
    );
  });
  test("Translate I've just got bits and bobs in my bum bag. to American English", function() {
    const sentence = "I've just got bits and bobs in my bum bag.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
    );
  });
  test("Translate The car boot sale at Boxted Airfield was called off. to American English", function() {
    const sentence = "The car boot sale at Boxted Airfield was called off.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
    );
  });
  test("Translate Have you met Mrs Kalyani? to American English", function() {
    const sentence = "Have you met Mrs Kalyani?";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `Have you met <span class="highlight">Mrs.</span> Kalyani?`
    );
  });
  test("Translate Prof Joyner of King's College, London. to American English", function() {
    const sentence = "Prof Joyner of King's College, London.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `<span class="highlight">Prof.</span> Joyner of King's College, London.`
    );
  });
  test("Translate Tea time is usually around 4 or 4.30. to American English", function() {
    const sentence = "Tea time is usually around 4 or 4.30.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
    );
  });
  test("Highlight translation in Mangoes are my favorite fruit.", function() {
    const sentence = 'Mangoes are my favorite fruit.';
    assert.equal(
      translator.translate('american-to-british', sentence),
      'Mangoes are my <span class="highlight">favourite</span> fruit.'
    );
  });
  test("Highlight translation in I ate yogurt for breakfast.", function() {
    const sentence = 'I ate yogurt for breakfast.';
    assert.equal(
      translator.translate('american-to-british', sentence),
      'I ate <span class="highlight">yoghurt</span> for breakfast.'
    );
  });
  test("Highlight translation in We watched the footie match for a while.", function() {
    const sentence = "We watched the footie match for a while.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `We watched the <span class="highlight">soccer</span> match for a while.`
    );
  });
  test("Highlight translation in Paracetamol takes up to an hour to work.", function() {
    const sentence = "Paracetamol takes up to an hour to work.";
    assert.equal(
      translator.translate('british-to-american', sentence),
      `<span class="highlight">Tylenol</span> takes up to an hour to work.`
    );
  });
});
