class _Node {
  constructor(value, next) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head)
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item)
    } else {
      let tempNode = this.head
      while (tempNode.next !== null) {
        tempNode = tempNode.next
      }
      tempNode.next = new _Node(item, null)
    }
  }

  listNodes() {
    let node = this.head
    const arr = []
    while (node) {
      arr.push(node)
      node = node.next
    }
    return arr
  }

  insertBefore(item, nodeKey) {
    if (!this.head) {
      return null
    }

    let newNode = new _Node(item, null)

    let currNode = this.head
    let prevNode = this.head

    while (currNode !== null) {
      prevNode = currNode
      currNode = currNode.next

      if (currNode === null) {
        console.log('Item not found')
        return
      }

      if (currNode.value.id === nodeKey) {
        prevNode.next = newNode
        newNode.next = currNode
        return
      }
    }
  }

  // first index has to larger second index
  swapNodes(first, second) {
    if (this.size() - 1 < second) {
      throw Error('Position 3 does not exist.')
    }
    if (first === second) {
      // console.log('return')
      return 
    }
    if (first > second) {
      const tempFirst = first
      first = second
      second = tempFirst
    }
    // 0, 2
    // swap firsts next value with second and second with first
    let nodeB4First = null
    let nodeB4Second = null
    let firstNode = null
    let secondNode = null
    // const firstNext = first.next
    // const secondNext = second.next

    let currNode = this.head
    let counter = 0
    while (currNode !== null) {
      //  console.log(currNode, counter)
      if (counter === first) {
        firstNode = currNode
      }
      if (counter === second) {
        secondNode = currNode
      }
      currNode = currNode.next
      counter++
    }

    // this.display()
    // console.log(firstNode)
    // console.log(secondNode)

    currNode = this.head
    counter = 0
    // while node is not null
    while (currNode !== null) {
      //  console.log(currNode)
      // if the next count is === the first node index
      // the currNode is the node before the first node and
      // must be set to point to the second
      if (counter + 1 === first) {
        nodeB4First = currNode
      }
      if (counter + 1 === second) {
        // currNode.next = firstNode
        nodeB4Second = currNode
      }
      // console.log(currNode)
      counter++
      currNode = currNode.next
    }
    // console.log(nodeB4First)
    // console.log(nodeB4Second)
    if (nodeB4First) nodeB4First.next = secondNode
    if (nodeB4Second) nodeB4Second.next = firstNode
    if (first === 0) this.head = secondNode
    //  console.log('head:', this.head.next)
    // console.log(secondNode.next)
    // console.log(firstNode.next)
    const tempFirstNodeNext = firstNode.next
    firstNode.next = secondNode.next
    secondNode.next = tempFirstNodeNext
  }

  // swapNodes(first, second) {
  //   // 0, 2 // swap firsts next value with second and second with first
  //   let nodeB4First = null;
  //   let nodeB4Second = null;
  //   let firstNode = null;
  //   let secondNode = null; //
  //   const firstNext = first.next; //
  //   const secondNext = second.next;

  //   let currNode = this.head;
  //   let counter = 0;
  //   while (currNode !== null) {
  //     //  console.log(currNode, counter)
  //     if (counter === first) {
  //       firstNode = currNode;
  //     }
  //     if (counter === second) {
  //       secondNode = currNode;
  //     }
  //     currNode = currNode.next;
  //     counter++;
  //   }

  //   // this.display()
  //   // console.log(firstNode)
  //   // console.log(secondNode)

  //   currNode = this.head;
  //   counter = 0;
  //   // while node is not null
  //   while (currNode !== null) {
  //     //  console.log(currNode)
  //     // if the next count is === the first node index
  //     // the currNode is the node before the first node and
  //     // must be set to point to the second
  //     if (counter + 1 === first) {
  //       nodeB4First = currNode;
  //     }
  //     if (counter + 1 === second) {
  //       // currNode.next = firstNode
  //       nodeB4Second = currNode;
  //     }
  //     // console.log(currNode)
  //     counter++;
  //     currNode = currNode.next;
  //   }
  //   // console.log(nodeB4First)
  //   // console.log(nodeB4Second)
  //   nodeB4First ? (nodeB4First.next = secondNode) : null;
  //   nodeB4Second ? (nodeB4Second.next = firstNode) : null;
  //   if (first === 0) this.head = secondNode;
  //   //  console.log('head:', this.head.next)
  //   // console.log(secondNode.next)
  //   // console.log(firstNode.next)
  //   const tempFirstNodeNext = firstNode.next;
  //   firstNode.next = secondNode.next;
  //   secondNode.next = tempFirstNodeNext;
  // }

  insertAt(nthPosition, itemToInsert) {
    if (nthPosition < 0) {
      throw new Error('Position error')
    }
    if (nthPosition === 0) {
      this.insertFirst(itemToInsert)
    } else {
      const node = this._findNthElement(nthPosition - 1)
      const newNode = new _Node(itemToInsert, null)
      newNode.next = node.next
      node.next = newNode
    }
  }

  _findNthElement(position) {
    if (position < 0) {
      throw Error('Position must be greater than 0.')
    }
    if (this.size() - 1 < position) {
      throw Error('Position 3 does not exist.')
    }
    let node = this.head
    for (let i = 0; i < position; i++) {
      node = node.next
    }
    return node
  }

  insertAfter(item, nodeKey) {
    if (!this.head) {
      return null
    }

    if (this.head.value === item) {
      this.insertFirst(item)
      return
    }

    let newNode = new _Node(item, null)

    let currNode = this.head

    while (currNode !== null) {
      currNode = currNode.next

      if (currNode === null) {
        console.log('Item not found')
        return
      }

      if (currNode.value === nodeKey) {
        newNode.next = currNode.next
        currNode.next = newNode
        return
      }
    }
  }

  find(item) {
    let currNode = this.head
    if (!this.head) {
      return null
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null
      } else {
        currNode = currNode.next
      }
    }
    return currNode
  }

  remove(item) {
    if (!this.head) {
      return null
    }
    if (this.head.value === item) {
      this.head = this.head.next
      return
    }

    let currNode = this.head
    let prevNode = this.head

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode
      currNode = currNode.next
    }
    if (currNode === null) {
      console.log('Item not found')
      return
    }
    prevNode.next = currNode.next
    return
  }

  display() {
    let currNode = this.head
    while (currNode !== null) {
      console.log(currNode.value.original + '=>' + (currNode.next && currNode.next.value.original))
      currNode = currNode.next
    }
  }

  size() {
    let currNode = this.head
    let counter = 0
    while (currNode !== null) {
      counter += 1
      currNode = currNode.next
    }
    return counter
  }

  moveHeadBy(level) {
    let head = this.head
    this.head = this.head.next
    this.insertAt(level, head.value)
  }

  //add mapList method to show as Arr[]
  //use this in service to communicate
  //data between server and DB
  makeArray() {
    let node = this.head // start by creating a copy of the node at the top of our list
    const arr = [] // create an empty Array, so we can push each db update to it
    // console.log('Make array')
    while (node) {
      // iterate over all nodes
      // console.log(node.value.original)
      arr.push(node)
      node = node.next
    }
    //console.log(arr);
    return arr // return an Array with each update callback within
  }

  forEach() {
    // when we call this method, we would also pass the callback instruction to update in db!
    let node = this.head // start by creating a copy of the node at the top of our list
    const arr = [] // create an empty Array, so we can push each db update to it
    while (node) {
      // iterate over all nodes
      arr.push(node)
      node = node.next
    }
    return arr // return an Array with each update callback within
  }
}

// const ll = new LinkedList()
// ll.insertLast('One')
// ll.insertLast('Two')
// ll.insertLast('Three')
// ll.insertLast('Four')
// ll.insertLast('Five')

// // console.log(ll.head)

// ll.display()
// ll.swapNodes(0, 1)
// ll.swapNodes(0, 1)
// ll.swapNodes(0, 1)
// ll.swapNodes(0, 1)
// ll.swapNodes(0, 1)
// console.log('')
// console.log('After Swap:')
// console.log('')
// ll.display()

module.exports = { LinkedList }
