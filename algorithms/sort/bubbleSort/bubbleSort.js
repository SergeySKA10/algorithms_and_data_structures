const bubbleSort = (arr) => {
    let flag = true;
    while (flag) {
        flag = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                let item = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = item;
                flag = true;
            }
        }
    }
    return arr;
};

module.exports.bubbleSort = bubbleSort;
