const countingSort = (arr) => {
    const count = new Array(256).fill(0);
    const result = new Array(arr.length);
    let k = 0;

    for (let i = 0; i < arr.length; i++) {
        count[arr[i]] += 1;
    }

    for (let i = 0; i < count.length; i++) {
        if (count[i]) {
            result[k++] = i;
        }
    }

    return result;
};

// динамический подсчет диапазонов и более эфективное восстановление
const countingSortOptimized = (arr) => {
    if (arr.length === 0) return arr;

    // Находим min и max
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const result = new Array(arr.length);

    // Подсчет
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Восстановление
    for (let i = arr.length - 1; i >= 0; i--) {
        result[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    return result;
};

module.exports = {
    countingSort,
    countingSortOptimized,
};
