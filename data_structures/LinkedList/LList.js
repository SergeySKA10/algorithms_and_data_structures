class Node {
    constructor(val, next) {
        this.value = val;
        this.next = next;
    }
}

class LinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    // добавление в начало
    prepend(val) {
        if (this.#length === 0) {
            const node = new Node(val, null);
            this.#head = node;
            this.#tail = node;
            this.#length += 1;
        } else {
            const node = new Node(val, this.#head);
            this.#head = node;
            this.#length += 1;
        }

        return this;
    }

    // добавление в конец
    append(val) {
        const node = new Node(val, null);

        if (this.#length === 0) {
            this.#head = node;
        } else {
            this.#tail.next = node;
        }

        this.#tail = node;
        this.#length += 1;
        return this;
    }

    // вставка элемента на позицию по переданному значению
    insertAfterValue(targetValue, newValue) {
        const targetNode = this.findNodeByValue(targetValue);
        if (!targetNode) return false;

        const newNode = new Node(newValue, targetNode.next);
        targetNode.next = newNode;
        this.#length += 1;

        if (targetNode === this.#tail) this.#tail = newNode;

        return true;
    }

    // вставка элемента на позицию по переданному индексу
    insertAtIndex(index, value) {
        if (index < 0 || index > this.#length) return false;

        if (index === 0) return this.prepend(value);
        if (index === this.#length) return this.append(value);

        const prevNode = this.findNodeByIndex(index - 1);
        const newNode = new Node(value, prevNode.next);
        prevNode.next = newNode;
        this.#length += 1;

        return true;
    }

    // удаление по значению
    remove(val) {
        if (!this.#head) return null;

        // удаление головы
        if (this.#head.value === val) {
            const removedNode = this.#head;
            this.#head = this.#head.next;
            this.#length -= 1;
            if (this.#length === 0) this.#tail = null;
            return removedNode;
        }

        // поиск и удаление других узлов
        let current = this.#head;
        while (current.next) {
            if (current.next.value === val) {
                const removedNode = current.next;
                current.next = current.next.next;
                this.#length -= 1;

                if (!current.next) this.#tail = current;

                return removedNode;
            }
            current = current.next;
        }

        return null;
    }

    // удаление с позиции
    pop(pos) {
        if (!this.#head) {
            return 'Linked list is empty';
        }

        if (pos == 0) {
            const node = this.#head;
            this.#head = this.#head.next;
            this.#length -= 1;

            // если length === 0 , то tail = null
            if (this.#length === 0) this.#tail = null;

            return node;
        }

        // ищем элемент = pos - 1
        let current = this.#head;
        let index = 0;

        while (current && index < pos - 1) {
            current = current.next;
            index++;
        }

        // если не current или нет следующего элемента
        if (!current || !current.next) return 'Position out of bounds';

        // удаляем элемент и возвращаем его
        const removedNode = current.next;
        current.next = current.next.next;
        this.#length -= 1;

        if (!current.next) this.#tail = current;

        return removedNode;
    }

    // удаление всех элементов
    clear() {
        this.#head = null;
        this.#tail = null;
        this.#length = 0;
    }

    // копирование списка
    copyList() {
        if (this.#length === 0) {
            return new LinkedList();
        }
        const newLinkedList = new LinkedList();
        let list = this.#head;

        while (list) {
            newLinkedList.append(list.value);
            list = list.next;
        }

        return newLinkedList;
    }

    // получение размера списка
    size() {
        return this.#length;
    }

    // получение головы списка
    getHead() {
        return this.#head;
    }

    // получение последнего элемента списка
    getTail() {
        return this.#tail;
    }

    // разворот list
    reverse() {
        if (this.#length <= 1) return this;

        let prev = null;
        let current = this.#head;
        this.#tail = this.#head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.#head = prev;
        return this;
    }

    // нахождение node по значению
    findNodeByValue(value) {
        let current = this.#head;
        while (current) {
            if (current.value === value) return current;
            current = current.next;
        }
        return null;
    }

    // нахождение node по индексу
    findNodeByIndex(index) {
        if (index < 0 || index >= this.#length) return null;

        let current = this.#head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    // метод поиска цикла
    findCycle() {
        let a = this.#head;
        let b = this.#head;

        while (true) {
            if (b === null) break;
            b = b.next;

            if (b === null) break;
            if (a === b) break;

            b = b.next;

            if (a === b) break;

            a = a.next;
        }

        return b ? true : false;
    }

    // преобразование в массив
    toArray() {
        const result = [];
        let current = this.#head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    // поиск зачения по индексу
    get(index) {
        if (index < 0 || index >= this.#length) return null;
        return this.findNodeByIndex(index).value;
    }

    // проверка на наличие значения
    contains(value) {
        return this.findNodeByValue(value) !== null;
    }
}

module.exports.LinkedList = LinkedList;
