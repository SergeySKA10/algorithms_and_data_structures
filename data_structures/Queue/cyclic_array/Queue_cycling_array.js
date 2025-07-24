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
        return this.#queue.length;
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
    #increaseSize(ind) {
        const newQueue = new Array(this.#queue.length * 2);

        if (ind === 0) {
            for (let i = 0; i < this.#queue.length; i++) {
                newQueue[i] = this.#queue[i];
            }
        } else {
            let j = 0;
            if (this.#end < ind) {
                for (let i = ind; i < this.#queue.length; i++) {
                    newQueue[j++] = this.#queue[i];
                }

                for (let i = 0; i <= this.#end; i++) {
                    newQueue[j++] = this.#queue[i];
                }
            } else {
                for (let i = ind; i <= this.#end; i++) {
                    newQueue[j++] = this.#queue[i];
                }
            }
        }

        this.#start = 0;
        this.#end = this.#queue.length;
        this.#queue = newQueue;
    }

    // уменьшение размера
    #decreaseSize(ind) {
        const newQueue = new Array(this.#queue.length / 2);
        if (ind === 0) {
            for (let i = ind; i < this.#cnt; i++) {
                newQueue[i] = this.#queue[i];
            }
        } else {
            let j = 0;
            if (this.#end < ind) {
                for (let i = ind; i < this.#queue.length; i++) {
                    newQueue[j++] = this.#queue[i];
                }
                for (let i = 0; i <= this.#end; i++) {
                    newQueue[j++] = this.#queue[i];
                }
            } else {
                for (let i = ind; i <= this.#end; i++) {
                    newQueue[j++] = this.#queue[i];
                }
            }
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
                this.#increaseSize(this.#start);
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
            this.#increaseSize(this.#start);
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

        this.#start += 1;

        // проверяем this.#start
        if (this.#start === this.#queue.length - 1) {
            this.#start = 0;
        }

        // функция уменьшения размера
        if (this.#cnt === this.#queue.length / 4 && this.#queue.length >= 16) {
            this.#decreaseSize(this.#start);
        }

        return elem;
    }

    // отчиска очереди
    clearQueue() {
        this.#queue = new Array(8);
        this.#start = null;
        this.#end = null;
        this.#cnt = 0;
        return this;
    }
}

// ПРОВЕРКА РАБОТЫ ОЧЕРЕДИ:

const test = {
    a1: 2,
    a2: 3,
    a3: {
        b1: 4,
        b2: 5,
        b3: {
            c1: {
                d1: 9,
            },
            c2: 7,
        },
        b4: {
            c3: 4,
            c4: 6,
        },
    },
    a4: {
        b5: 9,
    },
    a5: 2,
    a6: 3,
    a7: {
        b6: 4,
        b7: 5,
        b8: {
            c5: {
                d2: 9,
            },
            c6: 7,
        },
        b9: {
            c7: 4,
            c8: 6,
        },
    },
    a8: {
        b10: 9,
    },
};

// обход в ширину с помощью очереди

const bfs = (obj) => {
    const keyInObj = [];
    const q = new Queue();
    q.add(obj);

    while (!q.isEmpty()) {
        const elem = q.pop();
        for (const key in elem) {
            if (typeof elem[key] === 'object') {
                q.add(elem[key]);
            } else {
                if (elem[key] === 9) {
                    keyInObj.push(key);
                }
            }
        }
    }

    return keyInObj;
};

console.log(bfs(test));
