const { Queue } = require('./Queue_cycling_array.js');

describe('Queue cycling array', () => {
    let queue;

    // Создаём новую очередь перед каждым тестом
    beforeEach(() => {
        queue = new Queue();
    });

    // Тест 1: Создание пустой очереди
    test('should initialize empty queue', () => {
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    // Тест 2: Добавление элементов
    test('should add elements to the queue', () => {
        queue.add(1).add(2).add(3);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(3);
        expect(queue.peek()).toBe(1); // Первый элемент
    });

    // Тест 3: Удаление элементов (FIFO)
    test('should remove elements in FIFO order', () => {
        queue.add(10).add(20).add(30);
        expect(queue.pop()).toBe(10);
        expect(queue.pop()).toBe(20);
        expect(queue.size()).toBe(1);
        expect(queue.peek()).toBe(30);
    });

    // Тест 4: Очистка очереди
    test('should clear the queue', () => {
        queue.add('a').add('b').clearQueue();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.size()).toBe(0);
    });

    // Проверка неочевидных сценариев:

    // Удаление из пустой очереди
    test('should handle pop from empty queue', () => {
        expect(queue.pop()).toBe('Queue is empty');
    });

    // Автоматическое расширение буфера при заполнении
    test('should resize buffer when full', () => {
        let initialize = 8;

        for (let i = 0; i < initialize; i++) {
            queue.add(i);
        }

        expect(queue.size()).toBe(initialize);

        queue.add(8);
        expect(queue.size()).toBe(initialize + 1);
        expect(queue.peek()).toBe(0);
    });

    // Автоматическое сужение буфера при уменьшении элементов в очереди
    test('should shrink buffer when many elements are removed', () => {
        for (let i = 0; i < 16; i++) {
            queue.add(i);
        }

        for (let i = 0; i < 12; i++) {
            queue.pop();
        }

        expect(queue.size()).toBe(4);
    });
});
