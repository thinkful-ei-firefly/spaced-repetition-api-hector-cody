class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  /**Inserts a new node after a node containing the key.*/
  insertAfter(key, itemToInsert) {
    let tempNode = this.head;
    while (tempNode !== null && tempNode.value !== key) {
      tempNode = tempNode.next;
    }
    if (tempNode !== null) {
      tempNode.next = new _Node(itemToInsert, tempNode.next);
    }
  }
  /* Inserts a new node before a node containing the key.*/
  insertBefore(key, itemToInsert) {
    if (this.head == null) {
      return;
    }
    if (this.head.value == key) {
      this.insertFirst(itemToInsert);
      return;
    }
    let prevNode = null;
    let currNode = this.head;
    while (currNode !== null && currNode.value !== key) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Node not found to insert');
      return;
    }
    //insert between current and previous
    prevNode.next = new _Node(itemToInsert, currNode);
  }
  insertAt(nthPosition, itemToInsert) {
    if (nthPosition < 0) {
      throw new Error('Position error');
    }
    if (nthPosition === 0) {
      this.insertFirst(itemToInsert);
    } else {
      // Find the node which we want to insert after
      const node = this._findNthElement(nthPosition - 1);
      const newNode = new _Node(itemToInsert, null);
      newNode.next = node.next;
      node.next = newNode;
    }
  }
  _findNthElement(position) {
    let node = this.head;
    for (let i = 0; i < position; i++) {
      node = node.next;
    }
    return node;
  }
  remove(item) {
    //if the list is empty
    if (!this.head) {
      return null;
    }
    //if the node to be removed is head, make the next node head
    if (this.head === item) {
      this.head = this.head.next;
      return;
    }
    //start at the head
    let currNode = this.head;
    //keep track of previous
    let previousNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      //save the previous node
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
  find(item) {
    //get
    //start at the head
    let currNode = this.head;
    //if the list is empty
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      //return null if end of the list
      // and the item is not on the list
      if (currNode.next === null) {
        return null;
      } else {
        //keep looking
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }

  moveHeadBy(position) {
    let head = this.head; // start by creating a copy of the node at the top of our list
    this.head = this.head.next; // make next node the head
    this.insertAt(position, head.value); // use insertAt method to insert where you need to
  }
  size() {
    let currNode = this.head;
    let counter = 0;
    while (currNode !== null) {
      counter += 1;
      currNode = currNode.next;
    }
    return counter;
  }

  listNodes() {
    let node = this.head;
    const arr = [];
    while (node) {
      arr.push(node);
      node = node.next;
    }
    return arr;
  }

  mapList(callback) {
    // TODO where to call?
    let node = this.head;
    let arr = [];
    while (node) {
      arr.push(callback(node));
      node = node.next;
    }
    return arr;
  }

  forEach(cb) {
    // when we call this method, we would also pass the callback instruction to update in db!
    let node = this.head; // start by creating a copy of the node at the top of our list
    const arr = []; // create an empty Array, so we can push each db update to it
    while (node) {
      // iterate over all nodes
      arr.push(cb(node));
      node = node.next;
    }
    return arr; // return an Array with each update callback within
  }

  swapNodes(first, second) {
    if (this.size() - 1 < second) {
      throw Error('Position 3 does not exist.');
    }
    if (first === second) {
      // console.log('return')
      return;
    }
    if (first > second) {
      const tempFirst = first;
      first = second;
      second = tempFirst;
    }
    // 0, 2
    // swap firsts next value with second and second with first
    let nodeB4First = null;
    let nodeB4Second = null;
    let firstNode = null;
    let secondNode = null;
    // const firstNext = first.next
    // const secondNext = second.next

    let currNode = this.head;
    let counter = 0;
    while (currNode !== null) {
      //  console.log(currNode, counter)
      if (counter === first) {
        firstNode = currNode;
      }
      if (counter === second) {
        secondNode = currNode;
      }
      currNode = currNode.next;
      counter++;
    }

    // this.display()
    // console.log(firstNode)
    // console.log(secondNode)

    currNode = this.head;
    counter = 0;
    // while node is not null
    while (currNode !== null) {
      //  console.log(currNode)
      // if the next count is === the first node index
      // the currNode is the node before the first node and
      // must be set to point to the second
      if (counter + 1 === first) {
        nodeB4First = currNode;
      }
      if (counter + 1 === second) {
        // currNode.next = firstNode
        nodeB4Second = currNode;
      }
      // console.log(currNode)
      counter++;
      currNode = currNode.next;
    }
    // console.log(nodeB4First)
    // console.log(nodeB4Second)
    if (nodeB4First) nodeB4First.next = secondNode;
    if (nodeB4Second) nodeB4Second.next = firstNode;
    if (first === 0) this.head = secondNode;
    //  console.log('head:', this.head.next)
    // console.log(secondNode.next)
    // console.log(firstNode.next)
    const tempFirstNodeNext = firstNode.next;
    firstNode.next = secondNode.next;
    secondNode.next = tempFirstNodeNext;
  }
}

module.exports = LinkedList;
