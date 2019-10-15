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

  find(item) {
    // Start at the head
    let currNode = this.head
    // If the list is empty
    if (!this.head) {
      return null
    }
    // Check for the item
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
         and the item is not on the list */
      if (currNode.next === null) {
        return null
      } else {
        // Otherwise, keep looking
        currNode = currNode.next
      }
    }
    // Found it
    return currNode
  }

  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next
      return
    }
    // Start at the head
    let currNode = this.head
    // Keep track of previous
    let previousNode = this.head

    while (currNode !== null && currNode.value !== item) {
      // Save the previous node
      previousNode = currNode
      currNode = currNode.next
    }
    if (currNode === null) {
      console.log('Item not found')
      return
    }
    previousNode.next = currNode.next
  }

  insertBefore(newItem, key) {
    if (this.head.value === key || !this.head) {
      this.insertFirst(newItem)
    } else {
      // Start at the head
      let currNode = this.head
      // Check for the item
      while (currNode.value !== null) {
        // console.log(currNode)
        if (currNode.next.value === key) {
          currNode.next = new _Node(newItem, currNode.next)
          return
        }
        currNode = currNode.next
      }
    }
  }

  insertAfter(newItem, key) {
    if (this.head.value === key || !this.head) {
      this.insertFirst(newItem)
    } else {
      // Start at the head
      let currNode = this.head
      // Check for the item
      while (currNode.value !== null) {
        currNode = currNode.next
        // console.log(currNode.next)
        if (currNode.value === key) {
          currNode.next = new _Node(newItem, currNode.next)
          return
        }
      }
    }
  }

  insertAt(newItem, key){
    if (this.head.value === key || !this.head || key === 0) {
      this.insertFirst(newItem)
    } else {
      let currNode = this.head
      let counter = 1 // WHY
      while (currNode.value !== null) {
        if (counter === key) { 
          currNode.next = new _Node(newItem, currNode.next)
          return
        }
        currNode = currNode.next
        counter++ 
      }
    }
  }
}

// function main() {
//   let SLL = new LinkedList()
//   SLL.insertFirst('Starbuck') // 9
//   SLL.insertFirst('Husker')   // 8
//   // Hotdog                   // 7
//   SLL.insertFirst('Helo')     // 6
//   SLL.insertFirst('Boomer')   // 5
//   // Athena                   // 4
//   // Kat                      // 3
//   SLL.insertFirst('Squirrel') // 2
//   SLL.insertFirst('Apollo')   // 1
//   SLL.insertFirst('Tauhida')  // 0

//   SLL.insertBefore('Athena', 'Boomer')
//   SLL.insertAfter('Hotdog', 'Helo')
//   SLL.insertAt('Kat', 3)

//   // console.log(SLL.find('Athena').next)    // Boomer
//   // console.log(SLL.find('Hotdog').next)    // Husker
//   // console.log(SLL.find('Kat').next)       // Squirrel

//   // display(SLL)
//   size(SLL)
//   console.log(isEmpty(SLL))
//   console.log(findPrevious(SLL, 'Squirrel'))
//   console.log(findLast(SLL))
// }

function display(ll){
  currNode = ll.head
  while(currNode !== null){
    console.log(currNode.value)
    currNode = currNode.next
  }
}

function size(ll){
  currNode = ll.head
  let count = 0
  while(currNode !== null){
    currNode = currNode.next
    count++;
  }
  console.log(count)
  return count;
}

function isEmpty(ll){
  return !ll.head
}

function findPrevious(ll, item){
  currNode = ll.head
  while(currNode !== null){
    currNode = currNode.next
    // looks ahead returns the current
    if(currNode.next.value === item){
      return currNode
    }
  }
}

function findLast(ll){
  currNode = ll.head
  while(currNode !== null){
    currNode = currNode.next
    // looks ahead returns the current
    if(currNode.next === null){
      return currNode
    }
  }
}

// main()

//6.)
function thirdFromEnd(ll){
  currNode = ll.head
  while(currNode !== null){
    if (currNode.next.next.next === null){
      return currNode;
    }
    currNode = currNode.next
  }
}

//7.)
function middleOfList(ll){
  currNode = ll.head
  let count = 0;
  while(currNode !== null){
    currNode = currNode.next
    count ++ 
  }
  console.log(count)
  let half =  Math.ceil(count / 2)
  console.log(half)
  currNode = ll.head
  for (let i=0; i<half ; i++){
    currNode = currNode.next
  }
  return currNode;

}



//5.) Write an algorithm to reverse a linked list. all pointers should point backward
// 1->2->3
// 1<-2<-3
function reverseLL(ll){
  let prevNode = null
  let currNode = ll.head
  while(currNode !== null){
    // set nextNode to the next node from curr
    let nextNode = currNode.next
    // starts at null, updates below each iteration
    currNode.next = prevNode
    // update prevNode to the current node 
    prevNode = currNode
    // update currNode... moving our loop
    currNode = nextNode
    // set the head of the LL to prevNode which is the currNode
    ll.head = prevNode
  }
}

// let SLL = new LinkedList()
// SLL.insertLast(1)
// SLL.insertLast(2)
// SLL.insertLast(3)
// SLL.insertLast(4)
// SLL.insertLast(5)
// SLL.insertLast(6)
// SLL.insertLast(7)
// SLL.insertLast(8)
// SLL.insertLast(9)
// SLL.insertLast(10)
// reverseLL(SLL)

// console.log(middleOfList(SLL))


// 4.)
// function WhatDoesThisProgramDo(lst) {
//   let current = lst.head; // gets the head of LL
//   while (current !== null) { // breaks if current, which is head !null
//       let newNode = current; // set new node to current (newNode = current)
//       while (newNode.next !== null) { // while the next in newNode !null
//           if (newNode.next.value === current.value) { // if next value === current value
//               newNode.next = newNode.next.next; // newNode next gets set 2 nodes ahead
//           }
//           else {
//               newNode = newNode.next;  // else, newNode = next node
//           }
//       }
//       current = current.next; // set current to the next node
//   }
// }

// checks the newNode against the current node and if they have the same value
// sets the newNodes next two forward skipping the matching value
// Polynomial 2(n^2)

module.exports = {
  LinkedList,
  display
}