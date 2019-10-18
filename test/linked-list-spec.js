/* eslint-env node, mocha */
const { expect } = require('chai');
const LinkedList = require('../src/linkedList');

// describe('Linked List', () => {
//   it('Creates empty Linked Lists', () => {
//     const list = new LinkedList();
//     expect(list).to.be.instanceOf(LinkedList);
//     expect(list.head).to.be.null;
//   });
//   it('Pushes the first item properly', () => {
//     const list = new LinkedList();
//     list.push('A');
//     expect(list.head.value).to.equal('A');
//   });
//   it('Gets the last item if it has one node', () => {
//     const list = new LinkedList();
//     list.push('A');
//     expect(list.tail().value).to.equal('A');
//   });
//   it('Gets the last item even if empty', () => {
//     const list = new LinkedList();
//     expect(list.tail()).to.be.null;
//   });
//   it('Pushes the second item properly', () => {
//     const list = new LinkedList();
//     list.push('A');
//     list.push('B');
//     expect(list.head.next.value).to.equal('B');
//   });
//   it('Gets the last item if it has more than one node', () => {
//     const list = new LinkedList();
//     list.push('A');
//     list.push('B');
//     expect(list.tail().value).to.equal('B');
//   });
// });

// describe('Linked List positions', () => {
//   it('Finds existing elements by position', () => {
//     const list = new LinkedList();
//     list.push('A');
//     list.push('B');
//     list.push('C');
//     expect(list.findByPosition(0).value).to.equal('A');
//   });
//   it('Returns undefined if LL is shorter than position', () => {
//     const list = new LinkedList();
//     list.push('A');
//     list.push('B');
//     list.push('C');
//     expect(list.findByPosition(3)).to.be.undefined;
//   });
// });
