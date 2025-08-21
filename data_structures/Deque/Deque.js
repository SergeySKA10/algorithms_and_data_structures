class Deque {
    #deque = new Array(8);
    #cnt = 0;
    #start = null;
    #end = null;

    // увеличение размера дека
    #increaseSize(el, place) {
        if (el) {
            if (place === 'back') {
                const newDeque = new Array(this.#deque.length * 2);

                for (let i = 0; i < this.#cnt; i++) {
                    newDeque[i] =
                        this.#deque[(this.#start + i) % this.#deque.length];
                }

                this.#end = this.#cnt;
                this.#cnt += 1;
                this.#start = 0;
                this.#deque = newDeque;
                this.#deque[this.#end] = el;
                return;
            }

            if (place === 'front') {
                const newDeque = new Array(this.#deque.length * 2);
                newDeque[0] = el;

                for (let i = 1; i <= this.#cnt; i++) {
                    newDeque[i] =
                        this.#deque[(this.#start + i - 1) % this.#deque.length];
                }

                this.#end = this.#cnt;
                this.#cnt += 1;
                this.#start = 0;
                this.#deque = newDeque;
                return;
            }
        } else {
            throw new Error('no argument passed to function');
        }
    }

    // уменьшение размера
    #decreaseSize() {
        const newDeque = new Array(this.#deque.length / 2);

        for (let i = 0; i < this.#cnt; i++) {
            newDeque[i] = this.#deque[(this.#start + i) % this.#deque.length];
        }

        this.#start = 0;
        this.#end = this.#cnt - 1;
        this.#deque = newDeque;
    }

    // вставка в начало
    push_front(elem) {
        if (this.isEmpty()) {
            this.#start = 0;
            this.#end = 0;
            this.#deque[this.#start] = elem;
            this.#cnt += 1;

            return this;
        } else {
            if (this.#cnt === this.#deque.length) {
                this.#increaseSize(elem, 'front');
                return this;
            } else if (this.#start === 0) {
                for (let i = this.#cnt; i > 0; i--) {
                    this.#deque[i] = this.#deque[i - 1];
                }
                this.#deque[this.#start] = elem;
                this.#end += 1;
                this.#cnt += 1;
                return this;
            } else {
                this.#start -= 1;
                this.#cnt += 1;
                this.#deque[this.#start] = elem;
            }

            return this;
        }
    }

    // вставка в конец
    push_back(elem) {
        if (this.isEmpty()) {
            this.#start = 0;
            this.#end = 0;
            this.#deque[this.#start] = elem;
            this.#cnt += 1;

            return this;
        }

        if (this.#cnt === this.#deque.length) {
            this.#increaseSize(elem, 'back');
            return this;
        } else {
            if (this.#end === this.#deque.length - 1) {
                this.#end = 0;
            } else {
                this.#end += 1;
            }
        }
        this.#deque[this.#end] = elem;
        this.#cnt += 1;
        return this;
    }

    // удаление с начала
    pop_front() {
        if (this.isEmpty()) {
            return 'Dequeu is empty';
        }

        const elem = this.#deque[this.#start];
        this.#deque[this.#start] = null;
        this.#cnt -= 1;

        if (this.#cnt === 0) {
            this.clear();
        } else {
            this.#start += 1;

            if (this.#cnt === this.#deque.length / 4) {
                this.#decreaseSize();
            }
        }

        return elem;
    }

    // удаление с конца
    pop_back() {
        if (this.isEmpty()) {
            return 'Dequeu is empty';
        }

        const elem = this.#deque[this.#end];
        this.#deque[this.#end] = null;
        this.#end -= 1;
        this.#cnt -= 1;

        if (this.#cnt === 0) {
            this.clear();
        }

        if (this.#cnt === this.#deque.length / 4) {
            this.#decreaseSize();
        }

        return elem;
    }

    // получение первого элемента
    get_front() {
        return this.#deque[this.#start];
    }

    // получение последнего элемента
    get_back() {
        return this.#deque[this.#end];
    }

    // поулчение количества элементов в деке
    size() {
        return this.#cnt;
    }

    // получение размера дека
    get_length() {
        return this.#deque.length;
    }

    // удаление всех элементов из дека
    clear() {
        this.#deque = new Array(8);
        this.#cnt = 0;
        this.#start = null;
        this.#end = null;

        return this;
    }

    // проверка на пустоту
    isEmpty() {
        return this.#cnt === 0;
    }

    // вывод deque
    showDeque() {
        return this.#deque;
    }
}

module.exports.Deque = Deque;
