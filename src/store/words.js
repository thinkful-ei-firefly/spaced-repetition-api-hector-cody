const { LinkedList, display } = require('../linkedList')

const wordsLL = new LinkedList()

// takes word object adds each word object inside it to LL
function makeLL(words) {
  for (let word in words) {
    console.log(words[word])
    wordsLL.insertLast(words[word])
  }
}

module.exports = { makeLL, wordsLL }
