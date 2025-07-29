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
        if (this.#length === 0) {
            const node = new Node(val, null);
            this.#head = node;
            this.#tail = node;
            this.#length += 1;
        } else {
            this.#tail.next = new Node(val, null);
            this.#tail = this.#tail.next;
            this.#length += 1;
        }

        return this;
    }

    // вставка элемента на позицию
    insert(node, val) {
        const nodeList = this.findNode(node);

        if (nodeList) {
            const newNode = new Node(val, null);

            if (!nodeList.next) {
                nodeList.next = newNode;
                this.#tail = newNode;
                this.#length += 1;
            } else {
                const next = nodeList.next;
                nodeList.next = newNode;
                newNode.next = next;
                this.#length += 1;
            }

            return this;
        } else {
            return 'Node is not defined in this LinkedList';
        }
    }

    // удаление по значению
    remove(val) {
        if (!this.#head) {
            return 'Linked list is empty';
        }

        let list = this.#head;

        if (list.val === val) {
            this.#head = this.#head.next;
            list = null;
            this.#length -= 1;
            return this;
        }

        while (list.next) {
            if (list.next.val === val) {
                const node = list.next;
                list.next = list.next.next;
                this.#length -= 1;
                return node;
            } else {
                list = list.next;
            }
        }

        return 'Node is not find';
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
            return node;
        }

        let counterNode = 0;
        let list = this.#head;

        while (list) {
            if (pos == count + 1) {
                const node = list.next;
                list.next = list.next.next;
                this.#length -= 1;
                return node;
            } else {
                list = list.next;
                counterNode += 1;
            }
        }
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
        if (this.#length === 0) {
            return 'Linked List is empty';
        }

        if (this.#length === 1) {
            return this;
        }

        this.#tail = this.#head;
        let next = null;
        let prev = null;

        while (this.#head.next) {
            next = this.#head.next;
            this.#head.next = prev;
            prev = this.#head;
            this.#head = next;
        }

        this.#head.next = prev;

        return this;
    }

    // нахождение node
    findNode(node) {
        if (this.#length === 0) {
            return false;
        }

        let list = this.#head;

        while (list) {
            if (list.val === node.val && list.next === node.next) {
                return list;
            }

            list = list.next;
        }

        return false;
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

    // сортировка
    sort() {}
}
