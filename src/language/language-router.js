const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { LinkedList, display } = require('../linkedList')
const { makeLL, wordsLL } = require('../store/words')

const languageRouter = express.Router()

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get('db'),
      req.user.id
    )

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`
      })

    req.language = language
    next()
  } catch (error) {
    next(error)
  }
})

languageRouter.get('/', async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    )
    res.json({
      language: req.language,
      words
    })

    // make the LL
    // makeLL(words)

    // console.log(wordsLL.head.value)

    next()
  } catch (error) {
    next(error)
  }
})

// get the head word from the language list
languageRouter.get('/head', async (req, res, next) => {
  try {
    // const words = await LanguageService.getLanguageWords(
    //   req.app.get('db'),
    //   req.language.id
    // )

    // make the LL
    // makeLL(words)

    // console.log(wordsLL.head.value)
    // const head = wordsLL.head.value
    let head = await LanguageService.getHead(
      req.app.get('db'),
      req.language.id
    )
    if (!head) {
      throw 'No head'
    }
    console.log(head)
    head = {
      nextWord: head.next.,
      wordCorrectCount: head.correct_count,
      wordIncorrectCount: head.incorrect_count,
      totalScore: head.correct_count-head.incorrect_count
    }
    res.json({ head })
  } catch (error) {
    next(error)
  }
  next()
})

languageRouter.post('/guess', async (req, res, next) => {
  // implement me
  res.send('implement me!')
})

module.exports = languageRouter
