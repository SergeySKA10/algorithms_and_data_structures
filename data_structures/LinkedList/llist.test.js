const { LinkedList } = require('./LList.js');

describe('Linked List', () => {
    let list;

    beforeEach(() => {
        list = new LinkedList();
        console.log(list);
    });

    test('should initialize empty linked list', () => {
        expect(list.size()).toBe(0);
        expect(list.getHead()).toBe(null);
        expect(list.getTail()).toBe(null);
    });
});
