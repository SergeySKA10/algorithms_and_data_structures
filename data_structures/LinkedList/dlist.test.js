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

    test('should add element in start', () => {
        for (let i = 0; i < 10; i++) {
            list.prepend(i);
        }

        expect(list.size()).toBe(10);
        expect(list.getHead().value).toBe(9);
        expect(list.getTail().value).toBe(0);
        expect(list.toArray()).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });

    test('should add element in end', () => {
        for (let i = 0; i < 10; i++) {
            list.append(i);
        }

        expect(list.size()).toBe(10);
        expect(list.getHead().value).toBe(0);
        expect(list.getTail().value).toBe(9);
        expect(list.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should be delete element by index and position', () => {
        for (let i = 0; i < 10; i++) {
            list.append(i);
        }

        expect(list.remove(5).value).toBe(5);
        expect(list.toArray()).toEqual([0, 1, 2, 3, 4, 6, 7, 8, 9]);
        expect(list.pop(5).value).toBe(6);
        expect(list.toArray()).toEqual([0, 1, 2, 3, 4, 7, 8, 9]);

        list.clear();
        expect(list.size()).toBe(0);
        expect(list.getHead()).toBe(null);
        expect(list.getTail()).toBe(null);
    });

    test('should append and delete elements', () => {
        list.append(0).append(1).append(2);
        list.remove(1);

        expect(list.toArray()).toEqual([0, 2]);

        list.append(3).append(4);
        list.pop(list.size() - 1);

        expect(list.toArray()).toEqual([0, 2, 3]);
    });

    test('should maintain proper links after operations', () => {
        list.append(1).append(2).append(3);

        // Проверка прямых связей
        expect(list.getHead().next.value).toBe(2);
        expect(list.getHead().next.next.value).toBe(3);

        // Проверка обратных связей
        expect(list.getTail().prev.value).toBe(2);
        expect(list.getTail().prev.prev.value).toBe(1);

        // После удаления
        list.remove(2);
        expect(list.getHead().next.value).toBe(3);
        expect(list.getTail().prev.value).toBe(1);
    });

    test('should return copy list', () => {
        for (let i = 0; i < 5; i++) {
            list.prepend(i);
        }

        const newList = list.copyList();

        expect(newList.toArray()).toEqual([4, 3, 2, 1, 0]);
    });

    test('should reverse list correctly', () => {
        for (let i = 0; i < 5; i++) {
            list.append(i);
        }

        list.reverse();
        expect(list.toArray()).toEqual([4, 3, 2, 1, 0]);
        expect(list.getHead().value).toBe(4);
        expect(list.getTail().value).toBe(0);

        // Проверка связей
        let current = list.getHead();
        while (current.next) {
            expect(current.next.prev).toBe(current);
            current = current.next;
        }
    });

    test('should handle reverse for empty and single-element lists', () => {
        // Пустой список
        list.reverse();
        expect(list.toArray()).toEqual([]);

        // Один элемент
        list.append(1);
        list.reverse();
        expect(list.toArray()).toEqual([1]);
    });

    test('should add element on position by value', () => {
        for (let i = 0; i < 5; i++) {
            list.append(i);
        }

        expect(list.insertAfterValue(2, 7)).toBe(true);
        expect(list.toArray()).toEqual([0, 1, 2, 7, 3, 4]);
    });

    test('should add element on position by index', () => {
        for (let i = 0; i < 5; i++) {
            list.append(i);
        }

        expect(list.insertAtIndex(3, 8)).toBe(true);
        expect(list.toArray()).toEqual([0, 1, 2, 8, 3, 4]);
    });

    test('should get element by index', () => {
        for (let i = 0; i < 5; i++) {
            list.append(i);
        }

        expect(list.get(3)).toBe(3);
    });

    test('should contains element', () => {
        for (let i = 0; i < 5; i++) {
            list.append(i);
        }

        expect(list.contains(1)).toBe(true);
        expect(list.contains(5)).toBe(false);
    });
});
