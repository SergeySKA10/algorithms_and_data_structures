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
        if (this.#length === 0) {
            const node = new Node(val, null, null);
            this.#head = node;
            this.#tail = node;
            this.#length += 1;
        } else {
            const node = new Node(val, this.#head, null);
            this.#head = node;
            this.#length += 1;
        }

        return this;
    }

    // добавление в конец
    append(val) {
        if (this.#length === 0) {
            const node = new Node(val, null, null);
            this.#head = node;
            this.#tail = node;
            this.#length += 1;
        } else {
            const node = new Node(val, null, this.#tail);
            this.#tail.next = node;
            this.#tail = node;
            this.#length += 1;
        }

        return this;
    }

    // вставка элемента на позицию
    insert(node, val) {
        const nodeList = this.findNode(node);

        if (nodeList) {
            const newNode = new Node(val, null, null);

            if (!nodeList.next) {
                nodeList.next = newNode;
                newNode.prev = nodeList;
                this.#tail = newNode;
                this.#length += 1;
            } else {
                const next = nodeList.next;
                nodeList.next = newNode;
                newNode.prev = nodeList;
                newNode.next = next;
                next.prev = newNode;
                this.#length += 1;
            }

            return this;
        } else {
            return 'Node is not defined in this LinkedList';
        }
    }

    // удаление по значению
    remove(val) {
        if (this.#length === 0) {
            return 'Linked list is empty';
        }

        let list = this.#head;

        if (list.val === val) {
            this.#head = this.#head.next;

            if (this.#head) {
                this.#head.prev = null;
            }

            list = null;
            this.#length -= 1;
            return this;
        }

        while (list) {
            if (list.val === val) {
                const node = list.next;
                const prev = list.prev;

                if (node) {
                    prev.next = next;
                    next.prev = prev;
                    this.#length -= 1;
                    return list;
                } else {
                    this.#tail = prev;
                    prev.next = null;
                    return list;
                }
            } else {
                list = list.next;
            }
        }

        return 'Node is not find';
    }

    // удаление с позиции
    pop(pos) {
        if (this.#length === 0) {
            return 'Linked list is empty';
        }

        if (pos == 0) {
            const node = this.#head;
            this.#head = this.#head.next;
            this.#head.prev = null;
            this.#length -= 1;
            return node;
        }

        let counterNode = 0;
        let list = this.#head;

        while (list) {
            if (pos == count) {
                const node = list.next;
                const prev = list.prev;

                if (node) {
                    prev.next = next;
                    next.prev = prev;
                    this.#length -= 1;
                    return list;
                } else {
                    this.#tail = prev;
                    prev.next = null;
                    return list;
                }
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

        while (this.#head) {
            if (this.#head.next) {
                const next = this.#head.next;
                this.#head.next = this.#head.prev;
                this.#head.prev = next;
                this.#head = next;
            } else {
                const prev = this.#head.prev;
                this.#head.next = prev;
                this.#head.prev = null;
            }
        }

        return this;
    }

    // нахождение node
    findNode(node) {
        if (this.#length === 0) {
            return false;
        }

        let list = this.#head;
        let listEnd = this.#tail;

        while (true) {
            if (
                list.val === node.val &&
                list.next === node.next &&
                list.prev === node.prev
            ) {
                return list;
            }

            if (list === listEnd) {
                break;
            }

            if (
                listEnd.val === node.val &&
                listEnd.next === node.next &&
                listEnd.prev === node.prev
            ) {
                return listEnd;
            }

            list = list.next;

            if (list === listEnd) {
                break;
            }

            listEnd = listEnd.prev;
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
