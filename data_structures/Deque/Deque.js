class Deque {
    //массив для хранения
    #deque = new Array(8);
    // счетчик элементов
    #cnt = 0;
    // позиция первого элемента
    #start = null;
    // позиция последнего элемента
    #end = null;

    // увеличение размера дека
    #increaseSize() {
        // создаем новый массив
        const newDeque = new Array(this.#deque.length * 2);

        // перебираем элементы и добавляем их в новый массив используя % для вычисления индекса
        for (let i = 0; i < this.#cnt; i++) {
            newDeque[i] = this.#deque[(this.#start + i) % this.#deque.length];
        }

        // назначаем указатели
        this.#start = 0;
        this.#end = this.#cnt - 1;

        // назначаем новое хранилище для элементов
        this.#deque = newDeque;
    }

    // уменьшение размера
    #decreaseSize() {
        // создаем новый массив
        const newDeque = new Array(this.#deque.length / 2);

        // перебираем элементы и добавляем их в новый массив используя % для вычисления индекса
        for (let i = 0; i < this.#cnt; i++) {
            newDeque[i] = this.#deque[(this.#start + i) % this.#deque.length];
        }

        // назначаем указатели
        this.#start = 0;
        this.#end = this.#cnt - 1;

        // назначаем новое хранилище для элементов
        this.#deque = newDeque;
    }

    // вставка в начало
    push_front(elem) {
        // проверка на пустоту с заполнением
        if (this.isEmpty()) {
            this.#start = 0;
            this.#end = 0;
            this.#deque[this.#start] = elem;
            this.#cnt += 1;

            return this;
        } else {
            // условие увеличение размера массива
            if (this.#cnt === this.#deque.length) {
                this.#increaseSize();
            }

            // вычисляем start c помощью % (зацикливание)
            this.#start =
                (this.#start - 1 + this.#deque.length) % this.#deque.length;

            // присваиваем значение и увеличиваем счетчик
            this.#deque[this.#start] = elem;
            this.#cnt++;
            return this;
        }
    }

    // вставка в конец
    push_back(elem) {
        // проверка на пустоту с заполнением
        if (this.isEmpty()) {
            this.#start = 0;
            this.#end = 0;
            this.#deque[this.#start] = elem;
            this.#cnt += 1;

            return this;
        }

        // условие увеличение размера массива
        if (this.#cnt === this.#deque.length) {
            this.#increaseSize();
            this.#end += 1;
            this.#deque[this.#end] = elem;
            this.#cnt += 1;
            return this;
        } else {
            // условие для зацикливания
            if (this.#end === this.#deque.length - 1) {
                this.#end = 0;
            } else {
                this.#end += 1;
            }
        }

        // присваиваем значение и увеличиваем счетчик
        this.#deque[this.#end] = elem;
        this.#cnt += 1;
        return this;
    }

    // удаление с начала
    pop_front() {
        // проверка на пустоту
        if (this.isEmpty()) {
            return 'Dequeu is empty';
        }

        // удаление элемента
        const elem = this.#deque[this.#start];
        this.#deque[this.#start] = null;
        this.#cnt -= 1;

        // проверка на пустоту
        if (this.#cnt === 0) {
            this.clear();
        } else {
            this.#start =
                (this.#start + 1 + this.#deque.length) % this.#deque.length;

            // условие для уменьшения размера
            if (
                this.#cnt === this.#deque.length / 4 &&
                this.#deque.length >= 16
            ) {
                this.#decreaseSize();
            }
        }

        return elem;
    }

    // удаление с конца
    pop_back() {
        // проверка на пустоту
        if (this.isEmpty()) {
            return 'Dequeu is empty';
        }

        // удаление элемента
        const elem = this.#deque[this.#end];
        this.#deque[this.#end] = null;
        this.#end = (this.#end - 1 + this.#deque.length) % this.#deque.length;
        this.#cnt -= 1;

        // проверка на пустоту
        if (this.#cnt === 0) {
            this.clear();
        }

        // условие для уменьшения размера
        if (this.#cnt === this.#deque.length / 4 && this.#deque.length >= 16) {
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
