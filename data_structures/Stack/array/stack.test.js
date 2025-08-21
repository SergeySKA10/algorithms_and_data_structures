const { Stack, validSyntax } = require('./Stack.js');

describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    test('should initialize empty stack', () => {
        expect(stack.isEmpty()).toBe(true);
        expect(stack.size()).toBe(0);
    });

    test('should push and pop elements', () => {
        stack.push(1).push(2).push(3);
        expect(stack.size()).toBe(3);
        expect(stack.delete()).toBe(3);
        expect(stack.delete()).toBe(2);
        expect(stack.size()).toBe(1);
    });

    test('should handle resize', () => {
        for (let i = 0; i < 10; i++) {
            stack.push(i);
        }
        expect(stack.capacity()).toBe(16);

        for (let i = 0; i < 7; i++) {
            stack.delete();
        }
        expect(stack.capacity()).toBe(8);
    });

    test('should check bracket validation correctly', () => {
        expect(validSyntax('()[]{}')).toBe(true);
        expect(validSyntax('([{}])')).toBe(true);
        expect(validSyntax('([)]')).toBe(false);
        expect(validSyntax('(')).toBe(false);
        expect(validSyntax(')')).toBe(false);
        expect(validSyntax('{([({[({[]})]})])}{({{[()]}})}')).toBe(true);
        expect(validSyntax('{([])}{([({({({([()])}])})})})})]')).toBe(false);
    });
});
