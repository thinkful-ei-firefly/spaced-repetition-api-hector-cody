/* eslint-env node, mocha */
const { expect } = require('chai');
const {LinkedList} = require('../src/linkedList');

describe('Linked List', () => {
  it('Creates empty Linked Lists', () => {
    const list = new LinkedList();
    expect(list).to.be.instanceOf(LinkedList);
    expect(list.head).to.be.null;
  });
  it('insertLaste the first item properly', () => {
    const list = new LinkedList();
    list.insertLast('A');
    expect(list.head.value).to.equal('A');
  });
  // it('Gets the last item if it has one node', () => {
  //   const list = new LinkedList();
  //   list.insertLast('A');
  //   expect(list.tail().value).to.equal('A');
  // });
  // it('Gets the last item even if empty', () => {
  //   const list = new LinkedList();
  //   expect(list.tail()).to.be.null;
  // });
  it('insertLast the second item properly', () => {
    const list = new LinkedList();
    list.insertLast('A');
    list.insertLast('B');
    expect(list.head.next.value).to.equal('B');
  });
  // it('Gets the last item if it has more than one node', () => {
  //   const list = new LinkedList();
  //   list.insertLast('A');
  //   list.insertLast('B');
  //   expect(list.tail().value).to.equal('B');
  // });
});

describe('Linked List positions', () => {
  it('Finds existing elements by position', () => {
    const list = new LinkedList();
    list.insertLast('A');
    list.insertLast('B');
    list.insertLast('C');
    expect(list._findNthElement(0).value).to.equal('A');
    expect(list._findNthElement(1).value).to.equal('B');
    expect(list._findNthElement(2).value).to.equal('C');
  });
  it('Throws error if position is smaller than zero', () => {
    const list = new LinkedList();
    expect(() => list._findNthElement(-1)).to.throw("Position must be greater than 0.");
  });
  it('Throws error if LL is shorter than position', () => {
    const list = new LinkedList();
    list.insertLast('A');
    list.insertLast('B');
    list.insertLast('C');
    expect(() => list._findNthElement(3)).to.throw("Position 3 does not exist.");
  });
});

