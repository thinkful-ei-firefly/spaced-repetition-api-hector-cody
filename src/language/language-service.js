const { LinkedList } = require('../linkedList');

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
      .first();
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
      .where({ language_id });
  },

  getNextWord(db, id) {
    return db
      .from('word')
      .select('*')
      .where({ id })
      .first();
  },

  populateLL(language, words) {
    const LL = new LinkedList({
      id: language.id,
      name: language.name,
      total_score: language.total_score
    });
    let word = words.find(w => w.id === language.head);
    LL.insertFirst(word);

    for (let i = 0; i < words.length; i++) {
      if (word.next) {
        word = words.find(w => w.id === word.next);
        LL.insertLast(word);
      }
    }
    return LL;
  },

  persistLL(db, ll, array) {
    return db.transaction(trx =>
      Promise.all([
        db('language')
          .transacting(trx)
          .where('id', ll.id)
          .update({
            total_score: ll.total_score,
            head: ll.head.value.id
          }),
        ...ll.mapList(node => {
          db('word')
            .transacting(trx)
            .where('id', node.id)
            .update({
              memory_value: node.memory_value,
              correct_count: node.correct_count,
              incorrect_count: node.incorrect_count,
              next: node.next ? node.next : null
            });
        })
      ])
    );
  }
};

module.exports = LanguageService;
