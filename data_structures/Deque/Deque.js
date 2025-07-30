class Deque {
    #deque = new Array(8);
    #cnt = 0;
    #start = null;
    #end = null;

    // уведичение размера дека
    #increaseSize(ind, el = null) {
        // устанваливаем start end cnt
        if (el) {
        }
    }

    // уменьшение размера
    #decreaseSize(ind) {}

    // вставка в начало
    push_front(elem) {
        if (this.isEmpty()) {
            this.#start = 0;
            this.#end = 0;
            this.#deque[this.#start] = elem;
            this.#cnt += 1;

            return this;
        } else {
            if (this.#start === 0 || this.#cnt === this.#deque.length) {
                if (this.#cnt === this.#deque.length) {
                    this.#increaseSize(this.#start, elem);
                    return this;
                } else {
                    const newDeque = new Array(this.#deque.length);
                    newDeque[0] = elem;

                    for (let i = 1; i <= this.#cnt; i++) {
                        newDeque[i] = this.#deque[i - 1];
                    }

                    this.#end += 1;
                    this.#cnt += 1;
                    this.#deque = newDeque;
                    return this;
                }
            } else {
                this.#start -= 1;
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
            this.#increaseSize(this.#start);
            this.#deque[this.#end] = elem;
        } else {
            if (this.#end === this.#deque.length - 1) {
                this.#end = 0;
            } else {
                this.#end += 1;
            }

            this.#deque[this.#end] = elem;
        }

        return this;
    }

    // удаление с начала
    pop_front() {}

    // удаление с конца
    pop_back() {}

    // получение первого элемента
    get_front() {
        return this.#start;
    }

    // получение последнего элемента
    get_back() {
        return this.#end;
    }

    // поулчение количества элементов в деке
    size() {
        return this.#cnt;
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
}
