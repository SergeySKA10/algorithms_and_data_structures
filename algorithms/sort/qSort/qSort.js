// простой вариант - не всегда оптимальный и + дополнительая память
const qSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const support = arr[0];
    const b = [];
    const l = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < support) {
            l.push(arr[i]);
        } else {
            b.push(arr[i]);
        }
    }

    const result = [...qSort(l), support, ...qSort(b)];
    return result;
};

// второй вариант. in place + выбор медианы из трех
const partition = (arr, left, right) => {
    const pivot = arr[right]; // Опорный элемент
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
};

const getPivotIndex = (arr, left, right) => {
    const mid = Math.floor((left + right) / 2);
    const a = arr[left],
        b = arr[mid],
        c = arr[right];

    // Возвращаем индекс медианы
    if ((a <= b && b <= c) || (c <= b && b <= a)) return mid;
    if ((b <= a && a <= c) || (c <= a && a <= b)) return left;
    return right;
};

const quickSortOptimized = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return;

    // Выбор опорного элемента (медиана трёх)
    const pivotIndex = getPivotIndex(arr, left, right);
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]]; // Перемещаем опорный в конец

    const pivot = partition(arr, left, right);
    quickSortOptimized(arr, left, pivot - 1);
    quickSortOptimized(arr, pivot + 1, right);

    return arr;
};

module.exports = {
    qSort,
    quickSortOptimized,
};
