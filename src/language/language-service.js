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

  getHead(db, id) {
    return db
      .from('word')
      .select('*')
      .where({ id })
      .first();
  },

  populateLL(db, language, words) {
    let LL = new LinkedList(); // import linked list
    LL.id = language.id;
    LL.name = language.name;
    LL.total_score = language.total_score;
    let word = words.find(w => w.id === language.head);

    LL.insertFirst({
      id: word.id,
      original: word.original,
      translation: word.translation,
      memory_value: word.memory_value,
      correct_count: word.correct_count,
      incorrect_count: word.incorrect_count
    });
    while (word.next) {
      word = words.find(w => w.id === word.next);
      LL.insertLast({
        id: word.id,
        original: word.original,
        translation: word.translation,
        memory_value: word.memory_value,
        correct_count: word.correct_count,
        incorrect_count: word.incorrect_count
      });
    }
    return LL;
  },

  updateTotalScore(db, language) {
    return db('language')
      .where({ id: language_id })
      .update({ total_score: language.total_score + 1 });
  },

  updateWord(db, word) {
    return db
      .from('word')
      .where({ id: word.id })
      .update({
        memory_value: word.memory_value,
        incorrect_count: word.incorrect_count,
        correct_count: word.correct_count
      });
  },

  updateHead(db, user_id, newData) {
    return db('language')
      .where({ user_id })
      .update(newData)
      .returning('*');
  },

  persistLL(db, ll) {
    return db.transaction(trx =>
      Promise.all([
        db('language')
          .transacting(trx)
          .where('id', ll.id)
          .update({
            total_score: ll.total_score,
            head: ll.head.value.id
          }),
        ...ll.makeArray(node =>
          db('word')
            .transacting(trx)
            .where('id', node.value.id)
            .update({
              memory_value: node.value.memory_value,
              correct_count: node.value.correct_count,
              incorrect_count: node.value.incorrect_count,
              next: node.next ? node.next.value.id : null
            })
        )
      ])
    );
  }
};

module.exports = LanguageService;
