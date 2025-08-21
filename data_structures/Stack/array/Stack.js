class Stack {
    #stack = new Array(8);
    #cnt = 0;

    // проверка на пустоту стека
    isEmpty() {
        return this.#cnt === 0;
    }

    // показ верхнего элемента
    peek() {
        if (this.isEmpty()) {
            return 'stack is empty';
        }
        return this.#stack[this.#cnt - 1];
    }

    // показ всего стека
    showStack() {
        return this.#stack.slice(0, this.#cnt);
    }

    // текущий размер стека
    size() {
        return this.#cnt;
    }

    // возврат длинны массива
    capacity() {
        return this.#stack.length;
    }

    // расширение стека
    #increaseSize() {
        const newStack = new Array(this.#stack.length * 2);

        for (let i = 0; i < this.#stack.length; i++) {
            newStack[i] = this.#stack[i];
        }

        this.#stack = newStack;
    }

    // уменьшение стека
    #decreaseSize() {
        const newStack = new Array(this.#stack.length / 2);

        for (let i = 0; i < this.#cnt; i++) {
            newStack[i] = this.#stack[i];
        }

        this.#stack = newStack;
    }

    // отчиска стека
    clearStack() {
        this.#stack = new Array(8);
        this.#cnt = 0;
        return this;
    }

    // добавление в стек
    push(x) {
        // если стек заполнен
        if (this.#cnt === this.#stack.length - 1) {
            this.#increaseSize();
        }

        this.#stack[this.#cnt] = x;
        this.#cnt += 1;
        return this;
    }

    // удаление из стека
    delete() {
        if (this.isEmpty()) {
            return 'Stack is empty';
        }

        this.#cnt -= 1;
        const elem = this.#stack[this.#cnt];

        this.#stack[this.#cnt] = null;

        if (
            this.#cnt > 0 &&
            this.#cnt === this.#stack.length / 4 &&
            this.#stack.length >= 16
        ) {
            this.#decreaseSize();
        }

        return elem;
    }
}

// ПРОВЕРКА РАБОТЫ СТЕКА: Задача на валидность синтаксиса

const validSyntax = (str) => {
    const stack = new Stack();

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
            stack.push(str[i]);
        } else {
            if (stack.isEmpty()) return false;

            const elem = stack.delete();

            if (elem === '{') {
                if (str[i] !== '}') {
                    return false;
                }
            } else if (elem === '(') {
                if (str[i] !== ')') {
                    return false;
                }
            } else if (elem === '[') {
                if (str[i] !== ']') {
                    return false;
                }
            } else {
                continue;
            }
        }
    }

    return stack.isEmpty();
};

module.exports = {
    Stack: Stack,
    validSyntax: validSyntax,
};
