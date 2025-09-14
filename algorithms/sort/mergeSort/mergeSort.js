const merge = (l, r) => {
    const result = new Array(l.length + r.length);
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < l.length || j < r.length) {
        if (i >= l.length) {
            result[k++] = r[j++];
            continue;
        }

        if (j >= r.length) {
            result[k++] = l[i++];
            continue;
        }

        if (l[i] < r[j]) {
            result[k++] = l[i++];
        } else {
            result[k++] = r[j++];
        }
    }

    return result;
};

const mergeSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const l = arr.slice(0, mid);
    const r = arr.slice(mid);

    return merge(mergeSort(l), mergeSort(r));
};

// без дополнительной памяти
function mergeSortInPlace(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSortInPlace(arr, start, mid);
    mergeSortInPlace(arr, mid + 1, end);
    mergeInPlace(arr, start, mid, end);

    return arr;
}

function mergeInPlace(arr, start, mid, end) {
    const temp = [];
    let i = start,
        j = mid + 1;

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            temp.push(arr[i++]);
        } else {
            temp.push(arr[j++]);
        }
    }

    // Копируем оставшиеся элементы
    while (i <= mid) temp.push(arr[i++]);
    while (j <= end) temp.push(arr[j++]);

    // Копируем обратно в исходный массив
    for (let k = 0; k < temp.length; k++) {
        arr[start + k] = temp[k];
    }
}

module.exports = {
    mergeSort,
    mergeSortInPlace,
};
