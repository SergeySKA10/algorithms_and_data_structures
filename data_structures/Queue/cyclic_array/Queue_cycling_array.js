class Queue {
    // очередь
    #queue = new Array(8);
    // счетчик элементов в очереди
    #cnt = 0;
    // ссылка на первый элемент
    #start = null;
    // ссылка на второй элемент
    #end = null;

    // проверка на пустоту
    isEmpty() {
        return this.#cnt === 0;
    }

    // проверка размера очереди
    size() {
        return this.#cnt;
    }

    // посмотреть первый элемент очереди
    peek() {
        return this.#queue[this.#start];
    }

    // посмотреть очередь
    showQueue() {
        return this.#queue;
    }

    // увеличение размера
    #increaseSize() {
        const newQueue = new Array(this.#queue.length * 2);
        for (let i = 0; i < this.#cnt; i++) {
            newQueue[i] = this.#queue[(this.#start + i) % this.#queue.length];
        }
        this.#start = 0;
        this.#end = this.#cnt - 1;
        this.#queue = newQueue;
    }

    // уменьшение размера
    #decreaseSize() {
        const newQueue = new Array(this.#queue.length / 2);
        for (let i = 0; i < this.#cnt; i++) {
            newQueue[i] = this.#queue[(this.#start + i) % this.#queue.length];
        }
        this.#start = 0;
        this.#end = this.#cnt - 1;
        this.#queue = newQueue;
    }

    // добавление элемента
    add(x) {
        // если очередь пуста
        if (this.#cnt === 0) {
            this.#queue[0] = x;
            this.#start = 0;
            this.#end = 0;
            this.#cnt += 1;
            return this;
        }

        // если end === length
        if (this.#end === this.#queue.length - 1) {
            // если this.#start === 0
            if (this.#start === 0) {
                this.#increaseSize();
                this.#queue[this.#end] = x;
            } else {
                this.#queue[0] = x;
                this.#end = 0;
            }
            this.#cnt += 1;
            return this;
        }

        // если end === start
        if (this.#end + 1 === this.#start) {
            this.#increaseSize();
            this.#queue[this.#end] = x;
            this.#cnt += 1;
            return this;
        }

        this.#end += 1;
        this.#queue[this.#end] = x;
        this.#cnt += 1;
        return this;
    }

    // удаление элемента
    pop() {
        if (this.isEmpty()) {
            return 'Queue is empty';
        }

        const elem = this.#queue[this.#start];
        this.#queue[this.#start] = null;
        this.#cnt -= 1;

        // проверяем количество элементов
        if (this.isEmpty()) {
            this.clearQueue();
            return elem;
        }

        this.#start = (this.#start + 1) % this.#queue.length;

        // Проверяем сужение здесь!
        if (this.#cnt === this.#queue.length / 4 && this.#queue.length >= 16) {
            this.#decreaseSize();
        }

        return elem;
    }

    // отчистка очереди
    clearQueue() {
        this.#queue = new Array(8);
        this.#start = null;
        this.#end = null;
        this.#cnt = 0;
        return this;
    }
}

module.exports.Queue = Queue;
