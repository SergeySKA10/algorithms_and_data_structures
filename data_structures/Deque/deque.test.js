const { Deque } = require('./Deque');

describe('Deque cycling array', () => {
    let deque;

    beforeEach(() => {
        deque = new Deque();
    });

    // иницализация дека
    test('should initialize empty deque', () => {
        expect(deque.isEmpty()).toBe(true);
        expect(deque.size()).toBe(0);
    });

    // добавление элеентов вначало и в конец
    test('should add elements in start and in end', () => {
        deque.push_front(1).push_front(2);
        expect(deque.isEmpty()).toBe(false);
        expect(deque.size()).toBe(2);
        expect(deque.get_front()).toBe(2);
        expect(deque.get_back()).toBe(1);

        deque.push_back(3).push_back(4);
        expect(deque.size()).toBe(4);
        expect(deque.get_front()).toBe(2);
        expect(deque.get_back()).toBe(4);
    });

    // удаление элементов
    test('should delete elements from start and end', () => {
        deque.push_back(1).push_back(2).push_back(3).push_back(4);
        expect(deque.pop_front()).toBe(1);
        expect(deque.pop_back()).toBe(4);
        expect(deque.size()).toBe(2);
        expect(deque.get_front()).toBe(2);
        expect(deque.get_back()).toBe(3);
    });

    //отчиска дека
    test('should clear deque', () => {
        deque.push_back(1).push_back(2).push_back(3).push_back(4).clear();
        expect(deque.isEmpty()).toBe(true);
        expect(deque.size()).toBe(0);
    });

    // удалеие из пустого дека
    test('should handle pop from empty deque', () => {
        expect(deque.pop_front()).toBe('Dequeu is empty');
        expect(deque.pop_back()).toBe('Dequeu is empty');
    });

    // расширение размера дека
    test('should resize buffer when full', () => {
        let initialize = 8;

        for (let i = 0; i < initialize; i++) {
            deque.push_back(i);
        }

        expect(deque.size()).toBe(initialize);

        deque.push_back(8);
        expect(deque.size()).toBe(initialize + 1);
        expect(deque.get_length()).toBe(16);
        expect(deque.get_front()).toBe(0);
        expect(deque.get_back()).toBe(8);

        deque.push_front(9);
        expect(deque.size()).toBe(initialize + 2);
        expect(deque.get_length()).toBe(16);
        expect(deque.get_front()).toBe(9);
        expect(deque.get_back()).toBe(8);
    });

    // сужение размера дека
    test('should shrink buffer when many elements are removed', () => {
        for (let i = 0; i < 16; i++) {
            deque.push_back(i);
        }

        for (let i = 0; i < 12; i++) {
            deque.pop_back();
        }

        expect(deque.size()).toBe(4);
        expect(deque.get_length()).toBe(8);
    });
});
