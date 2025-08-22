const { LinkedList } = require('./DList.js');

describe('Duble Linked List', () => {
    let list;

    beforeEach(() => {
        list = new LinkedList();
    });

    test('should initialize empty linked list', () => {
        expect(list.size()).toBe(0);
        expect(list.getHead()).toBe(null);
        expect(list.getTail()).toBe(null);
    });
});
