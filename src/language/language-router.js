const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();
const bodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`
      });
    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    res.json({
      language: req.language,
      words
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get('/head', async (req, res, next) => {
  // return the next quiz word to be asked
  try {
    const nextQuizWord = await LanguageService.getNextWord(
      req.app.get('db'),
      req.language.head
    );
    res.json({
      nextWord: nextQuizWord.original,
      wordCorrectCount: nextQuizWord.correct_count,
      wordIncorrectCount: nextQuizWord.incorrect_count,
      totalScore: req.language.total_score
    });
  } catch (e) {
    next(e);
  }
});

languageRouter.route('/guess').post(bodyParser, async (req, res, next) => {
  if (!req.body.guess) {
    return res.status(400).json({
      error: `Missing 'guess' in request body`
    });
  }

  const words = await LanguageService.getLanguageWords(
    req.app.get('db'),
    req.language.id
  );
  const ll = LanguageService.populateLL(req.app.get('db'), req.language, words);

  if (req.body.guess === ll.head.value.translation) {
    ll.head.value.correct_count += 1; // increase correct count for curr word
    ll.head.value.memory_value *= 2; // double memory value, moving head/word M spaces back
    ll.total_score++;
    ll.moveHeadBy(ll.head.value.memory_value);
    //ll.swapNodes(0, 3);
    LanguageService.persistLL(req.app.get('db'), ll).then(() => {
      res.json({
        nextWord: ll.head.value.original,
        wordCorrectCount: ll.head.value.correct_count,
        wordIncorrectCount: ll.head.value.incorrect_count,
        totalScore: ll.total_score,
        answer: req.body.guess, // guess is correct answer
        isCorrect: true
      });
      next();
    });
  } else {
    ll.head.value.incorrect_count += 1; // increase incorrect count for curr word
    ll.head.value.memory_value = 1; // reset memory value to 1
    let rightAnswer = ll.head.value.translation; // store right answer before moving head
    console.log('b4:', ll.head.value);
    ll.swapNodes(0, 1);
    LanguageService.persistLL(req.app.get('db'), ll).then(() => {
      res.json({
        nextWord: ll.head.value.original,
        wordCorrectCount: ll.head.value.correct_count,
        wordIncorrectCount: ll.head.value.incorrect_count,
        totalScore: ll.total_score,
        answer: rightAnswer, // translation is right answer, guess wrong
        isCorrect: false
      });
      next();
    });
  }
});

module.exports = languageRouter;
