const { LinkedList } = require('../linkedList')
 
const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id })
  },

  async getHead(db, language_id) {
    try {
      const words = await db
        .from('word')
        .select(
          'id',
          'language_id',
          'original',
          'translation',
          'next',
          'memory_value',
          'correct_count',
          'incorrect_count'
        )
        .where({ language_id })
      
      //get head by lowest next value
      const wordsLL = new 
      let tempHead = words[0]
      for (let word in words) {
        if (words[word].value < tempHead.value) {
          tempHead = words[word]
        }
      }
      return tempHead
    } catch (error) {
      console.log('makeWordLL error')
    }
  }
}

module.exports = LanguageService
