const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();
const jsonBodyParser = express.json();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `Language is not found`
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
  // Async function
  // language = LL
  // word = _Node
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    );
    const nextWord = await LanguageService.getNextWord(
      req.app.get('db'),
      language.head
    );
    res.json({
      nextWord: nextWord.original,
      wordCorrectCount: nextWord.correct_count,
      wordIncorrectCount: nextWord.incorrect_count,
      totalScore: language.total_score
    });
  } catch (error) {
    next(error);
  }
});

languageRouter.post('/guess', jsonBodyParser, async (req, res, next) => {
  if (!req.body.guess) {
    return res.status(400).json({ error: `Missing 'guess' in request body` });
  }
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    // Make a Linked List
    const ll = LanguageService.populateLL(req.language, words);

    // check answer
    const answer = {
      isCorrect: false
    };

    // compare guess to real translation
    if (
      req.body.guess.toLowerCase() === ll.head.value.translation.toLowerCase()
    ) {
      ll.head.value.correct_count++;
      ll.head.value.memory_value *= 2;
      ll.total_score = ll.total_score + 1;
      answer.isCorrect = true;
    } else {
      ll.head.value.incorrect_count++;
      ll.head.value.memory_value = 1;
    }
    // begin memory value check to find where to place
    // cap memory value at linked list size in case memory
    let memoryValue = ll.head.value.memory_value;
    if (memoryValue > ll.size()) {
      memoryValue = ll.size();
    }
    // swap nodes depending on memory_value
    const head = ll.head;
    ll.head = head.next;
    ll.swapNodes(head, memoryValue);

    answer.nextWord = ll.head.value.original;
    answer.wordCorrectCount = ll.head.value.correct_count;
    answer.wordIncorrectCount = ll.head.value.incorrect_count;
    answer.totalScore = ll.total_score;
    answer.answer = head.value.translation;

    //create array from linkedList
    const array = ll.mapList();
    LanguageService.persistLL(req.app.get('db'), ll, array);

    res.json(answer);
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
