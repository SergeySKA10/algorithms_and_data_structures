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

    // посмотреть первый элемент очереди
    peak() {
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
        this.#end = this.#cnt - 1;
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

        // если в очереди нет места
        if (this.#end === this.#queue.length - 1) {
            // если this.#start === 0
            if (this.#start === 0) {
                this.#increaseSize(this.#start);
                this.#end += 1;
                this.#queue[this.#end] = x;
            } else {
                this.#queue[0] = x;
                this.#end = 0;
            }
            this.#cnt += 1;
            return this;
        }

        // если end упирается в start
        if (this.#end + 1 === this.#start) {
            this.#increaseSize(this.#start);
            this.#end += 1;
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

        // функция уменьшения размера
        if (this.#cnt === this.#queue.length / 4 && this.#queue.length >= 16) {
            this.#decreaseSize(this.#start);
        }

        // проверяем this.#start
        if (this.#start === this.#queue.length - 1) {
            this.#start === 0;
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

// Проверка работы
const q = new Queue();
// заполнение
for (let i = 0; i < 8; i++) {
    q.add(i);
}

console.log(q.showQueue(), 'добавление 8 элементов');

q.add(8);
console.log(q.showQueue(), '+1 элемент - расширение');

q.pop();
q.pop();
console.log(q.showQueue(), 'удаление 2-х');

for (let i = 0; i < 7; i++) {
    q.pop();
}

console.log(q.showQueue(), 'удаление всех ');

// заполнение
for (let i = 0; i < 8; i++) {
    q.add(i);
}

console.log(q.showQueue(), 'заполнение ');

q.pop();
q.pop();
q.add(9);
q.add(10);

console.log(q.showQueue(), 'проверка цикла ');

q.add(11);
console.log(q.showQueue(), 'расширяем ');

for (let i = 12; i < 54; i++) {
    q.add(i);
}
console.log(q.showQueue(), 'расширяем ');

q.clearQueue();
console.log(q.showQueue(), 'отчищаем ');

const testObj = {
    t1: {
        t5: {},
        t6: {},
        t7: {
            t18: {},
            t19: {},
            t20: {},
            t21: {
                t39: {},
                t40: {},
                t41: {},
            },
        },
    },
    t2: {
        t8: {},
        t9: {},
        t10: {
            t22: {},
            t23: {},
            t24: {},
            t25: {
                t42: {},
                t43: {},
                t44: {},
            },
        },
        t11: {
            t26: {},
            t27: {},
            t28: {},
            t29: {
                t45: {},
            },
        },
    },
    t3: {
        t12: {},
        t13: {},
        t14: {
            t30: {},
            t31: {},
            t32: {},
            t33: {
                t46: {},
                t47: {},
                t48: {},
                t49: 'i',
            },
            t34: {
                t50: {},
                t51: {},
                t52: {},
                t53: {
                    a: {},
                },
            },
        },
    },
    t4: {
        t15: {},
        t16: {},
        t17: {
            t35: {},
            t36: {},
            t37: {},
            t38: {
                t54: {},
                t55: {},
                t56: {},
            },
        },
    },
};

const bfs = (obj) => {
    const q = new Queue();
    let findI = false;
    q.add(obj);

    while (!q.isEmpty()) {
        const elem = q.pop();
        for (let key in elem) {
            if (elem[key] === 'i') {
                findI = true;
            }
            if (typeof elem[key] === 'object') {
                q.add(elem[key]);
            }
        }
    }
    console.log(q.showQueue());
    return findI;
};

console.log(bfs(testObj));
