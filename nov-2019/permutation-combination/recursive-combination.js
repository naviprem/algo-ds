function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 
 * @param {*} arr - Array of elements to permute
 * @param {*} j - Pointer starts with zero
 * @param {*} data - initialize with empty array
 * @param {*} start - initialize with atarting index of array
 * @param {*} n - initialize with ning index of array
 * @param {*} n - length of array
 * @param {*} r - length of result array
 */
function rCombination(arr, data, start, j, n, r) {
    if(j === r) console.log(data.slice(0, r));
    for (let i = start; i < n && n-i >= r-j; i++) {
        data[j] = arr[i];
        rCombination(arr, data, i + 1, j + 1, n, r)
    }
}
const arr = [1, 2, 3, 4, 5];
const r = 3
rCombination(arr, [], 0, 0, arr.length, r);