const insertionsSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let index;

        for (index = i; index > 0 && arr[index - 1] > item; index--) {
            arr[index] = arr[index - 1];
        }

        arr[index] = item;
    }

    return arr;
};

module.exports.insertionsSort = insertionsSort;
