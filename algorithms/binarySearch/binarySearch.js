// бинарный поиск
const binarySearch = (arr, x) => {
    if (arr.length === 0) return null;
    if (arr.length === 1) return x === arr[0] ? x : null;

    let l = 0;
    let r = arr.length - 1;
    const isAscending = arr[0] <= arr[arr.length - 1];

    while (l <= r) {
        const mid = Math.floor((l + r) / 2);

        if (x === arr[mid]) {
            return mid;
        }

        if ((isAscending && x < arr[mid]) || (!isAscending && x > arr[mid])) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }

    return -1;
};

// поиск места вставки в отсортированном массиве
const findInsertionSite = (arr, x) => {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0] > x ? 0 : 1;

    let l = 0;
    let r = arr.length - 1;
    const isAscending = arr[0] <= arr[arr.length - 1];

    while (l < r) {
        const mid = Math.floor((l + r) / 2);

        if ((isAscending && x < arr[mid]) || (!isAscending && x > arr[mid])) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }

    return l;
};

// функция вставки элемента в отсортированный массив
const insertElementInArray = (arr, x) => {
    const index = findInsertionSite(arr, x);

    if (index === arr.length) return arr.push(x);

    arr.push(0);
    for (let i = arr.length - 1; i > index; i--) {
        arr[i] = arr[i - 1];
    }

    arr[index] = x;

    return arr;
};
