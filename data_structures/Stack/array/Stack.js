class Stack {
    #stack = new Array(8);
    #cnt = 0;
    #start = null;

    // проверка на пустоту стека
    isEmpty() {
        return this.#cnt === 0;
    }

    // показ верхнего элемента
    peek() {
        if (this.isEmpty()) {
            return 'stack is empty';
        }
        return this.#stack[this.#start];
    }

    // показ всего стека
    showStack() {
        return this.#stack;
    }

    // текущий размер стека
    size() {
        return this.#stack.length;
    }

    // расширение стека
    #increaseSize() {
        const newStack = new Array(this.#stack.length * 2);

        for (let i = 0; i < this.#stack.length; i++) {
            newStack[i] = this.#stack[i];
        }

        this.#stack = newStack;
        return this;
    }

    // уменьшение стека
    #decreaseSize() {
        const newStack = new Array(this.#stack.length / 2);

        for (let i = 0; i < this.#cnt; i++) {
            newStack[i] = this.#stack[i];
        }

        this.#stack = newStack;
        return this.#stack;
    }

    // отчиска стека
    clearStack() {
        this.#stack = new Array(8);
        this.#cnt = 0;
        this.#start = null;
        return this;
    }

    // добавление в стек
    add(x) {
        if (this.isEmpty()) {
            this.#start = 0;
            this.#cnt += 1;
            this.#stack[this.#start] = x;
            return this;
        }

        // если стек заполнен
        if (this.#start === this.#stack.length - 1) {
            this.#increaseSize();
        }

        this.#start += 1;
        this.#cnt += 1;
        this.#stack[this.#start] = x;
        return this;
    }

    // удаление из стека
    delete() {
        if (this.isEmpty()) {
            return 'Stack is empty';
        }

        const elem = this.#stack[this.#start];

        this.#stack[this.#start] = null;
        this.#start -= 1;
        this.#cnt -= 1;

        if (this.#start === 0) {
            this.clearStack();
            return elem;
        }

        if (this.#cnt === this.#stack.length / 4) {
            this.#decreaseSize();
        }

        return elem;
    }
}

// ПРОВЕРКА РАБОТЫ СТЕКА:

const s = '{([({[({[]})]})])}{({{[()]}})}'; // true
const str2 = '{([])}{([({({({([()])}])})})})})]'; // false

const validSyntax = (str) => {
    const stack = new Stack();

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
            stack.add(str[i]);
        } else {
            const elem = stack.delete();

            if (elem === '{') {
                if (str[i] !== '}') {
                    console.log(i, false);
                    return false;
                }
            } else if (elem === '(') {
                if (str[i] !== ')') {
                    console.log(i, false);
                    return false;
                }
            } else if (elem === '[') {
                if (str[i] !== ']') {
                    console.log(i, false);
                    return false;
                }
            } else {
                continue;
            }
        }
    }

    return true;
};

console.log(validSyntax(s));
console.log(validSyntax(str2));
