const { mergeSort } = require('./mergeSort.js');

describe('Merge Sort Comprehensive Tests', () => {
    // Базовые тесты
    test('empty array', () => {
        expect(mergeSort([])).toEqual([]);
    });

    test('single element', () => {
        expect(mergeSort([42])).toEqual([42]);
    });

    test('already sorted', () => {
        expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('reverse sorted', () => {
        expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test('with negatives', () => {
        expect(mergeSort([-3, -1, -2, 0, 2, 1])).toEqual([-3, -2, -1, 0, 1, 2]);
    });

    // Производительность
    describe('Performance tests', () => {
        const testCases = [
            { name: '10^4 elements', size: 10000, max: 1000000 },
            { name: '10^5 elements', size: 100000, max: 10000000 },
            { name: '10^6 elements', size: 1000000, max: 10000000 },
        ];

        testCases.forEach(({ name, size, max }) => {
            test(name, () => {
                const array = Array.from({ length: size }, () =>
                    Math.floor(Math.random() * (max + 1))
                );

                const sortedCopy = [...array].sort((a, b) => a - b);

                console.time(`mergeSort ${name}`);
                const result = mergeSort(array);
                console.timeEnd(`mergeSort ${name}`);

                expect(result).toEqual(sortedCopy);
            });
        });
    });

    // Специальные случаи
    test('all same elements', () => {
        const array = new Array(1000).fill(7);
        expect(mergeSort(array)).toEqual(array);
    });

    test('very small range', () => {
        const array = Array.from(
            { length: 10000 },
            () => Math.floor(Math.random() * 10) // Только 0-9
        );

        const sortedCopy = [...array].sort((a, b) => a - b);
        expect(mergeSort(array)).toEqual(sortedCopy);
    });
});
