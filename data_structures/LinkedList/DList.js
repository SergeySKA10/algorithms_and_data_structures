class Node {
    constructor(val, next, prev) {
        this.value = val;
        this.next = next;
        this.prev = prev;
    }
}

class LinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    // добавление в начало
    prepend(val) {
        const node = new Node(val, this.#head, null);

        if (this.#head) {
            this.#head.prev = node;
        } else {
            this.#tail = node;
        }

        this.#head = node;
        this.#length += 1;
        return this;
    }

    // добавление в конец
    append(val) {
        const node = new Node(val, null, null);

        if (this.#length === 0) {
            this.#head = node;
        } else {
            node.prev = this.#tail;
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

        const newNode = new Node(newValue, targetNode.next, targetNode);
        targetNode.next = newNode;

        if (newNode.next) {
            newNode.next.prev = newNode;
        }

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
        const newNode = new Node(value, prevNode.next, prevNode);
        prevNode.next = newNode;
        newNode.next.prev = newNode;
        this.#length += 1;

        return true;
    }

    // удаление по значению
    remove(val) {
        if (!this.#head) return null;

        // удаление головы
        if (this.#head.value === val) {
            const removedNode = this.#head;
            this.#length -= 1;

            if (this.#length === 0) {
                this.#head = null;
                this.#tail = null;
                return removedNode;
            }

            this.#head = this.#head.next;
            this.#head.prev = null;
            return removedNode;
        }

        // поиск и удаление других узлов
        let current = this.#head;
        while (current.next) {
            if (current.next.value === val) {
                const removedNode = current.next;
                current.next = current.next.next;
                this.#length -= 1;

                if (current.next) {
                    current.next.prev = current;
                } else {
                    this.#tail = current;
                }

                return removedNode;
            }

            current = current.next;
        }

        return null;
    }

    // удаление с позиции
    pop(pos) {
        if (pos < 0 || pos >= this.#length) return 'Position out of bounds';

        if (!this.#head) {
            return 'Linked list is empty';
        }

        if (pos == 0) {
            const node = this.#head;
            this.#head = this.#head.next;
            this.#length -= 1;

            if (this.#head) {
                this.#head.prev = null;
            } else {
                this.#tail = null;
            }

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

        if (current.next) {
            current.next.prev = current;
        } else {
            this.#tail = current;
        }

        this.#length -= 1;
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

        let current = this.#head;
        let temp = null;

        // Меняем head и tail
        [this.#head, this.#tail] = [this.#tail, this.#head];

        while (current) {
            // Сохраняем ссылку на следующий элемент
            temp = current.next;
            // Меняем местами next и prev
            current.next = current.prev;
            current.prev = temp;
            // Переходим к следующему элементу (бывшему prev)
            current = temp;
        }

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
