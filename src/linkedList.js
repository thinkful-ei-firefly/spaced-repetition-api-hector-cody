class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor({ id, name, total_score }) {
    this.head = null;
    this.id = id;
    this.name = name;
    this.total_score = total_score;
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

  insertBefore(item, nodeKey) {
    if (!this.head) {
      return null;
    }
    // console.log(item)

    // if (this.head.value === item) {
    //   this.insertFirst(item);
    //   return;
    // }

    let newNode = new _Node(item, null);

    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null) {
      prevNode = currNode;
      currNode = currNode.next;

      if (currNode === null) {
        console.log('Item not found');
        return;
      }

      if (currNode.value.id === nodeKey) {
        prevNode.next = newNode;
        newNode.next = currNode;
        return;
      }
    }
  }

  swapNodes(item, position) {
    let currNode = item;
    if (!item) {
      return null;
    }

    if (position === 0) {
      this.insertFirst(item);
    } else {
      for (let i = 0; i < position; i++) {
        if (!currNode.next) {
          break;
        }
        currNode = currNode.next;
      }
      item.next = currNode.next;
      item.value.next = currNode.value.next;
      currNode.value.next = item.value.id;
      currNode.next = item;
    }
  }

  insertAfter(item, nodeKey) {
    if (!this.head) {
      return null;
    }

    if (this.head.value === item) {
      this.insertFirst(item);
      return;
    }

    let newNode = new _Node(item, null);

    let currNode = this.head;

    while (currNode !== null) {
      currNode = currNode.next;

      if (currNode === null) {
        console.log('Item not found');
        return;
      }

      if (currNode.value === nodeKey) {
        newNode.next = currNode.next;
        currNode.next = newNode;
        return;
      }
    }
  }

  // insertLastCycle(item, node) {
  //   if (this.head === null) {
  //     this.insertFirst(item);
  //   } else {
  //     let tempNode = this.head;
  //     while (tempNode.next !== null) {
  //       tempNode = tempNode.next;
  //     }
  //     tempNode.next = new _Node(item, node);
  //     console.log('a string');
  //   }
  // }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
    return;
  }

  display() {
    let currNode = this.head;
    while (currNode !== null) {
      console.log(currNode.value.original);
      currNode = currNode.next;
    }
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

  //add mapList method to show as Arr[]
  //use this in service to communicate
  //data between server and DB
  mapList(callback) {
    let node = this.head;
    let array = [];
    while (node) {
      if (callback) {
        array.push(callback(node.value));
      } else {
        array.push(node.value);
      }
      node = node.next;
    }
    return array;
  }
}

module.exports = { LinkedList };
